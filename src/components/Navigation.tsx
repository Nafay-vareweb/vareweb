'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Web Design', href: '/services/custom-web-design' },
      { name: 'Mobile Apps', href: '/services/mobile-app-development' },
      { name: 'SEO Optimization', href: '/services/search-engine-optimization' },
      { name: 'GHL Automation', href: '/services/ghl-development' },
      { name: 'eCommerce', href: '/services/ecommerce-development' },
      { name: 'Digital Marketing', href: '/services/digital-marketing' },
    ],
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    children: [
      { name: 'Websites', href: '/portfolio?filter=Web Design' },
      { name: 'Branding', href: '/portfolio?filter=Branding' },
      { name: 'eCommerce', href: '/portfolio?filter=eCommerce' },
    ],
  },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
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
            ? 'bg-[#0a0612]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-white/5' 
            : 'bg-transparent'
        }`} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10 gradient-purple rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">V</span>
                <div className="absolute inset-0 gradient-purple rounded-lg opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />
              </div>
              <div>
                <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'}`}>
                  Vare<span className={scrolled ? 'text-vare-purple-light' : 'text-vare-purple-light'}>Web</span>
                </span>
              </div>
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
                    className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-1 transition-all duration-200 hover:bg-white/10 ${
                      scrolled
                        ? 'text-white/80 hover:text-vare-purple-light hover:bg-white/[0.06]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {link.children && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-[#12081f]/95 backdrop-blur-xl rounded-xl shadow-xl shadow-black/20 border border-white/[0.08] overflow-hidden animate-[scaleIn_0.2s_ease-out] origin-top">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-white/80 hover:bg-white/[0.06] hover:text-vare-purple-light transition-colors duration-200"
                        >
                          {child.name}
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
              className="hidden lg:inline-flex px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white gradient-purple rounded-xl hover:shadow-[0_0_30px_rgba(124,77,187,0.4)] transform hover:-translate-y-1 transition-all duration-300 items-center justify-center border border-white/10"
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
                      <span>{link.name}</span>
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
                      {link.name}
                    </Link>
                  )}
                  {link.children && mobileAccordion === link.name && (
                    <div className="ml-4 mt-1 space-y-1 overflow-hidden">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-vare-purple hover:bg-vare-purple/10 rounded-lg transition-colors duration-200"
                      >
                        All Services →
                      </Link>
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors duration-200"
                        >
                          {child.name}
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
