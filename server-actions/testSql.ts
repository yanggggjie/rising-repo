'use server'

import { ofetch } from 'ofetch'

export interface IDuring {
  start: string
  end: string
}

export default async function testSql({ during }: { during: IDuring }) {
  const data = await ofetch('https://play.clickhouse.com/?user=play', {
    method: 'POST',
    body: `
      SELECT
        repo_name,
        count() AS stars
      FROM github_events
      WHERE
        event_type = 'WatchEvent' AND
        created_at >= '${during.start}' AND
        created_at < '${during.end}'
      GROUP BY
        repo_name
      ORDER BY stars DESC
        LIMIT 3
        FORMAT JSON
    `,
  })
  return data.data as { repo_name: string; stars: number }[]
}
