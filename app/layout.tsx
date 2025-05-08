import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'
import AddRecButton from './components/AddRecButton'
import TRecsLogo from './components/TRecsLogo'
import type { Metadata } from 'next'
import Providers from './components/Providers'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()
  const showAddRecButton = pathname !== '/add-rec'

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <Providers>
          <div className="min-h-full">
            <Navigation />
            {showAddRecButton && <AddRecButton />}
            <main>
              {children}
            </main>
            <footer className="mt-auto border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center">
                      <TRecsLogo />
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      Share and discover your favorite things with the world. 
                      From restaurants to running shoes, find the best recommendations from people you trust.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
                    <ul className="mt-4 space-y-2">
                      <li>
                        <a href="/" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">Home</a>
                      </li>
                      <li>
                        <a href="/my-recs" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">My TRecs</a>
                      </li>
                      <li>
                        <a href="/search" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">Search</a>
                      </li>
                      <li>
                        <a href="/categories" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">Categories</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Account</h3>
                    <ul className="mt-4 space-y-2">
                      <li>
                        <a href="/login" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">Sign In</a>
                      </li>
                      <li>
                        <a href="/register" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">Get Started</a>
                      </li>
                      <li>
                        <a href="/profile" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">My Profile</a>
                      </li>
                      <li>
                        <a href="/settings" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">Settings</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <p className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} TRecs - The Recommendations. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
} 