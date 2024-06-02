import { ColumnDef } from '@tanstack/react-table'
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
import { IRankItemWithRepoInfo } from '@/lib/getRank/getRank'
import { useDeferredValue, useEffect, useState } from 'react'

export const languageColumn: ColumnDef<IRankItemWithRepoInfo> = {
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

    // State to hold the immediate value
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [immediateValue, setImmediateValue] = useState<string>('language')
    // Use deferred value to delay the filter update
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const deferredValue = useDeferredValue(immediateValue)

    // Sync the deferred value with the column filter

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      column.setFilterValue(deferredValue)
    }, [deferredValue, column])

    return (
      <div className={clsx('w-[9.25rem]')}>
        <Select
          value={immediateValue}
          defaultValue={'language'}
          onValueChange={(value) => {
            setImmediateValue(value)
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
