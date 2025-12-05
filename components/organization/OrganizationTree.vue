<script setup lang="ts">
interface TreeNodeData {
  id: string
  label: string
  children?: TreeNodeData[]
}

interface Props {
  data: TreeNodeData[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Struktur'
})

const emit = defineEmits<{
  select: [node: TreeNodeData]
}>()

const searchQuery = ref('')
const isExpanded = ref(false)
const selectedNodeId = ref<string | null>(null)

const toggleSection = () => {
  isExpanded.value = !isExpanded.value
}

const handleSelect = (node: TreeNodeData) => {
  selectedNodeId.value = node.id
  emit('select', node)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Header -->
    <button 
      @click="toggleSection"
      :class="[
        'w-full flex items-center gap-2 px-4 py-3 transition-colors',
        isExpanded 
          ? 'bg-blue-500 text-white' 
          : 'text-gray-700 hover:bg-gray-50'
      ]"
    >
      <Icon 
        name="lucide:chevron-right" 
        :class="[
          'w-4 h-4 transition-all duration-200',
          isExpanded ? 'rotate-90 text-white' : 'text-blue-500'
        ]"
      />
      <span class="font-medium text-sm">{{ title }}</span>
    </button>

    <!-- Content -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[2000px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[2000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="isExpanded" class="border-t border-gray-200">
        <!-- Search Box -->
        <div class="p-3 border-b border-gray-100">
          <div class="relative">
            <Icon 
              name="lucide:search" 
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Tree -->
        <div class="p-2 max-h-[600px] overflow-y-auto">
          <TreeNode
            v-for="node in data"
            :key="node.id"
            :node="node"
            @select="handleSelect"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
