import { clsx } from 'clsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { twMerge } from 'tailwind-merge'

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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div
          onClick={() => {}}
          className={twMerge(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            'focus:ring-0',
            'bg-white hover:ring-2 transition-shadow',
            'flex flex-row gap-1 items-center justify-center',
            'w-36',
          )}
        >
          {selectedTopic}
          <div className={'flex-1'}></div>
          <ChevronDownIcon className={'w-4 h-4'} />
        </div>
      </PopoverTrigger>
      <PopoverContent className={'ml-10 w-[30rem] space-y-2'}>
        <Input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
          placeholder={'type to filter topic'}
          className={'focus:outline-0 focus:ring-2'}
        ></Input>
        <div
          className={clsx(
            'w-full px-0.5 h-[30rem] overflow-y-scroll scrollbar-thin space-y-2',
          )}
        >
          <Badge
            variant="secondary"
            className={'space-x-1 mr-2 hover:ring-2'}
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
                className={'space-x-1 hover:ring-2 mr-2'}
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
