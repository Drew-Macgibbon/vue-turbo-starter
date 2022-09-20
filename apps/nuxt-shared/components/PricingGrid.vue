
<template>
  <div class="flex-row gap2">
    <ContentList
      path="/pricing"
      v-slot="{ list }"
      class="grid col3 gap3"
      >
      <div
        v-for="plan in setArrayLength(list, show)"
        :key="plan._path"
      >
        <div
          v-if="plan"
        >
          <Card
            class="gap1 bg-accent"
          >
            <template #card>
              <p class="badge">Only {{ plan.spots }} spots</p>
              <h4>{{ plan.plan }}</h4>
              <p class="sub-head"> {{ plan.subtitle }}</p>
              <div class="flex v-center pt1">
                <h5 class="new-price">
                  {{ plan.price }}
                </h5>
              </div>
              <ul class="sub-features">
                <li
                  v-for="feature in plan.features"
                  :key="feature">
                    {{ feature }}
                </li>
              </ul>
              <NuxtLink :id="gtag.conversion.signup" class="button primary" :to="env.linkHermes">{{ plan.cta }}</NuxtLink> 
              <p class="align-center">{{ plan.ctaTag }}</p>
            </template>
          </Card>
        </div>
        <div v-else>
          <p>No articles found.</p>
        </div>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">


function setArrayLength(arr, newLength) {
  arr.length = newLength
  return arr
}

const props = defineProps({
  show: {
    type: Number,
    default: 1,
  },
})

const app = useNuxtApp()
const env = app.$env
const gtag = useGtag()

</script>
