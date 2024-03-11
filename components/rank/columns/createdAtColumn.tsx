import { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import dayjs from 'dayjs'
import { clsx } from 'clsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { IRankItemWithRepoInfo } from '@/app/api/getRank/getRank'

export const createdAtColumn: ColumnDef<IRankItemWithRepoInfo> = {
  id: 'createdAt',
  size: 20,
  accessorKey: 'createdAt',
  filterFn: (row, columnId, filterValue) => {
    const date = row.getValue(columnId)
    // @ts-ignore
    const yearDiff = dayjs().diff(date, 'year')
    // @ts-ignore
    const monthDiff = dayjs().diff(date, 'month')
    // @ts-ignore
    const dayDiff = dayjs().diff(date, 'day')

    if (filterValue === 'Time') return true
    if (filterValue === 'Year') return yearDiff > 0
    if (filterValue === 'Month') return yearDiff === 0 && monthDiff > 0
    if (filterValue === 'Day')
      return yearDiff === 0 && monthDiff === 0 && dayDiff > 0
    return true
  },
  header: (props) => {
    const { column } = props
    return (
      <div className={clsx('w-[20.5]')}>
        <Select
          value={column.getFilterValue() as string}
          defaultValue={'Age'}
          onValueChange={(value) => {
            column.setFilterValue(value)
          }}
        >
          <SelectTrigger className="border-0">
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'Age'}>Age</SelectItem>
            <SelectItem value={'Year'}>Year</SelectItem>
            <SelectItem value={'Month'}>Month</SelectItem>
            <SelectItem value={'Day'}>Day</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },
  cell: (props) => {
    const createdAt = props.row.original.createdAt
    return <div className={'pl-3'}>{genCreatedAtDOM(createdAt)}</div>
  },
}
function genCreatedAtDOM(createdDate: string) {
  const createdDay = dayjs(createdDate)
  const today = dayjs()
  const yearsDifference = today.diff(createdDay, 'year')
  const monthsDifference = today.diff(createdDay, 'month')
  const daysDifference = today.diff(createdDay, 'day')
  if (yearsDifference > 0) {
    return <span className={clsx('text-red-700')}>{yearsDifference}Year</span>
  }
  if (monthsDifference > 0) {
    return (
      <span className={clsx('text-blue-700')}>{monthsDifference}Month</span>
    )
  }
  return <span className={clsx('text-green-700')}>{daysDifference}Day</span>
}
