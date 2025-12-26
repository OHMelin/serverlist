<template>
  <UButton
    color="neutral"
    variant="outline"
    icon="i-heroicons-funnel"
    @click="isOpen = true"
  />

  <USlideover v-model:open="isOpen">
    <template #title>
      Filter Servers
    </template>

    <template #body>
      <div class="flex flex-col gap-6">
        <div>
          <h3 class="text-sm font-medium mb-3">
            Server Version
          </h3>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="version in availableVersions"
              :key="version"
              :color="isVersionSelected(version) ? 'primary' : 'neutral'"
              :variant="isVersionSelected(version) ? 'solid' : 'outline'"
              size="sm"
              @click="toggleVersion(version)"
            >
              {{ version }}
            </UButton>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-3">
            Server Tags
          </h3>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="tag in availableTags"
              :key="tag"
              :color="isTagSelected(tag) ? 'primary' : 'neutral'"
              :variant="isTagSelected(tag) ? 'solid' : 'outline'"
              size="sm"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </UButton>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          variant="outline"
          @click="clearFilters"
        >
          Clear All
        </UButton>
        <UButton
          color="primary"
          @click="isOpen = false"
        >
          Apply Filters
        </UButton>
      </div>
    </template>
  </USlideover>
</template>

<script lang="ts" setup>
const { availableVersions, availableTags, selectedVersions, selectedTags, toggleVersion, toggleTag, clearFilters } = useServerFilter()

const isOpen = ref(false)

function isVersionSelected(version: string) {
  return selectedVersions.value.includes(version)
}

function isTagSelected(tag: string) {
  return selectedTags.value.includes(tag)
}
</script>
