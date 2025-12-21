<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const toast = useToast()

const fields = [{
  name: 'password',
  type: 'password' as const,
  label: 'New Password',
  placeholder: '',
}, {
  name: 'confirmPassword',
  type: 'password' as const,
  label: 'Confirm Password',
  placeholder: '',
}]

const schema = z.object({
  password: z.string({ error: 'Password is required' }).min(8, { error: 'Must be at least 8 characters' }),
  confirmPassword: z.string({ error: 'Confirm password is required' }).min(8, { error: 'Must be at least 8 characters' }),

}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type Schema = z.output<typeof schema>

const showError = ref(false)
const errorMessage = ref('')
const loading = ref(false)

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  showError.value = false

  const { error } = await supabase.auth.updateUser({
    password: payload.data.password,
  })

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    showError.value = true
    return
  }

  toast.add({
    title: 'Password updated',
    description: 'Your password has been updated successfully.',
    color: 'success',
  })
  navigateTo('/profile')
}

useSeoMeta({
  title: 'Update Password',
})
</script>

<template>
  <div class="h-screen flex items-center justify-center px-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        title="Set new password"
        description="Enter your new password below."
        :submit="{
          label: 'Update password',
          loading: loading,
        }"
        @submit="onSubmit"
      >
        <template #validation>
          <UAlert
            v-if="showError"
            color="error"
            icon="i-lucide-info"
            :title="errorMessage || 'Error updating password'"
          />
        </template>
        <template #footer>
          <ULink
            :to="'/login'"
            class="text-primary-500 font-medium"
          >Return to log in</ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
