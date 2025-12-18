<script setup lang="ts">
  interface TreeNodeData {
    id: string
    label: string
    data?: any
    children?: TreeNodeData[]
  }
  
  interface Props {
    node: TreeNodeData
    level?: number
    selectedId?: string | null
  }
  
  const props = withDefaults(defineProps<Props>(), {
    level: 0,
    selectedId: null
  })
  
  const emit = defineEmits<{
    select: [node: any]
  }>()
  
  const isExpanded = ref(props.level === 0)
  
  const toggleExpand = () => {
    if (hasChildren.value) {
      isExpanded.value = !isExpanded.value
    }
  }
  
  const handleSelect = () => {
    emit('select', props.node.data || props.node)
  }
  
  const isSelected = computed(() => props.selectedId === props.node.id)
  
  const hasChildren = computed(() => {
    return props.node.children && props.node.children.length > 0
  })
  
  // Get icon based on object type
  const getIcon = computed(() => {
    const objectType = props.node.data?.object_type
    
    switch (objectType) {
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
    const objectType = props.node.data?.object_type
    
    switch (objectType) {
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
        return objectType
    }
  })
  </script>
  
  <template>
    <div class="tree-node">
      <div 
        @click="handleSelect"
        :class="[
          'flex items-center gap-2 px-3 py-2 cursor-pointer rounded transition-colors group',
          isSelected 
            ? 'bg-blue-500 text-white' 
            : 'hover:bg-gray-100 text-gray-700'
        ]"
        :style="{ paddingLeft: `${level * 16 + 12}px` }"
      >
        <!-- Expand/Collapse Icon -->
        <button 
          v-if="hasChildren"
          @click.stop="toggleExpand"
          class="flex-shrink-0 hover:scale-110 transition-transform"
        >
          <Icon 
            name="lucide:chevron-right" 
            :class="[
              'w-4 h-4 transition-transform duration-200',
              isSelected ? 'text-white' : 'text-gray-500',
              { 'rotate-90': isExpanded }
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
          :title="node.label"
        >
          {{ node.label }}
        </span>
  
        <!-- Badge for object type -->
        <span 
          v-if="node.data?.object_type"
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
          v-if="node.data?.chief"
          name="lucide:crown"
          :class="[
            'w-4 h-4 flex-shrink-0',
            isSelected ? 'text-yellow-300' : 'text-yellow-500'
          ]"
          title="Chief"
        />
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
          <TreeNode
            v-for="child in node.children"
            :key="child.id"
            :node="child"
            :level="level + 1"
            :selectedId="selectedId"
            @select="emit('select', $event)"
          />
        </div>
      </Transition>
    </div>
  </template>