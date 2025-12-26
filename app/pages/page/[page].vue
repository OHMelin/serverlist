<template>
  <div>
    <FrontpageHero />
    <UPageSection>
      <FrontpageToolbar />
      <FrontpagePagination
        :items="servers"
        :per-page="10"
      >
        <template #default="{ items }">
          <div class="flex flex-col gap-4">
            <FrontpageServer
              v-for="server in items"
              :key="server.position"
              :server="server"
            />
          </div>
        </template>
      </FrontpagePagination>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
const { servers } = useServers()
</script>
