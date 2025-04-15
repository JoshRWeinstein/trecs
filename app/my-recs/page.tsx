import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaHistory } from 'react-icons/fa'
import { prisma } from '@/lib/prisma'

type Recommendation = {
  id: string
  title: string
  description: string | null
  website: string | null
  latitude: number | null
  longitude: number | null
  categoryId: string
  userId: string
  createdAt: Date
  updatedAt: Date
  category: {
    name: string
  }
}

export default async function MyRecsPage() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!user) {
    redirect('/login')
  }

  const recommendations = await prisma.recommendation.findMany({
    where: {
      userId: user.id
    },
    include: {
      category: true
    }
  }) as Recommendation[]

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Recommendations</h1>
          <Link
            href="/my-recs/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <FaPlus className="mr-2" />
            Add Recommendation
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {recommendations.map((rec) => (
              <li key={rec.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-600 truncate">
                        {rec.category.name}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {rec.title}
                      </p>
                      {rec.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {rec.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-2">
                      <Link
                        href={`/my-recs/${rec.id}/history`}
                        className="text-gray-400 hover:text-gray-500"
                        title="View History"
                      >
                        <FaHistory />
                      </Link>
                      <Link
                        href={`/my-recs/${rec.id}/edit`}
                        className="text-gray-400 hover:text-gray-500"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        href={`/my-recs/${rec.id}/delete`}
                        className="text-gray-400 hover:text-red-500"
                        title="Delete"
                      >
                        <FaTrash />
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Added on {new Date(rec.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 