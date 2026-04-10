import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blogs/[id] - Get a single blog post
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const blog = await db.blogPost.findUnique({
      where: { id },
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: blog })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT /api/blogs/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, slug, excerpt, content, featuredImage, category, tags, status, authorName } = body

    const existing = await db.blogPost.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Check slug uniqueness if changed
    if (slug && slug !== existing.slug) {
      const slugExists = await db.blogPost.findUnique({ where: { slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: 'A blog post with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (slug !== undefined) updateData.slug = slug
    if (excerpt !== undefined) updateData.excerpt = excerpt || null
    if (content !== undefined) updateData.content = content
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage || null
    if (category !== undefined) updateData.category = category
    if (tags !== undefined) updateData.tags = tags
    if (authorName !== undefined) updateData.authorName = authorName

    // Handle status and publishedAt together
    if (status !== undefined) {
      updateData.status = status
      if (status === 'PUBLISHED' && !existing.publishedAt) {
        updateData.publishedAt = new Date()
      } else if (status === 'DRAFT') {
        updateData.publishedAt = null
      }
    }

    const blog = await db.blogPost.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ data: blog })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/blogs/[id] - Delete a blog post
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.blogPost.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    await db.blogPost.delete({ where: { id } })

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
