<script setup lang="ts">
const { getProfile, accessToken, profile } = useAuth()

// Cek token di client side saja untuk menghindari SSR issues
onMounted(async () => {
  console.log('Dashboard mounted, token exists:', !!accessToken.value)
  
  if (!accessToken.value) {
    console.log('No token, redirecting to home')
    navigateTo('/')
    return
  }
  
  // Fetch profile jika belum ada
  if (!profile.value) {
    try {
      console.log('Fetching profile...')
      await getProfile()
      console.log('Profile loaded:', profile.value)
    } catch (err) {
      console.error('Failed to get profile:', err)
      // Tetap stay di dashboard meskipun profile gagal
    }
  }
})
</script>

<template>
  <div>
    <ClientOnly>
      <div class="min-h-screen bg-white">
        <LayoutTheNavbar />
        
        <div class="flex">
          <LayoutTheSidebar />
          
          <main class="flex-1 bg-gray-50 p-8">
            <div class="max-w-4xl mx-auto">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-32 h-32 bg-blue-50 rounded-full mb-8">
                  <Icon name="lucide:network" class="w-16 h-16 text-blue-500" />
                </div>
                
                <h1 class="text-5xl font-bold text-gray-900 mb-6">
                  Selamat Datang di Dashboard
                </h1>
                
                <p class="text-xl text-gray-600 mb-8">
                  Halo, <span class="font-semibold text-blue-600">{{ profile?.data?.name || 'User' }}</span>
                </p>
                
                <div class="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-2xl px-8 py-4">
                  <Icon name="lucide:check-circle" class="w-7 h-7 text-green-600" />
                  <p class="text-green-700 font-semibold text-lg">
                    Anda berhasil login ke sistem
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
