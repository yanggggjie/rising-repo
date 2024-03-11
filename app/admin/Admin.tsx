'use client'

import { getDate } from '@/lib/util'

interface Props {}
export default function Admin({}: Props) {
  return (
    <div>
      <button
        onClick={async () => {
          const { start, end } = getDate()
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
        <button
          onClick={async () => {
            console.log('start')
            const res = await setRank()
            console.log('res', res)
          }}
        >
          set rank
        </button>
      </div>
      <hr />
      <div className={''}>
        <button
          onClick={async () => {
            console.log('start')
            const res = await getRank()
            console.log('res', res)
          }}
        >
          get rank
        </button>
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
