import _ from 'lodash'
import { clsx } from 'clsx'
import getRank from '@/server-actions/kv/getRank'
import DisplayRank from '@/components/rank/DisplayRank'
import { Suspense } from 'react'
import { IDate } from '@/components/date/dateToDuring'
import DatePicker from '@/components/date/DatePicker'
import { dateParser } from '@/components/date/dateParser'
import { BulletList } from 'react-content-loader'
interface Props {
  searchParams: any
}

export default function Page({ searchParams }: Props) {
  const date = dateParser.parseServerSide(searchParams.date) as IDate
  const rankPromise = getRank({ date })
  const Fallback = (
    <div className={clsx('m-4 h-[900px] border-2 overflow-auto')}>
      <BulletList />
      <BulletList />
    </div>
  )

  return (
    <div>
      <DatePicker></DatePicker>
      <Suspense fallback={Fallback}>
        <DisplayRank
          // @ts-ignore
          rankPromise={rankPromise}
        ></DisplayRank>
      </Suspense>
    </div>
  )
}
