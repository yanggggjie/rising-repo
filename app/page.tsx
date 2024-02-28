import { clsx } from 'clsx'
import getRank from '@/server-actions/kv/getRank'
import DisplayRank from '@/components/rank/DisplayRank'
import { Suspense } from 'react'
import { BulletList } from 'react-content-loader'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import getRankUpdteTime from '@/server-actions/kv/getRankUpdteTime'
import UpdateTime from '@/components/UpdateTime'
interface Props {}

export default function Page({}: Props) {
  const rankPromise = getRank()
  const updateTimePromise = getRankUpdteTime()

  const Fallback = (
    <div className={clsx('border-2 overflow-hidden')}>
      <BulletList />
      <BulletList />
    </div>
  )

  return (
    <div className={clsx('h-screen', 'flex flex-col gap-1', 'p-4')}>
      <div className={clsx('flex flex-row items-center')}>
        <Suspense fallback={<span>loading update time...</span>}>
          <UpdateTime
            // @ts-ignore
            updateTimePromise={updateTimePromise}
          ></UpdateTime>
        </Suspense>
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
