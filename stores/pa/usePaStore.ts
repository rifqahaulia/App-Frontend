import { defineStore } from 'pinia'
import { apiPa } from '~/lib/api'

export const usePaStore = defineStore('paStore', {
  state: () => ({
    // Store data by module name
    moduleData: {} as Record<string, any[]>,
    isLoading: {} as Record<string, boolean>,
    errors: {} as Record<string, any>,
    validationErrors: {} as Record<string, any[]>
  }),

  actions: {
    /**
     * Fetch data for a specific module and personnel
     * @param modulePath The API path (e.g., 'pa/address', 'pa-education')
     * @param persnum Personnel number
     */
    async fetchModuleData(modulePath: string, persnum?: number | string) {
      const key = `${modulePath}-${persnum || 'all'}`
      this.isLoading[key] = true
      this.errors[key] = null
      
      try {
        let url = `/${modulePath}`
        let params = {}

        // Special case for address as per backend routes: /api/pa/address/:persnum
        if (modulePath === 'pa/address' && persnum) {
          url = `/${modulePath}/${persnum}`
        } else if (persnum) {
          params = { persnum }
        }
        
        const response = await apiPa.get(url, { params })
        
        // Data is already unwrapped and camelCased by interceptor
        let data = Array.isArray(response.data) ? response.data : [response.data]

        // CRITICAL: Backend services for Education, IDs, and Communication 
        // return ALL records. We must filter locally if persnum is provided.
        if (persnum) {
          const targetPersnum = typeof persnum === 'string' ? parseInt(persnum) : persnum
          const filtered = data.filter((item: any) => item.persnum === targetPersnum)
          console.log(`[PaStore] Filtered ${modulePath} from ${data.length} to ${filtered.length} records for persnum ${targetPersnum}`)
          data = filtered
        }

        this.moduleData[key] = data
        return data
      } catch (error: any) {
        this.errors[key] = error.response?.data?.message || error.message
        console.error(`Error fetching ${modulePath}:`, error)
        throw error
      } finally {
        this.isLoading[key] = false
      }
    },

    /**
     * Create or Update module data
     */
    async saveModuleData(modulePath: string, data: any, id?: number) {
      const isUpdate = !!id
      
      // Determine method based on module specification
      let method: 'post' | 'put' | 'patch' = isUpdate ? 'put' : 'post'
      
      const patchModules = ['pa-bpjs-ketenagakerjaan', 'pa-object-loan', 'pa/communication']
      if (isUpdate && patchModules.includes(modulePath)) {
        method = 'patch'
      }

      this.isLoading[modulePath] = true
      this.validationErrors[modulePath] = []
      
      try {
        const url = isUpdate ? `/${modulePath}/${id}` : `/${modulePath}`
        const response = await apiPa[method](url, data)
        
        // Invalidate cache by clearing or updating
        // For simplicity, we'll just return the saved data
        return response.data
      } catch (error: any) {
        if (error.response?.status === 400 && error.response.data?.errors) {
          this.validationErrors[modulePath] = error.response.data.errors
        }
        throw error
      } finally {
        this.isLoading[modulePath] = false
      }
    },

    async deleteModuleData(modulePath: string, id: number) {
      try {
        await apiPa.delete(`/${modulePath}/${id}`)
      } catch (error) {
        console.error(`Error deleting from ${modulePath}:`, error)
        throw error
      }
    }
  }
})
