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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full blur-xl opacity-20"></div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg overflow-hidden">
                <Image
                  src="/images/trex.jpg"
                  alt="T-Rex Logo"
                  width={96}
                  height={96}
                  className="object-cover scale-125"
                />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              TRecs: Save Your Favorites
            </h1>
            <p className="text-base text-gray-600 mb-4 max-w-2xl">
              Discover, save, and share the best recommendations before they go the way of the dinosaur.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-2 text-base font-semibold text-white shadow-sm hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
              >
                Share Your Recs
              </Link>
              <Link
                href="/search"
                className="text-sm font-semibold text-gray-900 hover:text-green-600 transition-colors"
              >
                Explore Discoveries <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Feed of Recommendations */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {mockRecommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Link href={`/profile/${rec.user.name.toLowerCase().replace(/\s+/g, '')}`}>
                    <Image
                      src={rec.user.avatar}
                      alt={rec.user.name}
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Link 
                        href={`/profile/${rec.user.name.toLowerCase().replace(/\s+/g, '')}`}
                        className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors"
                      >
                        {rec.user.name}
                      </Link>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{rec.category}</span>
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

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center text-white mb-4">
              <FaSearch className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Smart Search</h3>
            <p className="mt-2 text-gray-600">Find exactly what you're looking for with our powerful search engine.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center text-white mb-4">
              <FaUsers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Community Driven</h3>
            <p className="mt-2 text-gray-600">Get recommendations from real people who've tried and tested their favorites.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center text-white mb-4">
              <FaCheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Verified Reviews</h3>
            <p className="mt-2 text-gray-600">Trust authentic reviews from verified community members.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-lg text-white/90">
              Join our community and earn crowns for your recommendations! Start with 1 crown and earn more by:
            </p>
            <ul className="mt-4 text-lg text-white/90 space-y-2">
              <li>• Getting 1 crown for each recommendation you share</li>
              <li>• Earning an extra crown when someone follows you</li>
              <li>• Receiving a bonus crown when your recs reach 10 likes</li>
            </ul>
            <div className="mt-8">
              <Link
                href="/register"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-green-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 transition-all"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 