<script setup lang="ts">
    // components/organization/JobKatalogTable.vue
    
    interface JobKatalog {
      idJob: string
      titelatur: string
      description: string
      start: string
      validTo: string
    }
    
    interface Props {
      data?: JobKatalog[]
    }
    
    const props = withDefaults(defineProps<Props>(), {
      data: () => []
    })
    
    const searchQuery = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 10
    
    // ✅ DATA DUMMY - akan dipakai kalau props.data kosong
    const dummyData: JobKatalog[] = [
      {
        idJob: '40010000',
        titelatur: '-',
        description: 'DIREKSI',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010001',
        titelatur: 'Direktur Utama',
        description: 'DIREKSI',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010002',
        titelatur: 'Direktur Keuangan',
        description: 'DIREKSI',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010003',
        titelatur: 'Direktur Operasional',
        description: 'DIREKSI',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010004',
        titelatur: 'Manager HRD',
        description: 'MANAJEMEN',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010005',
        titelatur: 'Manager Teknik',
        description: 'MANAJEMEN',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010006',
        titelatur: 'Supervisor',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010007',
        titelatur: 'Staff Admin',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010008',
        titelatur: 'Staff Keuangan',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010009',
        titelatur: 'Staff IT',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010010',
        titelatur: '-',
        description: 'DIREKSI',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010011',
        titelatur: 'Koordinator Lapangan',
        description: 'KOORDINATOR',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010012',
        titelatur: 'Analis Data',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010013',
        titelatur: 'Quality Control',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010014',
        titelatur: 'Project Manager',
        description: 'MANAJEMEN',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010015',
        titelatur: 'Business Analyst',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010016',
        titelatur: 'Legal Officer',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010017',
        titelatur: 'Public Relations',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010018',
        titelatur: 'Security Manager',
        description: 'MANAJEMEN',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
      {
        idJob: '40010019',
        titelatur: 'Purchasing Officer',
        description: 'STAFF',
        start: '20 Januari 2024',
        validTo: '30 April 2024'
      },
    ]
    
    // Use props data if available, otherwise use dummy data
    const jobKatalogData = computed(() => 
      props.data && props.data.length > 0 ? props.data : dummyData
    )
    
    // Filter data based on search
    const filteredData = computed(() => {
      if (!searchQuery.value) return jobKatalogData.value
      
      const query = searchQuery.value.toLowerCase()
      return jobKatalogData.value.filter(item => 
        item.idJob.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.titelatur.toLowerCase().includes(query)
      )
    })
    
    // Pagination
    const totalPages = computed(() => 
      Math.ceil(filteredData.value.length / itemsPerPage)
    )
    
    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
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
    </script>
    
    <template>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <!-- Search Bar -->
        <div class="p-4 border-b border-gray-200">
          <div class="relative max-w-xs">
            <Icon 
              name="lucide:search" 
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
    
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-blue-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID JOB
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  TITELATUR
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  DESCRIPTION
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  START
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  VALID TO
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="(item, index) in paginatedData" 
                :key="index"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.idJob }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.titelatur }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.start }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.validTo }}
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-if="paginatedData.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                  <Icon name="lucide:inbox" class="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p class="text-sm">Tidak ada data yang ditemukan</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    
        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-600">
            Menampilkan {{ paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0 }} - 
            {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} 
            dari {{ filteredData.length }} data
          </div>
          
          <div class="flex items-center gap-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <template v-if="totalPages <= 7">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 border rounded text-sm transition-colors',
                  currentPage === page 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </template>
            
            <template v-else>
              <button
                @click="goToPage(1)"
                :class="[
                  'px-3 py-1 border rounded text-sm transition-colors',
                  currentPage === 1 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'border-gray-300 hover:bg-gray-50'
                ]"
              >
                1
              </button>
              
              <span v-if="currentPage > 3" class="px-2">...</span>
              
              <template v-for="page in totalPages" :key="page">
                <button
                  v-if="page > 1 && page < totalPages && Math.abs(page - currentPage) <= 1"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-1 border rounded text-sm transition-colors',
                    currentPage === page 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </template>
              
              <span v-if="currentPage < totalPages - 2" class="px-2">...</span>
              
              <button
                @click="goToPage(totalPages)"
                :class="[
                  'px-3 py-1 border rounded text-sm transition-colors',
                  currentPage === totalPages 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ totalPages }}
              </button>
            </template>
            
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </template>