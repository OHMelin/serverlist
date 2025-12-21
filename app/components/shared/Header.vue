<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const userMenuItems = computed(() => [
  [{
    label: user.value?.email || 'My Account',
    slot: 'account',
    disabled: true,
  }],
  [{
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/profile',
  },
  {
    label: 'My Servers',
    icon: 'i-lucide-server',
    to: '/servers',
  }],
  [{
    label: 'Log out',
    icon: 'i-lucide-log-out',
    onSelect: logout,
  }],
])

async function logout() {
  await supabase.auth.signOut()
  toast.add({
    title: 'Logged out',
    description: 'You have been logged out successfully.',
    color: 'success',
  })
  navigateTo('/')
}
</script>

<template>
  <UHeader
    :to="'/'"
    :toggle="false"
  >
    <template #title>
      <p class="py-4">
        MinecraftFYP
      </p>
    </template>
    <template #right>
      <template v-if="user">
        <UDropdownMenu :items="userMenuItems">
          <UButton
            color="neutral"
            variant="ghost"
            class="gap-2"
          >
            <UAvatar
              :src="user.user_metadata?.avatar_url"
              :alt="user.email || 'User'"
              size="xs"
              icon="i-lucide-user"
            />
            <span class="hidden sm:inline truncate max-w-32">{{ user.email }}</span>
            <UIcon name="i-lucide-chevron-down" />
          </UButton>
          <template #account>
            <div class="text-left">
              <p class="font-medium text-highlighted truncate">
                {{ user.user_metadata?.full_name || 'My Account' }}
              </p>
              <p class="text-muted text-xs truncate">
                {{ user.email }}
              </p>
            </div>
          </template>
        </UDropdownMenu>
      </template>
      <template v-else>
        <div class="flex items-center gap-2">
          <UButton
            color="neutral"
            variant="ghost"
            :to="'/login'"
          >
            Log in
          </UButton>
          <UButton
            icon="i-lucide-user-plus"
            :to="'/signup'"
          >
            Register
          </UButton>
        </div>
      </template>
    </template>
  </UHeader>
</template>
