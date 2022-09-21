<template>
  <div
    id="gallery"
    >
    <a
    class="play-button"
    data-lg-size="1280-720"
    data-src="https://vimeo.com/707218719"
    >
      <component class='icons huge' :is="iconPlay" />
    </a> 
  </div>
 </template>

<script setup lang="ts">
/* eslint-disable no-console */

import iconPlay from '~icons/mdi/play-circle-outline'
const { setupGallery } = useVideo()
onMounted(() => setupGallery())

function onInit() {
  console.log('lightGallery has been initialized')
}
function onBeforeSlide() {
  console.log('calling before slide')
}

</script>
