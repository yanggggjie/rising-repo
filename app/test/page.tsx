'use client'
import testToken from '@/server-actions/testToken'
import testAction from '@/server-actions/testAction'
import { clsx } from 'clsx'
import { BulletList } from 'react-content-loader'
import * as React from 'react'
interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      <div className={clsx('m-10 border-2')}>
        <BulletList />
        <BulletList />
      </div>
    </div>
  )
}
