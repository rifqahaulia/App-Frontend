<script setup lang="ts">
// components/tables/ReportEvaluasiTable.vue

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

// Pagination
const totalPages = computed(() => 
  Math.ceil(reportData.value.length / itemsPerPage.value)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return reportData.value.slice(start, end)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto">
      <table class="w-full min-w-max">
        <thead class="bg-blue-100/60">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap sticky left-0 bg-blue-100/60 z-10">No</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Lokasi</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Lokasi</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Wilayah Teritori</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Move Tahun 2024</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Move Cluster 2024</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Freq</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Jml. SDM 2024</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Cluster SDM 2024</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Service</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Radar/Non Radar</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Jml. Transaksi</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Kategori Pelayanan (4M)</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Traffic Movement 23 Tahun (10%)</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Volume</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Beban</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Bebas</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Total</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Semester</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Keterangan</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr 
            v-for="item in paginatedData" 
            :key="item.no"
            class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors"
          >
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap sticky left-0 bg-white">{{ item.no }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.lokasi }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.lokasiDetail }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.wilayahTeritori }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.moveTahun2024 }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.moveCluster2024 }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.freq }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.jmlSDM2024 }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.clusterSDM2024 }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.service }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.radarNonRadar }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.jmlTransaksi }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.kategoriPelayanan }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.trafficMovement }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.volume }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.beban }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.bebas }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap text-center">{{ item.total }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.semester }}</td>
            <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ item.keterangan }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
      <div class="flex items-center gap-2">
        <button
          @click="goToPage(1)"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          1
        </button>
        <button
          @click="goToPage(2)"
          :disabled="currentPage === 2"
          class="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
          :class="currentPage === 2 ? 'bg-blue-500 text-white border-blue-500' : ''"
        >
          2
        </button>
        <button
          @click="goToPage(3)"
          class="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
        >
          3
        </button>
        <span class="px-2 text-gray-500">...</span>
        <button
          @click="goToPage(8)"
          class="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
        >
          8
        </button>
        <button
          @click="goToPage(9)"
          class="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
        >
          9
        </button>
        <button
          @click="goToPage(10)"
          class="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
        >
          10
        </button>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="lucide:chevron-right" class="w-4 h-4" />
        </button>
      </div>
      
      <div class="text-sm text-gray-600 flex items-center gap-2">
        Items per page: 
        <select 
          v-model="itemsPerPage"
          class="px-2 py-1 border border-gray-300 rounded text-sm appearance-none bg-white cursor-pointer"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>
  </div>
</template>
