<template>
  <div :class="'wrapper c-center ' + props.bgColor">
    <div class="section c-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  // bg-accent, bg-primary or empty for none
bgColor: {
    type: String,
    default: 'none',
  },
})

</script>

