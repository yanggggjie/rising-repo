'use server'
import { globalOfetch } from '@/server-actions/globalOfetch'
import { btoa } from 'node:buffer'

export default async function getDataFile() {
  try {
    const res = await globalOfetch(
      '/repos/yanggggjie/rising-repo/contents/data/yesterday.json',
      {
        method: 'GET',
      },
    )
    const decodedContent = atob(res.content)
    const parsedContent = JSON.parse(decodedContent)
    console.log('parsedContent', parsedContent)
  } catch (e) {
    console.log('e', e)
  }
}
