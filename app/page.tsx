import Link from 'next/link'
import Image from 'next/image'
import { FaSearch, FaUsers, FaCheckCircle, FaMapMarkerAlt, FaStar, FaHeart, FaComment, FaShare, FaFilter, FaShoppingBag } from 'react-icons/fa'
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
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to <span className="text-green-600">TRecs</span>
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Discover and share your favorite recommendations with the world. From hidden gems to popular spots, find the best places to visit.
            </p>
            <div className="flex gap-4">
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
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/images/trex.jpg"
              alt="TRecs Mascot"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <FaSearch className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-gray-600">Find amazing places recommended by real people.</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <FaUsers className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Share</h3>
            <p className="text-gray-600">Share your favorite spots with the community.</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <FaCheckCircle className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trust</h3>
            <p className="text-gray-600">Get authentic recommendations from real experiences.</p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/categories?type=restaurants" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <FaStar className="text-2xl text-green-600 mx-auto mb-2" />
              <span>Restaurants</span>
            </Link>
            <Link href="/categories?type=hotels" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <FaMapMarkerAlt className="text-2xl text-green-600 mx-auto mb-2" />
              <span>Hotels</span>
            </Link>
            <Link href="/categories?type=attractions" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <GiDinosaurBones className="text-2xl text-green-600 mx-auto mb-2" />
              <span>Attractions</span>
            </Link>
            <Link href="/categories?type=shopping" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <FaShoppingBag className="text-2xl text-green-600 mx-auto mb-2" />
              <span>Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 