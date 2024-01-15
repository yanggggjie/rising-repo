import _ from 'lodash'
import { clsx } from 'clsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
interface Props {
  sortedTopicList: Array<[string, number]>
  onTopicClick: (topic: string) => void
}

export default function TopicFilter({ sortedTopicList }: Props) {
  const top100 = sortedTopicList.slice(0, 100)
  const [selectedTopic, setSelectedTopic] = useState<string>('Topic')

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">
            {selectedTopic}
            <ChevronDownIcon className={'w-5 h-5'} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={'w-[600px]'}>
          <div className={'space-x-2 space-y-2'}>
            {top100.map(([name, times]) => {
              return (
                <Badge
                  key={name}
                  variant="secondary"
                  className={'space-x-1 hover:outline'}
                  onClick={() => {
                    setSelectedTopic(name)
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
    </div>
  )
}
