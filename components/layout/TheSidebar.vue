<script setup lang="ts">
const menuItems = [
  { name: 'Dashboard', icon: 'lucide:home', path: '/dashboard' },
  { name: 'Data', icon: 'lucide:database', path: '/data' },
  { name: 'Reports', icon: 'lucide:file-text', path: '/reports' },
  { name: 'Settings', icon: 'lucide:settings', path: '/settings' },
]
</script>

<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <div class="p-6 border-b border-gray-200">
      <NuxtImg src="/assets/logo.png" alt="Logo" class="h-12 w-auto" />
    </div>
    
    <nav class="flex-1 p-4 space-y-2">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        active-class="bg-blue-50 text-blue-600 font-semibold"
      >
        <Icon :name="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>
