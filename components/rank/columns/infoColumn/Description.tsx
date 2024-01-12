import _ from 'lodash'
import { clsx } from 'clsx'
interface Props {
  text: string
}

export default function Description({ text }: Props) {
  return <div className={'line-clamp-1 w-full'}>{text}</div>
}
