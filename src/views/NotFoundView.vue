<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <h1 class="text-4xl font-bold">404</h1>
    <p class="text-gray-500">Not found.</p>
    <router-link to="/">
      <Button label="Voltar para a Home" icon="pi pi-home" />
    </router-link>
  </div>
</template>