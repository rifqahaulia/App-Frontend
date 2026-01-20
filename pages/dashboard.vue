<script setup lang="ts">
const { getProfile, accessToken, profile } = useAuth()

// Cek token di client side saja untuk menghindari SSR issues
onMounted(async () => {
  console.log('Dashboard mounted, token exists:', !!accessToken.value)
  
  // Fetch profile jika ada token dan belum ada profile
  if (accessToken.value && !profile.value) {
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
      <div class="min-h-screen bg-white flex flex-col">
        <LayoutTheNavbar />
        
        <div class="flex flex-1">
          <LayoutTheSidebar />
          
          <main class="flex-1 bg-gray-50 flex items-center justify-center px-4 md:px-6 lg:px-8 overflow-hidden">
            <div class="max-w-4xl mx-auto text-center">
              <div class="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-full mb-6 sm:mb-8">
                <Icon name="lucide:network" class="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />
              </div>
              
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Selamat Datang di Dashboard
              </h1>
              
              <p class="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                Halo, <span class="font-semibold text-blue-600">{{ profile?.data?.name || 'User' }}</span>
              </p>
              
              <div class="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-2xl px-6 sm:px-8 py-3 sm:py-4">
                <Icon name="lucide:check-circle" class="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                <p class="text-green-700 font-semibold text-base sm:text-lg">
                  Anda berhasil login ke sistem
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
