import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJapaneseStore = defineStore("japanese", () => {
  const hasBeenUsed = ref(false);
  const katakanas = ref([]);

  const addKatakana = (it) => katakanas.value.push(it);

  return {hasBeenUsed, katakanas, addKatakana}
});
