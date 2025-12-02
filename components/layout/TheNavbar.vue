<script setup lang="ts">
const { profile, logout } = useAuth()
const isLoggingOut = ref(false)

const handleLogout = async () => {
  isLoggingOut.value = true
  await logout()
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Aplikasi Perkantoran</h1>
        <p class="text-sm text-gray-500">Sistem Manajemen Terintegrasi</p>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="text-sm font-semibold text-gray-800">
            {{ profile?.data?.name || profile?.data?.username || 'User' }}
          </p>
          <p class="text-xs text-gray-500">{{ profile?.data?.email || '' }}</p>
        </div>
        
        <button
          @click="handleLogout"
          :disabled="isLoggingOut"
          class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          <Icon v-if="!isLoggingOut" name="lucide:log-out" class="w-4 h-4" />
          <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>{{ isLoggingOut ? 'Logging out...' : 'Logout' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
