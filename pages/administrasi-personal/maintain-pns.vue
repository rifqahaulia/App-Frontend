<script setup lang="ts">
useHead({
  title: 'Maintain PNS - Administrasi Personal'
})

const activeTab = ref('personal-pns')
const maintainPNSData = ref([])

const tabs = [
  { id: 'personal-pns', label: 'Personal PNS' },
  { id: 'riwayat-hasil-survei', label: 'Riwayat Hasil Survei' },
  { id: 'verifikasi-kemudahan-pangkat', label: 'Verifikasi Kemudahan Pangkat' }
]

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
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
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Maintain Personal PNS</h1>
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Personal Information</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Maintain PNS</span>
            </div>
          </div>
        </div>

        <!-- Content Container - Scrollable area -->
        <div class="flex-1 overflow-y-auto bg-white relative">
          <div class="p-4 md:p-6">
            <!-- Tabs -->
            <div class="mb-6">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8">
                  <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="setActiveTab(tab.id)"
                    :class="[
                      'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    {{ tab.label }}
                  </button>
                </nav>
              </div>
            </div>

            <!-- Tab Content -->
            <div class="tab-content">
              <!-- Personal PNS Tab -->
              <div v-if="activeTab === 'personal-pns'">
                <TablesMaintainPNSTable :data="maintainPNSData" />
              </div>

              <!-- Riwayat Hasil Survei Tab -->
              <div v-else-if="activeTab === 'riwayat-hasil-survei'">
                <TablesRiwayatHasilSurveiTable />
              </div>

              <!-- Verifikasi Kemudahan Pangkat Tab -->
              <div v-else-if="activeTab === 'verifikasi-kemudahan-pangkat'">
                <TablesVerifikasiKenaikanPangkatTable />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>