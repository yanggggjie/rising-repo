'use server'
import { kv } from '@vercel/kv'
import { IRankItemWithRepoInfo } from '@/server-actions/kv/setRank'
import { unstable_cache } from 'next/cache'

export default unstable_cache(
  async function getRank() {
    try {
      const res = await kv.get('repoInfoList')
      return res as IRankItemWithRepoInfo[]
    } catch (e) {
      console.log('e', e)
      return null
    }
  },
  ['getRank'],
  {
    revalidate: 3600 * 24,
    tags: ['getRank'],
  },
)
