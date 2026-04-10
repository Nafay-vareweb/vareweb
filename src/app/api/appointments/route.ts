import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/appointments - Fetch all appointments (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const status = searchParams.get('status')

    const where: Record<string, string> = {}
    if (status) where.status = status

    const appointments = await db.appointment.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ data: appointments })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

// POST /api/appointments - Create new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, serviceType, preferredDate, preferredTime, message } = body

    if (!fullName || !email || !phone || !serviceType || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, phone, serviceType, preferredDate, preferredTime' },
        { status: 400 }
      )
    }

    const appointment = await db.appointment.create({
      data: {
        fullName,
        email,
        phone,
        serviceType,
        preferredDate,
        preferredTime,
        message: message || null,
      },
    })

    return NextResponse.json({ data: appointment }, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
