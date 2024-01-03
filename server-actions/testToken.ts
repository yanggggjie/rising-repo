'use server'
import { ofetch } from 'ofetch'

export default async function testToken() {
  console.log('token', process.env.MY_GITHUB_TOKEN)

  try {
    const res = await ofetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `Bearer ${process.env.MY_GITHUB_TOKEN}`,
      },
    })
    console.log('res', res)
    return res
  } catch (e) {
    console.log('e', e)
  }
}
