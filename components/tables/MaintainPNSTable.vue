<script setup lang="ts">

interface MaintainPNS {
  nik: string
  nama: string
  tempatLahir: string
  tglLahir: string
  update: 'sudah' | 'belum'
}

interface Props {
  data?: MaintainPNS[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

const dummyData: MaintainPNS[] = [
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  },
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  },
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  },
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  },
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  },
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  },
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  },
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  },
  {
    nik: 'ASH835478',
    nama: 'WIJAYA HADI SUPROJO',
    tempatLahir: 'Tempat Lahir',
    tglLahir: '03.03.1996',
    update: 'sudah'
  }
]

const maintainPNSData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

const filteredData = computed(() => {
  if (!searchQuery.value) return maintainPNSData.value
  
  const query = searchQuery.value.toLowerCase()
  return maintainPNSData.value.filter(item => 
    item.nik.toLowerCase().includes(query) ||
    item.nama.toLowerCase().includes(query) ||
    item.tempatLahir.toLowerCase().includes(query) ||
    item.tglLahir.toLowerCase().includes(query)
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

// Functions
const handleView = (item: MaintainPNS) => {
  console.log('Viewing item:', item)
  // Add your view logic here
}

// Status styling
const getUpdateClass = (update: string) => {
  switch (update) {
    case 'sudah':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'belum':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getUpdateText = (update: string) => {
  switch (update) {
    case 'sudah':
      return 'Sudah'
    case 'belum':
      return 'Belum'
    default:
      return update
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Header with Search -->
    <div class="px-4 sm:px-6 py-4 bg-white rounded-t-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <div class="relative max-w-xs w-full sm:w-auto">
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
    <div class="overflow-x-auto">
      <div class="px-4 sm:px-6 pb-4">
        <table class="w-full min-w-[700px]">
          <thead class="bg-blue-100/60 rounded-t-xl">
            <tr>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                NIK
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NAMA
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                TEMPAT LAHIR
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                TGL LAHIR
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                UPDATE
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
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span class="hidden sm:inline">{{ item.tempatLahir }}</span>
                <span class="sm:hidden">{{ item.tempatLahir.length > 10 ? item.tempatLahir.substring(0, 10) + '...' : item.tempatLahir }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.tglLahir }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                <span 
                  :class="getUpdateClass(item.update)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                >
                  {{ getUpdateText(item.update) }}
                </span>
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