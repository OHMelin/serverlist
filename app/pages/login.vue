<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()

const toast = useToast()

const signInWithOAuth = async (provider: 'discord' | 'google') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/profile`,
    },
  })
  if (error) {
    toast.add({ title: 'Error', description: error.message, color: 'error' })
  }
}

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: '',
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: '',
}]

const providers = [{
  label: 'Discord',
  icon: 'i-simple-icons-discord',
  onClick: () => signInWithOAuth('discord'),
}, {
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => signInWithOAuth('google'),
}]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const showError = ref(false)
const errorMessage = ref('')
const loading = ref(false)

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  showError.value = false

  const { error } = await supabase.auth.signInWithPassword({
    email: payload.data.email,
    password: payload.data.password,
  })

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    showError.value = true
    return
  }

  toast.add({
    title: 'Welcome back!',
    description: 'You have been logged in successfully.',
    color: 'success',
  })
  navigateTo('/profile')
}

useSeoMeta({
  title: 'Login',
})
</script>

<template>
  <div class="h-screen flex items-center justify-center px-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        title="Log in to your account"
        :submit="{
          label: 'Log in',
          loading: loading,
        }"
        @submit="onSubmit"
      >
        <template #password-hint>
          <ULink
            :to="'/reset-password'"
            class="text-primary-500 font-medium"
            tabindex="-1"
          >Forgot password?</ULink>
        </template>
        <template #validation>
          <UAlert
            v-if="showError"
            color="error"
            icon="i-lucide-info"
            :title="errorMessage || 'Error logging in'"
          />
        </template>
        <template #footer>
          Don't have an account? <ULink
            :to="'/signup'"
            class="text-primary-500 font-medium"
          >Sign up</ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
