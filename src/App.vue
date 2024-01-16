<script setup>
import { profileGenerator } from "@/service/generator.js";
import ProfileCard from "@/components/ProfileCard.vue";
import MainBanner from "@/components/MainBanner.vue";

const { loading, query, response, ask } = profileGenerator();
</script>

<template>
  <MainBanner />
  <section class="mx-auto container md:px-6 py-5 md:py-8 lg:py-12">
    <div class="flex flex-col md:flex-row gap-2 items-center justify-center">
      <input
        v-model="query"
        class="w-96 flex-1 px-4 py-2 border border-gray-900 rounded-lg text-[#374151] focus:outline-none focus:border-[#1f2937]"
        placeholder="Write down your idea here... Or leave it empty to be surprised"
        :disabled="loading"
        type="text"
      />
      <button
        @click="ask"
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
