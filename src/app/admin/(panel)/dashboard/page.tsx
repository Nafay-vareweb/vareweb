'use client'

import React, { useEffect, useState, useRef } from 'react'
import { FileText, Users, ClipboardList, Mail, TrendingUp, Eye, Clock, CheckCircle, Briefcase, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

interface DashboardStats {
  blogs: { total: number; published: number; draft: number }
  resumes: { total: number; new: number }
  clients: { total: number; new: number; inProgress: number; completed: number }
  contact: { total: number }
  careers: { totalApplications: number; newApplications: number; activeJobs: number }
  appointments: { total: number; new: number }
}

interface RecentItem {
  id: string
  type: 'blog' | 'resume' | 'client' | 'contact' | 'appointment'
  label: string
  date: string
}

const statCards = [
  {
    key: 'blogs' as const,
    title: 'Blog Posts',
    icon: FileText,
    color: 'text-vare-purple',
    bgColor: 'bg-vare-purple/10',
    borderColor: 'border-vare-purple/20',
    href: '/admin/blogs',
    getSub: (d: DashboardStats) => `${d.blogs.published} published · ${d.blogs.draft} drafts`,
    getValue: (d: DashboardStats) => d.blogs.total,
  },
  {
    key: 'resumes' as const,
    title: 'Resumes/CVs',
    icon: Users,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-600/10',
    borderColor: 'border-emerald-600/20',
    href: '/admin/resumes',
    getSub: (d: DashboardStats) => `${d.resumes.new} new resumes`,
    getValue: (d: DashboardStats) => d.resumes.total,
  },
  {
    key: 'clients' as const,
    title: 'Client Forms',
    icon: ClipboardList,
    color: 'text-amber-600',
    bgColor: 'bg-amber-600/10',
    borderColor: 'border-amber-600/20',
    href: '/admin/clients',
    getSub: (d: DashboardStats) => `${d.clients.new} new · ${d.clients.inProgress} in progress`,
    getValue: (d: DashboardStats) => d.clients.total,
  },
  {
    key: 'contact' as const,
    title: 'Contact Submissions',
    icon: Mail,
    color: 'text-rose-600',
    bgColor: 'bg-rose-600/10',
    borderColor: 'border-rose-600/20',
    href: '/admin/contact',
    getSub: (d: DashboardStats) => 'Total messages received',
    getValue: (d: DashboardStats) => d.contact.total,
  },
  {
    key: 'careers' as const,
    title: 'Career Applications',
    icon: Briefcase,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-600/10',
    borderColor: 'border-indigo-600/20',
    href: '/admin/careers',
    getSub: (d: DashboardStats) => `${d.careers.newApplications} new · ${d.careers.activeJobs} active jobs`,
    getValue: (d: DashboardStats) => d.careers.totalApplications,
  },
  {
    key: 'appointments' as const,
    title: 'Appointments',
    icon: Calendar,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-600/10',
    borderColor: 'border-cyan-600/20',
    href: '/admin/appointments',
    getSub: (d: DashboardStats) => `${d.appointments.new} pending`,
    getValue: (d: DashboardStats) => d.appointments.total,
  },
]

function AnimatedCard({ stat, stats, index }: { stat: typeof statCards[0]; stats: DashboardStats; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    import('gsap').then((gsap) => {
      gsap.default.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.1, ease: 'power3.out' }
      )
    })
  }, [index])

  const Icon = stat.icon

  return (
    <Link href={stat.href}>
      <Card ref={cardRef} className={`border ${stat.borderColor} bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group opacity-0`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-vare-gray">{stat.title}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.getValue(stats)}</p>
              <p className="text-xs text-vare-gray">{stat.getSub(stats)}</p>
            </div>
            <div className={`rounded-xl p-3 ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const activityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats')
        if (res.ok) {
          const json = await res.json()
          setStats(json.data)
        }
      } catch {
        console.error('Failed to fetch stats')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  useEffect(() => {
    async function fetchRecent() {
      try {
        const [blogsRes, resumesRes, clientsRes, contactRes, appointmentsRes] = await Promise.all([
          fetch('/api/blogs?limit=3'),
          fetch('/api/resumes?limit=3'),
          fetch('/api/clients?limit=3'),
          fetch('/api/contact/submissions?limit=3'),
          fetch('/api/appointments?limit=3'),
        ])

        const items: RecentItem[] = []

        if (blogsRes.ok) {
          const json = await blogsRes.json()
          json.data?.forEach((b: { id: string; title: string; createdAt: string }) =>
            items.push({ id: b.id, type: 'blog', label: b.title, date: b.createdAt })
          )
        }
        if (resumesRes.ok) {
          const json = await resumesRes.json()
          json.data?.forEach((r: { id: string; fullName: string; createdAt: string }) =>
            items.push({ id: r.id, type: 'resume', label: r.fullName, date: r.createdAt })
          )
        }
        if (clientsRes.ok) {
          const json = await clientsRes.json()
          json.data?.forEach((c: { id: string; fullName: string; createdAt: string }) =>
            items.push({ id: c.id, type: 'client', label: c.fullName, date: c.createdAt })
          )
        }
        if (contactRes.ok) {
          const json = await contactRes.json()
          json.data?.forEach((c: { id: string; name: string; createdAt: string }) =>
            items.push({ id: c.id, type: 'contact', label: c.name, date: c.createdAt })
          )
        }
        if (appointmentsRes.ok) {
          const json = await appointmentsRes.json()
          json.data?.forEach((a: { id: string; fullName: string; serviceType: string; createdAt: string }) =>
            items.push({ id: a.id, type: 'appointment', label: `${a.fullName} — ${a.serviceType}`, date: a.createdAt })
          )
        }

        items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setRecentItems(items.slice(0, 10))
      } catch {
        console.error('Failed to fetch recent activity')
      }
    }
    fetchRecent()
  }, [])

  useEffect(() => {
    const el = activityRef.current
    if (!el) return
    import('gsap').then((gsap) => {
      gsap.default.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: 'power2.out' }
      )
    })
  }, [])

  const getTypeIcon = (type: RecentItem['type']) => {
    switch (type) {
      case 'blog': return <FileText className="h-4 w-4 text-vare-purple" />
      case 'resume': return <Users className="h-4 w-4 text-emerald-600" />
      case 'client': return <ClipboardList className="h-4 w-4 text-amber-600" />
      case 'contact': return <Mail className="h-4 w-4 text-rose-600" />
      case 'appointment': return <Calendar className="h-4 w-4 text-cyan-600" />
    }
  }

  const getTypeBadge = (type: RecentItem['type']) => {
    const styles: Record<string, string> = {
      blog: 'bg-vare-purple/10 text-vare-purple',
      resume: 'bg-emerald-600/10 text-emerald-600',
      client: 'bg-amber-600/10 text-amber-600',
      contact: 'bg-rose-600/10 text-rose-600',
      appointment: 'bg-cyan-600/10 text-cyan-600',
    }
    return styles[type]
  }

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-vare-slate">Dashboard</h1>
          <p className="text-vare-gray mt-1">Overview of your website content</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-vare-border">
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-9 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-vare-slate">Dashboard</h1>
          <p className="text-vare-gray mt-1">Overview of your website content</p>
        </div>
        <Card className="border-vare-border">
          <CardContent className="p-6 text-center text-vare-gray">
            Failed to load dashboard statistics. Please try again.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-vare-slate">Dashboard</h1>
        <p className="text-vare-gray mt-1">Overview of your website content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 mb-8">
        {statCards.map((card, i) => (
          <AnimatedCard key={card.key} stat={card} stats={stats} index={i} />
        ))}
      </div>

      {/* Quick Stats Summary */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card className="border-vare-border bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-vare-purple" />
              Content Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-vare-gray">Published Posts</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-vare-ice overflow-hidden">
                  <div
                    className="h-full rounded-full bg-vare-purple transition-all duration-700"
                    style={{ width: `${stats.blogs.total > 0 ? (stats.blogs.published / stats.blogs.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-vare-slate">{stats.blogs.published}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-vare-gray">New Resumes</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-vare-ice overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{ width: `${stats.resumes.total > 0 ? (stats.resumes.new / stats.resumes.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-vare-slate">{stats.resumes.new}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-vare-gray">Active Clients</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-vare-ice overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-700"
                    style={{ width: `${stats.clients.total > 0 ? ((stats.clients.new + stats.clients.inProgress) / stats.clients.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-vare-slate">{stats.clients.new + stats.clients.inProgress}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-vare-gray">Completed Clients</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-vare-ice overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-700"
                    style={{ width: `${stats.clients.total > 0 ? (stats.clients.completed / stats.clients.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-vare-slate">{stats.clients.completed}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-vare-border bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Eye className="h-4 w-4 text-vare-purple" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Link href="/admin/blogs/new">
              <div className="flex items-center gap-2 rounded-lg border border-vare-border p-3 hover:bg-vare-ice hover:border-vare-purple/30 transition-all duration-200 cursor-pointer">
                <FileText className="h-4 w-4 text-vare-purple" />
                <span className="text-sm font-medium text-vare-slate">New Blog Post</span>
              </div>
            </Link>
            <Link href="/admin/blogs">
              <div className="flex items-center gap-2 rounded-lg border border-vare-border p-3 hover:bg-vare-ice hover:border-vare-purple/30 transition-all duration-200 cursor-pointer">
                <Eye className="h-4 w-4 text-vare-purple" />
                <span className="text-sm font-medium text-vare-slate">View Blogs</span>
              </div>
            </Link>
            <Link href="/admin/resumes">
              <div className="flex items-center gap-2 rounded-lg border border-vare-border p-3 hover:bg-vare-ice hover:border-emerald-600/30 transition-all duration-200 cursor-pointer">
                <Users className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-vare-slate">View Resumes</span>
              </div>
            </Link>
            <Link href="/admin/careers">
              <div className="flex items-center gap-2 rounded-lg border border-vare-border p-3 hover:bg-vare-ice hover:border-indigo-600/30 transition-all duration-200 cursor-pointer">
                <Briefcase className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-vare-slate">View Careers</span>
              </div>
            </Link>
            <Link href="/admin/clients">
              <div className="flex items-center gap-2 rounded-lg border border-vare-border p-3 hover:bg-vare-ice hover:border-amber-600/30 transition-all duration-200 cursor-pointer">
                <ClipboardList className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-vare-slate">View Clients</span>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card ref={activityRef} className="border-vare-border bg-white opacity-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-vare-purple" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-vare-gray">
              <CheckCircle className="h-10 w-10 mb-3 opacity-30" />
              <p className="text-sm">No recent activity yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentItems.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex items-center gap-3 rounded-lg border border-vare-border/50 p-3 hover:bg-vare-ice/50 transition-colors">
                  <div className="rounded-lg bg-vare-ice p-2 shrink-0">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-vare-slate truncate">{item.label}</p>
                    <p className="text-xs text-vare-gray">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${getTypeBadge(item.type)}`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
