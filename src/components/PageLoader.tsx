'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const backdrop1Ref = useRef<HTMLDivElement>(null);
  const backdrop2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          onComplete?.();
        }
      });

      const loadingObj = { value: 0 };

      // Entrance: logo scales + blooms in
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.75, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power4.out' }
      );

      // Entrance: stagger remaining UI elements
      tl.fromTo('.ldr-el',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' },
        '-=0.5'
      );


      // Simulate load progress
      tl.to(loadingObj, {
        value: 100,
        duration: 2.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.floor(loadingObj.value);
          if (percentRef.current) percentRef.current.textContent = `${val}`;
          if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${val / 100})`;
        }
      }, '-=0.3');

      // Exit: content fades out upward
      tl.to([logoRef.current, '.ldr-el'], {
        y: -24,
        opacity: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.in'
      });

      // Exit: backdrop wipes upward (reveals page)
      tl.to([backdrop2Ref.current, backdrop1Ref.current], {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.inOut'
      }, '-=0.1');

    }, loaderRef);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Layered backdrops for staggered wipe */}
      <div ref={backdrop1Ref} className="absolute inset-0 bg-[#0a0612]" />
      <div ref={backdrop2Ref} className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #100824 0%, #0a0612 60%, #160930 100%)' }}
      />

      {/* Ambient glow orb — boosted for visibility */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(124,77,187,0.12) 45%, transparent 70%)' }}
      />

      {/* Main layout */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-8 sm:px-14 py-10 sm:py-14">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between">
          <span className="ldr-el text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
            Digital Studio
          </span>
          <span className="ldr-el text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
            Est. 2024
          </span>
        </div>

        {/* ── Centre: Logo + tagline ── */}
        <div className="flex flex-col items-center gap-6">
          {/* Logo with glowing halo */}
          <div
            ref={logoRef}
            className="relative flex items-center justify-center"
          >
            {/* Outer halo ring */}
            <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(124,77,187,0.08) 55%, transparent 75%)',
                boxShadow: '0 0 60px 20px rgba(139,92,246,0.18)',
              }}
            />
            <Image
              src="/vareweb-logo.png"
              alt="VareWeb"
              width={180}
              height={180}
              priority
              className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative z-10"
              style={{ filter: 'brightness(1.15) drop-shadow(0 0 18px rgba(167,139,250,0.55))' }}
            />
          </div>

          {/* Tagline */}
          <p className="ldr-el text-white/70 text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-center">
            Precision-engineered digital experiences
          </p>
        </div>

        {/* ── Bottom: counter + progress bar ── */}
        <div className="space-y-4">
          {/* Counter row */}
          <div className="ldr-el flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <div
                ref={percentRef}
                className="text-4xl sm:text-5xl font-black tabular-nums leading-none text-white"
              >
                0
              </div>
              <span className="text-lg font-black text-vare-purple-light leading-none mb-0.5">%</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
              Loading
            </span>
          </div>

          {/* Progress bar */}
          <div className="ldr-el h-[1.5px] w-full bg-white/10 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full origin-left w-full"
              style={{
                background: 'linear-gradient(90deg, #5b2d9e, #a78bfa, #f59e0b)',
                transform: 'scaleX(0)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 100%, rgba(124,77,187,0.1) 0%, transparent 60%)' }}
      />
    </div>
  );
}
