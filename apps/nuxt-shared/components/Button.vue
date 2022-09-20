
<template>
  <div
    :class="'button ' + props.buttonType"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  buttonType: {
    type: String,
    default: '',
  },
})

</script>
