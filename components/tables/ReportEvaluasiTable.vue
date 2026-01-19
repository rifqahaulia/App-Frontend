<script setup lang="ts">

interface ReportEvaluasi {
  no: number
  lokasi: string
  lokasiDetail: string
  wilayahTeritori: string
  moveTahun2024: string
  moveCluster2024: string
  freq: string
  jmlSDM2024: number
  clusterSDM2024: string
  service: string
  radarNonRadar: string
  jmlTransaksi: number
  kategoriPelayanan: string
  trafficMovement: string
  volume: string
  beban: string
  bebas: string
  total: string
  semester: string
  keterangan: string
}

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Dummy data
const dummyData: ReportEvaluasi[] = [
  {
    no: 1,
    lokasi: 'Medan',
    lokasiDetail: 'Cabang Medan',
    wilayahTeritori: '1',
    moveTahun2024: '58907',
    moveCluster2024: '68,607.00',
    freq: 'Tahun',
    jmlSDM2024: 188,
    clusterSDM2024: '200',
    service: 'APP, TWT, Radar',
    radarNonRadar: 'Radar',
    jmlTransaksi: 10810,
    kategoriPelayanan: 'Medium',
    trafficMovement: 'Medium',
    volume: 'Low',
    beban: '1',
    bebas: '1',
    total: '18',
    semester: 'Cabang Pembantu',
    keterangan: 'Cabang III'
  },
  {
    no: 2,
    lokasi: 'Siborong Borong',
    lokasiDetail: 'Cabang Pembantu Siroli',
    wilayahTeritori: '1',
    moveTahun2024: '4162',
    moveCluster2024: '-',
    freq: 'Tahun',
    jmlSDM2024: 16,
    clusterSDM2024: '-',
    service: 'TWT',
    radarNonRadar: 'Non Radar',
    jmlTransaksi: 0,
    kategoriPelayanan: 'Low',
    trafficMovement: 'Low',
    volume: 'Low',
    beban: '1',
    bebas: '1',
    total: '-',
    semester: 'Cabang Pembantu',
    keterangan: 'Cabang C'
  },
  {
    no: 3,
    lokasi: 'Cabang Surabaya',
    lokasiDetail: 'Unit Siborong Borong',
    wilayahTeritori: '1',
    moveTahun2024: '3288',
    moveCluster2024: '-',
    freq: 'Tahun',
    jmlSDM2024: 12,
    clusterSDM2024: '-',
    service: 'TWT',
    radarNonRadar: 'Radar',
    jmlTransaksi: 0,
    kategoriPelayanan: 'Low',
    trafficMovement: 'Low',
    volume: 'Low',
    beban: '1',
    bebas: '1',
    total: '-',
    semester: 'Kepala Unit',
    keterangan: 'Cabang C'
  }
]

const reportData = ref(dummyData)

// Filter data based on search
const filteredData = computed(() => {
  if (!searchQuery.value) return reportData.value
  
  const query = searchQuery.value.toLowerCase()
  return reportData.value.filter(item => 
    item.lokasi.toLowerCase().includes(query) ||
    item.lokasiDetail.toLowerCase().includes(query) ||
    item.service.toLowerCase().includes(query) ||
    item.radarNonRadar.toLowerCase().includes(query) ||
    item.kategoriPelayanan.toLowerCase().includes(query)
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
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Search Bar -->
    <div class="px-6 py-4 bg-white rounded-t-2xl">
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
    </div>

    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto px-6 pb-4">
      <table class="w-full min-w-max">
        <thead class="bg-blue-100/60 rounded-t-xl">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap sticky left-0 bg-blue-100/60 z-10 first:rounded-tl-xl">No</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Lokasi</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Lokasi</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Wilayah Teritori</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Move Tahun 2024</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Move Cluster 2024</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Freq</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Jml. SDM 2024</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Cluster SDM 2024</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Service</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Radar/Non Radar</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Jml. Transaksi</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Kategori Pelayanan (4M)</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Traffic Movement 23 Tahun (10%)</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Volume</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Beban</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Bebas</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Total</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Semester</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap last:rounded-tr-xl">Keterangan</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr 
            v-for="item in paginatedData" 
            :key="item.no"
            class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors"
          >
            <td class="px-6 py-4 text-sm text-gray-700 font-medium whitespace-nowrap sticky left-0 bg-white">{{ item.no }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{{ item.lokasi }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{{ item.lokasiDetail }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.wilayahTeritori }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{{ item.moveTahun2024 }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{{ item.moveCluster2024 }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{{ item.freq }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap text-center font-medium">{{ item.jmlSDM2024 }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap text-center">{{ item.clusterSDM2024 }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap font-semibold">{{ item.service }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{{ item.radarNonRadar }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.jmlTransaksi }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{{ item.kategoriPelayanan }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{{ item.trafficMovement }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{{ item.volume }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.beban }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.bebas }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.total }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{{ item.semester }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{{ item.keterangan }}</td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="paginatedData.length === 0">
            <td colspan="20" class="px-6 py-16 text-center">
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
</template>
