'use client'
import testToken from '@/server-actions/testToken'
import testAction from '@/server-actions/testAction'
import { clsx } from 'clsx'
interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      <div className={clsx('flex flex-col gap-10 h-[100px] overflow-auto')}>
        <div className={clsx('sticky top-0')}>haha</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </div>
    </div>
  )
}
