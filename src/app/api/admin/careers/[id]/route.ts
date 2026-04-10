import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorized } from '@/lib/auth-helpers'

// GET /api/admin/careers/[id] - Get single job
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const { id } = await params
  try {
    const job = await db.jobListing.findUnique({
      where: { id },
      include: { _count: { select: { applications: true } } },
    })
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    return NextResponse.json({ data: job })
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 })
  }
}

// PUT /api/admin/careers/[id] - Update job
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only admin can edit jobs' }, { status: 403 })
  }

  const { id } = await params
  try {
    const body = await request.json()
    const job = await db.jobListing.update({
      where: { id },
      data: body,
    })
    return NextResponse.json({ data: job })
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  }
}

// DELETE /api/admin/careers/[id] - Delete job
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only admin can delete jobs' }, { status: 403 })
  }

  const { id } = await params
  try {
    await db.jobListing.delete({ where: { id } })
    return NextResponse.json({ data: { message: 'Job deleted' } })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
  }
}
