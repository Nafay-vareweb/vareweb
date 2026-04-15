'use client'

import React, { useEffect, useState, useCallback } from 'react'
import {
  Search, Eye, Trash2, Briefcase, Plus, Users, ToggleLeft, ToggleRight,
  MoreHorizontal, Loader2, X,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

interface Job {
  id: string; title: string; department: string; location: string; type: string
  salary: string | null; description: string; requirements: string; isActive: boolean
  _count?: { applications: number }; createdAt: string
}

interface Application {
  id: string; fullName: string; email: string; phone: string
  portfolioUrl: string | null; linkedinUrl: string | null
  experience: string; education: string; skills: string; coverLetter: string | null
  status: string; notes: string | null; reviewedBy: string | null; createdAt: string
  job: { title: string; department: string; location: string; type: string }
}

const statusConfig: Record<string, { label: string; className: string }> = {
  NEW: { label: 'New', className: 'bg-blue-600/10 text-blue-600' },
  REVIEWING: { label: 'Reviewing', className: 'bg-amber-600/10 text-amber-600' },
  SHORTLISTED: { label: 'Shortlisted', className: 'bg-emerald-600/10 text-emerald-600' },
  INTERVIEW: { label: 'Interview', className: 'bg-purple-600/10 text-purple-600' },
  OFFERED: { label: 'Offered', className: 'bg-green-600/10 text-green-600' },
  REJECTED: { label: 'Rejected', className: 'bg-red-600/10 text-red-600' },
}

const jobFormDefaults = {
  title: '', department: '', location: 'Remote', type: 'Full-Time',
  salary: '', description: '', requirements: '',
}

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [activeTab, setActiveTab] = useState('applications')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Job creation dialog
  const [showJobDialog, setShowJobDialog] = useState(false)
  const [jobForm, setJobForm] = useState(jobFormDefaults)
  const [savingJob, setSavingJob] = useState(false)

  // Application detail
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [detailStatus, setDetailStatus] = useState('')
  const [detailNotes, setDetailNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<{ type: string; id: string } | null>(null)

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/careers')
      if (res.ok) setJobs((await res.json()).data || [])
    } catch { /* ignore */ }
  }, [])

  const fetchApplications = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`/api/careers/applications?${params}`)
      if (res.ok) {
        const json = await res.json()
        setApplications(json.data || [])
      }
    } catch { toast.error('Failed to fetch applications') }
  }, [search, statusFilter])

  useEffect(() => { fetchJobs() }, [fetchJobs])
  useEffect(() => { fetchApplications() }, [fetchApplications])

  // Create job
  const handleCreateJob = async () => {
    if (!jobForm.title || !jobForm.department || !jobForm.description || !jobForm.requirements) {
      toast.error('Please fill all required fields')
      return
    }
    setSavingJob(true)
    try {
      const res = await fetch('/api/admin/careers', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(jobForm),
      })
      if (res.ok) {
        toast.success('Job listing created!')
        setShowJobDialog(false)
        setJobForm(jobFormDefaults)
        fetchJobs()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to create job')
      }
    } catch { toast.error('Failed to create job') }
    finally { setSavingJob(false) }
  }

  // Toggle job active
  const handleToggleJob = async (job: Job) => {
    try {
      const res = await fetch(`/api/admin/careers/${job.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !job.isActive }),
      })
      if (res.ok) {
        toast.success(job.isActive ? 'Job deactivated' : 'Job activated')
        fetchJobs()
      }
    } catch { toast.error('Failed to update job') }
  }

  // Delete
  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const endpoint = deleteTarget.type === 'job' ? `/api/admin/careers/${deleteTarget.id}` : `/api/careers/applications/${deleteTarget.id}`
      const res = await fetch(endpoint, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Deleted successfully')
        if (deleteTarget.type === 'job') fetchJobs()
        fetchApplications()
      }
    } catch { toast.error('Failed to delete') }
    finally { setDeleteTarget(null) }
  }

  // Update application status
  const handleUpdateApp = async () => {
    if (!selectedApp) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/careers/applications/${selectedApp.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: detailStatus, notes: detailNotes }),
      })
      if (res.ok) {
        toast.success('Application updated')
        setSelectedApp(null)
        fetchApplications()
      }
    } catch { toast.error('Failed to update') }
    finally { setUpdating(false) }
  }

  const openAppDetail = (app: Application) => {
    setSelectedApp(app)
    setDetailStatus(app.status)
    setDetailNotes(app.notes || '')
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-vare-slate">Careers Management</h1>
          <p className="text-vare-gray mt-1">Manage job listings and career applications</p>
        </div>
        <Button onClick={() => setShowJobDialog(true)} className="bg-vare-purple hover:bg-vare-purple-light text-white gap-2">
          <Plus className="h-4 w-4" />New Job Listing
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="applications" className="gap-2">
            <Users className="h-4 w-4" />Applications
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{applications.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="jobs" className="gap-2">
            <Briefcase className="h-4 w-4" />Job Listings
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{jobs.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <Card className="border-vare-border bg-white mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <form onSubmit={(e) => { e.preventDefault(); fetchApplications() }} className="flex-1 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vare-gray" />
                    <Input placeholder="Search by name, email, or job title..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                  </div>
                  <Button type="submit" variant="outline">Search</Button>
                </form>
                <div className="flex gap-2 flex-wrap">
                  {['', 'NEW', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED'].map((s) => (
                    <Button key={s} variant={statusFilter === s ? 'default' : 'outline'} size="sm"
                      onClick={() => { setStatusFilter(s) }}
                      className={statusFilter === s ? 'bg-vare-purple text-white' : ''}>
                      {s === '' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-vare-border bg-white">
            <CardContent className="p-0">
              {applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-vare-gray">
                  <Users className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium mb-1">No applications found</p>
                  <p className="text-sm">Applications submitted from the careers page will appear here</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-vare-ice/50 hover:bg-vare-ice/50">
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden md:table-cell">Job</TableHead>
                          <TableHead className="hidden lg:table-cell">Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden sm:table-cell">Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell><p className="font-medium text-vare-slate">{app.fullName}</p></TableCell>
                            <TableCell className="hidden md:table-cell"><span className="text-sm text-vare-gray">{app.job.title}</span></TableCell>
                            <TableCell className="hidden lg:table-cell text-sm text-vare-gray">{app.email}</TableCell>
                            <TableCell><Badge className={statusConfig[app.status]?.className || ''}>{statusConfig[app.status]?.label || app.status}</Badge></TableCell>
                            <TableCell className="hidden sm:table-cell text-sm text-vare-gray">{new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-vare-gray hover:text-vare-purple" onClick={() => openAppDetail(app)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-vare-gray hover:text-red-600" onClick={() => setDeleteTarget({ type: 'application', id: app.id })}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
          {jobs.length === 0 ? (
            <Card className="border-vare-border bg-white">
              <CardContent className="flex flex-col items-center justify-center py-16 text-vare-gray">
                <Briefcase className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-lg font-medium mb-1">No job listings</p>
                <p className="text-sm mb-4">Create your first job listing to start receiving applications</p>
                <Button onClick={() => setShowJobDialog(true)} className="bg-vare-purple hover:bg-vare-purple-light text-white">
                  <Plus className="h-4 w-4 mr-2" />Create Job
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className="border-vare-border bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-vare-slate">{job.title}</h3>
                          <Badge className={job.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}>
                            {job.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-vare-gray">
                          {job.department} · {job.location} · {job.type}
                          {job.salary && ` · ${job.salary}`}
                        </p>
                        <p className="text-xs text-vare-gray mt-1">{job._count?.applications || 0} applications</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleToggleJob(job)} className="text-vare-gray hover:text-vare-purple">
                          {job.isActive ? <ToggleRight className="h-5 w-5 text-emerald-600" /> : <ToggleLeft className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-vare-gray hover:text-red-600" onClick={() => setDeleteTarget({ type: 'job', id: job.id })}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Job Dialog */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Job Listing</DialogTitle>
            <DialogDescription>Add a new position to your careers page</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input value={jobForm.title} onChange={(e) => setJobForm(p => ({ ...p, title: e.target.value }))} placeholder="Senior React Developer" />
              </div>
              <div className="space-y-2">
                <Label>Department *</Label>
                <Input value={jobForm.department} onChange={(e) => setJobForm(p => ({ ...p, department: e.target.value }))} placeholder="Engineering" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={jobForm.location} onChange={(e) => setJobForm(p => ({ ...p, location: e.target.value }))} placeholder="Remote" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={jobForm.type} onValueChange={(v) => setJobForm(p => ({ ...p, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Salary Range</Label>
              <Input value={jobForm.salary} onChange={(e) => setJobForm(p => ({ ...p, salary: e.target.value }))} placeholder="$80,000 - $120,000" />
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea value={jobForm.description} onChange={(e) => setJobForm(p => ({ ...p, description: e.target.value }))} rows={5} placeholder="Describe the role..." className="resize-none" />
            </div>
            <div className="space-y-2">
              <Label>Requirements *</Label>
              <Textarea value={jobForm.requirements} onChange={(e) => setJobForm(p => ({ ...p, requirements: e.target.value }))} rows={5} placeholder="List the requirements..." className="resize-none" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => { setShowJobDialog(false); setJobForm(jobFormDefaults) }}>Cancel</Button>
              <Button onClick={handleCreateJob} disabled={savingJob} className="bg-vare-purple hover:bg-vare-purple-light text-white">
                {savingJob ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                {savingJob ? 'Creating...' : 'Create Job'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>Review applicant for {selectedApp.job.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-5 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Full Name</p><p className="text-sm font-semibold text-vare-slate">{selectedApp.fullName}</p></div>
                  <div><p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Email</p><p className="text-sm text-vare-slate">{selectedApp.email}</p></div>
                  <div><p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Phone</p><p className="text-sm text-vare-slate">{selectedApp.phone}</p></div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Applied For</p>
                    <p className="text-sm text-vare-slate">{selectedApp.job.title} ({selectedApp.job.type})</p>
                  </div>
                </div>
                {selectedApp.linkedinUrl && (
                  <div><p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">LinkedIn</p><a href={selectedApp.linkedinUrl} target="_blank" rel="noopener" className="text-sm text-vare-purple hover:underline">{selectedApp.linkedinUrl}</a></div>
                )}
                {selectedApp.portfolioUrl && (
                  <div><p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Portfolio</p><a href={selectedApp.portfolioUrl} target="_blank" rel="noopener" className="text-sm text-vare-purple hover:underline">{selectedApp.portfolioUrl}</a></div>
                )}
                <div>
                  <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedApp.skills.split(',').map((s, i) => (
                      <Badge key={i} variant="secondary" className="bg-vare-ice text-vare-slate font-normal text-xs">{s.trim()}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Experience</p>
                  <div className="rounded-lg bg-vare-ice p-3 text-sm text-vare-slate whitespace-pre-wrap max-h-40 overflow-y-auto">{selectedApp.experience}</div>
                </div>
                <div>
                  <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Education</p>
                  <div className="rounded-lg bg-vare-ice p-3 text-sm text-vare-slate whitespace-pre-wrap max-h-40 overflow-y-auto">{selectedApp.education}</div>
                </div>
                {selectedApp.coverLetter && (
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Cover Letter</p>
                    <div className="rounded-lg bg-vare-ice p-3 text-sm text-vare-slate whitespace-pre-wrap max-h-40 overflow-y-auto">{selectedApp.coverLetter}</div>
                  </div>
                )}
                <div className="border-t border-vare-border pt-4 space-y-4">
                  <p className="text-sm font-semibold text-vare-slate">Update Status</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Status</Label>
                      <Select value={detailStatus} onValueChange={setDetailStatus}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW">New</SelectItem>
                          <SelectItem value="REVIEWING">Reviewing</SelectItem>
                          <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                          <SelectItem value="INTERVIEW">Interview</SelectItem>
                          <SelectItem value="OFFERED">Offered</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Notes</Label>
                      <Textarea value={detailNotes} onChange={(e) => setDetailNotes(e.target.value)} placeholder="Add notes..." rows={3} className="border-vare-border resize-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setSelectedApp(null)}>Close</Button>
                <Button onClick={handleUpdateApp} disabled={updating} className="bg-vare-purple hover:bg-vare-purple-light text-white">
                  {updating ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.type === 'job' ? 'Job Listing' : 'Application'}</AlertDialogTitle>
            <AlertDialogDescription>Are you sure? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
