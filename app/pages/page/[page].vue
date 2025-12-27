<template>
  <div>
    <FrontpageHero />
    <UPageSection>
      <FrontpagePagination
        :items="servers"
        :per-page="10"
      >
        <template #default="{ items, startIndex }">
          <div class="flex flex-col gap-4">
            <FrontpageServer
              v-for="(server, index) in items"
              :key="server.ip"
              :server="server"
              :rank="startIndex + index + 1"
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
