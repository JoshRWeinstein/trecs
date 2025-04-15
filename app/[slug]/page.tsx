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
  const slug = params.slug as string
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendation = async () => {
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
  }, [slug])

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
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Recommendation: {slug}</h1>
        <p className="text-lg mb-8">
          This is a placeholder for the recommendation details page.
        </p>
      </div>
    </main>
  )
} 