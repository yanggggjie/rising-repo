'use client'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { TableCell, TableHead, TableRow } from '@/components/ui/table'
import { useRef, useState } from 'react'
import { columns } from '@/components/rank/columns/columns'
import { IRankItemWithRepoInfo } from '@/lib/getRank/getRank'
import { twMerge } from 'tailwind-merge'

interface Props {
  data: IRankItemWithRepoInfo[]
}

export default function RankTable({ data }: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const tableRef = useRef(null)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: (updaterOrValue) => {
      setColumnFilters(updaterOrValue)
      if (tableRef.current) {
        // @ts-ignore
        tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
  })

  return (
    <table className={'w-full'}>
      <thead
        className={twMerge('sticky top-0 left-0 bg-gray-100 z-10')}
        style={{
          width: table.getTotalSize(),
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                    }}
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
      >
        {table.getRowModel().rows.map((row) => {
          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </tbody>
    </table>
  )
}
