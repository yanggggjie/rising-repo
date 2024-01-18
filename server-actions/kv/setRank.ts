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
  topics: string[]
}

async function fetchRepoData(repoName) {
  try {
    const repo = await getARepo({ repoName })
    if (!repo) return null
    if (repo.language === 'Jupyter Notebook') repo.language = 'Jupyter'
    return repo
  } catch (error) {
    console.error(`Error fetching repo data for ${repoName}:`, error)
    return null
  }
}

async function processBatch(batch) {
  return await Promise.all(
    batch.map(async (item) => {
      const repo = await fetchRepoData(item.repoName)
      if (!repo) return null
      return {
        ...item,
        language: repo.language,
        ownerAvatar: repo.owner.avatar_url,
        ownerLogin: repo.owner.login,
        description: repo.description,
        createdAt: repo.created_at,
        topics: repo.topics,
      }
    }),
  )
}

async function processInBatches(rankList, batchSize = 100, delay = 1000) {
  let _repoListWithLanguage = []

  for (let i = 0; i < rankList.length; i += batchSize) {
    const batch = rankList.slice(i, i + batchSize)
    const batchResults = await processBatch(batch)
    // @ts-ignore
    _repoListWithLanguage.push(...batchResults)
    await new Promise((resolve) => setTimeout(resolve, delay)) // 延时
  }

  return _repoListWithLanguage.filter((item) => item !== null) // 过滤掉null值
}

export default async function setRank({ date }: Props) {
  const { start, end } = dateToDuring[date]

  const rankList = await getRankList({
    start,
    end,
    limit: 1000,
    offset: 0,
  })

  // const _repoListWithLanguage: Array<IRankItem | null> = await Promise.all(
  //   rankList.map(async (item) => {
  //     const repoName = item.repoName
  //     const repo = await getARepo({ repoName })
  //     if (!repo) return null
  //     if (repo.language === 'Jupyter Notebook') repo.language = 'Jupyter'
  //     return {
  //       ...item,
  //       language: repo.language,
  //       ownerAvatar: repo.owner.avatar_url,
  //       ownerLogin: repo.owner.login,
  //       description: repo.description,
  //       createdAt: repo.created_at,
  //       topics: repo.topics,
  //     }
  //   }),
  // )
  const _repoListWithLanguage = await processInBatches(rankList)

  const repoListWithLanguage = _repoListWithLanguage.filter((item) => {
    return item !== null
  }) as IRankItem[]
  console.log('repoListWithLanguage', repoListWithLanguage)
  const res = await kv.set(date, repoListWithLanguage)
  console.log('set Rank res', res)
}
