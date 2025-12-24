<template>
  <div class="simple-tree">
    <!-- Node -->
    <div 
      class="node-row flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors group"
      :class="{ 
        'bg-blue-500 text-white': isSelected,
        'border-l-4 border-blue-500': isSelected,
        'border-l-4 border-transparent': !isSelected
      }"
      :style="{ paddingLeft: `${level * 24 + 16}px` }"
      @click="selectNode"
    >
      <!-- Expand -->
      <div 
        v-if="hasChildren"
        @click.stop="toggleExpand"
        class="expand-btn w-6 h-6 flex items-center justify-center rounded hover:bg-blue-100 cursor-pointer"
        :class="{ 'hover:bg-blue-600': isSelected }"
      >
        <svg 
          class="w-4 h-4 transition-transform duration-200"
          :class="[
            isSelected ? 'text-white' : 'text-gray-600',
            { 'rotate-90': isExpanded }
          ]"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
      <div v-else class="w-6"></div>

      <!-- Icon -->
      <div class="icon-wrapper w-6 h-6 flex items-center justify-center rounded-full"
           :class="isSelected ? 'bg-white/20' : 'bg-blue-100'">
        <svg 
          class="w-4 h-4"
          :class="isSelected ? 'text-white' : 'text-blue-600'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path v-if="node.object_type === 'O'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          <path v-else-if="node.object_type === 'S'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6l-8 2V6"/>
          <path v-else-if="node.object_type === 'P'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>

      <!-- Text -->
      <div class="text-content flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <span 
            class="text-sm font-medium truncate"
            :class="isSelected ? 'text-white' : 'text-gray-900'"
          >
            {{ node.long_text || node.short_text || node.object_id }}
          </span>
          
          <span 
            class="text-xs px-2 py-1 rounded-full font-medium"
            :class="isSelected 
              ? 'bg-white/20 text-white' 
              : 'bg-gray-200 text-gray-700'"
          >
            {{ node.object_type }}
          </span>
          
          <svg 
            v-if="node.chief" 
            class="w-4 h-4"
            :class="isSelected ? 'text-yellow-300' : 'text-yellow-500'"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>

      <!-- Menu -->
      <div class="menu-wrapper relative">
        <div
          @click.stop="toggleMenu"
          class="menu-btn w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          :class="[
            isSelected ? 'text-white hover:bg-white/20' : 'text-gray-500 hover:bg-gray-200',
            { 'opacity-100': showMenu }
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
        </div>

        <!-- Dropdown -->
        <div
          v-if="showMenu"
          class="dropdown absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50"
          @click.stop
        >
          <div
            @click="doAction('view')"
            class="menu-item w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Lihat Detail
          </div>
          <div
            @click="doAction('edit')"
            class="menu-item w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Edit
          </div>
          <div
            v-if="canHaveChildren"
            @click="doAction('add')"
            class="menu-item w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Tambah Anak
          </div>
          <div class="border-t border-gray-100 my-2"></div>
          <div
            @click="doAction('delete')"
            class="menu-item w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Hapus
          </div>
        </div>
      </div>
    </div>

    <!-- Children -->
    <div v-if="isExpanded && hasChildren" class="children">
      <SimpleTree
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        :selectedId="selectedId"
        @select="$emit('select', $event)"
        @action="$emit('action', $event)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  node: Object,
  level: { type: Number, default: 0 },
  selectedId: [Number, String]
})

const emit = defineEmits(['select', 'action'])

const isExpanded = ref(true)
const showMenu = ref(false)

const isSelected = computed(() => props.selectedId === props.node.id)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)
const canHaveChildren = computed(() => ['O', 'S'].includes(props.node.object_type))

const selectNode = () => {
  console.log('🎯 Node selected:', props.node.object_id)
  emit('select', props.node)
}

const toggleExpand = () => {
  console.log('🎯 Toggle expand:', props.node.object_id)
  isExpanded.value = !isExpanded.value
}

const toggleMenu = () => {
  console.log('🎯 Menu toggled:', props.node.object_id)
  showMenu.value = !showMenu.value
}

const doAction = (action) => {
  console.log('🎯 Action:', action, 'on:', props.node.object_id)
  emit('action', { action, node: props.node })
  showMenu.value = false
}

onMounted(() => {
  const closeMenu = (e) => {
    if (showMenu.value) {
      showMenu.value = false
    }
  }
  document.addEventListener('click', closeMenu)
  onUnmounted(() => document.removeEventListener('click', closeMenu))
})
</script>

<style scoped>
.simple-tree {
  user-select: none;
}

.node-row:hover .menu-btn {
  opacity: 1;
}

.menu-item:hover {
  background-color: #f3f4f6;
}
</style>