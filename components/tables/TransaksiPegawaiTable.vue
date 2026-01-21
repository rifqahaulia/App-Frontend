<script setup lang="ts">
// components/tables/TransaksiPegawaiTable.vue

interface TransaksiPegawai {
  nik: string
  nama: string
  tempatLahir: string
  tglLahir: string
}

interface Props {
  data?: TransaksiPegawai[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingItem = ref<TransaksiPegawai | null>(null)

// Options untuk items per page
const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

// DATA DUMMY sesuai mockup - semua data sama seperti di mockup
const dummyData: TransaksiPegawai[] = [
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  },
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  },
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  },
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  },
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  },
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  },
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  },
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  },
  {
    nik: '90010030',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1995'
  }
]

// Use props data if available, otherwise use dummy data
const transaksiPegawaiData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Filter data based on search
const filteredData = computed(() => {
  if (!searchQuery.value) return transaksiPegawaiData.value
  
  const query = searchQuery.value.toLowerCase()
  return transaksiPegawaiData.value.filter(item => 
    item.nik.toLowerCase().includes(query) ||
    item.nama.toLowerCase().includes(query) ||
    item.tempatLahir.toLowerCase().includes(query) ||
    item.tglLahir.toLowerCase().includes(query)
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
  actionType: '',
  reasonForAction: '',
  tanggalBerlaku: '',
  tanggalBerakhir: '',
  nama: '',
  gelar: '',
  jenisKelamin: '',
  tempatLahir: '',
  tglLahir: '',
  negara: '',
  statusNikah: '',
  agama: ''
})

// Edit modal data
const editData = ref({
  nik: '',
  nama: '',
  actionType: '',
  reasonForAction: '',
  tanggalBerlaku: '',
  tanggalBerakhir: ''
})

// Dropdown options
const actionTypeOptions = [
  { value: 'create', label: 'Create' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' }
]

const reasonForActionOptions = [
  { value: 'new_employee', label: 'New Employee' },
  { value: 'promotion', label: 'Promotion' },
  { value: 'transfer', label: 'Transfer' }
]

const gelarOptions = [
  { value: 'dr', label: 'Dr.' },
  { value: 'prof', label: 'Prof.' },
  { value: 'ir', label: 'Ir.' },
  { value: 'st', label: 'S.T.' }
]

const jenisKelaminOptions = [
  { value: 'L', label: 'Laki-laki' },
  { value: 'P', label: 'Perempuan' }
]

const negaraOptions = [
  { value: 'ID', label: 'Indonesia' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'SG', label: 'Singapore' }
]

const statusNikahOptions = [
  { value: 'single', label: 'Belum Menikah' },
  { value: 'married', label: 'Menikah' },
  { value: 'divorced', label: 'Cerai' }
]

const agamaOptions = [
  { value: 'islam', label: 'Islam' },
  { value: 'kristen', label: 'Kristen' },
  { value: 'katolik', label: 'Katolik' },
  { value: 'hindu', label: 'Hindu' },
  { value: 'buddha', label: 'Buddha' }
]

// Date picker refs
const createTanggalBerlakuInput = ref<HTMLInputElement | null>(null)
const createTanggalBerakhirInput = ref<HTMLInputElement | null>(null)
const createTglLahirInput = ref<HTMLInputElement | null>(null)
const editTanggalBerlakuInput = ref<HTMLInputElement | null>(null)
const editTanggalBerakhirInput = ref<HTMLInputElement | null>(null)
const editTglLahirInput = ref<HTMLInputElement | null>(null)

// Modal functions
const handleCreate = () => {
  createData.value = {
    actionType: '',
    reasonForAction: '',
    tanggalBerlaku: '',
    tanggalBerakhir: '',
    nama: '',
    gelar: '',
    jenisKelamin: '',
    tempatLahir: '',
    tglLahir: '',
    negara: '',
    statusNikah: '',
    agama: ''
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const saveCreate = () => {
  console.log('Creating transaksi pegawai:', createData.value)
  closeCreateModal()
}

const handleEdit = (item: TransaksiPegawai) => {
  editingItem.value = item
  editData.value = {
    nik: item.nik,
    nama: item.nama,
    actionType: '',
    reasonForAction: '',
    tanggalBerlaku: '',
    tanggalBerakhir: ''
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
}

const saveEdit = () => {
  console.log('Editing transaksi pegawai:', editData.value)
  closeEditModal()
}

// Date picker functions for Create modal
const openCreateTanggalBerlakuPicker = () => {
  if (createTanggalBerlakuInput.value) {
    createTanggalBerlakuInput.value.focus()
    createTanggalBerlakuInput.value.click()
    if (createTanggalBerlakuInput.value.showPicker) {
      createTanggalBerlakuInput.value.showPicker()
    }
  }
}

const openCreateTanggalBerakhirPicker = () => {
  if (createTanggalBerakhirInput.value) {
    createTanggalBerakhirInput.value.focus()
    createTanggalBerakhirInput.value.click()
    if (createTanggalBerakhirInput.value.showPicker) {
      createTanggalBerakhirInput.value.showPicker()
    }
  }
}

const openCreateTglLahirPicker = () => {
  if (createTglLahirInput.value) {
    createTglLahirInput.value.focus()
    createTglLahirInput.value.click()
    if (createTglLahirInput.value.showPicker) {
      createTglLahirInput.value.showPicker()
    }
  }
}

const handleCreateTanggalBerlakuChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tanggalBerlaku = target.value
  }
}

const handleCreateTanggalBerakhirChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tanggalBerakhir = target.value
  }
}

const handleCreateTglLahirChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tglLahir = target.value
  }
}

// Date picker functions for Edit modal
const openEditTanggalBerlakuPicker = () => {
  if (editTanggalBerlakuInput.value) {
    editTanggalBerlakuInput.value.focus()
    editTanggalBerlakuInput.value.click()
    if (editTanggalBerlakuInput.value.showPicker) {
      editTanggalBerlakuInput.value.showPicker()
    }
  }
}

const openEditTanggalBerakhirPicker = () => {
  if (editTanggalBerakhirInput.value) {
    editTanggalBerakhirInput.value.focus()
    editTanggalBerakhirInput.value.click()
    if (editTanggalBerakhirInput.value.showPicker) {
      editTanggalBerakhirInput.value.showPicker()
    }
  }
}

const handleEditTanggalBerlakuChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    editData.value.tanggalBerlaku = target.value
  }
}

const handleEditTanggalBerakhirChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    editData.value.tanggalBerakhir = target.value
  }
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
        Pegawai Baru
      </button>
    </div>

    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto">
      <div class="px-4 sm:px-6 pb-4">
        <table class="w-full min-w-[640px]">
          <thead class="bg-blue-100/60 rounded-t-xl">
            <tr>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                NIK
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NAMA
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                TEMPAT LAHIR
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                TGL LAHIR
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
                {{ item.nik }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                <span class="hidden sm:inline">{{ item.nama }}</span>
                <span class="sm:hidden">{{ item.nama.length > 15 ? item.nama.substring(0, 15) + '...' : item.nama }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span class="hidden sm:inline">{{ item.tempatLahir }}</span>
                <span class="sm:hidden">{{ item.tempatLahir.length > 10 ? item.tempatLahir.substring(0, 10) + '...' : item.tempatLahir }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.tglLahir }}
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
              <td colspan="5" class="px-6 py-16 text-center">
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
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Create Pegawai</h3>
        <button @click="closeCreateModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4 sm:p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto">
        <!-- Row 1: Action Type & Reason for Action -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
            <select 
              v-model="createData.actionType"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option v-for="option in actionTypeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Action</label>
            <select 
              v-model="createData.reasonForAction"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option v-for="option in reasonForActionOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Row 2: Tanggal Berlaku & Tanggal Berakhir -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Berlaku</label>
            <div class="relative">
              <input 
                v-model="createData.tanggalBerlaku"
                type="text"
                placeholder="Select date"
                readonly
                @click="openCreateTanggalBerlakuPicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="createTanggalBerlakuInput"
                type="date"
                @change="handleCreateTanggalBerlakuChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openCreateTanggalBerlakuPicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Berakhir</label>
            <div class="relative">
              <input 
                v-model="createData.tanggalBerakhir"
                type="text"
                placeholder="Select date"
                readonly
                @click="openCreateTanggalBerakhirPicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="createTanggalBerakhirInput"
                type="date"
                @change="handleCreateTanggalBerakhirChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openCreateTanggalBerakhirPicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Row 3: Nama -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nama</label>
          <input 
            v-model="createData.nama"
            type="text" 
            placeholder="Nama"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Row 4: Gelar & Jenis Kelamin -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Gelar</label>
            <select 
              v-model="createData.gelar"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option v-for="option in gelarOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
            <select 
              v-model="createData.jenisKelamin"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option v-for="option in jenisKelaminOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Row 5: Tempat Lahir & Tgl Lahir -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir</label>
            <input 
              v-model="createData.tempatLahir"
              type="text" 
              placeholder="Tempat lahir"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Lahir</label>
            <div class="relative">
              <input 
                v-model="createData.tglLahir"
                type="text"
                placeholder="Select date"
                readonly
                @click="openCreateTglLahirPicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="createTglLahirInput"
                type="date"
                @change="handleCreateTglLahirChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openCreateTglLahirPicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Row 6: Negara -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Negara</label>
          <select 
            v-model="createData.negara"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option v-for="option in negaraOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Row 7: Status Nikah -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status Nikah</label>
          <select 
            v-model="createData.statusNikah"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option v-for="option in statusNikahOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Row 8: Agama -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Agama</label>
          <select 
            v-model="createData.agama"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option v-for="option in agamaOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
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
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Transaksi Pegawai</h3>
        <button @click="closeEditModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4 sm:p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto">
        <!-- Row 1: NIK & Nama -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">NIK</label>
            <input 
              v-model="editData.nik"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              readonly
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama</label>
            <input 
              v-model="editData.nama"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              readonly
            />
          </div>
        </div>

        <!-- Row 2: Action Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
          <select 
            v-model="editData.actionType"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option v-for="option in actionTypeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Row 3: Reason for Action -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Action</label>
          <select 
            v-model="editData.reasonForAction"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option v-for="option in reasonForActionOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Row 4: Tgl Berlaku & Tgl Berakhir -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Berlaku</label>
            <div class="relative">
              <input 
                v-model="editData.tanggalBerlaku"
                type="text"
                placeholder="Select date"
                readonly
                @click="openEditTanggalBerlakuPicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="editTanggalBerlakuInput"
                type="date"
                @change="handleEditTanggalBerlakuChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openEditTanggalBerlakuPicker"
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
                v-model="editData.tanggalBerakhir"
                type="text"
                placeholder="Select date"
                readonly
                @click="openEditTanggalBerakhirPicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="editTanggalBerakhirInput"
                type="date"
                @change="handleEditTanggalBerakhirChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openEditTanggalBerakhirPicker"
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
          Submit
        </button>
      </div>
    </div>
  </div>
</template>