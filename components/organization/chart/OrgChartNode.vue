<script setup lang="ts">
    import type { TreeItem } from '~/stores/om/useOmStore'
    
    interface Props {
      node: TreeItem & { level?: number }
    }
    
    const props = defineProps<Props>()
    
    const isExpanded = ref(true)
    
    const toggleExpand = () => {
      if (hasChildren.value) {
        isExpanded.value = !isExpanded.value
      }
    }
    
    const hasChildren = computed(() => {
      return props.node.children && props.node.children.length > 0
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
    
    // Get background color based on object type
    const getBackgroundColor = computed(() => {
      switch (props.node.object_type) {
        case 'O':
          return 'bg-blue-50 border-blue-200 hover:bg-blue-100'
        case 'S':
          return 'bg-purple-50 border-purple-200 hover:bg-purple-100'
        case 'P':
          return 'bg-green-50 border-green-200 hover:bg-green-100'
        case 'C':
          return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
        case 'K':
          return 'bg-orange-50 border-orange-200 hover:bg-orange-100'
        default:
          return 'bg-gray-50 border-gray-200 hover:bg-gray-100'
      }
    })
    
    const getTextColor = computed(() => {
      switch (props.node.object_type) {
        case 'O':
          return 'text-blue-700'
        case 'S':
          return 'text-purple-700'
        case 'P':
          return 'text-green-700'
        case 'C':
          return 'text-yellow-700'
        case 'K':
          return 'text-orange-700'
        default:
          return 'text-gray-700'
      }
    })

    const getIconColor = computed(() => {
      switch (props.node.object_type) {
        case 'O':
          return 'text-blue-600'
        case 'S':
          return 'text-purple-600'
        case 'P':
          return 'text-green-600'
        case 'C':
          return 'text-yellow-600'
        case 'K':
          return 'text-orange-600'
        default:
          return 'text-gray-600'
      }
    })
    </script>
    
    <template>
      <div class="flex flex-col items-center">
        <!-- Node Card -->
        <div 
          :class="[
            'relative border-2 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer',
            'min-w-[260px] max-w-[300px]',
            getBackgroundColor
          ]"
          @click="toggleExpand"
        >
          <!-- Chief Crown -->
          <div 
            v-if="node.chief" 
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-1.5 shadow-md border-2 border-white"
          >
            <Icon name="lucide:crown" class="w-4 h-4 text-white" />
          </div>
    
          <div class="p-4">
            <!-- Header with Icon -->
            <div class="flex items-start gap-3 mb-3">
              <div class="p-2.5 rounded-lg bg-white shadow-sm border">
                <Icon 
                  :name="getIcon"
                  :class="['w-6 h-6', getIconColor]"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 :class="['font-semibold text-sm leading-tight mb-1', getTextColor]">
                  {{ node.long_text || node.short_text || node.object_id }}
                </h3>
                <p class="text-xs text-gray-500 font-mono">
                  {{ node.object_id }}
                </p>
                <div class="flex items-center gap-1 mt-1">
                  <span :class="['text-xs px-2 py-0.5 rounded-full font-medium', 
                    node.object_type === 'O' ? 'bg-blue-100 text-blue-700' :
                    node.object_type === 'S' ? 'bg-purple-100 text-purple-700' :
                    node.object_type === 'P' ? 'bg-green-100 text-green-700' :
                    node.object_type === 'C' ? 'bg-yellow-100 text-yellow-700' :
                    node.object_type === 'K' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  ]">
                    {{ node.object_type }}
                  </span>
                </div>
              </div>
            </div>
    
            <!-- Details -->
            <div class="space-y-2 text-xs">
              <div v-if="node.short_text && node.short_text !== node.long_text" class="flex items-center gap-2 text-gray-600 bg-white/50 px-2 py-1 rounded">
                <Icon name="lucide:tag" class="w-3 h-3 flex-shrink-0" />
                <span class="truncate">{{ node.short_text }}</span>
              </div>
              <div v-if="node.abbreviation" class="flex items-center gap-2 text-gray-600 bg-white/50 px-2 py-1 rounded">
                <Icon name="lucide:file-text" class="w-3 h-3 flex-shrink-0" />
                <span class="font-medium">{{ node.abbreviation }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-500 bg-white/30 px-2 py-1 rounded">
                <Icon name="lucide:layers" class="w-3 h-3 flex-shrink-0" />
                <span>Level {{ node.depth || 0 }}</span>
              </div>
            </div>
          </div>
    
          <!-- Expand/Collapse Button -->
          <button
            v-if="hasChildren"
            class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300 rounded-full p-1.5 shadow-md hover:bg-gray-50 hover:border-gray-400 transition-all"
            @click.stop="toggleExpand"
          >
            <Icon 
              name="lucide:chevron-down"
              :class="[
                'w-4 h-4 text-gray-600 transition-transform duration-200',
                { 'rotate-180': !isExpanded }
              ]"
            />
          </button>

          <!-- Children Count Badge -->
          <div 
            v-if="hasChildren" 
            class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md"
          >
            {{ node.children?.length || 0 }}
          </div>
        </div>
    
        <!-- Connection Line -->
        <div 
          v-if="hasChildren && isExpanded" 
          class="w-0.5 h-8 bg-gray-300"
        ></div>
    
        <!-- Children Container -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-4"
        >
          <div v-if="hasChildren && isExpanded" class="flex gap-8 relative">
            <!-- Horizontal Line -->
            <div 
              v-if="node.children && node.children.length > 1"
              class="absolute top-0 h-0.5 bg-gray-300"
              :style="{ 
                left: `calc(50% - ${(node.children.length - 1) * 150}px)`,
                right: `calc(50% - ${(node.children.length - 1) * 150}px)`,
                width: `${(node.children.length - 1) * 300}px`,
                transform: 'translateX(-50%)'
              }"
            ></div>
    
            <!-- Child Nodes -->
            <div 
              v-for="(child, index) in node.children" 
              :key="child.id"
              class="flex flex-col items-center"
            >
              <!-- Vertical Line to Child -->
              <div class="w-0.5 h-8 bg-gray-300"></div>
              
              <OrgChartNode :node="child" />
            </div>
          </div>
        </Transition>
      </div>
    </template>