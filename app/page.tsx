import _ from 'lodash'
import { clsx } from 'clsx'
import getRank from '@/server-actions/kv/getRank'
import DisplayRank from '@/components/rank/DisplayRank'
import { Suspense } from 'react'
import { IDate } from '@/components/date/dateToDuring'
import DatePicker from '@/components/date/DatePicker'
import { dateParser } from '@/components/date/dateParser'
interface Props {
  searchParams: any
}

export default function Page({ searchParams }: Props) {
  const date = dateParser.parseServerSide(searchParams.date) as IDate
  const rankPromise = getRank({ date })
  return (
    <div>
      <DatePicker></DatePicker>
      <Suspense fallback={<div>loading</div>}>
        <DisplayRank
          // @ts-ignore
          rankPromise={rankPromise}
        ></DisplayRank>
      </Suspense>
    </div>
  )
}
