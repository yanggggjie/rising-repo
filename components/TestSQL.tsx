'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import testSql, { IDuring } from '@/server-actions/testSql'
import dayjs from 'dayjs'
interface Props {}

export default function TestSQL({}: Props) {
  const during: IDuring = {
    start: dayjs().subtract(100, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  }

  return (
    <div>
      <button
        onClick={async () => {
          const res = await testSql({
            during,
          })
          console.log('res', res)
        }}
      >
        testSQL
      </button>
    </div>
  )
}
