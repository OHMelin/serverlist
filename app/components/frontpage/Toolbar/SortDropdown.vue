<template>
  <USelect
    v-model="selectedSort"
    :items="sortOptions"
    variant="none"
    class="w-48 ring ring-inset ring-accented"
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
