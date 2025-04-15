'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FaMapMarkerAlt, FaLink, FaHistory } from 'react-icons/fa'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

interface Recommendation {
  id: string
  title: string
  description: string | null
  website: string | null
  latitude: number | null
  longitude: number | null
  category: {
    name: string
  }
  user: {
    name: string
  }
  history: {
    id: string
    title: string
    description: string | null
    website: string | null
    latitude: number | null
    longitude: number | null
    createdAt: string
  }[]
}

export default function RecommendationPage() {
  const params = useParams()
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await fetch(`/api/recommendations/${params.slug}`)
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
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!recommendation) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900">Recommendation not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {recommendation.title}
                </h1>
                <p className="mt-1 text-sm text-green-600">
                  {recommendation.category.name}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                by {recommendation.user.name}
              </span>
            </div>
            {recommendation.description && (
              <p className="mt-4 text-gray-500">{recommendation.description}</p>
            )}
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              {recommendation.website && (
                <a
                  href={recommendation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-green-600"
                >
                  <FaLink className="mr-1" />
                  Website
                </a>
              )}
              {recommendation.latitude && recommendation.longitude && (
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  Location
                </span>
              )}
            </div>
          </div>

          {recommendation.latitude && recommendation.longitude && (
            <div className="border-t border-gray-200">
              <div className="h-96">
                <Map
                  center={[recommendation.latitude, recommendation.longitude]}
                  zoom={13}
                  markerPosition={[recommendation.latitude, recommendation.longitude]}
                />
              </div>
            </div>
          )}

          {recommendation.history.length > 0 && (
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FaHistory className="mr-2" />
                  History
                </h2>
                <div className="mt-4 space-y-4">
                  {recommendation.history.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {entry.title}
                          </h3>
                          {entry.description && (
                            <p className="mt-1 text-sm text-gray-500">
                              {entry.description}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {entry.website && (
                        <a
                          href={entry.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-sm text-green-600 hover:text-green-500"
                        >
                          Website
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 