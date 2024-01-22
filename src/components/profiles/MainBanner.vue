<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const isCollapsed = computed(() => props.collapsed);

const title = ref("Profile It");
</script>

<template>
  <transition-group tag="div" name="list">
    <header v-if="isCollapsed" class="w-full bg-pink-400 py-4 px-4 flex justify-between items-center" key="header">
      <h1 class="text-lg font-bold tracking-tighter text-[#1f2937]">{{ title }}</h1>
      <router-link to="/" class="text-[#1f2937] font-bold">Home</router-link>
    </header>
    <section v-else class="w-full bg-pink-400 py-12 md:py-24 lg:py-32 relative" key="banner">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <h1
          class="text-4xl font-bold tracking-tighter text-[#1f2937] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {{ title }}: From Ideas to Profiles
        </h1>
        <p class="mt-4 text-lg text-[#374151] md:text-xl lg:text-2xl">
          Let's make an idea shine with creativity and fun!
        </p>
        <p class="mt-4 text-lg md:text-xl lg:text-2xl">🧠 ➡️ 👤</p>
      </div>
      <router-link to="/" class="text-[#1f2937] font-semibold absolute top-5 right-5">Home</router-link>
    </section>
  </transition-group>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
