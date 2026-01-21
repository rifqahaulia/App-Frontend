<script setup lang="ts">
// components/tables/MonitoringLaporanTable.vue

interface MonitoringLaporan {
  namaCabang: string
  status: 'belum_melaporkan' | 'sudah_melaporkan'
}

interface Props {
  data?: MonitoringLaporan[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filter states
const selectedBulan = ref('oktober')
const selectedTahun = ref('2024')

// Options untuk items per page
const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

// DATA DUMMY sesuai mockup
const dummyData: MonitoringLaporan[] = [
  {
    namaCabang: 'CABANG JATSC',
    status: 'belum_melaporkan'
  },
  {
    namaCabang: 'CABANG HALIM',
    status: 'sudah_melaporkan'
  },
  {
    namaCabang: 'CABANG BANDUNG',
    status: 'sudah_melaporkan'
  },
  {
    namaCabang: 'CABANG MEDAN',
    status: 'sudah_melaporkan'
  },
  {
    namaCabang: 'CABANG SURABAYA',
    status: 'sudah_melaporkan'
  },
  {
    namaCabang: 'CABANG MAKASSAR',
    status: 'belum_melaporkan'
  },
  {
    namaCabang: 'CABANG DENPASAR',
    status: 'sudah_melaporkan'
  },
  {
    namaCabang: 'CABANG BALIKPAPAN',
    status: 'belum_melaporkan'
  }
]

// Use props data if available, otherwise use dummy data
const monitoringLaporanData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Dropdown options
const filterBulanOptions = [
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
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' }
]

// Filter data based on filters
const filteredData = computed(() => {
  let filtered = monitoringLaporanData.value

  // Apply bulan filter
  if (selectedBulan.value) {
    // Filter logic based on month if needed
  }

  // Apply tahun filter
  if (selectedTahun.value) {
    // Filter logic based on year if needed
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

// Reset to page 1 when filters change
watch([selectedBulan, selectedTahun], () => {
  currentPage.value = 1
})

// Functions
const handleDownloadAll = () => {
  console.log('Downloading all reports...')
  alert('Semua laporan berhasil didownload!')
}

const handleDownload = (item: MonitoringLaporan) => {
  console.log('Downloading report for:', item.namaCabang)
  alert(`Laporan ${item.namaCabang} berhasil didownload!`)
}

// Status styling
const getStatusClass = (status: string) => {
  switch (status) {
    case 'belum_melaporkan':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'sudah_melaporkan':
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'belum_melaporkan':
      return 'Belum melaporkan'
    case 'sudah_melaporkan':
      return 'Sudah melaporkan'
    default:
      return status
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Header with Filters and Download All Button -->
    <div class="px-4 sm:px-6 py-4 bg-white rounded-t-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <!-- Left Side: Filters -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Bulan Filter -->
        <div class="min-w-[120px]">
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

      <!-- Right Side: Download All Button -->
      <div class="flex-shrink-0">
        <button 
          @click="handleDownloadAll"
          class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          <Icon name="lucide:download" class="w-4 h-4" />
          Download All
        </button>
      </div>
    </div>

    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto">
      <div class="px-4 sm:px-6 pb-4">
        <table class="w-full min-w-[600px]">
          <thead class="bg-blue-100/60 rounded-t-xl">
            <tr>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                NO
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NAMA CABANG
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
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                {{ item.namaCabang }}
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
                <button 
                  @click="handleDownload(item)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                  :disabled="item.status === 'belum_melaporkan'"
                  :class="item.status === 'belum_melaporkan' ? 'opacity-50 cursor-not-allowed' : ''"
                >
                  <Icon name="lucide:download" class="w-5 h-5 text-sky-400" />
                </button>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="paginatedData.length === 0">
              <td colspan="4" class="px-6 py-16 text-center">
                <Icon name="lucide:inbox" class="w-14 h-14 mx-auto mb-4 text-gray-300" />
                <p class="text-sm font-medium text-gray-600">Tidak ada data yang ditemukan</p>
                <p class="text-xs text-gray-500 mt-1">Coba ubah filter pencarian Anda</p>
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