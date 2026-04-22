"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, ArrowUp, Facebook, Twitter, Linkedin, Instagram, Send, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  coreServices: [
    { name: 'Custom Web Design', href: '/services/custom-web-design' },
    { name: 'Mobile App Development', href: '/services/mobile-app-development' },
    { name: 'eCommerce Stores', href: '/services/ecommerce-development' },
    { name: 'Custom Software', href: '/services/custom-software-development' },
    { name: 'UX/UI Design', href: '/services/ux-ui-design' },
    { name: 'Website Redesign', href: '/services/website-redesign' },
  ],
  growthHub: [
    { name: 'SEO & Rankings', href: '/services/search-engine-optimization' },
    { name: 'GHL Automation', href: '/services/ghl-development' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'Social Media', href: '/services/social-media-management' },
    { name: 'Brand Identity', href: '/services/brand-identity-design' },
    { name: 'Content Strategy', href: '/services/content-writing-strategy' },
  ],
  company: [
    { name: 'Who We Are', href: '/about' },
    { name: 'Our Work', href: '/portfolio' },
    { name: 'Pricing Plans', href: '/pricing' },
    { name: 'Insights & Blog', href: '/blog' },
    { name: 'Get In Touch', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current.querySelectorAll('.footer-animate'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const btn = document.getElementById('scroll-top-btn');
    if (btn) {
      btn.addEventListener('click', scrollToTop);
    }
    return () => {
      if (btn) btn.removeEventListener('click', scrollToTop);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative bg-[#080410] text-white overflow-hidden border-t border-white/5 pb-12 pt-24">
      {/* Decorative gradients */}
      <div className="absolute inset-0 mesh-gradient-dark opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[#080410]/40 backdrop-blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vare-purple-light/30 to-transparent" />

      {/* Main Footer */}
      <div className="relative z-10 max-w-8xl mx-auto px-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-y-6 gap-x-4">
          
          {/* Column 1: Brand & Socials */}
          <div className="footer-animate">
            <Link href="/" className="mb-8 inline-block group">
              <Image src="/logo.png" alt="VareWeb logo" width={100} height={100} className="object-contain" />
            </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Award-winning digital agency delivering creative branding, stunning websites,
              and automated growth solutions that drive real results for businesses worldwide.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-vare-purple transition-all duration-500 hover:shadow-[0_0_16px_rgba(91,45,158,0.3)]"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Build */}
          <div className="footer-animate">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6">
               Core Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.coreServices.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-vare-purple-light text-xs font-medium transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Growth & Info */}
          <div className="footer-animate">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6">
               Growth Hub
            </h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.growthHub.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-vare-purple-light text-xs font-medium transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="footer-animate">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6">
               Resources
            </h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white text-xs font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter & Contact */}
          <div className="footer-animate">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6">
               Reach Our HQ
            </h3>
            <ul className="space-y-5 mb-10">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center flex-shrink-0 border border-white/5 circle-icon">
                  <MapPin className="w-4 h-4 text-vare-purple-light" />
                </div>
                <span className="text-white/60 text-sm leading-relaxed">5400 Preston Oaks Rd, Dallas, TX 75254, USA</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center flex-shrink-0 border border-white/5 circle-icon">
                  <Mail className="w-4 h-4 text-vare-purple-light" />
                </div>
                <a href="mailto:contact@vareweb.com" className="text-white/60 hover:text-white text-sm font-medium transition-colors">
                  contact@vareweb.com
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center flex-shrink-0 border border-white/5 circle-icon">
                  <Phone className="w-4 h-4 text-vare-purple-light" />
                </div>
                <a href="tel:+1234567890" className="text-white/60 hover:text-white text-sm font-medium transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>

            <div className="p-4 rounded-2xl glass-card border border-white/10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-vare-gold" />
                 Stay Informed
               </h4>
               <p className="text-white/40 text-xs mb-4 leading-relaxed">
                 Join our newsletter to receive the latest updates and digital insights.
               </p>
               <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
                 <input
                   type="email"
                   placeholder="Enter email"
                   className="flex-1 bg-[#0a0612] border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-vare-purple-light transition-all placeholder:text-white/20"
                 />
                 <button className="ml-3 p-2 rounded-lg bg-vare-purple hover:bg-vare-purple-light text-white transition-all shadow-lg active:scale-95">
                   <Send className="w-4 h-4" />
                 </button>
               </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex flex-col items-center md:items-start">
             <p className="text-white/20 text-xs font-medium">
               &copy; {new Date().getFullYear()} VareWeb. All Rights Reserved.
             </p>
             <div className="flex items-center space-x-4 mt-2">
                {footerLinks.legal.map(link => (
                  <Link key={link.name} href={link.href} className="text-white/20 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors">
                    {link.name}
                  </Link>
                ))}
             </div>
          </div>
          
          <div className="flex items-center space-x-8">
             <p className="text-white/20 text-xs font-medium flex items-center">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
               Systems Operational
             </p>
             <p className="text-white/20 text-xs font-medium italic">
               Crafted with passion &amp; precision.
             </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        id="scroll-top-btn"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-[90] w-14 h-14 gradient-purple rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-2 transition-all duration-500 border border-white/10 backdrop-blur-sm"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
}
