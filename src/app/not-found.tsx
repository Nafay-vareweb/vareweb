'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';

export default function NotFound() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.skeleton-img',
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }
      );

      tl.fromTo(
        '.error-code',
        { y: 20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      tl.fromTo(
        '.error-title',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

      tl.fromTo(
        '.error-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

      tl.fromTo(
        '.error-actions',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <ParticleBackground count={60} interactive={true} zIndex={5} theme="light" />
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/[0.03] rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(58,26,112,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,26,112,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Skeleton Image */}
        <div className="skeleton-img mb-8 flex justify-center">
          <div className="relative w-[380px] h-[320px] sm:w-[320px] sm:h-[360px]">
            <Image
              src="/404-skelly.webp"
              alt="Page not found skeleton illustration"
              fill
              priority
              className="object-contain drop-shadow-lg"
              sizes="(max-width: 840px) 480px, 420px"
            />
          </div>
        </div>

        {/* Error Code */}
        <div className="error-code mb-4">
          <span className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-400 leading-none">
            404
          </span>
        </div>

        {/* Title */}
        <h1 className="error-title text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="error-desc text-slate-600 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          Oops! The page you are looking for seems to have wandered off into the digital void. It might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div className="error-actions flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-vare-purple rounded-xl hover:bg-vare-purple-light hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-vare-purple bg-slate-200/50 border border-slate-200 rounded-xl hover:border-vare-purple/30 hover:bg-slate-200 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-medium">Popular Pages</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Services', href: '/services' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
              { label: 'Careers', href: '/careers' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-vare-purple hover:border-vare-purple/30 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
