<script setup lang="ts">
import { usePaStore } from '~/stores/pa/usePaStore'
import type { PaPersonalIds } from '~/types/pa'

const props = defineProps<{
  persnum: number
  initialData?: Partial<PaPersonalIds>
  isEdit?: boolean
}>()

const emit = defineEmits(['success', 'cancel'])
const paStore = usePaStore()

const form = ref<Partial<PaPersonalIds>>({
  persnum: props.persnum,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '9999-12-31',
  subType: '01',
  number: '',
  author: '',
  issueDate: '',
  validDate: '',
  issuePlace: '',
  ...props.initialData
})

const subTypes = [
  { value: '01', label: 'KTP' },
  { value: '02', label: 'SIM A' },
  { value: '03', label: 'SIM C' },
  { value: '04', label: 'Passport' },
  { value: '05', label: 'NPWP' }
]

const handleSubmit = async () => {
  try {
    const result = await paStore.saveModuleData('pa-personal-ids', form.value, form.value.id)
    emit('success', result)
  } catch (error) {
    console.error('Save ID failed:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Jenis Dokumen</label>
        <select v-model="form.subType" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none bg-white">
          <option v-for="opt in subTypes" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nomor Dokumen</label>
        <input v-model="form.number" type="text" required class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" placeholder="Masukkan nomor dokumen..." />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Instansi Penerbit</label>
        <input v-model="form.author" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" placeholder="e.g. Mabes Polri, Ditjen Pajak" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tempat Penerbitan</label>
        <input v-model="form.issuePlace" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tanggal Terbit</label>
        <input v-model="form.issueDate" type="date" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Berlaku Sampai</label>
        <input v-model="form.validDate" type="date" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" />
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-6 border-t">
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium">Batal</button>
      <button type="submit" :disabled="paStore.isLoading['pa-personal-ids']" class="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-2">
        <Icon v-if="paStore.isLoading['pa-personal-ids']" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
        Simpan Dokumen
      </button>
    </div>
  </form>
</template>
