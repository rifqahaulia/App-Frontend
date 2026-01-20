<script setup lang="ts">
useHead({
  title: 'Detail Personal - Administrasi Personal'
})

const route = useRoute()
const employeeId = route.query.id

// Data dummy untuk detail karyawan berdasarkan mockup
const employeeDetail = ref({
  id: employeeId,
  name: 'Margareth Indrina',
  position: 'Senior Manager',
  avatar: 'MI',
  avatarColor: 'bg-orange-500',
  
  // Personal Info
  personalInfo: {
    nama: 'Margareth Indrina',
    gelar: 'S.Kom S.Kom',
    tempatTanggalLahir: 'Jakarta / 09-08-1990',
    jenisKelamin: 'Perempuan',
    negara: 'Indonesia',
    agama: 'Islam',
    statusTglStatus: 'Belum Menikah / -',
    noHandphone: '08123456789',
    nikNik: '3171234567890123 / 3171234567890123',
    nikInstansiAsal: '-',
    officeEmail: 'margareth.indrina@airnav.co.id',
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
    tmtJabatan: '01-01-2020',
    tmtKedudukan: '01-01-2022',
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
const isEditModalOpen = ref(false)
const isCreateAlamatModalOpen = ref(false)

// Refs for date inputs
const tanggalLahirInput = ref<HTMLInputElement | null>(null)
const tanggalNikahInput = ref<HTMLInputElement | null>(null)

// Form data for editing
const editForm = ref({
  nik: '10083312',
  nama: 'Bagus Wicaksono',
  gelar: 'S.Kom S.Kom',
  tempatLahir: 'Jakarta',
  tanggalLahir: '10.10.1989',
  jenisKelamin: 'Laki-Laki',
  agama: 'Islam',
  negara: 'Indonesia',
  statusNikah: 'Nikah',
  tanggalNikah: '10.10.2003'
})

// Form data for create alamat
const createAlamatForm = ref({
  jenisAlamat: '',
  jalan: '',
  rt: '',
  rw: '',
  kelurahan: '',
  kecamatan: '',
  provinsi: '',
  kota: '',
  kodePos: ''
})

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const openEditModal = () => {
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const openCreateAlamatModal = () => {
  isCreateAlamatModalOpen.value = true
}

const closeCreateAlamatModal = () => {
  isCreateAlamatModalOpen.value = false
  // Reset form
  createAlamatForm.value = {
    jenisAlamat: '',
    jalan: '',
    rt: '',
    rw: '',
    kelurahan: '',
    kecamatan: '',
    provinsi: '',
    kota: '',
    kodePos: ''
  }
}

const saveAlamat = () => {
  // Handle save alamat logic here
  console.log('Saving alamat:', createAlamatForm.value)
  closeCreateAlamatModal()
}

const saveChanges = () => {
  // Handle save logic here
  console.log('Saving changes:', editForm.value)
  closeEditModal()
}

const openTanggalLahirPicker = () => {
  if (tanggalLahirInput.value) {
    tanggalLahirInput.value.focus()
    tanggalLahirInput.value.click()
    if (tanggalLahirInput.value.showPicker) {
      tanggalLahirInput.value.showPicker()
    }
  }
}

const openTanggalNikahPicker = () => {
  if (tanggalNikahInput.value) {
    tanggalNikahInput.value.focus()
    tanggalNikahInput.value.click()
    if (tanggalNikahInput.value.showPicker) {
      tanggalNikahInput.value.showPicker()
    }
  }
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
              <h1 class="text-xl md:text-2xl font-bold text-gray-900">Personal Information - Detail</h1>
            </div>
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Personal Information</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Detail</span>
            </div>
          </div>
        </div>

        <!-- Content Container - Scrollable area -->
        <div class="flex flex-1 overflow-hidden bg-white">
          <!-- Left Sidebar - Employee Info -->
          <div class="w-96 bg-white overflow-y-auto flex-shrink-0">
            <div class="p-4 pt-8">
              <!-- Employee Card Container -->
              <div class="bg-white rounded-3xl border border-gray-200 p-4 pb-8 mb-4">
                <!-- Employee Header -->
                <div class="text-center mb-4 pb-4 border-b border-gray-200">
                  <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {{ employeeDetail.avatar }}
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-1">{{ employeeDetail.name }}</h3>
                  <p class="text-sm text-gray-600">{{ employeeDetail.position }}</p>
                </div>

                <!-- Personal Info Card -->
                <div class="border border-gray-300 rounded-3xl p-3 mb-3">
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Gelar</span>
                      <span class="text-xs text-gray-900">{{ employeeDetail.personalInfo.gelar }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">NIK/e-NIK</span>
                      <span class="text-xs text-gray-900 text-right">{{ employeeDetail.personalInfo.nikNik }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Tempat/Tgl Lahir</span>
                      <span class="text-xs text-gray-900 text-right">{{ employeeDetail.personalInfo.tempatTanggalLahir }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Jenis Kelamin</span>
                      <span class="text-xs text-gray-900">{{ employeeDetail.personalInfo.jenisKelamin }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Agama</span>
                      <span class="text-xs text-gray-900">{{ employeeDetail.personalInfo.agama }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Negara</span>
                      <span class="text-xs text-gray-900">{{ employeeDetail.personalInfo.negara }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Status/Tgl. Status</span>
                      <span class="text-xs text-gray-900 text-right">{{ employeeDetail.personalInfo.statusTglStatus }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">No. HP</span>
                      <span class="text-xs text-gray-900">{{ employeeDetail.personalInfo.noHandphone }}</span>
                    </div>
                </div>
              </div>

                <!-- Job Info Card -->
                <div class="border border-gray-300 rounded-3xl p-3">
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Status</span>
                      <span class="text-xs text-gray-900">{{ employeeDetail.jabatan.status }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Unit</span>
                      <span class="text-xs text-gray-900">{{ employeeDetail.personalInfo.unit }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Lokasi</span>
                      <span class="text-xs text-gray-900">{{ employeeDetail.personalInfo.lokasi }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-gray-900">Office Email</span>
                      <span class="text-xs text-gray-900 text-right break-all">{{ employeeDetail.personalInfo.officeEmail }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content Area -->
          <div class="flex-1 overflow-y-auto">
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
                        ? 'text-blue-400 border-blue-400'
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
                    <!-- Column 1 -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Nama</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.nama }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Gelar</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.gelar }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Tempat / Tanggal Lahir</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.tempatTanggalLahir }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Jenis Kelamin</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.jenisKelamin }}</p>
                      </div>
                    </div>

                    <!-- Column 2 -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Negara</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.negara }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Agama</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.agama }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Status/Tgl. Status</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.statusTglStatus }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">No. Handphone</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.noHandphone }}</p>
                      </div>
                    </div>

                    <!-- Column 3 -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">NIK / e-NIK</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.nikNik }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">NIK Instansi Asal</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.nikInstansiAsal }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Office Email</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.officeEmail }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Jabatan</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.jabatan }}</p>
                      </div>
                    </div>

                    <!-- Column 4 -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Unit</label>
                        <p class="text-gray-900">{{ employeeDetail.personalInfo.unit }}</p>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-gray-900 mb-1">Lokasi</label>
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
                          <label class="block text-sm font-bold text-gray-900 mb-1">Status</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.status }}</p>
                        </div>
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">Jabatan</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.jabatan }}</p>
                        </div>
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">Unit</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.unit }}</p>
                        </div>
                      </div>

                      <!-- Jabatan Column 2 -->
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">Lokasi Kerja</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.lokasiKerja }}</p>
                        </div>
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">Lokasi kedudukan</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.lokasiKedudukan }}</p>
                        </div>
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">Lokasi Induk</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.lokasiInduk }}</p>
                        </div>
                      </div>

                      <!-- Jabatan Column 3 -->
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">TMT Jabatan</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.tmtJabatan }}</p>
                        </div>
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">TMT kedudukan</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.tmtKedudukan }}</p>
                        </div>
                      </div>

                      <!-- Jabatan Column 4 -->
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">Job Center</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.jobCenter }}</p>
                        </div>
                        <div>
                          <label class="block text-sm font-bold text-gray-900 mb-1">Cost Center</label>
                          <p class="text-gray-900">{{ employeeDetail.jabatan.costCenter }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Alamat Section -->
                  <div class="border-t pt-6 mb-8">
                    <div class="flex items-center justify-between mb-4">
                      <h4 class="text-lg font-semibold text-gray-900">Alamat</h4>
                      <button 
                        @click="openCreateAlamatModal"
                        class="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <Icon name="lucide:plus" class="w-3 h-3" />
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
        </div>
      </main>
    </div>

    <!-- Edit Modal -->
    <div 
      v-if="isEditModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeEditModal"
    >
      <div 
        class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              BW
            </div>
            <h2 class="text-lg font-bold">Personal Information</h2>
          </div>
          <button 
            @click="closeEditModal"
            class="p-1 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Left Column -->
            <div class="space-y-3">
              <!-- NIK -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">NIK</label>
                <input 
                  v-model="editForm.nik"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Nama -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Nama</label>
                <input 
                  v-model="editForm.nama"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Gelar -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Gelar</label>
                <input 
                  v-model="editForm.gelar"
                  type="text"
                  placeholder="Sesuai pendidikan terakhir yang dimiliki"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p class="text-xs text-gray-500 mt-1">*ex : Amd, ST, SE, MM, dll, boleh dan tidak panjang dengan koma spasi ( , )</p>
              </div>

              <!-- Tempat Lahir -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Tempat Lahir</label>
                <input 
                  v-model="editForm.tempatLahir"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Jenis Kelamin -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Jenis Kelamin</label>
                <select 
                  v-model="editForm.jenisKelamin"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <!-- Negara -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Negara</label>
                <select 
                  v-model="editForm.negara"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-3">
              <!-- Tanggal Lahir -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Tgl. Lahir</label>
                <div class="relative">
                  <input 
                    :value="editForm.tanggalLahir"
                    type="text"
                    readonly
                    class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white"
                  />
                  <input 
                    ref="tanggalLahirInput"
                    v-model="editForm.tanggalLahir"
                    type="date"
                    class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                  />
                  <button
                    type="button"
                    @click="openTanggalLahirPicker"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    <Icon name="lucide:calendar" class="w-4 h-4 text-blue-500" />
                  </button>
                </div>
              </div>

              <!-- Agama -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Agama</label>
                <select 
                  v-model="editForm.agama"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>

              <!-- Status Nikah -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Status Nikah</label>
                <select 
                  v-model="editForm.statusNikah"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Nikah">Nikah</option>
                  <option value="Belum Menikah">Belum Menikah</option>
                  <option value="Cerai">Cerai</option>
                </select>
              </div>

              <!-- Tanggal Nikah -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Tgl. Nikah</label>
                <div class="relative">
                  <input 
                    :value="editForm.tanggalNikah"
                    type="text"
                    readonly
                    class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white"
                  />
                  <input 
                    ref="tanggalNikahInput"
                    v-model="editForm.tanggalNikah"
                    type="date"
                    class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                  />
                  <button
                    type="button"
                    @click="openTanggalNikahPicker"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    <Icon name="lucide:calendar" class="w-4 h-4 text-blue-500" />
                  </button>
                </div>
              </div>

              <!-- Akte Kelahiran Upload -->
              <div>
                <label class="block text-sm font-bold text-gray-900 mb-2">Akte Kelahiran (.pdf)</label>
                <p class="text-xs text-gray-500 mb-2">Max file size 1 mb</p>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <button class="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                    Choose File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-2xl">
          <button 
            @click="closeEditModal"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="saveChanges"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Create Alamat Modal -->
    <div 
      v-if="isCreateAlamatModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeCreateAlamatModal"
    >
      <div 
        class="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <h2 class="text-lg font-bold">Create Alamat</h2>
          <button 
            @click="closeCreateAlamatModal"
            class="p-1 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-4 space-y-3">
          <!-- Jenis Alamat -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Alamat</label>
            <select 
              v-model="createAlamatForm.jenisAlamat"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih</option>
              <option value="Alamat Rumah (KTP)">Alamat Rumah (KTP)</option>
              <option value="Alamat Lain">Alamat Lain</option>
              <option value="Alamat Orang Tua">Alamat Orang Tua</option>
            </select>
          </div>

          <!-- Jalan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jalan</label>
            <p class="text-xs text-gray-500 mb-2">Nama perumahan/jalan/blok</p>
            <input 
              v-model="createAlamatForm.jalan"
              type="text"
              placeholder="Isi jalan"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- RT & RW -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">RT</label>
              <input 
                v-model="createAlamatForm.rt"
                type="text"
                placeholder="000"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">RW</label>
              <input 
                v-model="createAlamatForm.rw"
                type="text"
                placeholder="000"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Kelurahan & Kecamatan -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kelurahan</label>
              <input 
                v-model="createAlamatForm.kelurahan"
                type="text"
                placeholder="Kelurahan"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
              <input 
                v-model="createAlamatForm.kecamatan"
                type="text"
                placeholder="Kecamatan"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Provinsi & Kota -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
              <select 
                v-model="createAlamatForm.provinsi"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih</option>
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Jawa Timur">Jawa Timur</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kota</label>
              <select 
                v-model="createAlamatForm.kota"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih</option>
                <option value="Jakarta Selatan">Jakarta Selatan</option>
                <option value="Jakarta Pusat">Jakarta Pusat</option>
                <option value="Jakarta Utara">Jakarta Utara</option>
                <option value="Jakarta Barat">Jakarta Barat</option>
                <option value="Jakarta Timur">Jakarta Timur</option>
              </select>
            </div>
          </div>

          <!-- Kode Pos -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
            <input 
              v-model="createAlamatForm.kodePos"
              type="text"
              placeholder="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-2xl">
          <button 
            @click="closeCreateAlamatModal"
            class="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="saveAlamat"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
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