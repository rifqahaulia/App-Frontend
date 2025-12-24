<template>
  <div class="tree-node-wrapper">
    <!-- Main Node Row -->
    <div 
      class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer border-l-2 border-transparent hover:border-blue-300 transition-all"
      :class="{ 'bg-blue-50 border-blue-500': isSelected }"
      :style="{ marginLeft: `${level * 20}px` }"
      @click="selectNode"
    >
      <!-- Expand Button -->
      <button 
        v-if="hasChildren"
        @click.stop="toggleNode"
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-100 transition-colors"
        :class="{ 'bg-blue-100': isExpanded }"
      >
        <Icon 
          name="lucide:chevron-right" 
          class="w-4 h-4 text-gray-600 transition-transform"
          :class="{ 'rotate-90': isExpanded }"
        />
      </button>
      <div v-else class="w-6"></div>

      <!-- Node Icon -->
      <div class="w-6 h-6 flex items-center justify-center rounded bg-blue-100">
        <Icon :name="nodeIcon" class="w-4 h-4 text-blue-600" />
      </div>

      <!-- Node Text -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-900 truncate">
            {{ node.long_text || node.short_text || node.object_id }}
          </span>
          <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {{ node.object_type }}
          </span>
          <Icon v-if="node.chief" name="lucide:crown" class="w-4 h-4 text-yellow-500" />
        </div>
      </div>

      <!-- Action Menu -->
      <div class="relative">
        <button
          @click.stop="toggleMenu"
          class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
          :class="{ 'opacity-100': showMenu }"
        >
          <Icon name="lucide:more-vertical" class="w-4 h-4 text-gray-500" />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="showMenu"
          class="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50"
          @click.stop
        >
          <button
            @click="doAction('view')"
            class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Icon name="lucide:eye" class="w-4 h-4" />
            Detail
          </button>
          <button
            @click="doAction('edit')"
            class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Icon name="lucide:edit" class="w-4 h-4" />
            Edit
          </button>
          <button
            v-if="canAddChild"
            @click="doAction('add')"
            class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Tambah
          </button>
          <hr class="my-1">
          <button
            @click="doAction('delete')"
            class="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Icon name="lucide:trash-2" class="w-4 h-4" />
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Children -->
    <div v-if="isExpanded && hasChildren" class="ml-4">
      <ClickableTreeNode
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
  node: { type: Object, required: true },
  level: { type: Number, default: 0 },
  selectedId: [Number, String, null]
})

const emit = defineEmits(['select', 'action'])

// State
const isExpanded = ref(true)
const showMenu = ref(false)

// Computed
const isSelected = computed(() => props.selectedId === props.node.id)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)
const canAddChild = computed(() => ['O', 'S'].includes(props.node.object_type))

const nodeIcon = computed(() => {
  const icons = {
    'O': 'lucide:building-2',
    'S': 'lucide:briefcase',
    'P': 'lucide:user',
    'C': 'lucide:dollar-sign',
    'K': 'lucide:clipboard'
  }
  return icons[props.node.object_type] || 'lucide:folder'
})

// Methods
const selectNode = () => {
  console.log('🔵 Node clicked:', props.node.object_id)
  emit('select', props.node)
}

const toggleNode = () => {
  console.log('🔵 Toggle clicked:', props.node.object_id, 'current:', isExpanded.value)
  isExpanded.value = !isExpanded.value
}

const toggleMenu = () => {
  console.log('🔵 Menu clicked:', props.node.object_id)
  showMenu.value = !showMenu.value
}

const doAction = (action) => {
  console.log('🔵 Action:', action, 'on:', props.node.object_id)
  emit('action', { action, node: props.node })
  showMenu.value = false
}

// Close menu when clicking outside
onMounted(() => {
  const closeMenu = () => {
    if (showMenu.value) {
      showMenu.value = false
    }
  }
  document.addEventListener('click', closeMenu)
  onUnmounted(() => {
    document.removeEventListener('click', closeMenu)
  })
})
</script>

<style scoped>
.tree-node-wrapper {
  user-select: none;
}

.tree-node-wrapper:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>