<script setup lang="ts">
interface TreeNodeData {
  id: string
  label: string
  children?: TreeNodeData[]
}

interface Props {
  node: TreeNodeData
  level?: number
}

const props = withDefaults(defineProps<Props>(), {
  level: 0
})

const emit = defineEmits<{
  select: [node: TreeNodeData]
}>()

const isExpanded = ref(false)

const toggleExpand = () => {
  if (props.node.children && props.node.children.length > 0) {
    isExpanded.value = !isExpanded.value
  }
}

const handleSelect = () => {
  emit('select', props.node)
}
</script>

<template>
  <div class="tree-node">
    <div 
      @click="handleSelect"
      class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded transition-colors"
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
          class="w-4 h-4 transition-transform duration-200 text-gray-500"
          :class="{ 'rotate-90': isExpanded }"
        />
      </button>
      <span v-else class="w-4"></span>

      <!-- Node Icon -->
      <Icon 
        name="lucide:building-2" 
        class="w-4 h-4 flex-shrink-0 text-gray-600"
      />

      <!-- Node Label -->
      <span class="text-sm flex-1 text-gray-700">{{ node.label }}</span>
    </div>

    <!-- Children -->
    <div v-if="isExpanded && node.children && node.children.length > 0">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        @select="emit('select', $event)"
      />
    </div>
  </div>
</template>
