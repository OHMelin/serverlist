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

useSchemaOrg([
  defineItemList({
    itemListElement: servers.value.map((server, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'VideoGame',
        'name': server.name,
        'description': server.description,
        'image': server.icon,
        'genre': server.tags,
        'gamePlatform': 'Minecraft Java Edition',
        'applicationCategory': 'Game Server',
        'operatingSystem': server.version,
        'datePublished': server.dateAdded,
      },
    })),
  }),
])
</script>
