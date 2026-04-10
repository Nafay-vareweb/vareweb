'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import {
  Layers, ArrowRight, CheckCircle, Zap, Code, Search,
  BarChart3, BookOpen, ChevronDown, Target,
} from 'lucide-react';
import { servicesData, type ServiceData } from './data';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData.find((s) => s.slug === slug);

  const heroRef = useRef<HTMLElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
        );
      }
      if (overviewRef.current) {
        gsap.fromTo(
          overviewRef.current.querySelectorAll('.ov-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: overviewRef.current, start: 'top 75%' } }
        );
      }
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: featuresRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          featuresRef.current.querySelectorAll('.feat-card'),
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: featuresRef.current.querySelector('.feat-grid'), start: 'top 80%' } }
        );
      }
      if (processRef.current) {
        gsap.fromTo(
          processRef.current.querySelectorAll('.proc-step'),
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: processRef.current, start: 'top 75%' } }
        );
      }
      if (techRef.current) {
        gsap.fromTo(
          techRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: techRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          techRef.current.querySelectorAll('.tech-pill'),
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: techRef.current.querySelector('.tech-pills'), start: 'top 80%' } }
        );
      }
      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: faqRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          faqRef.current.querySelectorAll('.faq-item'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: faqRef.current.querySelector('.faq-list'), start: 'top 80%' } }
        );
      }
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll('.cta-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 75%' } }
        );
      }
    });
    return () => ctx.revert();
  }, [service]);

  if (!service) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center bg-[#0a0612]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
            <p className="text-white/50 mb-8">The service you are looking for does not exist.</p>
            <Link href="/services" className="inline-flex items-center px-6 py-3 gradient-purple text-white rounded-xl font-medium hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
              <ArrowRight className="mr-2 w-4 h-4 rotate-180" /> Back to Services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <>
      <Navigation />
      <main>

        {/* ─── Hero Section ─── */}
        <section ref={heroRef} className="relative pt-40 pb-24 overflow-hidden mesh-gradient-purple">
          <div className="absolute inset-0 bg-[#0a0612]/40" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-vare-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-vare-gold/10 rounded-full blur-[100px] animate-pulse-slow" />
          
          <ParticleBackground count={120} interactive={true} zIndex={5} />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
            {/* Breadcrumb */}
            <nav className="hero-anim flex items-center justify-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/30 mb-12 opacity-0" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-vare-purple-light transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3 text-white/10" />
              <Link href="/services" className="hover:text-vare-purple-light transition-colors">Solutions</Link>
              <ArrowRight className="w-3 h-3 text-white/10" />
              <span className="text-white/60">{service.title}</span>
            </nav>

            {/* Badge */}
            <div className="hero-anim flex justify-center mb-10 opacity-0">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest leading-none">
                <ServiceIcon className="w-4 h-4 mr-2.5" />
                {service.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="hero-anim text-5xl md:text-8xl lg:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85] opacity-0">
              {service.title.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500" : ""}>
                   {word}{' '}
                </span>
              ))}
            </h1>

            {/* Description */}
            <div className="hero-anim flex justify-center opacity-0">
              <p className="max-w-3xl text-lg md:text-xl text-white/40 font-medium leading-relaxed mb-16">
                {service.heroDesc}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-anim flex flex-col sm:flex-row gap-8 justify-center items-center opacity-0">
              <Link
                href="/contact"
                className="group relative px-12 py-6 gradient-purple text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_60px_rgba(124,77,187,0.4)] transition-all transform hover:-translate-y-2 border border-white/10 overflow-hidden min-w-[240px]"
              >
                <span className="relative z-10">Initiate Mission</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link
                href="/pricing"
                className="px-12 py-6 bg-white/5 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all border border-white/5 flex items-center justify-center gap-4 group min-w-[240px]"
              >
                View Packages <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="hero-anim mt-20 flex flex-wrap justify-center gap-10 text-white/20 text-[10px] uppercase font-black tracking-widest opacity-0">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Enterprise Scale</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Rapid Deployment</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 24/7 Intel</span>
            </div>
          </div>
        </section>

        {/* ─── Overview Section ─── */}
        <section ref={overviewRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="ov-anim inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8 opacity-0">
                  <Layers className="w-4 h-4 mr-2" /> Strategic Intel
                </span>
                <h2 className="ov-anim text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-10 tracking-tighter leading-tight opacity-0">
                  Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Architecture</span>
                </h2>
                <div className="space-y-8">
                  <p className="ov-anim text-white/40 text-lg md:text-xl font-medium leading-relaxed opacity-0">
                    {service.overviewP1}
                  </p>
                  <p className="ov-anim text-white/30 text-base md:text-lg font-medium leading-relaxed opacity-0">
                    {service.overviewP2}
                  </p>
                </div>
              </div>
              <div className="lg:pl-10">
                <div className="ov-anim glass-card-accent p-10 lg:p-12 opacity-0 rounded-[3rem] border border-white/5 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-white mb-10 tracking-tight flex items-center gap-3">
                      <Target className="w-6 h-6 text-vare-gold" /> Critical Highlights
                    </h3>
                    <ul className="space-y-6">
                      {service.highlights.map((h, i) => (
                        <li key={i} className="flex items-start text-white/60 group/item">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5 group-hover/item:bg-emerald-500/20 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                          <span className="font-medium text-sm md:text-base leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Features Section ─── */}
        <section ref={featuresRef} className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0612]/20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="section-header text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                Solution Catalog
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
                What You <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Gain</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                Every aspect of our {service.title.toLowerCase()} suite is engineered for dominance.
              </p>
            </div>
            
            <div className="feat-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feat, i) => (
                <div
                  key={i}
                  className="feat-card group glass-card p-10 lg:p-12 border-white/5 hover:bg-white/[0.04] transition-all duration-700 flex flex-col"
                >
                   <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-gradient-to-br group-hover:from-vare-purple group-hover:to-vare-purple-light flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(124,77,187,0.3)]">
                    <feat.icon className="w-7 h-7 text-vare-purple-light group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-vare-purple-light transition-colors duration-500 tracking-tight leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Process Section ─── */}
        <section ref={processRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-vare-purple/5 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                The Blueprint
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
                Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Framework</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                Our proprietary delivery methodology for elite {service.title} results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, i) => (
                <div key={i} className="proc-step group relative glass-card p-10 border-white/5 hover:bg-white/[0.04] transition-all duration-500 h-full overflow-hidden">
                  <div className="absolute -top-6 -right-6 text-8xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500">
                    {step.num}
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-vare-purple to-vare-purple-light flex items-center justify-center mb-10 shadow-[0_10px_30px_rgba(124,77,187,0.3)] group-hover:scale-110 transition-transform duration-500">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 tracking-tight leading-tight">{step.title}</h3>
                    <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Technologies Section ─── */}
        <section ref={techRef} className="py-24 sm:py-32 mesh-gradient-purple relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0612]/30" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="section-header text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                The Engine
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
                Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Stack</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                The elite technologies powering our {service.title} architecture.
              </p>
            </div>
            <div className="tech-pills flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {service.technologies.map((tech, i) => (
                <div
                  key={i}
                  className="tech-pill group glass-card px-8 py-4 border-white/5 hover:bg-white/[0.04] transition-all duration-300 cursor-default rounded-2xl"
                >
                  <span className="text-white/60 font-black uppercase text-xs tracking-widest group-hover:text-vare-purple-light transition-colors">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section ref={faqRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="section-header text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                Intel Hub
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
                Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Questions</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                Deep-domain insights into our {service.title.toLowerCase()} methodology.
              </p>
            </div>
            <div className="faq-list space-y-4">
              {service.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="faq-item group glass-card overflow-hidden transition-all duration-500 hover:bg-white/[0.04] border border-white/5"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-lg font-black text-white tracking-tight group-hover:text-vare-purple-light transition-colors">{faq.question}</span>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 ${openFaq === i ? 'bg-vare-purple text-white' : 'text-vare-purple-light'}`}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-8 pb-8 text-white/40 text-base md:text-lg font-medium leading-relaxed">
                      <div className="pt-2 border-t border-white/5">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA Section (Service-Specific) ─── */}
        <section ref={ctaRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="glass-card-accent rounded-[3.5rem] p-12 sm:p-20 border border-white/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/10 via-transparent to-vare-gold/5 pointer-events-none" />
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                 <div className="text-left">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                    <Target className="w-4 h-4 text-vare-gold" /> Initiate Engagement
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                    Ready to Scale <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500">Your Vision?</span>
                  </h2>
                  <p className="text-white/40 text-lg font-medium leading-relaxed mb-12 max-w-xl">
                    Our {service.title} specialists are standing by to engineer your digital dominance. Let&apos;s architect your success.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Link
                      href="/contact"
                      className="group relative px-10 py-5 gradient-purple text-white font-black text-xs uppercase tracking-[0.15em] rounded-2xl hover:shadow-[0_20px_40px_rgba(124,77,187,0.3)] transition-all transform hover:-translate-y-1 border border-white/10 overflow-hidden text-center"
                    >
                      <span className="relative z-10">Start The Mission</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                    <Link
                      href="/pricing"
                      className="px-10 py-5 bg-white/5 text-white font-black text-xs uppercase tracking-[0.15em] rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all border border-white/5 flex items-center justify-center gap-4 group text-center"
                    >
                      View Options <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-6 border-white/5 text-center group/stat hover:bg-white/[0.04] transition-all">
                      <div className="text-3xl font-black text-white mb-1 tracking-tighter group-hover:text-vare-gold transition-colors">500+</div>
                      <div className="text-white/20 text-[10px] font-black uppercase tracking-widest leading-none">Projects</div>
                    </div>
                    <div className="glass-card p-6 border-white/5 text-center group/stat hover:bg-white/[0.04] transition-all">
                      <div className="text-3xl font-black text-white mb-1 tracking-tighter group-hover:text-emerald-500 transition-colors">98%</div>
                      <div className="text-white/20 text-[10px] font-black uppercase tracking-widest leading-none">Success</div>
                    </div>
                    <div className="glass-card p-6 border-white/5 text-center group/stat hover:bg-white/[0.04] transition-all">
                      <div className="text-3xl font-black text-white mb-1 tracking-tighter group-hover:text-blue-400 transition-colors">24h</div>
                      <div className="text-white/20 text-[10px] font-black uppercase tracking-widest leading-none">Response</div>
                    </div>
                    <div className="glass-card p-6 border-white/5 text-center group/stat hover:bg-white/[0.04] transition-all">
                      <div className="text-3xl font-black text-white mb-1 tracking-tighter group-hover:text-vare-purple-light transition-colors">Tier-1</div>
                      <div className="text-white/20 text-[10px] font-black uppercase tracking-widest leading-none">Engineers</div>
                    </div>
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
