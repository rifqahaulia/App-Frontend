<script setup lang="ts">
import { organizationTreeData } from '~/data/organizationTreeData'

const { profile } = useAuth()

const breadcrumbItems = [
  { label: 'Organisasi', path: '/index' },
  { label: 'Struktur Organisasi' },
]

const selectedNode = ref<any>(null)

const handleNodeSelect = (node: any) => {
  selectedNode.value = node
  console.log('Selected node:', node)
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <LayoutTheNavbar />
    
    <div class="flex">
      <LayoutTheSidebar />
      
      <main class="flex-1 bg-gray-50">
        <div class="p-6">
          <!-- Page Header with Breadcrumb -->
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h1 class="text-base font-semibold text-gray-900">
              Struktur Organisasi
            </h1>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-600">Organisasi</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-900" />
              <span class="font-semibold text-gray-900">Struktur Organisasi</span>
            </div>
          </div>

          <!-- Content -->
          <div class="flex gap-6">
            <!-- Left Sidebar - Tree (Full Width) -->
            <div class="w-full">
              <OrganizationTree
                :data="organizationTreeData"
                title="Struktur"
                @select="handleNodeSelect"
              />
            </div>


          </div>
        </div>
      </main>
    </div>
  </div>
</template>
