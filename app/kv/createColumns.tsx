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
import { IRepo } from '@/server-actions/getARepo'
type IRepoTable = IRepo & {
  addedStars: number
}

export function createColumns(data: IRepoTable[]) {
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

  const columns: ColumnDef<IRepoTable>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: () => {
        return <p className={clsx('text-center')}>Name</p>
      },
      cell: (props) => {
        const name = props.row.original.name
        const owner = props.row.original.owner
        const htmlUrl = props.row.original.html_url
        return (
          <div className={clsx(clsx('flex flex-col items-center w-36'))}>
            <Avatar>
              <AvatarImage src={owner.avatar_url}></AvatarImage>
              <AvatarFallback>{owner.login}</AvatarFallback>
            </Avatar>
            <Link href={htmlUrl} className={clsx('font-bold text-blue-500')}>
              {name}
            </Link>
          </div>
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
              'flex flex-row items-center justify-start gap-2 text-green-700 font-bold',
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
