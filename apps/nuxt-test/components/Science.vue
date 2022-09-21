
<template>
  <Section
    class="pt4 pb4"
    :bg-color="'accent'"
    >
    <div
      class="grid col2 gap4 pt4 pb4">
      <div class="science">
        <h1>Backed by Science</h1>
        <ContentRenderer :value="data">
          <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
        <div class="flex">
          <NuxtLink  :to="env.linkHermes">
            <p :id="gtag.conversion.signup" class="button primary pill big pl1 pr1 mt2 mb2">
              Try MLFX now
            </p>
          </NuxtLink >
        </div>
      </div>
      <div class="grid col-fill">
        <ContentList
          path="/science"
          v-slot="{ list }"
          class="flex gap1">
          <div
            v-for="sci in list.slice(1,4)"
            :key="sci.title"
            class="info"
          >
            <h5> {{ sci.title }}</h5>
            <p>
              {{ sci.benefit }}
            </p>
          </div>
        </ContentList>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">

const app = useNuxtApp()
const env = app.$env

const gtag = useGtag()

const { data } = await useAsyncData('science-home', async () => await queryContent('/science/_1.science-home').findOne())

</script>
