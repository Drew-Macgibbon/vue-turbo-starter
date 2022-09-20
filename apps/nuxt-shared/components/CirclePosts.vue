
<template>
  <div v-if="$route.path === '/'"
    class="pb4">
    <h2 class="h-center"> {{ title }} </h2>
  </div>
  <div v-else class="h-center">
    <h6 class=" pb4 pt2"> {{ title }} </h6>
  </div>
  <Section v-if="latest(show, type)"
    id="postWrapper"
    :bg-color="'none'"
    class="post-wrapper overlay pb4">
    <template #default>
      <!-- <div class="blog-subtitle">
        <h6 class="sub-head align-left">
          {{ capatalizeFirstLetters(type) }}
        </h6>
      </div> -->
      <div :class="'post-grid ' + postBackground">
        <div class="grid col3 row-fill">
          <div v-for="post in latest(show, type)"
            :id="'post' + post.id"
            :key="post.id">
            <Card class="post bg-accent h-100">
              <template #card>
                <div>
                  <h5> {{ post.name }}</h5>
                  <div class="flex v-center gap1">
                    <!-- <div
                      v-for=" tag in post.tags"
                      :key="tag.id"
                    >
                      <p class="card-tag">
                        {{ tag.name }}
                      </p>
                    </div> -->
                    <p>
                      {{ toDate({ date: post.created_at, precision: 'Day'}) }}
                    </p>
                  </div>
                </div>
                <div class="post-body"
                  v-html="post.body.body" />
                <div class="btn-wrap">
                  <div :id="'post' + post.id"
                    class="button primary-outline"
                    @click="post.show = true">
                    Open post
                  </div>
                  <Modal v-model="post.show"
                    @confirm="'confirm'"
                    @cancel="'cancel'">
                    <div class="post-title-wrap">
                      <h3 class="m0">
                        {{ post.name }}
                      </h3>
                    </div>
                    <p class="open-post"
                      v-html="post.body.body" />
                  </Modal>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </template>
  </Section>
</template>

<script setup lang="ts">

const props = defineProps({
  type: {
    type: String,
    default: 'broadcasts',
  },
  postBackground: {
    type: String,
    default: 'no-background',
  },
  show: {
    type: Number,
    default: 6,
  },
  title: {
    type: String,
    default: 'No Title',
  },
})

const { toDate } = useDate()
const { getPublicPost, latest } = useCircle()
getPublicPost({ type: props.type })

</script>

<style lang="scss">
.up-shadow {
  margin-bottom: 1rem;
  box-shadow: 0 -8px 14px 2px rgba(0, 0, 0, 0.18);
}

.post-more {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post-grid {
  display: grid;
  height: 100%;
  gap: 2rem;

  &.single {
    grid-template-columns: minmax(420px, 1fr);
  }

  &.double {
    grid-template-columns: repeat(2, minmax(420px, 1fr));
  }

  &.max {
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  }

  &.single-row {
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(360px, 480px)) !important;
    grid-template-rows: minmax(240px, 1fr);
  }

  // admin
}
</style>

