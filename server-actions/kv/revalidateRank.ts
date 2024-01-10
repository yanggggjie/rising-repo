'use server'
import { revalidateTag } from 'next/cache'

export default async function revalidateRank() {
  console.log('revalidateRank start')
  await revalidateTag('getRank')
  console.log('revalidateRank end')
}
