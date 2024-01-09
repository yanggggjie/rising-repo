import dayjs from 'dayjs'

export type IDate = 'yesterday' | 'lastWeek' | 'lastMonth'
export type IDuring = {
  start: string
  end: string
}
export const dateToDuring: Record<IDate, IDuring> = {
  yesterday: {
    start: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
    end: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  },
  lastWeek: {
    start: dayjs().subtract(8, 'day').subtract(7, 'day').format('YYYY-MM-DD'),
    end: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  },
  lastMonth: {
    start: dayjs().subtract(31, 'day').format('YYYY-MM-DD'),
    end: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  },
}
