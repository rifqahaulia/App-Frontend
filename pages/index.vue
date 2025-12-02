<script setup lang="ts">
const { accessToken } = useAuth()

const handleStart = () => {
  if (accessToken.value) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
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
          <!-- Title -->
          <div>
            <h1 class="text-3xl font-bold text-blue-800 mb-3">
              Selamat Datang di APP
            </h1>
            <p class="text-base text-blue-700">
              Aplikasi Perkantoran AirNav Indonesia
            </p>
          </div>

          <!-- Button -->
          <button
            @click="handleStart"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
          >
            {{ accessToken ? 'Masuk Dashboard' : 'Mulai' }}
          </button>
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
