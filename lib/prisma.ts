import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required Supabase environment variables')
  throw new Error('Missing required Supabase environment variables')
}

// Construct the database URL for Supabase
const databaseUrl = `postgresql://postgres.${supabaseUrl.split('//')[1].split('.')[0]}:${supabaseKey}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`

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