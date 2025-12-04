<script setup lang="ts">
import { sidebarMenuItems } from '~/data/menuData'

const route = useRoute()

const isActive = (path: string) => {
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

<template>
  <aside class="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-2.5">
    <NuxtLink
      v-for="(item, index) in sidebarMenuItems"
      :key="item.path"
      :to="item.path"
      :class="[
        'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group relative flex-shrink-0',
        isActive(item.path) 
          ? 'bg-blue-500 shadow-lg scale-105' 
          : 'bg-gray-50 hover:bg-blue-500 hover:scale-110 shadow-sm border border-gray-200 hover:border-blue-500'
      ]"
      :title="item.label"
    >
      <!-- Custom Image Icon -->
      <img 
        v-if="item.image && hasImage[index]"
        :src="item.image" 
        :alt="item.label"
        :class="[
          'w-5 h-5 object-contain transition-all duration-300',
          isActive(item.path) ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
        ]"
      />
      <!-- Fallback to Lucide Icon -->
      <Icon 
        v-else
        :name="item.icon" 
        :class="[
          'w-5 h-5 transition-all duration-300',
          isActive(item.path) ? 'text-white' : 'text-gray-700 group-hover:text-white group-hover:scale-110'
        ]"
      />
      
      <!-- Tooltip -->
      <div class="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all duration-300 z-50 shadow-xl group-hover:translate-x-1">
        {{ item.label }}
        <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
      </div>
    </NuxtLink>
  </aside>
</template>
