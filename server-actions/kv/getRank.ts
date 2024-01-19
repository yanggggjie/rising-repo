'use server'
import { kv } from '@vercel/kv'
import { IDate } from '@/components/date/dateToDuring'
import { IRepoInfo } from '@/server-actions/kv/setRank'
import { unstable_cache } from 'next/cache'

interface Props {
  date: IDate
}

export default unstable_cache(
  async function getRank({ date }: Props) {
    try {
      const res = await kv.get(date)
      return res as IRepoInfo[]
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
