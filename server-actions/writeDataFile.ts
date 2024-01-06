'use server'

import { globalOfetch } from '@/server-actions/globalOfetch'

export default async function writeDataFile() {
  try {
    const res = await globalOfetch(
      '/repos/yanggggjie/rising-repo/contents/data/lastweek.json',
      {
        method: 'PUT',
        body: {
          message: 'update data file',
          content: {
            msg: btoa('hello world from data cache bot'),
          },
        },
      },
    )
    console.log('res', res)
    return res
  } catch (e) {
    console.log('e', e)
  }
}
