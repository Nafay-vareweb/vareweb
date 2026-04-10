import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/admin/stats - Dashboard statistics
export async function GET() {
  try {
    const [
      totalBlogs, publishedBlogs, draftBlogs,
      totalResumes, newResumes,
      totalClients, newClients, inProgressClients, completedClients,
      totalContactSubmissions,
      totalApplications, newApplications,
      totalActiveJobs,
      totalAppointments, newAppointments,
    ] = await Promise.all([
      db.blogPost.count(),
      db.blogPost.count({ where: { status: 'PUBLISHED' } }),
      db.blogPost.count({ where: { status: 'DRAFT' } }),
      db.resume.count(),
      db.resume.count({ where: { status: 'NEW' } }),
      db.clientForm.count(),
      db.clientForm.count({ where: { status: 'NEW' } }),
      db.clientForm.count({ where: { status: 'IN_PROGRESS' } }),
      db.clientForm.count({ where: { status: 'COMPLETED' } }),
      db.contactSubmission.count(),
      db.careerApplication.count(),
      db.careerApplication.count({ where: { status: 'NEW' } }),
      db.jobListing.count({ where: { isActive: true } }),
      db.appointment.count(),
      db.appointment.count({ where: { status: 'PENDING' } }),
    ])

    return NextResponse.json({
      data: {
        blogs: { total: totalBlogs, published: publishedBlogs, draft: draftBlogs },
        resumes: { total: totalResumes, new: newResumes },
        clients: { total: totalClients, new: newClients, inProgress: inProgressClients, completed: completedClients },
        contact: { total: totalContactSubmissions },
        careers: { totalApplications: totalApplications, newApplications, activeJobs: totalActiveJobs },
        appointments: { total: totalAppointments, new: newAppointments },
      },
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Failed to fetch admin statistics' }, { status: 500 })
  }
}
