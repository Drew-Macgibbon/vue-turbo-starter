<template>
  <Section class="pb4">
    <template #default>
      <h2 class="h-center mt4 mb4"> Community </h2>
      <div class="featured-image-wrap mb2">
        <div class="featured-image community-img">
          <img src="/mlfx-community.png"
            alt="MLFX Community">
        </div>
      </div>
      <Grid :columns="3"
        :rows="2"
        class="gap2">
        <template #grid>
          <ContentList path="/community"
            v-slot="{ list }"
            class="flex gap1">
            <div v-for="community in list"
              :key="community.id"
              class="flex gap1">
              <div class="community-icon">
                <component class='icons large'
                  :is="iconFunction(community.icon)" />
              </div>
              <div>
                <h5> {{ community.title }} </h5>
                <p> {{ community.benefit }} <strong class="coming-soon"> {{ availableNow(community.available_now)}} </strong></p>
              </div>
            </div>
          </ContentList>
        </template>
      </Grid>
    </template>
  </Section>
</template>

<script setup lang="ts">

// if you change the names of these you need to update the "icon" name in .MD file
import iconChat from '~icons/mdi/chat-processing'
import iconGroupChat from '~icons/mdi/wechat'
import iconFeedback from '~icons/mdi/lightbulb-alert'
import iconSocial from '~icons/mdi/account-group'
import iconLivestreams from '~icons/mdi/movie-play'
import iconSupport from '~icons/mdi/lifebuoy'

const icons = [
  { svg: iconChat, name: 'mdi-chat-processing' },
  { svg: iconGroupChat, name: 'mdi-wechat' },
  { svg: iconFeedback, name: 'mdi-lightbulb-alert' },
  { svg: iconSocial, name: 'mdi-account-group' },
  { svg: iconLivestreams, name: 'mdi-movie-play' },
  { svg: iconSupport, name: 'mdi-lifebuoy' },
]

function iconFunction(svg) {
  let tempIcon
  icons.forEach(i => {
    if(i.name === svg) tempIcon = i.svg
  })
  return tempIcon
}

function availableNow(available) {
  if(!available) return 'Coming Soon!'
  return
}


</script>

<style lang="scss">
.community-icon {
  display: flex;
  align-items: center;
  padding-right: 1rem;
}

.coming-soon {
  color: #f57077;
}
</style>