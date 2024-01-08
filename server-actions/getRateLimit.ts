'use server'
import { globalOfetch } from '@/server-actions/globalOfetch'

export default async function getRateLimit() {
  try {
    return await globalOfetch('rate_limit', {
      method: 'GET',
      cache: 'no-store',
    })
  } catch (e) {
    console.log('e', e)
  }
}
