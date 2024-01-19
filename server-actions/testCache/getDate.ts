'use server'
import dayjs from 'dayjs'
import { unstable_cache } from 'next/cache'

export default unstable_cache(
  async function getDate() {
    return dayjs().format('HH-mm-ss')
  },
  ['getDate'],
  {
    revalidate: 1000,
    tags: ['getDate'],
  },
)
