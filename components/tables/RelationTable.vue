<script setup lang="ts">
  import type { OmRelation } from '~/types/om'
  
  interface Props {
    relations: OmRelation[]
    isLoading?: boolean
    title?: string
  }
  
  const props = withDefaults(defineProps<Props>(), {
    isLoading: false,
    title: 'Tabel Relasi'
  })
  
  const emit = defineEmits<{
    edit: [relation: OmRelation]
    delete: [relation: OmRelation]
    add: []
  }>()
  
  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === '9999-12-31') return '-'
    
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
  
  // Get relation type name and description
  const getRelationTypeInfo = (type: string) => {
    const types: Record<string, { name: string, description: string, color: string }> = {
      'AOTO': { 
        name: 'Org to Org', 
        description: 'Organization to Organization',
        color: 'bg-blue-100 text-blue-800'
      },
      'AOSC': { 
        name: 'Org to Pos (Chief)', 
        description: 'Organization to Position (Chief)',
        color: 'bg-purple-100 text-purple-800'
      },
      'AOSM': { 
        name: 'Org to Pos (Member)', 
        description: 'Organization to Position (Member)',
        color: 'bg-green-100 text-green-800'
      },
      'ASTP': { 
        name: 'Pos to Person', 
        description: 'Position to Person',
        color: 'bg-yellow-100 text-yellow-800'
      }
    }
    return types[type] || { 
      name: type, 
      description: type,
      color: 'bg-gray-100 text-gray-800'
    }
  }
  
  // Get object type icon
  const getObjectTypeIcon = (type: string) => {
    switch (type) {
      case 'O':
        return 'lucide:building-2'
      case 'S':
        return 'lucide:briefcase'
      case 'P':
        return 'lucide:user'
      case 'C':
        return 'lucide:dollar-sign'
      case 'K':
        return 'lucide:clipboard'
      default:
        return 'lucide:folder'
    }
  }
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Icon name="lucide:git-branch" class="w-5 h-5 text-blue-500" />
          {{ title }}
        </h3>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">Total: {{ relations.length }} relasi</span>
          <button 
            @click="emit('add')"
            class="flex items-center gap-2 px-3 py-2 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Tambah Relasi
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-8 text-center">
      <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto text-blue-500 mb-3" />
      <p class="text-gray-500">Memuat data relasi...</p>
    </div>

    <!-- Table -->
    <div v-else-if="relations.length > 0" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipe Relasi
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dari
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ke
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Periode
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Audit
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="relation in relations" 
            :key="relation.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <!-- Relation Type -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="space-y-1">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getRelationTypeInfo(relation.relation_type).color
                ]">
                  {{ getRelationTypeInfo(relation.relation_type).name }}
                </span>
                <p class="text-xs text-gray-500">
                  {{ getRelationTypeInfo(relation.relation_type).description }}
                </p>
              </div>
            </td>

            <!-- From Object -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <Icon 
                  :name="getObjectTypeIcon(relation.object_type)"
                  :class="[
                    'w-4 h-4',
                    relation.object_type === 'O' ? 'text-blue-500' :
                    relation.object_type === 'S' ? 'text-purple-500' :
                    relation.object_type === 'P' ? 'text-green-500' :
                    relation.object_type === 'C' ? 'text-yellow-500' :
                    relation.object_type === 'K' ? 'text-orange-500' :
                    'text-gray-500'
                  ]"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ relation.object_id }}</p>
                  <p class="text-xs text-gray-500">{{ relation.object_type }}</p>
                </div>
              </div>
            </td>

            <!-- To Object -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <Icon 
                  :name="getObjectTypeIcon(relation.relation_object_type)"
                  :class="[
                    'w-4 h-4',
                    relation.relation_object_type === 'O' ? 'text-blue-500' :
                    relation.relation_object_type === 'S' ? 'text-purple-500' :
                    relation.relation_object_type === 'P' ? 'text-green-500' :
                    relation.relation_object_type === 'C' ? 'text-yellow-500' :
                    relation.relation_object_type === 'K' ? 'text-orange-500' :
                    'text-gray-500'
                  ]"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ relation.relation_object_id }}</p>
                  <p class="text-xs text-gray-500">{{ relation.relation_object_type }}</p>
                </div>
              </div>
            </td>

            <!-- Period -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="space-y-1">
                <div class="flex items-center gap-1">
                  <Icon name="lucide:calendar" class="w-3 h-3" />
                  <span>{{ formatDate(relation.start_date) }}</span>
                </div>
                <div v-if="relation.end_date !== '9999-12-31'" class="flex items-center gap-1">
                  <Icon name="lucide:calendar-x" class="w-3 h-3" />
                  <span>{{ formatDate(relation.end_date) }}</span>
                </div>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                relation.end_date === '9999-12-31' || new Date(relation.end_date) > new Date()
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              ]">
                <div :class="[
                  'w-1.5 h-1.5 rounded-full mr-1.5',
                  relation.end_date === '9999-12-31' || new Date(relation.end_date) > new Date()
                    ? 'bg-green-400'
                    : 'bg-red-400'
                ]"></div>
                {{ relation.end_date === '9999-12-31' || new Date(relation.end_date) > new Date() ? 'Aktif' : 'Tidak Aktif' }}
              </span>
            </td>

            <!-- Audit Info -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="space-y-1">
                <div class="flex items-center gap-1">
                  <Icon name="lucide:user" class="w-3 h-3" />
                  <span class="truncate max-w-20" :title="relation.create_user">{{ relation.create_user }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="lucide:clock" class="w-3 h-3" />
                  <span>{{ formatDate(relation.create_time) }}</span>
                </div>
              </div>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center gap-2">
                <button 
                  @click="emit('edit', relation)"
                  class="text-blue-600 hover:text-blue-900 transition-colors"
                  title="Edit Relasi"
                >
                  <Icon name="lucide:edit" class="w-4 h-4" />
                </button>
                <button 
                  @click="emit('delete', relation)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  title="Hapus Relasi"
                >
                  <Icon name="lucide:trash-2" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="p-12 text-center">
      <Icon name="lucide:git-branch" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak Ada Relasi</h3>
      <p class="text-gray-500 mb-4">Belum ada relasi yang ditemukan untuk organisasi ini</p>
      <button 
        @click="emit('add')"
        class="flex items-center gap-2 mx-auto px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        Tambah Relasi Pertama
      </button>
    </div>
  </div>
</template>