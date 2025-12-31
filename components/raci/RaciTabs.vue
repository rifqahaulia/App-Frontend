<template>
  <div class="mb-6">
    <!-- Mobile: Scrollable horizontal tabs -->
    <div class="md:hidden">
      <div class="border-b border-gray-200">
        <div class="flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="$emit('update:activeTab', tab.id)"
            :class="[
              'px-3 py-2 text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap flex-shrink-0 border-b-2 -mb-px',
              activeTab === tab.id 
                ? 'text-blue-600 border-blue-600 bg-blue-50' 
                : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
            <Icon name="lucide:edit-3" class="w-3 h-3" />
          </button>
          <button class="px-3 py-2 text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors flex-shrink-0 border-b-2 border-transparent -mb-px">
            <Icon name="lucide:plus" class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <!-- Tablet & Desktop: Tab layout with border -->
    <div class="hidden md:block">
      <div class="border-b border-gray-200">
        <div class="flex gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="$emit('update:activeTab', tab.id)"
            :class="[
              'px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 -mb-px whitespace-nowrap',
              activeTab === tab.id 
                ? 'text-blue-600 border-blue-600 bg-blue-50' 
                : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
            ]"
          >
            <span class="truncate">{{ tab.name }}</span>
            <Icon name="lucide:edit-3" class="w-4 h-4 flex-shrink-0" />
          </button>
          <button class="px-4 py-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors border-b-2 border-transparent -mb-px">
            <Icon name="lucide:plus" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  }
})

defineEmits(['update:activeTab'])
</script>

<style scoped>
/* Hide scrollbar for mobile tabs */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Ensure smooth scrolling on mobile */
@media (max-width: 768px) {
  .overflow-x-auto {
    scroll-behavior: smooth;
  }
}
</style>