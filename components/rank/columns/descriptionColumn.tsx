import { ColumnDef } from '@tanstack/react-table'
import { IRankItem } from '@/server-actions/kv/setRank'
import * as React from 'react'

export const descriptionColumn: ColumnDef<IRankItem> = {
  id: 'description',
  accessorKey: 'description',
  header: () => {
    return <div className={'text-start'}>Description</div>
  },
}
