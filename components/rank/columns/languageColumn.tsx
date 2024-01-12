import { ColumnDef } from '@tanstack/react-table'
import { IRankItem } from '@/server-actions/kv/setRank'
import * as React from 'react'
import _ from 'lodash'
import { clsx } from 'clsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'

export const languageColumn: ColumnDef<IRankItem> = {
  id: 'language',
  size: 20,
  accessorKey: 'language',
  filterFn: (row, columnId, filterValue) => {
    if (filterValue === 'Unknown') return row.getValue(columnId) === null
    if (filterValue === 'language') return true
    return filterValue === row.getValue(columnId)
  },
  header: (props) => {
    const { column } = props
    const data = props.table.options.data
    const languageList = data.map((item) => {
      if (item.language === null) return 'Unknown'
      return item.language
    })
    const languageCount = _.sortBy(
      _.toPairs(
        _.countBy(languageList, (item) => {
          return item
        }),
      ),
      1,
    ).reverse()

    return (
      <div className={clsx('w-[9.25rem]')}>
        <Select
          value={column.getFilterValue() as string}
          defaultValue={'language'}
          onValueChange={(value) => {
            column.setFilterValue(value)
          }}
        >
          <SelectTrigger className="border-0">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'language'}>
              Language({languageList.length})
            </SelectItem>
            {languageCount.map(([language, times]) => {
              return (
                <SelectItem key={language} value={language}>
                  {language}({times})
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
    )
  },
  cell: (props) => {
    const language = props.row.original.language
    return <div className={clsx('pl-3')}>{language}</div>
  },
}
