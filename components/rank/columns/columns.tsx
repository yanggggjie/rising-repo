import { ColumnDef } from '@tanstack/react-table'
import { addedStarsColumn } from '@/components/rank/columns/addedStarsColumn'
import { languageColumn } from '@/components/rank/columns/languageColumn'
import { createdAtColumn } from '@/components/rank/columns/createdAtColumn'
import { infoColumn } from '@/components/rank/columns/infoColumn/infoColumn'
import { IRankItemWithRepoInfo } from '@/lib/getRank/getRank'

export const columns: ColumnDef<IRankItemWithRepoInfo>[] = [
  infoColumn,
  addedStarsColumn,
  createdAtColumn,
  languageColumn,
]
