'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
  Building2,
  Globe,
  FileText,
  ArrowRight,
  Star,
  Zap,
  Heart,
  Target,
  Quote,
  Camera,
  Sparkles,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageDecorations from '@/components/PageDecorations'
import ParticleBackground from '@/components/ParticleBackground'


gsap.registerPlugin(ScrollTrigger)

interface JobListing {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary: string | null
  description: string
  requirements: string
  isActive: boolean
}

const perks = [
  { icon: Zap, title: 'Fast Growth', description: 'Work on cutting-edge projects and grow your skills rapidly' },
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs' },
  { icon: Globe, title: 'Remote Friendly', description: 'Work from anywhere with flexible hours and remote options' },
  { icon: Target, title: 'Learning Budget', description: 'Dedicated budget for courses, conferences, and certifications' },
  { icon: Star, title: 'Competitive Pay', description: 'Industry-leading compensation with performance bonuses' },
  { icon: Users, title: 'Great Team', description: 'Collaborative, supportive team of talented professionals' },
]

const testimonials = [
  {
    quote: "Joining VareWeb was the best career decision I've made. The growth opportunities are endless and the team is incredibly supportive.",
    name: 'Alex R.',
    role: 'Senior Developer',
    tenure: '3 years at VareWeb',
  },
  {
    quote: "The remote-first culture here gives me the freedom to do my best work while maintaining a great work-life balance.",
    name: 'Sarah M.',
    role: 'UX Designer',
    tenure: '2 years at VareWeb',
  },
  {
    quote: "I've learned more in my first year at VareWeb than in the previous five years combined. The learning culture is unmatched.",
    name: 'David K.',
    role: 'Project Manager',
    tenure: '1 year at VareWeb',
  },
]

const galleryItems = [
  { title: 'Team Offsite 2024', gradient: 'from-vare-purple to-purple-700' },
  { title: 'Hackathon Winners', gradient: 'from-blue-600 to-cyan-500' },
  { title: 'Annual Celebration', gradient: 'from-amber-400 to-vare-gold' },
  { title: 'Remote Team Meetup', gradient: 'from-teal-500 to-emerald-500' },
  { title: 'Workshop Session', gradient: 'from-pink-500 to-rose-400' },
  { title: 'Team Building Day', gradient: 'from-indigo-600 to-violet-500' },
]

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', portfolioUrl: '', linkedinUrl: '',
    experience: '', education: '', skills: '', coverLetter: '',
  })
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/careers')
      .then(res => res.json())
      .then(data => {
        setJobs(data.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll('.animate-hero'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
        )
      }
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll('.animate-stat'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 85%' } }
        )
      }
      gsap.utils.toArray<HTMLElement>('.animate-perk').forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
        )
      })
      gsap.utils.toArray<HTMLElement>('.animate-job').forEach((el) => {
        gsap.fromTo(el, { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } }
        )
      })
      // Testimonials animation
      gsap.fromTo(
        '.testimonials-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '#testimonials', start: 'top 75%' } }
      )
      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
        )
      })
      // Gallery animation
      gsap.fromTo(
        '.gallery-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '#gallery', start: 'top 75%' } }
      )
      gsap.utils.toArray<HTMLElement>('.gallery-card').forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  const handleApply = (job: JobListing) => {
    setSelectedJob(job)
    setShowApplyForm(true)
    setForm({ fullName: '', email: '', phone: '', portfolioUrl: '', linkedinUrl: '', experience: '', education: '', skills: '', coverLetter: '' })
  }

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedJob) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, jobId: selectedJob.id }),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success('Application submitted successfully!')
        setShowApplyForm(false)
        setSelectedJob(null)
      } else {
        toast.error(json.error || 'Failed to submit application')
      }
    } catch {
      toast.error('Failed to submit application')
    } finally {
      setSubmitting(false)
    }
  }

  const typeColors: Record<string, string> = {
    'Full-Time': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    'Part-Time': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    'Contract': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    'Internship': 'bg-purple-500/15 text-vare-purple-light border-purple-500/20',
  }

  return (
    <>
      <Navigation />
      <PageDecorations />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center mesh-gradient-purple overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0612]/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-vare-purple/20 blur-[150px] animate-pulse" />
          <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-vare-gold/10 blur-[120px]" />
        </div>
        <ParticleBackground count={100} interactive={true} zIndex={5} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <Badge className="animate-hero bg-white/5 text-white/90 border-white/10 mb-8 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] rounded-full">
              <Briefcase className="h-3.5 w-3.5 mr-2 text-vare-purple-light" />
              Global Opportunities
            </Badge>
            <h1 className="animate-hero text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.85] mb-8 tracking-tighter">
              Build the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500">
                Next Era
              </span>
            </h1>
            <p className="animate-hero text-lg md:text-xl text-white/70 mb-12 max-w-xl leading-relaxed font-medium">
              Join a collective of elite engineers, designers, and visionaries. We don&apos;t just fill roles; we architect career legacies.
            </p>
            <div className="animate-hero flex flex-wrap gap-6">
              <a href="#openings">
                <Button size="lg" className="group relative px-10 py-7 gradient-purple text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_40px_rgba(124,77,187,0.3)] transition-all transform hover:-translate-y-1 overflow-hidden">
                  <span className="relative z-10">Explore Openings</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Button>
              </a>
              <a href="#testimonials">
                <Button size="lg" variant="outline" className="px-10 py-7 border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all">
                  Our Culture
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="relative -mt-24 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-accent rounded-[3rem] p-8 md:p-12 border-white/5 shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '50+', label: 'Elite Squad' },
              { value: '200+', label: 'Digital Feats' },
              { value: '15+', label: 'Nations' },
              { value: '98%', label: 'Loyalty' },
            ].map((stat) => (
              <div key={stat.label} className="animate-stat text-center group">
                <p className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</p>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section id="perks" className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4 mr-2" /> Global Benefits
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Why You&apos;ll <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Excel Here</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              We provide the tools, the trust, and the trajectory for you to do the best work of your life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {perks.map((perk, i) => (
              <div key={i} className="animate-perk glass-card-accent p-10 hover:bg-white/[0.08] transition-all duration-700 group rounded-[3rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-vare-purple/5 blur-2xl -mr-12 -mt-12 group-hover:bg-vare-purple/10 transition-colors" />
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-vare-purple transition-all duration-500 border border-white/10">
                  <perk.icon className="h-8 w-8 text-vare-purple-light group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{perk.title}</h3>
                <p className="text-white/40 text-base leading-relaxed font-medium">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
              <Briefcase className="w-4 h-4 mr-2" /> Open Frontiers
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Current <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Openings</span>
            </h2>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card rounded-[2.5rem] p-10 animate-pulse border-white/5">
                  <div className="h-8 bg-white/5 rounded-xl w-1/3 mb-4" />
                  <div className="h-4 bg-white/5 rounded-lg w-1/4" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-[3rem] border-white/5 border-dashed border-2">
              <Briefcase className="h-20 w-20 text-white/5 mx-auto mb-8" />
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">No Open Missions Currently</h3>
              <p className="text-white/30 max-w-md mx-auto mb-12 font-medium uppercase text-xs tracking-widest">Register for the talent pool below</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-10">
                {['Engineering', 'Design', 'Marketing', 'Systems'].map((dept) => (
                  <div key={dept} className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 text-sm font-black text-white/40 uppercase tracking-tighter border border-white/5">
                    <Sparkles className="w-4 h-4 text-vare-purple-light opacity-30" />
                    {dept}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job.id} className="animate-job glass-card rounded-[2.5rem] border-white/5 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden group">
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{job.title}</h3>
                          <Badge className={`${typeColors[job.type] || 'bg-white/5 text-white/40'} text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full`}>
                            {job.type}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm font-bold text-white/30 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-vare-purple-light" />{job.department}</span>
                          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-400" />{job.location}</span>
                          {job.salary && <span className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-emerald-400" />{job.salary}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button 
                          onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)} 
                          variant="ghost" 
                          size="lg" 
                          className="h-16 w-16 rounded-2xl bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                        >
                          {expandedJob === job.id ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                        </Button>
                        <Button 
                          onClick={() => handleApply(job)} 
                          className="h-16 px-10 gradient-purple text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_40px_rgba(124,77,187,0.3)] transition-all transform hover:-translate-y-1"
                        >
                          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {expandedJob === job.id && (
                    <div className="px-8 md:px-12 pb-12 pt-8 border-t border-white/5 bg-white/[0.02] animate-in slide-in-from-top-4 duration-500">
                      <div className="grid md:grid-cols-2 gap-10">
                        <div>
                          <h4 className="font-black text-white/80 uppercase text-xs tracking-[0.3em] mb-6">Mission Description</h4>
                          <div className="text-base text-white/50 whitespace-pre-wrap leading-relaxed font-medium bg-white/[0.03] rounded-3xl p-8 border border-white/5">{job.description}</div>
                        </div>
                        <div>
                          <h4 className="font-black text-white/80 uppercase text-xs tracking-[0.3em] mb-6">Requirements</h4>
                          <div className="text-base text-white/50 whitespace-pre-wrap leading-relaxed font-medium bg-white/[0.03] rounded-3xl p-8 border border-white/5">{job.requirements}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Employee Testimonials */}
      <section id="testimonials" className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="testimonials-header text-center mb-20">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
              <Quote className="w-4 h-4 mr-2" /> Insider Voices
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Inside the <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">VareWeb Squad</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              Real stories from the architects of our digital future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="testimonial-card glass-card rounded-[3rem] p-10 hover:bg-white/[0.06] border-white/5 transition-all duration-700 relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-vare-purple/10 to-transparent rounded-br-full" />
                <div className="absolute -top-4 right-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-vare-purple to-vare-purple-light flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div className="flex gap-1 mb-8 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-vare-gold fill-vare-gold" />
                  ))}
                </div>
                <blockquote className="text-white/60 text-lg leading-[1.6] mb-10 font-medium italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="border-t border-white/5 pt-8">
                  <p className="font-black text-xl text-white tracking-tight">{testimonial.name}</p>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">{testimonial.role}</p>
                  <p className="text-vare-purple-light text-[10px] font-black uppercase tracking-[0.2em] mt-2">{testimonial.tenure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at VareWeb Gallery */}
      <section id="gallery" className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="gallery-header text-center mb-20">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
              <Camera className="w-4 h-4 mr-2" /> Visual Log
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
              Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">VareWeb</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              Beyond the code — building culture one moment at a time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {galleryItems.map((item) => (
              <div
                key={item.title}
                className="gallery-card group relative rounded-[2.5rem] overflow-hidden aspect-[4/3] cursor-pointer glass-card border-white/5"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40`} />
                <div className="absolute inset-0 bg-[#0a0612]/40" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-0 transition-opacity duration-500">
                  <Camera className="w-16 h-16 text-white" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 p-8">
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tighter drop-shadow-2xl">{item.title}</h3>
                    <div className="w-12 h-1 bg-vare-gold mx-auto rounded-full" />
                  </div>
                </div>
                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Badge className="bg-white/10 text-white/60 border-white/10 text-[10px] uppercase font-black tracking-widest">Team Event</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="glass-card-accent rounded-[4rem] p-12 sm:p-24 border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/10 via-transparent to-vare-gold/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest mb-10">
                <Target className="w-4 h-4 text-vare-gold" /> Initiate Your Departure
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
                Ready to Join <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500">The Frontier?</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                We are always looking for outlier talent. If you don&apos;t see a perfect match, join our pool for priority notification on future mission-critical roles.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <Button 
                   onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                   className="group relative px-14 py-7 gradient-purple text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_60px_rgba(124,77,187,0.4)] transition-all transform hover:-translate-y-2 border border-white/10 overflow-hidden min-w-[280px]"
                >
                  <span className="relative z-10">Explore Roles</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Button>
                <Link 
                   href="/contact"
                   className="px-14 py-7 bg-white/5 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all border border-white/5 flex items-center justify-center gap-4 group min-w-[280px]"
                >
                  General Inquiry <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Dialog - must be before Footer for proper layering */}
      <Dialog open={showApplyForm} onOpenChange={setShowApplyForm}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#12081f] border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/50">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription className="text-white/60">{selectedJob?.department} · {selectedJob?.location} · {selectedJob?.type}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication} className="space-y-5 mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2"><Users className="h-4 w-4 text-vare-purple-light" />Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/80">Full Name *</Label>
                  <Input id="fullName" required value={form.fullName} onChange={(e) => setForm(p => ({ ...p, fullName: e.target.value }))} placeholder="John Doe" className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Email *</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80">Phone *</Label>
                  <Input id="phone" required value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl" className="text-white/80">LinkedIn URL</Label>
                  <Input id="linkedinUrl" value={form.linkedinUrl} onChange={(e) => setForm(p => ({ ...p, linkedinUrl: e.target.value }))} placeholder="https://linkedin.com/in/yourprofile" className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolioUrl" className="text-white/80">Portfolio / Website URL</Label>
              <Input id="portfolioUrl" value={form.portfolioUrl} onChange={(e) => setForm(p => ({ ...p, portfolioUrl: e.target.value }))} placeholder="https://yourportfolio.com" className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20" />
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2"><FileText className="h-4 w-4 text-vare-purple-light" />Experience & Education</h3>
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-white/80">Work Experience *</Label>
                <Textarea id="experience" required rows={4} value={form.experience} onChange={(e) => setForm(p => ({ ...p, experience: e.target.value }))} placeholder="Describe your relevant work experience..." className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20 resize-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education" className="text-white/80">Education *</Label>
                <Textarea id="education" required rows={3} value={form.education} onChange={(e) => setForm(p => ({ ...p, education: e.target.value }))} placeholder="Your educational background..." className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20 resize-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-white/80">Skills *</Label>
              <Input id="skills" required value={form.skills} onChange={(e) => setForm(p => ({ ...p, skills: e.target.value }))} placeholder="React, Node.js, TypeScript, UI/UX, etc." className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20" />
              <p className="text-xs text-white/40">Separate skills with commas</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-white/80">Cover Letter</Label>
              <Textarea id="coverLetter" rows={5} value={form.coverLetter} onChange={(e) => setForm(p => ({ ...p, coverLetter: e.target.value }))} placeholder="Tell us why you're a great fit for this role..." className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/20 resize-none" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowApplyForm(false)} className="border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:text-white">Cancel</Button>
              <Button type="submit" disabled={submitting} className="bg-vare-purple hover:bg-vare-purple-light text-white">
                {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>) : (<><Send className="mr-2 h-4 w-4" />Submit Application</>)}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  )
}
