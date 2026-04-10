'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Send, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const TEMPLATE_CONTENT = `## Introduction

Write a compelling introduction that hooks the reader and outlines what they will learn from this article.

## Key Points

- **Point One**: Describe the first key point in detail.
- **Point Two**: Explain the second key point with examples.
- **Point Three**: Discuss the third key point and its implications.
- **Point Four**: Cover the fourth key point with supporting evidence.

## Detailed Analysis

### Why This Matters

Explain the significance of the topic and why readers should pay attention to this content.

### Best Practices

Share practical tips and best practices that readers can apply immediately.

### Common Mistakes to Avoid

1. **Mistake One**: Description of the common mistake and how to avoid it.
2. **Mistake Two**: Explanation of why this is problematic and what to do instead.
3. **Mistake Three**: Guidance on the correct approach.

## Conclusion

Summarize the main takeaways from this article and provide a call to action for the reader.

---

*Thank you for reading! If you found this article helpful, feel free to share it with your network.*`

export default function NewBlogPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: TEMPLATE_CONTENT,
    category: '',
    tags: '',
    featuredImage: '',
    authorName: '',
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
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
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          status,
        }),
      })

      if (res.ok) {
        const json = await res.json()
        toast.success(status === 'PUBLISHED' ? 'Blog post published!' : 'Blog post saved as draft!')
        router.push('/admin/blogs')
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to save blog post')
      }
    } catch {
      toast.error('Failed to save blog post')
    } finally {
      setSaving(false)
      setPublishing(false)
    }
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
            <h1 className="text-2xl font-bold text-vare-slate">New Blog Post</h1>
            <p className="text-vare-gray mt-0.5">Create a new blog article</p>
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
            Publish
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
                Use <strong>Save Draft</strong> to save without publishing, or <strong>Publish</strong> to make it live immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
