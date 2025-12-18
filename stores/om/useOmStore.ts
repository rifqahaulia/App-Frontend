import { defineStore } from 'pinia'
import { apiOm } from '~/lib/api'
import type { 
  TreeItem, 
  CreateOmObjectRequest, 
  UpdateOmObjectRequest,
  GetOrgStructureParams 
} from '~/types/om'

export const useOmStore = defineStore('omStore', {
  state: () => ({
    items: [] as TreeItem[],
    selectedObject: null as TreeItem | null,
    isLoading: false,
    isError: false,
    errorMessage: '',
  }),

  getters: {
    // Get flattened list of all nodes
    flattenedItems: (state) => {
      const flatten = (items: TreeItem[]): TreeItem[] => {
        return items.reduce((acc, item) => {
          acc.push(item)
          if (item.children && item.children.length > 0) {
            acc.push(...flatten(item.children))
          }
          return acc
        }, [] as TreeItem[])
      }
      return flatten(state.items)
    },

    // Find node by ID
    findNodeById: (state) => (id: number): TreeItem | null => {
      const search = (items: TreeItem[]): TreeItem | null => {
        for (const item of items) {
          if (item.id === id) return item
          if (item.children && item.children.length > 0) {
            const found = search(item.children)
            if (found) return found
          }
        }
        return null
      }
      return search(state.items)
    },
  },

  actions: {
    async fetchOrgStructure(params?: GetOrgStructureParams) {
      this.isLoading = true
      this.isError = false
      this.errorMessage = ''
      
      try {
        console.log('🔵 Fetching organization structure...', params)
        
        const response = await apiOm.get('/om_relations/org_structure', {
          params: {
            ...(params?.object_type && { object_type: params.object_type }),
            ...(params?.object_id && { object_id: params.object_id }),
            ...(params?.date && { date: params.date }),
          },
        })
        
        console.log('✅ Organization data received:', response.data)
        
        if (response.data && response.data.data) {
          const treeData: TreeItem = response.data.data
          
          // If fetching root, set as items array
          if (!params?.object_id) {
            this.items = [treeData]
            
            // Auto-select first node if none selected
            if (!this.selectedObject && treeData) {
              this.selectedObject = treeData
            }
          } else {
            // If fetching specific node, update selectedObject
            this.selectedObject = treeData
          }
        }

        this.isError = false
      } catch (error: any) {
        console.error('❌ Error fetching organization:', error)
        this.isError = true
        this.errorMessage = error.response?.data?.errors || error.message || 'Failed to fetch data'
        this.items = []
        
        // Show user-friendly error
        if (error.response?.status === 404) {
          this.errorMessage = 'Data organisasi tidak ditemukan'
        } else if (error.response?.status === 500) {
          this.errorMessage = 'Terjadi kesalahan pada server'
        }
      } finally {
        this.isLoading = false
      }
    },

    async createObject(data: CreateOmObjectRequest, parentObject: TreeItem, isChief: boolean = false) {
      try {
        console.log('🔵 Creating new object...', data)
        
        // Step 1: Create the object
        const createResponse = await apiOm.post('/om_objects', {
          object_type: data.object_type,
          object_id: data.object_id,
          long_text: data.long_text,
          short_text: data.short_text || '',
          abbreviation: data.abbreviation || '',
          start_date: data.start_date,
          end_date: data.end_date || '9999-12-31',
        })
        
        console.log('✅ Object created:', createResponse.data)
        
        // Step 2: Get the created object details
        const getResponse = await apiOm.get('/om_objects', {
          params: {
            object_type: data.object_type,
            object_id: data.object_id,
            date: data.start_date,
          },
        })
        
        const createdObject: TreeItem = getResponse.data.data
        
        // Step 3: Create relation with parent
        await apiOm.post('/om_relations', {
          object_type: parentObject.object_type,
          object_id: parentObject.object_id,
          relation_object_type: createdObject.object_type,
          relation_object_id: createdObject.object_id,
          start_date: createdObject.start_date,
          end_date: createdObject.end_date,
          chief: isChief,
        })
        
        console.log('✅ Object created and linked successfully')
        
        // Refresh the tree
        await this.fetchOrgStructure()
        
        return createdObject
      } catch (error: any) {
        console.error('❌ Create failed:', error)
        throw new Error(error.response?.data?.errors || 'Gagal membuat objek')
      }
    },

    async updateObject(id: number, data: UpdateOmObjectRequest) {
      try {
        console.log('🔵 Updating object:', id, data)
        
        const response = await apiOm.put(`/om_objects/${id}`, data)
        
        console.log('✅ Object updated successfully')
        
        // Refresh the tree
        await this.fetchOrgStructure()
        
        return response.data
      } catch (error: any) {
        console.error('❌ Update failed:', error)
        throw new Error(error.response?.data?.errors || 'Gagal mengupdate objek')
      }
    },

    async deleteObject(id: number) {
      try {
        console.log('🔵 Deleting object:', id)
        
        await apiOm.delete(`/om_objects/${id}`)
        
        console.log('✅ Object deleted successfully')
        
        // Refresh the tree
        await this.fetchOrgStructure()
      } catch (error: any) {
        console.error('❌ Delete failed:', error)
        throw new Error(error.response?.data?.errors || 'Gagal menghapus objek')
      }
    },

    async searchObjects(params: any) {
      try {
        console.log('🔵 Searching objects...', params)
        
        const response = await apiOm.get('/om_objects/search', { params })
        
        console.log('✅ Search results:', response.data)
        
        return response.data.data || []
      } catch (error: any) {
        console.error('❌ Search failed:', error)
        return []
      }
    },

    selectNode(node: TreeItem) {
      this.selectedObject = node
      console.log('📌 Node selected:', node)
    },

    clearSelection() {
      this.selectedObject = null
    },
  },
})

export type { TreeItem }