<template>
  <div class="landing">
    <div class="landing-wrapper pt4">
      <Hero />
      <Features />
      <Community />
      <!-- <CirclePosts :title="'Upcoming Features'"
        :ammount="6"
        :type="'coming-soon'" />-->
      <Science />
      <Instruments />
      <PricingHome />
      <!-- <CirclePosts :title="'What\'s Happening'"
        :ammount="6"
        :type="'broadcasts'"
        :post-background="'background'" />-->
      <Articles :show="6" />
    </div>
  </div>
</template>

<script setup lang="ts">

useHead({
  title: 'MLFX - Home',
  meta: [
    { name: 'description', content: 'MLFX (Machine Learning Forex) provides powerful maching learning Forex tools for everyday traders' },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.plyr.io/3.7.2/plyr.css",
    },
  ],
  script: [
    // {
    //   src: "https://player.vimeo.com/api/player.js",
    // },
    {
      src: "https://cdn.plyr.io/3.7.2/plyr.js",
    },
  ],
})

</script>

<style lang="scss">
.h-center {
  padding: 0;
  display: flex;
  justify-content: center;
}
</style>
