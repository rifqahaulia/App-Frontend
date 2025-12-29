<script setup lang="ts">
    import { computed } from 'vue'
    import type { TreeItem } from '@/types/om'
    
    interface Props {
      data: TreeItem | null
    }
    
    const props = defineProps<Props>()
    
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
        <div class="chart-content">
          <OrgChartNode :node="chartData" />
        </div>
      </div>
      <div v-else class="empty-state">
        <div class="text-center">
          <Icon name="lucide:sitemap" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Pilih Organisasi</h3>
          <p class="text-gray-500">Pilih organisasi untuk melihat struktur chart</p>
        </div>
      </div>
    </template>
    
    <style scoped>
    .org-chart-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
      border-radius: 0.5rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .chart-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 1rem;
      overflow: auto;
      min-height: 0;
      height: 100%;
    }
    
    .empty-state {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
      border-radius: 0.5rem;
    }
    </style>