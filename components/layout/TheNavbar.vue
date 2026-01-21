<script setup lang="ts">
import { navbarMenus } from '~/data/navbarMenuData'
import { sidebarMenuItems } from '~/data/menuData'

const { profile, logout } = useAuth()
const route = useRoute()

const showUserMenu = ref(false)
const openDropdown = ref<string | null>(null)
const showMobileSidebar = ref(false)
const openMobileDropdown = ref<string | null>(null)

const currentMenuItems = computed(() => {
  const parentPath = '/' + route.path.split('/')[1]
  return navbarMenus[parentPath] || navbarMenus['/dashboard'] || []
})

const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  
  // Check if click is inside dropdown or mobile sidebar
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    showUserMenu.value = false
  }
  
  // Check if click is inside mobile sidebar
  const mobileSidebar = document.querySelector('.mobile-sidebar-menu')
  if (mobileSidebar && mobileSidebar.contains(target)) {
    return // Don't close if clicking inside mobile sidebar
  }
  
  openDropdown.value = null
  showMobileSidebar.value = false
  openMobileDropdown.value = null
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
  showMobileSidebar.value = false
  await logout()
}

const toggleMobileDropdown = (label: string, event?: Event) => {
  if (event) {
    event.stopPropagation()
  }
  openMobileDropdown.value = openMobileDropdown.value === label ? null : label
}

const toggleMobileSidebar = (event: Event) => {
  event.stopPropagation()
  showMobileSidebar.value = !showMobileSidebar.value
}

const isActiveRoute = (path: string) => {
  if (path === '/dashboard') {
    return route.path === path
  }
  return route.path === path || route.path.startsWith(path + '/')
}

const handleMenuClick = (menuLabel: string) => {
  // Handle menu clicks for items without specific paths
  console.log(`Menu clicked: ${menuLabel}`)
  
  // You can add specific logic here for different menu items
  switch (menuLabel) {
    case 'Display':
      // Could navigate to a default display page
      navigateTo('/administrasi-personal')
      break
    case 'Transaksi Pegawai':
      navigateTo('/administrasi-personal/transaksi-pegawai')
      break
    case 'Info SDM':
      navigateTo('/administrasi-personal/info-sdm')
      break
    case 'Maintain PNS':
      navigateTo('/administrasi-personal/maintain-pns')
      break
    default:
      // For other menu items, you might want to show a message or do nothing
      console.log(`No specific action defined for: ${menuLabel}`)
  }
}

</script>

<template>
  <nav class="bg-blue-500 shadow-md relative z-50">
    <div class="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3">
      <!-- Left: Logo & App Name -->
      <div class="flex items-center gap-2 sm:gap-3">
        <img src="/logoApp.png" alt="Logo" class="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover" />
        <span class="text-white font-bold text-lg sm:text-xl">APP</span>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMobileSidebar"
        class="md:hidden w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center border-2 border-white/30"
        type="button"
      >
        <Icon :name="showMobileSidebar ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6 text-white" />
      </button>

      <!-- Center: Navigation Menu (Desktop) -->
      <div class="hidden md:flex items-center gap-4 lg:gap-8">
        <template v-for="item in currentMenuItems" :key="item.label">
          <!-- Menu without children -->
          <NuxtLink 
            v-if="!item.children && item.path"
            :to="item.path" 
            class="text-white hover:text-blue-100 transition-colors text-sm font-medium whitespace-nowrap"
          >
            {{ item.label }}
          </NuxtLink>
          
          <!-- Menu label without link -->
          <span 
            v-else-if="!item.children"
            class="text-white text-sm font-medium whitespace-nowrap"
          >
            {{ item.label }}
          </span>
          
          <!-- Menu with dropdown -->
          <div v-else class="relative">
            <button 
              @click="toggleDropdown(item.label, $event)"
              class="text-white hover:text-blue-100 transition-colors text-sm font-medium flex items-center gap-1 whitespace-nowrap"
            >
              {{ item.label }}
              <svg 
                class="w-3.5 h-3.5 transition-transform duration-200"
                :class="{ 'rotate-180': openDropdown === item.label }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
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

      <!-- Right: User Info & Actions (Desktop) -->
      <div class="hidden md:flex items-center gap-2 lg:gap-3">
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
            <div class="text-right hidden lg:block">
              <p class="text-xs font-semibold leading-tight">{{ profile?.data?.name || 'Bagus Wicaksono' }}</p>
              <p class="text-[10px] text-blue-100 leading-tight">Super Admin</p>
            </div>
            <div class="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-orange-500 flex items-center justify-center">
              <Icon name="lucide:user" class="w-4 h-4 lg:w-5 lg:h-5 text-white" />
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

    <!-- Mobile Sidebar Menu -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div 
        v-if="showMobileSidebar"
        class="mobile-sidebar-menu md:hidden absolute top-full left-0 right-0 bg-blue-600 border-t border-blue-400 z-50 shadow-lg"
        @click.stop
      >
        <div class="px-4 py-3 space-y-3 max-h-96 overflow-y-auto">
          <!-- User Profile -->
          <div class="flex items-center gap-3 text-white border-b border-blue-500 pb-3">
            <div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <Icon name="lucide:user" class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="text-sm font-semibold">{{ profile?.data?.name || 'Bagus Wicaksono' }}</p>
              <p class="text-xs text-blue-100">Super Admin</p>
            </div>
          </div>

          <!-- Current Page Menu (Navbar Items) -->
          <div class="space-y-2">
            <h3 v-if="currentMenuItems.length > 0" class="text-xs font-semibold text-blue-100 uppercase tracking-wide">Menu</h3>
            <div v-if="currentMenuItems.length === 0" class="text-center py-4">
              <p class="text-blue-100 text-sm">No menu items available</p>
            </div>
            <template v-for="item in currentMenuItems" :key="item.label">
              <!-- Menu without children but with path -->
              <NuxtLink 
                v-if="!item.children && item.path"
                :to="item.path" 
                @click="showMobileSidebar = false"
                class="block text-blue-100 hover:text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors text-sm"
              >
                {{ item.label }}
              </NuxtLink>
              
              <!-- Menu without children and without path (clickable but no navigation) -->
              <button 
                v-else-if="!item.children"
                @click="handleMenuClick(item.label); showMobileSidebar = false"
                class="w-full text-left text-blue-100 hover:text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors text-sm"
              >
                {{ item.label }}
              </button>
              
              <!-- Menu with dropdown -->
              <div v-else class="space-y-1">
                <button 
                  @click.stop="toggleMobileDropdown(item.label, $event)"
                  class="w-full text-left text-blue-100 hover:text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-between"
                >
                  {{ item.label }}
                  <Icon 
                    name="lucide:chevron-down" 
                    class="w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-180': openMobileDropdown === item.label }"
                  />
                </button>
                
                <!-- Mobile Dropdown Items -->
                <div v-if="openMobileDropdown === item.label" class="pl-4 space-y-1">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.label"
                    :to="child.path || '#'"
                    @click="showMobileSidebar = false"
                    class="block text-blue-200 hover:text-white hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors text-sm"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </div>
              </div>
            </template>
          </div>

          <!-- Action Buttons -->
          <div class="border-t border-blue-500 pt-3 space-y-2">
            <div class="flex items-center gap-2">
              <button 
                type="button"
                class="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors text-white"
              >
                <Icon name="lucide:search" class="w-4 h-4" />
                <span class="text-xs">Search</span>
              </button>
              <button 
                type="button"
                class="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors text-white"
              >
                <Icon name="lucide:mail" class="w-4 h-4" />
                <span class="text-xs">Messages</span>
              </button>
              <button 
                type="button"
                class="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors text-white"
              >
                <Icon name="lucide:bell" class="w-4 h-4" />
                <span class="text-xs">Notifications</span>
              </button>
            </div>
            
            <button 
              type="button"
              @click="handleLogout"
              class="w-full flex items-center justify-center gap-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-white"
            >
              <Icon name="lucide:log-out" class="w-4 h-4" />
              <span class="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Ensure smooth transitions */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile sidebar overlay */
.mobile-sidebar-overlay {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.3);
}

/* Ensure proper stacking and visibility */
nav {
  position: relative;
  z-index: 50;
}

/* Mobile menu container */
.mobile-menu-container {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}

/* Scrollbar styling for mobile menu */
.mobile-menu-container::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-menu-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.mobile-menu-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
