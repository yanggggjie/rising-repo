import { ColumnDef } from '@tanstack/react-table'
import { clsx } from 'clsx'
import * as React from 'react'
import { IRankItemWithRepoInfo } from '@/lib/getRank/getRank'

export const addedStarsColumn: ColumnDef<IRankItemWithRepoInfo> = {
  id: 'addedStars',
  size: 20,
  accessorKey: 'addedStars',
  header: () => {
    return <p className={clsx('text-start')}>Stars</p>
  },
  cell: (props) => {
    const addedStars = props.row.original.addedStars
    return (
      <p
        className={clsx(
          'flex flex-row items-center  justify-start',
          'text-green-700',
        )}
      >
        +{addedStars}
      </p>
    )
  },
}
