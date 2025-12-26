<template>
  <USelect
    v-model="selectedSort"
    :items="sortOptions"
    class="w-48"
  >
    <template #leading>
      <UIcon name="i-heroicons-arrows-up-down" />
    </template>
  </USelect>
</template>

<script lang="ts" setup>
import type { SortOption } from '~/composables/useServers'

const { currentSort, setSort } = useServerSort()

const sortOptions: { label: string, value: SortOption }[] = [
  { label: 'Players Online', value: 'players_online' },
  { label: 'A-Z', value: 'name' },
  { label: 'Newest First', value: 'newest' },
]

const selectedSort = computed({
  get: () => currentSort.value,
  set: (value: SortOption) => setSort(value),
})
</script>
