import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/clients/[id] - Get a single client form
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const client = await db.clientForm.findUnique({
      where: { id },
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client form not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: client })
  } catch (error) {
    console.error('Error fetching client form:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client form' },
      { status: 500 }
    )
  }
}

// PUT /api/clients/[id] - Update a client form
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { fullName, email, phone, companyName, serviceType, budget, message, status, assignedTo, notes } = body

    const existing = await db.clientForm.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Client form not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (fullName !== undefined) updateData.fullName = fullName
    if (email !== undefined) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (companyName !== undefined) updateData.companyName = companyName || null
    if (serviceType !== undefined) updateData.serviceType = serviceType
    if (budget !== undefined) updateData.budget = budget || null
    if (message !== undefined) updateData.message = message || null
    if (status !== undefined) updateData.status = status
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo || null
    if (notes !== undefined) updateData.notes = notes || null

    const client = await db.clientForm.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ data: client })
  } catch (error) {
    console.error('Error updating client form:', error)
    return NextResponse.json(
      { error: 'Failed to update client form' },
      { status: 500 }
    )
  }
}

// DELETE /api/clients/[id] - Delete a client form
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.clientForm.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Client form not found' },
        { status: 404 }
      )
    }

    await db.clientForm.delete({ where: { id } })

    return NextResponse.json({ message: 'Client form deleted successfully' })
  } catch (error) {
    console.error('Error deleting client form:', error)
    return NextResponse.json(
      { error: 'Failed to delete client form' },
      { status: 500 }
    )
  }
}
