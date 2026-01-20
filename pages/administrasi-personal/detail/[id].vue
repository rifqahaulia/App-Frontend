<script setup lang="ts">
useHead({
  title: 'Personal Information - Detail Karyawan'
})

const route = useRoute()
const employeeId = route.params.id

// Data dummy untuk detail karyawan berdasarkan mockup
const employeeDetail = ref({
  id: employeeId,
  name: 'Bagus Wicaksono',
  position: 'Senior Manager',
  avatar: 'BW',
  avatarColor: 'bg-orange-500',
  
  // Personal Info
  personalInfo: {
    nama: 'Bagus Wicaksono',
    gelar: 'S.Kom S.Kom',
    tempatTanggalLahir: 'Jakarta / 09-08-1945',
    jenisKelamin: 'Laki-Laki',
    negara: 'Indonesia',
    agama: 'Islam',
    statusTglStatus: 'Nikah / 06.06.2016',
    noHandphone: '08612312312',
    nikNik: '09010204 / 09010204',
    nikInstansiAsal: '-',
    officeEmail: 'Bagus.Wick@airnav.co.id',
    jabatan: 'Senior Manager',
    unit: 'Teknologi Informasi',
    lokasi: 'Kantor Pusat'
  },
  
  // Jabatan Info
  jabatan: {
    status: 'Karyawan',
    jabatan: 'Senior Manager',
    unit: 'Teknologi Informasi',
    lokasiKerja: 'Kantor Pusat',
    lokasiKedudukan: 'Kantor Pusat',
    lokasiInduk: 'Kantor Pusat',
    tmtJabatan: '01-07-2023',
    tmtKedudukan: '01-08-2024',
    jobCenter: 'AI23I23I231 - Administrasi',
    costCenter: 'AI23I231 - Teknologi Informasi'
  },
  
  // Alamat
  alamat: [
    {
      type: 'Alamat Rumah (KTP)',
      address: 'Jln. Jakarta Raya, Gang Sana, Kebayoran Lama, Jakarta Selatan'
    },
    {
      type: 'Alamat Lain',
      address: 'Jln. Jakarta Raya, Gang Sana, Kebayoran Lama, Jakarta Selatan'
    },
    {
      type: 'Alamat Orang Tua',
      address: 'Jln. Jakarta Raya, Gang Sana, Kebayoran Lama, Jakarta Selatan'
    }
  ],
  
  // Dokumen
  dokumen: [
    {
      name: 'Akte Kelahiran',
      number: '1230410231231212',
      icon: 'lucide:file-text'
    },
    {
      name: 'NPWP',
      number: '1230410231231212',
      icon: 'lucide:file-text'
    },
    {
      name: 'BPJS Ketenagakerjaan',
      number: '1230410231231212',
      icon: 'lucide:file-text'
    },
    {
      name: 'BPJS Kesehatan',
      number: '1230410231231212',
      icon: 'lucide:file-text'
    }
  ]
})

// Tabs data
const tabs = [
  'Personal Info', 'Transaksi', 'Organisasi', 'Jabatan', 'Pendidikan', 
  'Pelatihan', 'Keluarga', 'Bank', 'Penghargaan', 'Hukuman', 
  'Identitas', 'Komunikasi', 'Golongan', 'Masa Kerja Efektif'
]

const activeTab = ref('Personal Info')

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const goBack = () => {
  navigateTo('/administrasi-personal')
}
</script>

<template>
  <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
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
              <h1 class="text-xl md:text-2xl font-bold text-gray-900">Personal Information</h1>
            </div>
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Personal Information</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Detail</span>
            </div>
          </div>
        </div>

        <!-- Content Container - Scrollable area -->
        <div class="flex-1 overflow-y-auto bg-white relative">
          <div class="p-4 md:p-6">
            
            <!-- Employee Header Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 mb-6">
              <div class="flex items-center gap-4">
                <!-- Avatar -->
                <div :class="[
                  'w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold',
                  employeeDetail.avatarColor
                ]">
                  {{ employeeDetail.avatar }}
                </div>
                <!-- Info -->
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">{{ employeeDetail.name }}</h2>
                  <p class="text-gray-600">{{ employeeDetail.position }}</p>
                </div>
              </div>
            </div>

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
                      ? 'text-blue-600 border-blue-600 bg-blue-50'
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                  ]"
                >
                  {{ tab }}
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <div class="bg-white rounded-b-2xl shadow-sm border border-gray-200/60 border-t-0 overflow-hidden">
              
              <!-- Personal Info Tab -->
              <div v-if="activeTab === 'Personal Info'" class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-semibold text-gray-900">Informasi Personal</h3>
                  <button class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Icon name="lucide:edit" class="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <!-- Personal Info Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <!-- Column 1 -->
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Nama</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.nama }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Gelar</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.gelar }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Tempat / Tanggal Lahir</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.tempatTanggalLahir }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Jenis Kelamin</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.jenisKelamin }}</p>
                    </div>
                  </div>

                  <!-- Column 2 -->
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Negara</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.negara }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Agama</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.agama }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Status/Tgl. Status</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.statusTglStatus }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">No. Handphone</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.noHandphone }}</p>
                    </div>
                  </div>

                  <!-- Column 3 -->
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">NIK / e-NIK</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.nikNik }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">NIK Instansi Asal</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.nikInstansiAsal }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Office Email</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.officeEmail }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Jabatan</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.jabatan }}</p>
                    </div>
                  </div>

                  <!-- Column 4 -->
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Unit</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.unit }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Lokasi</label>
                      <p class="text-gray-900">{{ employeeDetail.personalInfo.lokasi }}</p>
                    </div>
                  </div>
                </div>

                <!-- Jabatan Section -->
                <div class="border-t pt-6 mb-8">
                  <h4 class="text-lg font-semibold text-gray-900 mb-4">Jabatan</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Jabatan Column 1 -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Status</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.status }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Jabatan</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.jabatan }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Unit</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.unit }}</p>
                      </div>
                    </div>

                    <!-- Jabatan Column 2 -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Lokasi Kerja</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.lokasiKerja }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Lokasi kedudukan</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.lokasiKedudukan }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Lokasi Induk</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.lokasiInduk }}</p>
                      </div>
                    </div>

                    <!-- Jabatan Column 3 -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">TMT Jabatan</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.tmtJabatan }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">TMT kedudukan</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.tmtKedudukan }}</p>
                      </div>
                    </div>

                    <!-- Jabatan Column 4 -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Job Center</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.jobCenter }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500 mb-1">Cost Center</label>
                        <p class="text-gray-900">{{ employeeDetail.jabatan.costCenter }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Alamat Section -->
                <div class="border-t pt-6 mb-8">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-gray-900">Alamat</h4>
                    <button class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                      <Icon name="lucide:plus" class="w-4 h-4" />
                      Create
                    </button>
                  </div>
                  <div class="space-y-4">
                    <div 
                      v-for="(alamat, index) in employeeDetail.alamat" 
                      :key="index"
                      class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h5 class="font-medium text-gray-900">{{ alamat.type }}</h5>
                        <p class="text-gray-600 text-sm">{{ alamat.address }}</p>
                      </div>
                      <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Icon name="lucide:external-link" class="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Dokumen Section -->
                <div class="border-t pt-6">
                  <h4 class="text-lg font-semibold text-gray-900 mb-4">Dokumen</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div 
                      v-for="(doc, index) in employeeDetail.dokumen" 
                      :key="index"
                      class="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon name="lucide:file-text" class="w-6 h-6 text-yellow-600" />
                      </div>
                      <h5 class="font-medium text-gray-900 mb-1">{{ doc.name }}</h5>
                      <p class="text-xs text-gray-500 mb-3">{{ doc.number }}</p>
                      <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Download File
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Other Tabs Placeholder -->
              <div v-else class="p-6">
                <div class="text-center py-12">
                  <Icon name="lucide:construction" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ activeTab }}</h3>
                  <p class="text-gray-600">Konten untuk tab {{ activeTab }} sedang dalam pengembangan</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
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