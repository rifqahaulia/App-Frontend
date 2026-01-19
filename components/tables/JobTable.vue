<script setup lang="ts">
// components/tables/JobTable.vue

interface Job {
  idJob: string
  titelatur: string
  description: string
  start: string
  validTo: string
}

interface Props {
  data?: Job[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingItem = ref<Job | null>(null)

// Options untuk items per page
const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

// DATA DUMMY berdasarkan mockup
const dummyData: Job[] = [
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DEWAS',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'KOMITE AUDIT',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'KOMITE RESIKO & GCG',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'SEKRETARIAT DEWAS',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'AIR TRAFFIC CONTROLLER - HPP ENC',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'AERONAUTICAL COMMUNICATION OFFICER - HPP ENC',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'AERONAUTICAL INFORMATION SERVICE OFFICER - HPP ENC',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'SAFETY INSPECTOR',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  }
]

// Use props data if available, otherwise use dummy data
const jobData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Filter data based on search
const filteredData = computed(() => {
  if (!searchQuery.value) return jobData.value
  
  const query = searchQuery.value.toLowerCase()
  return jobData.value.filter(item => 
    item.idJob.toLowerCase().includes(query) ||
    item.titelatur.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  )
})

// Pagination
const totalPages = computed(() => 
  Math.ceil(filteredData.value.length / itemsPerPage.value)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1
})

// Reset to page 1 when items per page changes
watch(itemsPerPage, () => {
  currentPage.value = 1
})

// Create modal data
const createData = ref({
  idJob: '',
  titelatur: '',
  description: '',
  start: '',
  validTo: ''
})

// Edit modal data
const editData = ref({
  idJob: '',
  titelatur: '',
  description: '',
  start: '',
  validTo: ''
})

// Date picker refs
const createStartDateInput = ref<HTMLInputElement | null>(null)
const createValidToDateInput = ref<HTMLInputElement | null>(null)
const editStartDateInput = ref<HTMLInputElement | null>(null)
const editValidToDateInput = ref<HTMLInputElement | null>(null)

// Modal functions
const handleCreate = () => {
  createData.value = {
    idJob: '',
    titelatur: '',
    description: '',
    start: '',
    validTo: ''
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const saveCreate = () => {
  console.log('Creating job:', createData.value)
  closeCreateModal()
}

const handleEdit = (item: Job) => {
  editingItem.value = item
  editData.value = { ...item }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
}

const saveEdit = () => {
  console.log('Editing job:', editData.value)
  closeEditModal()
}

// Date picker functions for Create modal
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

// Date picker functions for Edit modal
const openEditStartDatePicker = () => {
  if (editStartDateInput.value) {
    editStartDateInput.value.focus()
    editStartDateInput.value.click()
    if (editStartDateInput.value.showPicker) {
      editStartDateInput.value.showPicker()
    }
  }
}

const openEditValidToDatePicker = () => {
  if (editValidToDateInput.value) {
    editValidToDateInput.value.focus()
    editValidToDateInput.value.click()
    if (editValidToDateInput.value.showPicker) {
      editValidToDateInput.value.showPicker()
    }
  }
}

const handleEditStartDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    editData.value.start = target.value
  }
}

const handleEditValidToDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    editData.value.validTo = target.value
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Header with Create Button -->
    <div class="px-6 py-4 bg-white rounded-t-2xl flex items-center justify-between">
      <div class="relative max-w-xs">
        <Icon 
          name="lucide:search" 
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
        />
      </div>
      
      <button 
        @click="handleCreate"
        class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        Tambah Job
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto px-6 pb-4">
      <table class="w-full">
        <thead class="bg-blue-100/60 rounded-t-xl">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
              ID JOB
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
              TITELATUR
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
              DESCRIPTION
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
              START
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
              VALID TO
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide last:rounded-tr-xl">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr 
            v-for="(item, index) in paginatedData" 
            :key="index"
            class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
              {{ item.idJob }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ item.titelatur }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
              {{ item.description }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ item.start }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ item.validTo }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              <button 
                @click="handleEdit(item)"
                class="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Icon name="lucide:edit-3" class="w-4 h-4 text-white" />
              </button>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="paginatedData.length === 0">
            <td colspan="6" class="px-6 py-16 text-center">
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
        Menampilkan {{ paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0 }} - 
        {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} 
        dari {{ filteredData.length }} data
      </div>
      
      <div class="flex items-center gap-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        
        <template v-if="totalPages <= 7">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
              currentPage === page 
                ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
        </template>
        
        <template v-else>
          <button
            @click="goToPage(1)"
            :class="[
              'px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
              currentPage === 1 
                ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            ]"
          >
            1
          </button>
          
          <span v-if="currentPage > 3" class="px-2 text-gray-500">...</span>
          
          <template v-for="page in totalPages" :key="page">
            <button
              v-if="page > 1 && page < totalPages && Math.abs(page - currentPage) <= 1"
              @click="goToPage(page)"
              :class="[
                'px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
                currentPage === page 
                  ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </template>
          
          <span v-if="currentPage < totalPages - 2" class="px-2 text-gray-500">...</span>
          
          <button
            @click="goToPage(totalPages)"
            :class="[
              'px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
              currentPage === totalPages 
                ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ totalPages }}
          </button>
        </template>
        
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <!-- Create Modal -->
  <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Tambah Job</h3>
        <button @click="closeCreateModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <!-- ID Job -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">ID Job</label>
          <input 
            v-model="createData.idJob"
            type="text" 
            placeholder="ID Job"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
                placeholder="Select date"
                readonly
                @click="openCreateValidToDatePicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
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

  <!-- Edit Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Edit Job</h3>
        <button @click="closeEditModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <!-- ID Job -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">ID Job</label>
          <input 
            v-model="editData.idJob"
            type="text" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
            readonly
          />
        </div>

        <!-- Titelatur -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titelatur</label>
          <input 
            v-model="editData.titelatur"
            type="text" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            v-model="editData.description"
            rows="3"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <!-- Date Range -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start</label>
            <div class="relative">
              <input 
                v-model="editData.start"
                type="text" 
                placeholder="Select date"
                readonly
                @click="openEditStartDatePicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="editStartDateInput"
                type="date"
                @change="handleEditStartDateChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openEditStartDatePicker"
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
                v-model="editData.validTo"
                type="text" 
                placeholder="Select date"
                readonly
                @click="openEditValidToDatePicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="editValidToDateInput"
                type="date"
                @change="handleEditValidToDateChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openEditValidToDatePicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
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
          Update
        </button>
      </div>
    </div>
  </div>
</template>