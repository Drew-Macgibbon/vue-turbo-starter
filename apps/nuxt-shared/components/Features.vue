<template>
  <Section
    class="pt4 pb4"
    :bg-color="'accent'"
  >
    <template #default>
      <h2 class="pb4">Why MLFX?</h2>
      <Grid
        :columns="3"
        :rows="2"
        :gap="2"
      >
        <template #grid>
          <div
            v-for="feature in features"
            :key="feature.id"
            class="flex gap1">
            <div class="feature-count">
              <h4 class="count">
                {{ feature.id }}
              </h4>
            </div>
            <div>
              <h5> {{ feature.title }} </h5>
              <ContentRenderer :value="feature">
                <ContentRendererMarkdown :value="feature" />
              </ContentRenderer>
            </div>
          </div>
        </template>
      </Grid>
    </template>
  </Section>
</template>

<script lang="ts" setup>
const features = await queryContent('features').find()
// onBeforeMount(async () => {
// })

</script>