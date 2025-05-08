import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const recommendation = await prisma.recommendation.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        category: true,
        user: {
          select: {
            name: true,
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