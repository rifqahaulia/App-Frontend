
// stores/om/useOmOrgChild.ts
import { defineStore } from 'pinia'
import { apiOm } from '~/lib/api'

interface OmRelation {
  id: number
  object_id: string
  object_type: string
  relation_type: string
  relation_object_type: string
  relation_object_id: string
  start_date: string
  end_date: string
  create_user: string
}

export const useOmOrgRelationStore = defineStore('omOrgRelationStore', {
  state: () => ({
    relations: [] as OmRelation[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchRelations(
      object_id: string, 
      object_type: string, 
      start_date?: string
    ) {
      this.isLoading = true
      this.error = null
      
      try {
        console.log('🔵 Fetching relations...', { object_id, object_type, start_date })
        
        let url = `/om_relations?object_id=${object_id}&object_type=${object_type}`
        if (start_date) {
          url += `&date=${start_date}`
        }
        
        const response = await apiOm.get(url)
        
        console.log('✅ Relations received:', response.data)
        
        this.relations = response.data.data || []
      } catch (error: any) {
        console.error('❌ Error fetching relations:', error)
        this.error = error.message
        this.relations = []
      } finally {
        this.isLoading = false
      }
    },
  },
})