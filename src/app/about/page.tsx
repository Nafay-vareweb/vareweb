'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageDecorations from '@/components/PageDecorations';
import ParticleBackground from '@/components/ParticleBackground';
import {
  ArrowRight, Users, Heart, Clock, Target, Lightbulb, Shield, Award,
  Briefcase, Trophy, Star, Medal, Globe,
  BookOpen, Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '15,000+', label: 'Projects Delivered', icon: Briefcase },
  { value: '98%', label: 'Client Satisfaction', icon: Heart },
  { value: '24/7', label: 'Live Support', icon: Clock },
  { value: '50+', label: 'Team Members', icon: Users },
];

const values = [
  { icon: Lightbulb, title: 'Innovation First', desc: 'We push creative boundaries and embrace new technologies to deliver solutions that stand out in the market.' },
  { icon: Heart, title: 'Client Obsessed', desc: 'Every decision is driven by what creates the most value for our clients and their end users.' },
  { icon: Shield, title: 'Quality Guaranteed', desc: 'We never compromise on quality. Every pixel, every line of code, every interaction is crafted to perfection.' },
  { icon: Target, title: 'Results Driven', desc: 'Beautiful design means nothing without results. We focus on measurable outcomes that drive real business growth.' },
];

const milestones = [
  { year: '2014', title: 'Founded in Dallas, TX', desc: 'Started with a small team of 3 passionate designers with a vision to transform digital experiences.' },
  { year: '2016', title: 'First 100 Clients', desc: 'Reached our first major milestone serving 100 businesses across the United States.' },
  { year: '2018', title: 'International Expansion', desc: 'Expanded operations to serve clients in Europe and Asia, opening offices in London and Dubai.' },
  { year: '2020', title: 'Digital Transformation Leader', desc: 'Helped over 200 businesses pivot to digital during the global pandemic.' },
  { year: '2022', title: '1,000+ Projects Delivered', desc: 'Surpassed 1,000 successfully completed projects with a 98% client satisfaction rate.' },
  { year: '2024', title: 'AI-Powered Solutions', desc: 'Launched our AI integration services, helping clients leverage cutting-edge technology.' },
];

const awards = [
  { title: 'Best Web Design Agency 2024', org: 'Global Digital Awards', Icon: Trophy },
  { title: 'Top 10 Creative Agencies', org: 'Forbes Magazine', Icon: Star },
  { title: 'Excellence in UX Design', org: 'Awwwards', Icon: Award },
  { title: 'Innovation in Digital Marketing', org: 'DMI Awards', Icon: Medal },
  { title: 'Best E-Commerce Solution', org: 'Commerce Awards', Icon: Trophy },
  { title: 'Customer Choice Award', org: 'Clutch.co', Icon: Star },
];

const partnersRow1 = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Tesla', 'Meta', 'Netflix', 'Spotify'];
const partnersRow2 = ['Adobe', 'Samsung', 'Nike', 'Airbnb', 'Uber', 'Bloomberg', 'NASA', 'MIT'];

const cultureCards = [
  { icon: Globe, title: 'Remote-First Culture', desc: 'Work from anywhere in the world. Our distributed team spans 15+ countries, bringing diverse perspectives to every project.' },
  { icon: BookOpen, title: 'Continuous Learning', desc: 'We invest in our team with dedicated learning budgets, conference passes, and weekly knowledge-sharing sessions.' },
  { icon: Sparkles, title: 'Creative Freedom', desc: 'Every team member has a voice. We encourage experimentation, innovation, and thinking outside the box.' },
  { icon: Heart, title: 'Work-Life Balance', desc: 'Flexible hours, unlimited PTO, and a genuine focus on well-being. Happy teams create amazing work.' },
];



export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const awardsRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);
  const cultureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
      }

      // Story
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.querySelectorAll('.story-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: storyRef.current, start: 'top 75%' } }
        );
      }

      // Stats
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-card'),
          { y: 40, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } }
        );
      }

      // Values
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll('.value-card'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: valuesRef.current.querySelector('.values-grid'), start: 'top 80%' } }
        );
      }

      // Timeline - center line draws in, items stagger from sides
      if (timelineRef.current) {
        const centerLine = timelineRef.current.querySelector('.timeline-center-line');
        if (centerLine) {
          gsap.fromTo(
            centerLine,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              transformOrigin: 'top center',
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 70%',
                end: 'bottom 40%',
                scrub: 0.6,
              },
            }
          );
        }

        // Each timeline item slides from alternating sides with glow
        const items = timelineRef.current.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          const card = item.querySelector('.timeline-card');
          const badge = item.querySelector('.timeline-badge');

          // Card slides in from side
          gsap.fromTo(
            card,
            { x: isLeft ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
              },
            }
          );

          // Card content fades in with delay
          const content = item.querySelectorAll('.timeline-content > *');
          gsap.fromTo(
            content,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
              },
              delay: 0.15,
            }
          );

          // Year badge scales in with pop
          if (badge) {
            gsap.fromTo(
              badge,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(2.5)',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 82%',
                },
              }
            );
          }

          // Subtle glow pulse on visible items (apply to card only to avoid a full-width background box)
          if (card) {
            gsap.to(card, {
              boxShadow: '0 0 30px rgba(124, 77, 187, 0.08), 0 0 60px rgba(124, 77, 187, 0.04)',
              duration: 0.6,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: item,
                start: 'top 70%',
                end: 'top 30%',
                scrub: 1,
                toggleActions: 'play reverse play reverse',
              },
            });
          }
        });
      }

      // Awards
      if (awardsRef.current) {
        gsap.fromTo(
          awardsRef.current.querySelectorAll('.award-card'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: awardsRef.current.querySelector('.awards-grid'), start: 'top 80%' } }
        );
      }

      // Partners
      if (partnersRef.current) {
        gsap.fromTo(
          partnersRef.current.querySelectorAll('.partners-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: partnersRef.current, start: 'top 80%' } }
        );
      }

      // Culture
      if (cultureRef.current) {
        gsap.fromTo(
          cultureRef.current.querySelectorAll('.culture-card'),
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: cultureRef.current.querySelector('.culture-grid'), start: 'top 80%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <PageDecorations />
      <main>

        {/* Hero */}
        <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden mesh-gradient-purple">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0">
             <div className="absolute top-20 left-10 w-96 h-96 bg-vare-purple/20 rounded-full blur-[120px] animate-pulse" />
             <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-vare-gold/10 rounded-full blur-[150px]" />
          </div>
          <ParticleBackground count={100} interactive={true} zIndex={5} />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="hero-anim inline-flex items-center px-4 py-1.5 rounded-full glass-card border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest mb-8 opacity-0">
              <Users className="w-4 h-4 mr-2 text-vare-purple-light" /> Our DNA
            </span>
            <h1 className="hero-anim text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 opacity-0 tracking-tighter leading-[0.9]">
              Architects of <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Digital Progress</span>
            </h1>
            <p className="hero-anim max-w-2xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed opacity-0 font-medium">
              We are a collective of designers, engineers, and strategists obsessed with the intersection of high-end aesthetics and technical performance.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section ref={storyRef} className="py-24 sm:py-32 bg-[#0a0112] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-vare-purple/5 blur-[120px] rounded-full pointer-events-none -mr-96 -mt-96" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="story-anim inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                  <Award className="w-4 h-4 mr-2" /> Our Genesis
                </span>
                <h2 className="story-anim text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-[1.1]">
                  A Decade of <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Digital Excellence</span>
                </h2>
                <div className="space-y-6">
                  <p className="story-anim text-white/50 text-lg leading-relaxed font-medium">
                    Founded with a singular mission to elevate the standard of the web, VareWeb has evolved from a boutique design house into a global powerhouse of technical innovation.
                  </p>
                  <p className="story-anim text-white/40 text-base leading-relaxed">
                    Over the years, we have mastered the art of balancing complex engineering with seamless user experiences. Our journey is defined by the 15,000+ success stories we&apos;ve built alongside our partners.
                  </p>
                  <div className="story-anim pt-8 flex items-center gap-6">
                     <div className="flex -space-x-4">
                        {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0a0112] bg-zinc-800" />)}
                     </div>
                     <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Join 15K+ Success Stories</p>
                  </div>
                </div>
              </div>
              <div className="story-anim relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-vare-purple to-vare-gold opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-700" />
                <div className="aspect-[4/5] md:aspect-square rounded-[3rem] glass-card border border-white/5 overflow-hidden relative shadow-2xl">
                  <div className="absolute inset-0 grid-pattern opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center relative">
                      <div className="text-[12rem] font-black text-white/[0.03] leading-none select-none">VW</div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <div className="w-24 h-24 rounded-3xl gradient-purple flex items-center justify-center mb-4 shadow-2xl">
                            <Sparkles className="w-10 h-10 text-white" />
                         </div>
                         <p className="text-vare-gold font-black uppercase tracking-[0.3em] text-xs">Since 2014</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                    <div className="glass-card-accent rounded-3xl p-6 text-center border border-white/5">
                      <div className="text-3xl font-black text-white">10+</div>
                      <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">Years Built</div>
                    </div>
                    <div className="glass-card-accent rounded-3xl p-6 text-center border border-white/5">
                      <div className="text-3xl font-black text-white">40+</div>
                      <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">Nations Served</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section ref={statsRef} className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glass-card-accent p-10 text-center hover:bg-white/[0.08] transition-all duration-500 group rounded-[2.5rem] border-white/5 shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                    <stat.icon className="w-8 h-8 text-vare-purple-light" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section ref={valuesRef} className="py-24 sm:py-32 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
                <Heart className="w-4 h-4 mr-2" /> What Drives Us
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Values</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                These principles guide every strategic pivot and every line of code we ship.
              </p>
            </div>
            <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {values.map((value, i) => (
                <div key={i} className="value-card group glass-card p-10 md:p-12 hover:bg-white/[0.05] transition-all duration-700 rounded-[3rem] border-white/5 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-vare-purple/5 blur-3xl -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-vare-purple transition-all duration-500 border border-white/10">
                      <value.icon className="w-8 h-8 text-vare-purple-light group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{value.title}</h3>
                    <p className="text-white/50 text-base leading-relaxed font-medium">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey - Timeline */}
        <section ref={timelineRef} className="py-24 sm:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vare-purple/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
                <Clock className="w-4 h-4 mr-2" /> Our Evolution
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Milestones</span>
              </h2>
            </div>
            <div className="relative">
              <div className="timeline-center-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-vare-purple via-vare-purple-light to-transparent md:-translate-x-px opacity-30" />
              <div className="space-y-16">
                {milestones.map((m, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={i} className="timeline-item relative flex items-start gap-10 md:gap-0">
                      <div className="timeline-badge hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-vare-purple border-4 border-[#0a0612] shadow-[0_0_20px_rgba(124,77,187,0.5)]" style={{ opacity: 0 }} />
                      <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}`}>
                        <div className="timeline-card glass-card p-8 hover:bg-white/[0.05] transition-all duration-500 rounded-3xl border-white/5" style={{ opacity: 0 }}>
                          <div className="timeline-content">
                            <div className="text-vare-purple-light font-black text-xs uppercase tracking-[0.3em] mb-3">{m.year}</div>
                            <h3 className="text-xl font-black text-white mb-3 tracking-tight">{m.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-medium">{m.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section ref={awardsRef} className="py-24 sm:py-32 mesh-gradient-purple relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
                <Trophy className="w-4 h-4 mr-2 text-vare-gold" /> Global Impact
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                Awards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Recognition</span>
              </h2>
              <p className="text-white/40 max-w-xl mx-auto text-lg font-medium">
                Our relentless pursuit of excellence has been recognized by the most prestigious institutions in the global digital ecosystem.
              </p>
            </div>
            
            <div className="awards-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
              {awards.map((award, i) => {
                // Optimized bento layout for 6 items:
                // Row 1: [2Cols] [1Col]
                // Row 2: [1Col] [1Col] [1Col]
                // Row 3: [3Cols]
                const isFirst = i === 0;
                const isLast = i === 5;
                const isMiddleRow = i > 1 && i < 5;
                
                return (
                  <div 
                    key={i} 
                    className={`award-card group relative glass-card p-10 hover:bg-white/[0.08] transition-all duration-500 overflow-hidden flex flex-col items-center text-center justify-between rounded-[2.5rem] border-white/5 ${
                      isFirst ? 'md:col-span-2' : isLast ? 'md:col-span-3' : 'md:col-span-1'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-vare-gold/5 to-transparent rounded-bl-full pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vare-purple to-vare-purple-light flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-purple-900/40 mx-auto">
                        <award.Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`${(isFirst || isLast) ? 'text-2xl md:text-3xl' : 'text-xl'} font-black text-white mb-3 tracking-tight leading-tight max-w-sm mx-auto`}>
                        {award.title}
                      </h3>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em]">{award.org}</p>
                    </div>
                    {(isFirst || isLast) && (
                       <div className="pt-6 border-t border-white/5 mt-6 w-full max-w-xs transition-opacity duration-500">
                          <span className="text-vare-gold text-[10px] font-black uppercase tracking-[0.3em]">Honorary Excellence Distinction</span>
                       </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trusted by Industry Leaders - Partners */}
        <section ref={partnersRef} className="py-24 sm:py-32 bg-background overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
            <div className="text-center">
              <span className="partners-header inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6 opacity-0">
                <Shield className="w-4 h-4 mr-2" /> Global Trust
              </span>
              <h2 className="partners-header text-4xl md:text-6xl font-black text-white mb-8 opacity-0 tracking-tighter">
                Trusted by <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Industry Giants</span>
              </h2>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0612] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0612] to-transparent z-10 pointer-events-none" />
            
            <div className="mb-6 group">
              <div className="flex animate-scroll-left gap-6 w-max hover:[animation-play-state:paused]">
                {[...partnersRow1, ...partnersRow1].map((name, i) => (
                  <div key={i} className="flex-shrink-0 flex items-center justify-center px-10 py-6 glass-card rounded-2xl border-white/5 min-w-[180px] hover:border-vare-purple/30 transition-colors duration-500">
                    <span className="text-xl font-black text-white/20 whitespace-nowrap tracking-tighter group-hover:text-white/40 transition-colors uppercase">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="group">
              <div className="flex animate-scroll-right gap-6 w-max hover:[animation-play-state:paused]">
                {[...partnersRow2, ...partnersRow2].map((name, i) => (
                  <div key={i} className="flex-shrink-0 flex items-center justify-center px-10 py-6 glass-card rounded-2xl border-white/5 min-w-[180px] hover:border-vare-gold/30 transition-colors duration-500">
                    <span className="text-xl font-black text-white/20 whitespace-nowrap tracking-tighter group-hover:text-white/40 transition-colors uppercase">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style jsx>{`
            @keyframes scrollLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scrollRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-scroll-left { animation: scrollLeft 40s linear infinite; }
            .animate-scroll-right { animation: scrollRight 40s linear infinite; }
          `}</style>
        </section>

        {/* Culture & Work Environment */}
        <section ref={cultureRef} className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
                <Heart className="w-4 h-4 mr-2" /> Our Spirit
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">VareWeb</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                Where unbridled creativity meets relentless technical discipline.
              </p>
            </div>
            <div className="culture-grid grid grid-cols-1 md:grid-cols-2 gap-8">
              {cultureCards.map((card, i) => (
                <div key={i} className="culture-card group relative glass-card p-12 hover:bg-white/[0.08] transition-all duration-700 overflow-hidden rounded-[3rem] border-white/5">
                  <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-vare-purple/10 to-vare-gold/5 rounded-br-full transition-all duration-700 group-hover:w-64 group-hover:h-64 opacity-50" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-vare-purple transition-all duration-500 border border-white/10">
                      <card.icon className="w-8 h-8 text-vare-purple-light group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{card.title}</h3>
                    <p className="text-white/50 text-base leading-relaxed font-medium">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="glass-card rounded-[4rem] p-12 sm:p-24 border border-white/5 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/10 via-transparent to-vare-gold/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                 <div className="absolute -top-24 -right-24 w-96 h-96 bg-vare-purple/10 blur-[120px] rounded-full" />
                 <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-vare-gold/5 blur-[120px] rounded-full" />
                 
                 <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest mb-10">
                      <Sparkles className="w-4 h-4 text-vare-gold" /> Let&apos;s Architect Your Vision
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
                      Ready to Build <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500">Something Epic?</span>
                    </h2>
                    <p className="text-white/40 text-lg md:text-xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                       From conceptual strategy to elite-tier engineering — we are the team that turns high-stakes digital ambitions into market-leading realities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center items-center">
                       <Link 
                         href="/contact" 
                         className="group relative px-10 py-5 sm:px-14 sm:py-6 gradient-purple text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_60px_rgba(124,77,187,0.4)] transition-all transform hover:-translate-y-2 border border-white/10 overflow-hidden inline-flex items-center justify-center min-w-[240px]"
                       >
                         <span className="relative z-10">Initiate Project</span>
                         <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                       </Link>
                       <Link 
                         href="/careers" 
                         className="px-10 py-5 sm:px-14 sm:py-6 bg-white/5 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all border border-white/5 flex items-center justify-center gap-4 group min-w-[240px]"
                       >
                         Join the Squad <Users className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                    <div className="mt-20 pt-16 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-12">
                       <div className="text-center">
                          <div className="text-4xl font-black text-white tracking-tighter mb-2">15K+</div>
                          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Deployments</p>
                       </div>
                       <div className="text-center">
                          <div className="text-4xl font-black text-white tracking-tighter mb-2">98%</div>
                          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Success Rate</p>
                       </div>
                       <div className="text-center">
                          <div className="text-4xl font-black text-white tracking-tighter mb-2">50+</div>
                          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Designers & Devs</p>
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
