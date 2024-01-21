<script setup>
import { computed, ref } from 'vue'
  import { katakanaGenerator } from '@/service/japanese/katakanaGenerator.js'
import KatakanaCard from '@/components/japanese/KatakanaCard.vue'

  const name = ref("");

  const {loading, ask, response} = katakanaGenerator();

  const generateKatakana = async () => {
    await ask(name.value);
  };

  const canGenerate = computed(() => name.value.trim().length > 0 && !loading.value);
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 px-5 items-center justify-center">
    <input
      v-model="name"
      class="flex-1 px-4 py-2 border border-gray-900 rounded-lg text-[#374151] focus:outline-none focus:border-[#1f2937]"
      placeholder="Just free your mind here..."
      :disabled="loading"
      type="text"
      maxlength="50"
      ref="userInput"
    />
    <button
      @click="generateKatakana"
      :disabled="!canGenerate"
      class="px-6 py-2 bg-gray-800 text-red-400 rounded-lg font-bold"
    >
      {{ loading ? "Generating..." : "Generate" }}
    </button>
  </div>
  <div>
    <TransitionGroup tag="section" name="list" class="flex flex-wrap gap-8 justify-center p-8">
      <KatakanaCard v-for="katakana in response" :key="katakana.katakana" :katakana="katakana" />
    </TransitionGroup>
  </div>
</template>

<style scoped>

</style>
