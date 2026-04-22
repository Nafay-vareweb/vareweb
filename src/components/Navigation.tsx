'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { Menu, X, ChevronDown, Home, User, Layers, Grid, Tag, FileText, Briefcase, Monitor, Smartphone, Search, Zap, ShoppingCart, Megaphone, Globe, PenTool } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  {
    name: 'Services',
    href: '/services',
    icon: Layers,
    children: [
      { name: 'Web Design', href: '/services/custom-web-design', icon: Monitor },
      { name: 'Mobile Apps', href: '/services/mobile-app-development', icon: Smartphone },
      { name: 'SEO Optimization', href: '/services/search-engine-optimization', icon: Search },
      { name: 'GHL Automation', href: '/services/ghl-development', icon: Zap },
      { name: 'eCommerce', href: '/services/ecommerce-development', icon: ShoppingCart },
      { name: 'Digital Marketing', href: '/services/digital-marketing', icon: Megaphone },
    ],
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: Grid,
    children: [
      { name: 'Websites', href: '/portfolio?filter=Web Design', icon: Globe },
      { name: 'Branding', href: '/portfolio?filter=Branding', icon: PenTool },
      { name: 'eCommerce', href: '/portfolio?filter=eCommerce', icon: ShoppingCart },
    ],
  },
  { name: 'Pricing', href: '/pricing', icon: Tag },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Careers', href: '/careers', icon: Briefcase },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { x: '100%', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    }
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-auto transition-all duration-500 opacity-0 ${
          scrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        <div className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
          scrolled 
            ? 'bg-[#fff]/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] border-b border-white/5' 
            : 'bg-transparent'
        }`} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo (bare image) */}
            <Link href="/" className="group">
              <Image src="/logo.png" alt="VareWeb logo" width={80} height={80} className="object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-1 transition-all duration-200 hover:bg-white/10 decoration-vare-purple ${
                      scrolled
                        ? 'text-white hover:text-vare-purple-dark hover:bg-white/[0.06]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.icon && React.createElement(link.icon, { className: 'w-4 h-4 text-white/80' })}
                    <span>{link.name}</span>
                    {link.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {link.children && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-[#12081f]/95 backdrop-blur-xl rounded-xl shadow-xl shadow-black/20 border border-white/[0.08] overflow-hidden animate-[scaleIn_0.2s_ease-out] origin-top">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/[0.06] hover:text-vare-purple-light transition-colors duration-200 hover:underline underline-offset-4 decoration-vare-purple"
                        >
                          {child.icon && React.createElement(child.icon, { className: 'w-4 h-4 text-white/70' })}
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white gradient-purple rounded-xl hover:shadow-[0_0_30px_rgba(124,77,187,0.4)] transform hover:-translate-y-1 transition-all duration-300 items-center justify-center border border-white/100"
            >
              Get a Quote
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                scrolled ? 'text-white hover:bg-white/[0.06]' : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[99] bg-[#0a0612]/95 backdrop-blur-xl lg:hidden overflow-y-auto"
        >
          <div className="pt-32 px-6 pb-8">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <div key={link.name}>
                  {link.children ? (
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === link.name ? null : link.name)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                        mobileAccordion === link.name
                          ? 'text-vare-purple-light bg-white/[0.06]'
                          : 'text-white/80 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {link.icon && React.createElement(link.icon, { className: 'w-5 h-5' })}
                        <span>{link.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          mobileAccordion === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors duration-200"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {link.icon && React.createElement(link.icon, { className: 'w-5 h-5' })}
                        <span>{link.name}</span>
                      </div>
                    </Link>
                  )}
                  {link.children && mobileAccordion === link.name && (
                    <div className="ml-4 mt-1 space-y-1 overflow-hidden">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-vare-purple hover:bg-vare-purple/10 rounded-lg transition-colors duration-200"
                      >
                        {link.name === 'Portfolio' ? 'View Portfolio →' : 'All Services →'}
                      </Link>
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors duration-200"
                        >
                          {child.icon && React.createElement(child.icon, { className: 'w-4 h-4 text-white/60' })}
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 text-white gradient-purple rounded-lg font-medium"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
