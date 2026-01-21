<script setup lang="ts">

interface InputDataKodal {
  nama: string
  nip: string
  pangkat: string
  jabatan: string
  honor: string
  lokasi: string
}

interface Props {
  data?: InputDataKodal[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingItem = ref<InputDataKodal | null>(null)

const selectedLokasi = ref('')
const selectedBulan = ref('')
const selectedTahun = ref('')
const selectedOrderBy = ref('')

const createTglBerlakuInput = ref<HTMLInputElement | null>(null)
const createTglBerakhirInput = ref<HTMLInputElement | null>(null)
const createTglBerakhirRatingInput = ref<HTMLInputElement | null>(null)
const createTglBerakhirIELTSTOEFLInput = ref<HTMLInputElement | null>(null)
const createTglBerakhirMedicalCheckupInput = ref<HTMLInputElement | null>(null)

const itemsPerPageOptions = [5, 10, 15, 20, 25, 50]

const dummyData: InputDataKodal[] = [
  {
    nama: 'Lestari Agus Wibowo',
    nip: '123456789',
    pangkat: 'Letda Inf',
    jabatan: 'Komandan Dalam',
    honor: 'Rp4.237.300',
    lokasi: 'Harian (PPNP) Cabang JATSC'
  },
  {
    nama: 'Mayor Satria Pratama',
    nip: '123456789',
    pangkat: 'Mayor Kav',
    jabatan: 'Komandan Dalam',
    honor: 'Rp2.580.900',
    lokasi: 'Syamsuddin Noor-Banjarmasin'
  },
  {
    nama: 'Kapten Doni Santoso',
    nip: '123456789',
    pangkat: 'Letda Inf',
    jabatan: 'Komandan Dalam',
    honor: 'Rp1.189.700',
    lokasi: 'Syamsuddin Noor-Banjarmasin'
  },
  {
    nama: 'Letda Budi Hartono',
    nip: '123456789',
    pangkat: 'Mayor Kav',
    jabatan: 'Komandan Dalam',
    honor: 'Rp987.600',
    lokasi: 'Syamsuddin Noor-Banjarmasin'
  },
  {
    nama: 'Serda Ahmad Wijaya',
    nip: '123456789',
    pangkat: 'Letda Inf',
    jabatan: 'Komandan Dalam',
    honor: 'Rp1.500.000',
    lokasi: 'Harian (PPNP) Cabang JATSC'
  },
  {
    nama: 'Kopda Sari Indah',
    nip: '123456789',
    pangkat: 'Mayor Kav',
    jabatan: 'Komandan Dalam',
    honor: 'Rp2.100.000',
    lokasi: 'Syamsuddin Noor-Banjarmasin'
  }
]

// Use props data if available, otherwise use dummy data
const inputDataKodalData = computed(() => 
  props.data && props.data.length > 0 ? props.data : dummyData
)

// Filter data based on search and filters
const filteredData = computed(() => {
  let filtered = inputDataKodalData.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.nama.toLowerCase().includes(query) ||
      item.nip.toLowerCase().includes(query) ||
      item.pangkat.toLowerCase().includes(query) ||
      item.jabatan.toLowerCase().includes(query) ||
      item.honor.toLowerCase().includes(query) ||
      item.lokasi.toLowerCase().includes(query)
    )
  }

  // Apply lokasi filter
  if (selectedLokasi.value) {
    filtered = filtered.filter(item => 
      item.lokasi.toLowerCase().includes(selectedLokasi.value.toLowerCase())
    )
  }

  // Apply bulan filter (you can extend this based on your data structure)
  if (selectedBulan.value) {
    // This would filter based on a date field if you have one
    // For now, it's just a placeholder
  }

  // Apply tahun filter (you can extend this based on your data structure)
  if (selectedTahun.value) {
    // This would filter based on a date field if you have one
    // For now, it's just a placeholder
  }

  // Apply order by
  if (selectedOrderBy.value) {
    switch (selectedOrderBy.value) {
      case 'nama_asc':
        filtered = [...filtered].sort((a, b) => a.nama.localeCompare(b.nama))
        break
      case 'nama_desc':
        filtered = [...filtered].sort((a, b) => b.nama.localeCompare(a.nama))
        break
      case 'tanggal_asc':
        // Sort by date if you have date field
        break
      case 'tanggal_desc':
        // Sort by date if you have date field
        break
    }
  }

  return filtered
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

// Reset to page 1 when filters change
watch([selectedLokasi, selectedBulan, selectedTahun, selectedOrderBy], () => {
  currentPage.value = 1
})

// Create modal data
const createData = ref({
  bulan: '',
  tahun: '',
  namaLengkap: '',
  nrpNik: '',
  jenisKelamin: '',
  tempatLahir: '',
  tglLahir: '',
  pangkat: '',
  jabatan: '',
  lokasiKedudukan: '',
  jenisLisensi: '',
  noLisensi: '',
  tglBerakhirLisensi: '',
  saumurHidup: false,
  jenisRating: '',
  tglBerakhirRating: '',
  levelScore: '',
  tglBerakhirIELTSTOEFL: '',
  tglBerakhirMedicalCheckup: '',
  honor: '',
  bank: '',
  noRekening: '',
  namaNasabah: '',
  keterangan: ''
})

// Edit modal data
const editData = ref({
  nama: '',
  nip: '',
  pangkat: '',
  jabatan: '',
  honor: '',
  lokasi: ''
})

// Dropdown options
const filterLokasiOptions = [
  { value: '', label: 'Semua Lokasi' },
  { value: 'jakarta', label: 'Jakarta' },
  { value: 'surabaya', label: 'Surabaya' },
  { value: 'bandung', label: 'Bandung' }
]

const filterBulanOptions = [
  { value: '', label: 'Semua Bulan' },
  { value: 'januari', label: 'Januari' },
  { value: 'februari', label: 'Februari' },
  { value: 'maret', label: 'Maret' },
  { value: 'april', label: 'April' },
  { value: 'mei', label: 'Mei' },
  { value: 'juni', label: 'Juni' },
  { value: 'juli', label: 'Juli' },
  { value: 'agustus', label: 'Agustus' },
  { value: 'september', label: 'September' },
  { value: 'oktober', label: 'Oktober' },
  { value: 'november', label: 'November' },
  { value: 'desember', label: 'Desember' }
]

const filterTahunOptions = [
  { value: '', label: 'Semua Tahun' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' }
]

const orderByOptions = [
  { value: '', label: 'Order by' },
  { value: 'nama_asc', label: 'Nama A-Z' },
  { value: 'nama_desc', label: 'Nama Z-A' },
  { value: 'tanggal_asc', label: 'Tanggal Terlama' },
  { value: 'tanggal_desc', label: 'Tanggal Terbaru' }
]

const bulanOptions = [
  { value: 'januari', label: 'Januari' },
  { value: 'februari', label: 'Februari' },
  { value: 'maret', label: 'Maret' },
  { value: 'april', label: 'April' },
  { value: 'mei', label: 'Mei' },
  { value: 'juni', label: 'Juni' },
  { value: 'juli', label: 'Juli' },
  { value: 'agustus', label: 'Agustus' },
  { value: 'september', label: 'September' },
  { value: 'oktober', label: 'Oktober' },
  { value: 'november', label: 'November' },
  { value: 'desember', label: 'Desember' }
]

const tahunOptions = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' }
]

const jenisKelaminOptions = [
  { value: 'laki-laki', label: 'Laki-laki' },
  { value: 'perempuan', label: 'Perempuan' }
]

const pangkatOptions = [
  { value: 'pangkat', label: 'Pangkat' },
  { value: 'letda_inf', label: 'Letda Inf' },
  { value: 'mayor_kav', label: 'Mayor Kav' },
  { value: 'kapten', label: 'Kapten' }
]

const jabatanOptions = [
  { value: 'jabatan', label: 'Jabatan' },
  { value: 'komandan_dalam', label: 'Komandan Dalam' },
  { value: 'wakil_komandan', label: 'Wakil Komandan' }
]

const lokasiOptions = [
  { value: 'pilih_lokasi_kerja', label: 'Pilih Lokasi Kerja' },
  { value: 'jakarta', label: 'Jakarta' },
  { value: 'surabaya', label: 'Surabaya' },
  { value: 'bandung', label: 'Bandung' }
]

const jenisLisensiOptions = [
  { value: 'jenis_lisensi', label: 'Jenis Lisensi' },
  { value: 'lisensi_a', label: 'Lisensi A' },
  { value: 'lisensi_b', label: 'Lisensi B' }
]

const jenisRatingOptions = [
  { value: 'jenis_rating', label: 'Jenis Rating' },
  { value: 'rating_a', label: 'Rating A' },
  { value: 'rating_b', label: 'Rating B' }
]

const bankOptions = [
  { value: 'pilih_bank', label: 'Pilih Bank' },
  { value: 'bca', label: 'BCA' },
  { value: 'mandiri', label: 'Mandiri' },
  { value: 'bni', label: 'BNI' },
  { value: 'bri', label: 'BRI' }
]

// Date picker functions for Create modal
const openCreateTglBerlakuPicker = () => {
  if (createTglBerlakuInput.value) {
    createTglBerlakuInput.value.focus()
    createTglBerlakuInput.value.click()
    if (createTglBerlakuInput.value.showPicker) {
      createTglBerlakuInput.value.showPicker()
    }
  }
}

const openCreateTglBerakhirPicker = () => {
  if (createTglBerakhirInput.value) {
    createTglBerakhirInput.value.focus()
    createTglBerakhirInput.value.click()
    if (createTglBerakhirInput.value.showPicker) {
      createTglBerakhirInput.value.showPicker()
    }
  }
}

const openCreateTglBerakhirRatingPicker = () => {
  if (createTglBerakhirRatingInput.value) {
    createTglBerakhirRatingInput.value.focus()
    createTglBerakhirRatingInput.value.click()
    if (createTglBerakhirRatingInput.value.showPicker) {
      createTglBerakhirRatingInput.value.showPicker()
    }
  }
}

const openCreateTglBerakhirIELTSTOEFLPicker = () => {
  if (createTglBerakhirIELTSTOEFLInput.value) {
    createTglBerakhirIELTSTOEFLInput.value.focus()
    createTglBerakhirIELTSTOEFLInput.value.click()
    if (createTglBerakhirIELTSTOEFLInput.value.showPicker) {
      createTglBerakhirIELTSTOEFLInput.value.showPicker()
    }
  }
}

const openCreateTglBerakhirMedicalCheckupPicker = () => {
  if (createTglBerakhirMedicalCheckupInput.value) {
    createTglBerakhirMedicalCheckupInput.value.focus()
    createTglBerakhirMedicalCheckupInput.value.click()
    if (createTglBerakhirMedicalCheckupInput.value.showPicker) {
      createTglBerakhirMedicalCheckupInput.value.showPicker()
    }
  }
}

const handleCreateTglBerlakuChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tglLahir = target.value
  }
}

const handleCreateTglBerakhirChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tglBerakhirLisensi = target.value
  }
}

const handleCreateTglBerakhirRatingChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tglBerakhirRating = target.value
  }
}

const handleCreateTglBerakhirIELTSTOEFLChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tglBerakhirIELTSTOEFL = target.value
  }
}

const handleCreateTglBerakhirMedicalCheckupChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    createData.value.tglBerakhirMedicalCheckup = target.value
  }
}

// Modal functions
const handleCreate = () => {
  createData.value = {
    bulan: '',
    tahun: '',
    namaLengkap: '',
    nrpNik: '',
    jenisKelamin: '',
    tempatLahir: '',
    tglLahir: '',
    pangkat: '',
    jabatan: '',
    lokasiKedudukan: '',
    jenisLisensi: '',
    noLisensi: '',
    tglBerakhirLisensi: '',
    saumurHidup: false,
    jenisRating: '',
    tglBerakhirRating: '',
    levelScore: '',
    tglBerakhirIELTSTOEFL: '',
    tglBerakhirMedicalCheckup: '',
    honor: '',
    bank: '',
    noRekening: '',
    namaNasabah: '',
    keterangan: ''
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const saveCreate = () => {
  console.log('Creating input data kodal:', createData.value)
  closeCreateModal()
}

const handleView = (item: InputDataKodal) => {
  editingItem.value = item
  editData.value = { ...item }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
}

const saveEdit = () => {
  console.log('Editing input data kodal:', editData.value)
  closeEditModal()
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
    <!-- Header with Search, Filters and Create Button -->
    <div class="px-4 sm:px-6 py-4 bg-white rounded-t-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <!-- Left Side: Search and Filters -->
      <div class="flex flex-wrap items-center gap-3 flex-1">
        <!-- Search Box -->
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

        <!-- Bulan Filter -->
        <div class="min-w-[120px]">
          <select 
            v-model="selectedBulan"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
          >
            <option value="">Oktober</option>
            <option v-for="option in filterBulanOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Tahun Filter -->
        <div class="min-w-[100px]">
          <select 
            v-model="selectedTahun"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
          >
            <option value="">2024</option>
            <option v-for="option in filterTahunOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Order By Filter -->
        <div class="min-w-[120px]">
          <select 
            v-model="selectedOrderBy"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white"
          >
            <option v-for="option in orderByOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Right Side: Create Button -->
      <div class="flex-shrink-0">
        <button 
          @click="handleCreate"
          class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          <Icon name="lucide:plus" class="w-4 h-4" />
          Tambah Data
        </button>
      </div>
    </div>

    <!-- Table Container with Horizontal Scroll -->
    <div class="overflow-x-auto">
      <div class="px-4 sm:px-6 pb-4">
        <table class="w-full min-w-[800px]">
          <thead class="bg-blue-100/60 rounded-t-xl">
            <tr>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide first:rounded-tl-xl">
                NO
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NAMA
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                NIP
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                PANGKAT
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                JABATAN
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                HONOR (RP)
              </th>
              <th class="px-3 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide">
                LOKASI
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
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                <span class="hidden sm:inline">{{ item.nama }}</span>
                <span class="sm:hidden">{{ item.nama.length > 15 ? item.nama.substring(0, 15) + '...' : item.nama }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.nip }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.pangkat }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span class="hidden sm:inline">{{ item.jabatan }}</span>
                <span class="sm:hidden">{{ item.jabatan.length > 10 ? item.jabatan.substring(0, 10) + '...' : item.jabatan }}</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ item.honor }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span class="hidden sm:inline">{{ item.lokasi }}</span>
                <span class="sm:hidden">{{ item.lokasi.length > 15 ? item.lokasi.substring(0, 15) + '...' : item.lokasi }}</span>
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
              <td colspan="8" class="px-6 py-16 text-center">
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

  <!-- Create Modal -->
  <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">Tambah Data Kodal</h3>
        <button @click="closeCreateModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4 sm:p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto">
        <!-- Periode Section -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-3">Periode</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bulan</label>
              <select 
                v-model="createData.bulan"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">November</option>
                <option v-for="option in bulanOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
              <select 
                v-model="createData.tahun"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">2024</option>
                <option v-for="option in tahunOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Data Personal Section -->
        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Data Personal</h4>
          
          <!-- Nama Lengkap -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input 
              v-model="createData.namaLengkap"
              type="text" 
              placeholder="Nama"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- NRP/NIK & Jenis Kelamin -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">NRP/NIK</label>
              <input 
                v-model="createData.nrpNik"
                type="text" 
                placeholder="Nrp/Nik"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
              <select 
                v-model="createData.jenisKelamin"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Laki-laki</option>
                <option v-for="option in jenisKelaminOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Tempat Lahir & Tgl Lahir -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir</label>
              <input 
                v-model="createData.tempatLahir"
                type="text" 
                placeholder="Tempat Lahir"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Lahir</label>
              <div class="relative">
                <input 
                  v-model="createData.tglLahir"
                  type="text"
                  placeholder="Select Date"
                  readonly
                  @click="openCreateTglBerlakuPicker"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
                />
                <input 
                  ref="createTglBerlakuInput"
                  type="date"
                  @change="handleCreateTglBerlakuChange"
                  class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                />
                <button
                  type="button"
                  @click="openCreateTglBerlakuPicker"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Pangkat & Jabatan -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Pangkat</label>
              <select 
                v-model="createData.pangkat"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pangkat</option>
                <option v-for="option in pangkatOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Jabatan</label>
              <select 
                v-model="createData.jabatan"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Jabatan</option>
                <option v-for="option in jabatanOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Lokasi Kedudukan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi Kedudukan</label>
            <select 
              v-model="createData.lokasiKedudukan"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Pilih Lokasi Kerja</option>
              <option v-for="option in lokasiOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Lisensi Section -->
        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Lisensi</h4>
          
          <!-- Jenis Lisensi & No Lisensi -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Lisensi</label>
              <select 
                v-model="createData.jenisLisensi"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Jenis</option>
                <option v-for="option in jenisLisensiOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No Lisensi</label>
              <input 
                v-model="createData.noLisensi"
                type="text" 
                placeholder="No Lisensi"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Tgl Berakhir Lisensi & Saumur Hidup -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Berakhir Lisensi</label>
              <div class="relative">
                <input 
                  v-model="createData.tglBerakhirLisensi"
                  type="text"
                  placeholder="Select Date"
                  readonly
                  @click="openCreateTglBerakhirPicker"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
                />
                <input 
                  ref="createTglBerakhirInput"
                  type="date"
                  @change="handleCreateTglBerakhirChange"
                  class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                />
                <button
                  type="button"
                  @click="openCreateTglBerakhirPicker"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="flex items-center pt-6">
              <input 
                v-model="createData.saumurHidup"
                type="checkbox"
                id="saumurHidup"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label for="saumurHidup" class="ml-2 text-sm text-gray-700">
                Saumur Hidup
                <div class="text-xs text-gray-500">Ceklis apabila berlaku saumur hidup</div>
              </label>
            </div>
          </div>
        </div>

        <!-- Rating Section -->
        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Rating</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Rating</label>
              <select 
                v-model="createData.jenisRating"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Jenis</option>
                <option v-for="option in jenisRatingOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Berakhir Rating</label>
              <div class="relative">
                <input 
                  v-model="createData.tglBerakhirRating"
                  type="text"
                  placeholder="Select Date"
                  readonly
                  @click="openCreateTglBerakhirRatingPicker"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
                />
                <input 
                  ref="createTglBerakhirRatingInput"
                  type="date"
                  @change="handleCreateTglBerakhirRatingChange"
                  class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                />
                <button
                  type="button"
                  @click="openCreateTglBerakhirRatingPicker"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- IELTS/TOEFL Section -->
        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">IELTS/TOEFL</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Level/Score</label>
              <input 
                v-model="createData.levelScore"
                type="text" 
                placeholder="Jenis"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Berakhir IELTS/TOEFL</label>
              <div class="relative">
                <input 
                  v-model="createData.tglBerakhirIELTSTOEFL"
                  type="text"
                  placeholder="Select Date"
                  readonly
                  @click="openCreateTglBerakhirIELTSTOEFLPicker"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
                />
                <input 
                  ref="createTglBerakhirIELTSTOEFLInput"
                  type="date"
                  @change="handleCreateTglBerakhirIELTSTOEFLChange"
                  class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                />
                <button
                  type="button"
                  @click="openCreateTglBerakhirIELTSTOEFLPicker"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Medical Checkup Section -->
        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Medical Checkup</h4>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tgl Berakhir Medical Checkup</label>
            <div class="relative">
              <input 
                v-model="createData.tglBerakhirMedicalCheckup"
                type="text"
                placeholder="Select Date"
                readonly
                @click="openCreateTglBerakhirMedicalCheckupPicker"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
              />
              <input 
                ref="createTglBerakhirMedicalCheckupInput"
                type="date"
                @change="handleCreateTglBerakhirMedicalCheckupChange"
                class="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
              />
              <button
                type="button"
                @click="openCreateTglBerakhirMedicalCheckupPicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Honorium Section -->
        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Honorium</h4>
          
          <!-- Honor & Bank -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Honor</label>
              <input 
                v-model="createData.honor"
                type="text" 
                placeholder="Honor"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bank</label>
              <select 
                v-model="createData.bank"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Bank</option>
                <option v-for="option in bankOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- No Rekening & Nama Nasabah -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No Rekening</label>
              <input 
                v-model="createData.noRekening"
                type="text" 
                placeholder="Nomor"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Nasabah</label>
              <input 
                v-model="createData.namaNasabah"
                type="text" 
                placeholder="Nama Nasabah"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Keterangan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
            <textarea 
              v-model="createData.keterangan"
              rows="3"
              placeholder="Keterangan"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex flex-col sm:flex-row justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200">
        <button 
          @click="closeCreateModal" 
          class="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
        >
          Cancel
        </button>
        <button 
          @click="saveCreate" 
          class="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors order-1 sm:order-2"
        >
          Save
        </button>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-4 bg-blue-500 rounded-t-lg">
        <h3 class="text-lg font-semibold text-white">View Data Kodal</h3>
        <button @click="closeEditModal" class="text-white hover:text-gray-200 transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4 sm:p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto">
        <!-- Row 1: Nama & NIP -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama</label>
            <input 
              v-model="editData.nama"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">NIP</label>
            <input 
              v-model="editData.nip"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Row 2: Pangkat & Jabatan -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Pangkat</label>
            <select 
              v-model="editData.pangkat"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Pilih Pangkat</option>
              <option v-for="option in pangkatOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jabatan</label>
            <select 
              v-model="editData.jabatan"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Pilih Jabatan</option>
              <option v-for="option in jabatanOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Row 3: Honor & Lokasi -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Honor (Rp)</label>
            <input 
              v-model="editData.honor"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
            <select 
              v-model="editData.lokasi"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Pilih Lokasi</option>
              <option v-for="option in lokasiOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex flex-col sm:flex-row justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200">
        <button 
          @click="closeEditModal" 
          class="px-6 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50 order-2 sm:order-1"
        >
          Cancel
        </button>
        <button 
          @click="saveEdit" 
          class="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors order-1 sm:order-2"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>