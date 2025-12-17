// https://nuxt.com/docs/api/configuration/nuxt-config
const otelEnabled = process.env.OTEL_ENABLED === 'true'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ...(otelEnabled ? {} : {
    vite: {
      build: {
        rollupOptions: {
          external: [/^@opentelemetry\/.*/]
        }
      }
    },
    nitro: {
      rollupConfig: {
        external: [/^@opentelemetry\/.*/]
      }
    }
  })
})
