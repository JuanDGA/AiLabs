import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpeechStore = defineStore("speech", () => {
  const speech = ref([]);

  const requestSpeech = (id) => {
    const elem = speech.value.find((it) => it.id === id);
    if (elem === undefined) return ""
    return elem.src;
  }

  const addSpeech = (id, url) => {
    speech.value.push({id, url})
  }

  return {requestSpeech, addSpeech};
});