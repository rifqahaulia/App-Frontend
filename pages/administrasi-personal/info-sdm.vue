<script setup lang="ts">
useHead({
  title: 'Info SDM - Administrasi Personal'
})

const infoSdmData = ref([])
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
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Info SDM</h1>
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Personal Information</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Info SDM</span>
            </div>
          </div>
        </div>

        <!-- Content Container - Scrollable area -->
        <div class="flex-1 overflow-y-auto bg-white relative">
          <div class="p-4 md:p-6">
            <!-- Content - Info SDM Table -->
            <TablesPersonalInformationTable :data="infoSdmData" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>