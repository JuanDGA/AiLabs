<script setup>
import { computed, ref, watch } from "vue";
import KatakanaCard from "@/components/japanese/KatakanaCard.vue";
import JapaneseBanner from "@/components/japanese/JapaneseBanner.vue";
import { storeToRefs } from "pinia";
import { useJapaneseStore } from "@/stores/japaneseStore.js";

const japaneseStore = useJapaneseStore();
const { katakanas, hasBeenUsed, loading } = storeToRefs(japaneseStore);
const { generateKatakana } = japaneseStore;

const name = ref("");
const katakanasContainer = ref();

const canGenerate = computed(() => name.value.trim().length > 0 && !loading.value);

watch(loading, (value) => {
  if (value) return;
  setTimeout(() => {
    katakanasContainer.value.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  }, 100);
});
</script>

<template>
  <div class="min-h-screen max-w-full bg-red-50">
    <JapaneseBanner :collapsed="hasBeenUsed" />
    <section class="mx-auto container px-5 md:px-12 py-5 md:py-8 lg:py-18">
      <p class="text-center my-4 text-lg text-[#374151] md:text-xl lg:text-2xl">
        Write your name and start learning.
      </p>
      <div class="flex flex-col gap-4 px-5 items-center justify-center">
        <input
          v-model="name"
          class="flex-1 px-4 py-2 border border-gray-900 rounded-lg text-[#374151] focus:outline-none focus:border-[#1f2937]"
          placeholder="Name here..."
          :disabled="loading"
          type="text"
          maxlength="50"
          ref="userInput"
        />
        <button
          @click="generateKatakana(name)"
          :disabled="!canGenerate"
          class="px-6 py-2 bg-gray-800 text-red-400 rounded-lg font-bold"
        >
          {{ loading ? "Generating..." : "Generate" }}
        </button>
      </div>
    </section>
    <div class="border-t-2" ref="katakanasContainer">
      <section class="flex flex-wrap gap-8 justify-center p-8">
        <KatakanaCard v-for="katakana in katakanas" :key="katakana.katakana" :katakana="katakana" />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
