import { clsx } from 'clsx'
import Link from 'next/link'
interface Props {
  name: string
  href: string
}

export default function Title({ name, href }: Props) {
  return (
    <div className={clsx('flex flex-row gap-2 text-lg')}>
      <Link
        href={href}
        target={'_blank'}
        className={clsx('font-bold  text-blue-500')}
      >
        <div>{name}</div>
      </Link>
    </div>
  )
}
