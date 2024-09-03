import { ColumnDef } from '@tanstack/react-table'
import { clsx } from 'clsx'
import * as React from 'react'
import _ from 'lodash'
import TopicFilter from '@/components/rank/columns/infoColumn/TopicFilter/TopicFilter'
import { IRankItemWithRepoInfo } from '@/lib/getRank/getRank'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export type ISortedTopic = [string, number]

export const infoColumn: ColumnDef<IRankItemWithRepoInfo> = {
  id: 'info',
  filterFn: (row, columnId, filterValue) => {
    if (filterValue === 'all') return true
    const topics = row.original.topics
    return topics.includes(filterValue)
  },
  header: (props) => {
    const column = props.column
    const data = props.table.options.data
    const allTopics = data.reduce((previousValue, currentValue) => {
      return [...previousValue, ...currentValue.topics]
    }, [] as string[])

    const sortedTopicList: ISortedTopic[] = _.sortBy(
      _.toPairs(
        _.countBy(allTopics, (item) => {
          return item
        }),
      ),
      1,
    ).reverse()

    const selectedTopic =
      column.getFilterValue() === undefined
        ? 'topic'
        : column.getFilterValue() === 'all'
          ? 'topic'
          : (column.getFilterValue() as string)

    return (
      <div className={clsx('flex flex-row items-center gap-10 pl-3')}>
        <div>Info</div>
        <TopicFilter
          selectedTopic={selectedTopic}
          onTopicClick={(topic) => {
            column.setFilterValue(topic)
          }}
          sortedTopicList={sortedTopicList}
        ></TopicFilter>
      </div>
    )
  },
  cell: (props) => {
    const row = props.row.original
    const repoName = row.repoName
    const nameWithoutOwner = repoName.split('/')[1]
    const ownerLogin = row.ownerLogin
    const ownerAvatar = row.ownerAvatar
    const githubURL = `https://github.com/${repoName}`
    const description = row.description
    const topics = row.topics

    return (
      <div
        className={clsx(
          'py-3',
          'flex flex-row items-center justify-start gap-3',
        )}
      >
        <img
          className={'w-16 h-16 rounded-full'}
          src={ownerAvatar}
          alt={ownerLogin + 'avatar'}
          loading={'lazy'}
        />
        <div
          className={clsx(
            'flex-1 overflow-hidden flex flex-col items-start justify-center gap-2',
          )}
        >
          <div className={clsx('flex flex-row gap-2 text-xl')}>
            <Link
              href={githubURL}
              target={'_blank'}
              className={clsx('font-bold  text-blue-500 hover:underline')}
            >
              <div>{nameWithoutOwner}</div>
            </Link>
          </div>
          <div className={'line-clamp-1'}>{description}</div>
          <div className={'line-clamp-1 space-x-2'}>
            {topics.map((topic) => {
              return (
                <Badge
                  className={'rounded font-normal'}
                  variant="outline"
                  key={topic}
                >
                  {topic}
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    )
  },
}
