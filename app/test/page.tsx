'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { useEffect } from 'react'
import getTime from '@/server-actions/getTime'
interface Props {}

export default function Page({}: Props) {
  async function getData() {
    const time = await getTime()
    console.log('time', time)
  }

  return (
    <div>
      <button
        onClick={async () => {
          getData()
        }}
      >
        getTime
      </button>
    </div>
  )
}
