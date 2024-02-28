'use server'
import { kv } from '@vercel/kv'
import { unstable_cache } from 'next/cache'

export default unstable_cache(
  async function getRankUpdateTime() {
    try {
      const res = await kv.get('updateTime')
      return res as string
    } catch (e) {
      console.log('e', e)
      return null
    }
  },
  ['getRankUpdateTime'],
  {
    revalidate: 3600 * 24,
    tags: ['getRank'],
  },
)
