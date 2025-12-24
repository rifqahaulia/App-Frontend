<script setup lang="ts">
  import type { TreeItem } from '~/stores/om/useOmStore'
  
  interface Props {
    data: TreeItem[]
    isLoading?: boolean
    selectedId?: number | null
  }
  
  const props = withDefaults(defineProps<Props>(), {
    isLoading: false,
    selectedId: null
  })
  
  const emit = defineEmits<{
    select: [node: TreeItem]
    edit: [node: TreeItem]
    delete: [node: TreeItem]
    addChild: [node: TreeItem]
  }>()
  
  // Flatten tree data for table display
  const flattenTree = (items: TreeItem[], level: number = 0): (TreeItem & { level: number })[] => {
    return items.reduce((acc, item) => {
      acc.push({ ...item, level })
      if (item.children && item.children.length > 0) {
        acc.push(...flattenTree(item.children, level + 1))
      }
      return acc
    }, [] as (TreeItem & { level: number })[])
  }
  
  const flatData = computed(() => flattenTree(props.data))
  
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
  
  // Get object type name
  const getObjectTypeName = (type: string) => {
    const types: Record<string, string> = {
      'O': 'Organization',
      'S': 'Position',
      'P': 'Person',
      'C': 'Cost Center',
      'K': 'Job'
    }
    return types[type] || type
  }
  
  // Get icon based on object type
  const getIcon = (objectType: string) => {
    switch (objectType) {
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
  
  const handleRowClick = (item: TreeItem) => {
    emit('select', item)
  }
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Icon name="lucide:table" class="w-5 h-5 text-blue-500" />
          Tabel Organisasi
        </h3>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">Total: {{ flatData.length }} item</span>
          <button class="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            <Icon name="lucide:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-8 text-center">
      <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto text-blue-500 mb-3" />
      <p class="text-gray-500">Memuat data organisasi...</p>
    </div>

    <!-- Table -->
    <div v-else-if="flatData.length > 0" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Organisasi
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Object ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipe
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Level
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Periode
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="item in flatData" 
            :key="item.id"
            @click="handleRowClick(item)"
            :class="[
              'hover:bg-gray-50 cursor-pointer transition-colors',
              selectedId === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            ]"
          >
            <!-- Organization Name with Hierarchy -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <!-- Indentation for hierarchy -->
                <div :style="{ paddingLeft: `${item.level * 20}px` }" class="flex items-center gap-3">
                  <!-- Hierarchy Lines -->
                  <div v-if="item.level > 0" class="flex items-center">
                    <div class="w-4 h-0.5 bg-gray-300"></div>
                  </div>
                  
                  <!-- Icon -->
                  <div class="flex-shrink-0">
                    <Icon 
                      :name="getIcon(item.object_type)"
                      :class="[
                        'w-5 h-5',
                        item.object_type === 'O' ? 'text-blue-500' :
                        item.object_type === 'S' ? 'text-purple-500' :
                        item.object_type === 'P' ? 'text-green-500' :
                        item.object_type === 'C' ? 'text-yellow-500' :
                        item.object_type === 'K' ? 'text-orange-500' :
                        'text-gray-500'
                      ]"
                    />
                  </div>
                  
                  <!-- Name and Details -->
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ item.long_text || item.short_text || item.object_id }}
                      </p>
                      <Icon
                        v-if="item.chief"
                        name="lucide:crown"
                        class="w-4 h-4 text-yellow-500 flex-shrink-0"
                        title="Chief"
                      />
                    </div>
                    <p v-if="item.short_text && item.short_text !== item.long_text" class="text-xs text-gray-500 truncate">
                      {{ item.short_text }}
                    </p>
                  </div>
                </div>
              </div>
            </td>

            <!-- Object ID -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                {{ item.object_id }}
              </span>
            </td>

            <!-- Type -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                item.object_type === 'O' ? 'bg-blue-100 text-blue-800' :
                item.object_type === 'S' ? 'bg-purple-100 text-purple-800' :
                item.object_type === 'P' ? 'bg-green-100 text-green-800' :
                item.object_type === 'C' ? 'bg-yellow-100 text-yellow-800' :
                item.object_type === 'K' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              ]">
                {{ item.object_type }} - {{ getObjectTypeName(item.object_type) }}
              </span>
            </td>

            <!-- Level -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex items-center gap-1">
                <Icon name="lucide:layers" class="w-4 h-4 text-gray-400" />
                {{ item.level }}
              </div>
            </td>

            <!-- Period -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="space-y-1">
                <div class="flex items-center gap-1">
                  <Icon name="lucide:calendar" class="w-3 h-3" />
                  <span>{{ formatDate(item.start_date) }}</span>
                </div>
                <div v-if="item.end_date !== '9999-12-31'" class="flex items-center gap-1">
                  <Icon name="lucide:calendar-x" class="w-3 h-3" />
                  <span>{{ formatDate(item.end_date) }}</span>
                </div>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                item.end_date === '9999-12-31' || new Date(item.end_date) > new Date()
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              ]">
                <div :class="[
                  'w-1.5 h-1.5 rounded-full mr-1.5',
                  item.end_date === '9999-12-31' || new Date(item.end_date) > new Date()
                    ? 'bg-green-400'
                    : 'bg-red-400'
                ]"></div>
                {{ item.end_date === '9999-12-31' || new Date(item.end_date) > new Date() ? 'Aktif' : 'Tidak Aktif' }}
              </span>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center gap-2">
                <button 
                  @click.stop="emit('edit', item)"
                  class="text-blue-600 hover:text-blue-900 transition-colors"
                  title="Edit"
                >
                  <Icon name="lucide:edit" class="w-4 h-4" />
                </button>
                <button 
                  v-if="item.object_type === 'O' || item.object_type === 'S'"
                  @click.stop="emit('addChild', item)"
                  class="text-green-600 hover:text-green-900 transition-colors"
                  title="Tambah Anak"
                >
                  <Icon name="lucide:plus" class="w-4 h-4" />
                </button>
                <button 
                  @click.stop="emit('delete', item)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  title="Hapus"
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
      <Icon name="lucide:table" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak Ada Data</h3>
      <p class="text-gray-500 mb-4">Belum ada data organisasi yang tersedia</p>
      <button class="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        <Icon name="lucide:plus" class="w-4 h-4" />
        Tambah Organisasi Pertama
      </button>
    </div>
  </div>
</template>