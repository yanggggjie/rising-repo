'use client'
import testToken from '@/server-actions/testToken'
import testAction from '@/server-actions/testAction'
interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      <button
        onClick={async () => {
          const res = await testAction()
          console.log('res', res)
        }}
      >
        123
      </button>
    </div>
  )
}
