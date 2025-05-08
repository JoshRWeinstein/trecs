'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Recommendation {
  title: string
  category: {
    name: string
  }
  url?: string
}

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendation = async () => {
      const slug = searchParams.get('slug')
      if (!slug) {
        router.push('/my-recs')
        return
      }

      try {
        const response = await fetch(`/api/recommendations/${slug}`)
        if (!response.ok) {
          throw new Error('Failed to fetch recommendation')
        }
        const data = await response.json()
        setRecommendation(data)
      } catch (error) {
        console.error('Error fetching recommendation:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendation()
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <Link
            href="/my-recs"
            className="text-green-600 hover:text-green-500"
          >
            Go to My Recommendations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Recommendation Added!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your recommendation has been successfully added to TRecs.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
              <p className="text-sm text-gray-500">Category: {recommendation.category.name}</p>
              {recommendation.url && (
                <a
                  href={recommendation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:text-green-500 block mt-1"
                >
                  {recommendation.url}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/add-rec"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-200 hover:scale-102 hover:shadow-lg active:scale-98"
          >
            Add Another Recommendation
          </Link>
          <Link
            href="/my-recs"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            View My Recommendations
          </Link>
        </div>
      </div>
    </div>
  )
} 