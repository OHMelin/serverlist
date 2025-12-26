<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function logout() {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <div>
    <p>{{ user?.email }}</p>
    <UButton
      color="error"
      @click="logout"
    >
      Log out
    </UButton>
  </div>
</template>
