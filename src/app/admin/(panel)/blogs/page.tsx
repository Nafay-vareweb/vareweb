'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Search, Eye, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
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

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  category: string
  tags: string
  status: 'DRAFT' | 'PUBLISHED'
  authorName: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.set('search', search)
      if (statusFilter) params.set('status', statusFilter)

      const res = await fetch(`/api/blogs?${params}`)
      if (res.ok) {
        const json = await res.json()
        setBlogs(json.data || [])
        setPagination(json.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 })
      }
    } catch {
      toast.error('Failed to fetch blog posts')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, statusFilter])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/blogs/${deleteId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Blog post deleted successfully')
        fetchBlogs()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to delete blog post')
      }
    } catch {
      toast.error('Failed to delete blog post')
    } finally {
      setDeleteId(null)
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    try {
      const res = await fetch(`/api/blogs/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success(`Blog post ${newStatus === 'PUBLISHED' ? 'published' : 'unpublished'}`)
        fetchBlogs()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to update status')
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-vare-slate">Blog Posts</h1>
          <p className="text-vare-gray mt-1">Manage your blog content</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="gap-2 bg-vare-purple hover:bg-vare-purple-light text-white">
            <Plus className="h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-vare-border bg-white mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vare-gray" />
                <Input
                  placeholder="Search posts..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit" variant="outline" className="shrink-0">Search</Button>
            </form>
            <div className="flex gap-2">
              {['', 'PUBLISHED', 'DRAFT'].map((s) => (
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
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-vare-gray">
              <Eye className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium mb-1">No blog posts found</p>
              <p className="text-sm mb-4">Create your first blog post or adjust your filters</p>
              <Link href="/admin/blogs/new">
                <Button className="gap-2 bg-vare-purple hover:bg-vare-purple-light text-white">
                  <Plus className="h-4 w-4" />
                  Create New Post
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-vare-ice/50 hover:bg-vare-ice/50">
                      <TableHead className="font-semibold text-vare-slate">Title</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden md:table-cell">Category</TableHead>
                      <TableHead className="font-semibold text-vare-slate">Status</TableHead>
                      <TableHead className="font-semibold text-vare-slate hidden sm:table-cell">Date</TableHead>
                      <TableHead className="font-semibold text-vare-slate text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.map((blog) => (
                      <TableRow key={blog.id} className="group">
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="font-medium text-vare-slate truncate">{blog.title}</p>
                            <p className="text-xs text-vare-gray truncate mt-0.5">{blog.slug}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {blog.category ? (
                            <Badge variant="secondary" className="bg-vare-ice text-vare-slate font-normal">
                              {blog.category}
                            </Badge>
                          ) : (
                            <span className="text-vare-gray text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              blog.status === 'PUBLISHED'
                                ? 'bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600/10'
                                : 'bg-amber-600/10 text-amber-600 hover:bg-amber-600/10'
                            }
                          >
                            {blog.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-vare-gray text-sm">
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
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
                              onClick={() => handleToggleStatus(blog.id, blog.status)}
                              title={blog.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                            >
                              {blog.status === 'PUBLISHED' ? (
                                <ToggleRight className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <ToggleLeft className="h-4 w-4" />
                              )}
                            </Button>
                            <Link href={`/admin/blogs/edit/${blog.id}`}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-vare-gray hover:text-vare-purple hover:bg-vare-purple/10"
                                title="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-vare-gray hover:text-red-600 hover:bg-red-600/10"
                              onClick={() => setDeleteId(blog.id)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
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
