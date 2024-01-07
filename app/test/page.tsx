'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import setRank from '@/server-actions/kv/setRank'
import getRank from '@/server-actions/kv/getRank'
import getRateLimit from '@/server-actions/getRateLimit'
import { IDate } from '@/components/date/dateToDuring'
interface Props {}
export default function Page({}: Props) {
  //@ts-ignore
  let date: IDate = null
  // date = 'yesterday'
  // date = 'lastWeek'
  // date = 'lastMonth'
  if (!date) return <div>in test</div>
  return (
    <div>
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
          setRank({ date })
        }}
      >
        setRank {date}
      </button>
      <hr />
      <button
        onClick={async () => {
          const res = await getRank({ date })
          console.log('res', res)
        }}
      >
        getRank {date}
      </button>
    </div>
  )
}
