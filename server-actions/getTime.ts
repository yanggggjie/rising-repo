'use server'
import { unstable_cache } from 'next/cache'
import { memoize } from 'nextjs-better-unstable-cache'

export default async function getTime() {
  async function getData() {
    const time = await fetch('https://quan.suning.com/getSysTime.do', {
      cache: 'force-cache',
    })
    return await time.json()
  }

  const cached = memoize(getData, {
    persist: true,
    duration: 10000,
    log: ['datacache'],
  })

  return await cached()
}
