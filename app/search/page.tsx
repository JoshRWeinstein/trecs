'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams?.get('category')

  if (!searchParams) {
    return null
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Recommendations:{' '}
          {category && (
            <>
              <Link 
                href="/search?category=food-and-drink" 
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Food and Drink
              </Link>
              {' > '}
              <span className="text-gray-800">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </>
          )}
          {!category && 'Search Recommendations'}
        </h1>
        {!category && (
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for recommendations..."
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder for search results */}
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-600">Try searching for something else</p>
          </div>
        </div>
      </div>
    </main>
  )
} 