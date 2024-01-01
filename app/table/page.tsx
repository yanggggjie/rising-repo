'use client'

import _ from 'lodash'
import { clsx } from 'clsx'
import {
  ColumnFilter,
  ColumnFiltersState,
  createColumnHelper,
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
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
interface Props {}

const data = [
  {
    name: 'yang',
    age: 10,
  },
  {
    name: 'huan',
    age: 20,
  },
]

type IData = {
  name: string
  age: number
}

const columnHelper = createColumnHelper<IData>()

const columns = [
  columnHelper.accessor(
    (originalRow) => {
      return originalRow.name
    },
    {
      id: 'name',
      header: 'Name',
      filterFn: 'equalsString',
    },
  ),
  columnHelper.accessor(
    (originalRow) => {
      return originalRow.age
    },
    {
      id: 'age',
      header: 'Age',
    },
  ),
]

export default function Page({}: Props) {
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

  useEffect(() => {
    console.log('columnFilters', columnFilters)
  }, [columnFilters])

  const nameColumn = table.getColumn('name')

  console.log('name can filter', nameColumn?.getCanFilter())

  return (
    <div>
      <div>
        <Input
          value={nameColumn?.getFilterValue() as string}
          onChange={(event) => {
            nameColumn?.setFilterValue(event.target.value)
          }}
        ></Input>
      </div>

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
