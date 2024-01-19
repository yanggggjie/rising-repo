'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { use } from 'react'
import RankTable from '@/components/rank/RankTable'
import { IRepo } from '@/server-actions/getARepo'
interface Props {
  rankPromise: PromiseLike<IRepo[]>
}

export default function DisplayRank({ rankPromise }: Props) {
  const data = use(rankPromise)
  return <RankTable data={data}></RankTable>
}
