import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/resumes - List resumes with pagination, search, status filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { position: { contains: search } },
      ]
    }

    if (status) {
      where.status = status
    }

    const [resumes, total] = await Promise.all([
      db.resume.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.resume.count({ where }),
    ])

    return NextResponse.json({
      data: resumes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}

// POST /api/resumes - Submit a new resume
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, position, experience, education, skills, resumeFileUrl, coverLetter } = body

    if (!fullName || !email || !phone || !position || !experience || !education || !skills) {
      return NextResponse.json(
        { error: 'fullName, email, phone, position, experience, education, and skills are required' },
        { status: 400 }
      )
    }

    const resume = await db.resume.create({
      data: {
        fullName,
        email,
        phone,
        position,
        experience,
        education,
        skills,
        resumeFileUrl: resumeFileUrl || null,
        coverLetter: coverLetter || null,
      },
    })

    return NextResponse.json({ data: resume }, { status: 201 })
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json(
      { error: 'Failed to submit resume' },
      { status: 500 }
    )
  }
}
