'use server'
import { request, gql } from 'graphql-request'

export default async function testGraphql() {
  const document = gql`
    {
      viewer {
        login
      }
    }
  `
  const res = await request(
    'https://api.github.com/graphql',
    document,
    {},
    {
      Authorization: `Bearer ${process.env.MY_GITHUB_TOKEN}`,
    },
  )
  console.log('res', res)
}
