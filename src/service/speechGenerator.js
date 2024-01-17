import { ref } from 'vue'
import client from '@/service/openaiClient.js'

const voices = {
  "male": "echo",
  "female": "shimmer"
}

const getSpeech = async (text, gender) => {
  const audio = await client.audio.speech.create({
    model: "tts-1",
    voice: voices[gender.trim().toLowerCase()],
    input: text,
  });
  return await audio.arrayBuffer();
  // const source = audioCtx.createBufferSource();
  // source.buffer = data;
  // source.connect(audioCtx.destination);
  // return source;
}

export const generateSpeech = () => {
  const loading = ref();
  const audio = ref();
  const playing = ref(false);

  const play = async (text, gender) => {
    if (audio.value.src === "") {
      loading.value = true;
      const blob = new Blob([await getSpeech(text, gender)]);
      audio.value.src = URL.createObjectURL(blob);
      audio.value.addEventListener("ended", () => playing.value = false);
      audio.value.load();
      audio.value.play();
      playing.value = true;
      loading.value = false;
    } else {
      audio.value.play();
    }
  }

  const pause = () => {
    if (audio.value != null) {
      playing.value = false;
      audio.value.pause();
    }
  }

  return {loading, playing, audio, play, pause};
}
