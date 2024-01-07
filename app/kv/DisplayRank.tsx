'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { Suspense, use } from 'react'
import { IRankItem } from '@/server-actions/kv/setRank'
import RankTable from '@/app/kv/RankTable'
import RankTableVirtual from '@/app/kv/RankTableVirtual'
interface Props {
  rankPromise: PromiseLike<IRankItem[]>
}

export default function DisplayRank({ rankPromise }: Props) {
  const data = use(rankPromise)
  return (
    <div>
      {/*<div>{JSON.stringify(data)}</div>*/}
      {/*<RankTable data={data}></RankTable>*/}
      <RankTableVirtual data={data}></RankTableVirtual>
    </div>
  )
}
