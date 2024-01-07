'use server'
import { kv } from '@vercel/kv'
import { memoize } from 'nextjs-better-unstable-cache'
import { IRankItem } from '@/server-actions/kv/setRank'
export default memoize(
  async function getRank() {
    try {
      const res = await kv.get('lastWeek')
      return res as IRankItem[]
    } catch (e) {
      console.log('e', e)
      return null
    }
  },
  {
    duration: 24 * 3600,
    persist: true,
    log: ['datacache'],
    revalidateTags: ['getRank'],
  },
)
