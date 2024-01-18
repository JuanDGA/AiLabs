<script setup>
  import { ref } from 'vue'

  const flipped = ref(false);
</script>

<template>
  <div @click="flipped = !flipped">
    <div v-show="!flipped" key="front">
      <slot name="front" />
    </div>
    <div v-show="flipped" key="back">
      <slot name="back" />
    </div>
  </div>
</template>
