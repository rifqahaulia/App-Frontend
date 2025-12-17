<script setup lang="ts">

  import { useOmStore, type TreeItem } from '~/stores/om/userOmOrgDetail'
  import { useOmOrgRelationStore } from '~/stores/om/useOmOrgDetail'
  
  const { profile } = useAuth()
  const omStore = useOmStore()
  const relationStore = useOmOrgRelationStore()
  
  const breadcrumbItems = [
    { label: 'Organisasi', path: '/index' },
    { label: 'Struktur Organisasi' },
  ]
  
  const selectedNode = ref<TreeItem | null>(null)
  

  const handleNodeSelect = async (node: TreeItem | any) => {
    if (!node) return
    
    selectedNode.value = node
    console.log('Selected node:', node)
    
    // Fetch relations for selected node
    if (node.children && node.children.length > 0) {
      const year = node.start_date 
        ? node.start_date.slice(0, 10) 
        : new Date().getFullYear().toString()
        
      await relationStore.fetchRelations(
        node.object_id,
        node.object_type,
        year
      )
    }
  }
  

  // Auto-select first node on mount
  watch(() => omStore.items, (items) => {
    if (items.length > 0 && !selectedNode.value && items[0]) {
      selectedNode.value = items[0]
    }
  }, { immediate: true })
  </script>
  
  <template>
    <div class="min-h-screen bg-white">
      <LayoutTheNavbar />
      
      <div class="flex">
        <LayoutTheSidebar />
        
        <main class="flex-1 bg-gray-50">
          <div class="p-6">
            <!-- Page Header with Breadcrumb -->
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h1 class="text-base font-semibold text-gray-900">
                Struktur Organisasi
              </h1>
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-600">Organisasi</span>
                <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-900" />
                <span class="font-semibold text-gray-900">Struktur Organisasi</span>
              </div>
            </div>
  
            <!-- Content -->
            <div class="flex gap-6">
              <!-- Left Sidebar - Tree -->
              <div class="w-1/3">
                <OrganizationTree
                  title="Struktur"
                  @select="handleNodeSelect"
                />
              </div>
  
              <!-- Right Content - Details -->
              <div class="flex-1">
                <!-- Selected Node Info -->
                <div v-if="selectedNode" class="bg-white rounded-lg shadow p-6">
                  <h2 class="text-lg font-semibold mb-4">Detail Organisasi</h2>
                  
                  <div class="space-y-3">
                    <div>
                      <label class="text-sm font-medium text-gray-500">Object ID</label>
                      <p class="text-gray-900">{{ selectedNode.object_id }}</p>
                    </div>
                    
                    <div>
                      <label class="text-sm font-medium text-gray-500">Nama Lengkap</label>
                      <p class="text-gray-900">{{ selectedNode.long_text }}</p>
                    </div>
                    
                    <div>
                      <label class="text-sm font-medium text-gray-500">Nama Pendek</label>
                      <p class="text-gray-900">{{ selectedNode.short_text }}</p>
                    </div>
                    
                    <div>
                      <label class="text-sm font-medium text-gray-500">Singkatan</label>
                      <p class="text-gray-900">{{ selectedNode.abbreviation }}</p>
                    </div>
                    
                    <div>
                      <label class="text-sm font-medium text-gray-500">Tipe</label>
                      <span class="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {{ selectedNode.object_type }}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="text-sm font-medium text-gray-500">Tanggal Mulai</label>
                        <p class="text-gray-900">{{ selectedNode.start_date }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500">Tanggal Selesai</label>
                        <p class="text-gray-900">{{ selectedNode.end_date || '-' }}</p>
                      </div>
                    </div>
                    
                    <div v-if="selectedNode.chief" class="flex items-center gap-2 text-blue-600">
                      <Icon name="lucide:crown" class="w-5 h-5" />
                      <span class="font-medium">Chief Position</span>
                    </div>
                  </div>
  
                  <!-- Relations Table -->
                  <div v-if="relationStore.relations.length > 0" class="mt-6">
                    <h3 class="text-md font-semibold mb-3">Relasi</h3>
                    
                    <div v-if="relationStore.isLoading" class="text-center py-4">
                      <Icon name="lucide:loader-2" class="w-5 h-5 animate-spin mx-auto text-blue-500" />
                    </div>
                    
                    <div v-else class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Relation Type
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Object Type
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Object ID
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Created By
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="relation in relationStore.relations" :key="relation.id">
                            <td class="px-4 py-3 text-sm text-gray-900">
                              {{ relation.relation_type }}
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900">
                              {{ relation.relation_object_type }}
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900">
                              {{ relation.relation_object_id }}
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900">
                              {{ relation.create_user }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
  
                <!-- No Selection State -->
                <div v-else class="bg-white rounded-lg shadow p-12 text-center">
                  <Icon name="lucide:folder-search" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 class="text-lg font-medium text-gray-900 mb-2">Pilih Organisasi</h3>
                  <p class="text-gray-500">Pilih organisasi dari struktur di sebelah kiri untuk melihat detail</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>