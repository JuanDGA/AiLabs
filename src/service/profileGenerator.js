import configuration from "./configuration.json";
import client from "./openaiClient.js";
import { ref } from "vue";

const doRequest = (userQuery, additionalMessages = []) => {
  return client.chat.completions
    .create({
      messages: [
        { role: "system", content: configuration.prompt + "\nProfile json schema: " + JSON.stringify(configuration.profileTemplate) + "\nRequired fields: " + JSON.stringify(configuration.requiredFields) },
        { role: "user", content: userQuery },
        ...additionalMessages
      ],
      model: "gpt-3.5-turbo-1106",
      temperature: 1.3,
      response_format: { type: "json_object" },
    })
}

const validateProfile = (response) => {
  const schema = configuration.profileTemplate;
  const responseKeys = Object.keys(response)

  let validStructure = true;

  for (let key of Object.keys(schema)) {
    validStructure = responseKeys.includes(key);
    if (!validStructure) break
  }
  return validStructure;
}


export const profileGenerator = () => {
  const loading = ref(false);
  const response = ref([]);

  const ask = async (userQuery) => {
    loading.value = true;
    let done = false
    while (!done) {
      try {
        const completion = await doRequest(userQuery);
        const profile = JSON.parse(completion.choices[0].message.content);

        if (validateProfile(profile)) {
          response.value.unshift(profile);
          done = true;
        }
      } catch (error) {
        console.error(error)
      }
    }
    loading.value = false;
  };

  return { loading, response, ask };
};
