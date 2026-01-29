<script setup lang="ts">
import { usePersonalStore } from '~/stores/pa/usePersonalStore'

useHead({
  title: 'Administrasi Personal - Dashboard'
})

const personalStore = usePersonalStore()

onMounted(() => {
  personalStore.fetchPersonals()
})

const tableData = computed(() => {
  return personalStore.personals.map(p => ({
    id: p.id,
    employee: p.name,
    persnum: p.persnum.toString(),
    gender: p.gender === '1' ? 'Laki-laki' : 'Perempuan',
    office: 'Kantor Pusat',
    action: 'Detail',
    position: p.title || 'Karyawan'
  }))
})

const navigateToCreate = () => {
  navigateTo('/administrasi-personal/create')
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
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Informasi Data Personal</h1>
            <div class="hidden md:flex items-center gap-4">
              <button 
                @click="navigateToCreate"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Icon name="lucide:plus" class="w-4 h-4" />
                Tambah Karyawan
              </button>
              <div class="flex items-center text-sm text-gray-500">
                <span>Administrasi Personal</span>
                <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
                <span class="text-gray-900 font-medium">Display</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Container -->
        <div class="flex-1 overflow-y-auto bg-white relative">
          <div class="p-4 md:p-6">
            <!-- Personal Information Table -->
            <TablesPersonalInformationTable :data="tableData" />
            
            <!-- Loading Overlay -->
            <div v-if="personalStore.isLoading" class="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
              <Icon name="lucide:loader-2" class="w-10 h-10 animate-spin text-blue-500" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>