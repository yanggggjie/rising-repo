'use client'
import testToken from '@/server-actions/testToken'
import testAction from '@/server-actions/testAction'
import { clsx } from 'clsx'
import { BulletList } from 'react-content-loader'
import * as React from 'react'
import getRankListWithLanguage from '@/server-actions/getRankListWithLanguage'
import writeDataFile from '@/server-actions/writeDataFile'
import getDataFile from '@/server-actions/getDataFile'
interface Props {}

export default function Page({}: Props) {
  return (
    <div>
      <div className={clsx('m-10 border-2')}>
        <button
          onClick={() => {
            getRankListWithLanguage()
          }}
        >
          getRankListWithLanguage
        </button>
        <hr />
        <button
          onClick={() => {
            writeDataFile()
          }}
        >
          writeDataFile
        </button>
        <hr />
        <button
          onClick={() => {
            getDataFile()
          }}
        >
          getDataFile
        </button>
      </div>
    </div>
  )
}
