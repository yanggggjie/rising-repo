'use client'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table'
import { memo, useDeferredValue, useEffect, useRef, useState } from 'react'
import { columns } from '@/components/rank/columns/columns'
import { IRankItemWithRepoInfo } from '@/lib/getRank/getRank'
import { twMerge } from 'tailwind-merge'
import { TableCell, TableHead, TableRow } from '@/components/ui/table'

interface Props {
  data: IRankItemWithRepoInfo[]
}

export default function RankTable({ data }: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const deferredColumnFilters = useDeferredValue(columnFilters)
  const tableRef = useRef<HTMLTableSectionElement | null>(null)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: deferredColumnFilters,
    },
    onColumnFiltersChange: (updaterOrValue) => {
      setColumnFilters(updaterOrValue)
    },
  })

  const columnWidth = ['w-[62.5%]', 'w-[12.5%]', 'w-[12.5%]', 'w-[12.5%]']

  useEffect(() => {
    if (tableRef.current && Object.is(columnFilters, deferredColumnFilters)) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [columnFilters, deferredColumnFilters])

  return (
    <table className={'w-full table-fixed'}>
      <thead className={twMerge('sticky top-0 left-0 bg-gray-100 z-10')}>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead
                    key={header.id}
                    className={twMerge(columnWidth[index])}
                  >
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
      </thead>
      <tbody
        ref={tableRef}
        style={{
          scrollMarginTop: '100px',
        }}
        className={twMerge(
          !Object.is(columnFilters, deferredColumnFilters) && 'opacity-30',
        )}
      >
        <TableBody
          table={table}
          deferredColumnFilters={deferredColumnFilters}
        ></TableBody>
      </tbody>
    </table>
  )
}
const TableBody = memo(function TableBody({
  table,
  deferredColumnFilters,
}: {
  table: Table<IRankItemWithRepoInfo>
  deferredColumnFilters: ColumnFiltersState
}) {
  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <TableRow key={row.id} className={'hover:bg-muted'}>
            {row.getVisibleCells().map((cell, index) => {
              return (
                <TableCell
                  key={cell.id}
                  className={twMerge(
                    index === 0 && 'overflow-hidden pr-[20px]',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </>
  )
})
