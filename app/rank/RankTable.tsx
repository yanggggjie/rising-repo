'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { IRepo } from '@/server-actions/getARepo'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type IRepoTable = IRepo & {
  addedStars: number
}

interface Props {
  data: IRepoTable[]
}

export default function RankTable({ data }: Props) {
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
      header: 'Name',
      cell: (props) => {
        const name = props.row.original.name
        const owner = props.row.original.owner
        return (
          <div>
            <Avatar>
              <AvatarImage src={owner.avatar_url}></AvatarImage>
              <AvatarFallback>{owner.login}</AvatarFallback>
            </Avatar>
            <p>{name}</p>
          </div>
        )
      },
    },
    {
      id: 'addedStars',
      accessorKey: 'addedStars',
      header: 'Stars',
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
                    {language}({times})
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )
      },
    },
    {
      id: 'description',
      accessorKey: 'description',
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            )
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
