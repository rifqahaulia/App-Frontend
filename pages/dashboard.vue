<script setup lang="ts">
const { getProfile, accessToken } = useAuth()
const profile = ref<any>(null)

onMounted(async () => {
  if (!accessToken.value) {
    navigateTo('/login')
    return
  }
  
  try {
    const result = await getProfile()
    profile.value = result
  } catch (err) {
    console.error('Failed to get profile:', err)
    navigateTo('/login')
  }
})
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <TheSidebar />
    
    <div class="flex-1 flex flex-col overflow-hidden">
      <TheNavbar />
      
      <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-2xl shadow-sm p-8">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Icon name="lucide:check-circle" class="w-8 h-8 text-green-600" />
              </div>
              
              <h1 class="text-3xl font-bold text-gray-800 mb-2">
                Selamat Datang! 🎉
              </h1>
              
              <p class="text-lg text-gray-600 mb-6">
                Halo, <span class="font-semibold text-blue-600">{{ profile?.data?.name || profile?.data?.username }}</span>
              </p>
              
              <div class="inline-block bg-green-50 border border-green-200 rounded-lg px-6 py-3">
                <p class="text-green-700 font-medium">
                  ✓ Anda berhasil login ke sistem
                </p>
              </div>
            </div>
            
            <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <Icon name="lucide:users" class="w-8 h-8 mb-3" />
                <h3 class="text-lg font-semibold mb-1">Total Users</h3>
                <p class="text-3xl font-bold">1,234</p>
              </div>
              
              <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <Icon name="lucide:file-text" class="w-8 h-8 mb-3" />
                <h3 class="text-lg font-semibold mb-1">Documents</h3>
                <p class="text-3xl font-bold">567</p>
              </div>
              
              <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <Icon name="lucide:activity" class="w-8 h-8 mb-3" />
                <h3 class="text-lg font-semibold mb-1">Active Tasks</h3>
                <p class="text-3xl font-bold">89</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
