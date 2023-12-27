'use client'
import RankList from '@/components/RankList'
import User from '@/components/User'
import Logout from '@/components/Logout'

interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      <Logout></Logout>
      <RankList></RankList>
      <User></User>
    </div>
  )
}
