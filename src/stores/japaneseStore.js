import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { katakanaGenerator } from "@/service/japanese/katakanaGenerator.js";

export const useJapaneseStore = defineStore("japanese", () => {
  const katakanas = ref([]);
  const { loading, ask } = katakanaGenerator();

  const addKatakana = (it) => katakanas.value.push(it);

  const hasBeenUsed = computed(() => katakanas.value.length > 0);

  const generateKatakana = async (name) => {
    const katakana = await ask(name);
    addKatakana(katakana);
  };

  return { hasBeenUsed, katakanas, loading, generateKatakana };
});
