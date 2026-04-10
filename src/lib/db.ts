import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  })

// Prevent multiple Prisma Client instances in development (hot reload)
// In serverless (Vercel), the global cache prevents connection exhaustion
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
