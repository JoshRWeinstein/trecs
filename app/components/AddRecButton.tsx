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
        <div className="py-6 flex justify-center">
          <Link
            href="/add-rec"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-200 hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Recommendation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddRecButton 