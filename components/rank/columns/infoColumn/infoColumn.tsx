import { ColumnDef } from '@tanstack/react-table'
import { IRankItem } from '@/server-actions/kv/setRank'
import { clsx } from 'clsx'
import * as React from 'react'
import _ from 'lodash'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Title from '@/components/rank/columns/infoColumn/Title'
import Description from '@/components/rank/columns/infoColumn/Description'
import Topics from '@/components/rank/columns/infoColumn/Topics'
import TopicFilter from '@/components/rank/columns/infoColumn/TopicFilter/TopicFilter'

export const infoColumn: ColumnDef<IRankItem> = {
  id: 'info',
  filterFn: (row, columnId, filterValue) => {
    console.log('row', row)

    if (filterValue === 'Unknown') return row.getValue(columnId) === null
    if (filterValue === 'language') return true
    return filterValue === row.getValue(columnId)
  },
  header: (props) => {
    const column = props.column
    const data = props.table.options.data
    const allTopics = data.reduce((previousValue, currentValue) => {
      return [...previousValue, ...currentValue.topics]
    }, [] as string[])

    const sortedTopicList = _.sortBy(
      _.toPairs(
        _.countBy(allTopics, (item) => {
          return item
        }),
      ),
      1,
    ).reverse()

    return (
      <div className={clsx('flex flex-row gap-10')}>
        <div>Info</div>
        <TopicFilter
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
      <div className={clsx('flex flex-row items-center justify-start gap-2 ')}>
        <Avatar>
          <AvatarImage src={ownerAvatar}></AvatarImage>
          <AvatarFallback>{ownerLogin}</AvatarFallback>
        </Avatar>
        <div
          className={clsx(
            'w-[30rem] flex flex-col items-start justify-center gap-1.5',
          )}
        >
          <Title name={nameWithoutOwner} href={githubURL}></Title>
          <Description text={description}></Description>
          <Topics topics={topics}></Topics>
        </div>
      </div>
    )
  },
}
