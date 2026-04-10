'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageDecorations from '@/components/PageDecorations';
import ParticleBackground from '@/components/ParticleBackground';
import { ArrowRight, FileText, Calendar, User, Mail, Send, Star, Sparkles, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

export default function BlogListingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    fetch('/api/blogs?status=PUBLISHED&limit=100')
      .then((r) => r.json())
      .then((data) => {
        setBlogs(data.data || data.posts || []);
      })
      .catch(() => {
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
      }

      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current.querySelectorAll('.featured-anim'),
          { y: 50, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: featuredRef.current, start: 'top 75%' } }
        );
      }

      if (gridRef.current && !loading) {
        gsap.fromTo(
          gridRef.current.querySelectorAll('.blog-card'),
          { y: 50, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current.querySelector('.blog-grid'), start: 'top 80%' } }
        );
      }

      if (newsletterRef.current) {
        gsap.fromTo(
          newsletterRef.current.querySelectorAll('.newsletter-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: newsletterRef.current, start: 'top 75%' } }
        );
      }
    });
    return () => ctx.revert();
  }, [loading]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    setTimeout(() => {
      setSubscribed(true);
      setSubscribing(false);
    }, 1000);
  };

  return (
    <>
      <Navigation />
      <PageDecorations />
      <main>

        {/* Hero */}
        <section ref={heroRef} className="relative min-h-[70vh] flex items-center mesh-gradient-purple overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0612]/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-vare-purple/20 blur-[150px] animate-pulse" />
            <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-vare-gold/10 blur-[120px]" />
          </div>
          <ParticleBackground count={100} interactive={true} zIndex={5} />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
            <Badge className="hero-anim bg-white/5 text-white/90 border-white/10 mb-8 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] rounded-full opacity-0">
              <FileText className="h-3.5 w-3.5 mr-2 text-vare-purple-light" />
              Intelligence & Insights
            </Badge>
            <h1 className="hero-anim text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.85] mb-8 tracking-tighter opacity-0">
              The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500">
                VareWeb Journal
              </span>
            </h1>
            <p className="hero-anim text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium opacity-0">
              Exploring the frontiers of digital architecture, elite engineering, and high-impact design strategies.
            </p>
          </div>
        </section>

        {/* Featured Post Hero */}
        <section ref={featuredRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="featured-anim glass-card-accent rounded-[3rem] border-white/5 overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)] group">
              <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/10 via-transparent to-vare-gold/5 opacity-50 pointer-events-none" />
              <div className="relative z-10 p-10 sm:p-16 lg:p-20">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                  <div className="flex-1">
                    <span className="featured-anim inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-gold text-xs font-black uppercase tracking-[0.2em] mb-10">
                      <Star className="w-3.5 h-3.5 mr-2" /> Featured Intel
                    </span>
                    <h2 className="featured-anim text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-700">
                      The Future of Web Design: Trends to Watch in 2026
                    </h2>
                    <p className="featured-anim text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 font-medium">
                      Explore the cutting-edge trends shaping the next era of web design — from AI-powered interfaces and immersive 3D experiences to hyper-personalization.
                    </p>
                    <div className="featured-anim flex flex-wrap items-center gap-8 mb-12">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-vare-purple/20 flex items-center justify-center border border-white/10">
                           <User className="w-5 h-5 text-vare-purple-light" />
                        </div>
                        <span className="text-white font-black text-xs uppercase tracking-widest">Architectural Team</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-white/20" />
                        <span className="text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">JAN 15, 2026</span>
                      </div>
                    </div>
                    <Link
                      href="/blog/the-future-of-web-design-2026"
                      className="featured-anim group relative px-12 py-6 gradient-purple text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_40px_rgba(124,77,187,0.3)] transition-all transform hover:-translate-y-1 overflow-hidden inline-flex items-center"
                    >
                      <span className="relative z-10">Unlock Access</span>
                      <ArrowRight className="ml-3 relative z-10 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                  </div>
                  <div className="w-full lg:w-1/3 aspect-square glass-card rounded-[2.5rem] border-white/5 flex items-center justify-center relative overflow-hidden group/img">
                    <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/20 to-vare-gold/10 opacity-50 group-hover/img:scale-110 transition-transform duration-700" />
                    <FileText className="w-32 h-32 text-white/5 relative z-10 group-hover/img:scale-110 group-hover/img:text-white/10 transition-all duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section ref={gridRef} className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="glass-card rounded-[2.5rem] p-8 animate-pulse border-white/5">
                    <div className="aspect-[16/10] rounded-2xl bg-white/5 mb-8" />
                    <div className="h-4 bg-white/5 rounded-lg w-24 mb-4" />
                    <div className="h-8 bg-white/5 rounded-xl w-full mb-3" />
                    <div className="h-4 bg-white/5 rounded-lg w-3/4" />
                  </div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-24 glass-card rounded-[3rem] border-white/5 border-dashed border-2">
                <FileText className="w-20 h-20 text-white/5 mx-auto mb-8" />
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Archives Empty</h3>
                <p className="text-white/30 text-lg mb-12 font-medium">We are currently drafting the next wave of insights. Check back soon.</p>
                <Link
                  href="/"
                  className="inline-flex items-center text-vare-purple-light font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                >
                  Return to Base <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="blog-card group relative glass-card rounded-[2.5rem] border-white/5 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      {blog.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/20 to-vare-gold/10 flex items-center justify-center">
                          <FileText className="w-16 h-16 text-white/5" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[#0a0612]/20 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute top-6 left-6">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-vare-purple-light text-[10px] font-black uppercase tracking-widest border-white/10">
                          {blog.category || 'Intel'}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-6 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                        {blog.authorName && (
                          <span className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                               <User className="w-3 h-3 text-white/40" />
                            </div>
                            {blog.authorName}
                          </span>
                        )}
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(blog.publishedAt || blog.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight group-hover:text-vare-purple-light transition-colors duration-500 line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>
                      <p className="text-white/40 text-sm font-medium leading-relaxed line-clamp-3 mb-8">{blog.excerpt}</p>
                      
                      <div className="mt-auto flex items-center text-white/90 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
                        Read Investigation <ArrowRight className="ml-2 w-4 h-4 text-vare-purple-light" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section ref={newsletterRef} className="py-24 sm:py-32 relative overflow-hidden bg-[#0a0612]">
          <div className="absolute inset-0 mesh-gradient-dark opacity-30" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="newsletter-anim glass-card-accent rounded-[4rem] p-12 lg:p-24 border border-white/5 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-vare-purple/10 blur-[120px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-vare-gold/5 blur-[120px] rounded-full" />
              
              <div className="relative z-10 text-center">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center mx-auto mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                   <Mail className="w-10 h-10 text-vare-purple-light" />
                 </div>
                 <h2 className="newsletter-anim text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                   Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Inner Circle</span>
                 </h2>
                 <p className="newsletter-anim text-white/40 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto font-medium">
                   Strategic intelligence and digital foresight delivered straight to your command center. No spam, only high-stakes insights.
                 </p>

                 {subscribed ? (
                   <div className="newsletter-anim glass-card rounded-[2.5rem] p-12 border-white/5 bg-white/[0.02]">
                     <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                       <Sparkles className="w-10 h-10 text-emerald-400" />
                     </div>
                     <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Signal Received</h3>
                     <p className="text-white/40 font-medium">Welcome to the VareWeb network. Await further instruction in your inbox.</p>
                   </div>
                 ) : (
                   <form onSubmit={handleSubscribe} className="newsletter-anim relative max-w-2xl mx-auto">
                     <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                       <div className="flex-1 relative">
                         <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                         <input
                           type="email"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Enter your email address"
                           className="w-full pl-16 pr-6 py-6 rounded-2xl bg-transparent text-white placeholder-white/20 text-sm font-bold focus:outline-none transition-all"
                         />
                       </div>
                       <button
                         type="submit"
                         disabled={subscribing}
                         className="group px-10 py-6 gradient-purple text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_40px_rgba(124,77,187,0.3)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                       >
                         {subscribing ? (
                           <>
                             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             <span>Transmitting...</span>
                           </>
                         ) : (
                           <>
                             <span>Subscribe</span> <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           </>
                         )}
                       </button>
                     </div>
                     <p className="newsletter-anim text-white/20 text-[10px] uppercase font-black tracking-[0.3em] mt-8">
                       Join 5,000+ elite readers worldwide.
                     </p>
                   </form>
                 )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Need Help With Your Project? */}
        <section className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="glass-card-accent rounded-[4rem] p-12 sm:p-24 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/10 via-transparent to-vare-gold/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest mb-10">
                  <Target className="w-4 h-4 text-vare-gold" /> Initiate Your Project
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
                  Ready to Build <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500">The Future?</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                  Our team of digital architects is ready to transform your vision into an elite digital ecosystem. Let&apos;s start the conversation.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <Link 
                     href="/contact"
                     className="group relative px-14 py-7 gradient-purple text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_60px_rgba(124,77,187,0.4)] transition-all transform hover:-translate-y-2 border border-white/10 overflow-hidden min-w-[280px]"
                  >
                    <span className="relative z-10">Start This Mission</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  <Link 
                     href="/services"
                     className="px-14 py-7 bg-white/5 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all border border-white/5 flex items-center justify-center gap-4 group min-w-[280px]"
                  >
                    View Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

