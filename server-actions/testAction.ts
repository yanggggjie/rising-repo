async function testAction({ time }: { time: number }) {
  console.log('time', time)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`after ${time},hello world`)
    }, time)
  })
}
export { testAction }

// SQL dialect
;`SELECT
repo_name,
  count() AS stars
FROM github_events
WHERE
event_type = 'WatchEvent' AND
created_at >= '2023-01-01' AND
created_at < '2023-01-02'
GROUP BY
repo_name
ORDER BY stars DESC
LIMIT 50
`
