import { GraphQLClient, gql } from 'graphql-request'
const endPoint = 'https://api.github.com/graphql'

export const gqlClient = new GraphQLClient(endPoint, {
  headers: {
    authorization: `Bearer ${process.env.MY_GITHUB_TOKEN}`,
  },
})
