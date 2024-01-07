'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import setRank from '@/server-actions/kv/setRank'
import getRank from '@/server-actions/kv/getRank'
import getRateLimit from '@/server-actions/getRateLimit'
import { IDate } from '@/components/date/dateToDuring'

interface Props {}
export default function Admin({}: Props) {
  const dateList: IDate[] = ['yesterday', 'lastWeek', 'lastMonth']
  return (
    <div>
      <div className={'space-x-2'}>
        {dateList.map((date) => (
          <button
            key={date}
            onClick={() => {
              setRank({ date })
            }}
          >
            setRank {date}
          </button>
        ))}
      </div>
      <button
        onClick={async () => {
          const res = await getRateLimit()
          console.log('res', res)
        }}
      >
        get rate_limit
      </button>
    </div>
  )
}
