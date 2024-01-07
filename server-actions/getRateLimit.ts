'use server'
import { globalOfetch } from '@/server-actions/globalOfetch'

export default async function getRateLimit() {
  try {
    return await globalOfetch('rate_limit', {
      method: 'GET',
    })
  } catch (e) {
    console.log('e', e)
  }
}
