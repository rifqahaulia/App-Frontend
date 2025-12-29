<template>
  <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
    <LayoutTheNavbar />
    
    <div class="flex flex-1 overflow-hidden">
      <LayoutTheSidebar />
      
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="px-4 sm:px-6 py-4 border-b bg-white flex-shrink-0">
          <div class="flex items-center justify-between">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900">RACI</h1>
            <!-- Breadcrumb -->
            <div class="flex items-center text-sm text-gray-500">
              <span>Organisasi</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span>Report</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">RACI</span>
            </div>
          </div>
        </div>

        <!-- Content Container -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-6">
            <!-- Tabs -->
            <div class="mb-6">
              <div class="flex gap-1">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 border rounded-t',
                    activeTab === tab.id 
                      ? 'text-blue-600 border-blue-300 bg-blue-50 border-b-white' 
                      : 'text-gray-500 border-gray-300 bg-white hover:text-gray-700'
                  ]"
                >
                  {{ tab.name }}
                  <Icon name="lucide:copy" class="w-4 h-4" />
                </button>
                <button class="px-4 py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors border border-gray-300 rounded-t bg-white">
                  +
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mb-6 flex gap-3">
              <button class="px-4 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm">
                <Icon name="lucide:plus" class="w-4 h-4" />
                Add Row
              </button>
              <button class="px-4 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm">
                <Icon name="lucide:plus" class="w-4 h-4" />
                Add Column
              </button>
              <div class="flex gap-3 ml-auto">
                <button class="px-4 py-2 bg-white text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-300 shadow-sm">
                  <Icon name="lucide:download" class="w-4 h-4" />
                  Download Template
                </button>
                <button class="px-4 py-2 bg-white text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-300 shadow-sm">
                  <Icon name="lucide:upload" class="w-4 h-4" />
                  Import
                </button>
              </div>
            </div>

            <!-- RACI Table -->
            <div class="bg-white border border-gray-300 overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <!-- Header -->
                  <thead>
                    <tr class="bg-blue-100">
                      <th class="px-4 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300">
                        PROSES BISNIS
                      </th>
                      <th class="px-4 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300">
                        GROUP
                      </th>
                      <th v-for="role in roles" :key="role.id" class="px-3 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 min-w-[120px]">
                        <div class="flex flex-col items-center">
                          <span class="font-bold text-gray-900 text-xs mb-1">{{ role.title }}</span>
                          <span class="text-xs font-medium text-gray-800 normal-case leading-tight">{{ role.subtitle }}</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  
                  <!-- Body -->
                  <tbody class="bg-white">
                    <tr v-for="(process, index) in processes" :key="process.id" class="border-b border-gray-300">
                      <td class="px-4 py-3 border-r border-gray-300">
                        <div class="flex items-center gap-2">
                          <button 
                            v-if="process.children"
                            @click="toggleProcess(process.id)"
                            class="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Icon 
                              name="lucide:chevron-right"
                              class="w-4 h-4 transition-transform duration-200"
                              :class="{ 'rotate-90': expandedProcesses.includes(process.id) }"
                            />
                          </button>
                          <span class="text-sm text-gray-900 font-medium" :class="{ 'ml-6': !process.children }">
                            {{ process.name }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-600">
                        {{ process.group }}
                      </td>
                      <td v-for="role in roles" :key="role.id" class="px-3 py-3 text-center border-r border-gray-300">
                        <div class="flex justify-center">
                          <span 
                            v-if="process.assignments && process.assignments[role.id]"
                            :class="getRaciClass(process.assignments[role.id])"
                            class="inline-flex items-center justify-center w-7 h-7 rounded text-sm font-bold"
                          >
                            {{ process.assignments[role.id] }}
                          </span>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Child processes -->
                    <template v-for="process in processes" :key="`children-${process.id}`">
                      <tr 
                        v-for="child in process.children" 
                        :key="child.id"
                        v-show="expandedProcesses.includes(process.id)"
                        class="border-b border-gray-300"
                      >
                        <td class="px-4 py-3 border-r border-gray-300">
                          <div class="flex items-center gap-2 ml-6">
                            <button 
                              v-if="child.children"
                              @click="toggleProcess(child.id)"
                              class="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Icon 
                                name="lucide:chevron-right"
                                class="w-4 h-4 transition-transform duration-200"
                                :class="{ 'rotate-90': expandedProcesses.includes(child.id) }"
                              />
                            </button>
                            <span class="text-sm text-gray-900" :class="{ 'ml-6': !child.children }">
                              {{ child.name }}
                            </span>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-600">
                          {{ child.group }}
                        </td>
                        <td v-for="role in roles" :key="role.id" class="px-3 py-3 text-center border-r border-gray-300">
                          <div class="flex justify-center">
                            <span 
                              v-if="child.assignments && child.assignments[role.id]"
                              :class="getRaciClass(child.assignments[role.id])"
                              class="inline-flex items-center justify-center w-7 h-7 rounded text-sm font-bold"
                            >
                              {{ child.assignments[role.id] }}
                            </span>
                          </div>
                        </td>
                      </tr>
                      
                      <!-- Sub-child processes -->
                      <template v-for="child in process.children" :key="`subchildren-${child.id}`">
                        <tr 
                          v-for="subchild in child.children" 
                          :key="subchild.id"
                          v-show="expandedProcesses.includes(process.id) && expandedProcesses.includes(child.id)"
                          class="border-b border-gray-300"
                        >
                          <td class="px-4 py-3 border-r border-gray-300">
                            <div class="flex items-center gap-2 ml-12">
                              <span class="text-sm text-gray-900">{{ subchild.name }}</span>
                            </div>
                          </td>
                          <td class="px-4 py-3 text-center border-r border-gray-300 text-sm text-gray-600">
                            {{ subchild.group }}
                          </td>
                          <td v-for="role in roles" :key="role.id" class="px-3 py-3 text-center border-r border-gray-300">
                            <div class="flex justify-center">
                              <span 
                                v-if="subchild.assignments && subchild.assignments[role.id]"
                                :class="getRaciClass(subchild.assignments[role.id])"
                                class="inline-flex items-center justify-center w-7 h-7 rounded text-sm font-bold"
                              >
                                {{ subchild.assignments[role.id] }}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </template>
                    </template>
                  </tbody>
                </table>
              </div>
              
              <!-- Pagination -->
              <div class="px-4 py-3 border-t border-gray-300 bg-gray-50 flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>Items per page:</span>
                  <select v-model="itemsPerPage" class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div class="flex items-center gap-1">
                  <button 
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white" 
                    :disabled="currentPage === 1"
                  >
                    ‹
                  </button>
                  <button 
                    v-for="page in visiblePages" 
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'px-3 py-1 border border-gray-300 rounded text-sm transition-colors',
                      currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'bg-white hover:bg-gray-100'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button 
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white" 
                    :disabled="currentPage === totalPages"
                  >
                    ›
                  </button>
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
definePageMeta({
  layout: 'default'
})

// Reactive data
const activeTab = ref('unit-hukum')
const expandedProcesses = ref([1, 2, 3]) // Pre-expand processes to match mockup
const currentPage = ref(2) // Set to page 2 as shown in mockup
const itemsPerPage = ref(10)

// Tabs data
const tabs = ref([
  { id: 'unit-hukum', name: 'Unit Hukum' },
  { id: 'internal-audit', name: 'Internal Audit' },
  { id: 'corporate-strategy', name: 'Corporate Strategy' }
])

// Roles data
const roles = ref([
  { id: 'kepala-biro-hukum', title: 'Kepala Biro', subtitle: 'Hukum' },
  { id: 'manager-bantuan-hukum', title: 'Manager', subtitle: 'Bantuan Hukum' },
  { id: 'kepala-biro-hukum-2', title: 'Kepala Biro', subtitle: 'Hukum' },
  { id: 'junior-manager-bantuan-hukum', title: 'Junior Manager', subtitle: 'Bantuan Hukum Non Litigasi' },
  { id: 'manager-pertimbangan-hukum', title: 'Manager', subtitle: 'Pertimbangan Hukum' },
  { id: 'junior-manager-pertimbangan-hukum-bidang', title: 'Junior Manager', subtitle: 'Pertimbangan Hukum Bidang Produk Internal' },
  { id: 'junior-manager-pertimbangan-hukum-eksternal', title: 'Junior Manager', subtitle: 'Pertimbangan Hukum Bidang Produk Eksternal' }
])

// Processes data with dummy RACI assignments
const processes = ref([
  {
    id: 1,
    name: 'Mengelola Hukum',
    group: '15',
    assignments: {
      'kepala-biro-hukum': 'A',
      'manager-bantuan-hukum': 'C'
    },
    children: [
      {
        id: 2,
        name: 'Mengelola kepatuhan peraturan perundang-undangan',
        group: '15',
        assignments: {
          'kepala-biro-hukum': 'A',
          'manager-bantuan-hukum': 'C',
          'junior-manager-bantuan-hukum': 'A'
        },
        children: [
          {
            id: 3,
            name: 'Mengelola legal environment',
            group: '15',
            assignments: {
              'kepala-biro-hukum': 'A',
              'manager-bantuan-hukum': 'C',
              'junior-manager-pertimbangan-hukum-bidang': 'C',
              'junior-manager-pertimbangan-hukum-eksternal': 'R'
            },
            children: [
              {
                id: 4,
                name: 'Melakukan identifikasi sumber, isu hukum dan peraturan yang dapat mempengaruhi bisnis perusahaan',
                group: '15',
                assignments: {}
              },
              {
                id: 5,
                name: 'Membuat sistem identifikasi sumber, isu hukum dan peraturan',
                group: '15',
                assignments: {}
              },
              {
                id: 6,
                name: 'Melakukan pengumpulan dan screening data terkait dengan peraturan yang dapat mempengaruhi bisnis perusahaan',
                group: '15',
                assignments: {}
              }
            ]
          },
          {
            id: 7,
            name: 'Mengelola dokumen legal dan perizinan',
            group: '15',
            assignments: {
              'kepala-biro-hukum': 'A',
              'manager-bantuan-hukum': 'C'
            }
          }
        ]
      }
    ]
  }
])

// Computed
const totalPages = computed(() => 10) // Fixed for demo to match mockup
const visiblePages = computed(() => {
  return [1, 2, 3, 8, 9, 10] // Exact pages shown in mockup
})

// Methods
const toggleProcess = (processId) => {
  const index = expandedProcesses.value.indexOf(processId)
  if (index > -1) {
    expandedProcesses.value.splice(index, 1)
  } else {
    expandedProcesses.value.push(processId)
  }
}

const getRaciClass = (assignment) => {
  switch (assignment) {
    case 'R':
      return 'bg-green-500 text-white'
    case 'A':
      return 'bg-blue-500 text-white'
    case 'C':
      return 'bg-yellow-500 text-white'
    case 'I':
      return 'bg-purple-500 text-white'
    default:
      return 'bg-gray-300 text-gray-700'
  }
}
</script>