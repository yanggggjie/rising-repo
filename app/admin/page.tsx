'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import setRank from '@/server-actions/kv/setRank'
import getRank from '@/server-actions/kv/getRank'
import getRateLimit from '@/server-actions/getRateLimit'
import { IDate } from '@/components/date/dateToDuring'
import { parseAsString, useQueryState } from 'nuqs'
import { useLayoutEffect } from 'react'
import verifyAdmin from '@/server-actions/verifyAdmain'
import { useRouter } from 'next/navigation'
import revalidateRank from '@/server-actions/kv/revalidateRank'
import Admin from '@/app/admin/Admin'
interface Props {}
export default function Page({}: Props) {
  const router = useRouter()
  const [token, setToken] = useQueryState('token', parseAsString)

  return (
    <div>
      <Admin></Admin>
    </div>
  )
}
