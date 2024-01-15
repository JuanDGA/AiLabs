import configuration from "./configuration.json"
import { OpenAI } from 'openai'
import { ref } from 'vue'

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const defaultTopics = "Names:(Anderson,Bennett,Carter,Davis,Evans,Foster,Grayson,Harper,Ingram,Jennings,Kelly,Lawson,Mitchell,Newton,Owens,Parker,Quinn,Reynolds,Sawyer,Turner,Vaughn,Wallace,Yates,Zimmerman)Topics:(history,art,music,business,companies,food)";

export const profileGenerator = () => {
  const loading = ref(false)
  const response = ref(configuration.profileTemplate)
  const query = ref("")

  const ask = () => {
    loading.value = true;
    const userQuery = (query.value.trim().length === 0) ? defaultTopics : query.value

    client.chat.completions.create({
      messages: [
        { 'role': 'system', 'content': configuration.prompt },
        { role: 'user', content: 'Profile json template: ' + JSON.stringify(configuration.profileTemplate) },
        { 'role': 'user', 'content': userQuery }
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    })
      .then((completion) => {
        console.log(completion)
        response.value = JSON.parse(completion.choices[0].message.content)
      })
      .catch(() => alert("Uncaught error"))
      .finally(() => loading.value = false)
  }

  return {loading, response, query, ask}
}
