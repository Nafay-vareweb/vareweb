import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorized } from '@/lib/auth-helpers'
import bcrypt from 'bcryptjs'

// PUT /api/admin/users/[id] - Update user (role, active status, approve password change)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only admin can update users' }, { status: 403 })
  }

  const { id } = await params

  try {
    const body = await request.json()
    const { name, email, role, isActive, approvePasswordChange, newPassword } = body

    const targetUser = await db.user.findUnique({ where: { id } })
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Handle password change approval
    if (approvePasswordChange && targetUser.passwordChangeRequest && targetUser.requestedPassword) {
      const hashedPassword = await bcrypt.hash(targetUser.requestedPassword, 12)
      const updated = await db.user.update({
        where: { id },
        data: {
          password: hashedPassword,
          passwordChangeRequest: false,
          requestedPassword: null,
        },
        select: { id: true, username: true, name: true, role: true, isActive: true },
      })
      return NextResponse.json({ data: updated, message: 'Password change approved successfully' })
    }

    // Handle direct password reset by admin
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      const updated = await db.user.update({
        where: { id },
        data: { password: hashedPassword, passwordChangeRequest: false, requestedPassword: null },
        select: { id: true, username: true, name: true, role: true, isActive: true },
      })
      return NextResponse.json({ data: updated, message: 'Password reset successfully' })
    }

    // Handle normal update
    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email
    if (role !== undefined) updateData.role = role
    if (isActive !== undefined) updateData.isActive = isActive

    const updated = await db.user.update({
      where: { id },
      data: updateData,
      select: { id: true, username: true, name: true, email: true, role: true, isActive: true, passwordChangeRequest: true },
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only admin can delete users' }, { status: 403 })
  }

  const { id } = await params

  try {
    // Prevent self-deletion
    if (id === user.userId) {
      return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 })
    }

    await db.user.delete({ where: { id } })
    return NextResponse.json({ data: { message: 'User deleted successfully' } })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
