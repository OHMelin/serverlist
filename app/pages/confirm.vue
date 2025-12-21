<script setup lang="ts">
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const redirectTo = (route.query.redirect as string) || '/profile'
  router.replace(redirectTo)
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <UIcon
      name="i-lucide-loader-circle"
      class="size-8 animate-spin"
    />
  </div>
</template>
