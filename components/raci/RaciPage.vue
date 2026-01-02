<template>
  <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
    <LayoutTheNavbar />
    
    <div class="flex flex-1 overflow-hidden">
      <LayoutTheSidebar />
      
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="px-4 md:px-6 py-4 border-b bg-white flex-shrink-0">
          <div class="flex items-center justify-between">
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">RACI</h1>
            <!-- Breadcrumb -->
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Organisasi</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span>Report</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">RACI</span>
            </div>
          </div>
        </div>

        <!-- Content Container - Scrollable area -->
        <div class="flex-1 overflow-y-auto bg-white relative">
          <div class="p-4 md:p-6">
            <!-- Tabs -->
            <RaciTabs 
              :tabs="tabs" 
              :activeTab="activeTab" 
              @update:activeTab="activeTab = $event"
              @openAddTab="openAddTabModal"
            />

            <!-- Action Buttons -->
            <div class="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="flex flex-wrap gap-2 md:gap-3">
                <button 
                  @click="openAddRowModal"
                  class="px-3 md:px-4 py-2 bg-[#65BEFF] text-white rounded-md text-xs md:text-sm font-medium hover:bg-[#189EFF] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Icon name="lucide:plus" class="w-3 h-3 md:w-4 md:h-4" />
                  <span class="hidden sm:inline">Add Row</span>
                  <span class="sm:hidden">Row</span>
                </button>
                <button 
                  @click="openAddColumnModal"
                  class="px-3 md:px-4 py-2 bg-[#65BEFF] text-white rounded-md text-xs md:text-sm font-medium hover:bg-[#189EFF] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Icon name="lucide:plus" class="w-3 h-3 md:w-4 md:h-4" />
                  <span class="hidden sm:inline">Add Column</span>
                  <span class="sm:hidden">Column</span>
                </button>
              </div>
              <div class="flex flex-wrap gap-2 md:gap-3">
                <button class="px-3 md:px-4 py-2 bg-white text-gray-700 rounded-md text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-300 shadow-sm">
                  <Icon name="lucide:download" class="w-3 h-3 md:w-4 md:h-4" />
                  <span class="hidden sm:inline">Download Template</span>
                  <span class="sm:hidden">Download</span>
                </button>
                <button class="px-3 md:px-4 py-2 bg-white text-gray-700 rounded-md text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-300 shadow-sm">
                  <Icon name="lucide:upload" class="w-3 h-3 md:w-4 md:h-4" />
                  <span class="hidden sm:inline">Import</span>
                  <span class="sm:hidden">Import</span>
                </button>
              </div>
            </div>

            <!-- RACI Table -->
            <div class="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <div class="overflow-x-auto">
                <table class="w-full border-collapse bg-white">
                  <!-- Header -->
                  <thead>
                    <tr class="bg-blue-100/60">
                      <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wide border-r border-gray-200">
                        PROSES BISNIS
                      </th>
                      <th class="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wide border-r border-gray-200">
                        GROUP
                      </th>
                      <th class="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wide border-r border-gray-200 min-w-[120px]">
                        <div class="flex flex-col items-center">
                          <div class="font-bold text-gray-600 text-xs mb-1">KEPALA</div>
                          <div class="font-bold text-gray-600 text-xs mb-1">BIRO</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Hukum</div>
                        </div>
                      </th>
                      <th class="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wide border-r border-gray-200 min-w-[120px]">
                        <div class="flex flex-col items-center">
                          <div class="font-bold text-gray-600 text-xs mb-1">MANAGER</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Bantuan</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Hukum</div>
                        </div>
                      </th>
                      <th class="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wide border-r border-gray-200 min-w-[120px]">
                        <div class="flex flex-col items-center">
                          <div class="font-bold text-gray-600 text-xs mb-1">KEPALA</div>
                          <div class="font-bold text-gray-600 text-xs mb-1">BIRO</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Hukum</div>
                        </div>
                      </th>
                      <th class="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wide border-r border-gray-200 min-w-[120px]">
                        <div class="flex flex-col items-center">
                          <div class="font-bold text-gray-600 text-xs mb-1">JUNIOR</div>
                          <div class="font-bold text-gray-600 text-xs mb-1">MANAGER</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Bantuan Hukum</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Non Litigasi</div>
                        </div>
                      </th>
                      <th class="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wide border-r border-gray-200 min-w-[120px]">
                        <div class="flex flex-col items-center">
                          <div class="font-bold text-gray-600 text-xs mb-1">MANAGER</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Pertimbangan</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Hukum</div>
                        </div>
                      </th>
                      <th class="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wide border-r border-gray-200 min-w-[140px]">
                        <div class="flex flex-col items-center">
                          <div class="font-bold text-gray-600 text-xs mb-1">JUNIOR MANAGER</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Pertimbangan Hukum</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Bidang Produk</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Internal</div>
                        </div>
                      </th>
                      <th class="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wide min-w-[140px]">
                        <div class="flex flex-col items-center">
                          <div class="font-bold text-gray-600 text-xs mb-1">JUNIOR MANAGER</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Pertimbangan Hukum</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Bidang Produk</div>
                          <div class="text-xs text-gray-500 normal-case font-normal">Eksternal</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  
                  <!-- Body -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <template v-for="process in paginatedProcesses" :key="process.id">
                      <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-4 py-3 border-r border-gray-300">
                          <div class="flex items-center gap-2" :style="{ paddingLeft: `${process.level * 24}px` }">
                            <!-- Show chevron for processes that have children -->
                            <button 
                              v-if="process.children && process.children.length > 0"
                              @click="toggleProcess(process.id)"
                              class="text-[#65BEFF] hover:text-[#189EFF] transition-colors"
                            >
                              <Icon 
                                :name="expandedProcesses.includes(process.id) ? 'lucide:chevron-down' : 'lucide:chevron-right'" 
                                class="w-4 h-4 transition-transform duration-200" 
                              />
                            </button>
                            <!-- Show static chevron for leaf nodes -->
                            <Icon 
                              v-else-if="process.level > 0"
                              name="lucide:chevron-right" 
                              class="w-4 h-4 text-gray-300" 
                            />
                            <span v-else class="w-4 h-4"></span>
                            <span class="text-sm text-gray-900" :class="{ 'font-medium': process.level === 0 }">{{ process.name }}</span>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-900 font-medium">{{ process.group }}</td>
                        <td class="px-3 py-3 text-center border-r border-gray-300">
                          <div class="flex justify-center">
                            <span class="text-sm font-medium text-gray-900" v-if="process.level === 0 || process.id === 'mengelola-kepatuhan' || process.id === 'mengelola-legal-environment' || process.id === 'mengelola-dokumen-legal'">A/C</span>
                          </div>
                        </td>
                        <td class="px-3 py-3 text-center border-r border-gray-300">
                          <div class="flex justify-center">
                            <button @click="openEditModal" class="text-[#65BEFF] hover:text-[#189EFF] transition-colors">
                              <Icon name="lucide:edit" class="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                        <td class="px-3 py-3 text-center border-r border-gray-300">
                          <div class="flex justify-center" v-if="process.id === 'mengelola-kepatuhan'">
                            <span class="text-sm font-medium text-gray-900">A</span>
                          </div>
                        </td>
                        <td class="px-3 py-3 text-center border-r border-gray-300">
                          <div class="flex justify-center" v-if="process.id === 'mengelola-legal-environment'">
                            <span class="text-sm font-medium text-gray-900">C/R</span>
                          </div>
                        </td>
                        <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                        <td class="px-3 py-3 text-center">
                          <div class="flex justify-center" v-if="process.id === 'mengelola-legal-environment'">
                            <span class="text-sm font-medium text-gray-900">C/R</span>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              
              <!-- Pagination -->
              <div class="px-4 py-3 border-t border-gray-300 bg-gray-50 flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>Items per page:</span>
                  <select 
                    :value="itemsPerPage" 
                    @change="changeItemsPerPage($event.target.value)"
                    class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                  <span class="ml-4">{{ startItem }}-{{ endItem }} of {{ totalItems }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <button 
                    @click="previousPage"
                    :disabled="currentPage === 1"
                    class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>
                  
                  <template v-for="page in pageNumbers" :key="page">
                    <button 
                      v-if="page !== '...'"
                      @click="goToPage(page)"
                      :class="[
                        'px-3 py-1 border rounded text-sm font-medium',
                        page === currentPage 
                          ? 'border-[#65BEFF] bg-[#65BEFF] text-white' 
                          : 'border-gray-300 bg-white hover:bg-gray-100 text-gray-700'
                      ]"
                    >
                      {{ page }}
                    </button>
                    <span v-else class="px-2 text-sm text-gray-500">...</span>
                  </template>
                  
                  <button 
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Input Value Modal - Positioned over the table -->
          <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-2xl w-96 max-w-md mx-4 border border-gray-200">
              <!-- Modal Header -->
              <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 class="text-lg font-semibold text-gray-900">Input Value</h3>
                <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                  <Icon name="lucide:x" class="w-5 h-5" />
                </button>
              </div>
              
              <!-- Modal Body -->
              <div class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Select Option</label>
                  <select v-model="selectedOption" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                    <option value="">Option</option>
                    <option value="R">R - Responsible</option>
                    <option value="A">A - Accountable</option>
                    <option value="C">C - Consulted</option>
                    <option value="I">I - Informed</option>
                    <option value="A/C">A/C</option>
                    <option value="C/R">C/R</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Option Reason</label>
                  <textarea 
                    v-model="optionReason" 
                    placeholder="Reason"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white"
                    rows="4"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">History:</label>
                  <div class="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md border">
                    <div class="flex items-center gap-1">
                      <Icon name="lucide:user" class="w-4 h-4 text-blue-500" />
                      <span class="text-xs">User</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Icon name="lucide:clock" class="w-4 h-4 text-green-500" />
                      <span class="text-xs">Time</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Icon name="lucide:info" class="w-4 h-4 text-orange-500" />
                      <span class="text-xs">Info</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Modal Footer -->
              <div class="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <button @click="closeEditModal" class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-100">
                  Cancel
                </button>
                <button @click="saveValue" class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors shadow-sm">
                  Add
                </button>
              </div>
            </div>
          </div>

          <!-- Add Row Modal -->
          <div v-if="showAddRowModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-2xl w-96 max-w-md mx-4 border border-gray-200">
              <!-- Modal Header -->
              <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-[#65BEFF] rounded-t-lg">
                <h3 class="text-lg font-semibold text-white">Add Row</h3>
                <button @click="closeAddRowModal" class="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20">
                  <Icon name="lucide:x" class="w-5 h-5" />
                </button>
              </div>
              
              <!-- Modal Body -->
              <div class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Parent</label>
                  <select 
                    v-model="addRowForm.parent" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white text-gray-500"
                  >
                    <option value="">Pilih Parent</option>
                    <option value="mengelola-hukum">Mengelola Hukum</option>
                    <option value="mengelola-keuangan">Mengelola Keuangan</option>
                    <option value="mengelola-sdm">Mengelola Sumber Daya Manusia</option>
                    <option value="mengelola-operasional">Mengelola Operasional</option>
                    <option value="mengelola-teknologi">Mengelola Teknologi Informasi</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">No Row</label>
                  <input 
                    v-model="addRowForm.noRow"
                    type="text" 
                    placeholder="No Row"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Label Row</label>
                  <input 
                    v-model="addRowForm.labelRow"
                    type="text" 
                    placeholder="Label Row"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white placeholder-gray-400"
                  />
                </div>
              </div>
              
              <!-- Modal Footer -->
              <div class="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <button @click="closeAddRowModal" class="px-4 py-2 text-sm font-medium text-[#65BEFF] hover:text-[#189EFF] transition-colors border border-[#65BEFF] rounded-md hover:bg-blue-50">
                  Cancel
                </button>
                <button @click="addNewRow" class="px-4 py-2 bg-[#65BEFF] text-white text-sm font-medium rounded-md hover:bg-[#189EFF] transition-colors shadow-sm">
                  Add
                </button>
              </div>
            </div>
          </div>

          <!-- Add Column Modal -->
          <div v-if="showAddColumnModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-2xl w-96 max-w-md mx-4 border border-gray-200">
              <!-- Modal Header -->
              <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-[#65BEFF] rounded-t-lg">
                <h3 class="text-lg font-semibold text-white">Add Column</h3>
                <button @click="closeAddColumnModal" class="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20">
                  <Icon name="lucide:x" class="w-5 h-5" />
                </button>
              </div>
              
              <!-- Modal Body -->
              <div class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">No Column</label>
                  <input 
                    v-model="addColumnForm.noColumn"
                    type="text" 
                    placeholder="No Column"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Label Column</label>
                  <input 
                    v-model="addColumnForm.labelColumn"
                    type="text" 
                    placeholder="Label Column"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white placeholder-gray-400"
                  />
                </div>
              </div>
              
              <!-- Modal Footer -->
              <div class="flex justify-end gap-3 p-4 border-t border-gray-200 bg-white rounded-b-lg">
                <button @click="closeAddColumnModal" class="px-6 py-2 text-sm font-medium text-[#65BEFF] hover:text-[#189EFF] transition-colors border border-[#65BEFF] rounded-md hover:bg-blue-50">
                  Cancel
                </button>
                <button @click="addNewColumn" class="px-6 py-2 bg-[#65BEFF] text-white text-sm font-medium rounded-md hover:bg-[#189EFF] transition-colors shadow-sm">
                  Add
                </button>
              </div>
            </div>
          </div>

          <!-- Add Tab Modal -->
          <div v-if="showAddTabModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-2xl w-96 max-w-md mx-4 border border-gray-200">
              <!-- Modal Header -->
              <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-[#65BEFF] rounded-t-lg">
                <h3 class="text-lg font-semibold text-white">Add Tab</h3>
                <button @click="closeAddTabModal" class="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20">
                  <Icon name="lucide:x" class="w-5 h-5" />
                </button>
              </div>
              
              <!-- Modal Body -->
              <div class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Label Tab</label>
                  <input 
                    v-model="addTabForm.labelTab"
                    type="text" 
                    placeholder="Label Tab"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white placeholder-gray-400"
                  />
                </div>
              </div>
              
              <!-- Modal Footer -->
              <div class="flex justify-end gap-3 p-4 border-t border-gray-200 bg-white rounded-b-lg">
                <button @click="closeAddTabModal" class="px-6 py-2 text-sm font-medium text-[#65BEFF] hover:text-[#189EFF] transition-colors border border-[#65BEFF] rounded-md hover:bg-blue-50">
                  Cancel
                </button>
                <button @click="addNewTab" class="px-6 py-2 bg-[#65BEFF] text-white text-sm font-medium rounded-md hover:bg-[#189EFF] transition-colors shadow-sm">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// Reactive data
const activeTab = ref('unit-hukum')
const showEditModal = ref(false)
const showAddRowModal = ref(false)
const showAddColumnModal = ref(false)
const showAddTabModal = ref(false)
const selectedOption = ref('')
const optionReason = ref('')
const expandedProcesses = ref([])

// Add Row form data
const addRowForm = ref({
  parent: '',
  noRow: '',
  labelRow: ''
})

// Add Column form data
const addColumnForm = ref({
  noColumn: '',
  labelColumn: ''
})

// Add Tab form data
const addTabForm = ref({
  labelTab: ''
})

// Pagination data
const itemsPerPage = ref(10)
const currentPage = ref(2)

// Dummy data for RACI processes - sesuai struktur hierarki yang diminta
const allProcesses = ref([
  {
    id: 'mengelola-hukum',
    name: 'Mengelola Hukum',
    group: 15,
    level: 0,
    children: [
      {
        id: 'mengelola-kepatuhan',
        name: 'Mengelola kepatuhan peraturan perundang-undangan',
        group: 15,
        level: 1,
        parent: 'mengelola-hukum'
      },
      {
        id: 'mengelola-legal-environment',
        name: 'Mengelola legal environment',
        group: 15,
        level: 1,
        parent: 'mengelola-hukum',
        children: [
          {
            id: 'identifikasi-sumber',
            name: 'Melakukan identifikasi sumber, isu hukum dan peraturan yang dapat mempengaruhi bisnis perusahaan',
            group: 15,
            level: 2,
            parent: 'mengelola-legal-environment'
          },
          {
            id: 'sistem-identifikasi',
            name: 'Membuat sistem identifikasi sumber, isu hukum dan peraturan',
            group: 15,
            level: 2,
            parent: 'mengelola-legal-environment'
          },
          {
            id: 'pengumpulan-screening',
            name: 'Melakukan pengumpulan dan screening data terkait dengan peraturan yang dapat mempengaruhi bisnis perusahaan',
            group: 15,
            level: 2,
            parent: 'mengelola-legal-environment'
          }
        ]
      },
      {
        id: 'mengelola-dokumen-legal',
        name: 'Mengelola dokumen legal dan perizinan',
        group: 15,
        level: 1,
        parent: 'mengelola-hukum'
      }
    ]
  },
  {
    id: 'mengelola-keuangan',
    name: 'Mengelola Keuangan',
    group: 12,
    level: 0,
    children: [
      {
        id: 'perencanaan-anggaran',
        name: 'Perencanaan dan penyusunan anggaran',
        group: 8,
        level: 1,
        parent: 'mengelola-keuangan'
      },
      {
        id: 'pengelolaan-kas',
        name: 'Pengelolaan kas dan investasi',
        group: 6,
        level: 1,
        parent: 'mengelola-keuangan',
        children: [
          {
            id: 'monitoring-kas',
            name: 'Monitoring dan pelaporan posisi kas harian',
            group: 4,
            level: 2,
            parent: 'pengelolaan-kas'
          },
          {
            id: 'investasi-jangka-pendek',
            name: 'Pengelolaan investasi jangka pendek',
            group: 3,
            level: 2,
            parent: 'pengelolaan-kas'
          }
        ]
      },
      {
        id: 'pelaporan-keuangan',
        name: 'Pelaporan keuangan',
        group: 10,
        level: 1,
        parent: 'mengelola-keuangan'
      }
    ]
  },
  {
    id: 'mengelola-sdm',
    name: 'Mengelola Sumber Daya Manusia',
    group: 18,
    level: 0,
    children: [
      {
        id: 'rekrutmen-seleksi',
        name: 'Rekrutmen dan seleksi karyawan',
        group: 12,
        level: 1,
        parent: 'mengelola-sdm',
        children: [
          {
            id: 'analisis-kebutuhan',
            name: 'Analisis kebutuhan tenaga kerja',
            group: 5,
            level: 2,
            parent: 'rekrutmen-seleksi'
          },
          {
            id: 'proses-seleksi',
            name: 'Pelaksanaan proses seleksi',
            group: 8,
            level: 2,
            parent: 'rekrutmen-seleksi'
          }
        ]
      },
      {
        id: 'pengembangan-karyawan',
        name: 'Pengembangan dan pelatihan karyawan',
        group: 14,
        level: 1,
        parent: 'mengelola-sdm'
      },
      {
        id: 'evaluasi-kinerja',
        name: 'Evaluasi kinerja karyawan',
        group: 9,
        level: 1,
        parent: 'mengelola-sdm'
      }
    ]
  },
  {
    id: 'mengelola-operasional',
    name: 'Mengelola Operasional',
    group: 25,
    level: 0,
    children: [
      {
        id: 'perencanaan-produksi',
        name: 'Perencanaan dan penjadwalan produksi',
        group: 15,
        level: 1,
        parent: 'mengelola-operasional'
      },
      {
        id: 'quality-control',
        name: 'Pengendalian kualitas',
        group: 12,
        level: 1,
        parent: 'mengelola-operasional',
        children: [
          {
            id: 'inspeksi-produk',
            name: 'Inspeksi dan pengujian produk',
            group: 8,
            level: 2,
            parent: 'quality-control'
          },
          {
            id: 'audit-kualitas',
            name: 'Audit sistem kualitas',
            group: 6,
            level: 2,
            parent: 'quality-control'
          }
        ]
      },
      {
        id: 'supply-chain',
        name: 'Manajemen rantai pasok',
        group: 20,
        level: 1,
        parent: 'mengelola-operasional'
      }
    ]
  },
  {
    id: 'mengelola-teknologi',
    name: 'Mengelola Teknologi Informasi',
    group: 16,
    level: 0,
    children: [
      {
        id: 'infrastruktur-it',
        name: 'Pengelolaan infrastruktur IT',
        group: 10,
        level: 1,
        parent: 'mengelola-teknologi'
      },
      {
        id: 'keamanan-sistem',
        name: 'Keamanan sistem informasi',
        group: 8,
        level: 1,
        parent: 'mengelola-teknologi',
        children: [
          {
            id: 'monitoring-keamanan',
            name: 'Monitoring dan deteksi ancaman',
            group: 5,
            level: 2,
            parent: 'keamanan-sistem'
          },
          {
            id: 'backup-recovery',
            name: 'Backup dan disaster recovery',
            group: 4,
            level: 2,
            parent: 'keamanan-sistem'
          }
        ]
      },
      {
        id: 'pengembangan-aplikasi',
        name: 'Pengembangan aplikasi',
        group: 12,
        level: 1,
        parent: 'mengelola-teknologi'
      }
    ]
  }
])

// Function to build display tree with expanded state
const buildDisplayTree = (processes, expandedIds) => {
  const result = []
  
  const addProcessWithChildren = (process) => {
    result.push(process)
    
    if (process.children && expandedIds.includes(process.id)) {
      process.children.forEach(child => {
        addProcessWithChildren(child)
      })
    }
  }
  
  processes.forEach(process => addProcessWithChildren(process))
  return result
}

// Get display tree based on expanded state
const displayProcesses = computed(() => {
  return buildDisplayTree(allProcesses.value, expandedProcesses.value)
})

// Update total items based on display tree
const totalItems = computed(() => displayProcesses.value.length)

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value))

// Get paginated processes from display tree
const paginatedProcesses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return displayProcesses.value.slice(start, end)
})

// Generate page numbers for pagination
const pageNumbers = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Tabs data
const tabs = ref([
  { id: 'unit-hukum', name: 'Unit Hukum' },
  { id: 'internal-audit', name: 'Internal Audit' },
  { id: 'corporate-strategy', name: 'Corporate Strategy' }
])

// Methods
const toggleProcess = (processId) => {
  const index = expandedProcesses.value.indexOf(processId)
  if (index > -1) {
    expandedProcesses.value.splice(index, 1)
  } else {
    expandedProcesses.value.push(processId)
  }
  // Reset to first page when expanding/collapsing to show the changes
  currentPage.value = 1
}

const openEditModal = () => {
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedOption.value = ''
  optionReason.value = ''
}

const openAddRowModal = () => {
  showAddRowModal.value = true
}

const closeAddRowModal = () => {
  showAddRowModal.value = false
  addRowForm.value = {
    parent: '',
    noRow: '',
    labelRow: ''
  }
}

const openAddColumnModal = () => {
  showAddColumnModal.value = true
}

const closeAddColumnModal = () => {
  showAddColumnModal.value = false
  addColumnForm.value = {
    noColumn: '',
    labelColumn: ''
  }
}

const openAddTabModal = () => {
  showAddTabModal.value = true
}

const closeAddTabModal = () => {
  showAddTabModal.value = false
  addTabForm.value = {
    labelTab: ''
  }
}

const addNewRow = () => {
  console.log('Adding new row:', addRowForm.value)
  // Here you would implement the logic to add the new row to your data
  closeAddRowModal()
}

const addNewColumn = () => {
  console.log('Adding new column:', addColumnForm.value)
  // Here you would implement the logic to add the new column to your data
  closeAddColumnModal()
}

const addNewTab = () => {
  console.log('Adding new tab:', addTabForm.value)
  // Here you would implement the logic to add the new tab to your data
  closeAddTabModal()
}

const saveValue = () => {
  console.log('Saving value:', {
    option: selectedOption.value,
    reason: optionReason.value
  })
  closeEditModal()
}

// Pagination methods
const changeItemsPerPage = (newValue) => {
  itemsPerPage.value = parseInt(newValue)
  currentPage.value = 1 // Reset to first page
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* Hide scrollbar for mobile tabs */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>