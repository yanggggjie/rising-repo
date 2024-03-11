import { getDate } from '@/lib/util'
import getRankList, { IRankItem } from '@/app/api/getRank/getRankList'
import getARepo from '@/app/api/getRank/getARepo'

export type IRankItemWithRepoInfo = IRankItem & {
  language: string
  ownerAvatar: string
  ownerLogin: string
  description: string
  createdAt: string
  topics: string[]
}

export default async function getRank() {
  const { start, end } = getDate()

  const rankList = await getRankList({
    start,
    end,
    limit: 10,
    offset: 0,
  })

  const repoInfoList = []
  const batchSize = 100

  for (let i = 0; i < rankList.length; i += batchSize) {
    const promiseList = rankList.slice(i, i + batchSize).map(async (item) => {
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

  return repoInfoList
}
