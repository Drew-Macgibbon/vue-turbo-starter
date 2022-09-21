<template>
  <div class="wrapper c-center">
    <div class="section pt4">
      <div>
        <Card
          class="bg-accent"
        >
          <template #card>
            <div class="foot-link-grid">
              <div class="foot-links align-left">
                <h6> Menu</h6>
                <NuxtLink  class="foot-link" to="/">
                  Home
                </NuxtLink >
                <NuxtLink  class="foot-link" to="/blog">
                  Blog
                </NuxtLink >
              </div>
              <div class="foot-links align-center">
                <!-- <h6> Menu</h6>
                <NuxtLink class="foot-link">Terms of Use</NuxtLink> 
                <NuxtLink class="foot-link">Terms of Use</NuxtLink> 
                <NuxtLink class="foot-link">Terms of Use</NuxtLink>  -->
              </div>
              <div class="foot-links align-right">
                <h6> Social</h6>
                <NuxtLink class="foot-link" :href="env.linkYoutube">Youtube</NuxtLink> 
                <NuxtLink class="foot-link" :href="env.linkFacebook">Facebook</NuxtLink> 
                <NuxtLink class="foot-link" :href="env.linkTelegram">Telegram</NuxtLink> 
                <NuxtLink class="foot-link" :href="env.linkGithub">Github</NuxtLink> 
              </div>
            </div>
            <div class="foot-disclaimer">
              <ContentRenderer :value="disclaimer">
                <ContentRendererMarkdown :value="disclaimer" />
                <template #empty>
                  <p>No content found.</p>
                </template>
              </ContentRenderer>
            </div>
          </template>
        </Card>
      </div>
      <div
        class="foot-legal"
      >
        <div
          v-for="l in links"
          :key="l.name"
          class="p2"
        >
          <NuxtLink  class="legal-link" :to="'/legal/' + l.slug">
            {{ l.name }}
          </NuxtLink >
        </div>
      </div>
    </div>
    <div class="foot-copyright">
      © COPYRIGHT ML TECH LTD. 2020-2022
    </div>
  </div>
</template>

<script setup lang="ts">

const v = useNuxtApp()
const env = v.$env

const { data: disclaimer } = await useAsyncData('short-disclaimer', () => queryContent('/legal/_short-disclaimer').findOne())

const links = [
  { id: 1, name: 'Terms of Use', slug: 'terms-of-use', component: 'Terms' },
  { id: 2, name: 'Privacy Policy', slug: 'privacy-policy', component: 'Privacy' },
  { id: 3, name: 'Cookies Policy', slug: 'cookies-policy', component: 'Cookies' },
]

</script>
