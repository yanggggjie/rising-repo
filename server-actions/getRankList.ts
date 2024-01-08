'use server'

import { ofetch } from 'ofetch'
import { memoize } from 'nextjs-better-unstable-cache'

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
  try {
    const data = await ofetch('https://play.clickhouse.com/?user=play', {
      method: 'POST',
      body: `
      SELECT
        repo_name as repoName,
        count() AS addedStars
      FROM github_events
      WHERE
        event_type = 'WatchEvent' AND
        created_at >= '${start}' AND
        created_at < '${end}'
      GROUP BY
        repo_name
      ORDER BY addedStars DESC
        LIMIT ${limit}
        OFFSET ${offset}
        FORMAT JSON
    `,
    })
    return data.data as { repoName: string; addedStars: number }[]
  } catch (e) {
    console.log('error in getRankList', e)
    return []
  }
}
