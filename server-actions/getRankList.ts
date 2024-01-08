'use server'

import { ofetch } from 'ofetch'
import { memoize } from 'nextjs-better-unstable-cache'
import axios from 'axios'

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
    const body = `
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
    `
    const url = 'https://play.clickhouse.com/'
    const headers = {
      Authorization: 'Basic cGxheTo=',
    }
    const res = await axios.post(url, body, { headers: headers })
    return res.data.data as { repoName: string; addedStars: number }[]
  } catch (e) {
    console.log('error in getRankList', e)
    return []
  }
}
