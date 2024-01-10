import dayjs from 'dayjs'

export type IDate = 'yesterday' | 'lastWeek' | 'lastMonth'
export type IDuring = {
  start: string
  end: string
}
export const dateToDuring: Record<IDate, IDuring> = {
  yesterday: {
    start: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  },
  lastWeek: {
    start: dayjs().subtract(7, 'day').subtract(7, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  },
  lastMonth: {
    start: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  },
}
