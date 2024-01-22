<script setup>
  import { generateSpeech } from '@/service/speechGenerator.js'
  import { computed } from 'vue'

  const props = defineProps({
    index: {
      type: String,
      required: true,
    },
    sentence: {
      type: Object,
      required: true,
    }
  });

  const katakana = computed(() => props.sentence.japanese);

  const {play, pause, playing, loading, audio} = generateSpeech();

  const handleListening = () => {
    if (playing.value) {
      pause();
    } else {
      play(katakana.value, "male");
    }
  };
</script>

<template>
  <div class="border p-4 rounded-md bg-gray-200">
    <p class="text-base font-semibold mb-2">{{ index }}. Japanese Sentence:</p>
    <p class="text-lg">{{ sentence.japanese }}</p>
    <p class="text-base font-semibold mt-2">English Translation:</p>
    <p class="text-lg">{{ sentence.english }}</p>
    <audio ref="audio" class="hidden" />
    <button
      class="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
      @click="handleListening"
      :disabled="loading"
    >
      {{ loading ? "Generating" : playing ? "Pause" : "Listen" }} sentence {{ index }}
    </button>
  </div>
</template>

<style scoped>

</style>
