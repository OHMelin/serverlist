<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: '',
}]

const schema = z.object({
  email: z.string({ error: 'Email is required' }).email({ error: 'Invalid email' }),
})

type Schema = z.output<typeof schema>

const showError = ref(false)
const errorMessage = ref('')
const loading = ref(false)
const emailSent = ref(false)

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  showError.value = false

  const { error } = await supabase.auth.resetPasswordForEmail(payload.data.email, {
    redirectTo: `${window.location.origin}/update-password`,
  })

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    showError.value = true
    return
  }

  emailSent.value = true
  toast.add({
    title: 'Email sent',
    description: 'Check your inbox for a password reset link.',
    color: 'success',
  })
}

useSeoMeta({
  title: 'Reset Password',
})
</script>

<template>
  <div class="h-screen flex items-center justify-center px-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        title="Reset your password"
        description="Enter the email address associated with your account, and we'll send you a link to reset your password."
        :submit="{
          label: 'Continue',
          loading: loading,
          disabled: emailSent,
        }"
        @submit="onSubmit"
      >
        <template #validation>
          <UAlert
            v-if="emailSent"
            color="success"
            icon="i-lucide-check"
            title="Check your email for a reset link"
          />
          <UAlert
            v-else-if="showError"
            color="error"
            icon="i-lucide-info"
            :title="errorMessage || 'Error sending reset email'"
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
