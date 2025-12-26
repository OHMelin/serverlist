<template>
  <p>Lorem, ipsum.</p>
</template>

<script setup lang="ts">
const route = useRoute()
const { servers } = useServers()

const server = computed(() =>
  servers.value.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === route.params.id),
)

useSchemaOrg([
  defineWebPage({
    '@type': 'ItemPage',
    'name': computed(() => server.value?.name ?? 'Server'),
    'description': computed(() => server.value?.description ?? ''),
  }),
  {
    '@type': 'VideoGame',
    'name': computed(() => server.value?.name ?? ''),
    'description': computed(() => server.value?.description ?? ''),
    'image': computed(() => server.value?.icon ?? ''),
    'genre': computed(() => server.value?.tags ?? []),
    'gamePlatform': 'Minecraft Java Edition',
    'applicationCategory': 'Game Server',
    'operatingSystem': computed(() => server.value?.version ?? ''),
    'datePublished': computed(() => server.value?.dateAdded ?? ''),
  },
])
</script>
