<template>
  <div>
    <UPageHero title="Terms of Service" />

    <UPageSection :ui="{ container: '!pt-0' }">
      <ContentRenderer :value="tos" />
    </UPageSection>
  </div>
</template>

<script setup>
const tos = await queryCollection('legal').path('/legal/tos').first()

useHead(tos.head || {})
useSeoMeta({
  title: 'Terms of Service',
})
</script>
