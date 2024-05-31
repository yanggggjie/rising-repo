import { getDate, sleep } from '@/lib/util'
import getRankList, { IRankItem } from '@/lib/getRank/getRankList'
import getARepo from '@/lib/getRank/getARepo'
import { getDB } from '@/lib/lowdb'

export type IRankItemWithRepoInfo = IRankItem & {
  language: string
  ownerAvatar: string
  ownerLogin: string
  description: string
  createdAt: string
  topics: string[]
}

export default async function getRank() {
  const db = await getDB()
  const WITH_LOCAL_DATA = process.env.WITH_LOCAL_DATA
  if (WITH_LOCAL_DATA === 'true') {
    if (db.data.repoInfoList.length > 0) {
      return db.data.repoInfoList
    }
  }

  const { start, end } = getDate()

  const rankList = await getRankList({
    start,
    end,
    limit: 1000,
    offset: 0,
  })

  const repoInfoList: IRankItemWithRepoInfo[] = []
  const batchSize = 80

  for (let i = 0; i < rankList.length; i += batchSize) {
    const promiseList = rankList.slice(i, i + batchSize).map(async (item) => {
      const repo = await getARepo({ repoName: item.repoName })
      if (!repo) return null
      return {
        repoName: item.repoName,
        addedStars: item.addedStars,
        language: repo.language,
        ownerAvatar: repo.owner.avatar_url,
        ownerLogin: repo.owner.login,
        description: repo.description,
        createdAt: repo.created_at,
        topics: repo.topics,
      }
    })

    const batchRepoInfoList = (await Promise.all(promiseList)).filter(
      (item) => {
        return item !== null
      },
    ) as IRankItemWithRepoInfo[]

    await sleep(100)
    repoInfoList.push(...batchRepoInfoList)
  }

  if (WITH_LOCAL_DATA === 'true') {
    db.data.repoInfoList = repoInfoList
    await db.write()
  }

  return repoInfoList
}
