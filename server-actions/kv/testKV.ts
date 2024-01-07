'use server'
import { kv } from '@vercel/kv'
export default async function testKV() {
  // const res = await kv.set('data', {
  //   msg: 'hello world',
  // })

  const data = await kv.get('data')
  console.log('data', data)

  // if (res === 'OK') console.log('success')
  // console.log('res', res)
}
