
<template>
  <div class="wrapper pt4">
    <h2 class="align-center">
      MLFX BLOG
    </h2>
    <!-- <CirclePosts :show="6"
      :title="'Broadcasts'" /> -->
    <Section :bg-color="'accent'"
      class="pt4 pb4">
      <template #default>
        <h6 class="h-center mb4"> Articles </h6>
        <Articles :show="20" />
      </template>
    </Section>
  </div>
</template>

<script setup lang="ts">

const articles = useArticles()
articles.getArticles()

const { toDate } = useDate()
const { imgWithTransforms, transforms } = useCloudinary()

useHead({
  title: 'MLFX - Blog',
  meta: [
    { name: 'description', content: 'Get all the latest news about MLFX, Forex education, and much more.' },
  ],
})

</script>
