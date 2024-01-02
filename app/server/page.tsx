import _ from 'lodash'
import { clsx } from 'clsx'
import A from '@/app/server/A'
interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      in server page
      <A></A>
    </div>
  )
}
