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
            />

            <!-- Action Buttons -->
            <div class="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="flex flex-wrap gap-2 md:gap-3">
                <button class="px-3 md:px-4 py-2 bg-[#65BEFF] text-white rounded-md text-xs md:text-sm font-medium hover:bg-[#189EFF] transition-colors flex items-center gap-2 shadow-sm">
                  <Icon name="lucide:plus" class="w-3 h-3 md:w-4 md:h-4" />
                  <span class="hidden sm:inline">Add Row</span>
                  <span class="sm:hidden">Row</span>
                </button>
                <button class="px-3 md:px-4 py-2 bg-[#65BEFF] text-white rounded-md text-xs md:text-sm font-medium hover:bg-[#189EFF] transition-colors flex items-center gap-2 shadow-sm">
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
                    <!-- Mengelola Hukum -->
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-4 py-3 border-r border-gray-300">
                        <div class="flex items-center gap-2">
                          <button 
                            @click="toggleProcess('mengelola-hukum')"
                            class="text-[#65BEFF] hover:text-[#189EFF] transition-colors"
                          >
                            <Icon 
                              :name="expandedProcesses.includes('mengelola-hukum') ? 'lucide:chevron-down' : 'lucide:chevron-right'" 
                              class="w-4 h-4 transition-transform duration-200" 
                            />
                          </button>
                          <span class="text-sm text-gray-900 font-medium">Mengelola Hukum</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-900 font-medium">15</td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <span class="text-sm font-medium text-gray-900">A/C</span>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <button @click="openEditModal" class="text-[#65BEFF] hover:text-[#189EFF] transition-colors">
                            <Icon name="lucide:edit" class="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <!-- Blue box removed -->
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center"></td>
                    </tr>
                    
                    <!-- Mengelola kepatuhan peraturan perundang-undangan -->
                    <tr 
                      v-show="expandedProcesses.includes('mengelola-hukum')"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-4 py-3 border-r border-gray-300">
                        <div class="flex items-center gap-2 ml-6">
                          <span class="text-sm text-gray-900">Mengelola kepatuhan peraturan perundang-undangan</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-900 font-medium">15</td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <span class="text-sm font-medium text-gray-900">A/C</span>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <button @click="openEditModal" class="text-[#65BEFF] hover:text-[#189EFF] transition-colors">
                            <Icon name="lucide:edit" class="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <!-- Blue box removed -->
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <span class="text-sm font-medium text-gray-900">A</span>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center"></td>
                    </tr>
                    
                    <!-- Mengelola legal environment -->
                    <tr 
                      v-show="expandedProcesses.includes('mengelola-hukum')"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-4 py-3 border-r border-gray-300">
                        <div class="flex items-center gap-2 ml-12">
                          <button 
                            @click="toggleProcess('mengelola-legal-environment')"
                            class="text-[#65BEFF] hover:text-[#189EFF] transition-colors"
                          >
                            <Icon 
                              :name="expandedProcesses.includes('mengelola-legal-environment') ? 'lucide:chevron-down' : 'lucide:chevron-right'" 
                              class="w-4 h-4 transition-transform duration-200" 
                            />
                          </button>
                          <span class="text-sm text-gray-900">Mengelola legal environment</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-900 font-medium">15</td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <span class="text-sm font-medium text-gray-900">A/C</span>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <button @click="openEditModal" class="text-[#65BEFF] hover:text-[#189EFF] transition-colors">
                            <Icon name="lucide:edit" class="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <!-- Blue box removed -->
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <span class="text-sm font-medium text-gray-900">C/R</span>
                        </div>
                      </td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center">
                        <div class="flex justify-center">
                          <span class="text-sm font-medium text-gray-900">C/R</span>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Sub processes -->
                    <tr 
                      v-show="expandedProcesses.includes('mengelola-hukum') && expandedProcesses.includes('mengelola-legal-environment')"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-4 py-3 border-r border-gray-300">
                        <div class="flex items-center gap-2 pl-16">
                          <span class="text-sm text-gray-900">Melakukan identifikasi sumber, isu hukum dan peraturan yang dapat mempengaruhi bisnis perusahaan</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-900 font-medium">15</td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center"></td>
                    </tr>
                    
                    <tr 
                      v-show="expandedProcesses.includes('mengelola-hukum') && expandedProcesses.includes('mengelola-legal-environment')"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-4 py-3 border-r border-gray-300">
                        <div class="flex items-center gap-2 pl-16">
                          <span class="text-sm text-gray-900">Membuat sistem identifikasi sumber, isu hukum dan peraturan</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-900 font-medium">15</td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center"></td>
                    </tr>
                    
                    <tr 
                      v-show="expandedProcesses.includes('mengelola-hukum') && expandedProcesses.includes('mengelola-legal-environment')"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-4 py-3 border-r border-gray-300">
                        <div class="flex items-center gap-2 pl-16">
                          <span class="text-sm text-gray-900">Melakukan pengumpulan dan screening data terkait dengan peraturan yang dapat mempengaruhi bisnis perusahaan</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-900 font-medium">15</td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center"></td>
                    </tr>
                    
                    <!-- Mengelola dokumen legal dan perizinan -->
                    <tr 
                      v-show="expandedProcesses.includes('mengelola-hukum')"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-4 py-3 border-r border-gray-300">
                        <div class="flex items-center gap-2 ml-12">
                          <button 
                            @click="toggleProcess('mengelola-dokumen-legal')"
                            class="text-[#65BEFF] hover:text-[#189EFF] transition-colors"
                          >
                            <Icon 
                              name="lucide:chevron-right" 
                              class="w-4 h-4 transition-transform duration-200"
                              :class="{ 'rotate-90': expandedProcesses.includes('mengelola-dokumen-legal') }"
                            />
                          </button>
                          <span class="text-sm text-gray-900">Mengelola dokumen legal dan perizinan</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-900 font-medium">15</td>
                      <td class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <span class="text-sm font-medium text-gray-900">A/C</span>
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
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center border-r border-gray-300"></td>
                      <td class="px-3 py-3 text-center"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <!-- Pagination -->
              <div class="px-4 py-3 border-t border-gray-300 bg-gray-50 flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>Items per page:</span>
                  <select class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white">
                    <option value="10">10</option>
                  </select>
                </div>
                <div class="flex items-center gap-1">
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 bg-white disabled:opacity-50">‹</button>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100">1</button>
                  <button class="px-3 py-1 border border-[#65BEFF] rounded text-sm bg-[#65BEFF] text-white font-medium">2</button>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100">3</button>
                  <span class="px-2 text-sm text-gray-500">...</span>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100">8</button>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100">9</button>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100">10</button>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 bg-white">›</button>
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
const selectedOption = ref('')
const optionReason = ref('')
const expandedProcesses = ref([])

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
}

const openEditModal = () => {
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedOption.value = ''
  optionReason.value = ''
}

const saveValue = () => {
  console.log('Saving value:', {
    option: selectedOption.value,
    reason: optionReason.value
  })
  closeEditModal()
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