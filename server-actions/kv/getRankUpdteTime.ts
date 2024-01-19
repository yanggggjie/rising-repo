'use server'
import { kv } from '@vercel/kv'
import { IDate } from '@/components/date/dateToDuring'
import { unstable_cache } from 'next/cache'

interface Props {
  date: IDate
}

export default unstable_cache(
  async function getRankUpdateTime({ date }: Props) {
    try {
      const res = await kv.get(date + 'updateTime')
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
