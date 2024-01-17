<script setup>
  import { ref } from 'vue'

  const flipped = ref(false)
</script>

<template>
  <div @click="flipped = !flipped">
    <div v-show="!flipped">
      <slot name="front" />
    </div>
    <div v-show="flipped" class="back">
      <slot name="back" />
    </div>
  </div>
</template>
