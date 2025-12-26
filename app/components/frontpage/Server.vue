<template>
  <div class="relative w-full rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
    <div class="absolute inset-0 h-full">
      <img
        v-if="server.banner"
        :src="server.banner"
        :alt="`${server.name} banner`"
        class="w-full h-full object-cover opacity-20"
      >
    </div>

    <div class="relative flex items-center gap-4 p-4">
      <div class="shrink-0 w-8 text-center">
        <span class="text-xl font-bold text-gray-400">#{{ server.position }}</span>
      </div>

      <div class="shrink-0">
        <img
          :src="server.icon"
          :alt="`${server.name} icon`"
          class="w-16 h-16 rounded object-cover bg-gray-800"
        >
      </div>

      <div class="grow min-w-0">
        <h3 class="text-lg font-semibold truncate">
          {{ server.name }}
        </h3>
        <p class="text-sm text-gray-400 truncate">
          {{ server.description }}
        </p>
      </div>

      <div class="shrink-0 flex items-center gap-2">
        <div class="bg-gray-800 rounded px-3 py-2 flex items-center gap-2">
          <span class="text-sm font-mono">{{ server.ip }}</span>
          <UButton
            icon="i-heroicons-clipboard-document"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="Copy IP"
            @click="copyIp"
          />
        </div>
      </div>

      <div class="shrink-0 flex gap-1">
        <UBadge
          v-for="tag in server.tags.slice(0, 3)"
          :key="tag"
          color="neutral"
          variant="subtle"
          size="sm"
        >
          {{ tag }}
        </UBadge>
      </div>

      <div class="shrink-0 text-right min-w-24">
        <p class="text-sm font-semibold">
          {{ server.onlinePlayers.toLocaleString() }} / {{ server.maxPlayers.toLocaleString() }}
        </p>
        <p class="text-xs text-gray-500">
          {{ server.version }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Server {
  position: number
  icon: string
  banner?: string
  name: string
  description: string
  ip: string
  tags: string[]
  onlinePlayers: number
  maxPlayers: number
  version: string
}

const props = defineProps<{
  server: Server
}>()

async function copyIp() {
  await navigator.clipboard.writeText(props.server.ip)
}
</script>
