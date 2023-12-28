import getRankList, { IDuring } from '@/server-actions/getRankList'
import dayjs from 'dayjs'
import getARepo from '@/server-actions/getARepo'
import RepoCard from '@/components/RepoCard'
import { clsx } from 'clsx'

interface Props {}

export default async function RankList({}: Props) {
  const during: IDuring = {
    start: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  }
  const rankList = await getRankList({ during })
  const repoNameList = rankList.map((item) => {
    return item.repo_name
  })
  const repoList = await Promise.all(
    repoNameList.map(async (repoName) => {
      return await getARepo({ repoName })
    }),
  )
  return (
    <div className={clsx('flex flex-col  gap-10')}>
      {repoList.map((item, index) => {
        return (
          <RepoCard
            yesterdayStar={rankList[index].stars}
            key={item.url}
            repo={item}
          ></RepoCard>
        )
      })}
    </div>
  )
}
