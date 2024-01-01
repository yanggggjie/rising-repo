'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { IRepo } from '@/server-actions/getARepo'
import { ArrowDownNarrowWide, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import * as React from 'react'

type IRepoTable = IRepo & {
  addedStars: number
}

const columnHelper = createColumnHelper<IRepoTable>()

const columns: ColumnDef<IRepoTable>[] = [
  {
    id: 'name',
    accessorKey: 'name',
  },
  {
    id: 'addedStars',
    accessorKey: 'addedStars',
  },
  {
    id: 'language',
    accessorKey: 'language',
    filterFn: 'equalsString',
    header: (props) => {
      const { column } = props
      return (
        <Select
          value={column.getFilterValue()}
          onValueChange={(value) => {
            column.setFilterValue(value)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Typescript">Typescript</SelectItem>
            <SelectItem value="Javascript">Javascript</SelectItem>
            <SelectItem value="Java">Java</SelectItem>
            <SelectItem value="Dart">Dart</SelectItem>
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

interface Props {
  data
}

export default function RankTable({ data }: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
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
