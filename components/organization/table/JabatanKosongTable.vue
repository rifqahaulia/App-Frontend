<script setup lang="ts">
// components/organization/table/JabatanKosongTable.vue

interface JabatanKosong {
  idJob: string
  titelatur: string
  description: string
  start: string
  validTo: string
}

interface Props {
  data?: JabatanKosong[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Options untuk items per page
const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

// DATA DUMMY sesuai mockup
const dummyData: JabatanKosong[] = [
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
  {
    idJob: '40010000',
    titelatur: '-',
    description: 'DIREKSI',
    start: '20 Januari 2024',
    validTo: '30 April 2024'
  },
]

// Use props data if available, otherwise use dummy data
const jabatanKosongData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Filter data based on search
const filteredData = computed(() => {
  if (!searchQuery.value) return jabatanKosongData.value
  
  const query = searchQuery.value.toLowerCase()
  return jabatanKosongData.value.filter(item => 
    item.idJob.toLowerCase().includes(query) ||
    item.titelatur.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.start.toLowerCase().includes(query) ||
    item.validTo.toLowerCase().includes(query)
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

    <!-- Table -->
    <div class="overflow-x-auto px-6 pb-4">
      <table class="w-full">
        <thead class="bg-blue-100/60 rounded-t-xl">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
              ID JOB
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
              TITELATUR
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
              DESCRIPTION
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
              START
            </th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide last:rounded-tr-xl">
              VALID TO
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr 
            v-for="(item, index) in paginatedData" 
            :key="index"
            class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
              {{ item.idJob }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
              {{ item.titelatur }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ item.description }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
              {{ item.start }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ item.validTo }}
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