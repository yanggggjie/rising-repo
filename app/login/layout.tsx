import _ from 'lodash'
import { clsx } from 'clsx'
import { ReactNode } from 'react'
interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return <div>{children}</div>
}
