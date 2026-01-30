<script setup lang="ts">
import { usePaStore } from '~/stores/pa/usePaStore'
import { useReferenceStore } from '~/stores/pa/useReferenceStore'
import type { PaCommunication } from '~/types/pa'

const props = defineProps<{
  persnum: number
  initialData?: Partial<PaCommunication>
  isEdit?: boolean
}>()

const emit = defineEmits(['success', 'cancel'])
const paStore = usePaStore()
const refStore = useReferenceStore()

const form = ref<Partial<PaCommunication>>({
  persnum: props.persnum,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '9999-12-31',
  subType: '0001',
  number: '',
  ...props.initialData
})

// Load subtypes from backend
onMounted(async () => {
  await refStore.fetchReference('communication', 'subtype')
  if (!form.value.subType && refStore.references['subtype-communication']?.length > 0) {
    form.value.subType = refStore.references['subtype-communication'][0].value
  }
})

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
        <label class="block text-sm font-bold text-gray-700 uppercase tracking-tighter">Jenis Komunikasi</label>
        <select 
          v-model="form.subType" 
          required
          class="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none bg-white focus:ring-2 focus:ring-blue-100 transition-all"
        >
          <option value="" disabled>Pilih Jenis Komunikasi</option>
          <option 
            v-for="opt in refStore.references['subtype-communication']" 
            :key="opt.value" 
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-bold text-gray-700 uppercase tracking-tighter">Nomor / User ID / Email</label>
        <input 
          v-model="form.number" 
          type="text" 
          required 
          class="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
          :placeholder="form.subType?.includes('0005') || form.subType?.includes('0006') ? 'example@mail.com' : 'Masukkan nomor atau ID'" 
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-bold text-gray-700 uppercase tracking-tighter">Tanggal Mulai Berlaku</label>
        <input 
          v-model="form.startDate" 
          type="date" 
          required 
          class="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
        />
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-6 border-t border-gray-50">
      <button 
        type="button" 
        @click="$emit('cancel')" 
        class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
      >
        Batal
      </button>
      <button 
        type="submit" 
        :disabled="paStore.isLoading['pa/communication']" 
        class="px-8 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-200 transition-all"
      >
        <Icon v-if="paStore.isLoading['pa/communication']" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
        {{ isEdit ? 'Update Komunikasi' : 'Tambah Komunikasi' }}
      </button>
    </div>
  </form>
</template>
