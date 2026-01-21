<script setup lang="ts">
// components/tables/InfoSDMTable.vue

interface InfoSDM {
  judul: string
  oleh: string
  tanggalPublish: string
  segala: string
  enddo: string
}

interface Props {
  data?: InfoSDM[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingItem = ref<InfoSDM | null>(null)

// Date picker refs
const createTglBerlakuInput = ref<HTMLInputElement | null>(null)
const createTglBerakhirInput = ref<HTMLInputElement | null>(null)

// File input refs
const gambarFileInput = ref<HTMLInputElement | null>(null)
const lampiranFileInput = ref<HTMLInputElement | null>(null)

// Options untuk items per page
const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

// DATA DUMMY sesuai mockup
const dummyData: InfoSDM[] = [
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  },
  {
    judul: 'AHLI STATUS - 01.12.2021',
    oleh: 'Mutasi dan Pensiun',
    tanggalPublish: '2024-10-04 02:49:49',
    segala: '2021-02-25',
    enddo: '2021-02-25'
  }
]

// Use props data if available, otherwise use dummy data
const infoSDMData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Filter data based on search
const filteredData = computed(() => {
  if (!searchQuery.value) return infoSDMData.value
  
  const query = searchQuery.value.toLowerCase()
  return infoSDMData.value.filter(item => 
    item.judul.toLowerCase().includes(query) ||
    item.oleh.toLowerCase().includes(query) ||
    item.tanggalPublish.toLowerCase().includes(query) ||
    item.segala.toLowerCase().includes(query) ||
    item.enddo.toLowerCase().includes(query)
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
  judul: '',
  oleh: '',
  isiInfo: '',
  tglBerlaku: '',
  tglBerakhir: '',
  gambar: null as File | null,
  lampiran: null as File | null
})

// Edit modal data
const editData = ref({
  judul: '',
  oleh: '',
  tanggalPublish: '',
  segala: '',
  enddo: ''
})

// Date picker functions for Create modal
const openCreateTglBerlakuPicker = () => {
  if (createTglBerlakuInput.value) {
    createTglBerlakuInput.value.focus()
    createTglBerlakuInput.value.click()
    if (createTglBerlakuInput.value.showPicker) {
      createTglBerlakuInput.value.showPicker()
    }
  }
}

const openCreateTglBerakhirPicker = () => {
  if (createTglBerakhirInput.value) {
    createTglBerakhirInput.value.focus()
    createTglBerakhirInput.value.click()
    if (createTglBerakhirInput.value.showPicker) {
      createTglBerakhirInput.value.showPicker()
    }
  }
}

const handleCreateTglBerlakuChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tglBerlaku = target.value
  }
}

const handleCreateTglBerakhirChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tglBerakhir = target.value
  }
}

// File upload functions
const handleGambarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    createData.value.gambar = target.files[0]
  }
}

const handleLampiranUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    createData.value.lampiran = target.files[0]
  }
}

const triggerGambarUpload = () => {
  if (gambarFileInput.value) {
    gambarFileInput.value.click()
  }
}

const triggerLampiranUpload = () => {
  if (lampiranFileInput.value) {
    lampiranFileInput.value.click()
  }
}

// Modal functions
const handleCreate = () => {
  createData.value = {
    judul: '',
    oleh: '',
    isiInfo: '',
    tglBerlaku: '',
    tglBerakhir: '',
    gambar: null,
    lampiran: null
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const saveCreate = () => {
  console.log('Creating info SDM:', createData.value)
  closeCreateModal()
}

const handleEdit = (item: InfoSDM) => {
  editingItem.value = item
  editData.value = { ...item }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
}

const saveEdit = () => {
  console.log('Editing info SDM:', editData.value)
  closeEditModal()
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Header with Create Button -->
    <div class="px-4 sm:px-6 py-4 bg-white rounded-t-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <div class="relative max-w-xs w-full sm:w-auto">
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
        class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center sm:justify-start"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        Buat Info
      </button>
    </div>

    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto">
      <div class="px-4 sm:px-6 pb-4">
        <table class="w-full min-w-[640px]">
          <thead class="bg-blue-100/60 rounded-t-xl">
            <tr>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                JUDUL
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                OLEH
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                TANGGAL PUBLISH
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                SEGALA
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                ENDDO
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide last:rounded-tr-xl">
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
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                <span class="hidden sm:inline">{{ item.judul }}</span>
                <span class="sm:hidden">{{ item.judul.length > 20 ? item.judul.substring(0, 20) + '...' : item.judul }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                <span class="hidden sm:inline">{{ item.oleh }}</span>
                <span class="sm:hidden">{{ item.oleh.length > 15 ? item.oleh.substring(0, 15) + '...' : item.oleh }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.tanggalPublish }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.segala }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.enddo }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <button 
                  @click="handleEdit(item)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Icon name="lucide:pen-square" class="w-5 h-5 text-sky-400" />
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
    </div>

    <!-- Pagination -->
    <div class="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between bg-gray-50/30 gap-4 sm:gap-0">
      <div class="text-sm text-gray-600 font-medium text-center sm:text-left">
        Items per page: {{ itemsPerPage }}
      </div>
      
      <div class="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-2 sm:px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span class="hidden sm:inline">Previous</span>
          <Icon name="lucide:chevron-left" class="w-4 h-4 sm:hidden" />
        </button>
        
        <template v-if="totalPages <= 5">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-2 sm:px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
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
              'px-2 sm:px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
              currentPage === 1 
                ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            ]"
          >
            1
          </button>
          
          <span v-if="currentPage > 3" class="px-1 sm:px-2 text-gray-500 text-sm">...</span>
          
          <template v-for="page in totalPages" :key="page">
            <button
              v-if="page > 1 && page < totalPages && Math.abs(page - currentPage) <= 1"
              @click="goToPage(page)"
              :class="[
                'px-2 sm:px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
                currentPage === page 
                  ? 'bg-blue-500 text-white border-blue-500 shadow-sm' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </template>
          
          <span v-if="currentPage < totalPages - 2" class="px-1 sm:px-2 text-gray-500 text-sm">...</span>
          
          <button
            @click="goToPage(totalPages)"
            :class="[
              'px-2 sm:px-3.5 py-2 border rounded-lg text-sm font-medium transition-all',
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
          class="px-2 sm:px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span class="hidden sm:inline">Next</span>
          <Icon name="lucide:chevron-right" class="w-4 h-4 sm:hidden" />
        </button>
      </div>
    </div>
  </div>

  <!-- Create Modal -->
  <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Create Info</h3>
        <button @click="closeCreateModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4 sm:p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto">
        <!-- Judul -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
          <input 
            v-model="createData.judul"
            type="text" 
            placeholder="Masukkan judul"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Oleh -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Oleh</label>
          <input 
            v-model="createData.oleh"
            type="text" 
            placeholder="Masukkan nama penulis"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Isi Info -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Isi Info</label>
          <textarea 
            v-model="createData.isiInfo"
            rows="6"
            placeholder="Masukkan isi informasi..."
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <!-- Date Range -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Berlaku</label>
            <div class="relative">
              <input 
                v-model="createData.tglBerlaku"
                type="text"
                placeholder="Select date"
                readonly
                @click="openCreateTglBerlakuPicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="createTglBerlakuInput"
                type="date"
                @change="handleCreateTglBerlakuChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openCreateTglBerlakuPicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Berakhir</label>
            <div class="relative">
              <input 
                v-model="createData.tglBerakhir"
                type="text"
                placeholder="Select date"
                readonly
                @click="openCreateTglBerakhirPicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="createTglBerakhirInput"
                type="date"
                @change="handleCreateTglBerakhirChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openCreateTglBerakhirPicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- File Uploads -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="triggerGambarUpload"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                Choose File
              </button>
              <span class="text-sm text-gray-500">
                {{ createData.gambar ? createData.gambar.name : 'No file chosen' }}
              </span>
              <input
                ref="gambarFileInput"
                type="file"
                accept="image/*"
                @change="handleGambarUpload"
                class="hidden"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lampiran</label>
            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="triggerLampiranUpload"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                Choose File
              </button>
              <span class="text-sm text-gray-500">
                {{ createData.lampiran ? createData.lampiran.name : 'No file chosen' }}
              </span>
              <input
                ref="lampiranFileInput"
                type="file"
                @change="handleLampiranUpload"
                class="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex flex-col sm:flex-row justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200">
        <button 
          @click="closeCreateModal" 
          class="px-6 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50 order-2 sm:order-1"
        >
          Cancel
        </button>
        <button 
          @click="saveCreate" 
          class="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors order-1 sm:order-2"
        >
          Save
        </button>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Edit Info SDM</h3>
        <button @click="closeEditModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4 sm:p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto">
        <!-- Judul -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
          <input 
            v-model="editData.judul"
            type="text" 
            placeholder="Masukkan judul"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Oleh -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Oleh</label>
          <input 
            v-model="editData.oleh"
            type="text" 
            placeholder="Masukkan nama penulis"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Tanggal Publish -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Publish</label>
          <input 
            v-model="editData.tanggalPublish"
            type="text" 
            placeholder="Tanggal publish"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Segala -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Segala</label>
          <input 
            v-model="editData.segala"
            type="text" 
            placeholder="Segala"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Enddo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Enddo</label>
          <input 
            v-model="editData.enddo"
            type="text" 
            placeholder="Enddo"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex flex-col sm:flex-row justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200">
        <button 
          @click="closeEditModal" 
          class="px-6 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50 order-2 sm:order-1"
        >
          Cancel
        </button>
        <button 
          @click="saveEdit" 
          class="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors order-1 sm:order-2"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>