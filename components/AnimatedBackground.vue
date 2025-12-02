<template>
  <div class="animated-bg">
    <div class="clouds">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
      <div class="cloud cloud-4"></div>
    </div>

    <div class="plane-container">
      <svg class="plane" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 30 L70 50 L65 52 L50 45 L35 52 L30 50 Z M50 30 L50 55 M45 55 L55 55"
          stroke="white"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="50" cy="30" r="4" fill="white" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.clouds {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.cloud {
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 100px;
}

.cloud::before,
.cloud::after {
  content: '';
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 100px;
}

.cloud-1 {
  width: 120px;
  height: 40px;
  top: 20%;
  left: -120px;
  animation: floatAcross 25s infinite linear;
}

.cloud-1::before {
  width: 50px;
  height: 50px;
  top: -25px;
  left: 20px;
}

.cloud-1::after {
  width: 60px;
  height: 40px;
  top: -15px;
  right: 20px;
}

.cloud-2 {
  width: 100px;
  height: 35px;
  top: 40%;
  left: -100px;
  animation: floatAcross 30s infinite linear 5s;
}

.cloud-2::before {
  width: 45px;
  height: 45px;
  top: -20px;
  left: 15px;
}

.cloud-2::after {
  width: 50px;
  height: 35px;
  top: -12px;
  right: 15px;
}

.cloud-3 {
  width: 140px;
  height: 45px;
  top: 60%;
  left: -140px;
  animation: floatAcross 35s infinite linear 10s;
}

.cloud-3::before {
  width: 60px;
  height: 60px;
  top: -30px;
  left: 25px;
}

.cloud-3::after {
  width: 70px;
  height: 45px;
  top: -18px;
  right: 25px;
}

.cloud-4 {
  width: 90px;
  height: 30px;
  top: 80%;
  left: -90px;
  animation: floatAcross 28s infinite linear 15s;
}

.cloud-4::before {
  width: 40px;
  height: 40px;
  top: -18px;
  left: 12px;
}

.cloud-4::after {
  width: 45px;
  height: 30px;
  top: -10px;
  right: 12px;
}

@keyframes floatAcross {
  0% {
    left: -200px;
  }
  100% {
    left: 110%;
  }
}

.plane-container {
  position: absolute;
  top: 15%;
  left: -100px;
  animation: flyAcross 12s infinite ease-in-out;
}

.plane {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: tilt 3s infinite ease-in-out;
}

@keyframes flyAcross {
  0% {
    left: -100px;
    top: 15%;
  }
  50% {
    left: 110%;
    top: 25%;
  }
  50.01% {
    left: -100px;
    top: 70%;
  }
  100% {
    left: 110%;
    top: 80%;
  }
}

@keyframes tilt {
  0%,
  100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}
</style>
