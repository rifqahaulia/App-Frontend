<script setup lang="ts">
const { profile } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-white">
    <LayoutTheNavbar />
    
    <div class="flex">
      <LayoutTheSidebar />
      
      <main class="flex-1 bg-gray-50 p-8">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            Pendidikan dan Pelatihan
          </h1>
          <p class="text-gray-600">
            Halaman ini sedang dalam pengembangan.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>
