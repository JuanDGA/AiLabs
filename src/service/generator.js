import configuration from "./configuration.json"
import { OpenAI } from 'openai'
import { ref } from 'vue'

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export const profileGenerator = () => {
  const loading = ref(false)
  const response = ref(configuration.profileTemplate)
  const topic = ref("")

  const ask = () => {
    loading.value = true;
    response.value = configuration.profileTemplate
    client.chat.completions.create({
      messages: [
        { 'role': 'system', 'content': configuration.prompt },
        { role: 'user', content: 'Profile json template: ' + JSON.stringify(configuration.profileTemplate) },
        { 'role': 'user', 'content': 'Topic: ' + (topic.value ?? "random") }
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    })
      .then((completion) => {
        console.log(completion)
        response.value = JSON.parse(completion.choices[0].message.content)
      })
      .catch()
      .finally(() => loading.value = false)
  }

  return {loading, response, topic, ask}
}
