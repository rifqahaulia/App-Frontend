<script setup lang="ts">
import { usePersonalStore } from '~/stores/pa/usePersonalStore'
import { usePaStore } from '~/stores/pa/usePaStore'
import { useReferenceStore } from '~/stores/pa/useReferenceStore'
import type { PaPersonal } from '~/types/pa'

useHead({
  title: 'Detail Personal - Administrasi Personal'
})

const route = useRoute()
const employeeId = route.query.id as string
const personalStore = usePersonalStore()
const paStore = usePaStore()
const refStore = useReferenceStore()

// State
const personalData = ref<PaPersonal | null>(null)
const persnum = ref<number | null>(null)
const isLoadingAll = ref(false)

// Module data lists
const addressList = ref<any[]>([])
const familyList = ref<any[]>([])
const educationList = ref<any[]>([])
const idList = ref<any[]>([])
const commList = ref<any[]>([])

// Tabs data from original UI
const tabs = [
  'Personal Info', 'Transaksi', 'Organisasi', 'Jabatan', 'Pendidikan', 
  'Pelatihan', 'Keluarga', 'Bank', 'Penghargaan', 'Hukuman', 
  'Identitas', 'Komunikasi', 'Golongan', 'Masa Kerja Efektif'
]

const activeTab = ref('Personal Info')
const isEditModalOpen = ref(false)
const isCreateAlamatModalOpen = ref(false)

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const openEditModal = () => {
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const loadAllData = async () => {
  if (!employeeId) return
  
  isLoadingAll.value = true
  try {
    // 1. Fetch Personal Data
    const personal = await personalStore.getPersonalById(employeeId)
    if (personal) {
      personalData.value = personal
      persnum.value = personal.persnum
      console.log('✅ Found personal data:', personal)
      
      // 2. Fetch All Other Modules in Parallel
      await Promise.all([
        paStore.fetchModuleData('pa/address', personal.persnum).then(d => {
           addressList.value = d
           console.log('✅ Found address data:', d)
        }),
        paStore.fetchModuleData('pa/family', personal.persnum).then(d => {
           familyList.value = d
           console.log('✅ Found family data:', d)
        }),
        paStore.fetchModuleData('pa-education', personal.persnum).then(d => {
          educationList.value = d
          console.log('✅ Found education data:', d)
        }),
        paStore.fetchModuleData('pa-personal-ids', personal.persnum).then(d => {
          idList.value = d
          console.log('✅ Found ID data:', d)
        }),
        paStore.fetchModuleData('pa/communication', personal.persnum).then(d => {
          commList.value = d
          console.log('✅ Found communication data:', d)
        }),
        refStore.fetchMultipleReferences([
          { field: 'gender', type: 'lookup' },
          { field: 'marital_status', type: 'lookup' },
          { field: 'religion', type: 'lookup' },
          { field: 'address', type: 'subtype' },
          { field: 'family', type: 'subtype' },
          { field: 'education', type: 'subtype' },
          { field: 'personal_ids', type: 'subtype' },
          { field: 'communication', type: 'subtype' }
        ])
      ])
    }
  } catch (error) {
    console.error('Failed to load employee data:', error)
  } finally {
    isLoadingAll.value = false
  }
}

// Helpers
const getLabel = (field: string, code?: string, type: 'lookup' | 'subtype' = 'lookup') => {
  if (!code) return '-'
  const cacheKey = `${type}-${field}`
  const refs = refStore.references[cacheKey] || []
  return refs.find((r: any) => r.value === code)?.label || code
}

const formatDate = (dateStr?: string | Date) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-')
}

const goBack = () => {
  navigateTo('/administrasi-personal')
}

const handleSuccess = (type: string) => {
  loadAllData()
  if (type === 'personal') closeEditModal()
  // Add other close logic for address etc if needed
}

onMounted(() => {
  loadAllData()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
    <LayoutTheNavbar />
    
    <div class="flex flex-1 overflow-hidden">
      <LayoutTheSidebar />
      
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="px-4 md:px-6 py-4 border-b bg-white flex-shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button 
                @click="goBack"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="lucide:arrow-left" class="w-5 h-5 text-gray-600" />
              </button>
              <h1 class="text-xl md:text-2xl font-bold text-gray-900">Personal Information - Detail</h1>
            </div>
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Personal Information</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Detail</span>
            </div>
          </div>
        </div>

        <!-- Loading Overlay -->
        <div v-if="isLoadingAll" class="flex-1 flex items-center justify-center bg-white z-50">
          <div class="text-center">
            <Icon name="lucide:loader-2" class="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p class="text-gray-500 font-medium">Memuat data personal...</p>
          </div>
        </div>

        <!-- Content Container - Scrollable area -->
        <div v-else-if="personalData" class="flex flex-1 overflow-hidden bg-white">
          <!-- Left Sidebar - Employee Info -->
          <div class="w-96 bg-white overflow-y-auto flex-shrink-0 border-r border-gray-100">
            <div class="p-4 pt-8">
              <!-- Employee Card Container -->
              <div class="bg-white rounded-3xl border border-gray-200 p-4 pb-8 mb-4 shadow-sm">
                <!-- Employee Header -->
                <div class="text-center mb-4 pb-4 border-b border-gray-200">
                  <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 uppercase">
                    {{ personalData.name?.substring(0, 2) || '??' }}
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-1">{{ personalData.name }}</h3>
                  <p class="text-sm text-gray-600">{{ personalData.title || 'Karyawan' }}</p>
                </div>

                <!-- Personal Info Mini Card -->
                <div class="border border-gray-300 rounded-3xl p-3 mb-3">
                  <div class="space-y-2">
                    <div class="flex justify-between items-center text-xs">
                      <span class="font-bold text-gray-900">NIK/e-NIK</span>
                      <span class="text-gray-900">{{ personalData.persnum }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                      <span class="font-bold text-gray-900">Tempat Lahir</span>
                      <span class="text-gray-900">{{ personalData.birthPlace }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                      <span class="font-bold text-gray-900">Tgl Lahir</span>
                      <span class="text-gray-900">{{ formatDate(personalData.birthDate) }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                      <span class="font-bold text-gray-900">Jenis Kelamin</span>
                      <span class="text-gray-900">{{ getLabel('gender', personalData.gender) }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                      <span class="font-bold text-gray-900">Agama</span>
                      <span class="text-gray-900">{{ getLabel('religion', personalData.religion) }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                      <span class="font-bold text-gray-900">Status Nikah</span>
                      <span class="text-gray-900">{{ getLabel('marital_status', personalData.maritalStatus) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Job Info Mini Card -->
                <div class="border border-gray-300 rounded-3xl p-3">
                  <div class="space-y-2 text-xs">
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-gray-900">Unit</span>
                      <span class="text-gray-900">Teknologi Informasi</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-gray-900">Lokasi</span>
                      <span class="text-gray-900">Kantor Pusat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content Area -->
          <div class="flex-1 overflow-y-auto bg-gray-50/30">
            <div class="p-6">
              <!-- Tabs Navigation -->
              <div class="bg-white rounded-t-2xl shadow-sm border border-gray-200/60 border-b-0 overflow-hidden mb-0">
                <div class="flex overflow-x-auto scrollbar-hide">
                  <button
                    v-for="tab in tabs"
                    :key="tab"
                    @click="setActiveTab(tab)"
                    :class="[
                      'px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                      activeTab === tab
                        ? 'text-blue-500 border-blue-500'
                        : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                    ]"
                  >
                    {{ tab }}
                  </button>
                </div>
              </div>

              <!-- Tab Content -->
              <div class="bg-white rounded-b-2xl shadow-sm border border-gray-200/60 border-t-0 overflow-hidden min-h-[500px]">
                
                <!-- Personal Info Tab -->
                <div v-if="activeTab === 'Personal Info'" class="p-6">
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-900">Informasi Personal</h3>
                    <button 
                      @click="openEditModal"
                      class="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Icon name="lucide:edit" class="w-3 h-3" />
                      Edit
                    </button>
                  </div>

                  <!-- Personal Info Grid -->
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1 text-xs uppercase">Nama Lengkap</label>
                        <p class="text-gray-900">{{ personalData.name }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1 text-xs uppercase">Gelar</label>
                        <p class="text-gray-900">{{ personalData.title || '-' }}</p>
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1 text-xs uppercase">Tempat Lahir</label>
                        <p class="text-gray-900">{{ personalData.birthPlace }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1 text-xs uppercase">Tanggal Lahir</label>
                        <p class="text-gray-900">{{ formatDate(personalData.birthDate) }}</p>
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1 text-xs uppercase">Agama</label>
                        <p class="text-gray-900">{{ getLabel('religion', personalData.religion) }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1 text-xs uppercase">Status Nikah</label>
                        <p class="text-gray-900">{{ getLabel('marital_status', personalData.maritalStatus) }}</p>
                      </div>
                    </div>
                    <div class="space-y-4">
                       <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1 text-xs uppercase">Masa Berlaku</label>
                        <p class="text-gray-900 font-mono text-sm">{{ formatDate(personalData.startDate) }} s/d {{ formatDate(personalData.endDate) }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Alamat Section (Included in Personal Info tab as per original UI) -->
                  <div class="border-t pt-6 mb-8">
                    <div class="flex items-center justify-between mb-4">
                      <h4 class="text-lg font-semibold text-gray-900">Alamat</h4>
                      <!-- Button to add address (optional) -->
                    </div>
                    <div v-if="addressList.length > 0" class="space-y-3">
                      <div 
                        v-for="addr in addressList" 
                        :key="addr.id"
                        class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h5 class="font-bold text-gray-900 text-sm">{{ getLabel('address', addr.subType, 'subtype') }}</h5>
                          <p class="text-gray-600 text-sm">{{ addr.address }} {{ addr.cityText }} {{ addr.regionText }}</p>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-6 text-gray-400 text-sm italic">
                      Tidak ada data alamat yang ditemukan.
                    </div>
                  </div>
                </div>

                <!-- Education Tab -->
                <div v-else-if="activeTab === 'Pendidikan'" class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-6">Riwayat Pendidikan</h3>
                  <div v-if="educationList.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="edu in educationList" :key="edu.id" class="p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                      <div class="flex items-start gap-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          <Icon name="lucide:graduation-cap" class="w-6 h-6" />
                        </div>
                        <div>
                          <h4 class="font-bold text-gray-900">{{ edu.institute }}</h4>
                          <p class="text-sm text-blue-600 font-medium">{{ getLabel('education', edu.subType, 'subtype') }} - {{ edu.branchStudyText || edu.branchStudy }}</p>
                          <p class="text-xs text-gray-500 mt-1">Lulus: {{ formatDate(edu.endDate) }} | Nilai: {{ edu.finalGrade }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center py-12">
                     <Icon name="lucide:graduation-cap" class="w-16 h-16 mx-auto mb-4 text-gray-200" />
                     <p class="text-gray-500">Belum ada riwayat pendidikan.</p>
                  </div>
                </div>

                 <!-- Family Tab -->
                 <div v-else-if="activeTab === 'Keluarga'" class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-6">Anggota Keluarga</h3>
                  <div v-if="familyList.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="fam in familyList" :key="fam.id" class="p-4 border border-gray-200 rounded-xl flex justify-between items-center">
                      <div class="flex items-center gap-3">
                         <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold uppercase">
                           {{ fam.name?.substring(0, 1) }}
                         </div>
                         <div>
                           <h4 class="font-bold text-gray-900">{{ fam.name }}</h4>
                           <p class="text-xs text-blue-600 font-bold uppercase tracking-wider">{{ getLabel('family', fam.subType, 'subtype') }}</p>
                         </div>
                      </div>
                      <div class="text-right">
                         <p class="text-xs text-gray-500">Lahir: {{ formatDate(fam.birthDate) }}</p>
                      </div>
                    </div>
                  </div>
                   <div v-else class="text-center py-12">
                     <Icon name="lucide:users" class="w-16 h-16 mx-auto mb-4 text-gray-200" />
                     <p class="text-gray-500">Belum ada data keluarga.</p>
                  </div>
                </div>

                <!-- Identitas Tab -->
                <div v-else-if="activeTab === 'Identitas'" class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-6">Dokumen Identitas</h3>
                  <div v-if="idList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="idItem in idList" :key="idItem.id" class="p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                       <h4 class="font-bold text-gray-900 mb-1">{{ getLabel('personal_ids', idItem.subType, 'subtype') }}</h4>
                       <p class="text-lg font-mono text-blue-600">{{ idItem.number }}</p>
                       <p class="text-xs text-gray-500 mt-2">Berlaku s/d: {{ formatDate(idItem.endDate) }}</p>
                    </div>
                  </div>
                  <div v-else class="text-center py-12">
                     <Icon name="lucide:id-card" class="w-16 h-16 mx-auto mb-4 text-gray-200" />
                     <p class="text-gray-500">Belum ada data identitas.</p>
                  </div>
                </div>

                <!-- Komunikasi Tab -->
                <div v-else-if="activeTab === 'Komunikasi'" class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-6">Informasi Komunikasi</h3>
                  <div v-if="commList.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="comm in commList" :key="comm.id" class="p-4 border border-gray-200 rounded-xl flex items-center gap-4">
                       <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                         <Icon :name="comm.subType?.includes('Email') ? 'lucide:mail' : 'lucide:phone'" class="w-6 h-6" />
                       </div>
                       <div>
                         <p class="text-xs font-bold text-gray-400 uppercase">{{ getLabel('communication', comm.subType, 'subtype') }}</p>
                         <p class="text-gray-900 font-bold">{{ comm.number }}</p>
                       </div>
                    </div>
                  </div>
                  <div v-else class="text-center py-12">
                     <Icon name="lucide:message-square" class="w-16 h-16 mx-auto mb-4 text-gray-200" />
                     <p class="text-gray-500">Belum ada data komunikasi.</p>
                  </div>
                </div>

                <!-- Other Tabs Placeholder -->
                <div v-else class="p-6">
                  <div class="text-center py-20">
                    <Icon name="lucide:construction" class="w-16 h-16 mx-auto mb-4 text-gray-200" />
                    <h3 class="text-lg font-semibold text-gray-600 mb-2">{{ activeTab }}</h3>
                    <p class="text-gray-400 italic">Konten untuk tab {{ activeTab }} belum tersedia di database atau sedang dalam pengembangan.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div v-else class="flex-1 flex items-center justify-center bg-white">
           <div class="text-center">
              <Icon name="lucide:alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p class="text-gray-900 font-bold">Karyawan tidak ditemukan</p>
              <button @click="goBack" class="mt-4 text-blue-500 hover:underline">Kembali ke Daftar</button>
           </div>
        </div>
      </main>
    </div>

    <!-- Edit Modal (Re-using original form style) -->
    <Teleport to="body">
      <div 
        v-if="isEditModalOpen"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
        @click="closeEditModal"
      >
        <div 
          class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {{ personalData?.name?.substring(0, 2) || '??' }}
              </div>
              <div>
                <h2 class="text-lg font-bold">Personal Information</h2>
                <p class="text-xs text-blue-100 opacity-80">Update data personal untuk {{ personalData?.name }}</p>
              </div>
            </div>
            <button @click="closeEditModal" class="p-2 hover:bg-blue-700 rounded-lg transition-colors">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6">
             <FormsPersonalInformationForm 
                :initial-data="personalData" 
                :is-edit="true" 
                @success="handleSuccess('personal')"
                @cancel="closeEditModal"
             />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
