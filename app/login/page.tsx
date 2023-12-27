import _ from 'lodash'
import { clsx } from 'clsx'
import Link from 'next/link'
interface Props {}

export default function Page({}: Props) {
  return <div>
    <Link href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`}></Link>
  </div>
}
