<template>
  <div class="hero-wrapper">
    <div class="hero-section mb4">
      <div class="hero-text gap2">
        <h1 class="p0">
          {{ hero.title }}
        </h1>
        <p class="sub-head">
          {{ hero.subtitle }}
        </p>
        <div class="hero-cta-wrap">
          <NuxtLink  :to="env.linkHermes">
            <p :id="gtag.conversion.signup" class=" button primary pill big hero-cta"> {{ hero.cta }}</p>
          </NuxtLink >
          <span class="pl1 hero-cta-tag"> {{ hero.ctaTag }}</span>
        </div>
      </div>
      <div class="hero-video">
        <VideoLightbox class="featured-video" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const gtag = useGtag()
const v = useNuxtApp()
const env = v.$env

const { data: hero } = await useAsyncData('hero', () => queryContent('/website-copy/_1.hero').findOne())

</script>
