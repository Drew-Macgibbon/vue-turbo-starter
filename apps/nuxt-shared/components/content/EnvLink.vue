<template>
  <NuxtLink :href="app.$env[link]">{{ text }}</NuxtLink> 
</template>


<script lang="ts" setup>

defineProps({
  text: {
    type: String,
    default: 'here'
  },
  link: {
    type: String,
    default: 'na'
  },
})

const app = useNuxtApp()

</script>

<style lang="scss">

</style>