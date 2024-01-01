import RankList from '@/components/RankList'
import User from '@/components/User'
import Logout from '@/components/Logout'
import TestSQL from '@/components/TestSQL'

interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      <TestSQL></TestSQL>
      <hr />
      <Logout></Logout>
      <User></User>
      <RankList></RankList>
    </div>
  )
}
