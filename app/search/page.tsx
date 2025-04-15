'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FaSearch, FaMapMarkerAlt, FaLink, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  description: string | null
  website: string | null
  location: string | null
  category: {
    name: string
  }
  user: {
    name: string
  }
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query && !category) return

      setLoading(true)
      try {
        const url = new URL('/api/search', window.location.origin)
        if (query) url.searchParams.append('q', query)
        if (category) url.searchParams.append('category', category)

        const response = await fetch(url.toString())
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Error searching:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, category])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() && !category) return

    setLoading(true)
    try {
      const url = new URL('/api/search', window.location.origin)
      if (query) url.searchParams.append('q', query)
      if (category) url.searchParams.append('category', category)

      const response = await fetch(url.toString())
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error searching:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="/categories"
              className="flex items-center text-gray-600 hover:text-green-600 transition-colors mr-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Categories
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {category ? `Searching in ${category}` : 'Search Recommendations'}
            </h1>
          </div>
          
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recommendations..."
                className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
          </form>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-white shadow overflow-hidden sm:rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {result.title}
                        </h3>
                        <p className="mt-1 text-sm text-green-600">
                          {result.category.name}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        by {result.user.name}
                      </span>
                    </div>
                    {result.description && (
                      <p className="mt-2 text-sm text-gray-500">
                        {result.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                      {result.website && (
                        <a
                          href={result.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-green-600"
                        >
                          <FaLink className="mr-1" />
                          Website
                        </a>
                      )}
                      {result.location && (
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {result.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (query || category) ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No results found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or browse different categories
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
} 