<script setup lang="ts">
// pages/pengelolaan-organisasi/report-evaluasi.vue

useHead({
  title: 'Report Evaluasi'
})

const selectedYear = ref('Tahun 2024')
</script>

<template>
  <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
    <LayoutTheNavbar />
    
    <div class="flex flex-1 overflow-hidden">
      <LayoutTheSidebar />
      
      <main class="flex-1 flex flex-col overflow-hidden">
        <div class="px-4 md:px-6 py-4 border-b bg-white flex-shrink-0">
          <div class="flex items-center justify-between">
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Report Evaluasi</h1>
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Organisasi</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span>Report</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Report Evaluasi</span>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto bg-white relative">
          <div class="p-4 md:p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="relative">
                <select 
                  v-model="selectedYear"
                  class="px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-10"
                >
                  <option>Tahun 2024</option>
                  <option>Tahun 2023</option>
                  <option>Tahun 2022</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </div>

            <TablesReportEvaluasiTable />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
