'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import setRank from '@/server-actions/kv/setRank'
import getRank from '@/server-actions/kv/getRank'
import getRateLimit from '@/server-actions/getRateLimit'
import { dateToDuring, IDate } from '@/components/date/dateToDuring'
import revalidateRank from '@/server-actions/kv/revalidateRank'
import getRankList from '@/server-actions/getRankList'
import testBigQuery from '@/server-actions/bigQuery/testBigQuery'

interface Props {}
export default function Admin({}: Props) {
  const dateList: IDate[] = ['yesterday', 'lastWeek', 'lastMonth']
  return (
    <div>
      <button
        onClick={async () => {
          const date: IDate = 'yesterday'
          const { start, end } = dateToDuring[date]
          const res = await getRankList({
            start,
            end,
            offset: 0,
            limit: 10,
          })
          console.log('res', res)
        }}
      >
        get rank list
      </button>
      <div className={''}>
        {dateList.map((date) => (
          <div
            key={date}
            onClick={() => {
              setRank({ date })
            }}
          >
            setRank {date}
          </div>
        ))}
      </div>
      <hr />
      <div className={''}>
        {dateList.map((date) => (
          <div
            key={date}
            onClick={async () => {
              const res = await getRank({ date })
              console.log('res', res)
            }}
          >
            get {date}
          </div>
        ))}
      </div>
      <hr />
      <button
        onClick={async () => {
          const res = await getRateLimit()
          console.log('res', res)
        }}
      >
        get rate_limit
      </button>
      <hr />
      <button
        onClick={() => {
          revalidateRank()
        }}
      >
        revalidateRank
      </button>
      <hr />
      <button
        onClick={() => {
          testBigQuery()
        }}
      >
        big query
      </button>
    </div>
  )
}
