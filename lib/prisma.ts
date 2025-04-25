import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Get the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('Missing required DATABASE_URL environment variable')
  throw new Error('Missing required DATABASE_URL environment variable')
}

console.log('Database URL:', databaseUrl.replace(/\/\/[^:]+:[^@]+@/, '//[REDACTED]@'))

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 