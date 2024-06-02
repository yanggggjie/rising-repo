'use client'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table'
import { TableCell, TableHead, TableRow } from '@/components/ui/table'
import { useRef, useState } from 'react'
import { columns } from '@/components/rank/columns/columns'
import { IRankItemWithRepoInfo } from '@/lib/getRank/getRank'
import { notUndefined, useVirtualizer } from '@tanstack/react-virtual'
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
  const parentRef = useRef<HTMLDivElement>(null)
  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  })
  const items = virtualizer.getVirtualItems()
  const [before, after] =
    items.length > 0
      ? [
          notUndefined(items[0]).start - virtualizer.options.scrollMargin,
          virtualizer.getTotalSize() -
            notUndefined(items[items.length - 1]).end,
        ]
      : [0, 0]
  return (
    <div ref={parentRef}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
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
            {before > 0 && (
              <tr>
                <td colSpan={8} style={{ height: before }} />
              </tr>
            )}

            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index] as Row<IRankItemWithRepoInfo>

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
            {after > 0 && (
              <tr>
                <td colSpan={8} style={{ height: after }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
