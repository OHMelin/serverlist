<template>
  <div>
    <slot
      :items="paginatedItems"
      :current-page="currentPage"
      :total-pages="totalPages"
    />

    <div
      v-if="totalPages > 1"
      class="flex justify-center mt-6"
    >
      <UPagination
        :default-page="currentPage"
        :total="items.length"
        :items-per-page="perPage"
        :to="getPageUrl"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
const route = useRoute()

const props = withDefaults(defineProps<{
  items: T[]
  perPage?: number
}>(), {
  perPage: 10,
})

const currentPage = computed(() => {
  const pageParam = route.params.page
  const page = Number(pageParam) || 1
  return Math.max(1, Math.min(page, totalPages.value || 1))
})

const totalPages = computed(() => Math.ceil(props.items.length / props.perPage))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.perPage
  const end = start + props.perPage
  return props.items.slice(start, end)
})

function getPageUrl(page: number) {
  return page === 1 ? '/' : `/page/${page}`
}
</script>
