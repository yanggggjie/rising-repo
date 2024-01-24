'use server'

import { BigqueryClient } from '@/server-actions/bigQuery/BigQueryClient'

export default async function testBigQuery() {
  async function query() {
    const query = `SELECT repo.name AS repoName,
                          COUNT(*)  AS addedStars
                   FROM \`githubarchive.day.20240110\`
                   WHERE type = 'WatchEvent'
                   GROUP BY repoName
                   ORDER BY addedStars
                     DESC LIMIT 10000
    `

    const options = {
      query: query,
      location: 'US',
    }
    const [job] = await BigqueryClient.createQueryJob(options)
    const [rows] = await job.getQueryResults()
    return rows
  }
  const rows = await query()
  return {
    rows: rows,
  }
}

;`
SELECT

repo.name AS repoName,
COUNT(*)  AS addedStars

FROM \`githubarchive.day.20240111\`
WHERE type = 'WatchEvent'
GROUP BY repoName
ORDER BY addedStars
DESC LIMIT 10000
`
