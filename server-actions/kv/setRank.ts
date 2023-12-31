'use server'

import getRankList from '@/server-actions/getRankList'
import getARepo from '@/server-actions/getARepo'
import dayjs from 'dayjs'
import { kv } from '@vercel/kv'
import { dateToDuring, IDate } from '@/components/date/dateToDuring'

interface Props {
  date: IDate
}

export type IRankItem = {
  repoName: string
  addedStars: number
  language: string
  ownerAvatar: string
  ownerLogin: string
  description: string
  createdAt: string
}

export default async function setRank({ date }: Props) {
  const { start, end } = dateToDuring[date]

  const rankList = await getRankList({
    start,
    end,
    limit: 1000,
    offset: 0,
  })

  const _repoListWithLanguage: Array<IRankItem | null> = await Promise.all(
    rankList.map(async (item) => {
      const repoName = item.repoName
      const repo = await getARepo({ repoName })
      if (!repo) return null
      if (repo.language === 'Jupyter Notebook') repo.language = 'Jupyter'
      return {
        ...item,
        language: repo.language,
        ownerAvatar: repo.owner.avatar_url,
        ownerLogin: repo.owner.login,
        description: repo.description,
        createdAt: repo.created_at,
      }
    }),
  )
  const repoListWithLanguage = _repoListWithLanguage.filter((item) => {
    return item !== null
  }) as IRankItem[]
  console.log('repoListWithLanguage', repoListWithLanguage)
  const res = await kv.set(date, repoListWithLanguage)
  console.log('set Rank res', res)
}
