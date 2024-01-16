<script setup>
import { profileGenerator } from "@/service/profileGenerator.js";
import ProfileCard from "@/components/ProfileCard.vue";
import MainBanner from "@/components/MainBanner.vue";
import { ref, watch } from "vue";
import { ideaGenerator } from "@/service/ideaGenerator.js";

const { loading, response, ask } = profileGenerator();
const { getIdea } = ideaGenerator();

const query = ref("");

const hasBeenUsed = ref(false);
const userInput = ref();

const generateProfile = async () => {
  loading.value = true;
  let queryValue = query.value;
  if (queryValue.trim().length === 0) {
    queryValue = await getIdea();
  }
  await ask(queryValue);
  hasBeenUsed.value = true;
};

watch(
  response,
  () => {
    query.value = "";
  },
  { deep: true },
);
</script>

<template>
  <MainBanner :collapsed="hasBeenUsed" />
  <section class="mx-auto container px-5 md:px-12 py-5 md:py-8 lg:py-18">
    <p class="text-center my-4 text-lg text-[#374151] md:text-xl lg:text-2xl">
      Just imagine something... Anything could be a character! Leave the field empty to be surprised.
    </p>
    <div class="flex flex-col md:flex-row gap-4 px-5 items-center justify-center">
      <input
        v-model="query"
        class="flex-1 px-4 py-2 border border-gray-900 rounded-lg text-[#374151] focus:outline-none focus:border-[#1f2937]"
        placeholder="Just free your mind here..."
        :disabled="loading"
        type="text"
        ref="userInput"
      />
      <button
        @click="generateProfile"
        :disabled="loading"
        class="px-6 py-2 bg-gray-800 text-yellow-400 rounded-lg font-bold"
      >
        {{ loading ? "Generating..." : "Generate" }}
      </button>
    </div>
  </section>
  <div>
    <TransitionGroup tag="section" name="list" class="flex flex-wrap gap-8 justify-center p-8">
      <div v-for="profile in response" :key="profile.name">
        <ProfileCard :profile="profile" />
      </div>
    </TransitionGroup>
  </div>
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
