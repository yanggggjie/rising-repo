'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { use } from 'react'
import RankTable from '@/components/rank/RankTable'
import { IRepoInfo } from '@/server-actions/getARepo'
import { IRankItemWithRepoInfo } from '@/server-actions/kv/setRank'
interface Props {
  rankPromise: PromiseLike<IRankItemWithRepoInfo[]>
}

export default function DisplayRank({ rankPromise }: Props) {
  const data = use(rankPromise)
  return <RankTable data={data}></RankTable>
}
