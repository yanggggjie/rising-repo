'use client'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import {
  ColumnFiltersState,
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
import { IRankItem } from '@/server-actions/kv/setRank'
import { useRef } from 'react'
import { columns } from '@/components/rank/columns/columns'
interface Props {
  data: IRankItem[]
}

export default function RankTable({ data }: Props) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
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
        <TableBody
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
