import { parseAsStringEnum } from 'nuqs/parsers'
import { dateToDuring } from '@/components/rank/DateToDuring'
import _ from 'lodash'

export const dateParser = parseAsStringEnum(Object.keys(dateToDuring))
  .withDefault('yesterday')
  .withOptions({
    history: 'push',
    shallow: false,
  })
