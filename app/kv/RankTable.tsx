'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { useInfiniteQuery } from '@tanstack/react-query'
import getRankList from '@/server-actions/getRankList'
import dayjs from 'dayjs'
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
import { createColumns } from '@/components/rank/createColumns'
import { dateToDuring } from '@/components/date/DateToDuring'
import { BulletList } from 'react-content-loader'
import { Button } from '@/components/ui/button'
interface Props {
  date: string
}

const MAX_PAGE = 100
const LIMIT = 10

export default function RankList({ date }: Props) {
  const { start, end } = dateToDuring[date]

  const { data, isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['rankList', start, end, MAX_PAGE, LIMIT],
    queryFn: async ({ pageParam }) => {
      const offset = pageParam * LIMIT
      const limit = LIMIT
      const rankList = await getRankList({ offset, limit, start, end })
      const _repoList = await Promise.all(
        rankList.map((item) => {
          return getARepo({ repoName: item.repoName })
        }),
      )
      const repoList = _repoList
        .map((item, index) => {
          if (item === null) return null
          return {
            ...item,
            addedStars: rankList[index].addedStars,
          }
        })
        .filter((item) => {
          return item !== null
        })

      return repoList
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1
    },
  })
  const currentPage = data?.pageParams.length || 0

  const flatData = React.useMemo(() => {
    return _.flatten(data?.pages)
  }, [data])
  // @ts-ignore
  const columns = createColumns(flatData)

  const table = useReactTable({
    data: flatData,
    // @ts-ignore
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  if (isLoading)
    return (
      <div className={clsx('m-4 pt-10 border-2 h-[900px] overflow-hidden')}>
        <BulletList />
        <BulletList />
      </div>
    )

  return (
    <div className={clsx('m-4')}>
      <Table className={clsx('block overflow-auto h-[900px]', 'border-2')}>
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
          {isFetching && (
            <TableRow>
              <TableCell>
                <Button>loading</Button>
              </TableCell>
            </TableRow>
          )}
          {currentPage < MAX_PAGE && (
            <TableRow
              onClick={() => {
                fetchNextPage()
              }}
            >
              <TableCell>
                <Button>{isFetching ? ' loading ' : 'load more'}</Button>
              </TableCell>
            </TableRow>
          )}
          {currentPage >= MAX_PAGE && (
            <TableRow>
              <TableCell>no more</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
