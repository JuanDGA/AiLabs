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
const shortcut = ref();

const canGenerate = computed(() => name.value.trim().length > 0 && !loading.value);

watch(loading, (value) => {
  if (value) return;
  setTimeout(() => {
    shortcut.value.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  }, 100);
});
</script>

<template>
  <div class="min-h-screen max-w-full bg-red-50 pb-5 md:pb-8 lg:pb-18">
    <JapaneseBanner :collapsed="hasBeenUsed" />
    <section class="mx-auto container px-5 md:px-12 pb-5 md:pb-8 lg:pb-18 pt-0">
      <p class="text-center my-4 text-lg text-[#374151] md:text-xl lg:text-2xl">
        Write your name ...
      </p>
      <div class="flex flex-col gap-4 px-5 items-center justify-center pt-2" ref="shortcut">
        <input
          @keyup.enter="generateKatakana(name)"
          v-model="name"
          class="flex-1 px-4 py-2 border border-gray-900 rounded-lg text-[#374151] focus:outline-none focus:border-[#1f2937]"
          placeholder="eg. Carlos"
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
    <div class="border-t-2">
      <section class="flex flex-wrap gap-8 justify-center p-8">
        <KatakanaCard v-for="katakana in katakanas.toReversed()" :key="katakana.katakana" :katakana="katakana" />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
