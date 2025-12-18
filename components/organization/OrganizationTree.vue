<script setup lang="ts">
  import { useOmStore, type TreeItem } from '~/stores/om/useOmStore'
  
  interface Props {
    title?: string
  }
  
  const props = withDefaults(defineProps<Props>(), {
    title: 'Struktur'
  })
  
  const emit = defineEmits<{
    select: [node: TreeItem]
  }>()
  
  const omStore = useOmStore()
  
  const searchQuery = ref('')
  const isExpanded = ref(true)
  const selectedNodeId = ref<number | null>(null)
  const selectedYear = ref<string>('')
  
  // Fetch data on mount
  onMounted(async () => {
    await omStore.fetchOrgStructure()
  })
  
  // Filter function
  const filterTree = (items: TreeItem[], query: string): TreeItem[] => {
    if (!query) return items
    
    return items.reduce((acc, item) => {
      const matchesQuery = item.long_text?.toLowerCase().includes(query.toLowerCase()) ||
                          item.short_text?.toLowerCase().includes(query.toLowerCase()) ||
                          item.object_id?.toLowerCase().includes(query.toLowerCase())
      
      const filteredChildren = item.children ? filterTree(item.children, query) : []
      
      if (matchesQuery || filteredChildren.length > 0) {
        acc.push({
          ...item,
          children: filteredChildren
        })
      }
      
      return acc
    }, [] as TreeItem[])
  }
  
  const displayData = computed(() => {
    return searchQuery.value ? filterTree(omStore.items, searchQuery.value) : omStore.items
  })
  
  const toggleSection = () => {
    isExpanded.value = !isExpanded.value
  }
  
  const handleSelect = (node: TreeItem) => {
    selectedNodeId.value = node.id
    omStore.selectNode(node)
    emit('select', node)
    console.log('Selected node:', node)
  }
  
  const handleYearFilter = async () => {
    if (selectedYear.value) {
      await omStore.fetchOrgStructure({ date: selectedYear.value })
    }
  }
  
  // Convert TreeItem to display format for TreeNode
  const convertToDisplayNode = (item: TreeItem): any => {
    return {
      id: item.id.toString(),
      label: item.long_text || item.short_text || item.object_id,
      data: item,
      children: item.children?.map((child: TreeItem) => convertToDisplayNode(child)) || []
    }
  }
  
  const displayTreeData = computed(() => {
    return displayData.value.map((item: TreeItem) => convertToDisplayNode(item))
  })
  </script>
  
  <template>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Header -->
      <button 
        @click="toggleSection"
        :class="[
          'w-full flex items-center gap-2 px-4 py-3 transition-colors focus:outline-none',
          isExpanded 
            ? 'bg-blue-500 text-white' 
            : 'text-gray-700 hover:bg-gray-50'
        ]"
      >
        <Icon 
          name="lucide:chevron-right" 
          :class="[
            'w-4 h-4 transition-all duration-200',
            isExpanded ? 'rotate-90 text-white' : 'text-blue-500'
          ]"
        />
        <span class="font-medium text-sm">{{ title }}</span>
      </button>
  
      <!-- Content -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-[2000px] opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-[2000px] opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="isExpanded" class="border-t border-gray-200">
          <!-- Year Filter -->
          <div class="p-3 border-b border-gray-100 bg-gray-50">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600 whitespace-nowrap">Tahun:</span>
              <input
                v-model="selectedYear"
                type="number"
                placeholder="YYYY"
                min="2000"
                max="2100"
                class="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                @click="handleYearFilter"
                :disabled="!selectedYear || omStore.isLoading"
                class="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Filter
              </button>
            </div>
          </div>
  
          <!-- Search Box -->
          <div class="p-3 border-b border-gray-100">
            <div class="relative">
              <Icon 
                name="lucide:search" 
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari organisasi..."
                class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          <!-- Loading State -->
          <div v-if="omStore.isLoading" class="p-6 text-center">
            <Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
            <p class="text-sm text-gray-500">Memuat data...</p>
          </div>
  
          <!-- Error State -->
          <div v-else-if="omStore.isError" class="p-6 text-center">
            <Icon name="lucide:alert-circle" class="w-6 h-6 mx-auto text-red-500 mb-2" />
            <p class="text-sm text-red-600">{{ omStore.errorMessage || 'Data tidak ditemukan' }}</p>
            <button
              @click="omStore.fetchOrgStructure()"
              class="mt-3 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
  
          <!-- Tree -->
          <div v-else class="p-2 max-h-[600px] overflow-y-auto">
            <template v-if="displayTreeData.length > 0">
              <TreeNode
                v-for="node in displayTreeData"
                :key="node.id"
                :node="node"
                :level="0"
                :selectedId="selectedNodeId?.toString()"
                @select="handleSelect(node.data)"
              />
            </template>
            <div v-else class="p-6 text-center text-gray-500 text-sm">
              {{ searchQuery ? 'Tidak ada hasil pencarian' : 'Tidak ada data organisasi' }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>