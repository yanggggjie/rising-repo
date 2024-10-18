'use client'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ChatgptIcon } from '@/components/Summary'
import { MessageSquareOff } from 'lucide-react'
interface Props {
  content: string
}

export default function SummaryDialog({ content }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div
        className={twMerge(
          'py-2 px-4 rounded-full bg-[#18181b] text-white cursor-pointer',
          'flex flex-row items-center justify-center underline',
        )}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? (
          <>
            <MessageSquareOff></MessageSquareOff>
          </>
        ) : (
          <>
            <ChatgptIcon></ChatgptIcon>
            <div className={'w-[6px]'}></div>
            <div>Summary</div>
          </>
        )}
      </div>
      {open && (
        <div
          className={twMerge(
            'absolute -top-3 right-0  -translate-y-[100%]',
            'w-[400px] py-5 px-4 bg-white rounded-xl border-2 border-[#18181b]',
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
