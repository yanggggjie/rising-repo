'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { useInfiniteQuery } from '@tanstack/react-query'
import getRankList from '@/server-actions/getRankList'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { useVirtual } from 'react-virtual'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import * as React from 'react'
import getARepo from '@/server-actions/getARepo'
import { createColumns } from '@/app/createColumns'
interface Props {}

export default function RankList({}: Props) {
  const { data, isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['rankList'],
    queryFn: async ({ pageParam }) => {
      const offset = pageParam * 3
      const limit = 3
      const start = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      const end = dayjs().format('YYYY-MM-DD')
      const res = await getRankList({ offset, limit, start, end })
      const all = await Promise.all(
        res.map((item) => {
          return getARepo({ repoName: item.repoName })
        }),
      )
      const all2 = all
        .map((item, index) => {
          if (item === null) return null
          return {
            ...item,
            addedStars: res[index].addedStars,
          }
        })
        .filter((item) => {
          return item !== null
        })
      console.log('all2', all2)

      return all2
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1
    },
  })

  const flatData = React.useMemo(() => {
    return _.flatten(data?.pages)
  }, [data])

  const columns = createColumns(flatData)

  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  if (isLoading) return <div>loading</div>

  return (
    <div className={clsx('p-4 pt-20')}>
      <Table className={clsx('block overflow-auto h-[300px]')}>
        <TableHeader className={clsx('sticky top-0 bg-white z-10')}>
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
          {isFetching ? (
            <TableRow>
              <TableCell>loading</TableCell>
            </TableRow>
          ) : (
            <TableRow
              onClick={() => {
                fetchNextPage()
              }}
            >
              <TableCell>load more</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
