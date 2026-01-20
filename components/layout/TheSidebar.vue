<script setup lang="ts">
import { sidebarMenuItems } from '~/data/menuData'

const route = useRoute()

const isActive = (path: string) => {
  // Handle nested routes for pengelolaan-organisasi
  if (path === '/pengelolaan-organisasi') {
    return route.path.startsWith('/pengelolaan-organisasi')
  }
  return route.path === path
}

const hasImage = ref<Record<string, boolean>>({})

const checkImage = (item: any, index: number) => {
  if (item.image) {
    const img = new Image()
    img.onload = () => {
      hasImage.value[index] = true
    }
    img.onerror = () => {
      hasImage.value[index] = false
    }
    img.src = item.image
  }
}

onMounted(() => {
  sidebarMenuItems.forEach((item, index) => {
    checkImage(item, index)
  })
})
</script>

<style scoped>
/* Sidebar item hover effect */
.sidebar-item {
  position: relative;
}

/* Tooltip styling */
.sidebar-item .tooltip {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background-color: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
  z-index: 9999;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Arrow for tooltip */
.sidebar-item .tooltip::before {
  content: '';
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: #1f2937;
}

/* Show tooltip on hover */
.sidebar-item:hover .tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(4px);
}

/* Ensure sidebar doesn't clip tooltips */
aside {
  overflow: visible !important;
}
</style>

<template>
  <aside class="w-16 md:w-20 bg-white border-r border-gray-200 flex flex-col items-center py-2 md:py-4 h-full overflow-y-auto flex-shrink-0">
    <div class="flex flex-col gap-2 md:gap-3 w-full items-center">
      <div
        v-for="(item, index) in sidebarMenuItems"
        :key="`${item.path}-${index}`"
        class="sidebar-item relative w-full flex justify-center"
      >
        <NuxtLink
          :to="item.path"
          :class="[
            'w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 relative flex-shrink-0',
            isActive(item.path) 
              ? 'bg-blue-500 shadow-lg scale-105' 
              : 'bg-gray-50 hover:bg-blue-500 hover:scale-110 shadow-sm border border-gray-200 hover:border-blue-500'
          ]"
        >
          <!-- Custom Image Icon -->
          <img 
            v-if="item.image && hasImage[index]"
            :src="item.image" 
            :alt="item.label"
            :class="[
              'w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 object-contain transition-all duration-300',
              isActive(item.path) ? 'brightness-0 invert' : 'hover:brightness-0 hover:invert'
            ]"
          />
          <!-- Fallback to Lucide Icon -->
          <Icon 
            v-else
            :name="item.icon" 
            :class="[
              'w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-all duration-300',
              isActive(item.path) ? 'text-white' : 'text-gray-700 hover:text-white hover:scale-110'
            ]"
          />
        </NuxtLink>
        
        <!-- Simple Tooltip -->
        <span class="tooltip">{{ item.label }}</span>
      </div>
    </div>
  </aside>
</template>
