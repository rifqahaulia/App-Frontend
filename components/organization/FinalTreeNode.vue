<template>
  <div class="tree-item">
    <!-- Node Row -->
    <div 
      class="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all duration-200 group relative"
      :class="{ 
        'bg-blue-500 text-white': isSelected,
        'border-l-4 border-blue-500': isSelected,
        'border-l-4 border-transparent hover:border-blue-200': !isSelected
      }"
      :style="{ paddingLeft: `${level * 24 + 16}px` }"
      @click="handleClick"
    >
      <!-- Expand Button -->
      <button 
        v-if="hasChildren"
        @click.stop="toggleExpand"
        class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors"
        :class="{ 'hover:bg-blue-600': isSelected }"
      >
        <Icon 
          name="lucide:chevron-right" 
          class="w-4 h-4 transition-transform duration-200"
          :class="[
            isSelected ? 'text-white' : 'text-gray-600',
            { 'rotate-90': isExpanded }
          ]"
        />
      </button>
      <div v-else class="w-6"></div>

      <!-- Icon -->
      <div class="w-6 h-6 flex items-center justify-center rounded-full"
           :class="isSelected ? 'bg-white/20' : 'bg-blue-100'">
        <Icon 
          :name="getIcon" 
          class="w-4 h-4"
          :class="isSelected ? 'text-white' : 'text-blue-600'"
        />
      </div>

      <!-- Text Content -->
      <div class="flex-1 min-w-0">
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
          
          <Icon 
            v-if="node.chief" 
            name="lucide:crown" 
            class="w-4 h-4"
            :class="isSelected ? 'text-yellow-300' : 'text-yellow-500'"
          />
        </div>
        
        <div v-if="node.short_text && node.short_text !== node.long_text" 
             class="text-xs mt-1"
             :class="isSelected ? 'text-white/80' : 'text-gray-500'">
          {{ node.short_text }}
        </div>
      </div>

      <!-- Menu Button -->
      <button
        @click.stop="showMenu = !showMenu"
        class="w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all"
        :class="[
          isSelected ? 'text-white hover:bg-white/20' : 'text-gray-500 hover:bg-gray-200',
          { 'opacity-100': showMenu }
        ]"
      >
        <Icon name="lucide:more-vertical" class="w-4 h-4" />
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="showMenu"
        class="absolute right-4 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50"
        @click.stop
      >
        <button
          @click="handleAction('view')"
          class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
        >
          <Icon name="lucide:eye" class="w-4 h-4" />
          Lihat Detail
        </button>
        <button
          @click="handleAction('edit')"
          class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
        >
          <Icon name="lucide:edit" class="w-4 h-4" />
          Edit
        </button>
        <button
          v-if="canHaveChildren"
          @click="handleAction('add')"
          class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
        >
          <Icon name="lucide:plus" class="w-4 h-4" />
          Tambah Anak
        </button>
        <div class="border-t border-gray-100 my-2"></div>
        <button
          @click="handleAction('delete')"
          class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
        >
          <Icon name="lucide:trash-2" class="w-4 h-4" />
          Hapus
        </button>
      </div>
    </div>

    <!-- Children -->
    <div v-if="isExpanded && hasChildren">
      <FinalTreeNode
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

const getIcon = computed(() => {
  const icons = {
    'O': 'lucide:building-2',
    'S': 'lucide:briefcase', 
    'P': 'lucide:user',
    'C': 'lucide:dollar-sign',
    'K': 'lucide:clipboard'
  }
  return icons[props.node.object_type] || 'lucide:folder'
})

const handleClick = () => {
  console.log('✅ Node clicked:', props.node.object_id)
  emit('select', props.node)
}

const toggleExpand = () => {
  console.log('✅ Toggle expand:', props.node.object_id)
  isExpanded.value = !isExpanded.value
}

const handleAction = (action) => {
  console.log('✅ Action:', action, 'on:', props.node.object_id)
  emit('action', { action, node: props.node })
  showMenu.value = false
}

onMounted(() => {
  const closeMenu = () => showMenu.value = false
  document.addEventListener('click', closeMenu)
  onUnmounted(() => document.removeEventListener('click', closeMenu))
})
</script>

<style scoped>
.tree-item {
  user-select: none;
}
</style>