'use server'

import getRankList from '@/server-actions/getRankList'
import getARepo from '@/server-actions/getARepo'
import dayjs from 'dayjs'
import { kv } from '@vercel/kv'
import { dateToDuring } from '@/components/date/DateToDuring'

interface Props {
  date: 'yesterday' | 'lastWeek' | 'lastMonth'
}

export type IRankItem = {
  repoName: string
  addedStars: number
  language: string
  ownerAvatar: string
  ownerLogin: string
  description: string
}

export default async function setRank({ date }: Props) {
  const { start, end } = dateToDuring[date]

  const rankList = await getRankList({
    start,
    end,
    limit: 100,
    offset: 0,
  })

  const _repoListWithLanguage: Array<IRankItem | null> = await Promise.all(
    rankList.map(async (item) => {
      const repoName = item.repoName
      const repo = await getARepo({ repoName })
      if (!repo) return null
      return {
        ...item,
        language: repo.language,
        ownerAvatar: repo.owner.avatar_url,
        ownerLogin: repo.owner.login,
        description: repo.description,
      }
    }),
  )
  const repoListWithLanguage = _repoListWithLanguage.filter((item) => {
    return item !== null
  }) as IRankItem[]
  console.log('repoListWithLanguage', repoListWithLanguage)
  const res = await kv.set('lastWeek', repoListWithLanguage)
  console.log('set Rank res', res)
}
