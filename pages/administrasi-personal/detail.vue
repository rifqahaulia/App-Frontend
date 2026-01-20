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
        <div class="flex-1 overflow-y-auto bg-white relative">
          <ViewsPersonalDetailContent :employee-id="employeeId" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Detail Personal - Administrasi Personal'
})

const route = useRoute()
const employeeId = computed(() => {
  const id = route.query.id
  if (typeof id === 'string') return id
  if (Array.isArray(id) && id.length > 0) return id[0] || 'default'
  return 'default'
})

const goBack = () => {
  navigateTo('/administrasi-personal')
}

console.log('Detail page loaded with ID:', employeeId.value)
</script>