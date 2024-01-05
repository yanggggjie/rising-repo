import _ from 'lodash'
import { clsx } from 'clsx'
import RankList from '@/components/rank/RankList'
import Date from '@/components/date/Date'
import { useQueryState } from 'nuqs'
import { dateParser } from '@/components/date/dateParser'
interface Props {
  searchParams: any
}

export default function Page({ searchParams }: Props) {
  const date = dateParser.parseServerSide(searchParams.date)
  return (
    <div>
      <Date></Date>
      <RankList date={date}></RankList>
    </div>
  )
}
