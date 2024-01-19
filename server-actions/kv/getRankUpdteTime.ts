'use server'
import { kv } from '@vercel/kv'
import { memoize } from 'nextjs-better-unstable-cache'
import { IDate } from '@/components/date/dateToDuring'

interface Props {
  date: IDate
}

export default memoize(
  async function getRankUpdateTime({ date }: Props) {
    try {
      const res = await kv.get(date + 'updateTime')
      return res
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
