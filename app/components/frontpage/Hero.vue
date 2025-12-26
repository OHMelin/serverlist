<template>
  <section class="relative w-full h-[40vh] min-h-80 overflow-hidden">
    <img
      :src="heroImage"
      alt="Hero background"
      class="absolute inset-0 w-full h-full object-cover"
    >

    <div
      class="absolute inset-0 bg-black/70"
      aria-hidden="true"
    />

    <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
      <div class="mb-8">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold">
          {{ serverCount.toLocaleString('en-US') }} servers
        </h1>
        <p class="text-xl md:text-2xl lg:text-3xl mt-2 font-light">
          {{ playerCount.toLocaleString('en-US') }} players online
        </p>
      </div>

      <UInput
        v-model="searchQuery"
        placeholder="Search servers..."
        icon="i-heroicons-magnifying-glass"
        size="xl"
        class="w-full max-w-lg"
        :ui="{ base: 'h-12' }"
        @keyup.enter="onSearch"
      >
        <template #trailing>
          <UButton
            color="primary"
            size="sm"
            icon="i-heroicons-plus"
            to="/servers/add"
          >
            Add
          </UButton>
        </template>
      </UInput>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import heroImage from '../../assets/images/hero.jpg'

const searchQuery = ref('')
const serverCount = ref(13428)
const playerCount = ref(235072541)

function onSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(`/servers/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}
</script>
