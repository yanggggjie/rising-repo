'use server'

import getRankList from '@/server-actions/getRankList'
import getARepo from '@/server-actions/getARepo'

export default async function getRankListWithLanguage() {
  const rankList = await getRankList({
    start: '2021-01-01',
    end: '2021-01-02',
    limit: 10,
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
}
