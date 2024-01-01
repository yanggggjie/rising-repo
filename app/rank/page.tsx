import getRankList, { IDuring } from '@/server-actions/getRankList'
import dayjs from 'dayjs'
import getARepo, { IRepo } from '@/server-actions/getARepo'
import RankTable from '@/app/rank/RankTable'

interface Props {}

export default async function RankList({}: Props) {
  const during: IDuring = {
    start: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  }

  const rankList = await getRankList({ during })

  const repoList = (
    await Promise.all(
      rankList.map(async (item) => {
        return await getARepo({ repoName: item.repo_name })
      }),
    )
  )
    //   filter null
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
    <div>
      <RankTable data={repoList}></RankTable>
    </div>
  )
}
