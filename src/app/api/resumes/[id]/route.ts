import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/resumes/[id] - Get a single resume
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const resume = await db.resume.findUnique({
      where: { id },
    })

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: resume })
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

// PUT /api/resumes/[id] - Update a resume
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { fullName, email, phone, position, experience, education, skills, resumeFileUrl, coverLetter, status, notes } = body

    const existing = await db.resume.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (fullName !== undefined) updateData.fullName = fullName
    if (email !== undefined) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (position !== undefined) updateData.position = position
    if (experience !== undefined) updateData.experience = experience
    if (education !== undefined) updateData.education = education
    if (skills !== undefined) updateData.skills = skills
    if (resumeFileUrl !== undefined) updateData.resumeFileUrl = resumeFileUrl || null
    if (coverLetter !== undefined) updateData.coverLetter = coverLetter || null
    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes || null

    const resume = await db.resume.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ data: resume })
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

// DELETE /api/resumes/[id] - Delete a resume
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.resume.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    await db.resume.delete({ where: { id } })

    return NextResponse.json({ message: 'Resume deleted successfully' })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}
