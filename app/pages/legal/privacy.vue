<template>
  <div>
    <UPageHero title="Privacy Policy" />

    <UPageSection :ui="{ container: '!pt-0' }">
      <ContentRenderer :value="privacy" />
    </UPageSection>
  </div>
</template>

<script setup>
const privacy = await queryCollection('legal').path('/legal/privacy').first()

useHead(privacy.head || {})
useSeoMeta({
  title: 'Privacy Policy',
})
</script>
