<template>
  <div class="tree-node">
    <!-- Node Row -->
    <div 
      :class="[
        'flex items-center gap-2 px-3 py-2 cursor-pointer rounded transition-colors group relative',
        isSelected 
          ? 'bg-blue-500 text-white' 
          : 'hover:bg-gray-100 text-gray-700'
      ]"
      :style="{ paddingLeft: `${level * 20 + 12}px` }"
      @click="handleSelect"
    >
      <!-- Expand/Collapse Button -->
      <button 
        v-if="hasChildren"
        @click.stop="toggleExpand"
        class="flex-shrink-0 p-1 rounded hover:bg-gray-200 transition-all"
        :title="isExpanded ? 'Tutup' : 'Buka'"
      >
        <Icon 
          name="lucide:chevron-down" 
          :class="[
            'w-4 h-4 transition-transform duration-200',
            isSelected ? 'text-white' : 'text-gray-600',
            { '-rotate-90': !isExpanded }
          ]"
        />
      </button>
      <div v-else class="w-6 flex-shrink-0"></div>

      <!-- Node Icon -->
      <Icon 
        :name="getIcon"
        :class="[
          'w-4 h-4 flex-shrink-0',
          isSelected ? 'text-white' : getIconColor
        ]"
      />

      <!-- Node Label -->
      <span 
        :class="[
          'text-sm flex-1 truncate',
          isSelected ? 'text-white font-medium' : 'text-gray-700 group-hover:text-gray-900'
        ]"
        :title="node.long_text || node.short_text || node.object_id"
      >
        {{ node.long_text || node.short_text || node.object_id }}
      </span>

      <!-- Badge -->
      <span 
        :class="[
          'text-xs px-2 py-0.5 rounded font-medium flex-shrink-0',
          isSelected 
            ? 'bg-white/20 text-white' 
            : 'bg-blue-50 text-blue-600'
        ]"
      >
        {{ getObjectTypeLabel }}
      </span>

      <!-- Chief Badge -->
      <Icon
        v-if="node.chief"
        name="lucide:crown"
        :class="[
          'w-4 h-4 flex-shrink-0',
          isSelected ? 'text-yellow-300' : 'text-yellow-500'
        ]"
        title="Chief"
      />

      <!-- Simple Dropdown -->
      <div class="relative">
        <button
          @click.stop="showDropdown = !showDropdown"
          :class="[
            'p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100',
            isSelected ? 'text-white hover:bg-white/20' : 'text-gray-500 hover:bg-gray-200',
            { 'opacity-100': showDropdown }
          ]"
          title="Menu"
        >
          <Icon name="lucide:more-vertical" class="w-4 h-4" />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="showDropdown"
          class="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-xl border border-gray-200 py-1 z-[9999]"
          @click.stop
        >
          <button
            @click="handleAction('view')"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Icon name="lucide:eye" class="w-4 h-4" />
            Lihat Detail
          </button>
          
          <button
            @click="handleAction('edit')"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Icon name="lucide:edit" class="w-4 h-4" />
            Edit
          </button>
          
          <button
            v-if="canHaveChildren"
            @click="handleAction('add')"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Tambah Anak
          </button>
          
          <div class="border-t border-gray-100 my-1"></div>
          
          <button
            @click="handleAction('delete')"
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Icon name="lucide:trash-2" class="w-4 h-4" />
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Children -->
    <div v-if="isExpanded && hasChildren" class="transition-all duration-300">
      <SimpleTreeNode
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
const showDropdown = ref(false)

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

const getIconColor = computed(() => {
  const colors = {
    'O': 'text-blue-500',
    'S': 'text-purple-500',
    'P': 'text-green-500', 
    'C': 'text-yellow-500',
    'K': 'text-orange-500'
  }
  return colors[props.node.object_type] || 'text-gray-500'
})

const getObjectTypeLabel = computed(() => {
  const labels = {
    'O': 'Org',
    'S': 'Pos',
    'P': 'Per',
    'C': 'CC', 
    'K': 'Job'
  }
  return labels[props.node.object_type] || props.node.object_type
})

const toggleExpand = () => {
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
    console.log('Toggle expand:', props.node.object_id, 'expanded:', isExpanded.value)
  }
}

const handleSelect = () => {
  emit('select', props.node)
  showDropdown.value = false
  console.log('Selected:', props.node.object_id)
}

const handleAction = (action) => {
  emit('action', { action, node: props.node })
  showDropdown.value = false
  console.log('Action:', action, 'on:', props.node.object_id)
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = () => {
    showDropdown.value = false
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>