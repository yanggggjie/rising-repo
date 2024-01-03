'use client'
import testToken from '@/server-actions/testToken'
interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      <button
        onClick={async () => {
          const res = await testToken()
          console.log('res', res)
        }}
      >
        test
      </button>
    </div>
  )
}
