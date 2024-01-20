'use server'

import getRankList, { IRankItem } from '@/server-actions/getRankList'
import getARepo from '@/server-actions/getARepo'
import { dateToDuring, IDate } from '@/components/date/dateToDuring'
import { kv } from '@vercel/kv'
import dayjs from 'dayjs'

interface Props {
  date: IDate
}

export type IRankItemWithRepoInfo = IRankItem & {
  language: string
  ownerAvatar: string
  ownerLogin: string
  description: string
  createdAt: string
  topics: string[]
}

export default async function setRank({ date }: Props) {
  const { start, end } = dateToDuring[date]

  const rankList = await getRankList({
    start,
    end,
    limit: 1000,
    offset: 0,
  })

  const repoInfoList = []
  const batchSize = 100
  for (let i = 0; i < rankList.length; i += batchSize) {
    const promiseList = rankList.slice(0, batchSize).map(async (item) => {
      const repo = await getARepo({ repoName: item.repoName })
      if (!repo) return null
      return {
        ...item,
        language: repo.language,
        ownerAvatar: repo.owner.avatar_url,
        ownerLogin: repo.owner.login,
        description: repo.description,
        createdAt: repo.created_at,
        topics: repo.topics,
      } as IRankItemWithRepoInfo
    })

    const batchRepoInfoList = (await Promise.all(promiseList)).filter(
      (item) => {
        return item !== null
      },
    )

    // @ts-ignore already filter null
    repoInfoList.push(...batchRepoInfoList)
  }
  if (repoInfoList.length > 0) {
    const res = await Promise.all([
      kv.set(date, repoInfoList),
      kv.set(date + 'updateTime', dayjs().format('YYYY-MM-DD HH:mm')),
    ])
    console.log(`set ${date} `, res)
  }
  return repoInfoList
}

function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, delay)
  })
}
