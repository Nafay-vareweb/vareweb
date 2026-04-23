'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    let touchStartY = 0;
    let mouseStartY = 0;
    let isDragging = false;
    const dragThreshold = 50; // pixels to drag before triggering

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Typing animation for "Vareweb"
      const text = "Vareweb";
      let currentText = "";
      const typeSpeed = 0.1;

      tl.to({}, { duration: 0.5 }); // Initial delay

      for (let i = 0; i < text.length; i++) {
        tl.call(() => {
          currentText += text[i];
          if (textRef.current) textRef.current.textContent = currentText;
        }, [], `+=${typeSpeed}`);
      }

      // Fade in scroll hint
      tl.fromTo(scrollHintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.6, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      // Animate arrow bounce
      const arrowElement = scrollHintRef.current?.querySelector('.arrow');
      if (arrowElement) {
        gsap.to(arrowElement, {
          y: 5,
          duration: 1,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

    }, loaderRef);

    // Scroll event listener
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      animateOut();
    };

    // Touch event listeners
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === 0) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      if (Math.abs(deltaY) > dragThreshold) {
        e.preventDefault();
        animateOut();
      }
    };

    // Mouse event listeners
    const handleMouseDown = (e: MouseEvent) => {
      mouseStartY = e.clientY;
      isDragging = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || mouseStartY === 0) return;
      const currentY = e.clientY;
      const deltaY = mouseStartY - currentY;
      if (Math.abs(deltaY) > dragThreshold) {
        animateOut();
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      mouseStartY = 0;
    };

    const animateOut = () => {
      gsap.to(loaderRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          onComplete?.();
        }
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      ctx.revert();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0612] select-none"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Brand Name */}
      <div
        ref={textRef}
        className="text-6xl md:text-8xl font-bold italic text-white mb-8"
        style={{ willChange: 'contents' }}
      >
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 flex flex-col items-center text-white/50 text-sm font-medium"
        style={{ willChange: 'transform, opacity' }}
      >
        <span>Scroll to view</span>
        <div className="arrow mt-2 w-6 h-6 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l3 3 3-3"></path>
            <path d="M7 6l3 3 3-3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
