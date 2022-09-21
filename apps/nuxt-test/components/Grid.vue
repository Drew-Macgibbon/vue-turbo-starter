<template>
  <div :class="'grid ' + cols[props.columns] + rows[props.rows] + gap[props.gap]">
    <slot name="grid" />
  </div>
</template>

<script setup lang="ts">

const cols = [
  ' col-fill',
  ' col1',
  ' col2',
  ' col3',
  ' col4',
]

const rows = [
  ' row-fill',
  ' row1',
  ' row2',
  ' row3',
]

const gap = [
  ' no-gap',
  ' gap1',
  ' gap2',
  ' gap3',
  ' gap4',
]

const props = defineProps({
  columns: {
    type: Number,
    default: 2,
  },
  rows: {
    type: Number,
    default: 2,
  },
  gap: {
    type: Number,
    default: 2,
  },
})

</script>
