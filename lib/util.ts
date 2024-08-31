import dayjs from 'dayjs'

export function getDate() {
  return {
    start: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  }
}
export function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, delay)
  })
}

export function isWithLocalData() {
  const WITH_LOCAL_DATA = process.env.WITH_LOCAL_DATA
  return WITH_LOCAL_DATA === 'true'
}
