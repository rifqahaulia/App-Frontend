import { defineStore } from 'pinia'
import { apiPa } from '~/lib/api'
import type { RefLookup } from '~/types/pa'

export const useReferenceStore = defineStore('referenceStore', {
  state: () => ({
    references: {} as Record<string, RefLookup[]>,
    isLoading: {} as Record<string, boolean>
  }),

  actions: {
    async fetchReference(field: string, type: 'lookup' | 'subtype' | 'region' | 'city' | 'branch' = 'lookup') {
      const cacheKey = `${type}-${field}`
      if (this.references[cacheKey] && this.references[cacheKey].length > 0) {
        return this.references[cacheKey]
      }

      this.isLoading[cacheKey] = true
      try {
        let url = `/ref/${field}`
        if (type === 'subtype') url = `/refSubType/${field}`
        if (type === 'region') url = `/refRegion`
        if (type === 'city') url = `/refCity/${field}`
        if (type === 'branch') url = `/refBranchStudy`

        const response = await apiPa.get(url)
        
        // Map different responses to a consistent { value, label } structure
        const data = (response.data as any[]).map(item => {
          if (type === 'lookup') return { value: item.code, label: item.name }
          if (type === 'subtype') return { value: item.subType, label: item.subTypeText || item.subType }
          if (type === 'region') return { value: item.region, label: item.regionText || item.region }
          if (type === 'city') return { value: item.id?.toString(), label: item.cityName || item.name }
          if (type === 'branch') return { value: item.branchStudy, label: item.branchStudyText || item.branchStudy }
          return item
        })

        this.references[cacheKey] = data
        return data
      } catch (error) {
        console.error(`Error fetching reference ${type}/${field}:`, error)
        return []
      } finally {
        this.isLoading[cacheKey] = false
      }
    },

    async fetchMultipleReferences(configs: { field: string, type?: any }[]) {
      await Promise.all(configs.map(c => this.fetchReference(c.field, c.type || 'lookup')))
    }
  }
})
