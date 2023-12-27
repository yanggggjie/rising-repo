'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'
import loginWithCode from '@/server-actions/loginWithCode'
import { useRouter } from 'next/navigation'
interface Props {}

export default function Page({}: Props) {
  const router = useRouter()
  const [code, setCode] = useQueryState('code')
  useEffect(() => {
    async function getData() {
      if (code) {
        const res = await loginWithCode({ code })
        if (res.success) {
          router.replace('/')
        }
        console.log('loginWithCode error res', res)
      }
    }
    getData()
  }, [code])
  return <div>in callback</div>
}
