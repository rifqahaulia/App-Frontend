<template>
  <!-- Input Value Modal - Positioned over the table -->
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-2xl w-96 max-w-md mx-4 border border-gray-200">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h3 class="text-lg font-semibold text-gray-900">Input Value</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Option</label>
          <select v-model="selectedOption" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
            <option value="">Option</option>
            <option value="R">R - Responsible</option>
            <option value="A">A - Accountable</option>
            <option value="C">C - Consulted</option>
            <option value="I">I - Informed</option>
            <option value="A/C">A/C</option>
            <option value="C/R">C/R</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Option Reason</label>
          <textarea 
            v-model="optionReason" 
            placeholder="Reason"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white"
            rows="4"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">History:</label>
          <div class="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md border">
            <div class="flex items-center gap-1">
              <Icon name="lucide:user" class="w-4 h-4 text-blue-500" />
              <span class="text-xs">User</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="lucide:clock" class="w-4 h-4 text-green-500" />
              <span class="text-xs">Time</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="lucide:info" class="w-4 h-4 text-orange-500" />
              <span class="text-xs">Info</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-100">
          Cancel
        </button>
        <button @click="handleSave" class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors shadow-sm">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const selectedOption = ref('')
const optionReason = ref('')

const handleSave = () => {
  emit('save', {
    option: selectedOption.value,
    reason: optionReason.value
  })
  
  // Reset form
  selectedOption.value = ''
  optionReason.value = ''
}

// Reset form when modal closes
watch(() => props.show, (newVal) => {
  if (!newVal) {
    selectedOption.value = ''
    optionReason.value = ''
  }
})
</script>