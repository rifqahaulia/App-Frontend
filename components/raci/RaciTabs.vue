<template>
  <div class="mb-6">
    <div class="flex gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="$emit('update:activeTab', tab.id)"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
          activeTab === tab.id 
            ? 'bg-blue-500 text-white shadow-sm' 
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        ]"
      >
        {{ tab.name }}
        <Icon name="lucide:edit-3" class="w-4 h-4" />
      </button>
      <button class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
        <Icon name="lucide:plus" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
interface Tab {
  id: string
  name: string
}

interface Props {
  tabs: Tab[]
  activeTab: string
}

defineProps<Props>()
defineEmits(['update:activeTab'])
</script>