'use server'
import { ofetch } from 'ofetch'
import { setCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export default async function loginWithCode({ code }: { code: string }) {
  const res = await ofetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: {
      code,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    },
  })
  if ('access_token' in res) {
    setCookie('access_token', res.access_token, {
      cookies,
    })
    return {
      success: true,
    }
  }
  return {
    success: false,
    res: res,
  }
}
