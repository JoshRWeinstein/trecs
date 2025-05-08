'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AddRecPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)

    try {
      // Parse the natural language input
      const match = input.match(/my favorite (.*?) is (.*)/i)
      if (!match) {
        setError('Please use the format "My favorite [type] is [name]"')
        setIsProcessing(false)
        return
      }

      const [, category, title] = match

      // Create the recommendation
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
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

  if (!session) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Sign in to Add Recommendations</h1>
          <p className="text-lg text-gray-600 mb-8">
            Please sign in to share your recommendations with the community.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Add a Recommendation</h1>
        <p className="text-lg text-gray-600 mb-8">
          Share your favorite places, products, or services using natural language.
          For example: "My favorite restaurant is Joe's Pizza"
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700 mb-2">
              What's your favorite?
            </label>
            <div className="relative">
              <input
                type="text"
                id="recommendation"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="My favorite restaurant is Joe's Pizza"
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
            disabled={isProcessing || !input.trim()}
            className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isProcessing ? 'Adding...' : 'Share It'}
          </button>
        </form>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Try these examples</h2>
          <ul className="space-y-3 text-gray-600">
            <li>• My favorite coffee shop is Blue Bottle</li>
            <li>• My favorite hiking trail is Mount Tam</li>
            <li>• My favorite book is The Great Gatsby</li>
            <li>• My favorite movie is The Godfather</li>
          </ul>
        </div>
      </div>
    </main>
  )
} 