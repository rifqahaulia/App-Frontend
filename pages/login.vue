<script setup lang="ts">
const { setTokens } = useAuth()
const route = useRoute()

definePageMeta({ ssr: false })

const isProcessingToken = ref(false)
const errorMessage = ref('')

const callbackUrl = 'http://localhost:3000/login'
const redirectUri = btoa(callbackUrl)
const ssoUrl = `https://auth.airnavindonesia.co.id/?redirect_uri=${redirectUri}`

const extractTokenFromPath = () => {
  const pathParts = route.path.split('/')
  if (pathParts.length === 3 && pathParts[1] === 'login' && pathParts[2].length > 10) {
    return pathParts[2]
  }
  return null
}

const processToken = async (token: string) => {
  isProcessingToken.value = true
  errorMessage.value = ''

  try {
    const res: any = await $fetch(
      'https://auth.airnavindonesia.co.id/user/verify-token',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    if (res?.validToken === true || res?.status === 'success') {
      await setTokens(token, '')
      navigateTo('/dashboard')
    } else {
      errorMessage.value = 'Token tidak valid atau expired'
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan server saat verifikasi'
  } finally {
    isProcessingToken.value = false
  }
}

onMounted(async () => {
  const tokenFromPath = extractTokenFromPath()
  if (tokenFromPath) {
    await processToken(tokenFromPath)
    return
  }

  const error = route.query.error as string
  if (error) {
    if (error === 'invalid_token') {
      errorMessage.value = 'Token tidak valid atau expired'
    } else if (error === 'server_error') {
      errorMessage.value = 'Terjadi kesalahan server'
    } else {
      errorMessage.value = `Terjadi kesalahan: ${error}`
    }
  }
})

const goToSSO = () => {
  window.location.href = ssoUrl
}

const getStarStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${2 + Math.random() * 2}s`
  }
}

const getCloudStyle = (index: number) => {
  return {
    top: `${Math.random() * 90}%`,
    animationDelay: `${Math.random() * 15}s`,
    animationDuration: `${20 + Math.random() * 15}s`
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Stars/dots background -->
    <div class="absolute inset-0">
      <div class="star" v-for="n in 50" :key="n" :style="getStarStyle(n)"></div>
    </div>

    <!-- Clouds -->
    <div class="absolute inset-0">
      <div class="cloud" v-for="n in 8" :key="n" :style="getCloudStyle(n)">
        <svg viewBox="0 0 200 60" class="w-32 h-auto opacity-30">
          <ellipse cx="100" cy="30" rx="50" ry="20" fill="white"/>
          <ellipse cx="70" cy="30" rx="35" ry="18" fill="white"/>
          <ellipse cx="130" cy="30" rx="35" ry="18" fill="white"/>
        </svg>
      </div>
    </div>

    <!-- Logo pojok kiri atas -->
    <div class="absolute top-8 left-8 z-30">
      <img src="/assets/logo.png" alt="AirNav Logo" class="h-16 w-auto drop-shadow-2xl" />
    </div>

    <!-- Main card -->
    <div class="relative z-10 w-full max-w-md">
      <div class="bg-gradient-to-br from-blue-100/70 to-cyan-100/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12">
        <div class="text-center space-y-8">
          <!-- Icon -->
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <!-- Title -->
          <div>
            <h1 class="text-3xl font-bold text-blue-800 mb-3">
              Masuk ke Aplikasi
            </h1>
            <p class="text-base text-blue-700">
              Gunakan akun AirNav Indonesia untuk mengakses sistem
            </p>
          </div>

          <!-- Error message -->
          <div v-if="errorMessage" class="bg-red-100 border border-red-300 rounded-xl p-4">
            <p class="text-sm text-red-700 font-medium">{{ errorMessage }}</p>
          </div>

          <!-- Login button -->
          <button
            @click="goToSSO"
            :disabled="isProcessingToken"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isProcessingToken">Login via AirNav Auth</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          </button>

          <!-- Footer -->
          <div class="pt-4 border-t border-blue-200">
            <p class="text-xs text-blue-600">
              Secure authentication powered by AirNav Indonesia
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.cloud {
  position: absolute;
  left: -200px;
  animation: float-cloud linear infinite;
}

@keyframes float-cloud {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100vw + 200px));
  }
}
</style>
