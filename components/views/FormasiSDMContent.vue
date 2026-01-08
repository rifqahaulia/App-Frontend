<script setup lang="ts">

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
watch([selectedLokasiInduk, selectedUnitLokasi, selectedFungsi, selectedJabatan, selectedStatus], () => {
  currentPage.value = 1
})

// Export function
const handleExport = () => {
  console.log('Export data')
}

// Edit function
const handleEdit = (item: FormasiSDMData, field: 'formasiOptimal' | 'formasiFrms') => {
  console.log('Edit item:', item, 'field:', field)
  editingItem.value = { ...item }
  editingField.value = field
  editFormValue.value = field === 'formasiOptimal' ? item.formasiOptimal.toString() : item.formasiFrms.toString()
  showEditModal.value = true
}

// Modal states
const showEditModal = ref(false)
const editingItem = ref<FormasiSDMData | null>(null)
const editingField = ref<'formasiOptimal' | 'formasiFrms'>('formasiOptimal')
const editFormValue = ref('')

// Modal functions
const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
  editingField.value = 'formasiOptimal'
  editFormValue.value = ''
}

const saveEditValue = () => {
  if (editingItem.value && editFormValue.value) {
    // Update the value in the data
    console.log('Saving value:', editFormValue.value, 'for field:', editingField.value, 'item:', editingItem.value)
    // Here you would typically update the data source
    closeEditModal()
  }
}
</script>

<template>
    <!-- ========== CARD STATISTIK DI ATAS ========== -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Total Formasi Optimal -->
      <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:target" class="w-5 h-5 text-rose-600" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-xs text-gray-600 font-medium mb-1">Total Formasi Optimal</p>
            <ClientOnly>
              <p class="text-2xl font-bold text-gray-900">{{ totalFormasiOptimal.toLocaleString() }}</p>
              <template #fallback>
                <p class="text-2xl font-bold text-gray-900">{{ totalFormasiOptimal }}</p>
              </template>
            </ClientOnly>
            <p class="text-xs text-gray-500">Formasi</p>
          </div>
        </div>
      </div>

      <!-- Total Formasi FRMS -->
      <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:check-circle" class="w-5 h-5 text-emerald-600" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-xs text-gray-600 font-medium mb-1">Total Formasi FRMS</p>
            <ClientOnly>
              <p class="text-2xl font-bold text-gray-900">{{ totalFormasiFrms.toLocaleString() }}</p>
              <template #fallback>
                <p class="text-2xl font-bold text-gray-900">{{ totalFormasiFrms }}</p>
              </template>
            </ClientOnly>
            <p class="text-xs text-gray-500">Formasi</p>
          </div>
        </div>
      </div>

      <!-- Total Formasi Existing -->
      <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:users-2" class="w-5 h-5 text-amber-600" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-xs text-gray-600 font-medium mb-1">Total Formasi Existing</p>
            <ClientOnly>
              <p class="text-2xl font-bold text-gray-900">{{ totalFormasiExisting.toLocaleString() }}</p>
              <template #fallback>
                <p class="text-2xl font-bold text-gray-900">{{ totalFormasiExisting }}</p>
              </template>
            </ClientOnly>
            <p class="text-xs text-gray-500">Formasi</p>
          </div>
        </div>
      </div>
    </div>
    <!-- ========== FILTER SECTION ========== -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div class="mb-4">
        <h2 class="text-base font-semibold text-gray-900">Filter & Pencarian</h2>
        <p class="text-xs text-gray-600">Sesuaikan tampilan data sesuai kebutuhan Anda</p>
      </div>
      
      <!-- Filter Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <!-- Lokasi Induk -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-700">Lokasi Induk</label>
          <div class="relative">
            <select 
              v-model="selectedLokasiInduk"
              class="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option v-for="option in lokasiIndukOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <!-- Unit Lokasi -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-700">Unit Lokasi</label>
          <div class="relative">
            <select 
              v-model="selectedUnitLokasi"
              class="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option v-for="option in unitLokasiOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <!-- Fungsi -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-700">Fungsi</label>
          <div class="relative">
            <select 
              v-model="selectedFungsi"
              class="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option v-for="option in fungsiOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <!-- Jabatan -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-700">Jabatan</label>
          <div class="relative">
            <select 
              v-model="selectedJabatan"
              class="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option v-for="option in jabatanOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <!-- Status -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-700">Status</label>
          <div class="relative">
            <select 
              v-model="selectedStatus"
              class="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option v-for="option in statusOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Export Button Only -->
      <div class="flex justify-end">
        <button
          @click="handleExport"
          class="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
        >
          <Icon name="lucide:download" class="w-3 h-3" />
          Export Data
        </button>
      </div>
    </div>
    <!-- ========== TABLE SECTION ========== -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <!-- Table Header -->
      <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <h2 class="text-base font-semibold text-gray-900">Data Formasi SDM</h2>
          </div>
          <div class="text-xs text-gray-600">
            Total: <span class="font-semibold text-gray-900">{{ filteredData.length }}</span> data
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-blue-100/60">
            <tr>
              <th rowspan="2" class="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide border-r border-gray-200">
                Lokasi/Divisi
              </th>
              <th rowspan="2" class="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide border-r border-gray-200">
                Lokasi Induk
              </th>
              <th rowspan="2" class="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide border-r border-gray-200">
                Fungsi
              </th>
              <th rowspan="2" class="px-3 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide border-r border-gray-200">
                Formasi Optimal
              </th>
              <th rowspan="2" class="px-3 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide border-r border-gray-200">
                Formasi FRMS
              </th>
              <th rowspan="2" class="px-3 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide border-r border-gray-200">
                Existing
              </th>
              <th colspan="2" class="px-3 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide border-b border-r border-gray-200">
                Deviasi Optimal
              </th>
              <th colspan="2" class="px-3 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200">
                Deviasi FRMS
              </th>
            </tr>
            <tr class="border-t border-gray-200">
              <th class="px-3 py-1.5 text-center text-xs font-semibold text-emerald-700 uppercase tracking-wide border-r border-gray-200 bg-emerald-50">
                +
              </th>
              <th class="px-3 py-1.5 text-center text-xs font-semibold text-red-700 uppercase tracking-wide border-r border-gray-200 bg-red-50">
                -
              </th>
              <th class="px-3 py-1.5 text-center text-xs font-semibold text-emerald-700 uppercase tracking-wide border-r border-gray-200 bg-emerald-50">
                +
              </th>
              <th class="px-3 py-1.5 text-center text-xs font-semibold text-red-700 uppercase tracking-wide bg-red-50">
                -
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="(item, index) in paginatedData" 
              :key="index"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-3 py-2 text-xs text-gray-900 font-medium border-r border-gray-200">
                {{ item.lokasiDivisi }}
              </td>
              <td class="px-3 py-2 text-xs text-gray-900 font-medium border-r border-gray-200">
                {{ item.lokasiInduk }}
              </td>
              <td class="px-3 py-2 text-xs text-gray-700 border-r border-gray-200">
                {{ item.fungsi }}
              </td>
              <td class="px-3 py-2 text-center border-r border-gray-200">
                <div class="flex items-center justify-center gap-1">
                  <span class="text-xs text-gray-900 font-semibold">{{ item.formasiOptimal }}</span>
                  <button 
                    @click="handleEdit(item, 'formasiOptimal')"
                    class="p-0.5 text-[#65BEFF] hover:text-[#189EFF] transition-colors"
                  >
                    <Icon name="lucide:edit-2" class="w-3 h-3" />
                  </button>
                </div>
              </td>
              <td class="px-3 py-2 text-center border-r border-gray-200">
                <div class="flex items-center justify-center gap-1">
                  <span class="text-xs text-gray-900 font-semibold">{{ item.formasiFrms }}</span>
                  <button 
                    @click="handleEdit(item, 'formasiFrms')"
                    class="p-0.5 text-[#65BEFF] hover:text-[#189EFF] transition-colors"
                  >
                    <Icon name="lucide:edit-2" class="w-3 h-3" />
                  </button>
                </div>
              </td>
              <td class="px-3 py-2 text-center text-xs text-gray-900 font-semibold border-r border-gray-200">
                {{ item.existing }}
              </td>
              <td class="px-3 py-2 text-center border-r border-gray-200">
                <span 
                  v-if="item.deviasiOptimal > 0"
                  class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800"
                >
                  +{{ item.deviasiOptimal }}
                </span>
                <span v-else class="text-xs text-gray-400">—</span>
              </td>
              <td class="px-3 py-2 text-center border-r border-gray-200">
                <span 
                  v-if="item.deviasiOptimal < 0"
                  class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
                >
                  {{ Math.abs(item.deviasiOptimal) }}
                </span>
                <span v-else class="text-xs text-gray-400">—</span>
              </td>
              <td class="px-3 py-2 text-center border-r border-gray-200">
                <span class="text-xs text-gray-400">—</span>
              </td>
              <td class="px-3 py-2 text-center">
                <span class="text-xs text-gray-400">—</span>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="paginatedData.length === 0">
              <td colspan="10" class="px-4 py-8 text-center">
                <div class="flex flex-col items-center justify-center">
                  <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Icon name="lucide:search-x" class="w-5 h-5 text-gray-400" />
                  </div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Tidak ada data yang ditemukan</p>
                  <p class="text-xs text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="text-xs text-gray-600">
            Menampilkan <span class="font-semibold text-gray-900">{{ paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0 }}</span> - 
            <span class="font-semibold text-gray-900">{{ Math.min(currentPage * itemsPerPage, filteredData.length) }}</span> 
            dari <span class="font-semibold text-gray-900">{{ filteredData.length }}</span> data
          </div>
          
          <div class="flex items-center gap-1">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="lucide:chevron-left" class="w-3 h-3" />
              Previous
            </button>
            
            <template v-if="totalPages <= 7">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-2 py-1 border rounded text-xs font-medium transition-colors',
                  currentPage === page 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-300 text-gray-700 hover:bg-white'
                ]"
              >
                {{ page }}
              </button>
            </template>
            
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <Icon name="lucide:chevron-right" class="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-2xl w-96 max-w-md mx-4 border border-gray-200">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-[#65BEFF] rounded-t-lg">
          <h3 class="text-lg font-semibold text-white">
            Edit {{ editingField === 'formasiOptimal' ? 'Formasi Optimal' : 'Formasi FRMS' }} - {{ editingItem?.fungsi }}
          </h3>
          <button @click="closeEditModal" class="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ editingField === 'formasiOptimal' ? 'Jumlah Formasi Optimal' : 'Jumlah Formasi FRMS' }}
            </label>
            <input 
              v-model="editFormValue"
              type="number" 
              min="0"
              placeholder="0"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEFF] focus:border-[#65BEFF] bg-white"
            />
          </div>
        </div>
        
        <!-- Modal Footer -->
        <div class="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button @click="closeEditModal" class="px-4 py-2 text-sm font-medium text-[#65BEFF] hover:text-[#189EFF] transition-colors border border-[#65BEFF] rounded-md hover:bg-blue-50">
            Cancel
          </button>
          <button @click="saveEditValue" class="px-4 py-2 bg-[#65BEFF] text-white text-sm font-medium rounded-md hover:bg-[#189EFF] transition-colors shadow-sm">
            Update
          </button>
        </div>
      </div>
    </div>
</template>