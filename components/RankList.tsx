import _ from 'lodash'
import { clsx } from 'clsx'
import useSWR from 'swr'
import getRankList, { IDuring } from '@/server-actions/getRankList'
import dayjs, { Dayjs } from 'dayjs'
import RepoCard from '@/components/RepoCard'
interface Props {}

export default function RankList({}: Props) {
  const during: IDuring = {
    start: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  }
  const { data, isLoading, error } = useSWR(
    {
      url: 'getRankList',
      during,
    },
    async ({ during }) => {
      return await getRankList({ during })
    },
    {
      revalidateOnFocus: false,
    },
  )
  if (isLoading) return <div>loading </div>
  if (error) return <div>error</div>
  if (!data) return <div>no data</div>
  const some_data = data.slice(0, 10)
  return (
    <div>
      {some_data.map((item) => {
        return (
          <RepoCard repoName={item.repo_name} key={item.repo_name}></RepoCard>
        )
      })}
    </div>
  )
}
