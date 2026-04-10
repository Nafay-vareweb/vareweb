import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT /api/blogs/[id]/status - Update blog post status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    const validStatuses = ['DRAFT', 'PUBLISHED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
    }

    const existing = await db.blogPost.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const publishedAt = status === 'PUBLISHED' && !existing.publishedAt
      ? new Date()
      : status === 'DRAFT'
        ? null
        : existing.publishedAt

    const blog = await db.blogPost.update({
      where: { id },
      data: {
        status,
        publishedAt,
      },
    })

    return NextResponse.json({ data: blog })
  } catch (error) {
    console.error('Error updating blog post status:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post status' },
      { status: 500 }
    )
  }
}
