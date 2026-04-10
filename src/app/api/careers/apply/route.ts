import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/careers/apply - Submit a career application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobId, fullName, email, phone, portfolioUrl, linkedinUrl, experience, education, skills, coverLetter } = body

    // Validate required fields
    if (!jobId || !fullName || !email || !phone || !experience || !education || !skills) {
      return NextResponse.json(
        { error: 'All required fields must be filled (job, name, email, phone, experience, education, skills)' },
        { status: 400 }
      )
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    // Check job exists and is active
    const job = await db.jobListing.findUnique({ where: { id: jobId } })
    if (!job) {
      return NextResponse.json({ error: 'Job listing not found' }, { status: 404 })
    }
    if (!job.isActive) {
      return NextResponse.json({ error: 'This position is no longer accepting applications' }, { status: 400 })
    }

    // Create the application
    const application = await db.careerApplication.create({
      data: {
        jobId,
        fullName,
        email,
        phone,
        portfolioUrl: portfolioUrl || null,
        linkedinUrl: linkedinUrl || null,
        experience,
        education,
        skills,
        coverLetter: coverLetter || null,
        status: 'NEW',
      },
      include: { job: { select: { title: true, department: true } } },
    })

    return NextResponse.json(
      {
        data: {
          id: application.id,
          jobTitle: application.job.title,
          status: application.status,
          message: 'Application submitted successfully! We will review your application and get back to you.',
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
