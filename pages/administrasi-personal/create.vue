<script setup lang="ts">
import { usePersonalStore } from '~/stores/pa/usePersonalStore'

useHead({
  title: 'Tambah Data Personal - Administrasi Personal'
})

const router = useRouter()
const personalStore = usePersonalStore()

const handleSuccess = (data: any) => {
  console.log('Successfully created:', data)
  // Redirect to display page or show success message
  router.push('/administrasi-personal')
}

const handleCancel = () => {
  router.back()
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
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Tambah Data Personal</h1>
            <div class="hidden md:flex items-center text-sm text-gray-500">
              <span>Administrasi Personal</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium">Create</span>
            </div>
          </div>
        </div>

        <!-- Content Container -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
          <div class="max-w-4xl mx-auto">
            <div class="mb-6 flex items-center justify-between">
              <button 
                @click="handleCancel"
                class="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Icon name="lucide:arrow-left" class="w-4 h-4 mr-1" />
                Kembali ke Daftar
              </button>
            </div>

            <FormsPersonalInformationForm 
              @success="handleSuccess"
              @cancel="handleCancel"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
