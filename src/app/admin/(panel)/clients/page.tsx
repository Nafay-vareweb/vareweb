'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Search, Eye, Trash2, Building2, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { toast } from 'sonner'

interface ClientForm {
  id: string
  fullName: string
  email: string
  phone: string
  companyName: string | null
  serviceType: string
  budget: string | null
  message: string | null
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED'
  assignedTo: string | null
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
  CONTACTED: { label: 'Contacted', className: 'bg-purple-600/10 text-purple-600' },
  IN_PROGRESS: { label: 'In Progress', className: 'bg-amber-600/10 text-amber-600' },
  COMPLETED: { label: 'Completed', className: 'bg-emerald-600/10 text-emerald-600' },
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientForm[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedClient, setSelectedClient] = useState<ClientForm | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [detailStatus, setDetailStatus] = useState('')
  const [detailNotes, setDetailNotes] = useState('')
  const [detailAssignedTo, setDetailAssignedTo] = useState('')

  const fetchClients = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.set('search', search)
      if (statusFilter) params.set('status', statusFilter)

      const res = await fetch(`/api/clients?${params}`)
      if (res.ok) {
        const json = await res.json()
        setClients(json.data || [])
        setPagination(json.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 })
      }
    } catch {
      toast.error('Failed to fetch client forms')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, statusFilter])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/clients/${deleteId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Client form deleted successfully')
        fetchClients()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to delete')
      }
    } catch {
      toast.error('Failed to delete client form')
    } finally {
      setDeleteId(null)
    }
  }

  const openDetail = (client: ClientForm) => {
    setSelectedClient(client)
    setDetailStatus(client.status)
    setDetailNotes(client.notes || '')
    setDetailAssignedTo(client.assignedTo || '')
  }

  const handleUpdate = async () => {
    if (!selectedClient) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/clients/${selectedClient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: detailStatus,
          notes: detailNotes,
          assignedTo: detailAssignedTo,
        }),
      })
      if (res.ok) {
        toast.success('Client form updated successfully')
        setSelectedClient(null)
        fetchClients()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to update')
      }
    } catch {
      toast.error('Failed to update client form')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-vare-slate">Client Forms</h1>
        <p className="text-vare-gray mt-1">Manage client service requests</p>
      </div>

      {/* Filters */}
      <Card className="border-vare-border bg-white mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vare-gray" />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit" variant="outline" className="shrink-0">Search</Button>
            </form>
            <div className="flex gap-2 flex-wrap">
              {['', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED'].map((s) => (
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
                  {s === '' ? 'All' : s.replace(/_/g, ' ').charAt(0) + s.replace(/_/g, ' ').slice(1).toLowerCase()}
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
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : clients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-vare-gray">
              <Building2 className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium mb-1">No client forms found</p>
              <p className="text-sm">No client submissions match your current filters</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-vare-ice/50 hover:bg-vare-ice/50">
                      <TableHead className="font-semibold text-vare-slate">Name</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden md:table-cell">Email</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden lg:table-cell">Company</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden sm:table-cell">Service</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden xl:table-cell">Budget</TableHead>
                      <TableHead className="font-semibold text-vare-slate">Status</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden sm:table-cell">Date</TableHead>
                      <TableHead className="font-semibold text-vare-slate text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="group">
                        <TableCell>
                          <p className="font-medium text-vare-slate">{client.fullName}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-vare-gray text-sm">{client.email}</TableCell>
                        <TableCell className="hidden lg:table-cell text-vare-gray text-sm">
                          {client.companyName || '—'}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-sm text-vare-slate">{client.serviceType}</span>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          {client.budget ? (
                            <span className="text-sm text-vare-slate flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {client.budget}
                            </span>
                          ) : (
                            <span className="text-vare-gray text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig[client.status]?.className || ''}>
                            {statusConfig[client.status]?.label || client.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-vare-gray text-sm">
                          {new Date(client.createdAt).toLocaleDateString('en-US', {
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
                              onClick={() => openDetail(client)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-vare-gray hover:text-red-600 hover:bg-red-600/10"
                              onClick={() => setDeleteId(client.id)}
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

      {/* Client Detail Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedClient && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Client Details</DialogTitle>
                <DialogDescription>Review client service request</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-vare-slate">{selectedClient.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm text-vare-slate">{selectedClient.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-sm text-vare-slate">{selectedClient.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Company</p>
                    <p className="text-sm text-vare-slate">{selectedClient.companyName || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Service Type</p>
                    <p className="text-sm text-vare-slate">{selectedClient.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-1">Budget</p>
                    <p className="text-sm text-vare-slate">{selectedClient.budget || '—'}</p>
                  </div>
                </div>

                {selectedClient.message && (
                  <div>
                    <p className="text-xs font-medium text-vare-gray uppercase tracking-wider mb-2">Message</p>
                    <div className="rounded-lg bg-vare-ice p-3 text-sm text-vare-slate whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {selectedClient.message}
                    </div>
                  </div>
                )}

                <div className="border-t border-vare-border pt-4 space-y-4">
                  <p className="text-sm font-semibold text-vare-slate">Update Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-vare-gray">Status</Label>
                      <Select value={detailStatus} onValueChange={setDetailStatus}>
                        <SelectTrigger className="w-full border-vare-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW">New</SelectItem>
                          <SelectItem value="CONTACTED">Contacted</SelectItem>
                          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-vare-gray">Assigned To</Label>
                      <Input
                        value={detailAssignedTo}
                        onChange={(e) => setDetailAssignedTo(e.target.value)}
                        placeholder="Assign to team member..."
                        className="border-vare-border focus-visible:ring-vare-purple/30"
                      />
                    </div>
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

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedClient(null)}
                  className="border-vare-border text-vare-gray hover:text-vare-purple"
                >
                  Close
                </Button>
                <Button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="bg-vare-purple hover:bg-vare-purple-light text-white"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
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
            <AlertDialogTitle>Delete Client Form</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this client form? This action cannot be undone.
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
