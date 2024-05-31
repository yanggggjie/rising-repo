import { clsx } from 'clsx'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import UpdateTime from '@/components/UpdateTime'
import dayjs from 'dayjs'
import RankTable from '@/components/rank/RankTable'
import getRank from '@/lib/getRank/getRank'
interface Props {}

export default async function Page({}: Props) {
  const rank = await getRank()
  const updateTime = dayjs().format('YYYY-MM-DD')

  return (
    <div className={clsx('h-screen', 'flex flex-col gap-1', 'p-4')}>
      <div className={clsx('flex flex-row items-center')}>
        <UpdateTime updateTime={updateTime}></UpdateTime>
        <div className={clsx('grow')}></div>
        <Link
          target={'_blank'}
          href={'https://github.com/yanggggjie/rising-repo'}
        >
          <GithubIcon></GithubIcon>
        </Link>
      </div>
      <div className={clsx('overflow-auto border-2')}>
        <RankTable data={rank}></RankTable>
      </div>
    </div>
  )
}
