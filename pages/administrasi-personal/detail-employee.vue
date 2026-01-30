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
const isLoadingAll = ref(false)

// Module data lists
const addressList = ref<any[]>([])
const familyList = ref<any[]>([])
const educationList = ref<any[]>([])
const idList = ref<any[]>([])
const commList = ref<any[]>([])
const objectLoanList = ref<any[]>([])
const externalOrgList = ref<any[]>([])
const instructionList = ref<any[]>([])
const taxDataList = ref<any[]>([])
const previousEmployerList = ref<any[]>([])

// Tabs
const tabs = [
  'Personal Info', 'Transaksi', 'Organisasi', 'Jabatan', 'Pendidikan', 
  'Pelatihan', 'Keluarga', 'Bank', 'Penghargaan', 'Hukuman', 
  'Identitas', 'Komunikasi', 'Golongan', 'Masa Kerja Efektif'
]
const activeTab = ref('Personal Info')
const isEditModalOpen = ref(false)
const isCommModalOpen = ref(false)
const isFamilyModalOpen = ref(false)
const isEducationModalOpen = ref(false)
const editingComm = ref<any>(null)
const editingFamily = ref<any>(null)
const editingEducation = ref<any>(null)

// Education Search & Pagination
const eduSearchQuery = ref('')
const eduItemsPerPage = ref(10)
const eduCurrentPage = ref(1)

const openCommModal = (comm?: any) => {
  editingComm.value = comm || null
  isCommModalOpen.value = true
}

// Computed for dynamic data extraction
const primaryPhone = computed(() => commList.value.find(c => c.subType === '0002')?.number || '-')
const officeEmail = computed(() => commList.value.find(c => c.subType === '0006')?.number || '-')
const akteNumber = computed(() => idList.value.find(i => i.subType === '01')?.number || '-')
const npwpNumber = computed(() => idList.value.find(i => i.subType === '05')?.number || '-')
const bpjsKetNumber = computed(() => idList.value.find(i => i.subType === '06')?.number || '-') // Assuming 06 for BPJS Ket
const bpjsKesNumber = computed(() => idList.value.find(i => i.subType === '07')?.number || '-') // Assuming 07 for BPJS Kes

// Education Computed
const filteredEducationList = computed(() => {
  let list = educationList.value
  if (eduSearchQuery.value) {
    const q = eduSearchQuery.value.toLowerCase()
    list = list.filter(edu => 
      (edu.institute?.toLowerCase().includes(q)) || 
      (edu.branchStudy?.toLowerCase().includes(q)) ||
      (edu.certificateNumber?.toLowerCase().includes(q)) ||
      (getLabel('pa_education', edu.subType, 'subtype').toLowerCase().includes(q))
    )
  }
  return list
})

const totalEduPages = computed(() => Math.ceil(filteredEducationList.value.length / eduItemsPerPage.value) || 1)
const paginatedEducation = computed(() => {
  const start = (eduCurrentPage.value - 1) * eduItemsPerPage.value
  const end = start + eduItemsPerPage.value
  return filteredEducationList.value.slice(start, end)
})

const openFamilyModal = (fam?: any) => {
  editingFamily.value = fam || null
  isFamilyModalOpen.value = true
}

const openEducationModal = (edu?: any) => {
  editingEducation.value = edu || null
  isEducationModalOpen.value = true
}

const deleteEducation = async (id: number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus data pendidikan ini?')) return
  try {
    await paStore.deleteModuleData('pa-education', id)
    educationList.value = educationList.value.filter(e => e.id !== id)
  } catch (error) {
    console.error('Failed to delete education:', error)
  }
}

const loadAllData = async () => {
  if (!employeeId) return
  isLoadingAll.value = true
  try {
    const personal = await personalStore.getPersonalById(employeeId)
    if (personal) {
      personalData.value = personal
      await Promise.all([
        paStore.fetchModuleData('pa/address', personal.persnum).then(d => addressList.value = d),
        paStore.fetchModuleData('pa/family', personal.persnum).then(d => familyList.value = d),
        paStore.fetchModuleData('pa-education', personal.persnum).then(d => educationList.value = d),
        paStore.fetchModuleData('pa-personal-ids', personal.persnum).then(d => idList.value = d),
        paStore.fetchModuleData('pa/communication', personal.persnum).then(d => commList.value = d),
        paStore.fetchModuleData('pa-object-loan', personal.persnum).then(d => objectLoanList.value = d),
        paStore.fetchModuleData('pa/external-organization', personal.persnum).then(d => externalOrgList.value = d),
        paStore.fetchModuleData('pa/company-instruction', personal.persnum).then(d => instructionList.value = d),
        paStore.fetchModuleData('pa-previous-employer', personal.persnum).then(d => previousEmployerList.value = d),
        paStore.fetchModuleData('pa-tax-data', personal.persnum).then(d => taxDataList.value = d),
        refStore.fetchMultipleReferences([
          { field: 'gender', type: 'lookup' },
          { field: 'marital_status', type: 'lookup' },
          { field: 'religion', type: 'lookup' },
          { field: 'address', type: 'subtype' },
          { field: 'pa_family_member', type: 'subtype' },
          { field: 'pa_education', type: 'subtype' },
          { field: 'branch_study', type: 'branch' },
          { field: 'blood_type', type: 'lookup' },
          { field: 'status', type: 'lookup' },
          { field: 'personal_ids', type: 'subtype' },
          { field: 'communication', type: 'subtype' },
          { field: 'object_loan', type: 'subtype' },
          { field: 'external_organization', type: 'subtype' },
          { field: 'company_instruction', type: 'subtype' },
          { field: 'industry', type: 'lookup' },
          { field: 'work_contract', type: 'lookup' },
          { field: 'job', type: 'lookup' }
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
const getLabel = (field: string, code?: string, type: 'lookup' | 'subtype' | 'branch' = 'lookup') => {
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
    month: 'short',
    year: 'numeric'
  }).replace(/\./g, ' ')
}

const formatDotDate = (dateStr?: string | Date) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`
}

const getTingkatan = (subType: string) => {
  const map: any = {
    '08': 'Sarjana',
    '03': 'SMA',
    '02': 'SMP',
    '01': 'SD',
    '09': 'Pascasarjana (S2)',
    '10': 'Doktor (S3)',
    '99': 'Pelatihan'
  }
  return map[subType] || getLabel('pa_education', subType, 'subtype')
}

const getCommIcon = (subType: string) => {
  const icons: Record<string, string> = {
    '0001': 'lucide:user-cog',    // System user name
    '0002': 'lucide:smartphone',  // Mobile
    '0003': 'lucide:phone',       // Home
    '0004': 'lucide:phone-forwarded', // Office
    '0005': 'lucide:mail',        // Private Email
    '0006': 'lucide:mail-plus',   // Office Email
    '0007': 'lucide:facebook',    // Facebook
    '0008': 'lucide:twitter',     // Twitter
    '0009': 'lucide:instagram'    // Instagram
  }
  return icons[subType] || 'lucide:message-square'
}

const calculateAge = (birthDate: string | Date) => {
  if (!birthDate) return '-'
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

const getCommColor = (subType: string) => {
  const colors: Record<string, string> = {
    '0001': 'bg-slate-100 text-slate-600',
    '0002': 'bg-emerald-100 text-emerald-600',
    '0003': 'bg-blue-100 text-blue-600',
    '0004': 'bg-indigo-100 text-indigo-600',
    '0005': 'bg-rose-100 text-rose-600',
    '0006': 'bg-amber-100 text-amber-600',
    '0007': 'bg-blue-50 text-[#1877F2]',
    '0008': 'bg-sky-50 text-[#1DA1F2]',
    '0009': 'bg-pink-50 text-[#E4405F]'
  }
  return colors[subType] || 'bg-gray-100 text-gray-600'
}

onMounted(() => {
  loadAllData()
})
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FA] flex flex-col overflow-hidden font-sans">
    <LayoutTheNavbar />
    
    <div class="flex flex-1 overflow-hidden">
      <LayoutTheSidebar />
      
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Header (Identical to Screenshot) -->
        <div class="px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100">
          <h1 class="text-xl font-bold text-[#334155]">Personal Information</h1>
          <div class="text-xs text-gray-400">
            <span>Personal Information</span>
            <span class="mx-1">></span>
            <span class="text-gray-900 font-semibold">Detail</span>
          </div>
        </div>

        <div v-if="isLoadingAll" class="flex-1 flex items-center justify-center bg-white">
          <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-blue-500" />
        </div>

        <div v-else-if="personalData" class="flex flex-1 overflow-hidden p-6 gap-6">
          <!-- Sidebar Left (Profile Card + Info Cards) -->
          <div class="w-[300px] flex-shrink-0 flex flex-col gap-4 overflow-y-auto pr-2">
            <!-- Profile Header -->
            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                <Icon name="lucide:user" class="w-full h-full p-2 text-gray-400" />
              </div>
              <div>
                <h2 class="font-bold text-[#1E293B] text-lg leading-tight">{{ personalData.name }}</h2>
                <p class="text-sm text-gray-500">{{ personalData.title || '-' }}</p>
              </div>
            </div>

            <!-- Mini Card 1 -->
            <div class="bg-white border border-gray-200 rounded-xl p-4 space-y-2.5 shadow-sm">
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Gelar</span>
                <span class="text-[#1E293B] font-bold text-right">{{ personalData.title || '-' }}</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">NIK/e-NIK</span>
                <span class="text-[#1E293B] font-bold">{{ personalData.persnum }} / {{ personalData.persnum }}</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Tempat/Tgl Lahir</span>
                <span class="text-[#1E293B] font-bold text-right">{{ personalData.birthPlace }}, {{ formatDate(personalData.birthDate) }}</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Jenis Kelamin</span>
                <span class="text-[#1E293B] font-bold">{{ getLabel('gender', personalData.gender) }}</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Agama</span>
                <span class="text-[#1E293B] font-bold">{{ getLabel('religion', personalData.religion) }}</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Negara</span>
                <span class="text-[#1E293B] font-bold font-semibold">{{ personalData.country || 'Indonesia' }}</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Status/Tgl. Status</span>
                <span class="text-[#1E293B] font-bold">{{ getLabel('marital_status', personalData.maritalStatus) }} / {{ formatDate(personalData.maritalDate) }}</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">No. HP</span>
                <span class="text-[#1E293B] font-bold">{{ primaryPhone }}</span>
              </div>
            </div>

            <!-- Mini Card 2 -->
            <div class="bg-white border border-gray-200 rounded-xl p-4 space-y-2.5 shadow-sm">
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Status</span>
                <span class="text-[#1E293B] font-bold">-</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Unit</span>
                <span class="text-[#1E293B] font-bold text-right font-semibold">-</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Lokasi</span>
                <span class="text-[#1E293B] font-bold">-</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Office Email</span>
                <span class="text-[#1E293B] font-bold text-right break-all ml-4">{{ officeEmail }}</span>
              </div>
            </div>
          </div>

          <!-- Main Content Right -->
          <div class="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden shadow-sm">
            <!-- Tabs Navigation -->
            <div class="border-b border-gray-100 px-4">
              <div class="flex overflow-x-auto no-scrollbar gap-1">
                <button 
                  v-for="tab in tabs" 
                  :key="tab"
                  @click="activeTab = tab"
                  :class="[
                    'px-4 py-4 text-[11px] font-bold whitespace-nowrap border-b-2 transition-all',
                    activeTab === tab ? 'text-[#3B82F6] border-[#3B82F6]' : 'text-gray-400 border-transparent hover:text-gray-600'
                  ]"
                >
                  {{ tab }}
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <div class="flex-1 overflow-y-auto p-8">
              <!-- Personal Info Tab -->
              <div v-if="activeTab === 'Personal Info'">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-lg font-bold text-[#1E293B]">Informasi Personal</h3>
                  <button @click="isEditModalOpen = true" class="px-4 py-1.5 border border-[#3B82F6] text-[#3B82F6] rounded-md text-[11px] font-bold flex items-center gap-1.5 hover:bg-blue-50 transition-colors">
                    <Icon name="lucide:edit" class="w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>

                <!-- Grid Data 4 Columns (Matching Screenshot) -->
                <div class="grid grid-cols-4 gap-y-6 mb-12">
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Nama</label>
                    <p class="text-[11px] text-[#475569]">{{ personalData.name }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Negara</label>
                    <p class="text-[11px] text-[#475569]">{{ personalData.country || 'Indonesia' }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">NIK / e-NIK</label>
                    <p class="text-[11px] text-[#475569]">{{ personalData.persnum }} / {{ personalData.persnum }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Unit</label>
                    <p class="text-[11px] text-[#475569]">-</p>
                  </div>

                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Gelar</label>
                    <p class="text-[11px] text-[#475569]">{{ personalData.title || '-' }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Agama</label>
                    <p class="text-[11px] text-[#475569]">{{ getLabel('religion', personalData.religion) }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">NIK Instansi Asal</label>
                    <p class="text-[11px] text-[#475569]">-</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Lokasi</label>
                    <p class="text-[11px] text-[#475569]">-</p>
                  </div>

                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Tempat / Tanggal Lahir</label>
                    <p class="text-[11px] text-[#475569]">{{ personalData.birthPlace }} / {{ formatDate(personalData.birthDate) }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Status/Tgl. Status</label>
                    <p class="text-[11px] text-[#475569]">{{ getLabel('marital_status', personalData.maritalStatus) }} / {{ formatDate(personalData.maritalDate) }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Office Email</label>
                    <p class="text-[11px] text-[#475569]">{{ officeEmail }}</p>
                  </div>

                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Jenis Kelamin</label>
                    <p class="text-[11px] text-[#475569]">{{ getLabel('gender', personalData.gender) }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">No. Handphone</label>
                    <p class="text-[11px] text-[#475569]">{{ primaryPhone }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Jabatan</label>
                    <p class="text-[11px] text-[#475569]">{{ personalData.title || '-' }}</p>
                  </div>
                </div>

                <!-- Jabatan Section (Matching Screenshot) -->
                <h3 class="text-sm font-bold text-[#1E293B] mb-4">Jabatan</h3>
                <div class="grid grid-cols-4 gap-y-6 mb-12">
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Status</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">-</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Lokasi Kerja</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">-</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">TMT Jabatan</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">-</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Job Center</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold uppercase font-bold tracking-tight">-</p>
                  </div>

                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Jabatan</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">{{ personalData.title || '-' }}</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Lokasi kedudukan</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">-</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">TMT kedudukan</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">-</p>
                  </div>

                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Unit</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold font-bold">-</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Lokasi Induk</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold font-bold">-</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Cost Center</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold uppercase font-bold tracking-tight">-</p>
                  </div>
                </div>

                <!-- Alamat Section (Matching Screenshot 2) -->
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-sm font-bold text-[#1E293B]">Alamat</h3>
                  <button class="px-4 py-1.5 border border-[#3B82F6] text-[#3B82F6] rounded-md text-[11px] font-bold flex items-center gap-1.5 hover:bg-blue-50 transition-colors">
                    <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                    Create
                  </button>
                </div>
                
                <div class="space-y-4 mb-12">
                  <div v-for="addr in addressList" :key="addr.id" class="p-4 border border-gray-100 rounded-xl flex justify-between items-center hover:bg-gray-50 transition-colors shadow-sm">
                    <div>
                      <h4 class="text-[12px] font-bold text-[#1E293B] mb-1">{{ getLabel('address', addr.subType, 'subtype') }}</h4>
                      <p class="text-[11px] text-gray-400">{{ addr.street || addr.address }}, {{ addr.kelurahan }}, {{ addr.kecamatan }}, {{ addr.cityText || addr.city }}</p>
                    </div>
                    <button class="p-1.5 hover:bg-gray-100 rounded border border-gray-200 text-gray-400">
                      <Icon name="lucide:edit-3" class="w-4 h-4" />
                    </button>
                  </div>
                  <div v-if="addressList.length === 0" class="text-xs text-gray-400 italic text-center py-6 border border-dashed border-gray-200 rounded-xl">
                    Data alamat belum tersedia.
                  </div>
                </div>

                <!-- Dokumen Section (Matching Screenshot 2) -->
                <h3 class="text-lg font-bold text-[#1E293B] mb-6">Dokumen</h3>
                <div class="grid grid-cols-4 gap-6">
                  <!-- Case: Akte Kelahiran -->
                  <div class="border border-gray-200 rounded-xl p-5 text-center flex flex-col items-center shadow-sm">
                    <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="lucide:file-text" class="w-7 h-7 text-yellow-500" />
                    </div>
                    <h4 class="text-[12px] font-bold text-[#1E293B] mb-1">Akte Kelahiran</h4>
                    <p class="text-[11px] text-gray-400 mb-4">{{ akteNumber }}</p>
                    <button class="text-[#3B82F6] text-[11px] font-bold hover:underline">Download File</button>
                  </div>
                  <!-- Case: NPWP -->
                  <div class="border border-gray-200 rounded-xl p-5 text-center flex flex-col items-center shadow-sm">
                    <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="lucide:file-text" class="w-7 h-7 text-yellow-500" />
                    </div>
                    <h4 class="text-[12px] font-bold text-[#1E293B] mb-1">NPWP</h4>
                    <p class="text-[11px] text-gray-400 mb-4">{{ npwpNumber }}</p>
                    <button class="text-[#3B82F6] text-[11px] font-bold hover:underline">Download File</button>
                  </div>
                  <!-- Case: BPJS Ketenagakerjaan -->
                  <div class="border border-gray-200 rounded-xl p-5 text-center flex flex-col items-center shadow-sm">
                    <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="lucide:file-text" class="w-7 h-7 text-yellow-500" />
                    </div>
                    <h4 class="text-[12px] font-bold text-[#1E293B] mb-1">BPJS Ketenagakerjaan</h4>
                    <p class="text-[11px] text-gray-400 mb-4">{{ bpjsKetNumber }}</p>
                    <button class="text-[#3B82F6] text-[11px] font-bold hover:underline">Download File</button>
                  </div>
                  <!-- Case: BPJS Kesehatan -->
                  <div class="border border-gray-200 rounded-xl p-5 text-center flex flex-col items-center shadow-sm">
                    <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="lucide:file-text" class="w-7 h-7 text-yellow-500" />
                    </div>
                    <h4 class="text-[12px] font-bold text-[#1E293B] mb-1">BPJS Kesehatan</h4>
                    <p class="text-[11px] text-gray-400 mb-4">{{ bpjsKesNumber }}</p>
                    <button class="text-[#3B82F6] text-[11px] font-bold hover:underline">Download File</button>
                  </div>
                </div>
              </div>

              <!-- Other Tabs Integration -->
              <div v-else-if="activeTab === 'Transaksi'" class="space-y-6">
                <h3 class="text-lg font-bold text-[#1E293B]">Pinjaman Barang</h3>
                <div v-if="objectLoanList.length > 0" class="overflow-x-auto">
                    <table class="w-full text-left text-[11px]">
                        <thead class="bg-gray-50 text-gray-500 font-bold uppercase">
                            <tr>
                                <th class="px-4 py-3 border-b">Tipe</th>
                                <th class="px-4 py-3 border-b">No. Barang</th>
                                <th class="px-4 py-3 border-b">Unit/Tanda</th>
                                <th class="px-4 py-3 border-b">Catatan</th>
                                <th class="px-4 py-3 border-b">Periode</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="loan in objectLoanList" :key="loan.id" class="hover:bg-gray-50">
                                <td class="px-4 py-3 font-bold">{{ getLabel('object_loan', loan.subType, 'subtype') }}</td>
                                <td class="px-4 py-3">{{ loan.objectNumber || '-' }}</td>
                                <td class="px-4 py-3">{{ loan.unit || '-' }}</td>
                                <td class="px-4 py-3">{{ loan.notes || '-' }}</td>
                                <td class="px-4 py-3">{{ formatDate(loan.startDate) }} - {{ formatDate(loan.endDate) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="text-center py-20 text-gray-400 italic">Data pinjaman belum tersedia.</div>
              </div>

              <div v-else-if="activeTab === 'Jabatan'" class="space-y-8">
                 <div>
                    <h3 class="text-lg font-bold text-[#1E293B] mb-6">Jabatan Saat Ini</h3>
                    <div class="grid grid-cols-2 gap-8">
                       <div class="space-y-4">
                          <div class="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                             <label class="block text-[10px] font-bold text-blue-400 uppercase mb-1">Jabatan Utama</label>
                             <p class="text-sm font-bold text-[#1E293B]">{{ personalData.title || '-' }}</p>
                          </div>
                          <div class="p-4 bg-gray-50 rounded-xl">
                             <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Unit Kerja</label>
                             <p class="text-sm font-bold text-[#1E293B]">Teknologi Informasi</p>
                          </div>
                       </div>
                       <div class="space-y-4">
                          <div class="p-4 bg-gray-50 rounded-xl">
                             <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Status Karyawan</label>
                             <p class="text-sm font-bold text-[#1E293B]">Tetap / Full-Time</p>
                          </div>
                          <div class="p-4 bg-gray-50 rounded-xl">
                             <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Lokasi Kantor</label>
                             <p class="text-sm font-bold text-[#1E293B]">Kantor Pusat - Jakarta</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div class="border-t pt-8">
                    <h3 class="text-lg font-bold text-[#1E293B] mb-6">Riwayat Jabatan / Pengalaman Kerja</h3>
                    <div v-if="previousEmployerList.length > 0" class="space-y-4">
                       <div v-for="exp in previousEmployerList" :key="exp.id" class="p-5 border border-gray-100 rounded-2xl flex items-start gap-5 hover:bg-gray-50 transition-colors shadow-sm">
                          <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                             <Icon name="lucide:briefcase" class="w-6 h-6" />
                          </div>
                          <div class="flex-1 min-w-0">
                             <div class="flex justify-between items-start mb-1">
                                <h4 class="font-bold text-[#1E293B]">{{ exp.position || exp.employer }}</h4>
                                <span class="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{{ getLabel('work_contract', exp.workContract) }}</span>
                             </div>
                             <p class="text-xs font-bold text-indigo-600 mb-2">{{ exp.employer }} ({{ exp.city || 'Internal' }})</p>
                             <div class="grid grid-cols-3 gap-4 text-[10px]">
                                <div><span class="text-gray-400">Industri:</span> {{ getLabel('industry', exp.industry) }}</div>
                                <div><span class="text-gray-400">Job Type:</span> {{ getLabel('job', exp.job) }}</div>
                                <div><span class="text-gray-400">Periode:</span> {{ formatDate(exp.startDate) }} - {{ formatDate(exp.endDate) }}</div>
                             </div>
                             <div v-if="exp.certificateNumber" class="mt-3 pt-3 border-t border-dashed border-gray-200 flex items-center gap-2 text-[10px] text-gray-500">
                                <Icon name="lucide:award" class="w-3.5 h-3.5" />
                                <span>Cert: {{ exp.certificateNumber }} ({{ formatDate(exp.certificateDate) }})</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div v-else class="text-center py-12 text-gray-400 italic">
                       <Icon name="lucide:history" class="w-12 h-12 mx-auto mb-3 opacity-20" />
                       <p>Belum ada riwayat jabatan atau pengalaman kerja luar.</p>
                    </div>
                 </div>
              </div>

              <div v-else-if="activeTab === 'Pendidikan'" class="space-y-4">
                <!-- Toolbar -->
                <div class="flex justify-between items-center mb-2">
                  <div class="relative">
                    <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      v-model="eduSearchQuery"
                      type="text" 
                      placeholder="Search..." 
                      class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 text-xs outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <button @click="openEducationModal()" class="px-4 py-2 border border-[#3B82F6] text-[#3B82F6] rounded-md text-xs font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors">
                    <Icon name="lucide:plus" class="w-4 h-4" />
                    Create
                  </button>
                </div>

                <!-- Table Container -->
                <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="bg-[#E0F2FE]">
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">Tingkatan</th>
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">Sekolah</th>
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">Jurusan</th>
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">No Ijazah</th>
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">Tgl. Ijazah</th>
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider text-center">Ijazah</th>
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider text-center">Nilai</th>
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">Status</th>
                        <th class="px-4 py-3 text-[11px] font-bold text-[#1E293B] uppercase tracking-wider text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                      <tr v-for="edu in paginatedEducation" :key="edu.id" class="hover:bg-gray-50/50 transition-colors">
                        <td class="px-4 py-4 text-xs font-medium text-gray-700">{{ getTingkatan(edu.subType) }}</td>
                        <td class="px-4 py-4 text-xs font-medium text-gray-700">{{ edu.subType === '99' ? edu.trainingName : edu.institute }}</td>
                        <td class="px-4 py-4 text-xs font-medium text-gray-700">{{ edu.subType === '99' ? '-' : getLabel('branch_study', edu.branchStudy, 'branch') }}</td>
                        <td class="px-4 py-4 text-xs font-medium text-gray-700 font-mono">{{ edu.certificateNumber || '-' }}</td>
                        <td class="px-4 py-4 text-xs font-medium text-gray-700">{{ formatDotDate(edu.certificateDate) }}</td>
                        <td class="px-4 py-4 text-center">
                          <button v-if="edu.certificateFileName" class="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1">
                            <Icon name="lucide:file-text" class="w-4 h-4" />
                            <span class="text-[10px] font-bold">Download</span>
                          </button>
                          <span v-else class="text-gray-300">-</span>
                        </td>
                        <td class="px-4 py-4 text-center">
                          <div class="flex flex-col items-center gap-1">
                             <span v-if="edu.finalGrade || edu.trainingGrade" class="text-xs font-bold text-[#1E293B]">{{ edu.finalGrade || edu.trainingGrade }}</span>
                             <button v-if="edu.transcriptFileName" class="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1">
                               <Icon name="lucide:file-text" class="w-4 h-4" />
                               <span class="text-[10px] font-bold">Download</span>
                             </button>
                             <span v-if="!edu.finalGrade && !edu.trainingGrade && !edu.transcriptFileName" class="text-gray-300">-</span>
                          </div>
                        </td>
                        <td class="px-4 py-4">
                          <span :class="['text-[10px] font-bold', edu.status === 'A' ? 'text-green-600' : 'text-amber-600']">
                            {{ edu.status === 'A' ? 'Diakui' : 'Dimiliki' }}
                          </span>
                        </td>
                        <td class="px-4 py-4">
                          <div class="flex items-center justify-center gap-3">
                            <button @click="openEducationModal(edu)" class="text-blue-500 hover:text-blue-700 transition-colors">
                              <Icon name="lucide:edit-3" class="w-4 h-4" />
                            </button>
                            <button @click="deleteEducation(edu.id)" class="text-blue-500 hover:text-blue-700 transition-colors">
                              <Icon name="lucide:trash-2" class="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="paginatedEducation.length === 0">
                        <td colspan="9" class="px-4 py-12 text-center text-gray-400 italic">
                          Belum ada riwayat pendidikan yang sesuai.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Pagination UI -->
                <div class="flex items-center justify-between mt-6 text-[10px] px-2">
                  <div class="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-tight">
                    <span>Items per page:</span>
                    <select v-model="eduItemsPerPage" class="border border-gray-200 rounded px-2 py-1 outline-none text-[#1E293B]">
                      <option :value="10">10</option>
                      <option :value="25">25</option>
                      <option :value="50">50</option>
                    </select>
                  </div>
                  <div class="flex items-center gap-1">
                    <button 
                      class="px-2 py-1 rounded border border-gray-100 disabled:opacity-30"
                      :disabled="eduCurrentPage === 1"
                      @click="eduCurrentPage--"
                    >
                      <Icon name="lucide:chevron-left" class="w-4 h-4" />
                    </button>
                    <div class="flex items-center gap-1 mx-2">
                      <button 
                        v-for="p in totalEduPages" 
                        :key="p"
                        @click="eduCurrentPage = p"
                        :class="['w-7 h-7 rounded-lg font-bold transition-all', eduCurrentPage === p ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-50']"
                      >
                        {{ p }}
                      </button>
                    </div>
                    <button 
                      class="px-2 py-1 rounded border border-gray-100 disabled:opacity-30"
                      :disabled="eduCurrentPage === totalEduPages"
                      @click="eduCurrentPage++"
                    >
                      <Icon name="lucide:chevron-right" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 'Keluarga'" class="space-y-6">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-bold text-[#1E293B]">Anggota Keluarga</h3>
                  <button @click="openFamilyModal()" class="px-4 py-1.5 border border-[#3B82F6] text-[#3B82F6] rounded-md text-[11px] font-bold flex items-center gap-1.5 hover:bg-blue-50 transition-colors">
                      <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                      Create
                  </button>
                </div>

                <div v-if="familyList.length > 0" class="flex flex-col gap-3">
                  <div v-for="fam in familyList" :key="fam.id" class="p-4 border border-gray-100 rounded-xl bg-white flex items-center gap-6 hover:border-blue-200 transition-all group shadow-sm">
                    <!-- Avatar Section -->
                    <div class="flex items-center gap-4 min-w-[200px]">
                      <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-50">
                        <Icon name="lucide:user" class="w-7 h-7 text-gray-300" />
                      </div>
                      <div class="min-w-0">
                        <h4 class="text-sm font-bold text-[#1E293B] truncate">{{ fam.name }}</h4>
                        <p class="text-[11px] text-gray-400 font-medium">
                          {{ getLabel('pa_family_member', fam.subType, 'subtype') }} &nbsp;•&nbsp; {{ calculateAge(fam.birthDate) }} Tahun
                        </p>
                      </div>
                    </div>

                    <!-- Details Row -->
                    <div class="flex-1 grid grid-cols-3 gap-8">
                      <!-- Col 1 -->
                      <div class="space-y-2.5">
                        <div class="space-y-0.5">
                          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Jenis Kelamin</span>
                          <p class="text-xs text-[#1E293B] font-medium">{{ getLabel('gender', fam.gender) }}</p>
                        </div>
                        <div class="space-y-0.5">
                          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Tempat/Tgl Lahir</span>
                          <p class="text-xs text-[#1E293B] font-medium">{{ fam.birthPlace || '-' }}, {{ formatDate(fam.birthDate) }}</p>
                        </div>
                      </div>

                      <!-- Col 2 -->
                      <div class="space-y-2.5">
                        <div class="space-y-0.5">
                          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">NIK</span>
                          <p class="text-xs text-[#1E293B] font-medium">{{ fam.ktp || '-' }}</p>
                        </div>
                        <div class="space-y-0.5">
                          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">No. BPJS</span>
                          <p class="text-xs text-[#1E293B] font-medium">{{ fam.bpjsKes || '-' }}</p>
                        </div>
                      </div>

                      <!-- Col 3 -->
                      <div class="space-y-2.5">
                        <div class="space-y-0.5">
                          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Tanggungan Perusahaan</span>
                          <p class="text-xs text-[#1E293B] font-bold">{{ fam.covered === '1' ? 'IYA' : 'TIDAK' }}</p>
                        </div>
                        <div class="space-y-0.5">
                          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">File</span>
                          <button class="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1.5">
                            <Icon name="lucide:file-text" class="w-3.5 h-3.5" />
                            Download File
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Edit Button -->
                    <button @click="openFamilyModal(fam)" class="w-9 h-9 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors shrink-0 shadow-sm shadow-blue-100">
                      <Icon name="lucide:edit-3" class="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
                <div v-else class="text-center py-20 text-gray-400 italic bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                   <Icon name="lucide:users" class="w-12 h-12 mx-auto mb-3 opacity-20" />
                   <p>Data anggota keluarga belum tersedia.</p>
                </div>
              </div>

              <div v-else-if="activeTab === 'Identitas'" class="space-y-6">
                <h3 class="text-lg font-bold text-[#1E293B]">Identitas Personal</h3>
                <div v-if="idList.length > 0" class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="idItem in idList" :key="idItem.id" class="p-6 bg-gray-50 border border-gray-200 rounded-2xl relative overflow-hidden">
                    <p class="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-tighter">{{ getLabel('personal_ids', idItem.subType, 'subtype') }}</p>
                    <h4 class="text-lg font-mono text-[#1E293B] mb-4">{{ idItem.number }}</h4>
                    <p class="text-[10px] text-gray-400">Exp: {{ formatDate(idItem.endDate) }}</p>
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 'Komunikasi'" class="space-y-6">
                <div class="flex justify-between items-center mb-2">
                   <h3 class="text-lg font-bold text-[#1E293B]">Kontak Komunikasi</h3>
                   <button @click="openCommModal()" class="px-4 py-1.5 border border-[#3B82F6] text-[#3B82F6] rounded-md text-[11px] font-bold flex items-center gap-1.5 hover:bg-blue-50 transition-colors">
                      <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                      Create
                   </button>
                </div>
                <div v-if="commList.length > 0" class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="comm in commList" :key="comm.id" class="p-4 bg-white border border-gray-200 rounded-2xl flex items-center gap-4 shadow-sm hover:border-blue-300 transition-all group">
                        <div :class="['w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-111', getCommColor(comm.subType)]">
                             <Icon :name="getCommIcon(comm.subType)" class="w-6 h-6" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{{ getLabel('communication', comm.subType, 'subtype') }}</p>
                            <p class="text-xs font-bold text-[#1E293B] truncate">{{ comm.number }}</p>
                        </div>
                        <button @click="openCommModal(comm)" class="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 transition-all">
                           <Icon name="lucide:edit-3" class="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div v-else class="text-center py-20 text-gray-400 italic">
                   <Icon name="lucide:message-square" class="w-12 h-12 mx-auto mb-3 opacity-20" />
                   <p>Belum ada data kontak komunikasi.</p>
                </div>
              </div>

              <!-- General Placeholder for Unlinked Tabs -->
              <div v-else class="flex flex-col items-center justify-center h-64 text-gray-400">
                <Icon name="lucide:construction" class="w-12 h-12 mb-3 opacity-20" />
                <p class="text-sm italic">Konten tab {{ activeTab }} sedang dalam tahap sinkronisasi data...</p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Edit Modal -->
    <Teleport to="body">
       <div v-if="isEditModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4" @click="isEditModalOpen = false">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" @click.stop>
             <!-- Modal Header Matching UI Style -->
             <div class="bg-blue-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-20 shadow-md">
                <div class="flex items-center gap-3">
                   <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg uppercase transition-transform hover:scale-105">{{ personalData?.name?.charAt(0) }}</div>
                   <div>
                      <h2 class="text-white font-bold leading-none">Edit Personal Information</h2>
                      <p class="text-[10px] text-white/70 mt-1">Lengkapi data personal karyawan di bawah ini</p>
                   </div>
                </div>
                <button @click="isEditModalOpen = false" class="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"><Icon name="lucide:x" class="w-5 h-5" /></button>
             </div>
             <div class="p-8">
                <FormsPersonalInformationForm 
                  :initial-data="personalData" 
                  :is-edit="true" 
                  @success="loadAllData(); isEditModalOpen = false"
                  @cancel="isEditModalOpen = false"
                />
             </div>
          </div>
       </div>
    </Teleport>

    <!-- Communication Modal -->
    <Teleport to="body">
       <div v-if="isCommModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4" @click="isCommModalOpen = false">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" @click.stop>
             <div class="bg-blue-600 p-4 flex justify-between items-center shadow-md">
                <div class="flex items-center gap-3">
                   <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                      <Icon :name="editingComm ? getCommIcon(editingComm.subType) : 'lucide:message-square'" class="w-6 h-6" />
                   </div>
                   <div>
                      <h2 class="text-white font-bold leading-none">{{ editingComm ? 'Edit' : 'Tambah' }} Kontak Komunikasi</h2>
                      <p class="text-[10px] text-white/70 mt-1">Kelola informasi kontak karyawan</p>
                   </div>
                </div>
                <button @click="isCommModalOpen = false" class="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"><Icon name="lucide:x" class="w-5 h-5" /></button>
             </div>
             <div class="p-6">
                <FormsCommunicationForm 
                  :persnum="personalData.persnum"
                  :initial-data="editingComm" 
                  :is-edit="!!editingComm" 
                  @success="loadAllData(); isCommModalOpen = false"
                  @cancel="isCommModalOpen = false"
                />
             </div>
          </div>
       </div>
    </Teleport>

    <!-- Family Modal -->
    <Teleport to="body">
       <div v-if="isFamilyModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4" @click="isFamilyModalOpen = false">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden" @click.stop>
             <div class="bg-pink-600 p-4 flex justify-between items-center shadow-md">
                <div class="flex items-center gap-3">
                   <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                      <Icon name="lucide:heart" class="w-6 h-6" />
                   </div>
                   <div>
                      <h2 class="text-white font-bold leading-none">{{ editingFamily ? 'Edit' : 'Tambah' }} Anggota Keluarga</h2>
                      <p class="text-[10px] text-white/70 mt-1">Lengkapi data keluarga karyawan</p>
                   </div>
                </div>
                <button @click="isFamilyModalOpen = false" class="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"><Icon name="lucide:x" class="w-5 h-5" /></button>
             </div>
             <div class="p-8">
                <FormsFamilyMemberForm 
                  :persnum="personalData.persnum"
                  :initial-data="editingFamily" 
                  :is-edit="!!editingFamily" 
                  @success="loadAllData(); isFamilyModalOpen = false"
                  @cancel="isFamilyModalOpen = false"
                />
             </div>
          </div>
       </div>
    </Teleport>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
input, select {
  font-size: 11px;
}
label {
  letter-spacing: 0.025em;
  text-transform: capitalize;
}
/* Ensure the grid and cards look clean */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
