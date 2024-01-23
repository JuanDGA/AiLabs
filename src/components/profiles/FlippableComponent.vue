<script setup>
import { ref } from "vue";

const flipped = ref(false);
</script>

<template>
  <div @click="flipped = !flipped" class="relative">
    <transition name="flip">
      <div v-if="!flipped">
        <slot name="front" />
      </div>
      <div v-else>
        <slot name="back" />
      </div>
    </transition>
  </div>
</template>

<style>
.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter-to {
  transform: rotateY(0deg);
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(-180deg);
}

.flip-leave-to {
  transform: rotateY(180deg);
}

.flip-leave-from {
  opacity: 0;
  transform: rotateY(0deg);
}
</style>
