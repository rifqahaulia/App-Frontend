<template>
  <div class="tree-node">
    <div 
      :class="[
        'flex items-center gap-2 px-3 py-2 cursor-pointer rounded transition-colors group relative',
        isSelected 
          ? 'bg-blue-500 text-white' 
          : 'hover:bg-gray-100 text-gray-700'
      ]"
      :style="{ paddingLeft: `${level * 16 + 12}px` }"
      @click="handleSelect"
    >
      <!-- Expand/Collapse Icon -->
      <button 
        v-if="hasChildren"
        @click.stop="toggleExpand"
        class="flex-shrink-0 hover:scale-110 transition-transform p-1 rounded hover:bg-gray-200"
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
      <span v-else class="w-4 flex-shrink-0"></span>

      <!-- Node Icon -->
      <Icon 
        :name="getIcon"
        :class="[
          'w-4 h-4 flex-shrink-0',
          isSelected ? 'text-white' : 'text-blue-500'
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

      <!-- Badge for object type -->
      <span 
        :class="[
          'text-xs px-2 py-0.5 rounded font-medium flex-shrink-0',
          isSelected 
            ? 'bg-white/20 text-white' 
            : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
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

      <!-- Dropdown Menu Button -->
      <div class="relative" @click.stop>
        <button
          @click="toggleDropdown"
          :class="[
            'p-1.5 rounded hover:bg-black/10 transition-colors opacity-0 group-hover:opacity-100',
            isSelected ? 'text-white hover:bg-white/20' : 'text-gray-500 hover:bg-gray-200',
            { 'opacity-100': showDropdown }
          ]"
          title="Menu aksi"
        >
          <Icon name="lucide:more-vertical" class="w-4 h-4" />
        </button>

        <!-- Dropdown Menu -->
        <Transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="showDropdown"
            class="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-xl border border-gray-200 py-1 z-[9999]"
            @click.stop
          >
            <button
              @click="handleViewDetails"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
            >
              <Icon name="lucide:eye" class="w-4 h-4" />
              Lihat Detail
            </button>
            
            <button
              @click="handleEdit"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
            >
              <Icon name="lucide:edit" class="w-4 h-4" />
              Edit
            </button>
            
            <button
              v-if="canHaveChildren"
              @click="handleAddChild"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
            >
              <Icon name="lucide:plus" class="w-4 h-4" />
              Tambah Anak
            </button>
            
            <div class="border-t border-gray-100 my-1"></div>
            
            <button
              @click="handleDelete"
              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4" />
              Hapus
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Children -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[2000px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[2000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="isExpanded && hasChildren" class="overflow-hidden">
        <OrganizationTreeNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :level="level + 1"
          :selectedId="selectedId"
          @select="emit('select', $event)"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
          @addChild="emit('addChild', $event)"
          @viewDetails="emit('viewDetails', $event)"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface TreeNodeData {
  id: number
  object_id: string
  object_type: string
  long_text?: string
  short_text?: string
  abbreviation?: string
  start_date: string
  end_date: string
  chief?: boolean
  children?: TreeNodeData[]
}

interface Props {
  node: TreeNodeData
  level?: number
  selectedId?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
  selectedId: null
})

const emit = defineEmits<{
  select: [node: TreeNodeData]
  edit: [node: TreeNodeData]
  delete: [node: TreeNodeData]
  addChild: [node: TreeNodeData]
  viewDetails: [node: TreeNodeData]
}>()

const isExpanded = ref(true) // Start expanded by default
const showDropdown = ref(false)

const toggleExpand = () => {
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
    console.log('Toggle expand:', props.node.object_id, 'expanded:', isExpanded.value, 'children:', props.node.children?.length)
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleSelect = () => {
  emit('select', props.node)
  showDropdown.value = false
}

const handleEdit = () => {
  emit('edit', props.node)
  showDropdown.value = false
}

const handleDelete = () => {
  emit('delete', props.node)
  showDropdown.value = false
}

const handleAddChild = () => {
  emit('addChild', props.node)
  showDropdown.value = false
}

const handleViewDetails = () => {
  emit('viewDetails', props.node)
  showDropdown.value = false
}

const isSelected = computed(() => props.selectedId === props.node.id)

const hasChildren = computed(() => {
  const result = props.node.children && props.node.children.length > 0
  console.log('hasChildren for', props.node.object_id, ':', result, 'children:', props.node.children?.length)
  return result
})

const canHaveChildren = computed(() => {
  // Organizations and Positions can have children
  return props.node.object_type === 'O' || props.node.object_type === 'S'
})

// Get icon based on object type
const getIcon = computed(() => {
  switch (props.node.object_type) {
    case 'O':
      return 'lucide:building-2'
    case 'S':
      return 'lucide:briefcase'
    case 'P':
      return 'lucide:user'
    case 'C':
      return 'lucide:dollar-sign'
    case 'K':
      return 'lucide:clipboard'
    default:
      return 'lucide:folder'
  }
})

// Get object type label
const getObjectTypeLabel = computed(() => {
  switch (props.node.object_type) {
    case 'O':
      return 'Org'
    case 'S':
      return 'Pos'
    case 'P':
      return 'Per'
    case 'C':
      return 'CC'
    case 'K':
      return 'Job'
    default:
      return props.node.object_type
  }
})

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    if (showDropdown.value) {
      showDropdown.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>