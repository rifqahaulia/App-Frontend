<script setup lang="ts">
// pages/pengelolaan-organisasi/formasi-sdm.vue

// Set page title
useHead({
  title: 'Formasi SDM - Pengelolaan Organisasi'
})
</script>

<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <LayoutTheNavbar />
    
    <div class="flex flex-1">
      <LayoutTheSidebar />
      
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Header - Fixed -->
        <div class="px-4 md:px-6 py-4 border-b bg-white flex-shrink-0">
          <div class="flex items-center justify-between">
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Formasi SDM</h1>
            <!-- Breadcrumb -->
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Organisasi</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span>Report</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Formasi SDM</span>
            </div>
          </div>
        </div>

        <!-- Content - Scrollable -->
        <div class="flex-1 overflow-y-auto bg-gray-50">
          <div class="p-4 md:p-6">
            <!-- Content - Panggil Component -->
            <FormasiSDMContent />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>