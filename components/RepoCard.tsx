import _ from 'lodash'
import { clsx } from 'clsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { GithubIcon, HomeIcon, Star, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { IRepo } from '@/server-actions/getARepo'
import { Badge } from './ui/badge'
interface Props {
  yesterdayStar: number
  repo: IRepo
}

export default function RepoCard({ yesterdayStar, repo }: Props) {
  return (
    <div>
      <Card className={clsx('w-[800px]')}>
        <CardHeader>
          <CardTitle className={clsx('flex flex-row items-center text-xl')}>
            <Avatar>
              <AvatarImage src={repo.owner.avatar_url} />
              <AvatarFallback>{repo.owner.login}</AvatarFallback>
            </Avatar>
            <Link href={repo.html_url} className={clsx('hover:underline')}>
              {repo.name}
            </Link>

            <div className={clsx('grow')}></div>
            <div className={clsx('flex flex-row')}>
              <StarIcon></StarIcon>
              {(repo.stargazers_count / 1000).toFixed(1)}k
            </div>
            <div className={clsx('font-bold text-green-600')}>
              +{yesterdayStar}
            </div>
          </CardTitle>
          <CardDescription>{repo.language}</CardDescription>
        </CardHeader>

        <CardContent>
          {repo.description}
          <div>
            {repo.topics.map((item) => {
              return (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              )
            })}
          </div>
        </CardContent>
        <CardFooter>
          <div>
            <GithubIcon></GithubIcon>
            {repo.homepage && <HomeIcon></HomeIcon>}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
