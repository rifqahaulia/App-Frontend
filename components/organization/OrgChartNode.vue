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
          return 'bg-blue-50 border-blue-200'
        case 'S':
          return 'bg-purple-50 border-purple-200'
        case 'P':
          return 'bg-green-50 border-green-200'
        case 'C':
          return 'bg-yellow-50 border-yellow-200'
        case 'K':
          return 'bg-orange-50 border-orange-200'
        default:
          return 'bg-gray-50 border-gray-200'
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
    </script>
    
    <template>
      <div class="flex flex-col items-center">
        <!-- Node Card -->
        <div 
          :class="[
            'relative border-2 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer',
            'min-w-[240px] max-w-[280px]',
            getBackgroundColor
          ]"
          @click="toggleExpand"
        >
          <!-- Chief Crown -->
          <div 
            v-if="node.chief" 
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 rounded-full p-1.5 shadow-md"
          >
            <Icon name="lucide:crown" class="w-4 h-4 text-white" />
          </div>
    
          <div class="p-4">
            <!-- Header with Icon -->
            <div class="flex items-start gap-3 mb-3">
              <div :class="['p-2 rounded-lg', node.object_type === 'P' ? 'bg-white' : 'bg-white/50']">
                <Icon 
                  :name="getIcon"
                  :class="['w-5 h-5', getTextColor]"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 :class="['font-semibold text-sm leading-tight mb-1', getTextColor]">
                  {{ node.long_text || node.short_text || node.object_id }}
                </h3>
                <p class="text-xs text-gray-500">
                  {{ node.object_id }} ({{ node.object_type }})
                </p>
              </div>
            </div>
    
            <!-- Details -->
            <div class="space-y-1 text-xs">
              <div v-if="node.short_text" class="flex items-center gap-1 text-gray-600">
                <Icon name="lucide:tag" class="w-3 h-3" />
                <span class="truncate">{{ node.short_text }}</span>
              </div>
              <div v-if="node.abbreviation" class="flex items-center gap-1 text-gray-600">
                <Icon name="lucide:file-text" class="w-3 h-3" />
                <span>{{ node.abbreviation }}</span>
              </div>
            </div>
          </div>
    
          <!-- Expand/Collapse Button -->
          <button
            v-if="hasChildren"
            class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
            @click.stop="toggleExpand"
          >
            <Icon 
              name="lucide:chevron-down"
              :class="[
                'w-4 h-4 text-gray-600 transition-transform',
                { 'rotate-180': !isExpanded }
              ]"
            />
          </button>
        </div>
    
        <!-- Connection Line -->
        <div 
          v-if="hasChildren && isExpanded" 
          class="w-0.5 h-8 bg-gray-300"
        ></div>
    
        <!-- Children Container -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="hasChildren && isExpanded" class="flex gap-6 relative">
            <!-- Horizontal Line -->
            <div 
              v-if="node.children && node.children.length > 1"
              class="absolute top-0 left-0 right-0 h-0.5 bg-gray-300"
              :style="{ 
                left: '50%', 
                right: '50%',
                width: `calc(100% - ${240 / 2}px)`,
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