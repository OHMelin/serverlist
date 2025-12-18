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
  }),
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'Minecraft, Serverlist, Gaming, Community' },
        { name: "apple-mobile-web-app-title", content: "Bookshelf" },
        { name: 'author', content: 'Valoks' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ]
    }
  },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxt/ui']
})
