import { defineStore } from 'pinia'
import { apiOm } from '~/lib/api'
import type { OmRelation, CreateOmRelationRequest, ObjectType } from '~/types/om'

export const useOmRelationStore = defineStore('omRelationStore', {
  state: () => ({
    relations: [] as OmRelation[],
    isLoading: false,
    isError: false,
    errorMessage: '',
  }),

  actions: {
    async fetchRelations(
      object_id: string,
      object_type: ObjectType,
      date?: string
    ) {
      this.isLoading = true
      this.isError = false
      this.errorMessage = ''
      
      try {
        console.log('🔵 Fetching relations...', { object_id, object_type, date })
        
        const response = await apiOm.get('/om_relations', {
          params: {
            object_id,
            object_type,
            ...(date && { date }),
          },
        })
        
        console.log('✅ Relations received:', response.data)
        
        this.relations = response.data.data || []
      } catch (error: any) {
        console.error('❌ Error fetching relations:', error)
        this.isError = true
        this.errorMessage = error.response?.data?.errors || 'Failed to fetch relations'
        this.relations = []
      } finally {
        this.isLoading = false
      }
    },

    async createRelation(data: CreateOmRelationRequest) {
      try {
        console.log('🔵 Creating relation...', data)
        
        const response = await apiOm.post('/om_relations', data)
        
        console.log('✅ Relation created successfully')
        
        return response.data.data
      } catch (error: any) {
        console.error('❌ Create relation failed:', error)
        throw new Error(error.response?.data?.errors || 'Gagal membuat relasi')
      }
    },

    async updateRelation(data: any) {
      try {
        console.log('🔵 Updating relation...', data)
        
        const response = await apiOm.put('/om_relations', data)
        
        console.log('✅ Relation updated successfully')
        
        return response.data.data
      } catch (error: any) {
        console.error('❌ Update relation failed:', error)
        throw new Error(error.response?.data?.errors || 'Gagal mengupdate relasi')
      }
    },

    async deleteRelation(id: number) {
      try {
        console.log('🔵 Deleting relation:', id)
        
        await apiOm.delete(`/om_relations/${id}`)
        
        console.log('✅ Relation deleted successfully')
      } catch (error: any) {
        console.error('❌ Delete relation failed:', error)
        throw new Error(error.response?.data?.errors || 'Gagal menghapus relasi')
      }
    },

    clearRelations() {
      this.relations = []
    },
  },
})