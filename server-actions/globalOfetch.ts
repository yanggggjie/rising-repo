'use server'
import { ofetch } from 'ofetch'

const globalOfetch = ofetch.create({
  baseURL: 'https://api.github.com/',
  method: 'GET',
  onRequest: ({ options }) => {
    options.headers = {
      ...options.headers,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${process.env.READ_WRITE_RISING_REPO}`,
    }
  },
  timeout: 2000,
})

export { globalOfetch }
