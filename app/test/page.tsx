'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import testKV from '@/server-actions/kv/testKV'
import setRank from '@/server-actions/kv/setRank'
import getRank from '@/server-actions/kv/getRank'
import getRateLimit from '@/server-actions/getRateLimit'
interface Props {}
export default function Page({}: Props) {
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
          testKV()
        }}
      >
        test kv
      </button>
      <hr />
      <button
        onClick={() => {
          setRank({ date: 'lastMonth' })
        }}
      >
        genRank
      </button>
      <hr />
      <button
        onClick={async () => {
          const res = await getRank()
          console.log('res', res)
        }}
      >
        getRank
      </button>
    </div>
  )
}
