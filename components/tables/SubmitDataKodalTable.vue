<script setup lang="ts">
// components/tables/SubmitDataKodalTable.vue

interface SubmitDataKodal {
  nama: string
  nip: string
  pangkat: string
  jabatan: string
  honor: string
  lokasi: string
}

interface Props {
  data?: SubmitDataKodal[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filter states
const selectedLokasi = ref('')
const selectedBulan = ref('')
const selectedTahun = ref('')
const selectedOrderBy = ref('')

// Options untuk items per page
const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

// DATA DUMMY sesuai mockup
const dummyData: SubmitDataKodal[] = [
  {
    nama: 'Lestari Agus Wibowo',
    nip: '123456789',
    pangkat: 'Letda Inf',
    jabatan: 'Komandan Dalam',
    honor: 'Rp4.237.300',
    lokasi: 'Harian (PPNP) Cabang JATSC'
  },
  {
    nama: 'Mayor Satria Pratama',
    nip: '123456789',
    pangkat: 'Mayor Kav',
    jabatan: 'Komandan Dalam',
    honor: 'Rp2.580.900',
    lokasi: 'Syamsuddin Noor-Banjarmasin'
  },
  {
    nama: 'Kapten Doni Santoso',
    nip: '123456789',
    pangkat: 'Letda Inf',
    jabatan: 'Komandan Dalam',
    honor: 'Rp1.189.700',
    lokasi: 'Syamsuddin Noor-Banjarmasin'
  },
  {
    nama: 'Letda Budi Hartono',
    nip: '123456789',
    pangkat: 'Mayor Kav',
    jabatan: 'Komandan Dalam',
    honor: 'Rp987.600',
    lokasi: 'Syamsuddin Noor-Banjarmasin'
  },
  {
    nama: 'Serda Ahmad Wijaya',
    nip: '123456789',
    pangkat: 'Letda Inf',
    jabatan: 'Komandan Dalam',
    honor: 'Rp1.500.000',
    lokasi: 'Harian (PPNP) Cabang JATSC'
  },
  {
    nama: 'Kopda Sari Indah',
    nip: '123456789',
    pangkat: 'Mayor Kav',
    jabatan: 'Komandan Dalam',
    honor: 'Rp2.100.000',
    lokasi: 'Syamsuddin Noor-Banjarmasin'
  }
]

// Use props data if available, otherwise use dummy data
const submitDataKodalData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Dropdown options
const filterLokasiOptions = [
  { value: '', label: 'Semua Lokasi' },
  { value: 'jakarta', label: 'Jakarta' },
  { value: 'surabaya', label: 'Surabaya' },
  { value: 'bandung', label: 'Bandung' }
]

const filterBulanOptions = [
  { value: '', label: 'Semua Bulan' },
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
  { value: '', label: 'Semua Tahun' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' }
]

const orderByOptions = [
  { value: '', label: 'Order by' },
  { value: 'nama_asc', label: 'Nama A-Z' },
  { value: 'nama_desc', label: 'Nama Z-A' },
  { value: 'tanggal_asc', label: 'Tanggal Terlama' },
  { value: 'tanggal_desc', label: 'Tanggal Terbaru' }
]

// Filter data based on search and filters
const filteredData = computed(() => {
  let filtered = submitDataKodalData.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.nama.toLowerCase().includes(query) ||
      item.nip.toLowerCase().includes(query) ||
      item.pangkat.toLowerCase().includes(query) ||
      item.jabatan.toLowerCase().includes(query) ||
      item.honor.toLowerCase().includes(query) ||
      item.lokasi.toLowerCase().includes(query)
    )
  }

  // Apply lokasi filter
  if (selectedLokasi.value) {
    filtered = filtered.filter(item => 
      item.lokasi.toLowerCase().includes(selectedLokasi.value.toLowerCase())
    )
  }

  // Apply order by
  if (selectedOrderBy.value) {
    switch (selectedOrderBy.value) {
      case 'nama_asc':
        filtered = [...filtered].sort((a, b) => a.nama.localeCompare(b.nama))
        break
      case 'nama_desc':
        filtered = [...filtered].sort((a, b) => b.nama.localeCompare(a.nama))
        break
      case 'tanggal_asc':
        // Sort by date if you have date field
        break
      case 'tanggal_desc':
        // Sort by date if you have date field
        break
    }
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

// Reset to page 1 when items per page changes
watch(itemsPerPage, () => {
  currentPage.value = 1
})

// Reset to page 1 when filters change
watch([selectedLokasi, selectedBulan, selectedTahun, selectedOrderBy], () => {
  currentPage.value = 1
})

// Submit function
const handleSubmitData = () => {
  console.log('Submitting data kodal...')
  // Add your submit logic here
  alert('Data berhasil dikirim!')
}

const handleView = (item: SubmitDataKodal) => {
  console.log('Viewing item:', item)
  // Add your view logic here
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Header with Search, Filters and Submit Button -->
    <div class="px-4 sm:px-6 py-4 bg-white rounded-t-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <!-- Left Side: Search and Filters -->
      <div class="flex flex-wrap items-center gap-3 flex-1">
        <!-- Search Box -->
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

        <!-- Bulan Filter -->
        <div class="min-w-[120px]">
          <select 
            v-model="selectedBulan"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
          >
            <option value="">Oktober</option>
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
            <option value="">2024</option>
            <option v-for="option in filterTahunOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Order By Filter -->
        <div class="min-w-[120px]">
          <select 
            v-model="selectedOrderBy"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
          >
            <option v-for="option in orderByOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Right Side: Submit Button -->
      <div class="flex-shrink-0">
        <button 
          @click="handleSubmitData"
          class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          <Icon name="lucide:send" class="w-4 h-4" />
          Kirim Data
        </button>
      </div>
    </div>

    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto">
      <div class="px-4 sm:px-6 pb-4">
        <table class="w-full min-w-[800px]">
          <thead class="bg-blue-100/60 rounded-t-xl">
            <tr>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                NO
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NAMA
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NIP
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                PANGKAT
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                JABATAN
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                HONOR (RP)
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                LOKASI
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
                <span class="hidden sm:inline">{{ item.nama }}</span>
                <span class="sm:hidden">{{ item.nama.length > 15 ? item.nama.substring(0, 15) + '...' : item.nama }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.nip }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.pangkat }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span class="hidden sm:inline">{{ item.jabatan }}</span>
                <span class="sm:hidden">{{ item.jabatan.length > 10 ? item.jabatan.substring(0, 10) + '...' : item.jabatan }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ item.honor }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span class="hidden sm:inline">{{ item.lokasi }}</span>
                <span class="sm:hidden">{{ item.lokasi.length > 15 ? item.lokasi.substring(0, 15) + '...' : item.lokasi }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <button 
                  @click="handleView(item)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Icon name="lucide:eye" class="w-5 h-5 text-sky-400" />
                </button>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="paginatedData.length === 0">
              <td colspan="8" class="px-6 py-16 text-center">
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