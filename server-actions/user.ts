'use server'
import { globalOfetch } from '@/server-actions/globalOfetch'

export default async function user() {
  return await globalOfetch('/user')
}
