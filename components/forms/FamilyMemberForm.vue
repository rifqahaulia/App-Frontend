<script setup lang="ts">
import { usePaStore } from '~/stores/pa/usePaStore'
import { useReferenceStore } from '~/stores/pa/useReferenceStore'
import type { PaFamilyMember } from '~/types/pa'

const props = defineProps<{
  persnum: number
  initialData?: Partial<PaFamilyMember>
  isEdit?: boolean
}>()

const emit = defineEmits(['success', 'cancel'])

const paStore = usePaStore()
const refStore = useReferenceStore()

const form = ref<Partial<PaFamilyMember>>({
  persnum: props.persnum,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '9999-12-31',
  subType: '1',
  number: 1,
  name: '',
  birthPlace: '',
  birthDate: '',
  gender: '2',
  covered: '1',
  ...props.initialData
})

// Load references from backend
onMounted(async () => {
  await Promise.all([
    refStore.fetchReference('pa_family_member', 'subtype'),
    refStore.fetchReference('blood_type', 'lookup')
  ])
  
  // If creating, set default subtype from the first available reference
  if (!props.isEdit && !form.value.subType && refStore.references['subtype-pa_family_member']?.length > 0) {
    form.value.subType = refStore.references['subtype-pa_family_member'][0].value
  }
})

const genders = [
  { value: '1', label: 'Laki-laki' },
  { value: '2', label: 'Perempuan' }
]

const handleSubmit = async () => {
  try {
    const result = await paStore.saveModuleData('pa/family', form.value, form.value.id)
    emit('success', result)
  } catch (error) {
    console.error('Save family member failed:', error)
  }
}

const getFieldError = (field: string) => {
  return paStore.validationErrors['pa/family']?.find((e: any) => e.field === field)?.message
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Sub Type -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Hubungan Keluarga</label>
        <select 
          v-model="form.subType"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
        >
          <option value="" disabled>Pilih Hubungan</option>
          <option v-for="opt in refStore.references['subtype-pa_family_member']" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <!-- Sequence Number (Urutan) -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nomor Urutan (Sequence)</label>
        <input 
          v-model.number="form.number"
          type="number"
          required
          min="1"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- Name -->
      <div class="col-span-1 md:col-span-2 space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
        <input 
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
          placeholder="Masukkan nama lengkap..."
        />
        <p v-if="getFieldError('name')" class="text-xs text-red-500">{{ getFieldError('name') }}</p>
      </div>

      <!-- Birth Place / Date -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
        <input v-model="form.birthPlace" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
        <input v-model="form.birthDate" type="date" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>

      <!-- Gender -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
        <div class="flex gap-4 mt-2">
          <label v-for="opt in genders" :key="opt.value" class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="form.gender" :value="opt.value" class="w-4 h-4 text-blue-600" />
            <span class="text-sm text-gray-700">{{ opt.label }}</span>
          </label>
        </div>
      </div>

      <!-- BPJS / KTP -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nomor KTP (NIK)</label>
        <input v-model="form.ktp" type="text" maxlength="16" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nomor BPJS Kesehatan</label>
        <input v-model="form.bpjsKes" type="text" maxlength="13" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>

      <!-- Covered Status -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Ditanggung Perusahaan?</label>
        <select 
          v-model="form.covered"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
        >
          <option value="1">Ya</option>
          <option value="0">Tidak</option>
        </select>
      </div>

      <!-- Blood Type -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Golongan Darah</label>
        <select 
          v-model="form.bloodType"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none bg-white font-bold"
        >
          <option :value="undefined">Pilih Gol. Darah</option>
          <option 
            v-for="opt in refStore.references['lookup-blood_type']" 
            :key="opt.value" 
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-6 border-t">
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium"
      >
        Batal
      </button>
      <button 
        type="submit"
        :disabled="paStore.isLoading['pa/family']"
        class="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-2"
      >
        <Icon v-if="paStore.isLoading['pa/family']" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
        {{ isEdit ? 'Perbarui Data Keluarga' : 'Simpan Data Keluarga' }}
      </button>
    </div>
  </form>
</template>
