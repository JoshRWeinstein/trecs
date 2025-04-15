import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recommendation = await prisma.recommendation.findUnique({
      where: {
        id: params.id,
      },
      include: {
        category: true,
        user: {
          select: {
            name: true,
          },
        },
        history: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!recommendation) {
      return NextResponse.json(
        { message: 'Recommendation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(recommendation)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching recommendation' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, description, website, latitude, longitude, categoryId } = body

    // First, get the current recommendation to create history
    const currentRecommendation = await prisma.recommendation.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!currentRecommendation) {
      return NextResponse.json(
        { message: 'Recommendation not found' },
        { status: 404 }
      )
    }

    // Create history entry
    await prisma.recommendationHistory.create({
      data: {
        recommendationId: params.id,
        title: currentRecommendation.title,
        description: currentRecommendation.description,
        website: currentRecommendation.website,
        latitude: currentRecommendation.latitude,
        longitude: currentRecommendation.longitude,
      },
    })

    // Update the recommendation
    const updatedRecommendation = await prisma.recommendation.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        title,
        description,
        website,
        latitude,
        longitude,
        categoryId,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
      },
    })

    return NextResponse.json(updatedRecommendation)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating recommendation' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.recommendation.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    return NextResponse.json(
      { message: 'Recommendation deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting recommendation' },
      { status: 500 }
    )
  }
} 