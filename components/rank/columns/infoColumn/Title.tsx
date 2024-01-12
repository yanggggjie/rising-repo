import _ from 'lodash'
import { clsx } from 'clsx'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
interface Props {
  name: string
  href: string
}

export default function Title({ name, href }: Props) {
  return (
    <p className={clsx('flex flex-row gap-2')}>
      <Link
        href={href}
        target={'_blank'}
        className={clsx('font-bold  text-blue-500')}
      >
        <p>{name}</p>
      </Link>
    </p>
  )
}
