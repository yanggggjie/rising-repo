'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { use } from 'react'
import { IRankItem } from '@/server-actions/kv/setRank'
import RankTable from '@/components/rank/RankTable'
interface Props {
  rankPromise: PromiseLike<IRankItem[]>
}

export default function DisplayRank({ rankPromise }: Props) {
  const data = use(rankPromise)
  return (
    <div>
      <RankTable data={data}></RankTable>
    </div>
  )
}
