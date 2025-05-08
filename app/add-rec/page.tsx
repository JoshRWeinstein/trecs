'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AddRecPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)

    try {
      if (!category.trim() || !name.trim()) {
        setError('Please fill in both fields')
        setIsProcessing(false)
        return
      }

      if (!session) {
        setShowSignUpPrompt(true)
        setIsProcessing(false)
        return
      }

      // Create the recommendation
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: name.trim(),
          categoryId: category.trim().toLowerCase(), // This will be used to find or create the category
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create recommendation')
      }

      // Redirect to the new recommendation
      const data = await response.json()
      router.push(`/${data.slug}`)
    } catch (err) {
      setError('Failed to create recommendation. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Add a Recommendation</h1>
        <p className="text-lg text-gray-600 mb-8">
          Share your favorite places, products, or services.
        </p>

        {showSignUpPrompt ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Save Your Recommendation</h2>
            <p className="text-gray-600 mb-6">
              Create an account to save your recommendation and join our community of trusted reviewers.
            </p>
            <div className="space-y-4">
              <Link
                href="/register"
                className="inline-block w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Create Account
              </Link>
              <Link
                href="/login"
                className="inline-block w-full px-6 py-3 text-lg font-medium text-gray-700 hover:text-green-600"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                What is it?
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. restaurant, coffee shop, hiking trail"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                What's it called?
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Plant Blossom, Blue Bottle, Mount Tam"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                  disabled={isProcessing}
                />
                {isProcessing && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                )}
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing || !category.trim() || !name.trim()}
              className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isProcessing ? 'Adding...' : 'Share It'}
            </button>
          </form>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Try these examples</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">What is it?</p>
              <p className="text-gray-600">coffee shop</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">What's it called?</p>
              <p className="text-gray-600">Blue Bottle</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">What is it?</p>
              <p className="text-gray-600">hiking trail</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">What's it called?</p>
              <p className="text-gray-600">Mount Tam</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 