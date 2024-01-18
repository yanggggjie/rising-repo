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
import { useState } from 'react'
import { Input } from '@/components/ui/input'

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
  const [searchText, setSearchText] = useState('')
  const filteredTopicList = sortedTopicList.filter(([name, times]) => {
    return name.includes(searchText)
  })

  const top100 = filteredTopicList.slice(0, 100)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} defaultOpen={true} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button variant="outline" asChild={true} onClick={() => {}}>
          <div>
            {selectedTopic}
            <ChevronDownIcon className={'w-5 h-5'} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'ml-10 w-[30rem] space-y-5'}>
        <Input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
          placeholder={'type to filter topic'}
        ></Input>
        <div className={clsx('w-full h-[30rem] overflow-auto space-y-2')}>
          <Badge
            variant="secondary"
            className={'space-x-1 mr-2 hover:outline'}
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
                className={'space-x-1 hover:outline mr-2'}
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
