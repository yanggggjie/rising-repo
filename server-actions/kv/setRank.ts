'use server'

import getRankList from '@/server-actions/getRankList'
import getARepo from '@/server-actions/getARepo'
import dayjs from 'dayjs'
import { kv } from '@vercel/kv'
import { dateToDuring } from '@/components/date/DateToDuring'

interface Props {
  date: 'yesterday' | 'lastWeek' | 'lastMonth'
}

export default async function genRank({ date }: Props) {
  const { start, end } = dateToDuring[date]

  const rankList = await getRankList({
    start,
    end,
    limit: 1000,
    offset: 0,
  })
  const repoListWithLanguage = await Promise.all(
    rankList.map(async (item) => {
      const repoName = item.repoName
      const repo = await getARepo({ repoName })
      if (!repo) return null
      return {
        ...item,
        language: repo.language,
      }
    }),
  )
  console.log('repoListWithLanguage', repoListWithLanguage)
  const res = await kv.set('yesterday', repoListWithLanguage)
  console.log('res', res)
}
