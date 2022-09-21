<template>
  <div
  class="plyr__video-embed"
  id="player"
    style="aspect-ratio: 16 / 9; width: 100%;"
  >
    <iframe
      src="https://player.vimeo.com/video/707218719"
      style="padding: 1rem;"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
      referrerpolicy="no-referrer"
      title="Player for Official Release: Toob &quot;Wavaphon&quot; Music Video"
      data-ready="true"
      tabindex="-1">
    </iframe>
  </div>
</template>

<script setup lang="ts">
// https://github.com/sampotts/plyr
/* eslint-disable no-console */
import iconPlay from '~icons/mdi/play-circle-outline'

function onInit() {
  console.log('lightGallery has been initialized')
}
function onBeforeSlide() {
  console.log('calling before slide')
}

</script>
