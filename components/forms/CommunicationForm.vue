<script setup lang="ts">
import { usePaStore } from '~/stores/pa/usePaStore'
import type { PaCommunication } from '~/types/pa'

const props = defineProps<{
  persnum: number
  initialData?: Partial<PaCommunication>
  isEdit?: boolean
}>()

const emit = defineEmits(['success', 'cancel'])
const paStore = usePaStore()

const form = ref<Partial<PaCommunication>>({
  persnum: props.persnum,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '9999-12-31',
  subType: '0001',
  number: '',
  ...props.initialData
})

const subTypes = [
  { value: '0001', label: 'Handphone (Mobile)' },
  { value: '0002', label: 'Email Pribadi' },
  { value: '0010', label: 'Email Kantor' },
  { value: '0020', label: 'Telepon Rumah' },
  { value: 'CELL', label: 'WhatsApp' }
]

const handleSubmit = async () => {
  try {
    const result = await paStore.saveModuleData('pa/communication', form.value, form.value.id)
    emit('success', result)
  } catch (error) {
    console.error('Save communication failed:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 gap-6">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Jenis Komunikasi</label>
        <select v-model="form.subType" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none bg-white">
          <option v-for="opt in subTypes" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nomor / Alamat Email</label>
        <input 
          v-model="form.number" 
          type="text" 
          required 
          class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" 
          :placeholder="form.subType?.includes('Email') ? 'example@mail.com' : '0812xxxx'" 
        />
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-6 border-t">
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium">Batal</button>
      <button type="submit" :disabled="paStore.isLoading['pa/communication']" class="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-2">
        <Icon v-if="paStore.isLoading['pa/communication']" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
        Simpan Komunikasi
      </button>
    </div>
  </form>
</template>
