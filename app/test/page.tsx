'use client'
import React, { useState } from 'react'
import { tableData } from '@/app/test/table'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
interface Props {}

export default function Page({}: Props) {
  const repoInfoList = tableData.repoInfoList
  const [startWith, setStartWith] = useState('')
  const filteredList = repoInfoList.filter((item) => {
    return item.repoName.startsWith(startWith)
  })
  return (
    <div className="h-screen w-screen overflow-y-scroll">
      <Table wrapperClassName="overflow-clip">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[100px] sticky top-0 bg-white"
              onClick={() => {
                setStartWith('a')
              }}
            >
              Name
            </TableHead>
            <TableHead className="sticky top-0 bg-white">Stars</TableHead>
            <TableHead className="sticky top-0 bg-white">Method</TableHead>
            <TableHead className="sticky top-0 bg-white text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredList.map((item) => (
            <TableRow key={item.repoName}>
              <TableCell>{item.repoName}</TableCell>
              <TableCell>{item.addedStars}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell className="text-right">{item.language}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
