import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/clients - List client forms with pagination, search, status filter
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
        { companyName: { contains: search } },
      ]
    }

    if (status) {
      where.status = status
    }

    const [clients, total] = await Promise.all([
      db.clientForm.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.clientForm.count({ where }),
    ])

    return NextResponse.json({
      data: clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

// POST /api/clients - Submit a new client form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, companyName, serviceType, budget, message } = body

    if (!fullName || !email || !phone || !serviceType) {
      return NextResponse.json(
        { error: 'fullName, email, phone, and serviceType are required' },
        { status: 400 }
      )
    }

    const client = await db.clientForm.create({
      data: {
        fullName,
        email,
        phone,
        companyName: companyName || null,
        serviceType,
        budget: budget || null,
        message: message || null,
      },
    })

    return NextResponse.json({ data: client }, { status: 201 })
  } catch (error) {
    console.error('Error creating client form:', error)
    return NextResponse.json(
      { error: 'Failed to submit client form' },
      { status: 500 }
    )
  }
}
