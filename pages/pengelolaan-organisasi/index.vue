<template>
  <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
    <LayoutTheNavbar />
    
    <div class="flex flex-1 overflow-hidden">
      <LayoutTheSidebar />
      
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="px-4 sm:px-6 py-4 border-b bg-white flex-shrink-0">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Struktur Organisasi</h1>
        </div>

        <!-- Content Container - Scrollable area -->
        <div class="flex-1 overflow-y-auto">
          <div class="flex flex-col gap-4 p-4">
            <!-- Structure Section -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <!-- Structure Header - Clickable -->
              <button 
                @click="toggleStructure"
                :class="[
                  'px-4 py-3 flex items-center gap-2 flex-shrink-0 transition-colors w-full text-left',
                  isStructureExpanded 
                    ? 'bg-blue-500 text-white hover:bg-blue-600 rounded-t-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-b rounded-lg'
                ]"
              >
                <svg 
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-90': isStructureExpanded }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <span class="font-medium text-sm">Struktur</span>
              </button>
              
              <!-- Collapsible Content -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[1000px]"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="opacity-100 max-h-[1000px]"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="isStructureExpanded" class="overflow-hidden">
                  <!-- Year Filter -->
                  <div class="px-4 py-3 border-b bg-gray-50 flex-shrink-0">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <span class="text-sm text-gray-600 whitespace-nowrap">Filter Tahun:</span>
                      <div class="flex gap-2 w-full sm:w-auto">
                        <input
                          v-model="selectedYear"
                          type="number"
                          placeholder="2024"
                          min="2000"
                          max="2100"
                          class="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Masukkan tahun untuk melihat struktur organisasi"
                        />
                        <button
                          @click="handleYearFilter"
                          :disabled="!selectedYear || omStore.isLoading"
                          class="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                          title="Filter berdasarkan tahun"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          View
                        </button>
                        <button
                          v-if="selectedYear"
                          @click="clearYearFilter"
                          class="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 whitespace-nowrap"
                          title="Reset filter"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">Tampilkan struktur organisasi yang aktif pada tahun tertentu</p>
                  </div>

                  <!-- Search -->
                  <div class="px-4 py-3 border-b flex-shrink-0">
                    <div class="relative">
                      <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Cari organisasi..."
                        class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <!-- Tree Content -->
                  <div v-if="displayData.length > 0" class="p-4">
                    <div v-if="omStore.isLoading" class="text-center py-8">
                      <Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                      <p class="text-sm text-gray-500">Memuat data...</p>
                    </div>
                    <div v-else>
                      <MiscSimpleTree
                        v-for="item in displayData"
                        :key="item.id"
                        :node="item"
                        :level="0"
                        :selectedId="selectedNodeId"
                        @select="handleSelect"
                        @action="handleTreeAction"
                      />
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Details Section -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <!-- Detail Header -->
              <div class="px-4 py-3 border-b bg-gray-50 flex-shrink-0 rounded-t-lg">
                <h2 class="text-lg font-semibold text-gray-800">Detail</h2>
              </div>

              <!-- Detail Content -->
              <div class="p-4">
                <div v-if="selectedNode" class="space-y-6">
                  <!-- Basic Info -->
                  <div class="bg-gray-50 rounded-lg p-4 border">
                    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Icon name="lucide:info" class="w-5 h-5 text-blue-500" />
                      Informasi Dasar
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Object ID</label>
                        <p class="text-gray-900 font-mono bg-white px-3 py-2 rounded border">{{ selectedNode.object_id }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Tipe</label>
                        <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                          {{ selectedNode.object_type }}
                        </span>
                      </div>
                      <div class="sm:col-span-2">
                        <label class="block text-sm font-medium text-gray-500 mb-1">Nama Lengkap</label>
                        <p class="text-gray-900 font-medium bg-white px-3 py-2 rounded border">{{ selectedNode.long_text }}</p>
                      </div>
                      <div v-if="selectedNode.short_text">
                        <label class="block text-sm font-medium text-gray-500 mb-1">Nama Pendek</label>
                        <p class="text-gray-900 bg-white px-3 py-2 rounded border">{{ selectedNode.short_text }}</p>
                      </div>
                      <div v-if="selectedNode.abbreviation">
                        <label class="block text-sm font-medium text-gray-500 mb-1">Singkatan</label>
                        <p class="text-gray-900 bg-white px-3 py-2 rounded border">{{ selectedNode.abbreviation }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Period Info -->
                  <div class="bg-gray-50 rounded-lg p-4 border">
                    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Icon name="lucide:calendar" class="w-5 h-5 text-green-500" />
                      Periode
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Tanggal Mulai</label>
                        <p class="text-gray-900 bg-white px-3 py-2 rounded border">{{ formatDate(selectedNode.start_date) }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Tanggal Berakhir</label>
                        <p class="text-gray-900 bg-white px-3 py-2 rounded border">{{ formatDate(selectedNode.end_date) }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Relations -->
                  <div v-if="relationStore.relations.length > 0" class="bg-gray-50 rounded-lg p-4 border">
                    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Icon name="lucide:git-branch" class="w-5 h-5 text-purple-500" />
                      Relasi ({{ relationStore.relations.length }})
                    </h3>
                    <RelationTable 
                      :relations="relationStore.relations"
                      :isLoading="relationStore.isLoading"
                      @edit="handleEditRelation"
                      @delete="handleDeleteRelation"
                      @add="handleAddRelation"
                    />
                  </div>
                </div>
                
                <div v-else class="flex items-center justify-center py-16">
                  <div class="text-center">
                    <Icon name="lucide:folder-search" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 class="text-lg font-medium mb-2 text-gray-700">Pilih Organisasi</h3>
                    <p class="text-gray-500">Detail akan ditampilkan di sini</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useOmStore } from '~/stores/om/useOmStore'
import { useOmRelationStore } from '~/stores/om/useOmRelationStore'

definePageMeta({
  layout: 'default'
})

const omStore = useOmStore()
const relationStore = useOmRelationStore()

const selectedNode = computed(() => omStore.selectedObject)
const selectedNodeId = ref(null)
const searchQuery = ref('')
const selectedYear = ref('')
const isStructureExpanded = ref(false) // Default tertutup

// Filter function
const filterTree = (items, query) => {
  if (!query) return items
  
  const searchRecursive = (nodes) => {
    return nodes.reduce((acc, node) => {
      const matches = node.long_text?.toLowerCase().includes(query.toLowerCase()) ||
                     node.short_text?.toLowerCase().includes(query.toLowerCase()) ||
                     node.object_id?.toLowerCase().includes(query.toLowerCase())
      
      const filteredChildren = node.children ? searchRecursive(node.children) : []
      
      if (matches || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren
        })
      }
      
      return acc
    }, [])
  }
  
  return searchRecursive(items)
}

const displayData = computed(() => {
  return searchQuery.value ? filterTree(omStore.items, searchQuery.value) : omStore.items
})

// Watch for data changes and auto-select first node
watch(() => omStore.items, (newItems) => {
  if (newItems.length > 0 && !selectedNode.value) {
    const firstNode = newItems[0]
    handleSelect(firstNode)
  }
}, { immediate: true })

const handleSelect = (nodeData) => {
  console.log('🟢 Main handler - Node selected:', nodeData.object_id)
  selectedNodeId.value = nodeData.id
  omStore.selectNode(nodeData)
  
  // Fetch relations for selected node
  const date = nodeData.start_date ? nodeData.start_date.slice(0, 10) : undefined
  relationStore.fetchRelations(nodeData.object_id, nodeData.object_type, date)
}

const handleEdit = (nodeData) => {
  console.log('Edit node:', nodeData)
  // TODO: Implement edit functionality
}

const handleDelete = (nodeData) => {
  console.log('Delete node:', nodeData)
  // TODO: Implement delete functionality
}

const handleAddChild = (nodeData) => {
  console.log('Add child to node:', nodeData)
  // TODO: Implement add child functionality
}

const handleViewDetails = (nodeData) => {
  handleSelect(nodeData)
  viewMode.value = 'details'
}

const handleTreeAction = ({ action, node }) => {
  console.log('🟢 Main handler - Tree action:', action, 'on node:', node.object_id)
  
  switch (action) {
    case 'view':
      handleViewDetails(node)
      break
    case 'edit':
      handleEdit(node)
      break
    case 'add':
      handleAddChild(node)
      break
    case 'delete':
      handleDelete(node)
      break
  }
}

const handleEditRelation = (relation) => {
  console.log('Edit relation:', relation)
  // TODO: Implement edit relation functionality
}

const handleDeleteRelation = (relation) => {
  console.log('Delete relation:', relation)
  // TODO: Implement delete relation functionality
}

const handleAddRelation = () => {
  console.log('Add new relation')
  // TODO: Implement add relation functionality
}

const handleYearFilter = async () => {
  if (selectedYear.value) {
    await omStore.fetchOrgStructure({ date: selectedYear.value })
  }
}

const clearYearFilter = async () => {
  selectedYear.value = ''
  await omStore.fetchOrgStructure()
}

const toggleStructure = () => {
  isStructureExpanded.value = !isStructureExpanded.value
}

// Format date helper
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === '9999-12-31') return 'Tidak terbatas'
  
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Fetch data on mount
onMounted(async () => {
  await omStore.fetchOrgStructure()
  
  // Auto-select first node if available
  if (omStore.items.length > 0 && !selectedNode.value) {
    const firstNode = omStore.items[0]
    handleSelect(firstNode)
  }
})
</script>