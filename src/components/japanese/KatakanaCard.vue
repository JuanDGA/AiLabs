<script setup>
  import configuration from "@/service/configuration.json";
  import { generateSpeech } from '@/service/speechGenerator.js'
  import KatakanaCardSentence from '@/components/japanese/KatakanaCardSentence.vue'
  import GIcon from '@/components/common/GIcon.vue'

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
  <div class="max-w-md bg-white p-8 rounded-md shadow-lg relative">
    <audio class="hidden" ref="audio" />
    <h2 class="text-2xl font-bold mb-4">{{ katakana.name }}</h2>
    <div class="mb-6">
      <p class="text-lg font-semibold mb-2">Katakana:</p>
      <p class="text-xl">{{ katakana.katakana }}</p>
      <button
        @click="handleListening"
        class="absolute top-1 right-1 p-1 bg-gray-100 text-black rounded-full hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-300 ease-in-out"
      >
        <GIcon v-if="loading" icon="hourglass_empty" />
        <GIcon v-else-if="playing" icon="pause" />
        <GIcon v-else icon="volume_up" />
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
