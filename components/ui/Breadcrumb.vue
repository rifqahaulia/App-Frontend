<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  path?: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>

<template>
  <nav class="flex items-center gap-2 text-sm text-gray-600 mb-4">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink
        v-if="item.path && index < items.length - 1"
        :to="item.path"
        class="hover:text-blue-600 transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span
        v-else
        :class="{ 'text-gray-900 font-semibold': index === items.length - 1 }"
      >
        {{ item.label }}
      </span>
      <Icon
        v-if="index < items.length - 1"
        name="lucide:chevron-right"
        class="w-4 h-4 text-gray-400"
      />
    </template>
  </nav>
</template>
