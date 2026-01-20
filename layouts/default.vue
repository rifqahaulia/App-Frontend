<template>
  <div class="layout-default">
    <slot />
  </div>
</template>

<style scoped>
.layout-default {
  min-height: 100vh;
}

/* Responsive utilities */
@media (max-width: 640px) {
  .layout-default {
    font-size: 14px;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .layout-default {
    font-size: 15px;
  }
}

@media (min-width: 769px) {
  .layout-default {
    font-size: 16px;
  }
}
</style>
