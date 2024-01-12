import { ColumnDef } from '@tanstack/react-table'
import { IRankItem } from '@/server-actions/kv/setRank'
import { addedStarsColumn } from '@/components/rank/columns/addedStarsColumn'
import { languageColumn } from '@/components/rank/columns/languageColumn'
import { createdAtColumn } from '@/components/rank/columns/createdAtColumn'
import { infoColumn } from '@/components/rank/columns/infoColumn/infoColumn'

export const columns: ColumnDef<IRankItem>[] = [
  infoColumn,
  addedStarsColumn,
  createdAtColumn,
  languageColumn,
]
