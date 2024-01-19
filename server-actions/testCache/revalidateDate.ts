'use server'
import { revalidateTag } from 'next/cache'

export default async function revalidateDate() {
  console.log('revalidate start')
  await revalidateTag('getDate')
  console.log('revalidate end')
}
