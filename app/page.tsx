import _ from 'lodash'
import { clsx } from 'clsx'
import RankTable from '@/components/rank/RankTable'
import RankList from '@/app/RankList'
interface Props {}
export default function Page({}: Props) {
  return (
    <div>
      <RankList></RankList>
    </div>
  )
}
