import { ColumnDef } from '@tanstack/react-table'
import { IRankItem } from '@/server-actions/kv/setRank'
import { clsx } from 'clsx'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import * as React from 'react'

export const repoNameColumn: ColumnDef<IRankItem> = {
  id: 'repoName',
  accessorKey: 'repoName',
  header: () => {
    return <p className={clsx('text-center')}>Name</p>
  },
  cell: (props) => {
    const repoName = props.row.original.repoName
    const nameWithoutOwner = repoName.split('/')[1]
    const ownerLogin = props.row.original.ownerLogin
    const ownerAvatar = props.row.original.ownerAvatar
    const githubURL = `https://github.com/${repoName}`
    return (
      <Link
        target={'_blank'}
        href={githubURL}
        className={clsx(
          'flex flex-col items-center w-44',
          'font-bold  text-blue-500',
        )}
      >
        <Avatar>
          <AvatarImage src={ownerAvatar}></AvatarImage>
          <AvatarFallback>{ownerLogin}</AvatarFallback>
        </Avatar>
        {nameWithoutOwner}
      </Link>
    )
  },
}
