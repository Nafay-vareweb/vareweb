'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);
  const isHovering = useRef(false);
  const isViewMode = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === 'undefined') return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Lerp function for smooth following
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Animation loop
    const animate = () => {
      if (dotRef.current && ringRef.current) {
        // Dot follows mouse exactly
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`;

        // Ring follows with smooth lerp
        ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.15);
        ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.15);

        const ringSize = isHovering.current ? 60 : isViewMode.current ? 56 : 40;
        const offset = ringSize / 2;

        ringRef.current.style.transform = `translate3d(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px, 0)`;
        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;

        if (isViewMode.current) {
          ringRef.current.style.borderColor = 'rgba(58, 26, 112, 0.6)';
          ringRef.current.style.background = 'rgba(58, 26, 112, 0.08)';
        } else if (isHovering.current) {
          ringRef.current.style.borderColor = 'rgba(58, 26, 112, 0.4)';
          ringRef.current.style.background = 'rgba(58, 26, 112, 0.05)';
        } else {
          ringRef.current.style.borderColor = 'rgba(58, 26, 112, 0.3)';
          ringRef.current.style.background = 'transparent';
        }

        rafId.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, summary');
      const isPortfolio = target.closest('.portfolio-card, .video-card, .summary-icon');

      if (isPortfolio) {
        isViewMode.current = true;
        isHovering.current = false;
      } else if (isInteractive) {
        isHovering.current = true;
        isViewMode.current = false;
      } else {
        isHovering.current = false;
        isViewMode.current = false;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot - follows exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#3a1a70',
          mixBlendMode: 'difference',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Outer ring - follows with delay */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] opacity-0"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1.5px solid rgba(58, 26, 112, 0.3)',
          mixBlendMode: 'difference',
          transition: 'width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease, background 0.3s ease, opacity 0.3s ease',
          willChange: 'transform, width, height',
        }}
        aria-hidden="true"
      />
    </>
  );
}
