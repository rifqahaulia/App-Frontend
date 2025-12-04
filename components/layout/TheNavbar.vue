<script setup lang="ts">
const { profile, logout } = useAuth()

const showUserMenu = ref(false)

// Close dropdown when clicking outside
const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleUserMenu = (event: Event) => {
  event.stopPropagation()
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = async (event: Event) => {
  event.stopPropagation()
  showUserMenu.value = false
  await logout()
}
</script>

<template>
  <nav class="bg-blue-500 shadow-md">
    <div class="flex items-center justify-between px-6 py-3">
      <!-- Left: Logo & App Name -->
      <div class="flex items-center gap-3">
        <img src="/logoApp.png" alt="Logo" class="h-10 w-10 rounded-full object-cover" />
        <span class="text-white font-bold text-xl">APP</span>
      </div>

      <!-- Center: Navigation Menu -->
      <div class="flex items-center gap-8">
        <NuxtLink 
          to="/dashboard" 
          class="text-white hover:text-blue-100 transition-colors text-sm font-medium"
        >
          Activity
        </NuxtLink>
        <div class="relative group">
          <button class="text-white hover:text-blue-100 transition-colors text-sm font-medium flex items-center gap-1">
            Laporan
            <Icon name="lucide:chevron-down" class="w-3.5 h-3.5" />
          </button>
        </div>
        <div class="relative group">
          <button class="text-white hover:text-blue-100 transition-colors text-sm font-medium flex items-center gap-1">
            Pengaturan
            <Icon name="lucide:chevron-down" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Right: User Info & Actions -->
      <div class="flex items-center gap-3">
          <!-- Search Icon -->
          <button 
            type="button"
            class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
          >
            <Icon name="lucide:search" class="w-4 h-4 text-white" />
          </button>

          <!-- Messages -->
          <button 
            type="button"
            class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
          >
            <Icon name="lucide:mail" class="w-4 h-4 text-white" />
          </button>

          <!-- Notifications -->
          <button 
            type="button"
            class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
          >
            <Icon name="lucide:bell" class="w-4 h-4 text-white" />
          </button>

          <!-- User Profile -->
          <div class="relative" ref="dropdownRef">
            <button 
              type="button"
              @click="toggleUserMenu"
              class="flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
            >
              <Icon name="lucide:chevron-down" class="w-3.5 h-3.5" />
              <div class="text-right">
                <p class="text-xs font-semibold leading-tight">{{ profile?.data?.name || 'Bagus Wicaksono' }}</p>
                <p class="text-[10px] text-blue-100 leading-tight">Super Admin</p>
              </div>
              <div class="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center">
                <Icon name="lucide:user" class="w-5 h-5 text-white" />
              </div>
            </button>

            <!-- Dropdown Menu -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
              >
                <button 
                  type="button"
                  @click="handleLogout"
                  class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm"
                >
                  <Icon name="lucide:log-out" class="w-4 h-4" />
                  Logout
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
  </nav>
</template>
