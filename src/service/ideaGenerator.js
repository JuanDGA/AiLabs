import client from '@/service/openaiClient.js'
import configuration from '@/service/configuration.json'

export const ideaGenerator = () => {
  const getIdea = async () => {
    const response = await client.chat.completions
      .create({
        messages: [
          { role: "user", content: configuration.ideasPrompt }
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        temperature: 1.3,
        max_tokens: 256,
      })

    return JSON.parse(response.choices[0].message.content).idea
  }

  return {getIdea}
}
