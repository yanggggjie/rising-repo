'use client'
import _ from 'lodash'
import { clsx } from 'clsx'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
interface Props {
  children: ReactNode
}
const queryClient = new QueryClient()

export default function RQProvider({ children }: Props) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}
