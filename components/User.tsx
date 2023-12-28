import _ from 'lodash'
import { clsx } from 'clsx'
import user from '@/server-actions/user'
interface Props {}

export default async function User({}: Props) {
  const res = await user()
  return <div>name:{res.name}</div>
}
