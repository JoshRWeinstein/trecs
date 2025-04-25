import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(req: Request) {
  try {
    console.log('Registration attempt started')
    const body = await req.json()
    console.log('Request body:', { ...body, password: '[REDACTED]' })

    const { name, email, password } = userSchema.parse(body)

    console.log('Checking for existing user:', email)
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('User already exists:', email)
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    console.log('Hashing password')
    const hashedPassword = await hash(password, 12)

    console.log('Creating user:', { name, email })
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    console.log('User created successfully:', user.id)
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
} 