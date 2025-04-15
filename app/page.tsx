import Link from 'next/link'
import Image from 'next/image'
import { FaSearch, FaUsers, FaCheckCircle, FaMapMarkerAlt, FaStar, FaHeart, FaComment, FaShare, FaFilter } from 'react-icons/fa'
import { GiDinosaurBones } from 'react-icons/gi'

// Mock data for recommendations
const mockRecommendations = [
  {
    id: '1',
    title: 'The Hidden Gem Cafe',
    category: 'Cafe',
    description: 'Amazing coffee and pastries in a cozy atmosphere. The avocado toast is a must-try!',
    location: '123 Main St, San Francisco',
    recommendationCount: 1243,
    user: {
      name: 'Sarah M.',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '2',
    title: 'Sunset Beach Resort',
    category: 'Hotel',
    description: 'Stunning ocean views and excellent service. The infinity pool is perfect for sunset watching.',
    location: '456 Ocean Dr, Miami',
    recommendationCount: 987,
    user: {
      name: 'Mike T.',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
]

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to TRecs</h1>
        <p className="text-lg mb-8">
          Discover and share your favorite recommendations with the world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/my-recs" 
            className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">My Recommendations</h2>
            <p>View and manage your personal recommendations</p>
          </Link>
          <Link 
            href="/search" 
            className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Search</h2>
            <p>Find recommendations from others</p>
          </Link>
        </div>
      </div>
    </main>
  )
} 