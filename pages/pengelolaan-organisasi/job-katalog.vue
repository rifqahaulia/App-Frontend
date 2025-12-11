<script setup lang="ts">
    
    // Nanti bisa fetch data dari API disini
    // const { data: jobKatalogData } = await useFetch('/api/job-katalog')
    
    const jobKatalogData = ref([])
    </script>
    
    <template>
      <div class="min-h-screen bg-white">
        <LayoutTheNavbar />
        
        <div class="flex">
          <LayoutTheSidebar />
          
          <main class="flex-1 bg-gray-50">
            <div class="p-6">
              <!-- Page Header with Breadcrumb -->
              <div class="flex items-center justify-between mb-6">
                <h1 class="text-xl font-semibold text-gray-900">
                  Job Katalog
                </h1>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>Organisasi</span>
                  <Icon name="lucide:chevron-right" class="w-4 h-4" />
                  <span>Report</span>
                  <Icon name="lucide:chevron-right" class="w-4 h-4" />
                  <span class="font-semibold text-gray-900">Job Katalog</span>
                </div>
              </div>
    
              <!-- Content - Panggil Component -->
              <OrganizationJobKatalogTable :data="jobKatalogData" />
            </div>
          </main>
        </div>
      </div>
    </template>