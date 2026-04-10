'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Search, Eye, Trash2, MoreHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface Resume {
  id: string
  fullName: string
  email: string
  phone: string
  position: string
  experience: string
  education: string
  skills: string
  resumeFileUrl: string | null
  coverLetter: string | null
  status: 'NEW' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED'
  notes: string | null
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const statusConfig: Record<string, { label: string; className: string }> = {
  NEW: { label: 'New', className: 'bg-blue-600/10 text-blue-600' },
  REVIEWED: { label: 'Reviewed', className: 'bg-amber-600/10 text-amber-600' },
  SHORTLISTED: { label: 'Shortlisted', className: 'bg-emerald-600/10 text-emerald-600' },
  REJECTED: { label: 'Rejected', className: 'bg-red-600/10 text-red-600' },
}

export default function AdminResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [detailNotes, setDetailNotes] = useState('')
  const [detailStatus, setDetailStatus] = useState('')

  const fetchResumes = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.set('search', search)
      if (statusFilter) params.set('status', statusFilter)

      const res = await fetch(`/api/resumes?${params}`)
      if (res.ok) {
        const json = await res.json()
        setResumes(json.data || [])
        setPagination(json.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 })
      }
    } catch {
      toast.error('Failed to fetch resumes')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, statusFilter])

  useEffect(() => {
    fetchResumes()
  }, [fetchResumes])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/resumes/${deleteId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Resume deleted successfully')
        fetchResumes()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to delete resume')
      }
    } catch {
      toast.error('Failed to delete resume')
    } finally {
      setDeleteId(null)
    }
  }

  const handleUpdateStatus = async () => {
    if (!selectedResume) return
    setUpdatingStatus(true)
    try {
      const res = await fetch(`/api/resumes/${selectedResume.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: detailStatus,
          notes: detailNotes,
        }),
      })
      if (res.ok) {
        toast.success('Resume updated successfully')
        setSelectedResume(null)
        fetchResumes()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to update resume')
      }
    } catch {
      toast.error('Failed to update resume')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const openDetail = (resume: Resume) => {
    setSelectedResume(resume)
    setDetailStatus(resume.status)
    setDetailNotes(resume.notes || '')
  }

  const handleQuickStatusChange = async (resumeId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/resumes/${resumeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success('Status updated successfully')
        fetchResumes()
      } else {
        toast.error('Failed to update status')
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-vare-slate">Resumes/CVs</h1>
        <p className="text-vare-gray mt-1">Manage submitted resumes and CVs</p>
      </div>

      {/* Filters */}
      <Card className="border-vare-border bg-white mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vare-gray" />
                <Input
                  placeholder="Search by name, email, or position..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit" variant="outline" className="shrink-0">Search</Button>
            </form>
            <div className="flex gap-2 flex-wrap">
              {['', 'NEW', 'REVIEWED', 'SHORTLISTED', 'REJECTED'].map((s) => (
                <Button
                  key={s}
                  variant={statusFilter === s ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setStatusFilter(s)
                    setPagination(prev => ({ ...prev, page: 1 }))
                  }}
                  className={
                    statusFilter === s
                      ? 'bg-vare-purple text-white hover:bg-vare-purple-light'
                      : 'border-vare-border text-vare-gray hover:text-vare-purple hover:border-vare-purple/30'
                  }
                >
                  {s === '' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-vare-border bg-white">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-vare-gray">
              <Eye className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium mb-1">No resumes found</p>
              <p className="text-sm">No resumes match your current filters</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-vare-ice/50 hover:bg-vare-ice/50">
                      <TableHead className="font-semibold text-vare-slate">Name</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden md:table-cell">Email</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden lg:table-cell">Phone</TableHead>
                      <TableHead className="font-semibold text-vare-slate">Position</TableHead>
                      <TableHead className="font-semibold text-vare-slate">Status</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden sm:table-cell">Date</TableHead>
                      <TableHead className="font-semibold text-vare-slate text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resumes.map((resume) => (
                      <TableRow key={resume.id} className="group">
                        <TableCell>
                          <p className="font-medium text-vare-slate">{resume.fullName}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-vare-gray text-sm">{resume.email}</TableCell>
                        <TableCell className="hidden lg:table-cell text-vare-gray text-sm">{resume.phone}</TableCell>
                        <TableCell>
                          <span className="text-sm text-vare-slate">{resume.position}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig[resume.status]?.className || ''}>
                            {statusConfig[resume.status]?.label || resume.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-vare-gray text-sm">
                          {new Date(resume.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-vare-gray hover:text-vare-purple hover:bg-vare-purple/10"
                              onClick={() => openDetail(resume)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select onValueChange={(val) => handleQuickStatusChange(resume.id, val)}>
                              <SelectTrigger size="sm" className="h-8 w-auto border-vare-border">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="NEW">Mark as New</SelectItem>
                                <SelectItem value="REVIEWED">Mark as Reviewed</SelectItem>
                                <SelectItem value="SHORTLISTED">Mark as Shortlisted</SelectItem>
                                <SelectItem value="REJECTED">Mark as Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-vare-gray hover:text-red-600 hover:bg-red-600/10"
                              onClick={() => setDeleteId(resume.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-vare-border">
                  <p className="text-sm text-vare-gray">
                    Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page <= 1}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      className="border-vare-border text-vare-gray hover:text-vare-purple hover:border-vare-purple/30"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page >= pagination.totalPages}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      className="border-vare-border text-vare-gray hover:text-vare-purple hover:border-vare-purple/30"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Resume Detail Dialog */}
      <Dialog open={!!selectedResume} onOpenChange={() => setSelectedResume(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedResume && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Resume Details</DialogTitle>
                <DialogDescription>Review applicant information</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-vare-slate">{selectedResume.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm text-vare-slate">{selectedResume.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-sm text-vare-slate">{selectedResume.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Position</p>
                    <p className="text-sm text-vare-slate">{selectedResume.position}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedResume.skills.split(',').map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-vare-ice text-vare-slate font-normal text-xs">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-2">Experience</p>
                  <div className="rounded-lg bg-vare-ice p-3 text-sm text-vare-slate whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {selectedResume.experience}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-2">Education</p>
                  <div className="rounded-lg bg-vare-ice p-3 text-sm text-vare-slate whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {selectedResume.education}
                  </div>
                </div>

                {selectedResume.coverLetter && (
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-2">Cover Letter</p>
                    <div className="rounded-lg bg-vare-ice p-3 text-sm text-vare-slate whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {selectedResume.coverLetter}
                    </div>
                  </div>
                )}

                <div className="border-t border-vare-border pt-4 space-y-4">
                  <p className="text-sm font-semibold text-vare-slate">Update Status</p>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-vare-gray">Status</Label>
                      <Select value={detailStatus} onValueChange={setDetailStatus}>
                        <SelectTrigger className="w-full border-vare-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW">New</SelectItem>
                          <SelectItem value="REVIEWED">Reviewed</SelectItem>
                          <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-vare-gray">Notes</Label>
                      <Textarea
                        value={detailNotes}
                        onChange={(e) => setDetailNotes(e.target.value)}
                        placeholder="Add internal notes..."
                        rows={3}
                        className="border-vare-border focus-visible:ring-vare-purple/30 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedResume(null)}
                  className="border-vare-border text-vare-gray hover:text-vare-purple"
                >
                  Close
                </Button>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={updatingStatus}
                  className="bg-vare-purple hover:bg-vare-purple-light text-white"
                >
                  {updatingStatus ? 'Updating...' : 'Save Changes'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
