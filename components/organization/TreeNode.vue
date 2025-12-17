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
    if (props.node.children && props.node.children.length > 0) {
      isExpanded.value = !isExpanded.value
    }
  }
  


  const handleSelect = () => {
    const data = props.node.data || props.node
    emit('select', data)
  }
  
  const isSelected = computed(() => props.selectedId === props.node.id)
  
  const hasChildren = computed(() => {
    return props.node.children && props.node.children.length > 0
  })
  </script>
  
  <template>
    <div class="tree-node">
      <div 
        @click="handleSelect"
        :class="[
          'flex items-center gap-2 px-3 py-2 cursor-pointer rounded transition-colors',
          isSelected 
            ? 'bg-blue-500 text-white' 
            : 'hover:bg-gray-50 text-gray-700'
        ]"
        :style="{ paddingLeft: `${level * 20 + 12}px` }"
      >
        <!-- Expand/Collapse Icon -->
        <button 
          v-if="hasChildren"
          @click.stop="toggleExpand"
          class="flex-shrink-0"
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
        <span v-else class="w-4"></span>
  
        <!-- Node Icon -->
        <Icon 
          :name="hasChildren ? 'lucide:building-2' : 'lucide:home'"
          :class="[
            'w-4 h-4 flex-shrink-0',
            isSelected ? 'text-white' : 'text-gray-600'
          ]"
        />
  
        <!-- Node Label -->
        <span :class="['text-sm flex-1', isSelected ? 'text-white font-medium' : 'text-gray-700']">
          {{ node.label }}
        </span>
  
        <!-- Badge for object type -->
        <span 
          v-if="node.data?.object_type"
          :class="[
            'text-xs px-2 py-0.5 rounded',
            isSelected 
              ? 'bg-white/20 text-white' 
              : 'bg-gray-100 text-gray-600'
          ]"
        >
          {{ node.data.object_type }}
        </span>
      </div>
  
      <!-- Children -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-[1000px] opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-[1000px] opacity-100"
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