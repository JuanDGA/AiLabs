<script setup>
import ProfileCard from "@/components/profiles/ProfileCard.vue";
import MainBanner from "@/components/profiles/MainBanner.vue";
import { ref, watch } from "vue";
import { useProfilesStore } from "@/stores/profilesStore.js";
import { storeToRefs } from "pinia";

const profilesStore = useProfilesStore();
const { profiles, hasBeenUsed, loading } = storeToRefs(profilesStore);
const { generateProfile } = profilesStore;

const query = ref("");

const profilesContainer = ref();

watch(
  profiles,
  () => {
    query.value = "";
  },
  { deep: true },
);

watch(loading, (value) => {
  if (value) return;
  setTimeout(() => {
    profilesContainer.value.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  }, 100);
});
</script>

<template>
  <div class="min-h-screen max-w-full bg-pink-50">
    <MainBanner :collapsed="hasBeenUsed" />
    <section class="mx-auto container px-5 md:px-12 py-5 md:py-8 lg:py-18">
      <p class="text-center my-4 text-lg text-[#374151] md:text-xl lg:text-2xl">
        Just imagine something... Anything could be a character! Leave the field empty to be
        surprised.
      </p>
      <div class="flex flex-col gap-4 px-5 items-center justify-center">
        <input
          v-model="query"
          class="flex-1 px-4 py-2 border border-gray-900 rounded-lg text-[#374151] focus:outline-none focus:border-[#1f2937]"
          placeholder="Just free your mind here..."
          :disabled="loading"
          type="text"
          maxlength="50"
        />
        <button
          @click="generateProfile(query)"
          :disabled="loading"
          class="px-6 py-2 bg-gray-800 text-pink-400 rounded-lg font-bold"
        >
          {{ loading ? "Generating..." : "Generate" }}
        </button>
      </div>
      <p v-if="hasBeenUsed" class="text-center font-light mt-2">
        You can click a profile to find an "Introduce yourself"
      </p>
    </section>
    <div class="border-t-2" ref="profilesContainer">
      <TransitionGroup tag="section" name="list" class="flex flex-wrap gap-8 justify-center p-8">
        <ProfileCard
          v-for="profile in profiles.toReversed()"
          :key="profile.name"
          :profile="profile"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
