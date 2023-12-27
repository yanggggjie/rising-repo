'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import useSWR from 'swr'
import user from '@/server-actions/user'
interface Props {}

export default function User({}: Props) {
  const { data, isLoading, error } = useSWR(
    {
      url: 'user',
    },
    user,
  )
  if (isLoading) return <div>loading</div>
  console.log('data', data)
  return <div></div>
}
