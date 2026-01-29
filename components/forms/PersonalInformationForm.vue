<script setup lang="ts">
import { usePersonalStore } from '~/stores/pa/usePersonalStore'
import { useReferenceStore } from '~/stores/pa/useReferenceStore'
import type { PaPersonal } from '~/types/pa'

const props = defineProps<{
  initialData?: Partial<PaPersonal>
  isEdit?: boolean
}>()

const emit = defineEmits(['success', 'cancel'])

const personalStore = usePersonalStore()
const refStore = useReferenceStore()

// Form state
const form = ref<Partial<PaPersonal>>({
  persnum: undefined,
  name: '',
  title: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '9999-12-31',
  birthPlace: '',
  birthDate: '',
  gender: undefined,
  maritalStatus: undefined,
  religion: '',
  ...props.initialData
})

// Load references
onMounted(async () => {
  await refStore.fetchMultipleReferences([
    'gender', 
    'marital_status', 
    'religion'
  ])
})

const handleSubmit = async () => {
  try {
    personalStore.clearErrors()
    
    // Validate persnum (integer)
    if (!form.value.persnum) {
      personalStore.errorMessage = 'Personnel Number is required'
      return
    }

    let result
    if (props.isEdit && form.value.id) {
      result = await personalStore.updatePersonal(form.value.id, form.value)
    } else {
      result = await personalStore.createPersonal(form.value)
    }
    
    emit('success', result)
  } catch (error) {
    console.error('Form submission failed:', error)
  }
}

const getFieldError = (field: string) => {
  return personalStore.validationErrors.find(e => e.field === field)?.message
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Personnel Number -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Personnel Number</label>
        <input 
          v-model.number="form.persnum"
          type="number"
          required
          placeholder="e.g. 10010100"
          :class="[
            'w-full px-4 py-2 rounded-lg border focus:ring-2 transition-all outline-none',
            getFieldError('persnum') ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100'
          ]"
        />
        <p v-if="getFieldError('persnum')" class="text-xs text-red-500 mt-1">{{ getFieldError('persnum') }}</p>
      </div>

      <!-- Name -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
        <input 
          v-model="form.name"
          type="text"
          required
          placeholder="Nama Lengkap"
          :class="[
            'w-full px-4 py-2 rounded-lg border focus:ring-2 transition-all outline-none',
            getFieldError('name') ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100'
          ]"
        />
        <p v-if="getFieldError('name')" class="text-xs text-red-500 mt-1">{{ getFieldError('name') }}</p>
      </div>

      <!-- Title / Jabatan -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Gelar / Jabatan (Title)</label>
        <input 
          v-model="form.title"
          type="text"
          placeholder="e.g. S.Kom, Manager"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- Gender -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
        <select 
          v-model="form.gender"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-white"
        >
          <option :value="undefined" disabled>Pilih Jenis Kelamin</option>
          <option 
            v-for="opt in refStore.references.gender" 
            :key="opt.value" 
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Dates -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tanggal Mulai (Start Date)</label>
        <input 
          v-model="form.startDate"
          type="date"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
        <input 
          v-model="form.birthPlace"
          type="text"
          required
          placeholder="e.g. Jakarta"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- Birth Date -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
        <input 
          v-model="form.birthDate"
          type="date"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- Marital Status -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Status Pernikahan</label>
        <select 
          v-model="form.maritalStatus"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-white"
        >
          <option :value="undefined" disabled>Pilih Status</option>
          <option 
            v-for="opt in refStore.references.marital_status" 
            :key="opt.value" 
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Religion -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Agama</label>
        <select 
          v-model="form.religion"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-white"
        >
          <option value="" disabled>Pilih Agama</option>
          <option 
            v-for="opt in refStore.references.religion" 
            :key="opt.value" 
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>

    </div>

    <!-- Error Message from Store -->
    <div v-if="personalStore.errorMessage && !personalStore.validationErrors.length" class="p-3 bg-red-50 rounded-lg border border-red-100 text-sm text-red-600">
      {{ personalStore.errorMessage }}
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end gap-3 pt-4 border-t border-gray-50">
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all font-medium"
      >
        Cancel
      </button>
      <button 
        type="submit"
        :disabled="personalStore.isLoading"
        class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium disabled:opacity-50 flex items-center gap-2"
      >
        <Icon v-if="personalStore.isLoading" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
        {{ isEdit ? 'Update Data' : 'Save Personal Data' }}
      </button>
    </div>
  </form>
</template>
