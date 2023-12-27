'use server'
import { ofetch } from 'ofetch'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const globalOfetch = ofetch.create({
  baseURL: 'https://api.github.com/',
  method: 'GET',
  onRequest: ({ options }) => {
    const access_token = getCookie('access_token', {
      cookies,
    })
    if (!access_token) redirect('/login')
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${access_token}`,
    }
  },
  onResponse: ({ options, response }) => {
    if (response.status === 401) {
      redirect('/login')
    }
  },
})

export { globalOfetch }
