<script setup lang="ts">
interface TreeNodeData {
  id: string
  label: string
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
  select: [node: TreeNodeData]
}>()

const isExpanded = ref(props.level === 0)

const toggleExpand = () => {
  if (props.node.children && props.node.children.length > 0) {
    isExpanded.value = !isExpanded.value
  }
}

const handleSelect = () => {
  emit('select', props.node)
}

const isSelected = computed(() => props.selectedId === props.node.id)
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
        v-if="node.children && node.children.length > 0"
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
        :name="node.children && node.children.length > 0 ? 'lucide:building-2' : 'lucide:home'"
        :class="[
          'w-4 h-4 flex-shrink-0',
          isSelected ? 'text-white' : 'text-gray-600'
        ]"
      />

      <!-- Node Label -->
      <span :class="['text-sm flex-1', isSelected ? 'text-white' : 'text-gray-700']">
        {{ node.label }}
      </span>
    </div>

    <!-- Children -->
    <div v-if="isExpanded && node.children && node.children.length > 0">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        :selectedId="selectedId"
        @select="emit('select', $event)"
      />
    </div>
  </div>
</template>
