import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/contact - Submit a contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, serviceType, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'name, email, and message are required' },
        { status: 400 }
      )
    }

    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        serviceType: serviceType || null,
        message,
      },
    })

    return NextResponse.json({ data: submission }, { status: 201 })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
