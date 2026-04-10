import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth-helpers'

export async function GET() {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  return NextResponse.json({ data: user })
}
