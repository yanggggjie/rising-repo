import { ColumnDef } from '@tanstack/react-table'
import { clsx } from 'clsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import * as React from 'react'
import _ from 'lodash'
import { IRankItem } from '@/server-actions/kv/setRank'

export function createColumns(data: IRankItem[]) {
  const languageList = data.map((item) => {
    if (item.language === null) return 'Unknown'
    return item.language
  })
  const languageCount = _.sortBy(
    _.toPairs(
      _.countBy(languageList, (item) => {
        return item
      }),
    ),
    1,
  ).reverse()

  const columns: ColumnDef<IRankItem>[] = [
    {
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
    },
    {
      id: 'addedStars',
      accessorKey: 'addedStars',
      header: () => {
        return <p className={clsx('text-center')}>Stars</p>
      },
      cell: (props) => {
        const addedStars = props.row.original.addedStars
        return (
          <p
            className={clsx(
              'flex flex-row items-center  justify-start gap-2 ',
              'text-lg text-green-700',
            )}
          >
            +{addedStars}
          </p>
        )
      },
    },
    {
      id: 'language',
      accessorKey: 'language',
      filterFn: (row, columnId, filterValue) => {
        if (filterValue === 'Unknown') return row.getValue(columnId) === null
        if (filterValue === 'All') return true
        return filterValue === row.getValue(columnId)
      },
      header: (props) => {
        const { column } = props
        return (
          <Select
            value={column.getFilterValue() as string}
            defaultValue={'All'}
            onValueChange={(value) => {
              column.setFilterValue(value)
            }}
          >
            <SelectTrigger className="border-0">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'All'}>All({languageList.length})</SelectItem>
              {languageCount.map(([language, times]) => {
                return (
                  <SelectItem key={language} value={language}>
                    {language}({times}/{data.length})
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )
      },
      cell: (props) => {
        const language = props.row.original.language
        return <div className={clsx('text-center')}>{language}</div>
      },
    },
    {
      id: 'description',
      accessorKey: 'description',
    },
  ]

  return columns
}
