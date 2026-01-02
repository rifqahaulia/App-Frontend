<template>
  <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Header -->
        <thead>
          <tr class="bg-blue-100">
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">
              PROSES BISNIS
            </th>
            <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r">
              GROUP
            </th>
            <th v-for="role in roles" :key="role.id" class="px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r min-w-[120px]">
              <div class="flex flex-col">
                <span class="font-semibold text-gray-900">{{ role.title }}</span>
                <span class="text-xs font-normal text-gray-600 normal-case">{{ role.subtitle }}</span>
              </div>
            </th>
          </tr>
        </thead>
        
        <!-- Body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(process, index) in processes" :key="process.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 border-r">
              <div class="flex items-center gap-2">
                <button 
                  v-if="process.children"
                  @click="toggleProcess(process.id)"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon 
                    name="lucide:chevron-right"
                    class="w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-90': expandedProcesses.includes(process.id) }"
                  />
                </button>
                <span class="text-sm text-gray-900" :class="{ 'ml-6': !process.children }">
                  {{ process.name }}
                </span>
              </div>
            </td>
            <td class="px-4 py-3 text-center border-r text-sm text-gray-600">
              {{ process.group }}
            </td>
            <td v-for="role in roles" :key="role.id" class="px-2 py-3 text-center border-r">
              <div class="flex justify-center">
                <span 
                  v-if="process.assignments && process.assignments[role.id]"
                  :class="getRaciClass(process.assignments[role.id])"
                  class="inline-flex items-center justify-center w-7 h-7 rounded text-xs font-bold"
                >
                  {{ process.assignments[role.id] }}
                </span>
              </div>
            </td>
          </tr>
          
          <!-- Child processes -->
          <template v-for="process in processes" :key="`children-${process.id}`">
            <tr 
              v-for="child in process.children" 
              :key="child.id"
              v-show="expandedProcesses.includes(process.id)"
              class="hover:bg-gray-50 bg-gray-25"
            >
              <td class="px-4 py-3 border-r">
                <div class="flex items-center gap-2 ml-8">
                  <button 
                    v-if="child.children"
                    @click="toggleProcess(child.id)"
                    class="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Icon 
                      name="lucide:chevron-right"
                      class="w-4 h-4 transition-transform duration-200"
                      :class="{ 'rotate-90': expandedProcesses.includes(child.id) }"
                    />
                  </button>
                  <span class="text-sm text-gray-900" :class="{ 'ml-6': !child.children }">
                    {{ child.name }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-center border-r text-sm text-gray-600">
                {{ child.group }}
              </td>
              <td v-for="role in roles" :key="role.id" class="px-2 py-3 text-center border-r">
                <div class="flex justify-center">
                  <span 
                    v-if="child.assignments && child.assignments[role.id]"
                    :class="getRaciClass(child.assignments[role.id])"
                    class="inline-flex items-center justify-center w-7 h-7 rounded text-xs font-bold"
                  >
                    {{ child.assignments[role.id] }}
                  </span>
                </div>
              </td>
            </tr>
            
            <!-- Sub-child processes -->
            <template v-for="child in process.children" :key="`subchildren-${child.id}`">
              <tr 
                v-for="subchild in child.children" 
                :key="subchild.id"
                v-show="expandedProcesses.includes(process.id) && expandedProcesses.includes(child.id)"
                class="hover:bg-gray-50 bg-gray-50"
              >
                <td class="px-4 py-3 border-r">
                  <div class="flex items-center gap-2 ml-16">
                    <span class="text-sm text-gray-900">{{ subchild.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-center border-r text-sm text-gray-600">
                  {{ subchild.group }}
                </td>
                <td v-for="role in roles" :key="role.id" class="px-2 py-3 text-center border-r">
                  <div class="flex justify-center">
                    <span 
                      v-if="subchild.assignments && subchild.assignments[role.id]"
                      :class="getRaciClass(subchild.assignments[role.id])"
                      class="inline-flex items-center justify-center w-7 h-7 rounded text-xs font-bold"
                    >
                      {{ subchild.assignments[role.id] }}
                    </span>
                  </div>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <span>Items per page:</span>
        <select v-model="itemsPerPage" class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <div class="flex items-center gap-1">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
          :disabled="currentPage === 1"
        >
          <Icon name="lucide:chevron-left" class="w-4 h-4" />
        </button>
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-1 border border-gray-300 rounded text-sm transition-colors',
            currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-100'
          ]"
        >
          {{ page }}
        </button>
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
          :disabled="currentPage === totalPages"
        >
          <Icon name="lucide:chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  roles: {
    type: Array,
    required: true
  },
  processes: {
    type: Array,
    required: true
  },
  expandedProcesses: {
    type: Array,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  visiblePages: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggle-process', 'update:currentPage', 'update:itemsPerPage'])

const toggleProcess = (processId) => {
  emit('toggle-process', processId)
}

const getRaciClass = (assignment) => {
  switch (assignment) {
    case 'R':
      return 'bg-green-500 text-white'
    case 'A':
      return 'bg-blue-500 text-white'
    case 'C':
      return 'bg-yellow-500 text-white'
    case 'I':
      return 'bg-purple-500 text-white'
    default:
      return 'bg-gray-300 text-gray-700'
  }
}

// Two-way binding for pagination
const currentPage = computed({
  get: () => props.currentPage,
  set: (value) => emit('update:currentPage', value)
})

const itemsPerPage = computed({
  get: () => props.itemsPerPage,
  set: (value) => emit('update:itemsPerPage', value)
})
</script>