<script setup lang="ts">
  import { useOmStore, type TreeItem } from '~/stores/om/useOmStore'
  import { useOmRelationStore } from '~/stores/om/useOmRelationStore'
  
  definePageMeta({
    layout: 'default', // Adjust according to your layout
  })
  
  const omStore = useOmStore()
  const relationStore = useOmRelationStore()
  
  const selectedNode = computed(() => omStore.selectedObject)
  
  // View mode: 'details' or 'chart'
  const viewMode = ref<'details' | 'chart'>('chart')
  
  const handleNodeSelect = async (node: TreeItem) => {
    if (!node) return
    
    omStore.selectNode(node)
    console.log('Selected node:', node)
    
    // Fetch relations for selected node
    const date = node.start_date ? node.start_date.slice(0, 10) : undefined
    
    await relationStore.fetchRelations(
      node.object_id,
      node.object_type,
      date
    )
  }
  
  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === '9999-12-31') return '-'
    
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  // Get object type name
  const getObjectTypeName = (type: string) => {
    const types: Record<string, string> = {
      'O': 'Organization',
      'S': 'Position',
      'P': 'Person',
      'C': 'Cost Center',
      'K': 'Job'
    }
    return types[type] || type
  }
  
  // Get relation type name
  const getRelationTypeName = (type: string) => {
    const types: Record<string, string> = {
      'AOTO': 'Organization to Organization',
      'AOSC': 'Organization to Position (Chief)',
      'AOSM': 'Organization to Position (Member)',
      'ASTP': 'Position to Person'
    }
    return types[type] || type
  }
  </script>
  
  <template>
    <div class="min-h-screen bg-gray-50">
      <LayoutTheNavbar />
      
      <div class="flex">
        <LayoutTheSidebar />
        
        <main class="flex-1">
          <div class="p-6">
            <!-- Page Header with Breadcrumb -->
            <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h1 class="text-xl font-semibold text-gray-900">
                Struktur Organisasi
              </h1>
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-600">Organisasi</span>
                <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
                <span class="font-medium text-gray-900">Struktur Organisasi</span>
              </div>
            </div>
  
            <!-- Content -->
            <div class="flex gap-6">
              <!-- Left Sidebar - Tree (1/3 width) -->
              <div class="w-1/3 flex-shrink-0">
                <OrganizationTree
                  title="Struktur"
                  @select="handleNodeSelect"
                />
              </div>
  
              <!-- Right Content - Details/Chart (2/3 width) -->
              <div class="flex-1">
                <!-- View Mode Toggle -->
                <div v-if="selectedNode" class="mb-4 flex items-center justify-between">
                  <h2 class="text-lg font-semibold text-gray-900">Detail</h2>
                  
                  <div class="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                      @click="viewMode = 'chart'"
                      :class="[
                        'px-4 py-2 rounded-md text-sm font-medium transition-all',
                        viewMode === 'chart'
                          ? 'bg-white text-blue-600 shadow'
                          : 'text-gray-600 hover:text-gray-900'
                      ]"
                    >
                      <Icon name="lucide:sitemap" class="w-4 h-4 inline mr-2" />
                      Chart
                    </button>
                    <button
                      @click="viewMode = 'details'"
                      :class="[
                        'px-4 py-2 rounded-md text-sm font-medium transition-all',
                        viewMode === 'details'
                          ? 'bg-white text-blue-600 shadow'
                          : 'text-gray-600 hover:text-gray-900'
                      ]"
                    >
                      <Icon name="lucide:list" class="w-4 h-4 inline mr-2" />
                      Details
                    </button>
                  </div>
                </div>
  
                <!-- Chart View -->
                <div v-if="viewMode === 'chart' && selectedNode" class="bg-white rounded-lg shadow">
                  <OrgChart :data="selectedNode" />
                </div>
  
                <!-- Details View -->
                <div v-else-if="viewMode === 'details' && selectedNode" class="bg-white rounded-lg shadow p-6">
                  <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="lucide:info" class="w-5 h-5 text-blue-500" />
                    Informasi Organisasi
                  </h2>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Object ID</label>
                      <p class="text-gray-900 font-mono">{{ selectedNode.object_id }}</p>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Tipe</label>
                      <div class="flex items-center gap-2">
                        <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          <Icon name="lucide:tag" class="w-3 h-3 mr-1" />
                          {{ selectedNode.object_type }} - {{ getObjectTypeName(selectedNode.object_type) }}
                        </span>
                        <Icon 
                          v-if="selectedNode.chief" 
                          name="lucide:crown" 
                          class="w-5 h-5 text-yellow-500" 
                          title="Chief Position"
                        />
                      </div>
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-500 mb-1">Nama Lengkap</label>
                      <p class="text-gray-900 font-medium text-lg">{{ selectedNode.long_text }}</p>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Nama Pendek</label>
                      <p class="text-gray-900">{{ selectedNode.short_text || '-' }}</p>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Singkatan</label>
                      <p class="text-gray-900">{{ selectedNode.abbreviation || '-' }}</p>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Tanggal Mulai</label>
                      <div class="flex items-center gap-2 text-gray-900">
                        <Icon name="lucide:calendar" class="w-4 h-4 text-gray-400" />
                        {{ formatDate(selectedNode.start_date) }}
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Tanggal Selesai</label>
                      <div class="flex items-center gap-2 text-gray-900">
                        <Icon name="lucide:calendar" class="w-4 h-4 text-gray-400" />
                        {{ formatDate(selectedNode.end_date) }}
                      </div>
                    </div>
  
                    <div v-if="selectedNode.create_user">
                      <label class="block text-sm font-medium text-gray-500 mb-1">Dibuat Oleh</label>
                      <div class="flex items-center gap-2 text-gray-900">
                        <Icon name="lucide:user" class="w-4 h-4 text-gray-400" />
                        {{ selectedNode.create_user }}
                      </div>
                    </div>
  
                    <div v-if="selectedNode.create_time">
                      <label class="block text-sm font-medium text-gray-500 mb-1">Tanggal Dibuat</label>
                      <div class="flex items-center gap-2 text-gray-900">
                        <Icon name="lucide:clock" class="w-4 h-4 text-gray-400" />
                        {{ formatDate(selectedNode.create_time) }}
                      </div>
                    </div>
                  </div>
  
                  <!-- Relations Table -->
                  <div v-if="relationStore.relations.length > 0" class="mt-8 border-t pt-6">
                    <h3 class="text-md font-semibold mb-4 flex items-center gap-2">
                      <Icon name="lucide:git-branch" class="w-5 h-5 text-blue-500" />
                      Relasi ({{ relationStore.relations.length }})
                    </h3>
                    
                    <div v-if="relationStore.isLoading" class="text-center py-8">
                      <Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                      <p class="text-sm text-gray-500">Memuat relasi...</p>
                    </div>
                    
                    <div v-else class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tipe Relasi
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Object Type
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Object ID
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Periode
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Dibuat Oleh
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="relation in relationStore.relations" :key="relation.id" class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {{ relation.relation_type }}
                              </span>
                              <p class="text-xs text-gray-500 mt-1">
                                {{ getRelationTypeName(relation.relation_type) }}
                              </p>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900 font-medium">
                              {{ relation.relation_object_type }}
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900 font-mono">
                              {{ relation.relation_object_id }}
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">
                              <div class="flex items-center gap-1 text-xs">
                                <Icon name="lucide:calendar" class="w-3 h-3" />
                                {{ formatDate(relation.start_date) }}
                              </div>
                              <div v-if="relation.end_date !== '9999-12-31'" class="flex items-center gap-1 text-xs mt-1">
                                <Icon name="lucide:calendar-x" class="w-3 h-3" />
                                {{ formatDate(relation.end_date) }}
                              </div>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">
                              {{ relation.create_user }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
  
                  <!-- No Relations -->
                  <div v-else-if="!relationStore.isLoading" class="mt-8 border-t pt-6 text-center py-8">
                    <Icon name="lucide:git-branch" class="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p class="text-gray-500">Tidak ada relasi yang ditemukan</p>
                  </div>
                </div>
  
                <!-- No Selection State -->
                <div v-else class="bg-white rounded-lg shadow p-12 text-center">
                  <Icon name="lucide:folder-search" class="w-20 h-20 mx-auto text-gray-300 mb-4" />
                  <h3 class="text-lg font-medium text-gray-900 mb-2">Pilih Organisasi</h3>
                  <p class="text-gray-500 max-w-md mx-auto">
                    Pilih organisasi dari struktur di sebelah kiri untuk melihat detail dan struktur organisasi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>