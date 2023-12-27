'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { getDefaultAutoSelectFamily } from 'node:net'
import getRankList from '@/server-actions/getRankList'
import dayjs from 'dayjs'
interface Props {}

export default function Page({}: Props) {
  const today = dayjs().subtract(10, 'day')
  const start = today.format('YYYY-MM-DD')
  const end = today.add(1, 'day').format('YYYY-MM-DD')
  console.log('start', start)
  console.log('end', end)
  return (
    <div>
      <button
        onClick={async () => {
          const res = await getRankList({
            during: {
              start,
              end,
            },
          })
          console.log('res', res)
        }}
      >
        getData
      </button>
    </div>
  )
}
