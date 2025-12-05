<script setup lang="ts">
const { accessToken } = useAuth()

const showLoginScreen = ref(false)

// Redirect jika sudah login
onMounted(() => {
  if (accessToken.value) {
    navigateTo('/dashboard')
  }
})

const callbackUrl = 'http://localhost:3000/login'
const redirectUri = btoa(callbackUrl)
const ssoUrl = `https://auth.airnavindonesia.co.id/?redirect_uri=${redirectUri}`

const handleStart = () => {
  console.log('Start button clicked')
  showLoginScreen.value = true
}

const handleLogin = () => {
  console.log('Login button clicked')
  console.log('SSO URL:', ssoUrl)
  console.log('Redirecting to AirNav Auth...')
  window.location.href = ssoUrl
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated background shapes -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <!-- Logo pojok kiri atas -->
    <div class="absolute top-8 left-8 z-30 animate-fade-in">
      <img src="/logoApp.png" alt="AirNav Logo" class="h-16 w-auto drop-shadow-lg" />
    </div>

    <!-- Splash Screen - Full screen clickable -->
    <div 
      v-if="!showLoginScreen"
      @click="handleStart"
      class="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
    >
      <div class="text-center animate-fade-in-up">
        <div class="space-y-4">
          <h1 class="text-6xl md:text-8xl font-bold text-white leading-tight animate-pulse-slow">
            Welcome App
          </h1>
          <p class="text-xl md:text-2xl text-blue-100">
            Aplikasi Perkantoran AirNav Indonesia
          </p>
          <p class="text-sm md:text-base text-blue-200 mt-8 opacity-70">
            Klik di mana saja untuk melanjutkan
          </p>
        </div>
      </div>
    </div>

    <!-- Login Screen - Slide up from bottom -->
    <div 
      v-if="showLoginScreen"
      class="relative z-10 w-full max-w-6xl mx-auto animate-slide-up-bottom"
    >
      <div class="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row animate-slide-up border border-white/50">
        
        <!-- Left side - Welcome text -->
        <div class="w-full md:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute top-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full"></div>
          <div class="absolute bottom-10 left-10 w-24 h-24 border-4 border-white/20 rounded-full"></div>
          <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-lg transform rotate-45"></div>
          
          <div class="relative z-10 space-y-4 md:space-y-6 animate-fade-in-up">
            <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight">
              Welcome App
            </h1>
            <p class="text-lg md:text-2xl text-blue-100 leading-relaxed">
              Selamat datang di Aplikasi Perkantoran AirNav Indonesia.
            </p>
          </div>
        </div>

        <!-- Right side - Login form -->
        <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center animate-fade-in-up animation-delay-200 bg-white/20">
          <div class="space-y-6 md:space-y-8">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto shadow-lg mb-4 md:mb-6">
                <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
                Login
              </h2>
              <p class="text-sm md:text-base text-gray-600">
                Masuk menggunakan akun AirNav Indonesia
              </p>
            </div>

            <button
              @click="handleLogin"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-base md:text-lg"
            >
              Login via AirNav Auth
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animated shapes */
.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  bottom: -150px;
  right: -150px;
  animation-delay: 5s;
}

.shape-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* Fade in animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up-bottom {
  from {
    opacity: 0;
    transform: translateY(100vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-out;
}

.animate-slide-up-bottom {
  animation: slide-up-bottom 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-zoom-in {
  animation: zoom-in 0.6s ease-out;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
}
</style>
