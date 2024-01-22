import client from '@/service/openaiClient.js'
import configuration from '@/service/configuration.json'
import { ref } from 'vue'

const doRequest = (name) => {
  return client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          configuration.japanese.prompt +
          "\nResponse json schema: " +
          JSON.stringify(configuration.japanese.katakanaTemplate),
      },
      { role: "user", content: name },
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });
};

export const katakanaGenerator = () => {
  const loading = ref(false);
  const response = ref([]);

  const ask = async (name) => {
    loading.value = true;
    let done = false;
    while (!done) {
      try {
        const completion = await doRequest(name);
        const katakana = JSON.parse(completion.choices[0].message.content);
        response.value.unshift(katakana);
        done = true;
      } catch (error) {
        console.error(error);
      }
    }
    loading.value = false;
  };

  return { loading, response, ask };
};
