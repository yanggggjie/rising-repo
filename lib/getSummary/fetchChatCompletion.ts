import { ofetch } from 'ofetch'

export async function fetchChatCompletion(inContent: string) {
  try {
    const response = await ofetch(
      'https://api.chatanywhere.tech/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MY_OPENAI_TOKEN}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
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
