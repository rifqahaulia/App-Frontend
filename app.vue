<script setup lang="ts">
// untuk layout global, misalnya navbar, footer, dsb
</script>

<template>
  <div>
    <!-- Komponen Nuxt utama dengan Layout -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtRouteAnnouncer />
  </div>
</template>
