<script setup>
import { generateSpeech } from "@/service/speechGenerator.js";
import { computed } from "vue";
import GIcon from "@/components/common/GIcon.vue";

const props = defineProps({
  index: {
    type: String,
    required: true,
  },
  sentence: {
    type: Object,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

const katakana = computed(() => props.sentence.japanese);

const { play, pause, playing, loading, audio } = generateSpeech();

const handleListening = () => {
  if (playing.value) {
    pause();
  } else {
    play(props.uid, katakana.value, "male");
  }
};
</script>

<template>
  <div class="border p-4 rounded-md bg-gray-200 relative">
    <p class="text-sm italic">{{ sentence.hiragana }}</p>
    <p class="text-xl">{{ sentence.japanese }}</p>
    <p class="text-sm italic">{{ sentence.normal_hiragana }}</p>
    <div class="flex items-end justify-between mt-2 border-t-2 border-gray-400 pt-2">
      <p class="text-sm italic">{{ sentence.english }}</p>
      <button
        @click="handleListening"
        class="p-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray active:bg-gray-600 transition duration-300 ease-in-out"
      >
        <span class="sr-only">Listen</span>
        <GIcon v-if="loading" icon="hourglass_empty" class="text-md" />
        <GIcon v-else-if="playing" icon="pause" class="text-md" />
        <GIcon v-else icon="volume_up" class="text-md" />
      </button>
    </div>

    <audio ref="audio" class="hidden" />
  </div>
</template>




