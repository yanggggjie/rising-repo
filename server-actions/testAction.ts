'use server'
import { ofetch } from 'ofetch'

export default async function testAction() {
  try {
    const data = await ofetch('https://google.com/404', {
      timeout: 100,
    })
    return data
  } catch (e) {
    return 123
  }
}
