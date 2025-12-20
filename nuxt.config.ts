// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineOrganization } from 'nuxt-schema-org/schema'

const otelEnabled = process.env.OTEL_ENABLED === 'true'

export default defineNuxtConfig({

  devtools: { enabled: true }, compatibilityDate: '2025-07-15',
  ...(otelEnabled
    ? {}
    : {
        vite: {
          build: {
            rollupOptions: {
              external: [/^@opentelemetry\/.*/],
            },
          },
        },
        nitro: {
          rollupConfig: {
            external: [/^@opentelemetry\/.*/],
          },
        },
      }),
  modules: [
    '@nuxt/ui',
    'nuxt-seo-utils',
    'nuxt-link-checker',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/supabase',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'Minecraft, Serverlist, Gaming, Community' },
        { name: 'apple-mobile-web-app-title', content: 'Bookshelf' },
        { name: 'author', content: 'Valoks' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        { 'src': 'https://datafa.st/js/script.js', 'defer': true, 'data-website-id': 'dfid_XUHRpmaCssjM81ZZPh9wJ', 'data-domain': 'minecraftfyp.com', 'data-allow-localhost': true },
      ],
    },
  },
  css: ['@/assets/css/main.css'],
  runtimeConfig: {
    datafastApiKey: process.env.DATAFAST_API_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  linkChecker: {
    failOnError: true,
    runOnBuild: true,
  },
  schemaOrg: {
    identity: defineOrganization({
      name: 'MinecraftFYP',
      logo: '/favicon.svg',
    }),
  },
  seo: {
    meta: {
      description: 'The best Minecraft serverlist. Find your next favorite server on MinecraftFYP.',
      ogTitle: 'MinecraftFYP',
      ogType: 'website',
      ogImage: '/og-image.png',
      twitterCard: 'summary_large_image',
      twitterImage: '/twitter-image.png',
    },
  },
  supabase: {
    redirect: false,
  },
})
