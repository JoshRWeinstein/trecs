'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { FaUser, FaUsers, FaStar, FaMapMarkerAlt, FaHeart, FaComment, FaShare } from 'react-icons/fa'

interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  followers: number
  following: number
  recommendations: {
    id: string
    title: string
    description: string
    category: string
    location: string
    recommendationCount: number
    createdAt: string
  }[]
}

// Mock data for different users
const mockUsers = {
  'sarahm': {
    id: '1',
    name: 'Sarah M.',
    username: 'sarahm',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Food enthusiast and travel lover. Always on the hunt for the best local spots!',
    followers: 1234,
    following: 567,
    recommendations: [
      {
        id: '1',
        title: 'The Hidden Gem Cafe',
        description: 'Amazing coffee and pastries in a cozy atmosphere. The avocado toast is a must-try!',
        category: 'Cafe',
        location: '123 Main St, San Francisco',
        recommendationCount: 1243,
        createdAt: '2024-03-15T10:00:00Z'
      }
    ]
  },
  'miket': {
    id: '2',
    name: 'Mike T.',
    username: 'miket',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Travel enthusiast and hotel connoisseur. Always looking for the perfect getaway spot!',
    followers: 856,
    following: 234,
    recommendations: [
      {
        id: '2',
        title: 'Sunset Beach Resort',
        description: 'Stunning ocean views and excellent service. The infinity pool is perfect for sunset watching.',
        category: 'Hotel',
        location: '456 Ocean Dr, Miami',
        recommendationCount: 987,
        createdAt: '2024-03-10T15:30:00Z'
      },
      {
        id: '3',
        title: 'Mountain View Lodge',
        description: 'Cozy cabins with breathtaking mountain views. Perfect for a peaceful retreat.',
        category: 'Hotel',
        location: '789 Mountain Rd, Aspen',
        recommendationCount: 765,
        createdAt: '2024-03-05T09:15:00Z'
      }
    ]
  }
}

export default function ProfilePage() {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // In a real app, this would fetch from your API
        // For now, we'll use mock data
        const username = params.username as string
        const mockUser = mockUsers[username as keyof typeof mockUsers]
        setUser(mockUser || null)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.username])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900">User not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <Image
                src={user.avatar}
                alt={user.name}
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">@{user.username}</p>
              <p className="mt-2 text-gray-600">{user.bio}</p>
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center text-gray-500">
                  <FaUsers className="h-5 w-5 mr-2" />
                  <span>{user.followers} followers</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <FaUser className="h-5 w-5 mr-2" />
                  <span>{user.following} following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {user.recommendations.length} {user.recommendations.length === 1 ? 'Recommendation' : 'Recommendations'}
          </h2>
          {user.recommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{rec.category}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaUsers className="h-4 w-4 text-green-600 mr-1" />
                      {rec.recommendationCount} recs
                    </div>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">{rec.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{rec.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                    <span>{rec.location}</span>
                  </div>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                    <button className="flex items-center hover:text-green-600">
                      <FaHeart className="h-4 w-4 mr-1" />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center hover:text-green-600">
                      <FaComment className="h-4 w-4 mr-1" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center hover:text-green-600">
                      <FaShare className="h-4 w-4 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 