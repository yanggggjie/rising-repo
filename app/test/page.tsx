'use client'
import { testAction } from '@/server-actions/test/testAction'

interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      in test
      <button
        onClick={() => {
          testAction()
        }}
      >
        click
      </button>
    </div>
  )
}
