import { defineStore } from 'pinia'
import { apiPa } from '~/lib/api'
import type { PaPersonal, ApiResponse } from '~/types/pa'

export const usePersonalStore = defineStore('personalStore', {
  state: () => ({
    personals: [] as PaPersonal[],
    selectedPersonal: null as PaPersonal | null,
    isLoading: false,
    isError: false,
    errorMessage: '',
    validationErrors: [] as { field: string, message: string }[]
  }),

  actions: {
    async fetchPersonals() {
      this.isLoading = true
      this.isError = false
      this.errorMessage = ''
      
      try {
        const response = await apiPa.get('/pa')
        // The interceptor already unwrapped response.data.data and converted to camelCase
        this.personals = response.data as unknown as PaPersonal[]
      } catch (error: any) {
        this.handleError(error)
      } finally {
        this.isLoading = false
      }
    },

    async getPersonalById(id: number | string) {
      this.isLoading = true
      try {
        // Try direct fetch first
        const response = await apiPa.get(`/pa/${id}`)
        this.selectedPersonal = response.data as unknown as PaPersonal
        return this.selectedPersonal
      } catch (error: any) {
        // If direct fetch fails (e.g. 404), try to find in the full list
        console.warn(`[PersonalStore] Direct fetch for ID ${id} failed, falling back to list find.`)
        if (this.personals.length === 0) {
          await this.fetchPersonals()
        }
        const found = this.personals.find(p => p.id === (typeof id === 'string' ? parseInt(id) : id))
        if (found) {
          this.selectedPersonal = found
          return found
        }
        this.handleError(error)
      } finally {
        this.isLoading = false
      }
    },

    async createPersonal(data: Partial<PaPersonal>) {
      this.isLoading = true
      this.isError = false
      this.validationErrors = []
      
      try {
        const response = await apiPa.post('/pa', data)
        const newRecord = response.data as unknown as PaPersonal
        this.personals.unshift(newRecord)
        return newRecord
      } catch (error: any) {
        this.handleError(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updatePersonal(id: number | string, data: Partial<PaPersonal>) {
      this.isLoading = true
      this.isError = false
      this.validationErrors = []
      
      try {
        const response = await apiPa.put(`/pa/${id}`, data)
        const updatedRecord = response.data as unknown as PaPersonal
        
        // Update records in list
        const index = this.personals.findIndex(item => item.id === (typeof id === 'string' ? parseInt(id) : id))
        if (index !== -1) {
          this.personals[index] = updatedRecord
        }
        
        if (this.selectedPersonal?.id === updatedRecord.id) {
          this.selectedPersonal = updatedRecord
        }
        
        return updatedRecord
      } catch (error: any) {
        this.handleError(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async deletePersonal(id: number | string) {
      this.isLoading = true
      try {
        await apiPa.delete(`/pa/${id}`)
        this.personals = this.personals.filter(item => item.id !== (typeof id === 'string' ? parseInt(id) : id))
        if (this.selectedPersonal?.id === (typeof id === 'string' ? parseInt(id) : id)) {
          this.selectedPersonal = null
        }
      } catch (error: any) {
        this.handleError(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    handleError(error: any) {
      this.isError = true
      const errorData = error.response?.data
      
      if (errorData?.errors) {
        this.validationErrors = errorData.errors
        this.errorMessage = errorData.message || 'Validation Error'
      } else {
        this.errorMessage = error.message || 'An unexpected error occurred'
      }
      
      console.error('API Error:', {
        status: error.response?.status,
        data: errorData,
        message: this.errorMessage
      })
    },

    clearErrors() {
      this.isError = false
      this.errorMessage = ''
      this.validationErrors = []
    }
  }
})
