<script setup lang="ts">
import { usePaStore } from '~/stores/pa/usePaStore'
import { useReferenceStore } from '~/stores/pa/useReferenceStore'
import type { PaAddress } from '~/types/pa'

const props = defineProps<{
  persnum: number
  initialData?: Partial<PaAddress>
  isEdit?: boolean
}>()

const emit = defineEmits(['success', 'cancel'])

const paStore = usePaStore()
const refStore = useReferenceStore()

const form = ref<Partial<PaAddress>>({
  persnum: props.persnum,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '9999-12-31',
  subType: '01',
  street: '',
  city: '',
  region: '',
  postalCode: '',
  rt: '',
  rw: '',
  kelurahan: '',
  kecamatan: '',
  ...props.initialData
})

const subTypes = [
  { value: '01', label: 'Alamat KTP' },
  { value: '02', label: 'Alamat Domisili' },
  { value: '03', label: 'Alamat Surat' }
]

onMounted(async () => {
  // Fetch regions and sub-types for address
  await Promise.all([
    refStore.fetchReference('', 'region'),
    refStore.fetchReference('address', 'subtype')
  ])
})

const handleSubmit = async () => {
  try {
    const result = await paStore.saveModuleData('pa/address', form.value, form.value.id)
    emit('success', result)
  } catch (error) {
    console.error('Save address failed:', error)
  }
}

const getFieldError = (field: string) => {
  return paStore.validationErrors['pa/address']?.find((e: any) => e.field === field)?.message
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Sub Type -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Jenis Alamat</label>
        <select 
          v-model="form.subType"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
        >
          <option v-for="opt in subTypes" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <!-- Start Date -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tanggal Mulai (Start Date)</label>
        <input 
          v-model="form.startDate"
          type="date"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- Street -->
      <div class="col-span-1 md:col-span-2 space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nama Jalan / Blok / No. Rumah</label>
        <textarea 
          v-model="form.street"
          rows="2"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
          placeholder="Jl. Thamrin No. 1..."
        ></textarea>
        <p v-if="getFieldError('street')" class="text-xs text-red-500">{{ getFieldError('street') }}</p>
      </div>

      <!-- RT / RW -->
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-500 text-xs uppercase">RT</label>
          <input v-model="form.rt" type="text" maxlength="5" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-500 text-xs uppercase">RW</label>
          <input v-model="form.rw" type="text" maxlength="5" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
        </div>
      </div>

      <!-- Kelurahan / Kecamatan -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Kelurahan</label>
        <input v-model="form.kelurahan" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Kecamatan</label>
        <input v-model="form.kecamatan" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>

      <!-- City / Region -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Kota / Kabupaten</label>
        <input v-model="form.city" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Provinsi</label>
        <select 
          v-model="form.region"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
        >
          <option value="" disabled>Pilih Provinsi</option>
          <option 
            v-for="opt in refStore.references['region-']" 
            :key="opt.value" 
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Postal Code -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Kode Pos</label>
        <input v-model="form.postalCode" type="text" maxlength="5" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
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
        :disabled="paStore.isLoading['pa/address']"
        class="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-2"
      >
        <Icon v-if="paStore.isLoading['pa/address']" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
        {{ isEdit ? 'Perbarui Alamat' : 'Simpan Alamat' }}
      </button>
    </div>
  </form>
</template>
