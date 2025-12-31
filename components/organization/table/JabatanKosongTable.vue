<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
      <h2 class="text-lg font-semibold text-gray-800">Jabatan Kosong</h2>
    </div>
    
    <!-- Content -->
    <div class="p-4">
      <div class="text-center py-8">
        <Icon name="lucide:user-x" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 class="text-lg font-medium mb-2 text-gray-700">Jabatan Kosong</h3>
        <p class="text-gray-500">Data jabatan kosong akan ditampilkan di sini</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
</script>