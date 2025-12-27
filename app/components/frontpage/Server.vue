<template>
  <UPageCard class="relative overflow-hidden rounded">
    <template #default>
      <img
        v-if="server.banner"
        :src="server.banner"
        :alt="`${server.name} banner background`"
        class="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
      >
      <div class="relative flex flex-row gap-4">
        <div class="flex w-full flex-col gap-4 items-center">
          <img
            :src="server.icon"
            :alt="`${server.name} icon`"
            class="w-15 h-15 rounded"
          >
          <div class="text-center">
            <p class="font-bold">
              #{{ rank }}
            </p>
            <p>{{ server.name }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <img
            v-if="server.banner"
            :src="server.banner"
            :alt="`${server.name} banner`"
            class="h-15 w-117 rounded"
          >
          <div
            v-else
            class="h-15 w-117 rounded bg-gray-800 flex flex-col justify-center items-center px-2 overflow-hidden"
          >
            <p
              v-for="(line, index) in motdHtml"
              :key="index"
              class="text-sm leading-tight whitespace-nowrap"
              v-html="line"
            />
          </div>
          <p class="w-117 line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dignissimos ipsum quis ipsam repellat facere quam cumque quas. Laboriosam ipsam ratione sit nihil corrupti omnis quia iste vitae totam? Aperiam quae nisi sit id, explicabo fugit fugiat facilis eligendi repudiandae et, laudantium iusto molestiae dolor consequatur a ipsa nam ullam?
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <div class="h-15 w-50 flex flex-col">
            <UButton
              color="neutral"
              variant="soft"
              class="h-full rounded-b-none rounded-t justify-center font-mono"
              size="sm"
              @click="copyIp"
            >
              <span class="truncate">{{ server.ip }}</span>
            </UButton>
            <UButton
              color="primary"
              class="h-full rounded-t-none rounded-b justify-center"
              icon="i-lucide-copy"
              size="sm"
              @click="copyIp"
            >
              Copy
            </UButton>
          </div>
          <div>
            <p>
              <UIcon name="i-lucide-wifi" />
              {{ server.onlinePlayers }}/{{ server.maxPlayers }}
            </p>
            <p>
              <UIcon name="i-lucide-database" />
              Version: {{ server.version }}
            </p>
          </div>
        </div>

        <div class="flex w-full gap-2">
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in server.tags"
              :key="tag"
              color="neutral"
              variant="subtle"
              size="sm"
              class="h-fit"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>
      </div>
    </template>
  </UPageCard>
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
  dateAdded: string
}

const { server } = defineProps<{
  server: Server
  rank: number
}>()

const toast = useToast()
const motdHtml = ref<string[]>([])

if (!server.banner) {
  const { data } = await useFetch<{ motd?: { html?: string[] } }>(`https://api.mcsrvstat.us/2/${server.ip}`)
  if (data.value?.motd?.html) {
    motdHtml.value = data.value.motd.html
  }
}

async function copyIp() {
  await navigator.clipboard.writeText(server.ip)
  toast.add({
    title: 'Copied!',
    description: `${server.ip} copied to clipboard`,
    icon: 'i-lucide-check',
    color: 'success',
  })
}
</script>
