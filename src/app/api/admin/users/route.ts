import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorized } from '@/lib/auth-helpers'
import bcrypt from 'bcryptjs'

// GET /api/admin/users - List all users
export async function GET() {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only admin can manage users' }, { status: 403 })
  }

  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        passwordChangeRequest: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

// POST /api/admin/users - Create a new user
export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only admin can create users' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { username, password, name, email, role } = body

    if (!username || !password || !name || !role) {
      return NextResponse.json({ error: 'Username, password, name, and role are required' }, { status: 400 })
    }

    const validRoles = ['ADMIN', 'BLOG_MANAGER', 'CV_CHECKER', 'CLIENT_CHECKER']
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Check if username already exists
    const existing = await db.user.findUnique({ where: { username } })
    if (existing) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email: email || null,
        role,
        isActive: true,
        passwordChangeRequest: false,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ data: newUser }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
