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
const isExpanded = ref(true)
const selectedNodeId = ref<string | null>(null)

// Dummy data jika tidak ada data dari props
const dummyData: TreeNodeData[] = [
  {
    id: '1',
    label: 'PERUM LPPNPI --',
    children: [
      {
        id: '1-1',
        label: 'DIREKTORAT UTAMA - 00',
      },
      {
        id: '1-2',
        label: 'DIREKTORAT KESELAMATAN, KEAMANAN',
      },
      {
        id: '1-3',
        label: 'DIREKTORAT TEKNIK - 00',
      },
      {
        id: '1-4',
        label: 'DIREKTORAT KEUANGAN MANAJEMEMN RISIKO - 00',
        children: [
          {
            id: '1-4-1',
            label: 'DIVISI AKUNTANSI DAN ASET - 00',
          },
          {
            id: '1-4-2',
            label: 'DIVISI TRANSAKSI KEUANGAN - 00',
          },
          {
            id: '1-4-3',
            label: 'DIVISI TEKNOLOGI INFORMASI - 00',
          },
        ],
      },
    ],
  },
]

const displayData = computed(() => {
  return props.data && props.data.length > 0 ? props.data : dummyData
})

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
    <div class="relative">
      <button 
        @click="toggleSection"
        :class="[
          'w-full flex items-center gap-2 px-4 py-3 transition-colors focus:outline-none',
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


    </div>

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
          <div class="relative max-w-md">
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
          <template v-for="node in displayData" :key="node.id">
            <div 
              @click="handleSelect(node)"
              :class="[
                'flex items-center gap-1.5 px-2 py-1.5 cursor-pointer rounded transition-colors mb-0.5',
                selectedNodeId === node.id 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-50 text-gray-700'
              ]"
            >
              <Icon name="lucide:building-2" class="w-3.5 h-3.5" />
              <span class="text-xs">{{ node.label }}</span>
            </div>
            
            <!-- Children -->
            <template v-if="node.children">
              <div 
                v-for="child in node.children" 
                :key="child.id"
                class="ml-4"
              >
                <div 
                  @click="handleSelect(child)"
                  :class="[
                    'flex items-center gap-1.5 px-2 py-1.5 cursor-pointer rounded transition-colors mb-0.5',
                    selectedNodeId === child.id 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-50 text-gray-700'
                  ]"
                >
                  <Icon name="lucide:building-2" class="w-3.5 h-3.5" />
                  <span class="text-xs">{{ child.label }}</span>
                </div>
                
                <!-- Grand children -->
                <template v-if="child.children">
                  <div 
                    v-for="grandChild in child.children" 
                    :key="grandChild.id"
                    @click="handleSelect(grandChild)"
                    :class="[
                      'flex items-center gap-1.5 px-2 py-1.5 cursor-pointer rounded transition-colors mb-0.5 ml-4',
                      selectedNodeId === grandChild.id 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-gray-50 text-gray-700'
                    ]"
                  >
                    <Icon name="lucide:home" class="w-3.5 h-3.5" />
                    <span class="text-xs">{{ grandChild.label }}</span>
                  </div>
                </template>
              </div>
            </template>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
