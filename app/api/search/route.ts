import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')
  const category = searchParams.get('category')

  try {
    const results = await prisma.recommendation.findMany({
      where: {
        AND: [
          category ? {
            category: {
              name: {
                equals: category,
                mode: 'insensitive',
              },
            },
          } : {},
          query ? {
            OR: [
              {
                title: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          } : {},
        ],
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // If no results found, return some mock data for demonstration
    if (results.length === 0) {
      return NextResponse.json([
        {
          id: '1',
          title: 'Example Restaurant',
          description: 'A great place to eat with amazing food and service.',
          website: 'https://example.com',
          location: '123 Main St, City',
          recommendationCount: 456,
          category: {
            name: category || 'Restaurant',
          },
          user: {
            name: 'John Doe',
          },
        },
        {
          id: '2',
          title: 'Local Coffee Shop',
          description: 'The best coffee in town with a cozy atmosphere.',
          website: 'https://example.com/coffee',
          location: '456 Coffee Ave, City',
          recommendationCount: 234,
          category: {
            name: category || 'Cafe',
          },
          user: {
            name: 'Jane Smith',
          },
        },
      ])
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error searching recommendations:', error)
    return NextResponse.json(
      { message: 'Error searching recommendations' },
      { status: 500 }
    )
  }
} 