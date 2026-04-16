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
  const isOnLight = useRef(false);
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

    // Helper: parse rgb/rgba/hex color strings
    const parseColor = (col: string): { r: number; g: number; b: number; a: number } | null => {
      if (!col) return null;
      col = col.trim();
      if (col.startsWith('rgb')) {
        const m = col.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const parts = m[1].split(',').map((s) => s.trim());
        const r = parseInt(parts[0], 10);
        const g = parseInt(parts[1], 10);
        const b = parseInt(parts[2], 10);
        const a = parts[3] ? parseFloat(parts[3]) : 1;
        return { r, g, b, a };
      }
      if (col.startsWith('#')) {
        let hex = col.slice(1);
        if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
        if (hex.length !== 6) return null;
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return { r, g, b, a: 1 };
      }
      return null;
    };

    // Find the first non-transparent background up the DOM tree
    const findEffectiveBackground = (el: HTMLElement | null): string | null => {
      let node: HTMLElement | null = el;
      while (node && node !== document.documentElement) {
        const style = window.getComputedStyle(node);
        const bg = style.backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'initial') {
          const parsed = parseColor(bg);
          if (parsed) {
            if (parsed.a === undefined || parsed.a >= 0.3) {
              return bg;
            }
          }
        }
        node = node.parentElement;
      }
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      return bodyBg || null;
    };

    const isLightColor = (col: string | null) => {
      if (!col) return false;
      const p = parseColor(col);
      if (!p) return false;
      const brightness = (p.r * 299 + p.g * 587 + p.b * 114) / 1000;
      return brightness > 150;
    };

    // Animation loop
    const animate = () => {
      if (dotRef.current && ringRef.current) {
        // Dot follows mouse exactly
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 5}px, ${mouse.current.y - 5}px, 0)`;

        // Ring follows with smooth lerp
        ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.15);
        ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.15);

        const ringSize = isHovering.current ? 60 : isViewMode.current ? 56 : 40;
        const offset = ringSize / 2;

        ringRef.current.style.transform = `translate3d(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px, 0)`;
        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;

        // Determine dot & ring colors; if cursor is over a light background, prefer dark cursor
        const onLight = isOnLight.current;

        // Dot color + glow
        if (onLight) {
          dotRef.current.style.backgroundColor = '#0a0612';
          dotRef.current.style.boxShadow = '0 0 8px rgba(0,0,0,0.6)';
        } else {
          dotRef.current.style.backgroundColor = '#ffffff';
          dotRef.current.style.boxShadow = '0 0 8px rgba(167,139,250,0.9)';
        }

        // Ring styles depend on interaction + background
        if (isViewMode.current) {
          ringRef.current.style.borderColor = onLight ? 'rgba(0,0,0,0.6)' : 'rgba(167, 139, 250, 0.95)';
          ringRef.current.style.background = onLight ? 'rgba(0,0,0,0.06)' : 'rgba(167, 139, 250, 0.06)';
        } else if (isHovering.current) {
          ringRef.current.style.borderColor = onLight ? 'rgba(0,0,0,0.6)' : 'rgba(124, 77, 187, 0.95)';
          ringRef.current.style.background = onLight ? 'rgba(0,0,0,0.04)' : 'rgba(124, 77, 187, 0.06)';
        } else {
          ringRef.current.style.borderColor = onLight ? 'rgba(0,0,0,0.75)' : 'rgba(255, 255, 255, 0.75)';
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

      // also check underlying element for light backgrounds for more accurate switching while moving
      try {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        const bg = findEffectiveBackground(el);
        isOnLight.current = isLightColor(bg);
      } catch (err) {
        // ignore
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      isOnLight.current = false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, summary');
      const isPortfolio = target.closest('.portfolio-card, .video-card, .summary-icon');
      // determine interactive/view mode
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

      // detect if the cursor is over a light/white background so we can invert colors
      try {
        const bg = findEffectiveBackground(target);
        isOnLight.current = isLightColor(bg);
      } catch (err) {
        isOnLight.current = false;
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
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 8px rgba(167,139,250,0.9)',
          transition: 'opacity 0.25s ease, transform 0.08s linear',
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
          border: '1.5px solid rgba(255,255,255,0.75)',
          boxShadow: '0 4px 18px rgba(124,77,187,0.12)',
          transition: 'width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.2s ease, background 0.2s ease, opacity 0.25s ease',
          willChange: 'transform, width, height',
        }}
        aria-hidden="true"
      />
    </>
  );
}
