import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorized } from '@/lib/auth-helpers'

// PUT /api/profile - Request password change (admin approval required)
export async function PUT(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  try {
    const body = await request.json()
    const { requestedPassword } = body

    if (!requestedPassword) {
      return NextResponse.json({ error: 'New password is required' }, { status: 400 })
    }

    if (requestedPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Store the requested password (will be hashed when admin approves)
    await db.user.update({
      where: { id: user.userId },
      data: {
        passwordChangeRequest: true,
        requestedPassword,
      },
    })

    return NextResponse.json({
      data: { message: 'Password change request submitted. An administrator will review and approve your request.' },
    })
  } catch (error) {
    console.error('Error requesting password change:', error)
    return NextResponse.json({ error: 'Failed to submit password change request' }, { status: 500 })
  }
}
