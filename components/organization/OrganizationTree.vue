




<script setup lang="ts">
  import { useOmStore, type TreeItem } from '~/stores/om/userOmOrgDetail'
  
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
  const showYearPicker = ref(false)
  
  // Fetch data on mount
  onMounted(async () => {
    await omStore.fetchObject()
  })
  
  // Watch for year changes
  watch(selectedYear, async (newYear) => {
    if (newYear) {
      await omStore.fetchObject({ date: newYear })
    }
  })
  
  const displayData = computed(() => {
    return omStore.items
  })
  
  const toggleSection = () => {
    isExpanded.value = !isExpanded.value
  }
  
  const handleSelect = (node: TreeItem) => {
    selectedNodeId.value = node.id
    omStore.selectedObject = node
    emit('select', node)
    console.log('Selected node:', node)
  }
  


  // Convert TreeItem to display format for TreeNode
  const convertToDisplayNode = (item: TreeItem): any => {
    return {
      id: item.id.toString(),
      label: item.long_text,
      data: item,
      children: item.children?.map((child: TreeItem) => convertToDisplayNode(child))
    }
  }
  
  // Safe handler to ensure we always pass a valid TreeItem
  const safeHandleSelect = (data: any) => {
    if (data && typeof data === 'object' && data.id) {
      handleSelect(data as TreeItem)
    }
  }
  
  const displayTreeData = computed(() => {
    return displayData.value.map((item: TreeItem) => convertToDisplayNode(item))
  })
  
  const onYearSelected = (year: number) => {
    selectedYear.value = year.toString()
    showYearPicker.value = false
  }
  </script>
  
  <template>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Header -->
      <div class="relative">
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
      </div>
  
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
          <!-- Year Picker -->
          <div class="p-3 border-b border-gray-100 bg-gray-50">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Tahun:</span>
              <input
                v-model="selectedYear"
                type="number"
                placeholder="YYYY"
                min="2000"
                max="2100"
                class="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                @click="omStore.fetchObject({ date: selectedYear })"
                class="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Filter
              </button>
            </div>
          </div>
  
          <!-- Search Box -->
          <div class="p-3 border-b border-gray-100">
            <div class="relative max-w-md">
              <Icon 
                name="lucide:search" 
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari organisasi..."
                class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
            <p class="text-sm text-red-600">Data tidak ditemukan</p>
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
                @select="safeHandleSelect(node.data || node)"
              />
            </template>
            <div v-else class="p-6 text-center text-gray-500 text-sm">
              Tidak ada data organisasi
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>