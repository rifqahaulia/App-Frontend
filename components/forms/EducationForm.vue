<script setup lang="ts">
import { usePaStore } from '~/stores/pa/usePaStore'
import { useReferenceStore } from '~/stores/pa/useReferenceStore'
import type { PaEducation } from '~/types/pa'

const props = defineProps<{
  persnum: number
  initialData?: Partial<PaEducation>
  isEdit?: boolean
}>()

const emit = defineEmits(['success', 'cancel'])

const paStore = usePaStore()
const refStore = useReferenceStore()

const form = ref<Partial<PaEducation>>({
  persnum: props.persnum,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '9999-12-31',
  subType: '01',
  institute: '',
  finalGrade: undefined,
  branchStudy: '',
  certificateNumber: '',
  certificateDate: '',
  ...props.initialData
})

const subTypes = [
  { value: '01', label: 'Pendidikan Formal' },
  { value: '02', label: 'Sertifikasi / Kursus' }
]

const handleSubmit = async () => {
  try {
    const result = await paStore.saveModuleData('pa-education', form.value, form.value.id)
    emit('success', result)
  } catch (error) {
    console.error('Save education failed:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Sub Type -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Jenis Pendidikan</label>
        <select v-model="form.subType" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none bg-white">
          <option v-for="opt in subTypes" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <!-- Start Date -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
        <input v-model="form.startDate" type="date" required class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" />
      </div>

      <!-- Institute -->
      <div class="col-span-1 md:col-span-2 space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nama Institusi / Sekolah</label>
        <input v-model="form.institute" type="text" required class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" placeholder="e.g. Universitas Indonesia" />
      </div>

      <!-- Branch of Study -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Jurusan / Bidang Study</label>
        <input v-model="form.branchStudy" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" placeholder="e.g. Teknik Informatika" />
      </div>

      <!-- Grade -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">IPK / Nilai Akhir</label>
        <input v-model.number="form.finalGrade" type="number" step="0.01" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" />
      </div>

      <!-- Certificate Number -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nomor Ijazah / Sertifikat</label>
        <input v-model="form.certificateNumber" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" />
      </div>

      <!-- Certificate Date -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tanggal Ijazah</label>
        <input v-model="form.certificateDate" type="date" class="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-6 border-t">
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium">Batal</button>
      <button type="submit" :disabled="paStore.isLoading['pa-education']" class="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-2">
        <Icon v-if="paStore.isLoading['pa-education']" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
        {{ isEdit ? 'Perbarui Pendidikan' : 'Simpan Pendidikan' }}
      </button>
    </div>
  </form>
</template>
