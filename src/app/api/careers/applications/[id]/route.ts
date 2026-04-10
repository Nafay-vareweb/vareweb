import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorized } from '@/lib/auth-helpers'

// GET /api/careers/applications/[id] - Get single application
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (!['ADMIN', 'CV_CHECKER'].includes(user.role)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  const { id } = await params

  try {
    const application = await db.careerApplication.findUnique({
      where: { id },
      include: { job: true },
    })
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }
    return NextResponse.json({ data: application })
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 })
  }
}

// PUT /api/careers/applications/[id] - Update application (status, notes)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (!['ADMIN', 'CV_CHECKER'].includes(user.role)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  const { id } = await params

  try {
    const body = await request.json()
    const { status, notes } = body

    const application = await db.careerApplication.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(status && status !== 'NEW' && { reviewedBy: user.name }),
      },
      include: { job: { select: { title: true } } },
    })

    return NextResponse.json({ data: application })
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}

// DELETE /api/careers/applications/[id] - Delete application
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only admin can delete applications' }, { status: 403 })
  }

  const { id } = await params

  try {
    await db.careerApplication.delete({ where: { id } })
    return NextResponse.json({ data: { message: 'Application deleted successfully' } })
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 })
  }
}
