<template>
  <div>
    <UPageHero
      title="Blog"
      description="Read our latest blogs, development updates and other exciting news."
    />

    <UPageSection :ui="{ container: '!pt-0' }">
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in allPosts"
          :key="index"
          v-bind="post"
          :to="post.path"
        />
      </UBlogPosts>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
type BadgeColor
  = | 'primary'
    | 'neutral'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'

type BadgeVariant
  = | 'outline'
    | 'soft'
    | 'subtle'
    | 'solid'

interface BadgeType {
  label: string
  color: BadgeColor
  variant: BadgeVariant
}

const allPostsRaw = await queryCollection('blog').order('date', 'DESC').all()

const allPosts = allPostsRaw.map(post => ({
  ...post,
  badge: post.badges?.[0] as BadgeType,
  authors: post.authors?.map(author => ({
    ...author,
    avatar: typeof author.avatar === 'string'
      ? { src: author.avatar }
      : author.avatar,
  })),
}))

useSeoMeta({
  title: 'Blog',
})
</script>
