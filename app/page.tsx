import getRankList, { IDuring } from '@/server-actions/getRankList'
import dayjs from 'dayjs'
import getARepo from '@/server-actions/getARepo'
import RankTable from '@/components/rank/RankTable'
import Date from '@/components/rank/Date'
import { dateToDuring } from '@/components/rank/DateToDuring'
import { dateParser } from '@/components/rank/dateParser'
import { clsx } from 'clsx'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function RankList({ searchParams }: Props) {
  const date = dateParser.parseServerSide(searchParams['date'])
  const during: IDuring = dateToDuring[date as string]
  const rankList = await getRankList({ during })

  if (rankList.length === 0) return <div>rankList timeout</div>

  const _repoList = await Promise.all(
    rankList.map(async (item) => {
      return await getARepo({ repoName: item.repo_name })
    }),
  )

  if (_repoList.length === 0) return <div>repoList timeout</div>

  const repoList = _repoList
    .filter((repo) => {
      return repo !== null
    })
    // add addedStars
    .map((repo, index) => {
      return {
        ...repo,
        addedStars: rankList[index].stars,
      }
    }) as any

  return (
    <div className={clsx('p-4 space-y-2')}>
      <div className={clsx('p-2 border')}>
        <Date></Date>
      </div>
      <div className={clsx('border')}>
        <RankTable data={repoList}></RankTable>
      </div>
    </div>
  )
}
