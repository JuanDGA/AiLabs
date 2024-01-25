<script setup>
import configuration from "@/service/configuration.json";
import { generateSpeech } from "@/service/speechGenerator.js";
import KatakanaCardSentence from "@/components/japanese/KatakanaCardSentence.vue";
import GIcon from "@/components/common/GIcon.vue";

const props = defineProps({
  katakana: {
    type: Object,
    default: configuration.japanese.katakanaTemplate,
  },
});

const { play, pause, playing, loading, audio } = generateSpeech();

const handleListening = () => {
  if (playing.value) {
    pause();
  } else {
    play(props.katakana.uid, props.katakana.katakana, "male");
  }
};
</script>

<template>
  <div class="max-w-md bg-white p-8 rounded-md shadow-lg relative">
    <audio class="hidden" ref="audio" />

    <h2 class="text-2xl font-bold mb-4">{{ katakana.name }}</h2>

    <div class="mb-6">
      <p class="text-3xl font-semibold">{{ katakana.katakana }}</p>
      <button
        @click="handleListening"
        class="absolute top-2 right-2 p-1 bg-red-400 text-white rounded-full hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-300 ease-in-out"
      >
        <span class="sr-only">Listen</span>
        <GIcon v-if="loading" icon="hourglass_empty" class="text-xl" />
        <GIcon v-else-if="playing" icon="pause" class="text-xl" />
        <GIcon v-else icon="volume_up" class="text-xl" />
      </button>
    </div>

    <div>
      <p class="text-lg font-semibold mb-2">Present yourself</p>
      <div class="space-y-4">
        <KatakanaCardSentence
          v-for="(sentence, index) in katakana.sentences"
          :key="index"
          :sentence="sentence"
          :index="index"
          :uid="katakana.uid + '_' + index"
        />
      </div>
    </div>
  </div>
</template>

