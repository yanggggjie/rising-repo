import { ofetch } from 'ofetch'

export async function fetchChatCompletion(inContent: string) {
  try {
    const response = await ofetch(
      'https://api.chatanywhere.tech/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.My_CHATGPT_TOKEN}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: inContent }],
          temperature: 0.7,
        }),
      },
    )

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error fetching completion:', error)
    return ''
  }
}

// response example
const __response = {
  id: 'chatcmpl-A0V43qm6VzwIA62pFBXzWRO0JEUFj',
  object: 'chat.completion',
  created: 1724682775,
  model: 'gpt-35-turbo',
  choices: [
    {
      index: 0,
      message: { role: 'assistant', content: 'This is a test!' },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: { prompt_tokens: 13, completion_tokens: 5, total_tokens: 18 },
  system_fingerprint: 'fp_e49e4201a9',
}
