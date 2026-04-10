import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorized } from '@/lib/auth-helpers'

// GET /api/admin/careers - List all job listings (admin)
export async function GET() {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (!['ADMIN', 'CV_CHECKER'].includes(user.role)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  try {
    const jobs = await db.jobListing.findMany({
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: jobs })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

// POST /api/admin/careers - Create a new job listing
export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return unauthorized()
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only admin can create job listings' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { title, department, location, type, salary, description, requirements } = body

    if (!title || !department || !description || !requirements) {
      return NextResponse.json({ error: 'Title, department, description, and requirements are required' }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now().toString(36)

    const job = await db.jobListing.create({
      data: {
        title,
        slug,
        department,
        location: location || 'Remote',
        type: type || 'Full-Time',
        salary: salary || null,
        description,
        requirements,
        isActive: true,
      },
    })

    return NextResponse.json({ data: job }, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: 'Failed to create job listing' }, { status: 500 })
  }
}
