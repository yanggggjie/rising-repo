'use server'
import { revalidateTag } from 'next/cache'

export default async function revalidateRank() {
  await revalidateTag('getRank')
}
