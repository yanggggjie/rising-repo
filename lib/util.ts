import dayjs from 'dayjs'

export function getDate() {
  return {
    start: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  }
}
