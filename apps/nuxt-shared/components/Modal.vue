<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    v-on="$listeners"
  >
    <span class="modal__title">
      <slot name="title" />
    </span>
    <div class="modal__content">
      <slot :params="params" />
    </div>
    <i
      class="fas fa-times modal__close"
      @click="close"
    />
  </vue-final-modal>
</template>

<script setup lang="ts">

import { VueFinalModal } from 'vue-final-modal/dist/VueFinalModal.esm'

</script>
