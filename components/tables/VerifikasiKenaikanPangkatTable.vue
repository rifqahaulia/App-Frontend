<script setup lang="ts">
// components/tables/VerifikasiKenaikanPangkatTable.vue

interface VerifikasiKenaikanPangkat {
  nik: string
  nama: string
  jabatan: string
  lokasi: string
  status: 'sudah' | 'belum'
}

interface Props {
  data?: VerifikasiKenaikanPangkat[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filter states
const selectedLokasi = ref('')
const selectedProses = ref('')
const selectedBulan = ref('')
const selectedTahun = ref('')

// Options untuk items per page
const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

// DATA DUMMY sesuai mockup
const dummyData: VerifikasiKenaikanPangkat[] = [
  {
    nik: '10835478',
    nama: 'AAN YUDHIARTAWAN',
    jabatan: 'MANAGER DESAIN DAN REKAYASA FASILITAS PENERBANGAN, OTOMASI DAN PENERBATAN POLUSI',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'ADNAN HAKIM',
    jabatan: 'INSPEKTUR KESELAMATAN',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  }
]

// Use props data if available, otherwise use dummy data
const verifikasiKenaikanPangkatData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Dropdown options
const filterLokasiOptions = [
  { value: '', label: 'Semua Lokasi' },
  { value: 'kantor_pusat', label: 'Kantor Pusat' },
  { value: 'cabang_jakarta', label: 'Cabang Jakarta' },
  { value: 'cabang_surabaya', label: 'Cabang Surabaya' }
]

const filterProsesOptions = [
  { value: '', label: 'Proses' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
]

const filterBulanOptions = [
  { value: '', label: 'April' },
  { value: 'januari', label: 'Januari' },
  { value: 'februari', label: 'Februari' },
  { value: 'maret', label: 'Maret' },
  { value: 'april', label: 'April' },
  { value: 'mei', label: 'Mei' },
  { value: 'juni', label: 'Juni' },
  { value: 'juli', label: 'Juli' },
  { value: 'agustus', label: 'Agustus' },
  { value: 'september', label: 'September' },
  { value: 'oktober', label: 'Oktober' },
  { value: 'november', label: 'November' },
  { value: 'desember', label: 'Desember' }
]

const filterTahunOptions = [
  { value: '', label: '2024' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' }
]

// Filter data based on search and filters
const filteredData = computed(() => {
  let filtered = verifikasiKenaikanPangkatData.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.nik.toLowerCase().includes(query) ||
      item.nama.toLowerCase().includes(query) ||
      item.jabatan.toLowerCase().includes(query) ||
      item.lokasi.toLowerCase().includes(query)
    )
  }

  // Apply lokasi filter
  if (selectedLokasi.value) {
    filtered = filtered.filter(item => 
      item.lokasi.toLowerCase().includes(selectedLokasi.value.toLowerCase())
    )
  }

  // Apply status filter
  if (selectedProses.value) {
    filtered = filtered.filter(item => item.status === selectedProses.value)
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

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1
})

// Reset to page 1 when filters change
watch([selectedLokasi, selectedProses, selectedBulan, selectedTahun], () => {
  currentPage.value = 1
})

// Functions
const handleEdit = (item: VerifikasiKenaikanPangkat) => {
  console.log('Editing item:', item)
}

const handleDelete = (item: VerifikasiKenaikanPangkat) => {
  console.log('Deleting item:', item)
  if (confirm(`Hapus data verifikasi untuk ${item.nama}?`)) {
    alert('Data berhasil dihapus!')
  }
}

// Status styling
const getStatusClass = (status: string) => {
  switch (status) {
    case 'sudah':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'belum':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'sudah':
      return 'Sudah'
    case 'belum':
      return 'Belum'
    default:
      return status
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Header with Search and Filters -->
    <div class="px-4 sm:px-6 py-4 bg-white rounded-t-2xl">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <!-- Left Side: Search and Filters -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
          <!-- Search -->
          <div class="relative min-w-[200px] flex-shrink-0">
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

          <!-- Filter Dropdowns -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Semua Lokasi Filter -->
            <div class="min-w-[140px]">
              <select 
                v-model="selectedLokasi"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
              >
                <option v-for="option in filterLokasiOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Proses Filter -->
            <div class="min-w-[120px]">
              <select 
                v-model="selectedProses"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
              >
                <option v-for="option in filterProsesOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Bulan Filter -->
            <div class="min-w-[100px]">
              <select 
                v-model="selectedBulan"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
              >
                <option v-for="option in filterBulanOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Tahun Filter -->
            <div class="min-w-[100px]">
              <select 
                v-model="selectedTahun"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
              >
                <option v-for="option in filterTahunOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto">
      <div class="px-4 sm:px-6 pb-4">
        <table class="w-full min-w-[900px]">
          <thead class="bg-blue-100/60 rounded-t-xl">
            <tr>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                NIK
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NAMA
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                JABATAN
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                LOKASI
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                STATUS
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
              <td class="px-3 sm:px-6 py-4 text-sm text-gray-600 max-w-xs">
                <div class="truncate" :title="item.jabatan">
                  {{ item.jabatan }}
                </div>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.lokasi }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                <span 
                  :class="getStatusClass(item.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                >
                  {{ getStatusText(item.status) }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <button 
                    @click="handleEdit(item)"
                    class="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Edit"
                  >
                    <Icon name="lucide:pen-square" class="w-4 h-4 text-sky-400" />
                  </button>
                  <button 
                    @click="handleDelete(item)"
                    class="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Delete"
                  >
                    <Icon name="lucide:trash-2" class="w-4 h-4 text-red-400" />
                  </button>
                </div>
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
</template>