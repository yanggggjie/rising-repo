import { parseAsStringEnum } from 'nuqs/parsers'
import _ from 'lodash'
import { dateToDuring } from '@/components/date/dateToDuring'

export const dateParser = parseAsStringEnum(Object.keys(dateToDuring))
  .withDefault('yesterday')
  .withOptions({
    history: 'push',
    shallow: false,
  })
