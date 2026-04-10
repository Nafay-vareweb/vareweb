'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 200);
        },
      });

      // Phase 1: Logo image scales in with bounce
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0, rotation: -10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' }
    );

    // Phase 2: "vareweb" text letter-by-letter reveal
    const chars = Array.from(textRef.current?.querySelectorAll('.vare-char') ?? []);
    if (chars.length > 0) {
      tl.fromTo(
        chars,
        { opacity: 0, y: 20, skewX: -8 },
        {
          opacity: 1, y: 0, skewX: 0,
          duration: 0.3,
          stagger: 0.06,
          ease: 'back.out(2)',
        },
        '-=0.3'
      );
    }

    // Phase 3: Tagline fade in
    tl.fromTo(
      taglineRef.current,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
      '-=0.05'
    );

    // Phase 4: Shine sweep across text
    tl.fromTo(
      shineRef.current,
      { x: '-100%', opacity: 1 },
      { x: '300%', opacity: 0, duration: 0.5, ease: 'power2.inOut' },
      '-=0.2'
    );

    // Phase 5: Progress bar fill
    tl.fromTo(
      progressBarRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
      '-=0.15'
    );

      // Phase 6: Slide up and out
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
        delay: 0.15,
      });
    }, loaderRef);

    // Safety: restore overflow if component unmounts before timeline completes
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      ctx.revert(); // Let GSAP cleanly revert everything!
    };
  }, [onComplete]);

  if (isComplete) return null;

  const brandText = 'vareweb';

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gradient-purple-dark overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo image */}
        <div ref={logoRef} className="relative opacity-0 mb-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <Image
              src="/vareweb-logo.png"
              alt="VareWeb Logo"
              fill
              priority
              className="object-contain"
              sizes="96px"
            />
          </div>
        </div>

        {/* "vareweb" handwriting text */}
        <div className="relative mb-3 overflow-hidden">
          <div ref={textRef} className="flex items-center">
            {brandText.split('').map((char, i) => (
              <span
                key={i}
                className="vare-char inline-block text-3xl sm:text-4xl font-extralight tracking-[0.18em] text-white"
                style={{
                  opacity: 0,
                  fontStyle: 'italic',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  textShadow: '0 0 25px rgba(255,255,255,0.12)',
                }}
              >
                {char}
              </span>
            ))}
          </div>
          {/* Shine sweep */}
          <div
            ref={shineRef}
            className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="opacity-0">
          <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">
            Creative Digital Studio
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-36 sm:w-44">
        <div className="h-[1.5px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-vare-purple-light to-vare-gold rounded-full origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <p className="text-white/30 text-[10px] text-center mt-3 tracking-[0.3em] uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
