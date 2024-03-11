'use client'
import { use } from 'react'
import RankTable from '@/components/rank/RankTable'
import { IRankItemWithRepoInfo } from '@/app/api/getRank/getRank'
interface Props {
  rankPromise: PromiseLike<IRankItemWithRepoInfo[]>
}

export default function DisplayRank({ rankPromise }: Props) {
  const data = use(rankPromise)
  return <RankTable data={data}></RankTable>
}
