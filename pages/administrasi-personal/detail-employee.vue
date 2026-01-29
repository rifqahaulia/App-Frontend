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

// Tabs
const tabs = [
  'Personal Info', 'Transaksi', 'Organisasi', 'Jabatan', 'Pendidikan', 
  'Pelatihan', 'Keluarga', 'Bank', 'Penghargaan', 'Hukuman', 
  'Identitas', 'Komunikasi', 'Golongan', 'Masa Kerja Efektif'
]
const activeTab = ref('Personal Info')
const isEditModalOpen = ref(false)

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
        paStore.fetchModuleData('pa-tax-data', personal.persnum).then(d => taxDataList.value = d),
        refStore.fetchMultipleReferences([
          { field: 'gender', type: 'lookup' },
          { field: 'marital_status', type: 'lookup' },
          { field: 'religion', type: 'lookup' },
          { field: 'address', type: 'subtype' },
          { field: 'family', type: 'subtype' },
          { field: 'education', type: 'subtype' },
          { field: 'personal_ids', type: 'subtype' },
          { field: 'communication', type: 'subtype' },
          { field: 'object_loan', type: 'subtype' },
          { field: 'external_organization', type: 'subtype' },
          { field: 'company_instruction', type: 'subtype' }
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
    month: 'short',
    year: 'numeric'
  }).replace(/\./g, ' ')
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
                <p class="text-sm text-gray-500">{{ personalData.title || 'Senior Manager' }}</p>
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
                <span class="text-[#1E293B] font-bold font-semibold">Indonesia</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Status/Tgl. Status</span>
                <span class="text-[#1E293B] font-bold">{{ getLabel('marital_status', personalData.maritalStatus) }} / {{ formatDate(personalData.maritalDate) }}</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">No. HP</span>
                <span class="text-[#1E293B] font-bold">08961425309</span>
              </div>
            </div>

            <!-- Mini Card 2 -->
            <div class="bg-white border border-gray-200 rounded-xl p-4 space-y-2.5 shadow-sm">
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Status</span>
                <span class="text-[#1E293B] font-bold">Karyawan</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Unit</span>
                <span class="text-[#1E293B] font-bold text-right font-semibold">Teknologi Informasi</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Lokasi</span>
                <span class="text-[#1E293B] font-bold">Kantor Pusat</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-gray-500 font-medium">Office Email</span>
                <span class="text-[#1E293B] font-bold text-right break-all ml-4">bagas.wicak@airnav.co.id</span>
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
                    <p class="text-[11px] text-[#475569]">Indonesia</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">NIK / e-NIK</label>
                    <p class="text-[11px] text-[#475569]">{{ personalData.persnum }} / {{ personalData.persnum }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Unit</label>
                    <p class="text-[11px] text-[#475569]">Teknologi Informasi</p>
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
                    <p class="text-[11px] text-[#475569]">Kantor Pusat</p>
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
                    <p class="text-[11px] text-[#475569]">BagasWick@airnav.co.id</p>
                  </div>

                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Jenis Kelamin</label>
                    <p class="text-[11px] text-[#475569]">{{ getLabel('gender', personalData.gender) }}</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">No. Handphone</label>
                    <p class="text-[11px] text-[#475569]">08612312312</p>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#1E293B] mb-1">Jabatan</label>
                    <p class="text-[11px] text-[#475569]">Senior Manager</p>
                  </div>
                </div>

                <!-- Jabatan Section (Matching Screenshot) -->
                <h3 class="text-sm font-bold text-[#1E293B] mb-4">Jabatan</h3>
                <div class="grid grid-cols-4 gap-y-6 mb-12">
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Status</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">Karyawan</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Lokasi Kerja</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">Kantor Pusat</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">TMT Jabatan</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">01-07-2023</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Job Center</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold uppercase font-bold tracking-tight">A1231321231 - Administrasi</p>
                  </div>

                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Jabatan</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">Senior Manager</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Lokasi kedudukan</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">Kantor Pusat</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">TMT kedudukan</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold">01-08-2024</p>
                  </div>

                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Unit</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold font-bold">Teknologi Informasi</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Lokasi Induk</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold font-bold">Kantor Pusat</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 mb-0.5">Cost Center</label>
                    <p class="text-[10px] text-[#1E293B] font-semibold uppercase font-bold tracking-tight">A1231231 - Teknologi Informasi</p>
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
                    <p class="text-[11px] text-gray-400 mb-4">{{ idList.find(i => i.subType === '01')?.number || '1230410231231212' }}</p>
                    <button class="text-[#3B82F6] text-[11px] font-bold hover:underline">Download File</button>
                  </div>
                  <!-- Case: NPWP -->
                  <div class="border border-gray-200 rounded-xl p-5 text-center flex flex-col items-center shadow-sm">
                    <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="lucide:file-text" class="w-7 h-7 text-yellow-500" />
                    </div>
                    <h4 class="text-[12px] font-bold text-[#1E293B] mb-1">NPWP</h4>
                    <p class="text-[11px] text-gray-400 mb-4">{{ idList.find(i => i.subType === '05')?.number || '1230410231231212' }}</p>
                    <button class="text-[#3B82F6] text-[11px] font-bold hover:underline">Download File</button>
                  </div>
                  <!-- Case: BPJS Ketenagakerjaan -->
                  <div class="border border-gray-200 rounded-xl p-5 text-center flex flex-col items-center shadow-sm">
                    <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="lucide:file-text" class="w-7 h-7 text-yellow-500" />
                    </div>
                    <h4 class="text-[12px] font-bold text-[#1E293B] mb-1">BPJS Ketenagakerjaan</h4>
                    <p class="text-[11px] text-gray-400 mb-4">1230410231231212</p>
                    <button class="text-[#3B82F6] text-[11px] font-bold hover:underline">Download File</button>
                  </div>
                  <!-- Case: BPJS Kesehatan -->
                  <div class="border border-gray-200 rounded-xl p-5 text-center flex flex-col items-center shadow-sm">
                    <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="lucide:file-text" class="w-7 h-7 text-yellow-500" />
                    </div>
                    <h4 class="text-[12px] font-bold text-[#1E293B] mb-1">BPJS Kesehatan</h4>
                    <p class="text-[11px] text-gray-400 mb-4">1230410231231212</p>
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

              <div v-else-if="activeTab === 'Pendidikan'" class="space-y-6">
                <h3 class="text-lg font-bold text-[#1E293B]">Riwayat Pendidikan</h3>
                <div v-if="educationList.length > 0" class="space-y-4">
                  <div v-for="edu in educationList" :key="edu.id" class="p-5 border border-gray-200 rounded-xl flex gap-4 shadow-sm">
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="lucide:graduation-cap" class="w-7 h-7" />
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-[#1E293B]">{{ edu.institute }}</h4>
                      <p class="text-[11px] text-blue-600 font-bold mb-1 uppercase tracking-tight">{{ getLabel('education', edu.subType, 'subtype') }} - {{ edu.branchStudyText || edu.branchStudy }}</p>
                      <div class="flex gap-4 text-[10px] text-gray-500">
                        <span>Lulus: {{ formatDate(edu.endDate) }}</span>
                        <span>IPK/Nilai: {{ edu.finalGrade }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 'Keluarga'" class="space-y-6">
                <h3 class="text-lg font-bold text-[#1E293B]">Anggota Keluarga</h3>
                <div v-if="familyList.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div v-for="fam in familyList" :key="fam.id" class="p-4 border border-gray-200 rounded-xl flex items-center gap-4 shadow-sm">
                    <div class="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold uppercase">{{ fam.name?.charAt(0) }}</div>
                    <div>
                        <h4 class="text-xs font-bold text-[#1E293B]">{{ fam.name }}</h4>
                        <p class="text-[10px] text-pink-600 font-bold uppercase">{{ getLabel('family', fam.subType, 'subtype') }}</p>
                    </div>
                  </div>
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
                <h3 class="text-lg font-bold text-[#1E293B]">Kontak Komunikasi</h3>
                <div v-if="commList.length > 0" class="grid grid-cols-3 gap-4">
                    <div v-for="comm in commList" :key="comm.id" class="p-4 border border-gray-200 rounded-2xl flex items-center gap-4 shadow-sm">
                        <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                             <Icon :name="comm.subType?.toLowerCase().includes('email') ? 'lucide:mail' : 'lucide:phone'" class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{{ getLabel('communication', comm.subType, 'subtype') }}</p>
                            <p class="text-xs font-bold text-[#1E293B]">{{ comm.number }}</p>
                        </div>
                    </div>
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
