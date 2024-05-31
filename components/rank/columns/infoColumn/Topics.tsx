import { Badge } from '@/components/ui/badge'
interface Props {
  topics: string[]
}

export default function Topics({ topics }: Props) {
  return (
    <div className={'truncate space-x-2 w-full'}>
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
  )
}
