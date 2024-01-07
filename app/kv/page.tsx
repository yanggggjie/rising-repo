import _ from 'lodash'
import { clsx } from 'clsx'
import getRank from '@/server-actions/kv/getRank'
import DisplayRank from '@/app/kv/DisplayRank'
import { Suspense } from 'react'
interface Props {}

export default function Page({}: Props) {
  const rankPromise = getRank()
  return (
    <div>
      <Suspense fallback={<div>loading</div>}>
        <DisplayRank
          // @ts-ignore
          rankPromise={rankPromise}
        ></DisplayRank>
      </Suspense>
    </div>
  )
}
