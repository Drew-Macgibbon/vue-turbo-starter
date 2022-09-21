
<template>
  <div class="wrapper pt4 pb0">
    <h2 class="align-center pb0">
      Pricing
    </h2>
    <PricingGrid :show="2" />
  </div>
</template>

<script setup lang="ts">

useHead({
  title: 'MLFX - Pricing',
  meta: [
    { name: 'description', content: 'View MLFX Pricing' },
  ],
})

</script>
