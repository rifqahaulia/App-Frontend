<script setup lang="ts">
// components/formasi/FormasiSDMContent.vue

interface FormasiSDMData {
  lokasiDivisi: string
  lokasiInduk: string
  fungsi: string
  formasiOptimal: number
  formasiFrms: number
  existing: number
  deviasiOptimal: number
  deviasiFrms: number
}

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filter states
const selectedLokasiInduk = ref('Semua Lokasi Induk')
const selectedUnitLokasi = ref('Semua Unit Lokasi')
const selectedFungsi = ref('Semua Fungsi')
const selectedJabatan = ref('Semua Jabatan')
const selectedStatus = ref('Semua Status')

// Filter options
const lokasiIndukOptions = [
  'Semua Lokasi Induk',
  'KANTOR PUSAT',
  'KANTOR CABANG',
  'KANTOR WILAYAH'
]

const unitLokasiOptions = [
  'Semua Unit Lokasi',
  'KANTOR PUSAT',
  'KANTOR CABANG JAKARTA',
  'KANTOR CABANG SURABAYA'
]

const fungsiOptions = [
  'Semua Fungsi',
  'ATC',
  'ACO',
  'FLIGHT DATA OFFICER',
  'TEKNIK CNS',
  'SPV TEKNIK CNS',
  'ANALIS DATA',
  'AUDITOR'
]

const jabatanOptions = [
  'Semua Jabatan',
  'Air Traffic Controller',
  'Approach Control Officer',
  'Flight Data Officer',
  'Teknisi CNS',
  'Supervisor Teknik CNS',
  'Analis Data',
  'Auditor'
]

const statusOptions = [
  'Semua Status',
  'Aktif',
  'Tidak Aktif',
  'Pending'
]

// Dummy data sesuai mockup
const dummyData: FormasiSDMData[] = [
  {
    lokasiDivisi: 'KANTOR PUSAT',
    lokasiInduk: 'KANTOR PUSAT',
    fungsi: 'ATC',
    formasiOptimal: 10,
    formasiFrms: 0,
    existing: 10,
    deviasiOptimal: 0,
    deviasiFrms: 0
  },
  {
    lokasiDivisi: 'KANTOR PUSAT',
    lokasiInduk: 'KANTOR PUSAT',
    fungsi: 'ACO',
    formasiOptimal: 14,
    formasiFrms: 0,
    existing: 14,
    deviasiOptimal: 0,
    deviasiFrms: 0
  },
  {
    lokasiDivisi: 'KANTOR PUSAT',
    lokasiInduk: 'KANTOR PUSAT',
    fungsi: 'FLIGHT DATA OFFICER',
    formasiOptimal: 0,
    formasiFrms: 0,
    existing: 0,
    deviasiOptimal: 0,
    deviasiFrms: 0
  },
  {
    lokasiDivisi: 'KANTOR PUSAT',
    lokasiInduk: 'KANTOR PUSAT',
    fungsi: 'TEKNIK CNS',
    formasiOptimal: 3,
    formasiFrms: 0,
    existing: 4,
    deviasiOptimal: 1,
    deviasiFrms: 0
  },
  {
    lokasiDivisi: 'KANTOR PUSAT',
    lokasiInduk: 'KANTOR PUSAT',
    fungsi: 'SPV TEKNIK CNS',
    formasiOptimal: 1,
    formasiFrms: 0,
    existing: 0,
    deviasiOptimal: -1,
    deviasiFrms: 0
  },
  {
    lokasiDivisi: 'KANTOR PUSAT',
    lokasiInduk: 'KANTOR PUSAT',
    fungsi: 'ANALIS DATA',
    formasiOptimal: 0,
    formasiFrms: 0,
    existing: 0,
    deviasiOptimal: 0,
    deviasiFrms: 0
  },
  {
    lokasiDivisi: 'KANTOR PUSAT',
    lokasiInduk: 'KANTOR PUSAT',
    fungsi: 'AUDITOR',
    formasiOptimal: 5,
    formasiFrms: 0,
    existing: 8,
    deviasiOptimal: 3,
    deviasiFrms: 0
  }
]

// Statistics calculations
const totalFormasiOptimal = computed(() => 5374)
const totalFormasiFrms = computed(() => 1447) 
const totalFormasiExisting = computed(() => 4851)

// Filter data based on search and filters
const filteredData = computed(() => {
  let filtered = dummyData

  // Apply filters
  if (selectedLokasiInduk.value !== 'Semua Lokasi Induk') {
    filtered = filtered.filter(item => item.lokasiInduk === selectedLokasiInduk.value)
  }
  
  if (selectedFungsi.value !== 'Semua Fungsi') {
    filtered = filtered.filter(item => item.fungsi === selectedFungsi.value)
  }

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.lokasiDivisi.toLowerCase().includes(query) ||
      item.lokasiInduk.toLowerCase().includes(query) ||
      item.fungsi.toLowerCase().includes(query)
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

// Reset to page 1 when search changes
watch([searchQuery, selectedLokasiInduk, selectedUnitLokasi, selectedFungsi, selectedJabatan, selectedStatus], () => {
  currentPage.value = 1
})

// Export function
const handleExport = () => {
  // Implement export functionality
  console.log('Export data')
}

// Edit function
const handleEdit = (item: FormasiSDMData) => {
  // Implement edit functionality
  console.log('Edit item:', item)
}
</script>

<template>
  <div>
    <!-- Filters -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <!-- Semua Lokasi Induk -->
        <div>
          <select 
            v-model="selectedLokasiInduk"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option v-for="option in lokasiIndukOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Semua Unit Lokasi -->
        <div>
          <select 
            v-model="selectedUnitLokasi"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option v-for="option in unitLokasiOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Semua Fungsi -->
        <div>
          <select 
            v-model="selectedFungsi"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option v-for="option in fungsiOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Semua Jabatan -->
        <div>
          <select 
            v-model="selectedJabatan"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option v-for="option in jabatanOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Semua Status -->
        <div>
          <select 
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option v-for="option in statusOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <!-- Export Button -->
      <div class="flex justify-end">
        <button
          @click="handleExport"
          class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          <Icon name="lucide:download" class="w-4 h-4" />
          Export
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Total Formasi Optimal -->
      <div class="bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200/60">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
            <Icon name="lucide:users" class="w-6 h-6 text-white" />
          </div>
          <div>
            <p class="text-sm text-pink-700 font-medium mb-1">Total Formasi Optimal</p>
            <p class="text-2xl font-bold text-pink-900">{{ totalFormasiOptimal.toLocaleString() }}</p>
            <p class="text-xs text-pink-600">Formasi</p>
          </div>
        </div>
      </div>

      <!-- Total Formasi FRMS -->
      <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200/60">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
            <Icon name="lucide:user-check" class="w-6 h-6 text-white" />
          </div>
          <div>
            <p class="text-sm text-green-700 font-medium mb-1">Total Formasi FRMS</p>
            <p class="text-2xl font-bold text-green-900">{{ totalFormasiFrms.toLocaleString() }}</p>
            <p class="text-xs text-green-600">Formasi</p>
          </div>
        </div>
      </div>

      <!-- Total Formasi Existing -->
      <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200/60">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
            <Icon name="lucide:user-plus" class="w-6 h-6 text-white" />
          </div>
          <div>
            <p class="text-sm text-yellow-700 font-medium mb-1">Total Formasi Existing</p>
            <p class="text-2xl font-bold text-yellow-900">{{ totalFormasiExisting.toLocaleString() }}</p>
            <p class="text-xs text-yellow-600">Formasi</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
      <!-- Table Header -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th rowspan="2" class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                LOKASI/DIVISI
              </th>
              <th rowspan="2" class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                LOKASI INDUK
              </th>
              <th rowspan="2" class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                FUNGSI
              </th>
              <th rowspan="2" class="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                FORMASI OPTIMAL
              </th>
              <th rowspan="2" class="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                FORMASI FRMS
              </th>
              <th rowspan="2" class="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                EXISTING
              </th>
              <th colspan="2" class="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-r border-gray-300">
                DEVIASI OPTIMAL
                <br>
                <span class="text-[10px] font-normal text-gray-600">EXISTING - FORMASI OPTIMAL</span>
              </th>
              <th colspan="2" class="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300">
                DEVIASI FRMS
                <br>
                <span class="text-[10px] font-normal text-gray-600">EXISTING - FORMASI FRMS</span>
              </th>
            </tr>
            <tr class="border-t border-gray-300">
              <th class="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                +
              </th>
              <th class="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                -
              </th>
              <th class="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300">
                +
              </th>
              <th class="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wide">
                -
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr 
              v-for="(item, index) in paginatedData" 
              :key="index"
              class="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/30 transition-colors"
            >
              <td class="px-3 py-3 text-sm text-gray-700 font-medium border-r border-gray-200">
                {{ item.lokasiDivisi }}
              </td>
              <td class="px-3 py-3 text-sm text-gray-700 font-medium border-r border-gray-200">
                {{ item.lokasiInduk }}
              </td>
              <td class="px-3 py-3 text-sm text-gray-600 border-r border-gray-200">
                {{ item.fungsi }}
              </td>
              <td class="px-3 py-3 text-center border-r border-gray-200">
                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm text-gray-700 font-semibold">{{ item.formasiOptimal }}</span>
                  <button 
                    @click="handleEdit(item)"
                    class="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <Icon name="lucide:edit-2" class="w-4 h-4" />
                  </button>
                </div>
              </td>
              <td class="px-3 py-3 text-center border-r border-gray-200">
                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm text-gray-700 font-semibold">{{ item.formasiFrms }}</span>
                  <button 
                    @click="handleEdit(item)"
                    class="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <Icon name="lucide:edit-2" class="w-4 h-4" />
                  </button>
                </div>
              </td>
              <td class="px-3 py-3 text-center text-sm text-gray-700 font-semibold border-r border-gray-200">
                {{ item.existing }}
              </td>
              <td class="px-3 py-3 text-center border-r border-gray-200">
                <span 
                  v-if="item.deviasiOptimal > 0"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  +{{ item.deviasiOptimal }}
                </span>
                <span v-else class="text-sm text-gray-700">0</span>
              </td>
              <td class="px-3 py-3 text-center border-r border-gray-200">
                <span 
                  v-if="item.deviasiOptimal < 0"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                >
                  {{ Math.abs(item.deviasiOptimal) }}
                </span>
                <span v-else class="text-sm text-gray-700">0</span>
              </td>
              <td class="px-3 py-3 text-center border-r border-gray-200">
                <span class="text-sm text-gray-700">0</span>
              </td>
              <td class="px-3 py-3 text-center">
                <span class="text-sm text-gray-700">0</span>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="paginatedData.length === 0">
              <td colspan="10" class="px-6 py-16 text-center">
                <Icon name="lucide:users" class="w-14 h-14 mx-auto mb-4 text-gray-300" />
                <p class="text-sm font-medium text-gray-600">Tidak ada data yang ditemukan</p>
                <p class="text-xs text-gray-500 mt-1">Coba ubah filter atau kata kunci pencarian Anda</p>
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
  </div>
</template>// Test comment added Mon Jan  5 15:46:46 WIB 2026
