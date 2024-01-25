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
          console.log('start')
          const date: IDate = 'yesterday'
          const { start, end } = dateToDuring[date]
          const res = await getRankList({
            start,
            end,
            offset: 0,
            limit: 10000,
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
            onClick={async () => {
              console.log('start')
              const res = await setRank({ date })
              console.log('res', res)
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
              console.log('start')
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
          console.log('start')
          const res = await getRateLimit()
          console.log('res', res)
        }}
      >
        get rate_limit
      </button>
      <hr />
      <button
        onClick={async () => {
          console.log('start')
          const res = await revalidateRank()
          console.log('res', res)
        }}
      >
        revalidateRank
      </button>
      <hr />
      <button
        onClick={async () => {
          console.log('start')
          const res = await testBigQuery()
          console.log('res', res)
        }}
      >
        big query
      </button>
    </div>
  )
}
