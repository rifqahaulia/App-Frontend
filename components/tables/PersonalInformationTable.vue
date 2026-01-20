<script setup lang="ts">
interface PersonalInfo {
  employee: string
  persnum: string
  gender: string
  office: string
  action: string
  position?: string
}

interface Props {
  data?: PersonalInfo[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// DATA DUMMY berdasarkan mockup - sama persis dengan gambar
const dummyData: PersonalInfo[] = [
  {
    employee: 'Margareth Indrina',
    persnum: '1001010008',
    gender: 'Perempuan',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: 'Senior Manager'
  },
  {
    employee: 'Majid Siregar',
    persnum: '1001010008',
    gender: 'Laki-laki',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: 'Product Designer'
  },
  {
    employee: 'Majid Siregar',
    persnum: '1001010008',
    gender: 'Laki-laki',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: 'Product Designer'
  },
  {
    employee: 'Majid Siregar',
    persnum: '1001010008',
    gender: 'Laki-laki',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: 'Product Designer'
  },
  {
    employee: 'Majid Siregar',
    persnum: '1001010008',
    gender: 'Laki-laki',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: 'Product Designer'
  },
  {
    employee: 'Bagus Wicaksono',
    persnum: '1001010008',
    gender: 'Laki-laki',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: 'Product Designer'
  },
  {
    employee: 'Deviyana Aditya',
    persnum: '1001010008',
    gender: 'Laki-laki',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: 'Product Designer'
  },
  {
    employee: 'Basuki Abdullah',
    persnum: '1001010008',
    gender: 'Laki-laki',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: 'Product Designer'
  }
]

// Use props data if available, otherwise use dummy data
const personalInfoData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Filter data based on search
const filteredData = computed(() => {
  if (!searchQuery.value) return personalInfoData.value
  
  const query = searchQuery.value.toLowerCase()
  return personalInfoData.value.filter(item => 
    item.employee.toLowerCase().includes(query) ||
    item.persnum.toLowerCase().includes(query) ||
    item.gender.toLowerCase().includes(query) ||
    item.office.toLowerCase().includes(query)
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

// Generate initials for avatar fallback
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Generate random avatar color based on name
const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500'
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colors.length
  return colors[index]
}

// Navigation function
const navigateToDetail = async (persnum: string, employeeName: string) => {
  console.log('Navigating to detail for:', employeeName, 'ID:', persnum)
  try {
    await navigateTo(`/administrasi-personal/detail?id=${persnum}`)
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
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
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl align-middle">
              <div class="ml-4">EMPLOYEE</div>
            </th>
            <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wide">
              PERSNUM
            </th>
            <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wide">
              GENDER
            </th>
            <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wide">
              OFFICE
            </th>
            <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wide last:rounded-tr-xl">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr 
            v-for="(item, index) in paginatedData" 
            :key="index"
            class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors"
            style="position: relative;"
          >
            <td class="px-6 py-4 whitespace-nowrap align-middle">
              <div class="flex items-center gap-3 ml-4">
                <!-- Avatar dengan initials -->
                <div 
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0',
                    getAvatarColor(item.employee)
                  ]"
                >
                  {{ getInitials(item.employee) }}
                </div>
                <!-- Name and Position -->
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ item.employee }}</p>
                  <p class="text-xs text-gray-500">{{ item.position || 'Senior Manager' }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 font-medium">
              {{ item.persnum }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
              {{ item.gender }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
              {{ item.office }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex justify-center">
                <button
                  @click="navigateToDetail(item.persnum, item.employee)"
                  class="px-4 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-300 hover:border-blue-400 text-xs font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 flex items-center gap-1.5 cursor-pointer"
                >
                  {{ item.action }}
                  <Icon name="lucide:chevron-right" class="w-3 h-3" />
                </button>
              </div>
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