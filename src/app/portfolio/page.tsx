'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageDecorations from '@/components/PageDecorations';
import ParticleBackground from '@/components/ParticleBackground';
import { portfolioItems, type PortfolioItem } from './data';
import {
  ArrowRight,
  Sparkles,
  ExternalLink,
  TrendingUp,
  Users,
  Zap,
  Award,
  ChevronRight,
  Globe,
  Palette,
  Smartphone,
  ShoppingCart,
  Layers,
  Layout,
  MousePointerClick,
  CheckCircle2
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const filterCategories = [
  'All',
  'Web Design',
  'Branding',
  'eCommerce',
  'Mobile Apps',
  'UI/UX Design',
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Web Design': <Globe className="w-3.5 h-3.5" />,
  'Branding': <Palette className="w-3.5 h-3.5" />,
  'eCommerce': <ShoppingCart className="w-3.5 h-3.5" />,
  'Mobile Apps': <Smartphone className="w-3.5 h-3.5" />,
  'UI/UX Design': <Layers className="w-3.5 h-3.5" />,
};



const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed', icon: <Layers className="w-6 h-6" /> },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: <Award className="w-6 h-6" /> },
  { value: 15, suffix: '+', label: 'Industries Served', icon: <Globe className="w-6 h-6" /> },
  { value: 2, suffix: 'B+', prefix: '$', label: 'Revenue Generated', icon: <TrendingUp className="w-6 h-6" /> },
];

const clientLogos = [
  'TechCrunch', 'Forbes', 'Bloomberg', 'NASA',
  'Stanford University', 'MIT', 'Samsung', 'Adobe',
  'Nike', 'Spotify', 'Airbnb', 'Uber',
];

/* ──────────────────────────────────────────────
   SHARED SUB-COMPONENTS
   ────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-4 py-1.5 rounded-full glass-effect text-white/90 text-sm font-medium">
      <Sparkles className="w-4 h-4 mr-1.5 text-vare-gold" />
      {children}
    </span>
  );
}

/* ──────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────── */

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}

function PortfolioContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');

  const heroRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const gridSectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    if (filterParam && filterCategories.includes(filterParam)) {
      setActiveFilter(filterParam);
      // Smooth scroll to grid if filter is applied from URL
      const grid = document.getElementById('portfolio-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [filterParam]);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.categories.includes(activeFilter));

  /* ── Counter hook ── */
  const animateCounter = useCallback(
    (el: HTMLElement, target: number, duration = 2) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toString();
        },
      });
    },
    []
  );

  /* ── Main GSAP setup ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Hero entrance */
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll('.hero-anim');
        gsap.fromTo(
          els,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      /* 2. Featured section */
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current.querySelectorAll('.featured-anim'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        /* Result stat items stagger */
        gsap.fromTo(
          featuredRef.current.querySelectorAll('.result-stat'),
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: featuredRef.current.querySelector('.results-grid'),
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      /* 3. Grid section filter bar */
      if (gridSectionRef.current) {
        gsap.fromTo(
          gridSectionRef.current.querySelector('.filter-bar'),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridSectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      /* 4. Stats section */
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-item'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        /* Counter animation */
        const counters = statsRef.current.querySelectorAll<HTMLElement>('.counter-value');
        counters.forEach((counter) => {
          const target = parseInt(counter.dataset.target || '0', 10);
          ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => animateCounter(counter, target),
          });
        });
      }

      /* 6. CTA section */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll('.cta-anim'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [animateCounter]);

  /* ── Grid filter animation ── */
  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.portfolio-card');
      gsap.fromTo(
        items,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }
  }, [activeFilter]);

  /* ── Marquee CSS injection ── */
  useEffect(() => {
    const styleId = 'marquee-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <>
      <Navigation />
      <PageDecorations />
      <main className="overflow-hidden">


        {/* ════════════════════════════════════════
            1. HERO SECTION
            ════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden gradient-purple-dark">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,77,187,0.35),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(58,26,112,0.5),transparent_50%)]" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>
          <ParticleBackground count={80} interactive={true} zIndex={5} />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="hero-anim inline-flex items-center px-4 py-2 rounded-full glass-effect text-white/90 text-sm font-medium mb-8 opacity-0">
              <Sparkles className="w-4 h-4 mr-2 text-vare-gold" />
              Our Creative Work
            </span>
            <h1 className="hero-anim text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 opacity-0 leading-tight">
              Portfo
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-vare-gold">lio</span>
            </h1>
            <p className="hero-anim max-w-3xl mx-auto text-lg sm:text-xl text-white/70 leading-relaxed mb-10 opacity-0">
              Showcasing our finest designs, digital products, and latest projects.
              Every pixel crafted with purpose, every interaction designed to inspire.
            </p>
            <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
              <Link
                href="#portfolio-grid"
                className="inline-flex items-center px-8 py-4 text-base font-semibold text-white glass-card rounded-xl hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 transition-all duration-300"
              >
                Explore Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Start a Project
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Decorative floating elements */}
          <div className="absolute top-1/4 left-[8%] w-3 h-3 bg-vare-gold/40 rounded-full hidden lg:block" style={{ animation: 'float 6s ease-in-out infinite' }} />
          <div className="absolute bottom-1/3 right-[12%] w-2 h-2 bg-purple-400/50 rounded-full hidden lg:block" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
          <div className="absolute top-1/2 right-[6%] w-4 h-4 bg-ice-blue/20 rounded-full hidden lg:block" style={{ animation: 'float 7s ease-in-out infinite 2s' }} />
        </section>

        {/* ════════════════════════════════════════
            2. FEATURED PROJECT SHOWCASE
            ════════════════════════════════════════ */}
        <section ref={featuredRef} className="py-28 sm:py-32 mesh-gradient-dark relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="featured-anim text-center mb-16">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full glass-effect text-[#a78bfa] text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                <Sparkles className="w-4 h-4 mr-2" />
                Featured Project
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Case Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple to-vare-purple-light">Spotlight</span>
              </h2>
              <p className="max-w-2xl mx-auto text-white/70 text-lg">
                A closer look at one of our most impactful projects and the results it delivered.
              </p>
            </div>

            {portfolioItems.length > 0 && (
              <div className="featured-anim grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                {/* Left: Featured Image */}
                <Link href={`/portfolio/${portfolioItems[0].slug}`} className="relative group block">
                  <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${portfolioItems[0].gradient} shadow-2xl shadow-purple-500/15`}>
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: portfolioItems[0].pattern,
                      }}
                    />
                    {/* Decorative shapes */}
                    <div className="absolute top-8 left-8 w-32 h-32 border border-white/10 rounded-2xl rotate-12 group-hover:rotate-6 transition-transform duration-700" />
                    <div className="absolute bottom-12 right-12 w-24 h-24 border border-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-3xl -rotate-6 group-hover:rotate-0 transition-transform duration-700" />
                    {/* Featured label */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                        <ArrowRight className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                  </div>
                  {/* Shadow accent */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-purple-500/10 rounded-full blur-2xl" />
                </Link>

                {/* Right: Project Info */}
                <div className="flex flex-col justify-center lg:pt-4">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {portfolioItems[0].categories.map((cat) => (
                      <span key={cat} className="px-4 py-1.5 rounded-full bg-white/[0.06] text-[#a78bfa] text-xs font-bold uppercase tracking-widest border border-white/10">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    {portfolioItems[0].title}
                  </h3>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Client: {portfolioItems[0].client}</p>
                  <p className="text-white/70 text-lg leading-relaxed mb-10">
                    {portfolioItems[0].description} {portfolioItems[0].challenge}
                  </p>

                  {/* Results Grid */}
                  <div className="results-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {portfolioItems[0].results.slice(0, 2).map((result, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl glass-card border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <p className="text-xl font-bold text-white">Impact</p>
                        </div>
                        <p className="text-sm text-white/50">{result}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/portfolio/${portfolioItems[0].slug}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-vare-purple-dark font-bold rounded-xl hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 w-fit"
                  >
                    View Case Study <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════
            3. PORTFOLIO GRID WITH FILTERS
            ════════════════════════════════════════ */}
        <section id="portfolio-grid" ref={gridSectionRef} className="py-28 sm:py-32 bg-[#0d0818] relative">
          {/* Subtle top gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#12081f] to-transparent pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] text-vare-purple-light text-sm font-medium mb-4">
                <Layout className="w-4 h-4 mr-1.5" />
                All Projects
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Our Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple to-vare-purple-light">Portfolio</span>
              </h2>
              <p className="max-w-2xl mx-auto text-white/60 text-lg">
                Browse through our diverse collection of projects across multiple industries and disciplines.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="filter-bar flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeFilter === cat
                      ? 'gradient-purple text-white shadow-lg shadow-purple-500/25 scale-105'
                      : 'glass-card text-white/60 hover:text-white hover:bg-white/[0.08] hover:shadow-md border border-white/[0.08] hover:border-purple-500/30'
                    }`}
                >
                  {cat !== 'All' && categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, i) => (
                <Link
                  key={`${item.slug}-${i}`}
                  href={`/portfolio/${item.slug}`}
                  className="portfolio-card group block"
                >
                  {/* Card Image Area */}
                  <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} shadow-lg hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-500 transform hover:-translate-y-1`}>
                    {/* Pattern overlay */}
                    <div className="absolute inset-0" style={{ background: item.pattern }} />

                    {/* Decorative UI mockup shapes */}
                    <div className="absolute top-6 left-6 right-6">
                      <div className="w-8 h-2 rounded-full bg-white/20 mb-2" />
                      <div className="w-2/3 h-1.5 rounded-full bg-white/10 mb-1" />
                      <div className="w-1/2 h-1.5 rounded-full bg-white/10" />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="h-16 rounded-lg bg-white/10 border border-white/10 mb-3" />
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-lg bg-white/15" />
                        <div className="w-10 h-10 rounded-lg bg-white/15" />
                        <div className="flex-1 h-10 rounded-lg bg-white/20" />
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-[11px] font-semibold">
                        {item.categories[0]}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <ArrowRight className="w-7 h-7 text-vare-purple" />
                        </div>
                        <p className="text-white font-bold text-base tracking-wide">Case Study</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="mt-5 px-1">
                    <div className="flex items-center gap-2 mb-2">
                      {item.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="text-[10px] font-bold uppercase tracking-widest text-[#a78bfa]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-vare-purple-light transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <Layout className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 text-lg font-medium">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════
            4. RESULTS & IMPACT SECTION
            ════════════════════════════════════════ */}
        <section ref={statsRef} className="py-28 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full glass-effect text-white/90 text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4 mr-1.5 text-vare-gold" />
                Our Impact
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Results That <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Speak</span>
              </h2>
              <p className="max-w-2xl mx-auto text-white/60 text-lg">
                Numbers don&apos;t lie. Here&apos;s the impact we&apos;ve created for our clients worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="stat-item relative flex flex-col items-center justify-center p-10 rounded-3xl glass-card-accent hover:bg-white/[0.08] transition-all duration-500 group border border-white/[0.1] hover:border-vare-gold/30 hover:-translate-y-2"
                >
                  {/* Glowing background accent */}
                  <div className="absolute inset-0 bg-gradient-to-b from-vare-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-vare-gold mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 border border-white/10 group-hover:border-vare-gold/40">
                    {stat.icon}
                  </div>

                  <div className="relative z-10 text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight">
                    {stat.prefix && <span className="text-vare-gold mr-1">{stat.prefix}</span>}
                    <span className="counter-value" data-target={stat.value}>
                      0
                    </span>
                    <span className="text-vare-gold">{stat.suffix}</span>
                  </div>

                  <p className="relative z-10 text-white/60 text-base font-semibold uppercase tracking-widest text-center">
                    {stat.label}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/0 group-hover:border-vare-gold/20 transition-all duration-500 rounded-tr-lg" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            5. CLIENT LOGOS MARQUEE
            ════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 bg-[#0d0818] relative overflow-hidden">
          <div className="text-center mb-10">
            <p className="text-white/50 font-medium text-sm uppercase tracking-widest">
              Trusted by Industry Leaders
            </p>
          </div>

          <div ref={marqueeRef} className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0d0818] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0d0818] to-transparent z-10 pointer-events-none" />

            <div className="marquee-track flex items-center gap-12 whitespace-nowrap w-max">
              {/* Double the logos for seamless loop */}
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <div
                  key={`${logo}-${idx}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl glass-card hover:bg-white/[0.06] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-vare-purple to-vare-purple-light flex items-center justify-center text-white font-bold text-xs">
                    {logo.charAt(0)}
                  </div>
                  <span className="text-white/60 font-semibold text-sm group-hover:text-vare-purple-light transition-colors duration-300">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            6. CTA SECTION
            ════════════════════════════════════════ */}
        <section ref={ctaRef} className="py-28 sm:py-32 mesh-gradient-purple relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="cta-anim inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.06] text-vare-purple-light text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-1.5" />
              Let&apos;s Work Together
            </span>
            <h2 className="cta-anim text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple to-vare-purple-light">
                Project?
              </span>
            </h2>
            <p className="cta-anim max-w-2xl mx-auto text-white/70 text-lg mb-10 leading-relaxed">
              Have a vision? We have the expertise to bring it to life. Let&apos;s discuss
              your goals and create something extraordinary together.
            </p>
            <div className="cta-anim flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-base font-semibold text-white gradient-purple rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 text-base font-semibold text-vare-purple-light glass-card border-2 border-white/[0.08] rounded-xl hover:border-purple-500/30 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                View Our Services
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
