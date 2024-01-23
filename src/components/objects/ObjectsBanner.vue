<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const isCollapsed = computed(() => props.collapsed);

const title = ref("DayToDay");
</script>

<template>
  <transition tag="div" name="banner">
    <header
      v-if="isCollapsed"
      class="w-full bg-blue-400 py-4 px-4 flex justify-between items-center"
      key="header"
    >
      <h1 class="text-lg font-bold tracking-tighter text-[#1f2937]">{{ title }}</h1>
      <router-link to="/" class="text-[#1f2937] font-bold">Home</router-link>
    </header>
    <section v-else class="w-full bg-blue-400 py-12 md:py-24 lg:py-32 relative" key="banner">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <h1
          class="text-4xl font-bold tracking-tighter text-[#1f2937] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {{ title }}: Just a look through our days
        </h1>
        <p class="mt-4 text-lg text-[#374151] md:text-xl lg:text-2xl">
          Discover amazing objects that you will never be able to imagine! Meh... Just kidding. Objects from the day to day life.
        </p>
      </div>
      <router-link to="/" class="text-[#1f2937] font-semibold absolute top-5 right-5"
      >Home</router-link
      >
    </section>
  </transition>
</template>

<style>
.banner-enter-active,
.banner-leave-active {
  transition: all 0.75s ease-out;
}

.banner-enter-to {
  top: 0;
}

.banner-enter-from {
  position: absolute;
  top: -100%;
}

.banner-leave-to {
  position: absolute;
  top: -100%;
}

.banner-leave-from {
  position: absolute;
  top: 0;
}
</style>
