<script setup lang="ts">
// components/OrganisasiUnitTree.vue

interface OrganisasiUnit {
  id: string
  name: string
  parent?: string
  children?: OrganisasiUnit[]
  isExpanded?: boolean
}

interface Props {
  data: OrganisasiUnit[]
  selected?: OrganisasiUnit | null
  level?: number
}

interface Emits {
  (e: 'select', unit: OrganisasiUnit): void
  (e: 'toggle', unit: OrganisasiUnit): void
}

const props = withDefaults(defineProps<Props>(), {
  level: 0
})

const emit = defineEmits<Emits>()

const handleSelect = (unit: OrganisasiUnit) => {
  emit('select', unit)
}

const handleToggle = (unit: OrganisasiUnit) => {
  emit('toggle', unit)
}
</script>

<template>
  <div class="space-y-1">
    <div 
      v-for="unit in data" 
      :key="unit.id"
      class="select-none"
    >
      <!-- Unit Item -->
      <div 
        class="flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer group transition-colors"
        :class="{ 
          'bg-blue-500 text-white': selected?.id === unit.id,
          'hover:bg-gray-50': selected?.id !== unit.id
        }"
        :style="{ paddingLeft: `${level * 20 + 8}px` }"
        @click="handleSelect(unit)"
      >
        <!-- Expand/Collapse Button -->
        <button
          v-if="unit.children && unit.children.length > 0"
          @click.stop="handleToggle(unit)"
          class="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded transition-colors"
          :class="selected?.id === unit.id ? 'hover:bg-blue-600' : 'hover:bg-gray-200'"
        >
          <Icon 
            name="lucide:chevron-right" 
            class="w-3 h-3 transition-transform"
            :class="[
              { 'rotate-90': unit.isExpanded },
              selected?.id === unit.id ? 'text-white' : 'text-gray-600'
            ]"
          />
        </button>
        <div v-else class="w-4 h-4 flex-shrink-0"></div>

        <!-- Folder/File Icon -->
        <Icon 
          :name="unit.children && unit.children.length > 0 ? 'lucide:folder' : 'lucide:file'" 
          class="w-4 h-4 flex-shrink-0"
          :class="[
            unit.children && unit.children.length > 0 ? 'text-blue-600' : 'text-gray-500',
            { 'text-white': selected?.id === unit.id }
          ]"
        />

        <!-- Unit Name -->
        <span 
          class="text-sm truncate flex-1"
          :class="selected?.id === unit.id ? 'text-white font-medium' : 'text-gray-700'"
        >
          {{ unit.name }}
        </span>
      </div>

      <!-- Children (Recursive) -->
      <div v-if="unit.isExpanded && unit.children && unit.children.length > 0">
        <OrganisasiUnitTree 
          :data="unit.children"
          :selected="selected"
          :level="level + 1"
          @select="handleSelect"
          @toggle="handleToggle"
        />
      </div>
    </div>
  </div>
</template>