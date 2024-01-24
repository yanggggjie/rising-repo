'use server'
import { gql } from 'graphql-request'
import { gqlClient } from '@/server-actions/graphql/gqlClient'
import { data1 } from '@/temp/data.js'
export default async function testGraphql() {
  let data = data1.slice(110, 130)

  const repoQueries = data
    .map((repo, index) => {
      const [owner, name] = repo.repoName.split('/')
      return `
    repo${index}: repository(owner: "${owner}", name: "${name}") {
      createdAt
    }
  `
    })
    .join('\n')

  // 完整的查询字符串
  const query = gql`{
  ${repoQueries}
}`
  console.log('client', gqlClient)
  try {
    const res = await gqlClient.request(query)
    console.log('res', res)
  } catch (e) {
    oneByOneQuery(data)
  }
}

function oneByOneQuery(data: any[]) {
  //   todo
}
