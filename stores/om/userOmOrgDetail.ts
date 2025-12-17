
import { defineStore } from 'pinia'
import { apiOm } from '~/lib/api'

export interface TreeItem {
  id: number
  object_id: string
  object_type: string
  long_text: string
  short_text: string
  abbreviation: string
  start_date: string
  end_date?: string
  children?: TreeItem[]
  chief?: boolean
}

export const useOmStore = defineStore('omStore', {
  state: () => ({
    items: [] as TreeItem[],
    isError: false,
    isLoading: false,
    selectedObject: null as TreeItem | null,
  }),

  actions: {
    async fetchObject(params?: {
      object_type?: 'O' | 'P' | 'S' | 'C' | 'K'
      object_id?: string
      date?: string
    }) {
      this.isLoading = true
      
      try {
        console.log('🔵 Fetching organization structure...', params)
        
        const response = await apiOm.get('/om_relations/org_structure', {
          params,
        })
        
        console.log('✅ Organization data received:', response.data)
        
        const Data: TreeItem = response.data.data

        function dataToTree(node: TreeItem): TreeItem {
          return {
            id: node.id,
            object_id: node.object_id,
            object_type: node.object_type,
            long_text: node.long_text,
            short_text: node.short_text,
            abbreviation: node.abbreviation,
            start_date: node.start_date,
            end_date: node.end_date,
            children: Array.isArray(node.children) && node.children.length > 0
              ? node.children.map((child: TreeItem) => dataToTree(child))
              : [],
            chief: node.chief,
          }
        }

        if (!params?.object_id) {
          this.items = [dataToTree(Data)]
        } else {
          this.selectedObject = dataToTree(Data)
        }

        this.isError = false
      } catch (error: any) {
        console.error('❌ Error fetching organization:', error)
        this.isError = error?.response?.status === 404
        this.items = []
      } finally {
        this.isLoading = false
      }
    },

    async updateObject(updatedObject: TreeItem) {
      try {
        console.log('🔵 Updating object:', updatedObject.id)
        
        const response = await apiOm.put(
          `/om_objects/${updatedObject.id}`, 
          updatedObject
        )

        console.log('✅ Object updated successfully')

        // Update in tree
        const updateInTree = (nodes: TreeItem[]): boolean => {
          for (const node of nodes) {
            if (node.id === updatedObject.id) {
              Object.assign(node, updatedObject)

              if (this.selectedObject?.id === node.id) {
                this.selectedObject = { ...node }
              }

              return true
            }
            if (node.children && updateInTree(node.children)) {
              return true
            }
          }
          return false
        }

        updateInTree(this.items)
        return response.data
      } catch (error) {
        console.error('❌ Update failed:', error)
        throw error
      }
    },

    async createObject(
      newObject: TreeItem, 
      parentObject: TreeItem, 
      isChief: boolean
    ) {
      try {
        console.log('🔵 Creating new object...')
        
        const createdObj = {
          object_id: newObject.object_id,
          object_type: newObject.object_type,
          long_text: newObject.long_text,
          short_text: newObject.short_text,
          abbreviation: newObject.abbreviation,
          start_date: newObject.start_date,
          end_date: newObject.end_date,
        }

        // Create object
        await apiOm.post('/om_objects', createdObj)
        
        // Get created object
        const response = await apiOm.get('/om_objects', {
          params: {
            object_type: createdObj.object_type,
            object_id: createdObj.object_id,
            date: createdObj.start_date,
          }
        })

        const CreatedObject: TreeItem = response.data.data

        // Create relation
        const relationPayload = {
          object_id: parentObject.object_id,
          object_type: parentObject.object_type,
          relation_object_id: CreatedObject.object_id,
          relation_object_type: CreatedObject.object_type,
          start_date: CreatedObject.start_date,
          end_date: CreatedObject.end_date,
          chief: isChief,
        }

        await apiOm.post('/om_relations', relationPayload)

        console.log('✅ Object created successfully')

        // Update parent's children
        parentObject.children = parentObject.children || []
        parentObject.children.push(CreatedObject)
      } catch (error) {
        console.error('❌ Create failed:', error)
        throw error
      }
    },

    async deleteObject(id: number) {
      try {
        console.log('🔵 Deleting object:', id)
        
        await apiOm.delete(`/om_objects/${id}`)
        
        console.log('✅ Object deleted successfully')
      } catch (error) {
        console.error('❌ Delete failed:', error)
        throw error
      }
    },
  },
})