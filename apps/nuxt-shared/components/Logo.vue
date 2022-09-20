<template>
  <img :src="logoURL" class="logo">
</template>

<script setup lang="ts">

const logoURL = ref()

onMounted(() => {
  function setURL() {
    const dark = isDark()
    if (dark) logoURL.value = '/favicon-dark.png'
    else logoURL.value = '/favicon-light.png'
  }

  setURL()

  document.addEventListener('theme-change', (e) => {
    const event = e as CustomEvent
    if (event.detail === 'dark') logoURL.value = '/favicon-dark.png'
    else logoURL.value = '/favicon-light.png'
  })
})

</script>

