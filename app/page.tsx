import _ from 'lodash'
import { clsx } from 'clsx'
import getRank from '@/server-actions/kv/getRank'
import DisplayRank from '@/components/rank/DisplayRank'
import { Suspense } from 'react'
import { IDate } from '@/components/date/dateToDuring'
import DatePicker from '@/components/date/DatePicker'
import { dateParser } from '@/components/date/dateParser'
import { BulletList } from 'react-content-loader'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
interface Props {
  searchParams: any
}

export default function Page({ searchParams }: Props) {
  const date = dateParser.parseServerSide(searchParams.date) as IDate
  const rankPromise = getRank({ date })

  const Fallback = (
    <div className={clsx('border-2 overflow-hidden')}>
      <BulletList />
      <BulletList />
    </div>
  )

  return (
    <div className={clsx('h-screen', 'flex flex-col gap-4', 'p-4')}>
      <div className={clsx('flex flex-row items-center')}>
        <DatePicker></DatePicker>
        <div className={clsx('grow')}></div>
        <Link
          target={'_blank'}
          href={'https://github.com/yanggggjie/rising-repo'}
        >
          <GithubIcon></GithubIcon>
        </Link>
      </div>
      <div className={clsx('overflow-auto border-2')}>
        <Suspense fallback={Fallback}>
          <DisplayRank
            // @ts-ignore
            rankPromise={rankPromise}
          ></DisplayRank>
        </Suspense>
      </div>
    </div>
  )
}
