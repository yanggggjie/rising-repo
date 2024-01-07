'use client'
import { clsx } from 'clsx'
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
import { createColumns } from '@/components/rank/createColumns'
import { IRankItem } from '@/server-actions/kv/setRank'
interface Props {
  data: IRankItem[]
}

export default function RankTable({ data }: Props) {
  const columns = createColumns(data)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
