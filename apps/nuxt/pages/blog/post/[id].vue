
<template>
  <div
    v-if="article.id"
    class="wrapper c-center"
  > <div
    class="blog-post-hero-image-wrap mt6"
    >
      <img
        :src="imgWithTransforms(article.featured_image, transforms.article.large)"
        :alt="`${article.title} featured image`"
      />
  </div>
    <h1 class="blog-post-title mt4">
      {{ article.title }}
    </h1>
    <div class="blog-info mt4">
      <h6 class="m0">
        Published: {{ toDate({ date: article.created_at, precision: 'Hour'}) }}
      </h6>
      <div
        v-for="author in article.authors"
        :key="author.user.name"
        class="author-wrap flex gap1"
      >
        <div class="author flex gap1">
          <img :src="imgWithTransforms(author.user.avatar, transforms.avatar.small )" alt="">
          <div>
            <p class="m0">
              {{ author.user.name }}
            </p>
            <p class="m0">
              {{ author.user.role }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="blog-body-grid mt4 p3">
      <div class="blog-sidebar"/>
      <article class="blog-body" v-html="article.body" />
      <div
        class="blog-sidebar"
      />
    </div>
  </div>
 <div v-else> Loading... </div>
</template>

<script setup lang="ts">

async function renderArticle() {
  const id = useRoute().params.id
  const articles = useArticles()
  await articles.getArticles()
  return articles.byId(Number(id))
}
const article = await renderArticle()

useHead({
  title: `MLFX Blog - ${article.title}`,
  meta: [
    { name: 'description', content: article.excerpt },
  ],
})

const { toDate } = useDate()
const { imgWithTransforms, transforms } = useCloudinary()



</script>
