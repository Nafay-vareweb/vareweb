import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/careers - List active job listings (public)
export async function GET() {
  try {
    const jobs = await db.jobListing.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: jobs })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch job listings' }, { status: 500 })
  }
}
