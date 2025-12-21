<template>
  <UFooter>
    <template #top>
      <USeparator />
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Copyright © 2024-{{ new Date().getFullYear() }}
      </p>
      <i class="text-muted text-sm">NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.</i>
    </template>

    <template #default>
      <UButton
        color="neutral"
        variant="outline"
        to="https://valoks.com/?ref=minecraftfyp"
        target="_blank"
      >
        Built by Valoks
      </UButton>
    </template>

    <template #right>
      <UButton
        icon="i-simple-icons-linkedin"
        color="neutral"
        variant="ghost"
        to="https://www.linkedin.com/company/valoks"
        target="_blank"
        aria-label="LinkedIn"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/valoks"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
    <template #bottom>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <p>The best Minecraft serverlist. Find your next favorite server on MinecraftFYP.</p>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const columns = [
  {
    label: 'More from Valoks',
    children: [
      {
        label: 'TouchGrass Store',
        to: 'https://touchgrass.store/?ref=minecraftfyp',
        target: '_blank',
      },
      {
        label: 'Bookshelf',
        to: 'https://bookshelf.im/?ref=minecraftfyp',
        target: '_blank',
      },
      {
        label: 'ACC Web Client',
        to: 'https://minecraftafk.com/web/?ref=minecraftfyp',
        target: '_blank',
      },
      {
        label: 'ACC Local Client',
        to: 'https://minecraftafk.com/local/?ref=minecraftfyp',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Legal',
    children: [
      {
        label: 'Terms of Service',
        to: '/legal/tos',
      },
      {
        label: 'Privacy Policy',
        to: '/legal/privacy',
      },
    ],
  },
  {
    label: 'Support',
    children: [
      {
        label: 'Email Support',
        to: 'mailto:support@minecraftfyp.com',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Blog',
        to: '/blog',
      },
      {
        label: 'Changelog',
        to: '/changelog',
      },
      {
        label: 'Careers',
        to: '/careers',
      },
    ],
  },
]
</script>
