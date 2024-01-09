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
import dayjs from 'dayjs'

function genCreatedAtDOM(createdDate: string) {
  const createdDay = dayjs(createdDate)
  const today = dayjs()
  const yearsDifference = today.diff(createdDay, 'year')
  const monthsDifference = today.diff(createdDay, 'month')
  const daysDifference = today.diff(createdDay, 'day')
  if (yearsDifference > 0) {
    return <span className={clsx('text-red-700')}>{yearsDifference}Year</span>
  }
  if (monthsDifference > 0) {
    return (
      <span className={clsx('text-blue-700')}>{monthsDifference}Month</span>
    )
  }
  return <span className={clsx('text-green-700')}>{daysDifference}Day</span>
}

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
              'text-green-700',
            )}
          >
            +{addedStars}
          </p>
        )
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      filterFn: (row, columnId, filterValue) => {
        const date = row.getValue(columnId)
        // @ts-ignore
        const yearDiff = dayjs().diff(date, 'year')
        // @ts-ignore
        const monthDiff = dayjs().diff(date, 'month')
        // @ts-ignore
        const dayDiff = dayjs().diff(date, 'day')

        if (filterValue === 'Time') return true
        if (filterValue === 'Year') return yearDiff > 0
        if (filterValue === 'Month') return yearDiff === 0 && monthDiff > 0
        if (filterValue === 'Day')
          return yearDiff === 0 && monthDiff === 0 && dayDiff > 0
        return true
      },
      header: (props) => {
        const { column } = props
        return (
          <div className={clsx('w-[20.5]')}>
            <Select
              value={column.getFilterValue() as string}
              defaultValue={'Age'}
              onValueChange={(value) => {
                column.setFilterValue(value)
              }}
            >
              <SelectTrigger className="border-0">
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'Age'}>Age</SelectItem>
                <SelectItem value={'Year'}>Year</SelectItem>
                <SelectItem value={'Month'}>Month</SelectItem>
                <SelectItem value={'Day'}>Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      },
      cell: (props) => {
        const createdAt = props.row.original.createdAt
        return <div className={'pl-3'}>{genCreatedAtDOM(createdAt)}</div>
      },
    },
    {
      id: 'language',
      accessorKey: 'language',
      filterFn: (row, columnId, filterValue) => {
        if (filterValue === 'Unknown') return row.getValue(columnId) === null
        if (filterValue === 'language') return true
        return filterValue === row.getValue(columnId)
      },
      header: (props) => {
        const { column } = props
        return (
          <div className={clsx('w-36')}>
            <Select
              value={column.getFilterValue() as string}
              defaultValue={'language'}
              onValueChange={(value) => {
                column.setFilterValue(value)
              }}
            >
              <SelectTrigger className="border-0">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'language'}>
                  Language({languageList.length})
                </SelectItem>
                {languageCount.map(([language, times]) => {
                  return (
                    <SelectItem key={language} value={language}>
                      {language}({times})
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        )
      },
      cell: (props) => {
        const language = props.row.original.language
        return <div className={clsx('pl-3')}>{language}</div>
      },
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: () => {
        return <div className={'text-start'}>Description</div>
      },
    },
  ]

  return columns
}
