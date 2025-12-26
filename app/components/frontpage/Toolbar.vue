<template>
  <div class="flex items-center justify-between">
    <p class="text-lg font-medium">
      {{ serverCount.toLocaleString() }} servers found
    </p>

    <div class="flex items-center gap-2">
      <FrontpageToolbarFilterButton />
      <FrontpageToolbarSortDropdown />
    </div>
  </div>
</template>

<script lang="ts" setup>
const serverCount = ref(13428)
</script>
