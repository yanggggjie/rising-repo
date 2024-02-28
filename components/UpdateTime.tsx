import _ from 'lodash'
import { clsx } from 'clsx'
import { use } from 'react'
interface Props {
  updateTimePromise: Promise<string>
}

export default function UpdateTime({ updateTimePromise }: Props) {
  const updateTime = use(updateTimePromise)
  return <span>{updateTime}</span>
}
