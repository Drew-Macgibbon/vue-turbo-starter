<template>
  <button @click="handleError">Clear errors</button>
  <p>{{ error }}</p>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>