'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageDecorations from '@/components/PageDecorations';
import ParticleBackground from '@/components/ParticleBackground';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Zap,
  Target,
  Lightbulb,
  Award,
  Globe,
  Briefcase,
  Code2,
  Camera,
  Quote,
  Layers,
  Sparkles
} from 'lucide-react';
import { portfolioItems } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = portfolioItems.find((p) => p.slug === slug);

  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Hero Animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-anim'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }

      // Content Sections Animation
      const sections = document.querySelectorAll('.content-section');
      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.anim-item'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <PageDecorations />
      <main className="min-h-screen bg-[#0a0612] overflow-hidden">
        {/* ─── Hero Section ─── */}
        <section ref={heroRef} className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden gradient-purple-dark">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,77,187,0.3),transparent_50%)]" />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
            <div className="absolute inset-0" style={{ background: project.pattern, opacity: 0.1 }} />
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
          </div>

          <ParticleBackground count={60} interactive={true} zIndex={5} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/portfolio"
              className="hero-anim inline-flex items-center text-white/50 hover:text-white text-sm font-medium mb-12 transition-colors opacity-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
              <div>
                <div className="hero-anim flex flex-wrap gap-3 mb-6 opacity-0">
                  {project.categories.map((cat) => (
                    <span key={cat} className="px-4 py-1.5 rounded-full glass-effect text-[#a78bfa] text-xs font-bold uppercase tracking-widest border border-white/10">
                      {cat}
                    </span>
                  ))}
                </div>
                <h1 className="hero-anim text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 opacity-0 leading-tight">
                  {project.title}
                </h1>
                <p className="hero-anim text-xl text-white/70 leading-relaxed mb-10 opacity-0 max-w-2xl">
                  {project.description}
                </p>
              </div>

              <div className="hero-anim space-y-8 opacity-0">
                {project.client && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center flex-shrink-0 text-vare-gold">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Client</p>
                      <p className="text-xl text-white font-semibold">{project.client}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center flex-shrink-0 text-vare-gold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xl text-white font-semibold">Completed & Launched</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Case Study Content ─── */}
        <section ref={contentRef} className="py-24 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-24">
                {/* Challenge */}
                <div className="content-section">
                  <div className="anim-item flex items-center gap-3 mb-8 opacity-0">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                      <Target className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">The Challenge</h2>
                  </div>
                  <p className="anim-item text-white/70 text-lg leading-loose opacity-0">
                    {project.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="content-section">
                  <div className="anim-item flex items-center gap-3 mb-8 opacity-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">The Solution</h2>
                  </div>
                  <p className="anim-item text-white/70 text-lg leading-loose opacity-0">
                    {project.solution}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="content-section">
                  <div className="anim-item flex items-center gap-3 mb-8 opacity-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
                  </div>
                  <div className="anim-item flex flex-wrap gap-3 opacity-0">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-5 py-2.5 rounded-xl glass-card border border-white/10 text-white/80 font-medium hover:border-blue-500/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Results */}
              <div className="content-section">
                <div className="glass-card rounded-3xl p-8 sticky top-32">
                  <div className="anim-item flex items-center gap-3 mb-8 opacity-0">
                    <div className="w-10 h-10 rounded-lg bg-vare-gold/10 flex items-center justify-center text-vare-gold">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Key Results</h3>
                  </div>

                  <ul className="space-y-6">
                    {project.results.map((result, i) => (
                      <li key={i} className="anim-item flex items-start gap-4 opacity-0">
                        <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-white/80 font-medium leading-relaxed">
                          {result}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <hr className="anim-item my-8 border-white/5 opacity-0" />

                  <div className="anim-item opacity-0">
                    <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-vare-purple-dark font-bold rounded-xl hover:shadow-xl hover:shadow-white/10 transition-all duration-300">
                      View Live Project <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Image Gallery ─── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-24 bg-[#0a0612]/50 content-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-12 anim-item opacity-0">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Camera className="w-5 h-5" />
                </div>
                <h2 className="text-3xl font-bold text-white">Project Showcase</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className={`anim-item opacity-0 relative overflow-hidden rounded-3xl group ${idx === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                    <img
                      src={img}
                      alt={`Showcase ${idx}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── The Process ─── */}
        <section className="py-24 relative overflow-hidden content-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-16 justify-center anim-item opacity-0">
              <div className="w-10 h-10 rounded-lg bg-vare-gold/10 flex items-center justify-center text-vare-gold">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-white">The Process</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {project.process.map((step, idx) => (
                <div key={idx} className="anim-item opacity-0 relative p-8 rounded-3xl glass-card border border-white/5 hover:border-vare-gold/20 transition-all duration-500 group">
                  <span className="absolute top-6 right-8 text-5xl font-black text-white/[0.03] group-hover:text-vare-gold/5 transition-colors">
                    {step.step}
                  </span>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-vare-gold/10 flex items-center justify-center text-vare-gold mb-6 border border-vare-gold/20">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonial ─── */}
        {project.testimonial && (
          <section className="py-24 mesh-gradient-dark content-section">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <Quote className="anim-item opacity-0 w-16 h-16 text-vare-gold/20 mx-auto mb-8" />
              <h3 className="anim-item opacity-0 text-3xl md:text-4xl font-medium text-white italic leading-snug mb-10">
                &quot;{project.testimonial.quote}&quot;
              </h3>
              <div className="anim-item opacity-0">
                <p className="text-xl font-bold text-white">{project.testimonial.author}</p>
                <p className="text-vare-gold/60 font-medium">{project.testimonial.role}</p>
              </div>
            </div>
          </section>
        )}

        {/* ─── Next Project Preview ─── */}
        <section className="py-32 relative overflow-hidden content-section">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(123,77,187,0.3),transparent_70%)]" />
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <p className="anim-item opacity-0 text-vare-gold font-bold uppercase tracking-widest text-sm mb-6">Discover More</p>

            {(() => {
              const nextIndex = (portfolioItems.findIndex(p => p.slug === slug) + 1) % portfolioItems.length;
              const nextProject = portfolioItems[nextIndex];
              return (
                <div className="anim-item opacity-0 group cursor-pointer">
                  <Link href={`/portfolio/${nextProject.slug}`}>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-vare-purple hover:to-vare-purple-light transition-all duration-500">
                      Next: {nextProject.title}
                    </h2>
                    <div className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      View Next Project <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                </div>
              );
            })()}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
