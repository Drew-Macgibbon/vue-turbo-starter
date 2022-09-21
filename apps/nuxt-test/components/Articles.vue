<template>
  <Section :bg-color="'accent'"
    :style=" { 'min-height': (620 * (show/3)) + 'px' } "
    class="pt4 pb4">
    <template #default>
      <h2 v-if="bigTitle"
        class="h-center mb4"> Articles </h2>
      <h6 v-else
        class="h-center mb4"> Articles </h6>
      <div class="grid col3 gap1">
        <div v-for="article in articles.latest(show)"
          :key="article.id"
          class="flex">
          <Card class="bg-primary">
            <template #card>
              <div class="card-image"
                :style="{
                  backgroundImage:'url(' + imgWithTransforms(article.featured_image, transforms.article.small) + ')',
                  backgroundSize: 'contain',
                }">
                <p class="card-tag primary absolute">
                  {{ article.category.name }}
                </p>
              </div>
              <div class="card-info v-center gap1">
                <div v-for="tag in article.tags"
                  :key="tag.tag.name">
                  <p class="card-tag">
                    {{ tag.tag.name }}
                  </p>
                </div>
                <p>
                  {{ toDate({ date: article.created_at, precision: 'Day'}) }}
                </p>
              </div>
              <h5 class="card-title p0">
                {{ article.title }}
              </h5>
              <p class="card-excerpt">
                {{ article.excerpt }}
              </p>
              <NuxtLink class="nav-link button primary"
                :to="'/blog/post/' + article.id">
                Read more
              </NuxtLink>
            </template>
          </Card>
        </div>
      </div>
    </template>
  </Section>
</template>

<script setup lang="ts">

const props = defineProps({
  show: {
    type: Number,
    default: 6,
  },
  bigTitle: {
    type: Boolean,
    default: true,
  },
})

const articles = useArticles()
await articles.getArticles()

const { toDate } = useDate()
const { imgWithTransforms, transforms } = useCloudinary()

</script>
