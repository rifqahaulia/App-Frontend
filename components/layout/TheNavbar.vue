<script setup lang="ts">
import { navbarMenus } from '~/data/navbarMenuData'
import { sidebarMenuItems } from '~/data/menuData'

const { profile, logout } = useAuth()
const route = useRoute()

const showUserMenu = ref(false)
const openDropdown = ref<string | null>(null)
const showMobileMenu = ref(false)
const showMobileSidebar = ref(false)

// Watch for changes in showMobileSidebar
watch(showMobileSidebar, (newVal) => {
  console.log('showMobileSidebar changed to:', newVal)
})
const openMobileDropdown = ref<string | null>(null)

  const currentMenuItems = computed(() => {
  const parentPath = '/' + route.path.split('/')[1]   // ambil parent
  return navbarMenus[parentPath] || navbarMenus['/dashboard'] || []
})

const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showUserMenu.value = false
  }
  openDropdown.value = null
  showMobileMenu.value = false
  
  if (showMobileSidebar.value) {
    showMobileSidebar.value = false
    if (typeof window !== 'undefined') {
      document.body.classList.remove('mobile-sidebar-open')
    }
  }
  
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
  showMobileMenu.value = false
  
  if (showMobileSidebar.value) {
    showMobileSidebar.value = false
    if (typeof window !== 'undefined') {
      document.body.classList.remove('mobile-sidebar-open')
    }
  }
  
  await logout()
}

const toggleMobileDropdown = (label: string) => {
  openMobileDropdown.value = openMobileDropdown.value === label ? null : label
}

const toggleMobileSidebar = () => {
  console.log('Burger clicked! Current state:', showMobileSidebar.value)
  showMobileSidebar.value = !showMobileSidebar.value
  console.log('New state:', showMobileSidebar.value)
}

// Check if route is active for sidebar items
const isActiveRoute = (path: string) => {
  if (path === '/dashboard') {
    return route.path === path
  }
  return route.path === path || route.path.startsWith(path + '/')
}

// Clean up body class on unmount
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.body.classList.remove('mobile-sidebar-open')
  }
})

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
      
      <!-- Debug Info (remove later) -->
      <div class="md:hidden text-white text-xs absolute top-16 right-4 bg-black bg-opacity-50 p-2 rounded">
        State: {{ showMobileSidebar }}
      </div>

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

    <!-- Mobile Menu Dropdown (Simple Implementation) -->
    <div 
      v-if="showMobileSidebar"
      class="md:hidden absolute top-full left-0 right-0 bg-blue-600 border-t border-blue-400 z-50 shadow-lg"
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

        <!-- Main Menu -->
        <div class="space-y-2">
          <h3 class="text-xs font-semibold text-blue-100 uppercase tracking-wide">Main Menu</h3>
          <template v-for="item in sidebarMenuItems" :key="item.path">
            <NuxtLink 
              :to="item.path" 
              @click="showMobileSidebar = false"
              class="flex items-center gap-3 px-3 py-2 text-white hover:bg-blue-500 rounded-lg transition-colors"
            >
              <img 
                v-if="item.image"
                :src="item.image" 
                :alt="item.label"
                class="w-4 h-4 object-contain brightness-0 invert"
              />
              <Icon 
                v-else
                :name="item.icon" 
                class="w-4 h-4"
              />
              <span class="text-sm">{{ item.label }}</span>
            </NuxtLink>
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

    <!-- Mobile Menu (Dropdown style - keep as fallback) -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div v-if="showMobileMenu" class="md:hidden bg-blue-600 border-t border-blue-400">
        <div class="px-4 py-3 space-y-3">
          <!-- Mobile Navigation Menu -->
          <template v-for="item in currentMenuItems" :key="item.label">
            <!-- Menu without children -->
            <NuxtLink 
              v-if="!item.children && item.path"
              :to="item.path" 
              @click="showMobileMenu = false"
              class="block text-white hover:text-blue-100 transition-colors text-sm font-medium py-2"
            >
              {{ item.label }}
            </NuxtLink>
            
            <!-- Menu label without link -->
            <span 
              v-else-if="!item.children"
              class="block text-white text-sm font-medium py-2"
            >
              {{ item.label }}
            </span>
            
            <!-- Menu with dropdown -->
            <div v-else class="space-y-2">
              <button 
                @click="toggleMobileDropdown(item.label)"
                class="w-full text-left text-white hover:text-blue-100 transition-colors text-sm font-medium flex items-center justify-between py-2"
              >
                {{ item.label }}
                <Icon 
                  name="lucide:chevron-down" 
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openMobileDropdown === item.label }"
                />
              </button>
              
              <!-- Mobile Dropdown Items -->
              <div v-if="openMobileDropdown === item.label" class="pl-4 space-y-2">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.label"
                  :to="child.path || '#'"
                  @click="showMobileMenu = false"
                  class="block text-blue-100 hover:text-white transition-colors text-sm py-1"
                >
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>
          </template>

          <!-- Mobile User Actions -->
          <div class="border-t border-blue-400 pt-3 mt-4 space-y-3">
            <div class="flex items-center gap-3 text-white">
              <div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <Icon name="lucide:user" class="w-4 h-4 text-white" />
              </div>
              <div>
                <p class="text-sm font-semibold">{{ profile?.data?.name || 'Bagus Wicaksono' }}</p>
                <p class="text-xs text-blue-100">Super Admin</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <button 
                type="button"
                class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <Icon name="lucide:search" class="w-4 h-4 text-white" />
              </button>
              <button 
                type="button"
                class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <Icon name="lucide:mail" class="w-4 h-4 text-white" />
              </button>
              <button 
                type="button"
                class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <Icon name="lucide:bell" class="w-4 h-4 text-white" />
              </button>
            </div>
            
            <button 
              type="button"
              @click="handleLogout"
              class="w-full text-left text-white hover:text-blue-100 flex items-center gap-2 text-sm py-2"
            >
              <Icon name="lucide:log-out" class="w-4 h-4" />
              Logout
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

/* Mobile sidebar specific styles */
.mobile-sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.mobile-sidebar.open {
  transform: translateX(0);
}

/* Prevent body scroll when mobile sidebar is open */
:global(body.mobile-sidebar-open) {
  overflow: hidden;
  position: fixed;
  width: 100%;
}

/* Ensure proper stacking */
.mobile-overlay {
  backdrop-filter: blur(4px);
}

/* Ensure mobile sidebar is visible */
.mobile-sidebar-container {
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}
</style>
