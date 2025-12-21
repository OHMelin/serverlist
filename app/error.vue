<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <UError
        redirect="/"
        :error="{
          statusCode: 404,
          statusMessage: 'Page not found',
          message: 'The page you are looking for does not exist.',
        }"
      />
    </NuxtLayout>
  </UApp>
</template>
