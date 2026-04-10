import { cookies } from 'next/headers'
import { verifyToken, COOKIE_NAME, JWTPayload } from './auth'
import { db } from './db'
import { NextResponse } from 'next/server'

export async function getAuthUser(): Promise<(JWTPayload & { isActive: boolean; passwordChangeRequest: boolean }) | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  // Check user still exists and is active
  const user = await db.user.findUnique({
    where: { id: payload.userId },
    select: { isActive: true, passwordChangeRequest: true },
  })

  if (!user || !user.isActive) return null

  return {
    ...payload,
    isActive: user.isActive,
    passwordChangeRequest: user.passwordChangeRequest,
  }
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export function forbidden(message = 'Forbidden') {
  return NextResponse.json({ error: message }, { status: 403 })
}
