import { ColumnDef } from '@tanstack/react-table'
import { IRankItem } from '@/server-actions/kv/setRank'
import { clsx } from 'clsx'
import * as React from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Title from '@/components/rank/columns/infoColumn/Title'
import Description from '@/components/rank/columns/infoColumn/Description'
import Topics from '@/components/rank/columns/infoColumn/Topics'

export const infoColumn: ColumnDef<IRankItem> = {
  id: 'info',
  header: () => {
    return <p className={clsx('text-center')}>Info</p>
  },
  cell: (props) => {
    const row = props.row.original
    const repoName = row.repoName
    const nameWithoutOwner = repoName.split('/')[1]
    const ownerLogin = row.ownerLogin
    const ownerAvatar = row.ownerAvatar
    const githubURL = `https://github.com/${repoName}`
    const description = row.description
    const topics = row.topics

    return (
      <p className={clsx('flex flex-row items-center  justify-start gap-2 ')}>
        <Avatar>
          <AvatarImage src={ownerAvatar}></AvatarImage>
          <AvatarFallback>{ownerLogin}</AvatarFallback>
        </Avatar>
        <p
          className={clsx(
            'w-96 flex flex-col items-start justify-center gap-1',
          )}
        >
          <Title name={nameWithoutOwner} href={githubURL}></Title>
          <Description text={description}></Description>
          <Topics topics={topics}></Topics>
        </p>
      </p>
    )
  },
}
