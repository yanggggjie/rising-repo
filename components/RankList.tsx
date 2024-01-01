import getRankList, { IDuring } from '@/server-actions/getRankList'
import dayjs from 'dayjs'
import getARepo from '@/server-actions/getARepo'
import RepoTable from '@/components/RepoTable'
import { clsx } from 'clsx'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import {
  FileSignatureIcon,
  FolderGit2,
  FolderGit2Icon,
  GithubIcon,
  HomeIcon,
  LinkIcon,
  StarIcon,
  Stars,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Props {}

export default async function RankList({}: Props) {
  const during: IDuring = {
    start: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  }
  const rankList = await getRankList({ during })
  const repoNameList = rankList.map((item) => {
    return item.repo_name
  })
  const repoList = (
    await Promise.all(
      repoNameList.map(async (repoName) => {
        return await getARepo({ repoName })
      }),
    )
  ).filter((repo) => {
    return repo
  })

  return (
    <Table>
      <TableCaption>rising repo by star </TableCaption>
      <TableHeader>
        <TableRow className={clsx('text-xl')}>
          <TableHead className="w-[100px]">
            <div className={clsx('flex flex-row gap-2')}>
              <span>Repo</span>
              <FolderGit2Icon></FolderGit2Icon>
            </div>
          </TableHead>
          <TableHead>
            <div className={clsx('flex flex-row gap-2')}>
              <span>Star</span>
              <StarIcon></StarIcon>
            </div>
          </TableHead>
          <TableHead>
            <div className={clsx('flex flex-row gap-2')}>
              <span>Description</span>
              <FileSignatureIcon></FileSignatureIcon>
            </div>
          </TableHead>
          <TableHead>
            <div className={clsx('flex flex-row gap-2')}>
              <span>Link</span>
              <LinkIcon></LinkIcon>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repoList.map((repo, index) => {
          if (repo)
            return (
              <TableRow key={repo.name}>
                <TableCell>
                  <div className={clsx('flex flex-row items-center gap-2')}>
                    <Avatar>
                      <AvatarImage src={repo.owner.avatar_url} />
                      <AvatarFallback>{repo.owner.login}</AvatarFallback>
                    </Avatar>
                    <span className={clsx('text-xl')}>{repo.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className={clsx('flex flex-row items-center')}>
                    <div
                      className={clsx('font-bold text-xl text-green-700 w-20')}
                    >
                      +{rankList[index].stars}
                    </div>
                    <div className={'grow'}></div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={clsx('text-lg')}>{repo.description}</div>
                  <div className={clsx('mt-2', 'space-x-2 space-y-1')}>
                    {repo.topics.map((item) => {
                      return (
                        <Badge key={item} variant={'secondary'}>
                          {item}
                        </Badge>
                      )
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={clsx('flex flex-row gap-2')}>
                    <Link href={repo.html_url}>
                      <GithubIcon> </GithubIcon>
                    </Link>
                    {repo.homepage && (
                      <Link href={repo.homepage}>
                        <HomeIcon></HomeIcon>
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
        })}
      </TableBody>
    </Table>
  )
}
