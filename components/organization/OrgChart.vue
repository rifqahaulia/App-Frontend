<script setup lang="ts">
    import type { TreeItem } from '~/stores/om/useOmStore'
    
    interface Props {
      data: TreeItem | null
    }
    
    const props = defineProps<Props>()
    
    const chartContainer = ref<HTMLElement | null>(null)
    
    // Render the org chart recursively
    const renderNode = (node: TreeItem, level: number = 0): any => {
      return {
        ...node,
        level,
        children: node.children?.map(child => renderNode(child, level + 1)) || []
      }
    }
    
    const chartData = computed(() => {
      return props.data ? renderNode(props.data) : null
    })
    </script>
    
    <template>
      <div v-if="chartData" class="org-chart-container">
        <div class="flex justify-center items-start p-8 overflow-x-auto">
          <OrgChartNode :node="chartData" />
        </div>
      </div>
      <div v-else class="p-12 text-center text-gray-500">
        <Icon name="lucide:sitemap" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>Pilih organisasi untuk melihat struktur</p>
      </div>
    </template>
    
    <style scoped>
    .org-chart-container {
      min-height: 400px;
      background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
    }
    </style>