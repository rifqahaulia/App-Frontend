<script setup lang="ts">
useHead({
  title: 'Submit Data - Data Kodal - Administrasi Personal'
})

const submitDataData = ref([])
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
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Submit Data</h1>
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Data Kodal</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Submit Data</span>
            </div>
          </div>
        </div>

        <!-- Content Container - Scrollable area -->
        <div class="flex-1 overflow-y-auto bg-white relative">
          <div class="p-4 md:p-6">
            <!-- Content Placeholder -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6">
              <div class="text-center py-12">
                <Icon name="lucide:send" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Submit Data</h3>
                <p class="text-gray-600">Halaman submit data sedang dalam pengembangan</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>