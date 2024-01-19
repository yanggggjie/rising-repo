'use server'

import { BigqueryClient } from '@/server-actions/bigQuery/BigQuery'

export default async function testBigQuery() {
  async function query() {
    const query = `SELECT repo.name AS repoName,
                          COUNT(*)  AS addedStars
                   FROM \`githubarchive.day.20240110\`
                   WHERE type = 'WatchEvent'
                   GROUP BY repoName
                   ORDER BY addedStars
                     DESC LIMIT 10
    `

    const queryDateRange = `SELECT
  repo.name AS repoName,
  COUNT(*) AS addedStars
FROM
  \`githubarchive.day.2020*\`
WHERE
  _TABLE_SUFFIX BETWEEN '0101' AND '0107'
  AND type = 'WatchEvent'
GROUP BY
  repoName
ORDER BY
  addedStars DESC
LIMIT
  10
`

    const options = {
      query: query,
      location: 'US',
    }
    const [job] = await BigqueryClient.createQueryJob(options)
    console.log(`Job ${job.id} started.`)
    const [rows] = await job.getQueryResults()
    console.log('rows', rows)
  }
  query()
  return {
    msg: 'haha',
  }
}
