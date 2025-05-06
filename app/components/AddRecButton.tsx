'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const AddRecButton: React.FC = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <Link
            href="/add-rec"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add New Recommendation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddRecButton 