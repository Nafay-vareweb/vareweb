import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  try {
    const user = await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        name: 'Administrator',
        email: 'admin@vareweb.com',
        role: 'ADMIN',
        isActive: true,
        passwordChangeRequest: false,
      },
    })
    console.log('Admin user created:', user.username)
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()