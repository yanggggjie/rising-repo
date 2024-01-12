import _ from 'lodash'
import { clsx } from 'clsx'
interface Props {
  text: string
}

export default function Description({ text }: Props) {
  return <p className={'truncate w-full'}>{text}</p>
}
