<template>
  <div class="mb-6">
    <!-- Mobile: Scrollable horizontal tabs -->
    <div class="md:hidden">
      <div class="relative border-b border-gray-300">
        <div class="flex gap-0 overflow-x-auto pb-0 scrollbar-hide">
          <div
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'relative flex items-center gap-2 px-3 py-2 text-xs font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 cursor-pointer tab-container',
              activeTab === tab.id 
                ? 'text-[#65BEFF] bg-[#E8F4FD] tab-active' 
                : 'text-gray-600 bg-white tab-inactive'
            ]"
            @click="$emit('update:activeTab', tab.id)"
          >
            <span>{{ tab.name }}</span>
            <Icon name="lucide:edit-3" class="w-3 h-3" />
            <Icon name="lucide:trash-2" class="w-3 h-3" />
          </div>
          
          <!-- Add button -->
          <div 
            @click="$emit('openAddTab')"
            class="relative flex items-center justify-center px-3 py-2 text-[#65BEFF] hover:text-[#189EFF] transition-all duration-300 bg-white hover:bg-blue-50 cursor-pointer tab-container tab-add"
          >
            <Icon name="lucide:plus" class="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>

    <!-- Tablet & Desktop: Tab layout -->
    <div class="hidden md:block">
      <div class="relative border-b border-gray-300">
        <div class="flex gap-0 items-end">
          <div
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer tab-container',
              activeTab === tab.id 
                ? 'text-[#65BEFF] bg-[#E8F4FD] tab-active' 
                : 'text-gray-600 bg-white tab-inactive'
            ]"
            @click="$emit('update:activeTab', tab.id)"
          >
            <span class="truncate">{{ tab.name }}</span>
            <Icon name="lucide:edit-3" class="w-4 h-4 flex-shrink-0" />
            <Icon name="lucide:trash-2" class="w-4 h-4 flex-shrink-0" />
          </div>
          
          <!-- Add button -->
          <div 
            @click="$emit('openAddTab')"
            class="relative flex items-center justify-center px-4 py-3 text-[#65BEFF] hover:text-[#189EFF] transition-all duration-300 bg-white hover:bg-blue-50 cursor-pointer tab-container tab-add"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
          </div>
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

defineEmits(['update:activeTab', 'openAddTab'])
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

/* Tab container styling */
.tab-container {
  position: relative;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border: 1px solid;
  border-bottom: none;
  margin-right: -1px;
}

.tab-active {
  border-color: #65BEFF;
  z-index: 10;
}

.tab-inactive {
  border-color: #d1d5db;
  z-index: 5;
}

.tab-add {
  border-color: #d1d5db;
  z-index: 5;
}

/* Menghilangkan garis bawah untuk tab aktif */
.tab-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: -1px;
  right: -1px;
  height: 2px;
  background: #E8F4FD;
  z-index: 15;
}

/* Ensure smooth scrolling on mobile */
@media (max-width: 768px) {
  .overflow-x-auto {
    scroll-behavior: smooth;
  }
}
</style>