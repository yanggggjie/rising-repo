'use server'
import { ofetch } from 'ofetch'

const globalOfetch = ofetch.create({
  baseURL: 'https://api.github.com/',
  method: 'GET',
  onRequest: ({ options }) => {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${process.env.MY_GITHUB_TOKEN}`,
    }
  },
})

export { globalOfetch }
