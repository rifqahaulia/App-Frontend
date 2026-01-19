<script setup lang="ts">
// components/views/OrganisasiUnitContent.vue

interface OrganisasiUnit {
  id: string
  name: string
  parent?: string
  children?: OrganisasiUnit[]
  isExpanded?: boolean
}

const selectedUnit = ref<OrganisasiUnit | null>(null)
const showStructure = ref(true)
const searchQuery = ref('')
const showEditModal = ref(false)
const showCreateModal = ref(false)
const activeTab = ref('detail') // 'detail', 'child', 'position'
const startDateInput = ref<HTMLInputElement | null>(null)
const validToDateInput = ref<HTMLInputElement | null>(null)
const createStartDateInput = ref<HTMLInputElement | null>(null)
const createValidToDateInput = ref<HTMLInputElement | null>(null)
const editingData = ref({
  id: '',
  idSecondary: '',
  titelatur: '',
  description: '',
  area: '',
  start: '',
  validTo: ''
})

const createData = ref({
  idParent: '10000999',
  idUnit: '',
  titelatur: '',
  description: '',
  area: 'KANTOR PUSAT',
  start: '',
  validTo: '30 Maret 20250'
})

// Organization Child data
interface OrganizationChild {
  idUnit: string
  titelatur: string
  description: string
  start: string
  validTo: string
}

// Position data
interface Position {
  idPosition: string
  titelatur: string
  job: string
  start: string
  validTo: string
  person: string
  chief: string
  file: string
}

const organizationChildData = ref<OrganizationChild[]>([
  {
    idUnit: '100999',
    titelatur: '-',
    description: 'Perencanaan dan Evaluasi Teknologi Informasi',
    start: '12.10.2020',
    validTo: '12.10.2030'
  },
  {
    idUnit: '100991',
    titelatur: '-',
    description: 'Perencanaan dan Evaluasi Teknologi Informasi',
    start: '12.10.2020',
    validTo: '12.10.2030'
  },
  {
    idUnit: '100999',
    titelatur: '-',
    description: 'Perencanaan dan Evaluasi Teknologi Informasi',
    start: '12.10.2020',
    validTo: '12.10.2030'
  },
  {
    idUnit: '100992',
    titelatur: 'Manager',
    description: 'Divisi Teknologi dan Sistem Informasi',
    start: '15.03.2021',
    validTo: '15.03.2031'
  },
  {
    idUnit: '100993',
    titelatur: 'Supervisor',
    description: 'Unit Pengembangan Aplikasi',
    start: '20.06.2021',
    validTo: '20.06.2031'
  }
])

const positionData = ref<Position[]>([
  {
    idPosition: '100099',
    titelatur: '-',
    job: 'Perencanaan dan Evaluasi Teknologi Informasi',
    start: '12.10.2020',
    validTo: '12.10.2030',
    person: '1001234-Wahyudin',
    chief: 'Chief',
    file: 'File'
  },
  {
    idPosition: '100099',
    titelatur: '-',
    job: 'Perencanaan dan Evaluasi Teknologi Informasi',
    start: '12.10.2020',
    validTo: '12.10.2030',
    person: '1001234-Evan Denda',
    chief: '',
    file: 'File'
  },
  {
    idPosition: '100099',
    titelatur: '-',
    job: 'Perencanaan dan Evaluasi Teknologi Informasi',
    start: '12.10.2020',
    validTo: '12.10.2030',
    person: '1001234-Bellingham',
    chief: '',
    file: 'File'
  }
])

// Pagination for Organization Child
const childCurrentPage = ref(1)
const childItemsPerPage = ref(10)
const childSearchQuery = ref('')

// Pagination for Position
const positionCurrentPage = ref(1)
const positionItemsPerPage = ref(10)
const positionSearchQuery = ref('')

// Dummy data untuk struktur organisasi
const organisasiData = ref<OrganisasiUnit[]>([
  {
    id: '1',
    name: 'PERUM LPPNPI',
    isExpanded: true,
    children: [
      {
        id: '2',
        name: 'DIREKTORAT UTAMA - 00',
        isExpanded: true,
        children: [
          {
            id: '3',
            name: 'DIREKTORAT KESELAMATAN, KEAMANAN, KEMANANAN - 00',
            isExpanded: false
          },
          {
            id: '4',
            name: 'DIREKTORAT TEKNIK - 00',
            isExpanded: false
          },
          {
            id: '5',
            name: 'DIREKTORAT KEUANGAN MANAJEMEN RISIKO - 00',
            isExpanded: true,
            children: [
              {
                id: '6',
                name: 'DIVISI AKUNTANSI DAN ASET - 00',
                isExpanded: false
              },
              {
                id: '7',
                name: 'DIVISI PERENCANAAN KEUANGAN - 00',
                isExpanded: false
              },
              {
                id: '8',
                name: 'DIVISI TEKNOLOGI INFORMASI - 00',
                isExpanded: false
              }
            ]
          }
        ]
      }
    ]
  }
])

// Detail data untuk unit yang dipilih
const unitDetail = ref({
  id: '1000999',
  titelatur: '00',
  description: 'PERENCANAAN, PENGEMBANGAN DAN EVALUASI TEKNOLOGI INFORMASI',
  start: '10 OKTOBER 2018',
  validTo: '5 JULI 2028'
})

const toggleExpand = (unit: OrganisasiUnit) => {
  unit.isExpanded = !unit.isExpanded
}

const selectUnit = (unit: OrganisasiUnit) => {
  selectedUnit.value = unit
}

const toggleStructure = () => {
  showStructure.value = !showStructure.value
}

const handleEdit = () => {
  editingData.value = {
    id: unitDetail.value.id,
    idSecondary: '1001',
    titelatur: unitDetail.value.titelatur,
    description: unitDetail.value.description,
    area: 'KANTOR PUSAT',
    start: unitDetail.value.start,
    validTo: unitDetail.value.validTo
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const saveEdit = () => {
  // Handle save logic here
  console.log('Saving edit:', editingData.value)
  closeEditModal()
}

const handleCreate = () => {
  createData.value = {
    idParent: '10000999',
    idUnit: '',
    titelatur: '',
    description: '',
    area: 'KANTOR PUSAT',
    start: '',
    validTo: '30 Maret 20250'
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const saveCreate = () => {
  console.log('Creating organization:', createData.value)
  closeCreateModal()
}

const openCreateStartDatePicker = () => {
  if (createStartDateInput.value) {
    createStartDateInput.value.focus()
    createStartDateInput.value.click()
    if (createStartDateInput.value.showPicker) {
      createStartDateInput.value.showPicker()
    }
  }
}

const openCreateValidToDatePicker = () => {
  if (createValidToDateInput.value) {
    createValidToDateInput.value.focus()
    createValidToDateInput.value.click()
    if (createValidToDateInput.value.showPicker) {
      createValidToDateInput.value.showPicker()
    }
  }
}

const handleCreateStartDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.start = target.value
  }
}

const handleCreateValidToDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.validTo = target.value
  }
}

const triggerDatePicker = (inputId: string) => {
  const input = document.getElementById(inputId) as HTMLInputElement
  if (input) {
    input.focus()
    input.showPicker?.()
  }
}

const openStartDatePicker = () => {
  if (startDateInput.value) {
    startDateInput.value.showPicker()
  }
}

const openValidToDatePicker = () => {
  if (validToDateInput.value) {
    validToDateInput.value.showPicker()
  }
}

const handleStartDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    editingData.value.start = target.value
  }
}

const handleValidToDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    editingData.value.validTo = target.value
  }
}

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

// Organization Child pagination
const filteredChildData = computed(() => {
  if (!childSearchQuery.value) return organizationChildData.value
  
  const query = childSearchQuery.value.toLowerCase()
  return organizationChildData.value.filter(item => 
    item.idUnit.toLowerCase().includes(query) ||
    item.titelatur.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  )
})

const childTotalPages = computed(() => 
  Math.ceil(filteredChildData.value.length / childItemsPerPage.value)
)

const paginatedChildData = computed(() => {
  const start = (childCurrentPage.value - 1) * childItemsPerPage.value
  const end = start + childItemsPerPage.value
  return filteredChildData.value.slice(start, end)
})

const goToChildPage = (page: number) => {
  if (page >= 1 && page <= childTotalPages.value) {
    childCurrentPage.value = page
  }
}

// Position pagination
const filteredPositionData = computed(() => {
  if (!positionSearchQuery.value) return positionData.value
  
  const query = positionSearchQuery.value.toLowerCase()
  return positionData.value.filter(item => 
    item.idPosition.toLowerCase().includes(query) ||
    item.titelatur.toLowerCase().includes(query) ||
    item.job.toLowerCase().includes(query) ||
    item.person.toLowerCase().includes(query)
  )
})

const positionTotalPages = computed(() => 
  Math.ceil(filteredPositionData.value.length / positionItemsPerPage.value)
)

const paginatedPositionData = computed(() => {
  const start = (positionCurrentPage.value - 1) * positionItemsPerPage.value
  const end = start + positionItemsPerPage.value
  return filteredPositionData.value.slice(start, end)
})

const goToPositionPage = (page: number) => {
  if (page >= 1 && page <= positionTotalPages.value) {
    positionCurrentPage.value = page
  }
}

// Reset to page 1 when search changes
watch(childSearchQuery, () => {
  childCurrentPage.value = 1
})

watch(positionSearchQuery, () => {
  positionCurrentPage.value = 1
})

// Filter function for search
const filterUnits = (units: OrganisasiUnit[], query: string): OrganisasiUnit[] => {
  if (!query) return units
  
  const filtered: OrganisasiUnit[] = []
  
  for (const unit of units) {
    const matchesQuery = unit.name.toLowerCase().includes(query.toLowerCase())
    const filteredChildren = unit.children ? filterUnits(unit.children, query) : []
    
    if (matchesQuery || filteredChildren.length > 0) {
      filtered.push({
        ...unit,
        children: filteredChildren,
        isExpanded: query ? true : unit.isExpanded // Auto expand when searching
      })
    }
  }
  
  return filtered
}

// Computed property for filtered data
const filteredOrganisasiData = computed(() => {
  return filterUnits(organisasiData.value, searchQuery.value)
})

// Set default selected unit
onMounted(() => {
  selectedUnit.value = organisasiData.value[0]?.children?.[0]?.children?.[2] || null
})
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Struktur Section -->
    <div class="mb-6">
      <!-- Struktur Header - Always visible -->
      <div 
        class="px-4 py-3 rounded-t-lg transition-colors"
        :class="showStructure ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-200'"
      >
        <button 
          @click="toggleStructure"
          class="flex items-center gap-2 text-sm font-medium w-full text-left"
        >
          <Icon 
            name="lucide:chevron-down" 
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': !showStructure }"
          />
          Struktur
        </button>
      </div>
      
      <!-- Struktur Content -->
      <div 
        v-if="showStructure" 
        class="bg-white border border-t-0 border-gray-200 rounded-b-lg"
      >
        <!-- Search Box -->
        <div class="p-4 border-b border-gray-200">
          <div class="relative">
            <Icon 
              name="lucide:search" 
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Tree Structure -->
        <div class="p-4 bg-white">
          <OrganisasiUnitTree 
            :data="filteredOrganisasiData" 
            :selected="selectedUnit"
            @select="selectUnit"
            @toggle="toggleExpand"
          />
        </div>
      </div>
    </div>

    <!-- Detail Section -->
    <div v-if="selectedUnit" class="flex-1">
      <!-- Detail Organization Card -->
      <div class="bg-white rounded border border-gray-200 p-4">
        <!-- Title inside card with bold and border -->
        <h2 class="text-base font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">
          Detail Organisasi Unit - {{ selectedUnit.name }}
        </h2>
        
        <!-- Tab Navigation - Inside the card with proper spacing -->
        <div class="flex justify-around gap-6 mb-6 px-4">
          <div 
            @click="setActiveTab('detail')"
            class="flex items-center gap-2 px-12 py-3 rounded cursor-pointer transition-colors"
            :class="activeTab === 'detail' ? 'bg-blue-100' : 'hover:bg-gray-50'"
          >
            <Icon name="lucide:info" class="w-4 h-4" :class="activeTab === 'detail' ? 'text-blue-500' : 'text-gray-600'" />
            <div class="flex flex-col">
              <span class="text-sm font-bold" :class="activeTab === 'detail' ? 'text-blue-500' : 'text-gray-700'">Detail Organization</span>
              <span class="text-xs" :class="activeTab === 'detail' ? 'text-blue-500' : 'text-gray-500'">Organization Information</span>
            </div>
          </div>
          
          <div 
            @click="setActiveTab('child')"
            class="flex items-center gap-2 px-12 py-3 rounded cursor-pointer transition-colors"
            :class="activeTab === 'child' ? 'bg-blue-100' : 'hover:bg-gray-50'"
          >
            <Icon name="lucide:users" class="w-4 h-4" :class="activeTab === 'child' ? 'text-blue-500' : 'text-gray-600'" />
            <div class="flex flex-col">
              <span class="text-sm font-bold" :class="activeTab === 'child' ? 'text-blue-500' : 'text-gray-700'">Organization Child</span>
              <span class="text-xs" :class="activeTab === 'child' ? 'text-blue-500' : 'text-gray-500'">Organization Child Information</span>
            </div>
          </div>
          
          <div 
            @click="setActiveTab('position')"
            class="flex items-center gap-2 px-12 py-3 rounded cursor-pointer transition-colors"
            :class="activeTab === 'position' ? 'bg-blue-100' : 'hover:bg-gray-50'"
          >
            <Icon name="lucide:map-pin" class="w-4 h-4" :class="activeTab === 'position' ? 'text-blue-500' : 'text-gray-600'" />
            <div class="flex flex-col">
              <span class="text-sm font-bold" :class="activeTab === 'position' ? 'text-blue-500' : 'text-gray-700'">Position</span>
              <span class="text-xs" :class="activeTab === 'position' ? 'text-blue-500' : 'text-gray-500'">Position Information</span>
            </div>
          </div>
        </div>

        <!-- Detail Organization Form - Show when activeTab is 'detail' -->
        <div v-if="activeTab === 'detail'" class="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <!-- Form Header -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-medium text-gray-900">Detail Organization</h3>
            <button 
              @click="handleEdit"
              class="flex items-center gap-1 px-2 py-1 text-blue-600 border border-blue-200 rounded text-sm hover:bg-blue-50 transition-colors"
            >
              <Icon name="lucide:edit-2" class="w-3 h-3" />
              Edit
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-3">
            <!-- ID -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">ID</label>
              <input 
                type="text" 
                :value="unitDetail.id"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700 text-sm"
              />
            </div>

            <!-- Titelatur -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Titelatur</label>
              <input 
                type="text" 
                :value="unitDetail.titelatur"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700 text-sm"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                :value="unitDetail.description"
                readonly
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700 text-sm resize-none"
              ></textarea>
            </div>

            <!-- Date Range -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Start</label>
                <div class="relative">
                  <input 
                    type="text" 
                    :value="unitDetail.start"
                    readonly
                    class="w-full px-3 py-2 pr-8 border border-gray-300 rounded bg-gray-100 text-gray-700 text-sm"
                  />
                  <Icon name="lucide:calendar" class="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Valid to</label>
                <div class="relative">
                  <input 
                    type="text" 
                    :value="unitDetail.validTo"
                    readonly
                    class="w-full px-3 py-2 pr-8 border border-gray-300 rounded bg-gray-100 text-gray-700 text-sm"
                  />
                  <Icon name="lucide:calendar" class="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Organization Child Content - Show when activeTab is 'child' -->
        <div v-if="activeTab === 'child'">
          <!-- Form Header -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-medium text-gray-900">Organization Child</h3>
            <button 
              @click="handleCreate"
              class="flex items-center gap-1 px-2 py-1 text-blue-600 border border-blue-200 rounded text-sm hover:bg-blue-50 transition-colors"
            >
              <Icon name="lucide:plus" class="w-3 h-3" />
              Create
            </button>
          </div>

          <!-- Create Form will be shown as modal -->

          <!-- Table Container -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
            <!-- Search Bar -->
            <div class="px-6 py-4 bg-white border-b border-gray-200">
              <div class="relative max-w-xs">
                <Icon 
                  name="lucide:search" 
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />
                <input
                  v-model="childSearchQuery"
                  type="text"
                  placeholder="Search..."
                  class="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto px-6 py-6">
              <table class="w-full">
                <thead class="bg-blue-100/60 rounded-t-xl">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                      ID Unit
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Titelatur
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Description
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Start
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide last:rounded-tr-xl">
                      Valid to
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr 
                    v-for="(item, index) in paginatedChildData" 
                    :key="index"
                    class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {{ item.idUnit }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ item.titelatur }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ item.description }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ item.start }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ item.validTo }}
                    </td>
                  </tr>
                  
                  <!-- Empty State -->
                  <tr v-if="paginatedChildData.length === 0">
                    <td colspan="5" class="px-6 py-16 text-center">
                      <Icon name="lucide:inbox" class="w-14 h-14 mx-auto mb-4 text-gray-300" />
                      <p class="text-sm font-medium text-gray-600">Tidak ada data yang ditemukan</p>
                      <p class="text-xs text-gray-500 mt-1">Coba ubah kata kunci pencarian Anda</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
              <div class="text-sm text-gray-600 font-medium">
                Menampilkan {{ paginatedChildData.length > 0 ? (childCurrentPage - 1) * childItemsPerPage + 1 : 0 }} - 
                {{ Math.min(childCurrentPage * childItemsPerPage, filteredChildData.length) }} 
                dari {{ filteredChildData.length }} data
              </div>
              
              <div class="flex items-center gap-2">
                <button
                  @click="goToChildPage(childCurrentPage - 1)"
                  :disabled="childCurrentPage === 1"
                  class="px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                
                <template v-if="childTotalPages <= 7">
                  <button
                    v-for="page in childTotalPages"
                    :key="page"
                    @click="goToChildPage(page)"
                    :class="[
                      'px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
                      childCurrentPage === page 
                        ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                
                <button
                  @click="goToChildPage(childCurrentPage + 1)"
                  :disabled="childCurrentPage === childTotalPages"
                  class="px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Position Content - Show when activeTab is 'position' -->
        <div v-if="activeTab === 'position'">
          <!-- Form Header -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-medium text-gray-900">Position</h3>
            <button 
              @click="handleCreate"
              class="flex items-center gap-1 px-2 py-1 text-blue-600 border border-blue-200 rounded text-sm hover:bg-blue-50 transition-colors"
            >
              <Icon name="lucide:plus" class="w-3 h-3" />
              Create
            </button>
          </div>

          <!-- Table Container -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
            <!-- Search Bar -->
            <div class="px-6 py-4 bg-white border-b border-gray-200">
              <div class="relative max-w-xs">
                <Icon 
                  name="lucide:search" 
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />
                <input
                  v-model="positionSearchQuery"
                  type="text"
                  placeholder="Search..."
                  class="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto px-6 py-6">
              <table class="w-full">
                <thead class="bg-blue-100/60 rounded-t-xl">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                      ID Position
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Titelatur
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Job
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Start
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Valid to
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Person
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Chief
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide last:rounded-tr-xl">
                      File
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr 
                    v-for="(item, index) in paginatedPositionData" 
                    :key="index"
                    class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {{ item.idPosition }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ item.titelatur }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ item.job }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ item.start }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ item.validTo }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ item.person }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span v-if="item.chief" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{{ item.chief }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <button class="flex items-center gap-1 hover:text-blue-800 transition-colors">
                        <Icon name="lucide:file" class="w-4 h-4" />
                        {{ item.file }}
                      </button>
                    </td>
                  </tr>
                  
                  <!-- Empty State -->
                  <tr v-if="paginatedPositionData.length === 0">
                    <td colspan="8" class="px-6 py-16 text-center">
                      <Icon name="lucide:inbox" class="w-14 h-14 mx-auto mb-4 text-gray-300" />
                      <p class="text-sm font-medium text-gray-600">Tidak ada data yang ditemukan</p>
                      <p class="text-xs text-gray-500 mt-1">Coba ubah kata kunci pencarian Anda</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
              <div class="text-sm text-gray-600 font-medium">
                Menampilkan {{ paginatedPositionData.length > 0 ? (positionCurrentPage - 1) * positionItemsPerPage + 1 : 0 }} - 
                {{ Math.min(positionCurrentPage * positionItemsPerPage, filteredPositionData.length) }} 
                dari {{ filteredPositionData.length }} data
              </div>
              
              <div class="flex items-center gap-2">
                <button
                  @click="goToPositionPage(positionCurrentPage - 1)"
                  :disabled="positionCurrentPage === 1"
                  class="px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                
                <template v-if="positionTotalPages <= 7">
                  <button
                    v-for="page in positionTotalPages"
                    :key="page"
                    @click="goToPositionPage(page)"
                    :class="[
                      'px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
                      positionCurrentPage === page 
                        ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                
                <button
                  @click="goToPositionPage(positionCurrentPage + 1)"
                  :disabled="positionCurrentPage === positionTotalPages"
                  class="px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Edit Organization</h3>
        <button @click="closeEditModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <!-- ID Fields - 2 columns -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Id</label>
            <input 
              v-model="editingData.id"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              readonly
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Id</label>
            <input 
              v-model="editingData.idSecondary"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              readonly
            />
          </div>
        </div>

        <!-- Titelatur -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titelatur</label>
          <input 
            v-model="editingData.titelatur"
            type="text" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            v-model="editingData.description"
            rows="3"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <!-- Area -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Area</label>
          <div class="relative">
            <select 
              v-model="editingData.area"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-10 bg-gray-100"
              disabled
            >
              <option value="KANTOR PUSAT">KANTOR PUSAT</option>
              <option value="KANTOR CABANG">KANTOR CABANG</option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <!-- Date Range -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start</label>
            <div class="relative">
              <input 
                v-model="editingData.start"
                type="text" 
                placeholder="Select Start Date"
                readonly
                @click="openStartDatePicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="startDateInput"
                type="date"
                @change="handleStartDateChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openStartDatePicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <Icon name="lucide:calendar" class="w-4 h-4 text-blue-500" />
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valid to</label>
            <div class="relative">
              <input 
                v-model="editingData.validTo"
                type="text" 
                placeholder="Select Valid To Date"
                readonly
                @click="openValidToDatePicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="validToDateInput"
                type="date"
                @change="handleValidToDateChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openValidToDatePicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <Icon name="lucide:calendar" class="w-4 h-4 text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        <!-- Checkbox -->
        <div class="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="tidak-ditentukan"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="tidak-ditentukan" class="text-sm text-gray-700">Tidak ditentukan</label>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
        <button 
          @click="closeEditModal" 
          class="px-6 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50"
        >
          Cancel
        </button>
        <button 
          @click="saveEdit" 
          class="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  </div>

  <!-- Create Modal -->
  <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Create Organization</h3>
        <button @click="closeCreateModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <!-- ID Fields - 2 columns -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Id Parent</label>
            <input 
              v-model="createData.idParent"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              readonly
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Id Unit</label>
            <input 
              v-model="createData.idUnit"
              type="text" 
              placeholder="Id Unit"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Titelatur -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titelatur</label>
          <input 
            v-model="createData.titelatur"
            type="text" 
            placeholder="Titelatur"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            v-model="createData.description"
            rows="3"
            placeholder="Description"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <!-- Area -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Area</label>
          <div class="relative">
            <select 
              v-model="createData.area"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-10 bg-gray-100"
              disabled
            >
              <option value="KANTOR PUSAT">KANTOR PUSAT</option>
              <option value="KANTOR CABANG">KANTOR CABANG</option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <!-- Date Range -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start</label>
            <div class="relative">
              <input 
                v-model="createData.start"
                type="text" 
                placeholder="Select date"
                readonly
                @click="openCreateStartDatePicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="createStartDateInput"
                type="date"
                @change="handleCreateStartDateChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openCreateStartDatePicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valid to</label>
            <div class="relative">
              <input 
                v-model="createData.validTo"
                type="text" 
                placeholder="30 Maret 20250"
                readonly
                @click="openCreateValidToDatePicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-gray-100"
              />
              <input 
                ref="createValidToDateInput"
                type="date"
                @change="handleCreateValidToDateChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openCreateValidToDatePicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
        <button 
          @click="closeCreateModal" 
          class="px-6 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50"
        >
          Cancel
        </button>
        <button 
          @click="saveCreate" 
          class="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>