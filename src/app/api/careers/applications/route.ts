import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorized } from '@/lib/auth-helpers'

// GET /api/careers/applications - List all applications (admin)
export async function GET(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  // Only ADMIN and CV_CHECKER can access
  if (!['ADMIN', 'CV_CHECKER'].includes(user.role)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const jobId = searchParams.get('jobId') || ''

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (jobId) where.jobId = jobId
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { job: { title: { contains: search } } },
      ]
    }

    const [applications, total] = await Promise.all([
      db.careerApplication.findMany({
        where,
        include: { job: { select: { title: true, department: true, location: true, type: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.careerApplication.count({ where }),
    ])

    return NextResponse.json({
      data: applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}
