'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Zap, Users, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 500, label: 'Projects Delivered', icon: Target, color: '#5b2d9e', unit: '+' },
  { value: 98, label: 'Client Satisfaction', icon: Users, color: '#3b82f6', unit: '%' },
  { value: 45, label: 'Performance Score', icon: Zap, color: '#f59e0b', unit: '/50' },
  { value: 12, label: 'Years Innovation', icon: TrendingUp, color: '#10b981', unit: '+' },
];

export default function PerformanceMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const metric = metrics[i];
        gsap.fromTo(
          el.querySelector('.counter-value'),
          { textContent: 0 },
          {
            textContent: metric.value,
            duration: 2.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: 0.1,
          }
        );
      });
    });

    return () => ctx.revert();
  }, [isVisible]);

  // Scroll trigger (visibility)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Floating Shapes Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const rotations = [
        { x: 360, y: 180, z: 90 },
        { x: 180, y: 360, z: 180 },
        { x: 90, y: 90, z: 360 },
        { x: 270, y: 270, z: 180 },
        { x: 180, y: 90, z: 270 },
        { x: 360, y: 360, z: 360 },
        { x: 120, y: 240, z: 60 },
        { x: 240, y: 60, z: 300 },
      ];

      shapesRef.current.forEach((shape, i) => {
        if (!shape) return;

        gsap.to(shape, {
          rotationX: rotations[i]?.x || 360,
          rotationY: rotations[i]?.y || 180,
          rotationZ: rotations[i]?.z || 90,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[#0a0612] relative overflow-hidden min-h-screen flex items-center"
      style={{ perspective: '800px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/5 via-transparent to-blue-500/5" />

      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          animation: isVisible ? 'none' : undefined,
        }}
      />

      {/* Floating 3D geometric shapes */}
      <>
        <div ref={(el) => { shapesRef.current[0] = el; }} className="absolute top-[10%] left-[5%] w-10 h-10 border-2 border-vare-purple/15 pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />

        <div ref={(el) => { shapesRef.current[1] = el; }} className="absolute top-[15%] right-[8%] w-8 h-8 rounded-full border-2 border-vare-gold/15 pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />

        <div ref={(el) => { shapesRef.current[2] = el; }} className="absolute top-[40%] left-[3%] w-0 h-0 pointer-events-none" style={{ borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderBottom: '24px solid rgba(124,77,187,0.1)', transformStyle: 'preserve-3d' }} />

        <div ref={(el) => { shapesRef.current[3] = el; }} className="absolute top-[55%] right-[6%] w-12 h-12 border-2 border-vare-purple/10 pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />

        <div ref={(el) => { shapesRef.current[4] = el; }} className="absolute bottom-[10%] left-[10%] w-6 h-6 rounded-full border-2 border-vare-gold/12 pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />

        <div ref={(el) => { shapesRef.current[5] = el; }} className="absolute bottom-[15%] right-[12%] w-0 h-0 pointer-events-none" style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '18px solid rgba(124,77,187,0.08)', transformStyle: 'preserve-3d' }} />

        <div ref={(el) => { shapesRef.current[6] = el; }} className="absolute top-[25%] right-[15%] w-16 h-16 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 border-2 border-vare-purple/10 rotate-[30deg] rounded-sm" />
          <div className="absolute inset-2 border-2 border-vare-purple/[0.07] rotate-[60deg] rounded-sm" />
          <div className="absolute inset-4 border-2 border-vare-gold/[0.07] rotate-[90deg] rounded-sm" />
        </div>

        <div ref={(el) => { shapesRef.current[7] = el; }} className="absolute bottom-[25%] right-[20%] w-10 h-10 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 border-2 border-vare-purple/10 rotate-45" />
          <div className="absolute inset-2 border-2 border-vare-purple/[0.07]" />
        </div>
      </>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
            Performance Metrics
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter">
            By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple to-blue-400">Numbers</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-medium">
            Real impact measured in deliverables, satisfaction, and consistent excellence.
          </p>
        </div>

        {/* Metrics Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                ref={(el) => {
                  counterRefs.current[i] = el;
                }}
                className="group relative"
              >
                <div className="h-full backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: metric.color }}
                  />

                  <div className="relative z-10 mb-6 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                    <Icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors" />
                  </div>

                  <div className="relative z-10 mb-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <div
                        className="counter-value text-5xl md:text-6xl font-black tracking-tighter"
                        style={{ color: metric.color }}
                      >
                        0
                      </div>
                      <span className="text-2xl font-black text-white/60">{metric.unit}</span>
                    </div>
                  </div>

                  <p className="relative z-10 text-white/50 text-sm font-semibold uppercase tracking-widest group-hover:text-white/70 transition-colors">
                    {metric.label}
                  </p>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ backgroundColor: metric.color }}
                  />
                </div>

                <div
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: metric.color }}
                />
              </div>
            );
          })}
        </div>

        <div className="text-center mt-20">
          <p className="text-white/30 text-sm font-medium uppercase tracking-widest">
            Continuously evolving. Always improving.
          </p>
        </div>
      </div>
    </section>
  );
}