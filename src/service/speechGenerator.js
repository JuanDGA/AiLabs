import { ref } from "vue";
import client from "@/service/openaiClient.js";
import { useSpeechStore } from "@/stores/speechStore.js";

const voices = {
  male: "echo",
  female: "shimmer",
};

const getSpeech = async (text, gender) => {
  const audio = await client.audio.speech.create({
    model: "tts-1",
    voice: voices[gender.trim().toLowerCase()],
    input: text,
  });
  return await audio.arrayBuffer();
};

export const generateSpeech = () => {
  const speechStore = useSpeechStore();
  const loading = ref();
  const audio = ref();
  const playing = ref(false);

  const play = async (id, text, gender) => {
    const audioSrc = speechStore.requestSpeech(id);
    if (audioSrc === "") {
      loading.value = true;
      const blob = new Blob([await getSpeech(text, gender)]);
      const src = URL.createObjectURL(blob);
      audio.value.src = src;
      speechStore.addSpeech(id, src);
      audio.value.load();
      audio.value.play();
      audio.value.addEventListener("ended", () => (playing.value = false));
      loading.value = false;
    } else if (audio.value.src === "") {
      loading.value = true;
      audio.value.src = audioSrc;
      audio.value.load();
      audio.value.play();
      audio.value.addEventListener("ended", () => (playing.value = false));
      loading.value = false;
    } else {
      audio.value.play();
    }
    playing.value = true;
  };

  const pause = () => {
    if (audio.value != null) {
      playing.value = false;
      audio.value.pause();
    }
  };

  return { loading, playing, audio, play, pause };
};
