'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { Suspense, use } from 'react'
import { IRankItem } from '@/server-actions/kv/setRank'
interface Props {
  rankPromise: PromiseLike<IRankItem[]>
}

export default function Display({ rankPromise }: Props) {
  const data = use(rankPromise)

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
