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
  console.log('Export data')
}

// Edit function
const handleEdit = (item: FormasiSDMData) => {
  console.log('Edit item:', item)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
    <!-- Header Section -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <Icon name="lucide:users" class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Formasi SDM</h1>
          <p class="text-sm text-gray-600">Kelola dan pantau formasi sumber daya manusia - Layout Diperbarui</p>
        </div>
      </div>
    </div>

    <!-- ========== CARD STATISTIK DI PALING ATAS ========== -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Total Formasi Optimal -->
      <div class="group relative bg-white rounded-3xl p-6 shadow-xl border border-white/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div class="absolute inset-0 bg-gradient-to-r from-rose-400/10 to-pink-400/10 rounded-3xl"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:target" class="w-7 h-7 text-white" />
            </div>
            <div class="text-right">
              <div class="w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 font-medium mb-2">Total Formasi Optimal</p>
            <ClientOnly>
              <p class="text-3xl font-bold text-gray-900 mb-1">{{ totalFormasiOptimal.toLocaleString() }}</p>
              <template #fallback>
                <p class="text-3xl font-bold text-gray-900 mb-1">{{ totalFormasiOptimal }}</p>
              </template>
            </ClientOnly>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Formasi</span>
              <div class="flex-1 h-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full">
                <div class="h-full w-4/5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Formasi FRMS -->
      <div class="group relative bg-white rounded-3xl p-6 shadow-xl border border-white/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-3xl"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:check-circle" class="w-7 h-7 text-white" />
            </div>
            <div class="text-right">
              <div class="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 font-medium mb-2">Total Formasi FRMS</p>
            <ClientOnly>
              <p class="text-3xl font-bold text-gray-900 mb-1">{{ totalFormasiFrms.toLocaleString() }}</p>
              <template #fallback>
                <p class="text-3xl font-bold text-gray-900 mb-1">{{ totalFormasiFrms }}</p>
              </template>
            </ClientOnly>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Formasi</span>
              <div class="flex-1 h-1 bg-gradient-to-r from-emerald-200 to-green-200 rounded-full">
                <div class="h-full w-2/5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Formasi Existing -->
      <div class="group relative bg-white rounded-3xl p-6 shadow-xl border border-white/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div class="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-3xl"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:users-2" class="w-7 h-7 text-white" />
            </div>
            <div class="text-right">
              <div class="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 font-medium mb-2">Total Formasi Existing</p>
            <ClientOnly>
              <p class="text-3xl font-bold text-gray-900 mb-1">{{ totalFormasiExisting.toLocaleString() }}</p>
              <template #fallback>
                <p class="text-3xl font-bold text-gray-900 mb-1">{{ totalFormasiExisting }}</p>
              </template>
            </ClientOnly>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Formasi</span>
              <div class="flex-1 h-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full">
                <div class="h-full w-4/5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== FILTER SECTION - MODERN & USER FRIENDLY ========== -->
    <div class="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 mb-8 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div>
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div class="relative z-10">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="lucide:sliders-horizontal" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">Filter & Pencarian</h2>
            <p class="text-sm text-gray-600">Sesuaikan tampilan data sesuai kebutuhan Anda</p>
          </div>
        </div>
        
        <!-- Filter Grid dengan Desain Modern -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <!-- Semua Lokasi Induk -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="lucide:map-pin" class="w-4 h-4 text-blue-500" />
              Lokasi Induk
            </label>
            <div class="relative group">
              <select 
                v-model="selectedLokasiInduk"
                class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 appearance-none cursor-pointer hover:border-blue-300 hover:shadow-lg group-hover:bg-white"
              >
                <option v-for="option in lokasiIndukOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Icon name="lucide:chevron-down" class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
            </div>
          </div>

          <!-- Semua Unit Lokasi -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="lucide:building-2" class="w-4 h-4 text-emerald-500" />
              Unit Lokasi
            </label>
            <div class="relative group">
              <select 
                v-model="selectedUnitLokasi"
                class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 appearance-none cursor-pointer hover:border-emerald-300 hover:shadow-lg group-hover:bg-white"
              >
                <option v-for="option in unitLokasiOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Icon name="lucide:chevron-down" class="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
              </div>
            </div>
          </div>

          <!-- Semua Fungsi -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="lucide:briefcase" class="w-4 h-4 text-purple-500" />
              Fungsi
            </label>
            <div class="relative group">
              <select 
                v-model="selectedFungsi"
                class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 appearance-none cursor-pointer hover:border-purple-300 hover:shadow-lg group-hover:bg-white"
              >
                <option v-for="option in fungsiOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Icon name="lucide:chevron-down" class="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
              </div>
            </div>
          </div>

          <!-- Semua Jabatan -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="lucide:user-check" class="w-4 h-4 text-orange-500" />
              Jabatan
            </label>
            <div class="relative group">
              <select 
                v-model="selectedJabatan"
                class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 appearance-none cursor-pointer hover:border-orange-300 hover:shadow-lg group-hover:bg-white"
              >
                <option v-for="option in jabatanOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Icon name="lucide:chevron-down" class="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
              </div>
            </div>
          </div>

          <!-- Semua Status -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="lucide:activity" class="w-4 h-4 text-rose-500" />
              Status
            </label>
            <div class="relative group">
              <select 
                v-model="selectedStatus"
                class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 appearance-none cursor-pointer hover:border-rose-300 hover:shadow-lg group-hover:bg-white"
              >
                <option v-for="option in statusOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Icon name="lucide:chevron-down" class="w-5 h-5 text-gray-400 group-hover:text-rose-500 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>

        <!-- Search and Export dengan Desain Modern -->
        <div class="flex flex-col lg:flex-row gap-6 justify-between items-center">
          <div class="relative flex-1 max-w-lg group">
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Icon name="lucide:search" class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari lokasi, fungsi, atau jabatan..."
              class="w-full pl-12 pr-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 hover:shadow-lg group-hover:bg-white placeholder-gray-400"
            />
          </div>
          
          <button
            @click="handleExport"
            class="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-2xl text-sm font-semibold hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
          >
            <div class="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <Icon name="lucide:download" class="w-3 h-3" />
            </div>
            Export Data
          </button>
        </div>
      </div>
    </div>

    <!-- ========== TABLE SECTION ========== -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
      <!-- Table Header -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Icon name="lucide:table" class="w-4 h-4 text-white" />
            </div>
            <h2 class="text-lg font-semibold text-gray-900">Data Formasi SDM</h2>
          </div>
          <div class="text-sm text-gray-600">
            Total: <span class="font-semibold text-gray-900">{{ filteredData.length }}</span> data
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-gray-100 to-gray-50">
            <tr>
              <th rowspan="2" class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300 bg-white/50">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:map-pin" class="w-3 h-3" />
                  Lokasi/Divisi
                </div>
              </th>
              <th rowspan="2" class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300 bg-white/50">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:building" class="w-3 h-3" />
                  Lokasi Induk
                </div>
              </th>
              <th rowspan="2" class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300 bg-white/50">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:briefcase" class="w-3 h-3" />
                  Fungsi
                </div>
              </th>
              <th rowspan="2" class="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300 bg-white/50">
                <div class="flex items-center justify-center gap-2">
                  <Icon name="lucide:target" class="w-3 h-3" />
                  Formasi Optimal
                </div>
              </th>
              <th rowspan="2" class="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300 bg-white/50">
                <div class="flex items-center justify-center gap-2">
                  <Icon name="lucide:check-circle" class="w-3 h-3" />
                  Formasi FRMS
                </div>
              </th>
              <th rowspan="2" class="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-r border-gray-300 bg-white/50">
                <div class="flex items-center justify-center gap-2">
                  <Icon name="lucide:users" class="w-3 h-3" />
                  Existing
                </div>
              </th>
              <th colspan="2" class="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-r border-gray-300 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div class="flex items-center justify-center gap-2 mb-1">
                  <Icon name="lucide:trending-up" class="w-3 h-3" />
                  Deviasi Optimal
                </div>
                <span class="text-[10px] font-normal text-gray-600">Existing - Formasi Optimal</span>
              </th>
              <th colspan="2" class="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-300 bg-gradient-to-r from-green-50 to-emerald-50">
                <div class="flex items-center justify-center gap-2 mb-1">
                  <Icon name="lucide:trending-down" class="w-3 h-3" />
                  Deviasi FRMS
                </div>
                <span class="text-[10px] font-normal text-gray-600">Existing - Formasi FRMS</span>
              </th>
            </tr>
            <tr class="border-t border-gray-300">
              <th class="px-4 py-3 text-center text-xs font-bold text-emerald-700 uppercase tracking-wide border-r border-gray-300 bg-emerald-50">
                <Icon name="lucide:plus" class="w-3 h-3 mx-auto" />
              </th>
              <th class="px-4 py-3 text-center text-xs font-bold text-red-700 uppercase tracking-wide border-r border-gray-300 bg-red-50">
                <Icon name="lucide:minus" class="w-3 h-3 mx-auto" />
              </th>
              <th class="px-4 py-3 text-center text-xs font-bold text-emerald-700 uppercase tracking-wide border-r border-gray-300 bg-emerald-50">
                <Icon name="lucide:plus" class="w-3 h-3 mx-auto" />
              </th>
              <th class="px-4 py-3 text-center text-xs font-bold text-red-700 uppercase tracking-wide bg-red-50">
                <Icon name="lucide:minus" class="w-3 h-3 mx-auto" />
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr 
              v-for="(item, index) in paginatedData" 
              :key="index"
              class="border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200 group"
            >
              <td class="px-4 py-4 text-sm text-gray-700 font-medium border-r border-gray-100">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  {{ item.lokasiDivisi }}
                </div>
              </td>
              <td class="px-4 py-4 text-sm text-gray-700 font-medium border-r border-gray-100">
                {{ item.lokasiInduk }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-600 border-r border-gray-100">
                <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                  {{ item.fungsi }}
                </span>
              </td>
              <td class="px-4 py-4 text-center border-r border-gray-100">
                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm text-gray-700 font-semibold">{{ item.formasiOptimal }}</span>
                  <button 
                    @click="handleEdit(item)"
                    class="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <Icon name="lucide:edit-2" class="w-3 h-3" />
                  </button>
                </div>
              </td>
              <td class="px-4 py-4 text-center border-r border-gray-100">
                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm text-gray-700 font-semibold">{{ item.formasiFrms }}</span>
                  <button 
                    @click="handleEdit(item)"
                    class="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <Icon name="lucide:edit-2" class="w-3 h-3" />
                  </button>
                </div>
              </td>
              <td class="px-4 py-4 text-center text-sm text-gray-700 font-semibold border-r border-gray-100">
                <span class="inline-flex items-center px-2 py-1 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                  {{ item.existing }}
                </span>
              </td>
              <td class="px-4 py-4 text-center border-r border-gray-100">
                <span 
                  v-if="item.deviasiOptimal > 0"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 shadow-sm"
                >
                  <Icon name="lucide:trending-up" class="w-3 h-3 mr-1" />
                  +{{ item.deviasiOptimal }}
                </span>
                <span v-else class="text-sm text-gray-500">—</span>
              </td>
              <td class="px-4 py-4 text-center border-r border-gray-100">
                <span 
                  v-if="item.deviasiOptimal < 0"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-100 to-rose-100 text-red-800 shadow-sm"
                >
                  <Icon name="lucide:trending-down" class="w-3 h-3 mr-1" />
                  {{ Math.abs(item.deviasiOptimal) }}
                </span>
                <span v-else class="text-sm text-gray-500">—</span>
              </td>
              <td class="px-4 py-4 text-center border-r border-gray-100">
                <span class="text-sm text-gray-500">—</span>
              </td>
              <td class="px-4 py-4 text-center">
                <span class="text-sm text-gray-500">—</span>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="paginatedData.length === 0">
              <td colspan="10" class="px-6 py-20 text-center">
                <div class="flex flex-col items-center justify-center">
                  <div class="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Icon name="lucide:search-x" class="w-8 h-8 text-gray-400" />
                  </div>
                  <p class="text-lg font-medium text-gray-600 mb-2">Tidak ada data yang ditemukan</p>
                  <p class="text-sm text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-600 font-medium">
            Menampilkan <span class="font-semibold text-gray-900">{{ paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0 }}</span> - 
            <span class="font-semibold text-gray-900">{{ Math.min(currentPage * itemsPerPage, filteredData.length) }}</span> 
            dari <span class="font-semibold text-gray-900">{{ filteredData.length }}</span> data
          </div>
          
          <div class="flex items-center gap-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Icon name="lucide:chevron-left" class="w-4 h-4" />
              Previous
            </button>
            
            <template v-if="totalPages <= 7">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 border rounded-xl text-sm font-medium transition-all duration-200',
                  currentPage === page 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg transform scale-105' 
                    : 'border-gray-300 text-gray-700 hover:bg-white hover:shadow-md'
                ]"
              >
                {{ page }}
              </button>
            </template>
            
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
              <Icon name="lucide:chevron-right" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>