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
}, {
  name: 'newsletter',
  label: 'Get emails about product updates. You can unubscribe at any time.',
  type: 'checkbox' as const,
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
  email: z.string({ error: 'Email is required' }).email({ error: 'Invalid email' }),
  password: z.string({ error: 'Password is required' }).min(8, { error: 'Must be at least 8 characters' }),
  newsletter: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

const showError = ref(false)
const errorMessage = ref('')
const loading = ref(false)

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  showError.value = false

  const { error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      data: {
        newsletter: payload.data.newsletter ?? false,
      },
    },
  })

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    showError.value = true
    return
  }

  toast.add({
    title: 'Account created',
    description: 'Please check your email to confirm your account.',
    color: 'success',
  })
  navigateTo('/login')
}

useSeoMeta({
  title: 'Signup',
})
</script>

<template>
  <div class="h-screen flex items-center justify-center px-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        title="Create your account"
        :submit="{
          label: 'Create account',
          loading: loading,
        }"
        @submit="onSubmit"
      >
        <template #validation>
          <UAlert
            v-if="showError"
            color="error"
            icon="i-lucide-info"
            :title="errorMessage || 'Error creating account'"
          />
        </template>
        <template #footer>
          Already have an account? <ULink
            :to="'/login'"
            class="text-primary-500 font-medium"
          >Log in</ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
