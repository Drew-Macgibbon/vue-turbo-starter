
<template>
  <div class="wrapper w-100 c-center pt4">
    <div class="legal-wrapper">
      <div class="legal-disclaimer pb4 max-w">
        <h3> MLFX Disclaimer </h3>
        <ContentRenderer :value="disclaimer">
          <ContentRendererMarkdown :value="disclaimer" />
        </ContentRenderer>
        <div
          class="legal-policy m2 p-8"
        >
        <ContentDoc />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// import {storeToRefs} from 'pinia'
// import { useLegal } from '~/composables/useLegal'
// import useCloudinary from '~/composables/useCloudinary'

const { data: disclaimer } = await useAsyncData('disclaimer', () => queryContent('/legal/_full-disclaimer').findOne())

useHead({
  title: 'MLFX - Cookies Policy',
  meta: [
    { name: 'description', content: 'MLFX policies and legal' },
  ],
})

// eslint-disable-next-line no-console

</script>
