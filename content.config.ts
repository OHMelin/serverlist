import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'
import { asSchemaOrgCollection } from 'nuxt-schema-org/content'

export default defineContentConfig({
  collections: {
    legal: defineCollection(
      asSchemaOrgCollection({
        type: 'page',
        source: 'legal/*.md',
      }),
    ),
    blog: defineCollection(
      asSchemaOrgCollection(
        asSitemapCollection({
          type: 'page',
          source: 'blog/*.md',
          schema: z.object({
            title: z.string(),
            description: z.string(),
            date: z.string(),
            image: z.string().optional(),
            authors: z.array(z.object({
              name: z.string(),
              avatar: z.string().optional(),
            })).optional(),
            badges: z.array(z.object({
              label: z.string(),
              color: z.string().optional(),
            })).optional(),
          }),
        }),
      ),
    ),
  },
})
