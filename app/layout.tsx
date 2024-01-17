import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import { HydrationOverlay } from '@builder.io/react-hydration-overlay'

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
        <HydrationOverlay>{children}</HydrationOverlay>
      </body>
    </html>
  )
}
