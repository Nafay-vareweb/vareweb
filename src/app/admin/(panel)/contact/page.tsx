'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Search, Eye, Mail } from 'lucide-react'
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  serviceType: string | null
  message: string
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  const fetchSubmissions = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.set('search', search)

      const res = await fetch(`/api/contact/submissions?${params}`)
      if (res.ok) {
        const json = await res.json()
        setSubmissions(json.data || [])
        setPagination(json.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 })
      }
    } catch {
      toast.error('Failed to fetch contact submissions')
    }
  }, [pagination.page, pagination.limit, search])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-vare-slate">Contact Messages</h1>
        <p className="text-vare-gray mt-1">View and manage contact form submissions</p>
      </div>

      {/* Search */}
      <Card className="border-vare-border bg-white mb-6">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vare-gray" />
              <Input
                placeholder="Search by name, email, or message..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit" variant="outline" className="shrink-0">Search</Button>
          </form>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-vare-border bg-white">
        <CardContent className="p-0">
          {submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-vare-gray">
              <Mail className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium mb-1">No contact submissions found</p>
              <p className="text-sm">No messages match your current search</p>
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
                      <TableHead className="font-semibold text-vare-slate hidden sm:table-cell">Service</TableHead>
                      <TableHead className="font-semibold text-vare-slate">Message</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden sm:table-cell">Date</TableHead>
                      <TableHead className="font-semibold text-vare-slate text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id} className="group">
                        <TableCell>
                          <p className="font-medium text-vare-slate">{submission.name}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-vare-gray text-sm">{submission.email}</TableCell>
                        <TableCell className="hidden lg:table-cell text-vare-gray text-sm">
                          {submission.phone || '—'}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {submission.serviceType ? (
                            <Badge variant="secondary" className="bg-vare-ice text-vare-slate font-normal">
                              {submission.serviceType}
                            </Badge>
                          ) : (
                            <span className="text-vare-gray text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-vare-gray truncate max-w-[200px]">{submission.message}</p>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-vare-gray text-sm">
                          {new Date(submission.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-vare-gray hover:text-vare-purple hover:bg-vare-purple/10"
                              onClick={() => setSelectedSubmission(submission)}
                              title="View Message"
                            >
                              <Eye className="h-4 w-4" />
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

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Contact Message</DialogTitle>
                <DialogDescription>
                  Submitted on{' '}
                  {new Date(selectedSubmission.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Name</p>
                    <p className="text-sm font-semibold text-vare-slate">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Email</p>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-sm text-vare-purple hover:underline"
                    >
                      {selectedSubmission.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-sm text-vare-slate">{selectedSubmission.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Service</p>
                    <p className="text-sm text-vare-slate">{selectedSubmission.serviceType || '—'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-2">Message</p>
                  <div className="rounded-lg bg-vare-ice p-4 text-sm text-vare-slate whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {selectedSubmission.message}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSubmission(null)}
                  className="border-vare-border text-vare-gray hover:text-vare-purple"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = `mailto:${selectedSubmission.email}`
                  }}
                  className="bg-vare-purple hover:bg-vare-purple-light text-white gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
