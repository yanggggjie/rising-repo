'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import getDate from '@/server-actions/testCache/getDate'
import revalidateDate from '@/server-actions/testCache/revalidateDate'
import getDate1 from '@/server-actions/testCache/getDate1'
interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      in test
      <hr />
      <button
        onClick={async () => {
          const res = await getDate1()
          console.log('date', res)
        }}
      >
        getDate1
      </button>
      <hr />
      <button
        onClick={async () => {
          const res = await getDate()
          console.log('date', res)
        }}
      >
        getDate
      </button>
      <hr />
      <button
        onClick={async () => {
          revalidateDate()
        }}
      >
        revalidate date
      </button>
    </div>
  )
}
