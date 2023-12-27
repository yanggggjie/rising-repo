'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
interface Props {}

export default function Logout({}: Props) {
  const router = useRouter()
  return (
    <div>
      <button
        onClick={() => {
          deleteCookie('access_token')
          router.push('/login')
        }}
      >
        Logout
      </button>
    </div>
  )
}
