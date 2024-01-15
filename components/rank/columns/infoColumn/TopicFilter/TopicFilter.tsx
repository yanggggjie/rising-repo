import _ from 'lodash'
import { clsx } from 'clsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronDownIcon } from 'lucide-react'
import { useRef, useState } from 'react'

interface Props {
  sortedTopicList: Array<[string, number]>
  selectedTopic: string
  onTopicClick: (topic: string) => void
}

export default function TopicFilter({
  sortedTopicList,
  selectedTopic,
  onTopicClick,
}: Props) {
  const top100 = sortedTopicList.slice(0, 100)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button variant="outline" onClick={() => {}}>
          {selectedTopic}
          <ChevronDownIcon className={'w-5 h-5'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'w-[40rem]'}>
        <div className={'space-x-2 space-y-2'}>
          <Badge
            variant="secondary"
            className={'space-x-1 hover:outline'}
            onClick={() => {
              onTopicClick('all')
              setIsOpen(false)
            }}
          >
            <span>all</span>
          </Badge>
          {top100.map(([name, times]) => {
            return (
              <Badge
                key={name}
                variant="secondary"
                className={'space-x-1 hover:outline'}
                onClick={() => {
                  onTopicClick(name)
                  setIsOpen(false)
                }}
              >
                <span>{name}</span>
                <span className={'bg-gray-200  px-1 rounded-full'}>
                  {times}
                </span>
              </Badge>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
