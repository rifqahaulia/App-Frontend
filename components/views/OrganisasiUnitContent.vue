<script setup lang="ts">
// components/views/OrganisasiUnitContent.vue

interface OrganisasiUnit {
  id: string
  name: string
  parent?: string
  children?: OrganisasiUnit[]
  isExpanded?: boolean
}

const selectedUnit = ref<OrganisasiUnit | null>(null)
const showStructure = ref(true)
const searchQuery = ref('')

// Dummy data untuk struktur organisasi
const organisasiData = ref<OrganisasiUnit[]>([
  {
    id: '1',
    name: 'PERUM LPPNPI',
    isExpanded: true,
    children: [
      {
        id: '2',
        name: 'DIREKTORAT UTAMA - 00',
        isExpanded: true,
        children: [
          {
            id: '3',
            name: 'DIREKTORAT KESELAMATAN, KEAMANAN, KEMANANAN - 00',
            isExpanded: false
          },
          {
            id: '4',
            name: 'DIREKTORAT TEKNIK - 00',
            isExpanded: false
          },
          {
            id: '5',
            name: 'DIREKTORAT KEUANGAN MANAJEMEN RISIKO - 00',
            isExpanded: true,
            children: [
              {
                id: '6',
                name: 'DIVISI AKUNTANSI DAN ASET - 00',
                isExpanded: false
              },
              {
                id: '7',
                name: 'DIVISI PERENCANAAN KEUANGAN - 00',
                isExpanded: false
              },
              {
                id: '8',
                name: 'DIVISI TEKNOLOGI INFORMASI - 00',
                isExpanded: false
              }
            ]
          }
        ]
      }
    ]
  }
])

// Detail data untuk unit yang dipilih
const unitDetail = ref({
  id: '1000999',
  titelatur: '00',
  description: 'PERENCANAAN, PENGEMBANGAN DAN EVALUASI TEKNOLOGI INFORMASI',
  start: '10 OKTOBER 2018',
  validTo: '5 JULI 2028'
})

const toggleExpand = (unit: OrganisasiUnit) => {
  unit.isExpanded = !unit.isExpanded
}

const selectUnit = (unit: OrganisasiUnit) => {
  selectedUnit.value = unit
}

const toggleStructure = () => {
  showStructure.value = !showStructure.value
}

// Filter function for search
const filterUnits = (units: OrganisasiUnit[], query: string): OrganisasiUnit[] => {
  if (!query) return units
  
  const filtered: OrganisasiUnit[] = []
  
  for (const unit of units) {
    const matchesQuery = unit.name.toLowerCase().includes(query.toLowerCase())
    const filteredChildren = unit.children ? filterUnits(unit.children, query) : []
    
    if (matchesQuery || filteredChildren.length > 0) {
      filtered.push({
        ...unit,
        children: filteredChildren,
        isExpanded: query ? true : unit.isExpanded // Auto expand when searching
      })
    }
  }
  
  return filtered
}

// Computed property for filtered data
const filteredOrganisasiData = computed(() => {
  return filterUnits(organisasiData.value, searchQuery.value)
})

// Set default selected unit
onMounted(() => {
  selectedUnit.value = organisasiData.value[0]?.children?.[0]?.children?.[2] || null
})
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Struktur Section -->
    <div class="mb-6">
      <!-- Struktur Header - Always visible -->
      <div class="bg-blue-500 text-white px-4 py-3 rounded-t-lg">
        <button 
          @click="toggleStructure"
          class="flex items-center gap-2 text-sm font-medium w-full text-left"
        >
          <Icon 
            name="lucide:chevron-down" 
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': !showStructure }"
          />
          Struktur
        </button>
      </div>
      
      <!-- Struktur Content -->
      <div 
        v-if="showStructure" 
        class="bg-white border border-t-0 border-gray-200 rounded-b-lg"
      >
        <!-- Search Box -->
        <div class="p-4 border-b border-gray-200">
          <div class="relative">
            <Icon 
              name="lucide:search" 
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Tree Structure -->
        <div class="p-4 bg-gray-100">
          <OrganisasiUnitTree 
            :data="filteredOrganisasiData" 
            :selected="selectedUnit"
            @select="selectUnit"
            @toggle="toggleExpand"
          />
        </div>
      </div>
    </div>

    <!-- Detail Section -->
    <div v-if="selectedUnit" class="flex-1">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        Detail Organisasi Unit - {{ selectedUnit.name }}
      </h2>
      
      <!-- Tab Navigation -->
      <div class="flex gap-6 mb-6">
        <div class="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <Icon name="lucide:info" class="w-4 h-4 text-blue-600" />
          <span class="text-sm font-medium text-blue-700">Detail Organization</span>
          <span class="text-xs text-blue-600">Organization Information</span>
        </div>
        
        <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <Icon name="lucide:users" class="w-4 h-4 text-gray-600" />
          <span class="text-sm font-medium text-gray-700">Organization Child</span>
          <span class="text-xs text-gray-600">Organization Child Information</span>
        </div>
        
        <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <Icon name="lucide:map-pin" class="w-4 h-4 text-gray-600" />
          <span class="text-sm font-medium text-gray-700">Position</span>
          <span class="text-xs text-gray-600">Position Information</span>
        </div>
      </div>

      <!-- Detail Organization Form -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Detail Organization</h3>
          <button class="flex items-center gap-2 px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg text-sm hover:bg-blue-50 transition-colors">
            <Icon name="lucide:edit-2" class="w-4 h-4" />
            Edit
          </button>
        </div>

        <div class="space-y-4">
          <!-- ID -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ID</label>
            <input 
              type="text" 
              :value="unitDetail.id"
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
            />
          </div>

          <!-- Titelatur -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titelatur</label>
            <input 
              type="text" 
              :value="unitDetail.titelatur"
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              :value="unitDetail.description"
              readonly
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm resize-none"
            ></textarea>
          </div>

          <!-- Date Range -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start</label>
              <div class="relative">
                <input 
                  type="text" 
                  :value="unitDetail.start"
                  readonly
                  class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
                />
                <Icon name="lucide:calendar" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Valid to</label>
              <div class="relative">
                <input 
                  type="text" 
                  :value="unitDetail.validTo"
                  readonly
                  class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
                />
                <Icon name="lucide:calendar" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>