import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../auth/[...nextauth]/route'
import { z } from 'zod'

const recommendationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  website: z.string().url().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  categoryId: z.string().min(1, 'Category is required'),
})

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const recommendations = await prisma.recommendation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(recommendations)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching recommendations' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, description, website, latitude, longitude, categoryId } =
      recommendationSchema.parse(body)

    const recommendation = await prisma.recommendation.create({
      data: {
        title,
        description,
        website,
        latitude,
        longitude,
        categoryId,
        userId: session.user.id,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
      },
    })

    return NextResponse.json(recommendation, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Error creating recommendation' },
      { status: 500 }
    )
  }
} 