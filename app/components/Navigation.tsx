'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import TRecsLogo from './TRecsLogo'
import { FaSearch } from 'react-icons/fa'

const Navigation: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <TRecsLogo />
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </form>
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/categories" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/categories' 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Categories
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 