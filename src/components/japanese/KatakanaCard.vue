<script setup>
  import configuration from "@/service/configuration.json";
  import { generateSpeech } from '@/service/speechGenerator.js'
  import KatakanaCardSentence from '@/components/japanese/KatakanaCardSentence.vue'

  const props = defineProps({
    katakana: {
      type: Object,
      default: configuration.japanese.katakanaTemplate
    }
  });

  const {play, pause, playing, loading, audio} = generateSpeech();

  const handleListening = () => {
    if (playing.value) {
      pause();
    } else {
      play(props.katakana.katakana, "male");
    }
  };
</script>

<template>
  <audio class="hidden" ref="audio" />
  <div class="max-w-md bg-white p-8 rounded-md shadow-lg">
    <h2 class="text-2xl font-bold mb-4">{{ katakana.name }}</h2>
    <div class="mb-6">
      <p class="text-lg font-semibold mb-2">Katakana:</p>
      <p class="text-xl">{{ katakana.katakana }}</p>
      <button
        @click="handleListening"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        {{ loading ? "Generating" : playing ? "Pause" : "Listen" }} Katakana
      </button>
    </div>

    <div>
      <p class="text-lg font-semibold mb-2">Sentences:</p>
      <div class="space-y-4">
        <KatakanaCardSentence v-for="(sentence, index) in katakana.sentences" :key="index" :sentence="sentence" :index="index" />
      </div>
    </div>
  </div>
</template>
