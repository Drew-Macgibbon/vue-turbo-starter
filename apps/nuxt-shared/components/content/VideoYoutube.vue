<template>
  <div class="video-youtube">
    <iframe
      width="100%"
      height="100%"
      :src="`https://www.youtube.com/embed/${youtube_id}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>


<script lang="ts" setup>

defineProps({
  // video: {
  //   type: String,
  //   default: 'Defaultzz'
  // },
  name: {
    type: String,
    default: 'VideoYoutubez'
  },
  youtube_id: {
    type: String,
    default: 'Nothing'
  },
})

</script>

<style lang="scss">

.video-youtube {
  width: 100%;
  aspect-ratio: 16/9;
  margin-bottom: 2rem;
}

</style>