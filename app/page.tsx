import Link from 'next/link'
import Image from 'next/image'
import { FaSearch, FaUsers, FaCheckCircle, FaMapMarkerAlt, FaStar, FaHeart, FaComment, FaShare, FaFilter, FaShoppingBag, FaCrown } from 'react-icons/fa'
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
      avatar: 'https://i.pravatar.cc/150?img=1',
      crowns: 1250,
      level: 'Expert'
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
      avatar: 'https://i.pravatar.cc/150?img=2',
      crowns: 850,
      level: 'Pro'
    },
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
]

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl -z-10" />
          <div className="relative p-8">
            <h1 className="text-5xl font-bold mb-6 text-center">
              Welcome to <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">TRecs</span>
            </h1>
            <p className="text-xl mb-4 text-gray-600 text-center max-w-2xl mx-auto">
              Save, discover, and share before they go the way of the dinosaur.
            </p>
            <p className="text-lg mb-8 text-gray-500 text-center max-w-2xl mx-auto">
              From hidden gems to popular spots, find and preserve the best places to visit.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/register" 
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                href="/search" 
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Browse Recommendations
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Recommendations Feed */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Recent Recommendations</h2>
          <div className="space-y-6">
            {mockRecommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={rec.user.avatar}
                      alt={rec.user.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link href={`/profile/${rec.user.name.toLowerCase().replace(' ', '')}`} className="font-semibold hover:text-green-600">
                          {rec.user.name}
                        </Link>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaCrown className="text-yellow-500 mr-1" />
                          <span>{rec.user.crowns} crowns</span>
                          <span className="mx-2">•</span>
                          <span className="text-green-600 font-medium">{rec.user.level}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2h ago</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {rec.title}
                        <span className="text-sm text-gray-500 ml-2">({rec.recommendationCount} recommendations)</span>
                      </h3>
                      <p className="text-gray-600 mb-4">{rec.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{rec.location}</span>
                        <span className="mx-2">•</span>
                        <span>{rec.category}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-green-600">
                          <FaHeart className="mr-1" />
                          <span>{rec.recommendationCount}</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-green-600">
                          <FaComment className="mr-1" />
                          <span>Comment</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-green-600">
                          <FaShare className="mr-1" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/search?category=restaurants" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <FaStar className="text-2xl text-green-600 mx-auto mb-2" />
              <span>Restaurants</span>
            </Link>
            <Link href="/search?category=hotels" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <FaMapMarkerAlt className="text-2xl text-green-600 mx-auto mb-2" />
              <span>Hotels</span>
            </Link>
            <Link href="/search?category=attractions" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <GiDinosaurBones className="text-2xl text-green-600 mx-auto mb-2" />
              <span>Attractions</span>
            </Link>
            <Link href="/search?category=shopping" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <FaShoppingBag className="text-2xl text-green-600 mx-auto mb-2" />
              <span>Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 