
<template>
  <Section
    v-if="instruments"
    :bg-color="'none'"
    class="pt4 pb4"
  >
    <template #default>
      <div class="blog-subtitle">
        <h6 class="sub-head align-left">
          Supported Instruments
        </h6>
      </div>
      <div class="grid col-fill">
        <div
          v-for="instrument in instruments"
          :key="instrument.id"
        >
          <div class="instrument-wrap flex c-center">
            <h6 class="instrument">
              {{ instrument.name }}
            </h6>
          </div>
        </div>
      </div>
      <div class="blog-subtitle">
        <h6 class="align-right bold pr1 pt1">
          More coming soon
        </h6>
      </div>
    </template>
  </Section>
</template>

<script setup lang="ts">

import { instruments } from '~/types/instruments.interface'

</script>

