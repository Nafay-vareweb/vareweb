'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactMarkdown from 'react-markdown';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featuredImage: string;
  authorName: string;
  publishedAt: string;
  createdAt: string;
  status: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/blogs?status=PUBLISHED&limit=100')
      .then((r) => r.json())
      .then((data) => {
        const posts = data.data || data.posts || [];
        const found = posts.find((p: BlogPost) => p.slug === slug);
        if (found) {
          setBlog(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current!.querySelectorAll('.blog-animate'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
        );
      });
      return () => ctx.revert();
    }
  }, [!loading]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="pt-32 pb-24 bg-[#0a0612]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
            <div className="h-8 bg-white/[0.06] rounded w-48 mb-6" />
            <div className="h-10 bg-white/[0.06] rounded w-full mb-4" />
            <div className="h-10 bg-white/[0.06] rounded w-3/4 mb-8" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-4 bg-white/[0.06] rounded" style={{ width: `${90 - i * 5}%` }} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !blog) {
    return (
      <>
        <Navigation />
        <main className="pt-32 pb-24 text-center bg-[#0a0612]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-[#f0ecf7] mb-4">Post Not Found</h1>
            <p className="text-white/70 text-lg mb-8">The blog post you are looking for does not exist or may have been removed.</p>
            <Link
              href="/blog"
              className="inline-flex items-center text-[#a78bfa] font-medium hover:underline"
            >
              <ArrowLeft className="mr-1.5 w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main>

        {/* Hero Banner */}
        {blog.featuredImage && (
          <div className="relative h-[300px] md:h-[400px] mesh-gradient-dark overflow-hidden">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612]/90 to-transparent" />
            <ParticleBackground count={40} interactive={true} zIndex={5} />
          </div>
        )}

        {/* Content */}
        <article ref={contentRef} className="py-16 sm:py-20 bg-[#0d0818]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/blog"
              className="blog-animate inline-flex items-center text-white/50 hover:text-white text-sm font-medium mb-8 opacity-0 transition-colors"
            >
              <ArrowLeft className="mr-1.5 w-4 h-4" /> Back to Blog
            </Link>

            {/* Category */}
            {blog.category && (
              <span className="blog-animate inline-block px-3 py-1 rounded-full bg-white/[0.06] text-[#a78bfa] text-sm font-medium mb-4 opacity-0 border border-white/[0.08]">
                {blog.category}
              </span>
            )}

            {/* Title */}
            <h1 className="blog-animate text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0ecf7] mb-6 leading-tight opacity-0">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="blog-animate flex flex-wrap items-center gap-4 mb-8 text-white/70 text-sm opacity-0">
              {blog.authorName && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {blog.authorName}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
              {blog.tags && (
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  {blog.tags}
                </span>
              )}
            </div>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="blog-animate text-lg text-white/70 leading-relaxed mb-10 font-medium opacity-0">
                {blog.excerpt}
              </p>
            )}

            {/* Divider */}
            <hr className="blog-animate border-white/[0.08] mb-10 opacity-0" />

            {/* Markdown Content */}
            <div className="blog-animate prose prose-lg max-w-none opacity-0
              prose-headings:text-[#f0ecf7] prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-[#a78bfa] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:my-4 prose-ol:my-4
              prose-li:text-white/80 prose-li:leading-relaxed
              prose-code:text-[#a78bfa] prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-[#12081f] prose-pre:text-white/90 prose-pre:rounded-xl prose-pre:p-6 prose-pre:border prose-pre:border-white/[0.08]
              prose-blockquote:border-l-4 prose-blockquote:border-[#7c4dbb] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/70
              prose-img:rounded-xl prose-img:shadow-lg
              prose-hr:border-white/[0.08]
            ">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            {/* Author Card */}
            <div className="mt-14 glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7c4dbb] to-[#a78bfa] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {blog.authorName ? blog.authorName.charAt(0).toUpperCase() : 'V'}
                </div>
                <div>
                  <p className="font-semibold text-white">{blog.authorName || 'VareWeb Team'}</p>
                  <p className="text-white/50 text-sm">Contributing Author</p>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <hr className="border-white/[0.08] mt-12 mb-8" />
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-[#a78bfa] font-medium hover:underline"
              >
                <ArrowLeft className="mr-1.5 w-4 h-4" /> Back to Blog
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
