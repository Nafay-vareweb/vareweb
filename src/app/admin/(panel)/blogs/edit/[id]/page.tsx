'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Send, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function EditBlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    authorName: '',
  })

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`)
        if (res.ok) {
          const json = await res.json()
          const blog = json.data
          setForm({
            title: blog.title || '',
            slug: blog.slug || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            category: blog.category || '',
            tags: blog.tags || '',
            featuredImage: blog.featuredImage || '',
            authorName: blog.authorName || '',
          })
        } else {
          toast.error('Blog post not found')
          router.push('/admin/blogs')
        }
      } catch {
        toast.error('Failed to load blog post')
        router.push('/admin/blogs')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchBlog()
  }, [id, router])

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    }))
  }

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async (status: 'DRAFT' | 'PUBLISHED') => {
    // Validate BEFORE setting loading state
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!form.slug.trim()) {
      toast.error('Slug is required')
      return
    }
    if (!form.content.trim()) {
      toast.error('Content is required')
      return
    }

    // Set loading state only after validation passes
    if (status === 'PUBLISHED') {
      setPublishing(true)
    } else {
      setSaving(true)
    }

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          status,
        }),
      })

      if (res.ok) {
        toast.success(status === 'PUBLISHED' ? 'Blog post updated and published!' : 'Blog post updated!')
        router.push('/admin/blogs')
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to update blog post')
      }
    } catch {
      toast.error('Failed to update blog post')
    } finally {
      setSaving(false)
      setPublishing(false)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-32 mt-1" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-vare-border">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-[400px] w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="border-vare-border">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs">
            <Button variant="ghost" size="icon" className="text-vare-gray hover:text-vare-purple hover:bg-vare-purple/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-vare-slate">Edit Blog Post</h1>
            <p className="text-vare-gray mt-0.5 truncate max-w-md">{form.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => handleSave('DRAFT')}
            disabled={saving || publishing}
            className="gap-2 border-vare-border text-vare-gray hover:text-vare-purple hover:border-vare-purple/30"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave('PUBLISHED')}
            disabled={saving || publishing}
            className="gap-2 bg-vare-purple hover:bg-vare-purple-light text-white"
          >
            {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Update & Publish
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-vare-border bg-white">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-vare-slate">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your blog post title..."
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-lg border-vare-border focus-visible:ring-vare-purple/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-medium text-vare-slate">Slug</Label>
                <Input
                  id="slug"
                  placeholder="post-url-slug"
                  value={form.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="border-vare-border focus-visible:ring-vare-purple/30"
                />
                <p className="text-xs text-vare-gray">Auto-generated from title. Edit if needed.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-medium text-vare-slate">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="A brief summary of your blog post..."
                  value={form.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  rows={3}
                  className="border-vare-border focus-visible:ring-vare-purple/30 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium text-vare-slate">Content <span className="text-vare-gray">(Markdown)</span></Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog post content in markdown..."
                  value={form.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  rows={20}
                  className="font-mono text-sm border-vare-border focus-visible:ring-vare-purple/30 resize-y min-h-[400px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-vare-border bg-white">
            <CardContent className="p-6 space-y-5">
              <h3 className="text-sm font-semibold text-vare-slate">Post Details</h3>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-vare-slate">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Technology"
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="border-vare-border focus-visible:ring-vare-purple/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-sm font-medium text-vare-slate">Tags</Label>
                <Input
                  id="tags"
                  placeholder="tag1, tag2, tag3"
                  value={form.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  className="border-vare-border focus-visible:ring-vare-purple/30"
                />
                <p className="text-xs text-vare-gray">Separate tags with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author" className="text-sm font-medium text-vare-slate">Author Name</Label>
                <Input
                  id="author"
                  placeholder="Author name"
                  value={form.authorName}
                  onChange={(e) => handleChange('authorName', e.target.value)}
                  className="border-vare-border focus-visible:ring-vare-purple/30"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-vare-border bg-white">
            <CardContent className="p-6 space-y-5">
              <h3 className="text-sm font-semibold text-vare-slate">Featured Image</h3>
              <div className="space-y-2">
                <Label htmlFor="featuredImage" className="text-sm font-medium text-vare-slate">Image URL</Label>
                <Input
                  id="featuredImage"
                  placeholder="https://example.com/image.jpg"
                  value={form.featuredImage}
                  onChange={(e) => handleChange('featuredImage', e.target.value)}
                  className="border-vare-border focus-visible:ring-vare-purple/30"
                />
                {form.featuredImage && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-vare-border">
                    <img
                      src={form.featuredImage}
                      alt="Featured preview"
                      className="w-full h-40 object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-vare-border bg-vare-purple/5">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-vare-slate mb-2">Publishing Status</h3>
              <p className="text-sm text-vare-gray">
                Use <strong>Save Draft</strong> to save without publishing, or <strong>Update & Publish</strong> to make changes live immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
