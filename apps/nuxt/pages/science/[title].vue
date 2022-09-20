
<template>
  <div class="wrapper w-100 c-center pt2">
    <div class="legal-wrapper">
      <div
        class="max-w pb4">
        <ContentDoc v-slot="{ doc }">
          <h1>Hermes {{ doc.title }}</h1>
          <ContentRenderer
            class="legal-policy p2"  
            :value="doc" >
            <ContentRendererMarkdown :value="doc" />
          </ContentRenderer>
        </ContentDoc>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
