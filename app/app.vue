<script setup lang="ts">
const { locale } = useLocale()

useHead({
  htmlAttrs: {
    lang: locale
  }
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
