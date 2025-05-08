import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Providers from './components/Providers'
import LayoutContent from './components/LayoutContent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TRecs - Restaurant Recommendations',
  description: 'Discover and share your favorite restaurant recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <Providers>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Providers>
      </body>
    </html>
  )
} 