<script setup lang="ts">
const { setTokens } = useAuth()
const route = useRoute()

onMounted(() => {
  const token = route.fullPath.split('/auth/')[1]
  if (token) {
    setTokens(token, '')
    navigateTo('/dashboard')
  } else {
    navigateTo('/')
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
      <p class="text-white text-xl font-semibold">Memproses login...</p>
      <p class="text-blue-100 text-sm mt-2">Mohon tunggu sebentar</p>
    </div>
  </div>
</template>
