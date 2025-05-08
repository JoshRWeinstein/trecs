'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import AddRecButton from './AddRecButton'
import TRecsLogo from './TRecsLogo'

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showAddRecButton = pathname !== '/add-rec' && pathname !== '/register' && pathname !== '/login'
  const isAuthPage = pathname === '/login' || pathname === '/register'

  return (
    <div className={`${isAuthPage ? 'h-screen' : 'min-h-screen'} flex flex-col`}>
      <Navigation />
      {showAddRecButton && <AddRecButton />}
      <main className={`flex-grow ${isAuthPage ? 'flex items-start pt-8' : ''}`}>
        {children}
      </main>
      {!isAuthPage && (
        <footer className="bg-green-50 border-t border-green-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <TRecsLogo />
                <span className="text-sm text-gray-500">© {new Date().getFullYear()} TRecs. All rights reserved.</span>
              </div>
              <div className="flex space-x-6">
                <a href="/about" className="text-sm text-gray-500 hover:text-green-600">About</a>
                <a href="/privacy" className="text-sm text-gray-500 hover:text-green-600">Privacy</a>
                <a href="/terms" className="text-sm text-gray-500 hover:text-green-600">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
} 