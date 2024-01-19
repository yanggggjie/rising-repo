'use client'

import { useQueryState } from 'nuqs'
import { dateParser } from '@/components/date/dateParser'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { clsx } from 'clsx'
import { dateToDuring } from '@/components/date/dateToDuring'
import { ReactNode } from 'react'
interface Props {
  children: ReactNode
}

export default function DatePicker({ children }: Props) {
  const [date, setDate] = useQueryState('date', dateParser)

  return (
    <div className={'space-y-1'}>
      <RadioGroup
        defaultValue={date}
        className={clsx('space-x-5')}
        onValueChange={async (value) => {
          setDate(value)
        }}
      >
        {Object.keys(dateToDuring).map((value) => {
          return (
            <Label
              key={value}
              className={clsx('inline-flex flex-row items-center gap-1')}
            >
              <RadioGroupItem value={value}></RadioGroupItem>
              {value}
            </Label>
          )
        })}
      </RadioGroup>
      <div className={'text-xs'}>lastUpdateTime {children}</div>
    </div>
  )
}
