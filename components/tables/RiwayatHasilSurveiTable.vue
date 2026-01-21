<script setup lang="ts">

interface RiwayatHasilSurvei {
  nik: string
  nama: string
  jabatan: string
  levelJabatan: string
  lokasi: string
  status: 'sudah' | 'belum'
}

interface Props {
  data?: RiwayatHasilSurvei[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const selectedLokasi = ref('')
const selectedStatus = ref('')

const showInputSurveiModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const editingItem = ref<RiwayatHasilSurvei | null>(null)
const viewingItem = ref<RiwayatHasilSurvei | null>(null)

const tanggalSurveiInput = ref<HTMLInputElement | null>(null)

const formData = ref({
  nik: '',
  nama: '',
  jabatan: '',
  levelJabatan: '',
  lokasi: '',
  tanggalSurvei: '',
  jenisSurvei: '',
  hasilSurvei: '',
  catatan: '',
  status: 'belum'
})

const editData = ref({
  nik: '',
  nama: '',
  jabatan: '',
  levelJabatan: '',
  lokasi: '',
  tanggalSurvei: '',
  jenisSurvei: '',
  hasilSurvei: '',
  catatan: '',
  status: 'belum'
})

const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

const dummyData: RiwayatHasilSurvei[] = [
  {
    nik: '10835478',
    nama: 'AAN YUDHIARTAWAN',
    jabatan: 'MANAGER DESAIN DAN REKAYASA FASILITAS PENERBANGAN, OTOMASI DAN PENERBATAN POLUSI',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'ADNAN HAKIM',
    jabatan: 'INSPEKTUR KESELAMATAN',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  },
  {
    nik: '10835478',
    nama: 'WIJAYA HADI SUPROJO',
    jabatan: 'INSPEKTUR KESELAMATAN',
    levelJabatan: '14',
    lokasi: 'Kantor Pusat',
    status: 'sudah'
  }
]

const riwayatHasilSurveiData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

const filterLokasiOptions = [
  { value: '', label: 'Semua Lokasi' },
  { value: 'kantor_pusat', label: 'Kantor Pusat' },
  { value: 'cabang_jakarta', label: 'Cabang Jakarta' },
  { value: 'cabang_surabaya', label: 'Cabang Surabaya' }
]

const filterStatusOptions = [
  { value: '', label: 'Semua Status' },
  { value: 'sudah', label: 'Sudah' },
  { value: 'belum', label: 'Belum' }
]

const lokasiOptions = [
  { value: 'kantor_pusat', label: 'Kantor Pusat' },
  { value: 'cabang_jakarta', label: 'Cabang Jakarta' },
  { value: 'cabang_surabaya', label: 'Cabang Surabaya' },
  { value: 'cabang_bandung', label: 'Cabang Bandung' }
]

const jenisSurveiOptions = [
  { value: 'kepuasan_kerja', label: 'Kepuasan Kerja' },
  { value: 'evaluasi_kinerja', label: 'Evaluasi Kinerja' },
  { value: 'kompetensi', label: 'Kompetensi' },
  { value: 'motivasi', label: 'Motivasi' }
]

const hasilSurveiOptions = [
  { value: 'sangat_baik', label: 'Sangat Baik' },
  { value: 'baik', label: 'Baik' },
  { value: 'cukup', label: 'Cukup' },
  { value: 'kurang', label: 'Kurang' }
]

const filteredData = computed(() => {
  let filtered = riwayatHasilSurveiData.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.nik.toLowerCase().includes(query) ||
      item.nama.toLowerCase().includes(query) ||
      item.jabatan.toLowerCase().includes(query) ||
      item.lokasi.toLowerCase().includes(query)
    )
  }

  if (selectedLokasi.value) {
    filtered = filtered.filter(item => 
      item.lokasi.toLowerCase().includes(selectedLokasi.value.toLowerCase())
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(item => item.status === selectedStatus.value)
  }

  return filtered
})

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

watch(searchQuery, () => {
  currentPage.value = 1
})

watch([selectedLokasi, selectedStatus], () => {
  currentPage.value = 1
})

const handleExport = () => {
  console.log('Exporting survey results...')
  alert('Data survei berhasil diekspor!')
}

const handleInputSurvei = () => {
  formData.value = {
    nik: '',
    nama: '',
    jabatan: '',
    levelJabatan: '',
    lokasi: '',
    tanggalSurvei: '',
    jenisSurvei: '',
    hasilSurvei: '',
    catatan: '',
    status: 'belum'
  }
  showInputSurveiModal.value = true
}

const openTanggalSurveiPicker = () => {
  if (tanggalSurveiInput.value) {
    tanggalSurveiInput.value.focus()
    tanggalSurveiInput.value.click()
    if (tanggalSurveiInput.value.showPicker) {
      tanggalSurveiInput.value.showPicker()
    }
  }
}

const handleTanggalSurveiChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    formData.value.tanggalSurvei = target.value
  }
}

const closeInputSurveiModal = () => {
  showInputSurveiModal.value = false
}

const submitInputSurvei = () => {
  if (!formData.value.nik || !formData.value.nama || !formData.value.jabatan || 
      !formData.value.levelJabatan || !formData.value.lokasi || !formData.value.tanggalSurvei ||
      !formData.value.jenisSurvei || !formData.value.hasilSurvei) {
    alert('Mohon lengkapi semua field yang wajib diisi!')
    return
  }

  console.log('Submitting survey data:', formData.value)
  alert('Data survei berhasil disimpan!')
  closeInputSurveiModal()
}

const handleView = (item: RiwayatHasilSurvei) => {
  viewingItem.value = item
  showViewModal.value = true
}

const handleEdit = (item: RiwayatHasilSurvei) => {
  editingItem.value = item
  editData.value = {
    nik: item.nik,
    nama: item.nama,
    jabatan: item.jabatan,
    levelJabatan: item.levelJabatan,
    lokasi: item.lokasi,
    tanggalSurvei: '2024-01-15',
    jenisSurvei: 'kepuasan_kerja',
    hasilSurvei: 'baik',
    catatan: 'Survey hasil baik',
    status: item.status
  }
  showEditModal.value = true
}

const handleDelete = (item: RiwayatHasilSurvei) => {
  if (confirm(`Hapus data survei untuk ${item.nama}?`)) {
    console.log('Deleting item:', item)
    alert('Data berhasil dihapus!')
  }
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingItem.value = null
}

const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
}

const saveEdit = () => {
  console.log('Saving edit:', editData.value)
  alert('Data berhasil diperbarui!')
  closeEditModal()
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'sudah':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'belum':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'sudah':
      return 'Sudah'
    case 'belum':
      return 'Belum'
    default:
      return status
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Header with Search, Filters and Action Buttons -->
    <div class="px-4 sm:px-6 py-4 bg-white rounded-t-2xl">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <!-- Left Side: Search and Filters -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
          <!-- Search -->
          <div class="relative min-w-[200px] flex-shrink-0">
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

          <!-- Filter Dropdowns -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Semua Lokasi Filter -->
            <div class="min-w-[140px]">
              <select 
                v-model="selectedLokasi"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
              >
                <option v-for="option in filterLokasiOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Semua Status Filter -->
            <div class="min-w-[140px]">
              <select 
                v-model="selectedStatus"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
              >
                <option v-for="option in filterStatusOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Right Side: Action Buttons -->
        <div class="flex gap-3 flex-shrink-0">
          <button 
            @click="handleExport"
            class="flex items-center gap-2 px-4 py-2 bg-white border border-blue-500 text-blue-500 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            <Icon name="lucide:download" class="w-4 h-4" />
            Export
          </button>
          <button 
            @click="handleInputSurvei"
            class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Input Survei
          </button>
        </div>
      </div>
    </div>

    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto">
      <div class="px-4 sm:px-6 pb-4">
        <table class="w-full min-w-[900px]">
          <thead class="bg-blue-100/60 rounded-t-xl">
            <tr>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                NIK
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NAMA
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                JABATAN
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                LEVEL JABATAN
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                LOKASI
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                STATUS
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
              <td class="px-3 sm:px-6 py-4 text-sm text-gray-600 max-w-xs">
                <div class="truncate" :title="item.jabatan">
                  {{ item.jabatan }}
                </div>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                {{ item.levelJabatan }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.lokasi }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                <span 
                  :class="getStatusClass(item.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                >
                  {{ getStatusText(item.status) }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <button 
                    @click="handleView(item)"
                    class="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="View"
                  >
                    <Icon name="lucide:eye" class="w-4 h-4 text-sky-400" />
                  </button>
                  <button 
                    @click="handleEdit(item)"
                    class="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Edit"
                  >
                    <Icon name="lucide:edit" class="w-4 h-4 text-sky-400" />
                  </button>
                  <button 
                    @click="handleDelete(item)"
                    class="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Delete"
                  >
                    <Icon name="lucide:trash-2" class="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="paginatedData.length === 0">
              <td colspan="7" class="px-6 py-16 text-center">
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

    <!-- Input Survei Modal -->
    <div v-if="showInputSurveiModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-blue-500 rounded-t-2xl">
          <h3 class="text-lg font-semibold text-white">Input Survei</h3>
          <button 
            @click="closeInputSurveiModal"
            class="p-2 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <Icon name="lucide:x" class="w-5 h-5 text-white" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-4">
          <form @submit.prevent="submitInputSurvei" class="space-y-4">
            <!-- Row 1: NIK and Nama -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  NIK <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.nik"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Masukkan NIK"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.nama"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            <!-- Row 2: Jabatan and Level Jabatan -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Jabatan <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.jabatan"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Masukkan jabatan"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Level Jabatan <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.levelJabatan"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Masukkan level jabatan"
                />
              </div>
            </div>

            <!-- Row 3: Lokasi and Tanggal Survei -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.lokasi"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                >
                  <option value="">Pilih Lokasi</option>
                  <option v-for="option in lokasiOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Survei <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="formData.tanggalSurvei"
                    type="text"
                    placeholder="Select date"
                    readonly
                    @click="openTanggalSurveiPicker"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer bg-white"
                  />
                  <input 
                    ref="tanggalSurveiInput"
                    type="date"
                    @change="handleTanggalSurveiChange"
                    class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                  />
                  <button
                    type="button"
                    @click="openTanggalSurveiPicker"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Row 4: Jenis Survei and Hasil Survei -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Survei <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.jenisSurvei"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                >
                  <option value="">Pilih Jenis Survei</option>
                  <option v-for="option in jenisSurveiOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Hasil Survei <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.hasilSurvei"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                >
                  <option value="">Pilih Hasil Survei</option>
                  <option v-for="option in hasilSurveiOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Row 5: Catatan -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Catatan
              </label>
              <textarea
                v-model="formData.catatan"
                rows="3"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                placeholder="Masukkan catatan tambahan (opsional)"
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            @click="closeInputSurveiModal"
            type="button"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Batal
          </button>
          <button
            @click="submitInputSurvei"
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Simpan Survei
          </button>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal && viewingItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-blue-500 rounded-t-2xl">
          <h3 class="text-lg font-semibold text-white">Detail Survei</h3>
          <button 
            @click="closeViewModal"
            class="p-2 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <Icon name="lucide:x" class="w-5 h-5 text-white" />
          </button>
        </div>

        <div class="px-6 py-4">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <p class="text-sm text-gray-900 bg-gray-50 p-2 rounded">{{ viewingItem.nik }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                <p class="text-sm text-gray-900 bg-gray-50 p-2 rounded">{{ viewingItem.nama }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
              <p class="text-sm text-gray-900 bg-gray-50 p-2 rounded">{{ viewingItem.jabatan }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Level Jabatan</label>
                <p class="text-sm text-gray-900 bg-gray-50 p-2 rounded">{{ viewingItem.levelJabatan }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <p class="text-sm text-gray-900 bg-gray-50 p-2 rounded">{{ viewingItem.lokasi }}</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span 
                  :class="getStatusClass(viewingItem.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                >
                  {{ getStatusText(viewingItem.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            @click="closeViewModal"
            type="button"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal && editingItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-blue-500 rounded-t-2xl">
          <h3 class="text-lg font-semibold text-white">Edit Survei</h3>
          <button 
            @click="closeEditModal"
            class="p-2 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <Icon name="lucide:x" class="w-5 h-5 text-white" />
          </button>
        </div>

        <div class="px-6 py-4">
          <form @submit.prevent="saveEdit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">NIK</label>
                <input
                  v-model="editData.nik"
                  type="text"
                  readonly
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                <input
                  v-model="editData.nama"
                  type="text"
                  readonly
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Jabatan</label>
              <input
                v-model="editData.jabatan"
                type="text"
                readonly
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Level Jabatan</label>
                <input
                  v-model="editData.levelJabatan"
                  type="text"
                  readonly
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                <select
                  v-model="editData.lokasi"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                >
                  <option v-for="option in lokasiOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Survei</label>
                <select
                  v-model="editData.jenisSurvei"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                >
                  <option v-for="option in jenisSurveiOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Hasil Survei</label>
                <select
                  v-model="editData.hasilSurvei"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                >
                  <option v-for="option in hasilSurveiOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Catatan</label>
              <textarea
                v-model="editData.catatan"
                rows="3"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                placeholder="Masukkan catatan"
              ></textarea>
            </div>
          </form>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            @click="closeEditModal"
            type="button"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Batal
          </button>
          <button
            @click="saveEdit"
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>