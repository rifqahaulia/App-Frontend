<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <LayoutTheNavbar />
    
    <div class="flex flex-1 overflow-hidden">
      <LayoutTheSidebar />
      
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="px-4 sm:px-6 py-4 border-b bg-white flex-shrink-0">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Struktur Organisasi</h1>
        </div>

        <!-- Content Container - Sama persis dengan mockup -->
        <div class="flex-1 flex flex-col gap-4 p-4 overflow-hidden">
          <!-- Structure Section - Top Half (sama dengan mockup) -->
          <div class="h-1/2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <!-- Structure Header - Background biru seperti mockup -->
            <div class="px-4 py-3 bg-blue-500 text-white flex items-center gap-2 flex-shrink-0 rounded-t-lg">
              <Icon name="lucide:chevron-down" class="w-4 h-4" />
              <span class="font-medium text-sm">Struktur</span>
            </div>
            
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
                    <Icon name="lucide:eye" class="w-4 h-4" />
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
            <div class="flex-1 overflow-auto">
              <div v-if="omStore.isLoading" class="p-8 text-center">
                <Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                <p class="text-sm text-gray-500">Memuat data...</p>
              </div>
              
              <div v-else-if="omStore.isError" class="p-8 text-center">
                <Icon name="lucide:alert-circle" class="w-6 h-6 mx-auto text-red-500 mb-2" />
                <p class="text-sm text-red-600">{{ omStore.errorMessage || 'Data tidak ditemukan' }}</p>
                <button
                  @click="omStore.fetchOrgStructure()"
                  class="mt-3 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Coba Lagi
                </button>
              </div>

              <div v-else-if="displayData.length > 0" class="overflow-auto">
                <SimpleTree
                  v-for="item in displayData"
                  :key="item.id"
                  :node="item"
                  :level="0"
                  :selectedId="selectedNodeId"
                  @select="handleSelect"
                  @action="handleTreeAction"
                />
              </div>
              
              <div v-else class="p-8 text-center text-gray-500 text-sm">
                {{ searchQuery ? 'Tidak ada hasil pencarian' : 'Tidak ada data organisasi' }}
              </div>
            </div>
          </div>

          <!-- Details Section - Bottom Half (sama dengan mockup) -->
          <div class="h-1/2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <!-- Detail Header - Background abu-abu seperti mockup -->
            <div class="px-4 py-3 border-b bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 flex-shrink-0 rounded-t-lg">
              <h2 class="text-lg font-semibold text-gray-800">Detail</h2>
              <div class="flex gap-1 bg-white p-1 rounded-lg border shadow-sm">
                <button
                  @click="viewMode = 'chart'"
                  class="px-3 py-2 rounded text-sm font-medium transition-colors"
                  :class="viewMode === 'chart' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'"
                >
                  Chart
                </button>
                <button
                  @click="viewMode = 'table'"
                  class="px-3 py-2 rounded text-sm font-medium transition-colors"
                  :class="viewMode === 'table' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'"
                >
                  Table
                </button>
                <button
                  @click="viewMode = 'details'"
                  class="px-3 py-2 rounded text-sm font-medium transition-colors"
                  :class="viewMode === 'details' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'"
                >
                  Details
                </button>
              </div>
            </div>

            <!-- Detail Content -->
            <div class="flex-1 overflow-auto">
              <!-- Chart View -->
              <div v-if="viewMode === 'chart'" class="h-full">
                <OrganizationChartOrgChart 
                  v-if="selectedNode"
                  :data="selectedNode" 
                />
                <div v-else class="flex items-center justify-center h-full p-8">
                  <div class="text-center">
                    <Icon name="lucide:sitemap" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 class="text-lg font-medium mb-2">Pilih Organisasi</h3>
                    <p class="text-gray-500">Pilih organisasi untuk melihat chart</p>
                  </div>
                </div>
              </div>

              <!-- Table View -->
              <div v-else-if="viewMode === 'table'" class="h-full">
                <OrganizationTableOrganizationTable 
                  v-if="selectedNode && selectedNode.children"
                  :data="selectedNode.children"
                  :isLoading="omStore.isLoading"
                  :selectedId="selectedNodeId"
                  @select="handleSelect"
                  @edit="handleEdit"
                  @delete="handleDelete"
                  @addChild="handleAddChild"
                />
                <div v-else class="flex items-center justify-center h-full p-8">
                  <div class="text-center">
                    <Icon name="lucide:table" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 class="text-lg font-medium mb-2">Pilih Organisasi</h3>
                    <p class="text-gray-500">Pilih organisasi untuk melihat tabel</p>
                  </div>
                </div>
              </div>

              <!-- Details View -->
              <div v-else class="p-6 h-full overflow-auto">
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
                
                <div v-else class="flex items-center justify-center h-full">
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
const viewMode = ref('chart')

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
})
</script>