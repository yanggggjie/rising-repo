'use server'
import dayjs from 'dayjs'

const { BigQuery } = require('@google-cloud/bigquery')

interface Props {
  start: string
  end: string
  limit: number
  offset: number
}

function genDayQuery(day: string) {
  return `
  SELECT
    repo.name AS repoName,
    COUNT(*) AS addedStarsTemp
  FROM
      \`githubarchive.day.${day}\`
  WHERE
      type = 'WatchEvent'
  GROUP BY
      repoName
            `
}

export default async function getRankList({
  start,
  end,
  limit,
  offset,
}: Props) {
  let startDay = dayjs(start)
  const endDay = dayjs(end)
  const dayQueryList: string[] = []
  // include endDay
  while (!startDay.isAfter(endDay)) {
    let day = startDay.format('YYYYMMDD')
    dayQueryList.push(genDayQuery(day))
    startDay = startDay.add(1, 'day')
  }

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
    const bigquery = new BigQuery()
    const options = {
      query: query,
      location: 'US',
    }
    const [job] = await bigquery.createQueryJob(options)
    const [rows] = await job.getQueryResults()
    console.log('rows', rows)
    return rows as { repoName: string; addedStars: number }[]
  } catch (e) {
    console.log('error in getRankList', e)
    return []
  }
}
