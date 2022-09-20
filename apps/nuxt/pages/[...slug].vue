<template>
  <main>
    <div class="wrapper w-100 c-center pt4">
        <div
          class="legal-policy mt2 p2"
        >
          <ContentDoc>
            <template #not-found>
              <h1>There's no content to display</h1>
            </template>
            <template #empty>
              <h1>Document is empty</h1>
            </template>
          </ContentDoc>
        </div>
    </div>
  </main>
</template>

<script lang="ts" setup>

</script>