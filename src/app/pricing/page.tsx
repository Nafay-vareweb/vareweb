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
  ArrowRight,
  CheckCircle,
  Sparkles,
  ChevronDown,
  Check,
  X,
  ShieldCheck,
  UserCog,
  Puzzle,
  Headphones,
  FileCheck,
  Phone,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/project',
    desc: 'Perfect for small businesses getting started online.',
    features: ['Custom Website Design', 'Up to 5 Pages', 'Mobile Responsive', 'Contact Form', '1 Month Support', 'Basic SEO Setup'],
    popular: false,
  },
  {
    name: 'Professional',
    price: '$699',
    period: '/project',
    desc: 'Ideal for growing businesses that need more features.',
    features: ['Custom Website Design', 'Up to 15 Pages', 'Mobile Responsive', 'CMS Integration', 'Advanced SEO', '6 Months Support', 'eCommerce Ready', 'Analytics Setup'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$1,499',
    period: '/project',
    desc: 'For established businesses needing a complete solution.',
    features: ['Custom Web Application', 'Unlimited Pages', 'Custom Functionality', 'API Integrations', 'Premium SEO', '12 Months Support', 'Performance Optimization', 'Security Audit', 'Dedicated Manager'],
    popular: false,
  },
];

const comparisonFeatures = [
  { feature: 'Custom Pages', starter: 'Up to 5', professional: 'Up to 15', enterprise: 'Unlimited' },
  { feature: 'Responsive Design', starter: 'check', professional: 'check', enterprise: 'check' },
  { feature: 'SEO Optimization', starter: 'Basic', professional: 'Advanced', enterprise: 'Full Suite' },
  { feature: 'SSL Certificate', starter: 'check', professional: 'check', enterprise: 'check' },
  { feature: 'CMS Integration', starter: false, professional: 'check', enterprise: 'check' },
  { feature: 'Contact Forms', starter: '1 Form', professional: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Analytics', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom Dashboard' },
  { feature: 'Social Media Integration', starter: false, professional: 'check', enterprise: 'check' },
  { feature: 'Email Support', starter: 'check', professional: 'check', enterprise: 'check' },
  { feature: 'Phone Support', starter: false, professional: 'check', enterprise: 'Priority' },
  { feature: 'Revision Rounds', starter: '2', professional: '5', enterprise: 'Unlimited' },
  { feature: 'Delivery Time', starter: '2 Weeks', professional: '3 Weeks', enterprise: '4 Weeks' },
];

const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer: 'Typical project timelines range from 2-8 weeks depending on complexity. A simple 5-page website can be delivered in as little as 5 business days, while complex web applications may take 8-12 weeks. We provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer: 'Yes! All our plans include post-launch support (1 month for Starter, 6 months for Professional, 12 months for Enterprise). We also offer dedicated maintenance packages for ongoing updates, security patches, and performance optimization.',
  },
  {
    question: 'Can I make changes after the project is delivered?',
    answer: 'Absolutely. During your support period, minor revisions and bug fixes are included at no extra cost. For significant changes or new features, we offer competitive hourly rates or can set up a retainer agreement.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We use modern, industry-standard technologies including Next.js, React, TypeScript, Tailwind CSS, and various CMS platforms. For eCommerce, we work with Shopify, WooCommerce, and custom solutions. We choose the best tech stack for each project\'s specific needs.',
  },
  {
    question: 'Do you provide hosting and domain services?',
    answer: 'While we don\'t directly provide hosting, we partner with top-tier hosting providers and can manage your hosting setup, domain configuration, SSL certificates, and DNS management as part of your project.',
  },
  {
    question: 'What is your payment process?',
    answer: 'We typically work with a 50% upfront deposit and 50% upon completion. For larger projects, we can arrange milestone-based payments. We accept credit cards, bank transfers, and PayPal for your convenience.',
  },
];

export default function PricingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);
  const guaranteeRef = useRef<HTMLElement>(null);
  const enterpriseRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
      }

      if (pricingRef.current) {
        gsap.fromTo(
          pricingRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: pricingRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          pricingRef.current.querySelectorAll('.pricing-card'),
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: pricingRef.current.querySelector('.pricing-grid'), start: 'top 80%' } }
        );
      }

      if (comparisonRef.current) {
        gsap.fromTo(
          comparisonRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: comparisonRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          comparisonRef.current.querySelectorAll('.comparison-row'),
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: comparisonRef.current.querySelector('.comparison-table'), start: 'top 80%' } }
        );
      }

      if (guaranteeRef.current) {
        gsap.fromTo(
          guaranteeRef.current.querySelectorAll('.guarantee-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: guaranteeRef.current, start: 'top 75%' } }
        );
      }

      if (enterpriseRef.current) {
        gsap.fromTo(
          enterpriseRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: enterpriseRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          enterpriseRef.current.querySelectorAll('.benefit-card'),
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: enterpriseRef.current.querySelector('.benefit-grid'), start: 'top 80%' } }
        );
      }

      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: faqRef.current, start: 'top 75%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const renderCellValue = (value: string | boolean) => {
    if (value === false) {
      return <X className="w-5 h-5 text-white/20 mx-auto" />;
    }
    if (value === 'check') {
      return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
    }
    return <span className="text-sm text-white/80 font-medium">{value}</span>;
  };

  return (
    <>
      <Navigation />
      <PageDecorations />
      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden mesh-gradient-purple">
          <div className="absolute inset-0 bg-[#0a0612]/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0">
             <div className="absolute top-20 left-10 w-96 h-96 bg-vare-purple/20 rounded-full blur-[120px] animate-pulse" />
             <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-vare-gold/10 rounded-full blur-[150px]" />
          </div>
          <ParticleBackground count={100} interactive={true} zIndex={5} />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="hero-anim inline-flex items-center px-4 py-1.5 rounded-full glass-card border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest mb-8 opacity-0">
              <Sparkles className="w-4 h-4 mr-2 text-vare-gold" /> Investment Plans
            </span>
            <h1 className="hero-anim text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 opacity-0 tracking-tighter leading-[0.9]">
              Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Solutions</span>
            </h1>
            <p className="hero-anim max-w-2xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed opacity-0 font-medium">
              No hidden fees. No legacy constraints. Choose a roadmap that fits your vision and your budget — engineered for growth.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section ref={pricingRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header text-center mb-20 px-4">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Scale</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Every tier is curated to deliver maximum value, from rapid startups to global enterprises.
              </p>
            </div>
            
            <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {pricingPlans.map((plan, i) => {
                const isEnterprise = plan.name === 'Enterprise';
                return (
                  <div
                    key={i}
                    className={`pricing-card relative rounded-[2rem] p-8 lg:p-10 border transition-all duration-700 hover:shadow-2xl flex flex-col ${
                      plan.popular
                        ? 'glass-card-accent border-vare-purple-light/30 shadow-[0_0_40px_rgba(124,77,187,0.2)] scale-105 z-10'
                        : isEnterprise
                        ? 'glass-card border-blue-500/30 hover:shadow-blue-500/5'
                        : 'glass-card border-white/5 hover:border-vare-purple-light/20'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 gradient-purple text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                        Most Popular
                      </div>
                    )}
                    {isEnterprise && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                        Priority Tier
                      </div>
                    )}
                    
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-black text-white tracking-tight">{plan.name}</h3>
                        {isEnterprise && <ShieldCheck className="w-6 h-6 text-blue-400 opacity-50" />}
                        {plan.popular && <Sparkles className="w-5 h-5 text-vare-gold opacity-50" />}
                      </div>
                      <p className="text-white/40 text-sm font-medium leading-relaxed">{plan.desc}</p>
                    </div>

                    <div className="mb-10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                        <span className="text-white/30 text-sm font-bold uppercase tracking-widest">{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-5 mb-12 flex-1">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start text-sm text-white/70 group/item">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3.5 mt-0.5 flex-shrink-0 transition-transform group-hover/item:scale-110 ${
                            isEnterprise ? 'bg-blue-500/10' : 'bg-emerald-500/10'
                          }`}>
                            <Check className={`w-3 h-3 ${isEnterprise ? 'text-blue-400' : 'text-emerald-500'}`} />
                          </div>
                          <span className="group-hover/item:text-white transition-colors leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className={`group relative w-full text-center py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${
                        plan.popular
                          ? 'gradient-purple text-white hover:shadow-[0_20px_40px_rgba(124,77,187,0.3)] transform hover:-translate-y-1.5'
                          : isEnterprise
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transform hover:-translate-y-1.5'
                          : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="relative z-10">{isEnterprise ? 'Speak to Sales' : 'Get Started Now'}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section ref={comparisonRef} className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
                Direct Comparison
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                Full Feature <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Breakdown</span>
              </h2>
            </div>

            <div className="comparison-table hidden md:block glass-card rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/5">
                      <th className="py-8 px-10 text-left text-xs font-black uppercase tracking-[0.3em] text-white/30 w-1/3">Feature</th>
                      <th className="py-8 px-6 text-center text-xs font-black uppercase tracking-[0.3em] text-white/50">Starter</th>
                      <th className="py-8 px-6 text-center text-xs font-black uppercase tracking-[0.3em] text-vare-purple-light bg-vare-purple/5">Professional</th>
                      <th className="py-8 px-10 text-center text-xs font-black uppercase tracking-[0.3em] text-blue-400">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {comparisonFeatures.map((row, i) => (
                      <tr key={row.feature} className="group/row hover:bg-white/[0.03] transition-colors">
                        <td className="py-6 px-10 text-sm font-bold text-white/80 group-hover/row:text-white transition-colors">{row.feature}</td>
                        <td className="py-6 px-6 text-center">{renderCellValue(row.starter)}</td>
                        <td className="py-6 px-6 text-center bg-vare-purple/[0.02] group-hover/row:bg-vare-purple/[0.05] transition-colors">{renderCellValue(row.professional)}</td>
                        <td className="py-6 px-10 text-center">{renderCellValue(row.enterprise)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-8">
               {pricingPlans.map(plan => (
                 <div key={plan.name} className="glass-card rounded-3xl border border-white/5 overflow-hidden">
                    <div className={`p-6 ${plan.popular ? 'gradient-purple' : 'bg-white/5'}`}>
                       <h3 className="text-xl font-black text-white tracking-widest uppercase">{plan.name}</h3>
                    </div>
                    <div className="p-4 space-y-4">
                       {comparisonFeatures.map(row => (
                         <div key={row.feature} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <span className="text-xs text-white/40 font-bold uppercase">{row.feature}</span>
                            <span>{renderCellValue(plan.name === 'Starter' ? row.starter : plan.name === 'Professional' ? row.professional : row.enterprise)}</span>
                         </div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Satisfaction Guarantee Banner */}
        <section ref={guaranteeRef} className="py-24 sm:py-32 relative overflow-hidden bg-[#0a0612]">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="glass-card rounded-[3rem] p-8 md:p-16 border border-white/5 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64" />
                
                <div className="lg:w-1/2 text-center lg:text-left relative z-10">
                   <div className="guarantee-anim w-24 h-24 rounded-[2rem] gradient-purple flex items-center justify-center mb-10 mx-auto lg:mx-0 shadow-2xl shadow-purple-500/30">
                      <ShieldCheck className="w-10 h-10 text-white" />
                   </div>
                   <h2 className="guarantee-anim text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                     Your Success <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Guaranteed.</span>
                   </h2>
                   <p className="guarantee-anim text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                     We don&apos;t just build websites; we build partnerships. If you&apos;re not thrilled with your launch within 30 days, we issue a full refund. No questions, no friction.
                   </p>
                </div>

                <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {[
                      { icon: ShieldCheck, title: 'Risk-Free 30 Days', desc: 'Full refund if expectations aren\'t met.', colorClass: 'bg-emerald-500/10' },
                      { icon: CheckCircle, title: 'No Hidden Costs', desc: 'What we quote is exactly what you pay.', colorClass: 'bg-vare-purple/10' },
                      { icon: Sparkles, title: 'Premium Revisions', desc: 'Refinement until it is perfect for you.', colorClass: 'bg-vare-gold/10' },
                      { icon: Headphones, title: 'Lifetime Care', desc: 'We stay with you long after the launch.', colorClass: 'bg-blue-500/10' }
                    ].map((item, i) => (
                      <div key={i} className="guarantee-anim p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">
                         <div className={`w-12 h-12 rounded-xl ${item.colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-6 h-6 text-white/80" />
                         </div>
                         <h4 className="text-white font-black text-base mb-2 tracking-tight">{item.title}</h4>
                         <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                </div>
             </div>
          </div>
        </section>

        {/* Enterprise Custom Solutions */}
        <section ref={enterpriseRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vare-purple/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="section-header text-center mb-16 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-vare-gold/10 text-vare-gold text-xs font-bold uppercase tracking-widest mb-6 border border-vare-gold/20">
                Enterprise Grade
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Empire</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                Unlock full-scale digital transformation with custom-engineered solutions designed 
                specifically for institutional growth and global scalability.
              </p>
            </div>

            <div className="benefit-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Feature 1: Large Card */}
              <div className="benefit-card md:col-span-2 glass-card rounded-3xl p-8 lg:p-12 border border-white/5 hover:border-vare-gold/20 transition-all duration-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-vare-gold/5 blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-vare-gold/10 flex items-center justify-center text-vare-gold border border-vare-gold/20">
                      <Puzzle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Custom Integrations</h3>
                      <p className="text-vare-gold/60 text-xs font-bold uppercase tracking-widest">Architectural Engineering</p>
                    </div>
                  </div>
                  <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
                    Tailored third-party integrations with your existing enterprise ecosystem — from complex CRMs 
                    and ERPs to proprietary payment gateways and custom API layers. We build the bridge 
                    between your data and your vision.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['ERP Sync', 'Custom APIs', 'Legacy Migration', 'Security Layer'].map((tag) => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-bold uppercase tracking-tight">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature 2: Side Card */}
              <div className="benefit-card glass-card rounded-3xl p-8 lg:p-10 border border-white/5 hover:border-vare-purple-light/20 transition-all duration-700 flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-vare-purple/10 flex items-center justify-center text-vare-purple-light mb-8 border border-vare-purple/20 group-hover:scale-110 transition-transform">
                    <UserCog className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Dedicated Manager</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    A personal strategist who coordinates your roadmap, ensuring every milestone aligns with your corporate objectives.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5">
                   <div className="flex -space-x-3 mb-4">
                      {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0612] bg-gray-800" />)}
                      <div className="w-10 h-10 rounded-full border-2 border-[#0a0612] bg-vare-purple flex items-center justify-center text-[10px] font-bold">+5</div>
                   </div>
                   <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Available 24/7 Priority</p>
                </div>
              </div>

              {/* Feature 3: Side Card */}
              <div className="benefit-card glass-card rounded-3xl p-8 lg:p-10 border border-white/5 hover:border-blue-400/20 transition-all duration-700 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <FileCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">SLA Guarantee</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Iron-clad Service Level Agreements guaranteeing 99.9% uptime and rigorous performance benchmarks.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-white/40 text-xs font-bold">100% Performance Audit</span>
                </div>
              </div>

              {/* Feature 4: Large Horizontal Card */}
              <div className="benefit-card md:col-span-2 glass-card rounded-3xl p-8 lg:p-12 border border-white/5 hover:border-vare-purple-light/20 transition-all duration-700 relative overflow-hidden group">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-vare-purple/10 blur-[100px] pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-10">
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-vare-purple/10 flex items-center justify-center text-vare-purple-light mb-8 border border-vare-purple/20">
                      <Headphones className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">VIP Priority Support</h3>
                    <p className="text-white/50 text-base leading-relaxed mb-8">
                       Skip the queue with a direct hotline to our senior engineering team. 
                       Enterprise-exclusive response windows and dedicated emergency protocols.
                    </p>
                  </div>
                  <div className="lg:w-72">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                       <div className="flex items-center justify-between text-xs">
                          <span className="text-white/40 font-bold uppercase">Response Time</span>
                          <span className="text-vare-purple-light font-bold">{'<'} 30 Mins</span>
                       </div>
                       <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-vare-purple-light h-full w-[95%]" />
                       </div>
                       <div className="flex items-center justify-between text-xs pt-2">
                          <span className="text-white/40 font-bold uppercase">Up-time</span>
                          <span className="text-emerald-400 font-bold">99.99%</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-20">
              <div className="inline-flex flex-col items-center">
                 <Link
                  href="/contact"
                  className="group relative inline-flex items-center px-12 py-5 text-lg font-black text-white gradient-purple rounded-2xl hover:shadow-[0_0_50px_rgba(124,77,187,0.4)] transform hover:-translate-y-1 transition-all duration-500 border border-white/10"
                >
                  <span className="relative z-10">Consult with Architects</span>
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <p className="mt-6 text-white/30 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                   <Phone className="w-4 h-4" /> Priority Line: +1 659 200 6383
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} className="py-24 sm:py-32 mesh-gradient-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header text-center mb-16">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6">
                Direct Answers
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Questions</span>
              </h2>
            </div>
            <div className="glass-card rounded-[2.5rem] border border-white/5 overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="px-10 border-b border-white/[0.04] last:border-b-0 group">
                    <AccordionTrigger className="text-left text-white/80 font-bold hover:text-white hover:no-underline py-8 text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/40 text-base leading-relaxed pb-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="glass-card rounded-[3rem] p-10 sm:p-20 border border-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/5 to-transparent pointer-events-none" />
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Ready to <span className="text-vare-purple-light">Launch?</span></h2>
                 <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                   Every project starts with a single conversation. Whether you need a simple landing page or a complex digital ecosystem, we have the expertise to bring it to life.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href="/contact" className="px-12 py-5 gradient-purple text-white font-black text-base uppercase tracking-widest rounded-2xl hover:shadow-[0_20px_40px_rgba(124,77,187,0.3)] transition-all transform hover:-translate-y-1 border border-white/10">
                      Start Your Project
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
