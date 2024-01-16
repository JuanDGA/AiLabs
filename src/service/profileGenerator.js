import configuration from "./configuration.json";
import client from "./openaiClient.js";
import { ref } from "vue";

export const profileGenerator = () => {
  const loading = ref(false);
  const response = ref([]);

  const ask = (userQuery) => {
    loading.value = true;

    client.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: configuration.prompt + "\nProfile json schema: " + JSON.stringify(configuration.profileTemplate),
          },
          {role: "assistant", content: "\nI'll do it"},
          {role: "user", content: userQuery}
        ],
        model: "gpt-3.5-turbo-1106",
        temperature: 1.3,
        response_format: { type: "json_object" },
      })
      .then((completion) => {
        response.value.unshift(JSON.parse(completion.choices[0].message.content));
      })
      .catch((error) => {
        console.log(error)
        alert('Uncaught error')
      })
      .finally(() => (loading.value = false));
  };

  return { loading, response, ask };
};
