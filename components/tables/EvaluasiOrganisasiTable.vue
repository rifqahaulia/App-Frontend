masi<script setup lang="ts">

interface EvaluasiOrganisasi {
  area: string
  subArea: string
  mave: string
  jumlahSDM: number
  service: string
  radar: string
  jumlahTransaksi: number
  status: 'Waiting Approval' | 'Approved' | 'Rejected'
  periode?: string
}

interface Props {
  data?: EvaluasiOrganisasi[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filter states
const selectedStatus = ref('Semua Status')

// Filter options
const statusOptions = [
  'Semua Status',
  'Waiting Approval',
  'Approved',
  'Rejected'
]

// DATA DUMMY sesuai dengan gambar
const dummyData: EvaluasiOrganisasi[] = [
  {
    area: 'Medan',
    subArea: 'Cabang Medan',
    mave: '59067',
    jumlahSDM: 188,
    service: 'API, Tower',
    radar: 'Radar',
    jumlahTransaksi: 10810,
    status: 'Waiting Approval'
  },
  {
    area: 'Surabaya',
    subArea: 'Cabang Surabaya',
    mave: '69809',
    jumlahSDM: 132,
    service: 'Tower',
    radar: 'Radar',
    jumlahTransaksi: 890,
    status: 'Approved'
  },
  {
    area: 'Surabaya',
    subArea: 'Cabang Surabaya',
    mave: '69809',
    jumlahSDM: 132,
    service: 'Tower',
    radar: 'Radar',
    jumlahTransaksi: 890,
    status: 'Rejected'
  },
  {
    area: 'Jakarta',
    subArea: 'Cabang Jakarta',
    mave: '45123',
    jumlahSDM: 250,
    service: 'API, Tower',
    radar: 'Radar',
    jumlahTransaksi: 15420,
    status: 'Approved'
  },
  {
    area: 'Bandung',
    subArea: 'Cabang Bandung',
    mave: '52341',
    jumlahSDM: 145,
    service: 'Tower',
    radar: 'Radar',
    jumlahTransaksi: 8750,
    status: 'Waiting Approval'
  },
  {
    area: 'Makassar',
    subArea: 'Cabang Makassar',
    mave: '61234',
    jumlahSDM: 98,
    service: 'API',
    radar: 'Radar',
    jumlahTransaksi: 6540,
    status: 'Approved'
  },
  {
    area: 'Denpasar',
    subArea: 'Cabang Denpasar',
    mave: '58901',
    jumlahSDM: 112,
    service: 'Tower',
    radar: 'Radar',
    jumlahTransaksi: 7890,
    status: 'Waiting Approval'
  },
  {
    area: 'Balikpapan',
    subArea: 'Cabang Balikpapan',
    mave: '63456',
    jumlahSDM: 87,
    service: 'API, Tower',
    radar: 'Radar',
    jumlahTransaksi: 5670,
    status: 'Rejected'
  },
  {
    area: 'Palembang',
    subArea: 'Cabang Palembang',
    mave: '54789',
    jumlahSDM: 134,
    service: 'Tower',
    radar: 'Radar',
    jumlahTransaksi: 9120,
    status: 'Approved'
  },
  {
    area: 'Semarang',
    subArea: 'Cabang Semarang',
    mave: '56234',
    jumlahSDM: 156,
    service: 'API',
    radar: 'Radar',
    jumlahTransaksi: 10340,
    status: 'Waiting Approval'
  },
  {
    area: 'Yogyakarta',
    subArea: 'Cabang Yogyakarta',
    mave: '51678',
    jumlahSDM: 92,
    service: 'Tower',
    radar: 'Radar',
    jumlahTransaksi: 6780,
    status: 'Approved'
  },
  {
    area: 'Manado',
    subArea: 'Cabang Manado',
    mave: '64890',
    jumlahSDM: 76,
    service: 'API, Tower',
    radar: 'Radar',
    jumlahTransaksi: 4560,
    status: 'Waiting Approval'
  },
  {
    area: 'Pontianak',
    subArea: 'Cabang Pontianak',
    mave: '57123',
    jumlahSDM: 68,
    service: 'Tower',
    radar: 'Radar',
    jumlahTransaksi: 3890,
    status: 'Rejected'
  },
  {
    area: 'Batam',
    subArea: 'Cabang Batam',
    mave: '60456',
    jumlahSDM: 105,
    service: 'API',
    radar: 'Radar',
    jumlahTransaksi: 7230,
    status: 'Approved'
  },
  {
    area: 'Pekanbaru',
    subArea: 'Cabang Pekanbaru',
    mave: '55789',
    jumlahSDM: 89,
    service: 'Tower',
    radar: 'Radar',
    jumlahTransaksi: 5890,
    status: 'Waiting Approval'
  }
]

// Use props data if available, otherwise use dummy data
const evaluasiData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Filter data based on search and filters
const filteredData = computed(() => {
  let filtered = evaluasiData.value

  // Apply status filter
  if (selectedStatus.value !== 'Semua Status') {
    filtered = filtered.filter(item => item.status === selectedStatus.value)
  }

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.area.toLowerCase().includes(query) ||
      item.subArea.toLowerCase().includes(query) ||
      item.mave.toLowerCase().includes(query) ||
      item.service.toLowerCase().includes(query) ||
      item.radar.toLowerCase().includes(query)
    )
  }

  return filtered
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

// Reset to page 1 when search or filter changes
watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1
})

// Reset to page 1 when items per page changes
watch(itemsPerPage, () => {
  currentPage.value = 1
})

// Get status badge class
const getStatusClass = (status: string) => {
  switch (status) {
    case 'Waiting Approval':
      return 'bg-yellow-100 text-yellow-800'
    case 'Approved':
      return 'bg-green-100 text-green-800'
    case 'Rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const editingItem = ref<EvaluasiOrganisasi | null>(null)
const viewingItem = ref<EvaluasiOrganisasi | null>(null)
const dateInput = ref<HTMLInputElement | null>(null)

// Form data
const formData = ref({
  periode: '',
  area: '',
  subArea: '',
  move: '',
  jumlahSDM: 0,
  service: [] as string[],
  radar: [] as string[],
  jumlahTransaksi: 0
})

// Options for dropdowns
const areaOptions = ['Medan', 'Surabaya', 'Jakarta', 'Bandung', 'Makassar', 'Denpasar', 'Balikpapan', 'Palembang', 'Semarang', 'Yogyakarta', 'Manado', 'Pontianak', 'Batam', 'Pekanbaru']
const subAreaOptions = ['Cabang Medan', 'Cabang Surabaya', 'Cabang Jakarta', 'Cabang Bandung', 'Cabang Makassar', 'Cabang Denpasar', 'Cabang Balikpapan', 'Cabang Palembang', 'Cabang Semarang', 'Cabang Yogyakarta', 'Cabang Manado', 'Cabang Pontianak', 'Cabang Batam', 'Cabang Pekanbaru']
const serviceOptions = ['API', 'Tower', 'Ground Service', 'Cargo']
const radarOptions = ['Radar', 'Non-Radar', 'Hybrid']

// Action handlers
const handleAdd = () => {
  showAddModal.value = true
  // Reset form
  formData.value = {
    periode: '',
    area: '',
    subArea: '',
    move: '',
    jumlahSDM: 0,
    service: [],
    radar: [],
    jumlahTransaksi: 0
  }
}

const handleView = (item: EvaluasiOrganisasi) => {
  viewingItem.value = { ...item }
  showViewModal.value = true
}

const handleEdit = (item: EvaluasiOrganisasi) => {
  editingItem.value = { ...item }
  showEditModal.value = true
  console.log('Edit item:', item)
}

const handleDelete = (item: EvaluasiOrganisasi) => {
  if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    console.log('Delete item:', item)
    // Implement delete logic here
  }
}

const closeAddModal = () => {
  showAddModal.value = false
}

const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingItem.value = null
}

const handleApprove = () => {
  console.log('Approve item:', viewingItem.value)
  // Implement approve logic here
  closeViewModal()
}

const handleReject = () => {
  if (confirm('Apakah Anda yakin ingin menolak data ini?')) {
    console.log('Reject item:', viewingItem.value)
    // Implement reject logic here
    closeViewModal()
  }
}

const submitForm = () => {
  console.log('Submit form:', formData.value)
  // Implement submit logic here
  closeAddModal()
}

const submitEditForm = () => {
  console.log('Update form:', editingItem.value)
  // Implement update logic here
  closeEditModal()
}

const removeServiceTag = (index: number) => {
  formData.value.service.splice(index, 1)
}

const removeRadarTag = (index: number) => {
  formData.value.radar.splice(index, 1)
}

const handleServiceSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target.value && !formData.value.service.includes(target.value)) {
    formData.value.service.push(target.value)
    target.value = ''
  }
}

const handleRadarSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target.value && !formData.value.radar.includes(target.value)) {
    formData.value.radar.push(target.value)
    target.value = ''
  }
}

const openDatePicker = () => {
  if (dateInput.value) {
    dateInput.value.showPicker()
  }
}

const handleDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    formData.value.periode = target.value
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Search Bar & Filter -->
    <div class="px-6 py-4 bg-white rounded-t-2xl">
      <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div class="relative max-w-xs w-full">
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
        
        <div class="flex items-center gap-3">
          <div class="relative">
            <select 
              v-model="selectedStatus"
              class="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all appearance-none cursor-pointer pr-8"
            >
              <option v-for="option in statusOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          <button
            @click="handleAdd"
            class="flex items-center gap-2 px-3.5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto px-6 pb-4">
      <table class="w-full">
        <thead class="bg-blue-100/60 rounded-t-xl">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 first:rounded-tl-xl w-[100px]">
              Area
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[140px]">
              Sub Area
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[80px]">
              Mave
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 w-[100px]">
              Jumlah SDM
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[100px]">
              Service
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[80px]">
              Radar
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 w-[130px]">
              Jumlah Transaksi
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 w-[140px]">
              Status
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 last:rounded-tr-xl w-[100px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr 
            v-for="(item, index) in paginatedData" 
            :key="index"
            class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors"
          >
            <td class="px-4 py-3 text-sm text-gray-700">
              {{ item.area }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-700">
              {{ item.subArea }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-700">
              {{ item.mave }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 text-center">
              {{ item.jumlahSDM }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-700">
              {{ item.service }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-700">
              {{ item.radar }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 text-center">
              {{ item.jumlahTransaksi.toLocaleString() }}
            </td>
            <td class="px-4 py-3 text-center">
              <span 
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-md text-xs font-medium',
                  getStatusClass(item.status)
                ]"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <div class="flex items-center justify-center gap-2">
                <button
                  @click="handleView(item)"
                  class="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="View"
                >
                  <Icon name="lucide:eye" class="w-4 h-4" />
                </button>
                <button
                  @click="handleEdit(item)"
                  class="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Edit"
                >
                  <Icon name="lucide:edit-2" class="w-4 h-4" />
                </button>
                <button
                  @click="handleDelete(item)"
                  class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <Icon name="lucide:trash-2" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="paginatedData.length === 0">
            <td colspan="9" class="px-6 py-16 text-center">
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

  <!-- Add Modal -->
  <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-4 py-3 bg-[#65BEFF] rounded-t-lg">
        <h3 class="text-sm font-semibold text-white">Tambah Pelaporan Organisasi</h3>
        <button @click="closeAddModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-4 h-4" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        <!-- Periode -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Periode</label>
          <div class="relative">
            <input 
              v-model="formData.periode"
              type="text" 
              placeholder="Select Periode"
              readonly
              @click="openDatePicker"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF] pr-8 cursor-pointer bg-white"
            />
            <input 
              ref="dateInput"
              type="date"
              @change="handleDateChange"
              class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
            />
            <button 
              type="button" 
              @click="openDatePicker"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <Icon name="lucide:calendar" class="w-4 h-4 text-[#65BEFF]" />
            </button>
          </div>
        </div>

        <!-- Area & Sub Area - 2 columns -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Area -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Area</label>
            <div class="relative">
              <select 
                v-model="formData.area"
                class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF] appearance-none cursor-pointer pr-8"
              >
                <option value="" disabled selected>Option</option>
                <option v-for="option in areaOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <!-- Sub Area -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Sub Area</label>
            <div class="relative">
              <select 
                v-model="formData.subArea"
                class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF] appearance-none cursor-pointer pr-8"
              >
                <option value="" disabled selected>Option</option>
                <option v-for="option in subAreaOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <!-- Move & Jumlah SDM - 2 columns -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Move -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Move</label>
            <input 
              v-model="formData.move"
              type="text" 
              placeholder="0"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF]"
            />
          </div>

          <!-- Jumlah SDM -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Jumlah SDM</label>
            <input 
              v-model.number="formData.jumlahSDM"
              type="number" 
              placeholder="0"
              min="0"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF]"
            />
          </div>
        </div>

        <!-- Service -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Service</label>
          <div class="relative">
            <select 
              @change="handleServiceSelect"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF] appearance-none cursor-pointer pr-8"
            >
              <option value="" disabled selected>Select...</option>
              <option v-for="option in serviceOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          </div>
          <!-- Selected tags -->
          <div v-if="formData.service.length > 0" class="flex flex-wrap gap-1.5 mt-2">
            <span 
              v-for="(item, index) in formData.service" 
              :key="index"
              class="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
            >
              {{ item }}
              <button @click="removeServiceTag(index)" class="hover:text-red-600 transition-colors">
                <Icon name="lucide:x" class="w-3 h-3" />
              </button>
            </span>
          </div>
        </div>

        <!-- Radar -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Radar</label>
          <div class="relative">
            <select 
              @change="handleRadarSelect"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF] appearance-none cursor-pointer pr-8"
            >
              <option value="" disabled selected>Select...</option>
              <option v-for="option in radarOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          </div>
          <!-- Selected tags -->
          <div v-if="formData.radar.length > 0" class="flex flex-wrap gap-1.5 mt-2">
            <span 
              v-for="(item, index) in formData.radar" 
              :key="index"
              class="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
            >
              {{ item }}
              <button @click="removeRadarTag(index)" class="hover:text-red-600 transition-colors">
                <Icon name="lucide:x" class="w-3 h-3" />
              </button>
            </span>
          </div>
        </div>

        <!-- Jumlah Transaksi -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Jumlah Transaksi</label>
          <input 
            v-model.number="formData.jumlahTransaksi"
            type="number" 
            placeholder="0"
            min="0"
            class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF]"
          />
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
        <button 
          @click="closeAddModal" 
          class="px-4 py-1.5 text-sm font-medium text-[#65BEFF] hover:text-[#189EFF] transition-colors border border-[#65BEFF] rounded hover:bg-blue-50"
        >
          Cancel
        </button>
        <button 
          @click="submitForm" 
          class="px-4 py-1.5 bg-[#65BEFF] text-white text-sm font-medium rounded hover:bg-[#189EFF] transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="showEditModal && editingItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-4 py-3 bg-[#65BEFF] rounded-t-lg">
        <h3 class="text-sm font-semibold text-white">Edit Pelaporan Organisasi</h3>
        <button @click="closeEditModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-4 h-4" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        <!-- Periode -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Periode</label>
          <div class="relative">
            <input 
              v-model="editingItem.periode"
              type="text" 
              placeholder="Select Periode"
              readonly
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF] pr-8 cursor-pointer bg-white"
            />
            <button 
              type="button" 
              class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <Icon name="lucide:calendar" class="w-4 h-4 text-[#65BEFF]" />
            </button>
          </div>
        </div>

        <!-- Area & Sub Area - 2 columns -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Area -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Area</label>
            <div class="relative">
              <select 
                v-model="editingItem.area"
                class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF] appearance-none cursor-pointer pr-8"
              >
                <option value="" disabled>Option</option>
                <option v-for="option in areaOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <!-- Sub Area -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Sub Area</label>
            <div class="relative">
              <select 
                v-model="editingItem.subArea"
                class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF] appearance-none cursor-pointer pr-8"
              >
                <option value="" disabled>Option</option>
                <option v-for="option in subAreaOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <!-- Move & Jumlah SDM - 2 columns -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Move -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Move</label>
            <input 
              v-model="editingItem.mave"
              type="text" 
              placeholder="0"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF]"
            />
          </div>

          <!-- Jumlah SDM -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Jumlah SDM</label>
            <input 
              v-model.number="editingItem.jumlahSDM"
              type="number" 
              placeholder="0"
              min="0"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF]"
            />
          </div>
        </div>

        <!-- Service -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Service</label>
          <div class="relative">
            <input 
              v-model="editingItem.service"
              type="text" 
              placeholder="Service"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF]"
            />
          </div>
        </div>

        <!-- Radar -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Radar</label>
          <div class="relative">
            <input 
              v-model="editingItem.radar"
              type="text" 
              placeholder="Radar"
              class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF]"
            />
          </div>
        </div>

        <!-- Jumlah Transaksi -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Jumlah Transaksi</label>
          <input 
            v-model.number="editingItem.jumlahTransaksi"
            type="number" 
            placeholder="0"
            min="0"
            class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#65BEFF] focus:border-[#65BEFF]"
          />
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
        <button 
          @click="closeEditModal" 
          class="px-4 py-1.5 text-sm font-medium text-[#65BEFF] hover:text-[#189EFF] transition-colors border border-[#65BEFF] rounded hover:bg-blue-50"
        >
          Cancel
        </button>
        <button 
          @click="submitEditForm" 
          class="px-4 py-1.5 bg-[#65BEFF] text-white text-sm font-medium rounded hover:bg-[#189EFF] transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  </div>

  <!-- View Modal -->
  <div v-if="showViewModal && viewingItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Modal Header - Blue Background -->
      <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#1E90FF] to-[#00BFFF] flex-shrink-0">
        <h3 class="text-xl font-bold text-white">Detail Pelaporan Evaluasi</h3>
        <button @click="closeViewModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-6 h-6" />
        </button>
      </div>
      
      <!-- Modal Body - Scrollable -->
      <div class="p-6 overflow-y-auto flex-1">
        <!-- Section Title -->
        <h4 class="text-lg font-bold text-gray-900 mb-4">Pelaporan Evaluasi</h4>
        
        <!-- Details List -->
        <div class="space-y-2 mb-6">
          <!-- Status -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Status</div>
            <div class="flex-1">
              <span class="text-sm font-bold text-[#FFA500]">Waiting Approval</span>
            </div>
          </div>

          <!-- Periode -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Periode</div>
            <div class="flex-1 text-sm text-gray-900">2024-11</div>
          </div>

          <!-- Area -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Area</div>
            <div class="flex-1 text-sm text-gray-900">1234567890</div>
          </div>

          <!-- Sub Area -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Sub Area</div>
            <div class="flex-1 text-sm text-gray-900">1001023 - Nazzarudin (IT Programmer)</div>
          </div>

          <!-- Move -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Move</div>
            <div class="flex-1 text-sm text-gray-900">59807</div>
          </div>

          <!-- Jumlah SDM -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Jumlah SDM</div>
            <div class="flex-1 text-sm text-gray-900">188</div>
          </div>

          <!-- Service -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Service</div>
            <div class="flex-1 text-sm text-gray-900">APT, TOWER</div>
          </div>

          <!-- Radar -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Radar</div>
            <div class="flex-1 text-sm text-gray-900">RADAR</div>
          </div>

          <!-- Jml. Transaksi -->
          <div class="flex">
            <div class="w-40 text-sm text-gray-500">Jml. Transaksi</div>
            <div class="flex-1 text-sm text-gray-900">15628</div>
          </div>
        </div>

        <!-- Approval Section -->
        <div class="mt-6">
          <h4 class="text-lg font-bold text-gray-900 mb-4">Approval</h4>
          
          <!-- Approval Tree -->
          <div class="space-y-2">
            <!-- Level 1: Approval -->
            <div class="flex items-center gap-2">
              <Icon name="lucide:folder" class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-700">Approval</span>
            </div>

            <!-- Level 2: Procurement -->
            <div class="flex items-center gap-2 ml-6">
              <Icon name="lucide:folder" class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-700">Procurement</span>
            </div>

            <!-- Level 3: Rechart Navi -->
            <div class="flex items-center gap-2 ml-12">
              <Icon name="lucide:file-text" class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-700">Rechart Navi</span>
              <Icon name="lucide:check-circle-2" class="w-5 h-5 text-green-500 ml-auto" />
            </div>

            <!-- Level 3: Nur Haren -->
            <div class="flex items-center gap-2 ml-12">
              <Icon name="lucide:file-text" class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-700">Nur Haren</span>
              <Icon name="lucide:check-circle-2" class="w-5 h-5 text-green-500 ml-auto" />
            </div>

            <!-- Level 2: CTO -->
            <div class="flex items-center gap-2 ml-6">
              <Icon name="lucide:folder" class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-700">CTO</span>
            </div>

            <!-- Level 3: Satrio Cahyadi -->
            <div class="flex items-center gap-2 ml-12">
              <Icon name="lucide:file-text" class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-700">Satrio Cahyadi</span>
              <Icon name="lucide:plus-circle" class="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer with 2 buttons -->
      <div class="flex gap-3 px-6 py-4 flex-shrink-0 bg-white">
        <button 
          @click="handleReject" 
          class="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-[#1E90FF] bg-white border-2 border-[#1E90FF] rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Icon name="lucide:x" class="w-4 h-4" />
          Reject
        </button>
        <button 
          @click="handleApprove" 
          class="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1E90FF] text-white text-sm font-medium rounded-lg hover:bg-[#1873CC] transition-colors shadow-sm"
        >
          <Icon name="lucide:check-circle" class="w-4 h-4" />
          Approve
        </button>
      </div>
    </div>
  </div>
</template>
