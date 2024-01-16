<script setup>
import { profileGenerator } from "@/service/profileGenerator.js";
import ProfileCard from "@/components/ProfileCard.vue";
import MainBanner from "@/components/MainBanner.vue";
import { ref, watch } from 'vue'
import { ideaGenerator } from '@/service/ideaGenerator.js'

const { loading, response, ask } = profileGenerator();
const { getIdea } = ideaGenerator();

const query = ref("")

const generateProfile = async () => {
  loading.value = true;
  let queryValue = query.value
  if (queryValue.trim().length === 0) {
    queryValue = await getIdea()
  }
  ask(queryValue);
}

watch(response, () => {
  query.value = "";
}, {deep: true})

</script>

<template>
  <MainBanner />
  <section class="mx-auto container px-5 md:px-12 py-5 md:py-8 lg:py-18">
    <p class="text-center my-4 text-lg text-[#374151] md:text-xl lg:text-2xl">
      Just imagine something... Anything could be a character!
      ¿A gold ingot? Yes! ¿Purple wood piece? Of course!
      Wanna some help to imagine ideas? Then, leave the field empty and be ready to be surprised.
    </p>
    <div class="flex flex-col md:flex-row gap-4 px-5 items-center justify-center">
      <input
        v-model="query"
        class="flex-1 px-4 py-2 border border-gray-900 rounded-lg text-[#374151] focus:outline-none focus:border-[#1f2937]"
        placeholder="Just free your mind here..."
        :disabled="loading"
        type="text"
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
    <section class="flex flex-wrap gap-8 justify-center p-8">
      <div v-for="(profile, index) in response" :key="index">
        <ProfileCard :profile="profile" />
      </div>
    </section>
  </div>
</template>
