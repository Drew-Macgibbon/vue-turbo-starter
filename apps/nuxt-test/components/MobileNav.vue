<template>
  <div id="mobiNav" class="mobi">
    <div class="mobi-icons">
      <div class="icon theme-change" />
      <NuxtLink rel="noreferrer" to="https://github.com/ml-tech-ltd" target="_blank" title="GitHub">
        <component class='icon' :is="iconGithub" />
      </NuxtLink> 
    </div>
    <div
      v-for="nav in routes"
      :key="nav.name"
    >
      <NuxtLink  :to="nav.path" class="mobi-link">
        <component class='icon' :is="nav.icon" />
        <span class="mobi-link-name">{{ nav.name }}</span>
      </NuxtLink >
    </div>
  </div>
</template>

<script setup lang="ts">

import iconBlog from '~icons/mdi/book-open-variant'
import iconHome from '~icons/mdi/home'
import iconAbout from '~icons/mdi/information-variant'
import iconGithub from '~icons/mdi/github'

const routes = [
  { icon: iconHome, name: 'Home', path: '/' },
  { icon: iconBlog, name: 'Blog', path: '/blog' },
  // { icon: iconAbout, name: 'About us', path: '/about' },
]

</script>
