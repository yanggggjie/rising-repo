import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import RQProvider from '@/app/RQProvider'

export const metadata: Metadata = {
  title: 'rising repo',
  description: 'a table to display recently popular repos',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RQProvider>{children}</RQProvider>
        <Analytics></Analytics>
        <SpeedInsights />
      </body>
    </html>
  )
}
