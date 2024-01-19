'use server'
import dayjs from 'dayjs'
import { unstable_cache } from 'next/cache'
import { BigqueryClient } from '@/server-actions/bigQuery/BigQueryClient'

interface Props {
  start: string
  end: string
  limit: number
  offset: number
}

export interface IRankItem {
  repoName: string
  addedStars: number
}

export default unstable_cache(
  async function getRankList({ start, end, limit, offset }: Props) {
    const dayQueryList: string[] = genDayQueryList(start, end)
    const query =
      `
SELECT
    repoName,
    SUM(addedStarsTemp) AS addedStars
 FROM (
    ` +
      dayQueryList.join(`
  UNION ALL
    `) +
      `
)
GROUP BY
  repoName
ORDER BY
  addedStars DESC
LIMIT ${limit}
  `
    try {
      const options = {
        query: query,
        location: 'US',
      }
      const [job] = await BigqueryClient.createQueryJob(options)
      const [rows] = await job.getQueryResults()
      return rows as IRankItem[]
    } catch (e) {
      console.log('error in getRankList', e)
      return []
    }
  },
  ['getRankList'],
  {
    revalidate: 3600 * 24,
    tags: ['getRankList'],
  },
)

function genDayQueryList(start: string, end: string) {
  const dayQueryList: string[] = []

  let startDay = dayjs(start)
  const endDay = dayjs(end)

  while (!startDay.isAfter(endDay)) {
    const dayQuery = `
  SELECT
    repo.name AS repoName,
    COUNT(*) AS addedStarsTemp
  FROM
      \`githubarchive.day.${startDay.format('YYYYMMDD')}\`
  WHERE
      type = 'WatchEvent'
  GROUP BY
      repoName
    `
    dayQueryList.push(dayQuery)
    startDay = startDay.add(1, 'day')
  }
  return dayQueryList
}
