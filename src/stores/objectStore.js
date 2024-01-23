import { defineStore } from "pinia";
import { ref } from "vue";
import client from "@/service/openaiClient.js";
import configuration from "@/service/configuration.json";

export const useObjectStore = defineStore("objects", () => {
  const objects = ref([]);
  const loading = ref(false);

  const requestRandomObject = async () => {
    loading.value = true;
    const idx = objects.value.length;

    objects.value.push({
      loadingImage: true,
      text: "",
      image: "",
    });

    const stream = await client.chat.completions.create({
      messages: [
        {role: "user", content: configuration.objects.prompt}
      ],
      model: "gpt-3.5-turbo-1106",
      stream: true,
    });

    for await (const part of stream) {
      const promptPart = part.choices[0]?.delta?.content || "";
      objects.value[idx].text += promptPart;
    }

    const prompt = objects.value[idx].text.slice(0, 1000)

    const response = await client.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "256x256",
    });

    objects.value[idx].loadingImage = false;
    objects.value[idx].image = response.data[0].url;

    loading.value = false;
  }

  return {objects, loading, requestRandomObject}
});