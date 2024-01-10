'use server'
const { BigQuery } = require('@google-cloud/bigquery')

interface Props {
  start: string
  end: string
  limit: number
  offset: number
}

export default async function getRankList({
  start,
  end,
  limit,
  offset,
}: Props) {
  const start_day = start.replaceAll('-', '')
  try {
    const bigquery = new BigQuery()
    const query = `SELECT
    repo.name AS repoName,
    COUNT(*) AS addedStars
    FROM
      \`githubarchive.day.${start_day}\`
    WHERE
    type = 'WatchEvent'
    GROUP BY
    repoName
    ORDER BY
    addedStars DESC
    LIMIT
    1000
    `

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
