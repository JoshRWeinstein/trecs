'use client'

import { useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function SearchContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const category = searchParams?.get('category')

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Search Recommendations'}
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
} 