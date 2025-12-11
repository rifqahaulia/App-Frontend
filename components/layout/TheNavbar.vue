<script setup lang="ts">
import { navbarMenus } from '~/data/navbarMenuData'

const { profile, logout } = useAuth()
const route = useRoute()

const showUserMenu = ref(false)
const openDropdown = ref<string | null>(null)

  const currentMenuItems = computed(() => {
  const parentPath = '/' + route.path.split('/')[1]   // ambil parent
  return navbarMenus[parentPath] || navbarMenus['/dashboard'] || []
})

// Close dropdown when clicking outside
const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showUserMenu.value = false
  }
  openDropdown.value = null
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

const toggleDropdown = (label: string, event: Event) => {
  event.stopPropagation()
  openDropdown.value = openDropdown.value === label ? null : label
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

      <!-- Center: Navigation Menu (Dynamic based on current page) -->
      <div class="flex items-center gap-8">
        <template v-for="item in currentMenuItems" :key="item.label">
          <!-- Menu without children -->
          <NuxtLink 
            v-if="!item.children && item.path"
            :to="item.path" 
            class="text-white hover:text-blue-100 transition-colors text-sm font-medium"
          >
            {{ item.label }}
          </NuxtLink>
          
          <!-- Menu label without link -->
          <span 
            v-else-if="!item.children"
            class="text-white text-sm font-medium"
          >
            {{ item.label }}
          </span>
          
          <!-- Menu with dropdown -->
          <div v-else class="relative">
            <button 
              @click="toggleDropdown(item.label, $event)"
              class="text-white hover:text-blue-100 transition-colors text-sm font-medium flex items-center gap-1"
            >
              {{ item.label }}
              <Icon 
                name="lucide:chevron-down" 
                class="w-3.5 h-3.5 transition-transform duration-200"
                :class="{ 'rotate-180': openDropdown === item.label }"
              />
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
                v-if="openDropdown === item.label"
                class="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.label"
                  :to="child.path || '#'"
                  class="block px-3 py-1.5 text-gray-700 hover:bg-gray-100 text-xs"
                >
                  {{ child.label }}
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </template>
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
