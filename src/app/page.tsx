'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import VideoPopup from '@/components/VideoPopup';
import {
  Smartphone, RefreshCw, Palette, Search, ShoppingCart,
  Star, MousePointer, Target, TrendingDown, ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Quote,
  Code, Zap, Shield, Users, Clock, Award,
  CheckCircle2, Sparkles, TrendingUp, Layers,
  Layout, Monitor, Cpu, FileText,
  Briefcase, Heart, UserCircle, Globe, Play,
  Rocket, ShoppingBag, Lock, MoreHorizontal, X, MessageSquare, Bell, Send, Bookmark, Image,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ==================== REDUCED MOTION HOOK ====================
function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReduced;
}

// Small browser frame preview component used in the hero
function BrowserFrame({ width = 460, score = 98, active = false, index = 0 }: { width?: number; score?: number; active?: boolean; index?: number }) {
  return (
    <div
      className={`browser-frame ${active ? 'active' : ''}`}
      style={{ width: '100%', maxWidth: width }}
    >
      <div className="browser-bar">
        
        <div className="b-url">
          <Lock className="w-3 h-3 text-[#478ece]/40" />
          <span className="ml-2 text-white/30 text-[10px] font-bold font-mono">vareweb.com</span>
          <span className="ml-auto text-green-400/60 text-[9px] font-bold font-mono">● Live</span>
        </div>
        <div className="flex gap-4 ml-2">
          <RefreshCw className="text-white/15 text-xs w-4 h-4" />
          <MoreHorizontal className="text-white/15 text-xs w-4 h-4" />
        </div>
      </div>

      {index === 1 ? (
        <div className="bg-white/[.04] border border-white/10 rounded-[28px] overflow-hidden p-5">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[.06] rounded-t-xl border-b border-white/10 mb-4">
            <div className="g-logo w-4 h-4 flex items-center" aria-hidden="true" title="Google">
              <svg viewBox="0 0 48 48" width="16" height="16" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google">
                <path fill="#4285F4" d="M24 9.5c3.6 0 6.6 1.3 8.8 2.6l6.5-6.5C35.5 3.6 30.1 1.5 24 1.5 14.8 1.5 6.9 6.9 3 14.8l7.9 6.1C12.2 15 17.7 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.5 24c0-1.5-.1-2.6-.4-3.8H24v7.2h12.9c-.6 3-2.8 5.2-5.9 6.7l9 7.1C43 39.5 46.5 32.4 46.5 24z"/>
                <path fill="#FBBC05" d="M10.9 28.9C9.8 26.6 9.2 24.2 9.2 21.7s.6-4.9 1.7-7.2L3 8.3C1 12.8 0 18.1 0 24s1 11.2 3 15.7l7.9-6.8z"/>
                <path fill="#EA4335" d="M24 46.5c6.1 0 11.5-2.1 15.8-5.7l-7.9-6.1c-2.2 1.5-4.9 2.4-7.9 2.4-6.3 0-11.7-4.5-13.1-10.6l-7.9 6.1C6.9 41.6 14.8 46.5 24 46.5z"/>
              </svg>
            </div>
            <div className="flex-1 mx-2 bg-white/[.08] rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/10">
              <Search className="text-primary text-[10px] w-3 h-3" />
              <span className="text-white/60 text-[11px] font-medium" id="searchTyped">seo service</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-l-2xl" />
              <div className="pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-wide text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">✓ Ad</span>
                  <span className="text-[10px] text-white/40 truncate">vareweb.com › seo</span>
                </div>
                <p className="text-primary font-bold text-sm leading-snug mb-1">SEO Agency — #1 Organic Position</p>
                <p className="text-white/40 text-[11px] leading-relaxed line-clamp-2">Technical SEO, content authority &amp; link building that compounds.</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[9px] text-yellow-400">
                    <Star className="w-3 h-3" /><Star className="w-3 h-3" /><Star className="w-3 h-3" /><Star className="w-3 h-3" /><Star className="w-3 h-3" /> 5.0
                  </span>
                  <span className="text-[9px] text-white/30">• 150+ Reviews</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl hover:bg-white/[.02] transition-colors">
              <p className="text-[10px] text-white/20 mb-1">competitor-seo.com</p>
              <p className="text-white/50 text-sm font-semibold">Competitor SEO Agency</p>
            </div>
            <div className="px-4 py-3 rounded-2xl hover:bg-white/[.02] transition-colors">
              <p className="text-[10px] text-white/20 mb-1">seo-specialist.net</p>
              <p className="text-white/30 text-sm font-semibold">SEO Specialist</p>
            </div>

            <div className="pt-4 border-t border-white/10 mt-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-3">Live Keyword Rankings</p>
              <div className="space-y-2.5" id="rankBars">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-semibold text-white/60">seo agency</span>
                    <span className="text-[10px] font-black text-primary">#1</span>
                  </div>
                  <div className="rank-bar"><div className="rank-fill" data-target="98" /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-semibold text-white/60">technical seo</span>
                    <span className="text-[10px] font-black text-primary">#1</span>
                  </div>
                  <div className="rank-bar"><div className="rank-fill" data-target="93" /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-semibold text-white/60">local seo expert</span>
                    <span className="text-[10px] font-black text-primary">#2</span>
                  </div>
                  <div className="rank-bar"><div className="rank-fill" data-target="90" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : index === 2 ? (
        <div style={{ padding: 0 }}>
          <PhoneFloat frameWidth={width} />
        </div>
      ) : (
        <div style={{ background: '#0a0f1e', padding: 0 }}>
          <div style={{ background: 'rgba(71,142,206,.06)', borderBottom: '1px solid rgba(71,142,206,.1)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 80, height: 14, background: 'rgba(71,142,206,.35)', borderRadius: 4 }} />
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 40, height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 3 }} />
              <div style={{ width: 50, height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 3 }} />
              <div style={{ width: 36, height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 3 }} />
              <div style={{ width: 60, height: 24, background: 'rgba(71,142,206,.6)', borderRadius: 20 }} />
            </div>
          </div>

          <div style={{ padding: '32px 20px 24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(71,142,206,.06)', filter: 'blur(40px)' }} />
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', lineHeight: 1, marginBottom: 10 }}>
              GROW YOUR<br /><span style={{ color: '#478ece' }}>REVENUE.</span>
            </div>
            <div style={{ width: 220, height: 8, background: 'rgba(255,255,255,.08)', borderRadius: 3, marginBottom: 6 }} />
            <div style={{ width: 160, height: 8, background: 'rgba(255,255,255,.06)', borderRadius: 3, marginBottom: 18 }} />
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ background: '#478ece', borderRadius: 20, padding: '8px 18px', fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: '.2em', textTransform: 'uppercase' }}>Get Started</div>
              <div style={{ border: '1px solid rgba(255,255,255,.15)', borderRadius: 20, padding: '8px 16px', fontSize: 9, color: 'rgba(255,255,255,.5)', letterSpacing: '.15em', textTransform: 'uppercase' }}>Learn More</div>
            </div>

            <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(15,23,42,.95)', border: '1px solid rgba(71,142,206,.3)', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
              <div id="score-num" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontStyle: 'italic', fontWeight: 900, fontSize: 28, color: '#478ece', lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: 8, fontWeight: 800, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.2em', marginTop: 2 }}>PageSpeed</div>
              <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              </div>
            </div>
          </div>

          <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(71,142,206,.1)', borderRadius: 10, padding: 12 }}>
              <div style={{ width: 20, height: 20, background: 'rgba(71,142,206,.25)', borderRadius: 6, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 10, height: 10, background: '#478ece', borderRadius: 2 }} />
              </div>
              <div style={{ height: 7, background: 'rgba(255,255,255,.12)', borderRadius: 3, marginBottom: 4 }} />
              <div style={{ height: 7, background: 'rgba(255,255,255,.07)', borderRadius: 3, width: '70%' }} />
            </div>
            <div style={{ background: 'rgba(71,142,206,.1)', border: '1px solid rgba(71,142,206,.25)', borderRadius: 10, padding: 12 }}>
              <div style={{ width: 20, height: 20, background: 'rgba(71,142,206,.4)', borderRadius: 6, marginBottom: 8 }} />
              <div style={{ height: 7, background: 'rgba(71,142,206,.4)', borderRadius: 3, marginBottom: 4 }} />
              <div style={{ height: 7, background: 'rgba(71,142,206,.2)', borderRadius: 3, width: '60%' }} />
            </div>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(71,142,206,.1)', borderRadius: 10, padding: 12 }}>
              <div style={{ width: 20, height: 20, background: 'rgba(71,142,206,.15)', borderRadius: 6, marginBottom: 8 }} />
              <div style={{ height: 7, background: 'rgba(255,255,255,.1)', borderRadius: 3, marginBottom: 4 }} />
              <div style={{ height: 7, background: 'rgba(255,255,255,.06)', borderRadius: 3, width: '80%' }} />
            </div>
          </div>

          <div style={{ margin: '0 20px 20px', background: 'rgba(71,142,206,.06)', border: '1px solid rgba(71,142,206,.12)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(71,142,206,.5)' }} />
              <span style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: 'rgba(71,142,206,.5)' }}>index.html — 98/100</span>
              <span style={{ marginLeft: 'auto', background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.3)', borderRadius: 4, padding: '1px 6px', fontSize: 8, color: '#86efac', fontWeight: 700 }}>OPTIMIZED</span>
            </div>
            <div className="code-content">
              <div className="code-line"><span className="ln">1</span><span className="c-tag">&lt;section</span> <span className="c-attr">class</span>=<span className="c-val">"hero"</span><span className="c-tag">&gt;</span></div>
              <div className="code-line"><span className="ln">2</span><span style={{ paddingLeft: 16 }}><span className="c-tag">&lt;h1</span> <span className="c-attr">data-aos</span>=<span className="c-val">"fade-up"</span><span className="c-tag">&gt;</span></span></div>
              <div className="code-line"><span className="ln">3</span><span style={{ paddingLeft: 32 }}><span className="c-str">Convert Every Visitor</span></span></div>
              <div className="code-line"><span className="ln">4</span><span style={{ paddingLeft: 16 }}><span className="c-tag">&lt;/h1&gt;</span></span></div>
              <div className="code-line"><span className="ln">5</span><span className="c-cmt">// PageSpeed: 98 ✓ Core Web Vitals: Pass ✓</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Small phone mock used near the rotator
function PhoneFloat({ frameWidth = 360 }: { frameWidth?: number }) {
  const innerHeight = Math.round(frameWidth * 1.8); // proportional height for better aspect ratio
  return (
    <div className="phone-float relative z-10 mx-auto" style={{ width: frameWidth }}>
      <div className="relative bg-[#111827] rounded-[36px] border-2 border-white/15 shadow-2xl shadow-black/60 overflow-hidden" style={{ padding: 10 }}>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30" />
        <div className="bg-white rounded-[28px] overflow-hidden" style={{ minHeight: innerHeight }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-8 pb-3 border-b border-gray-100">
            <span className="font-display text-black text-base">@yourbrand</span>
            <div className="flex gap-3 text-black/40">
              <Bell className="w-4 h-4" />
              <Send className="w-4 h-4" />
            </div>
          </div>

          {/* Stories */}
          <div className="flex gap-2 px-4 py-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-primary p-[2px]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-[9px] font-black text-black">You</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0"><div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px]"><div className="w-full h-full rounded-full bg-gray-100" /></div></div>
            <div className="flex-shrink-0"><div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 p-[2px]"><div className="w-full h-full rounded-full bg-gray-100" /></div></div>
            <div className="flex-shrink-0"><div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-300 p-[2px]"><div className="w-full h-full rounded-full bg-gray-100" /></div></div>
          </div>

          {/* Feed */}
          <div className="px-4 space-y-4 pb-4">
            <div className="feed-item">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-blue-300" />
                <span className="text-[10px] font-black text-black">yourbrand</span>
                <span className="text-[9px] text-black/30 ml-auto">2h</span>
              </div>
              <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center mb-2">
                <div className="text-center">
                  <Image className="text-primary/30 text-2xl mb-1 w-6 h-6" />
                  <p className="text-primary/40 text-[9px] font-black uppercase tracking-wider">Graphic Design</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-black/40 text-sm">
                <Heart className="text-pink-400 like-beat w-4 h-4" />
                <MessageSquare className="w-4 h-4" />
                <Send className="w-4 h-4" />
                <Bookmark className="ml-auto w-4 h-4" />
              </div>
              <p className="text-[10px] font-black text-black/60 mt-1">2,847 likes</p>
            </div>

            <div className="feed-item">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-blue-300" />
                <span className="text-[10px] font-black text-black">yourbrand</span>
                <span className="text-[9px] text-black/30 ml-auto">1d</span>
              </div>
              <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-black to-black/80 flex items-center justify-center mb-2">
                <p className="font-display text-white text-lg text-center px-4 leading-tight">"Consistency<br/>builds brands."</p>
              </div>
              <div className="flex items-center gap-4 text-black/40 text-sm">
                <Heart className="w-4 h-4" />
                <MessageSquare className="w-4 h-4" />
                <Send className="w-4 h-4" />
                <Bookmark className="ml-auto w-4 h-4" />
              </div>
              <p className="text-[10px] font-black text-black/60 mt-1">1,204 likes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserFramesRotator({ count = 3, width = 360, widths }: { count?: number; width?: number; widths?: number[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const frames = Array.from(el.querySelectorAll<HTMLElement>('.browser-frame'));
    if (!frames.length) return;

    if (prefersReduced) {
      gsap.set(frames, { autoAlpha: 0, pointerEvents: 'none', y: 12, zIndex: 0 });
      const first = frames[0];
      if (first) gsap.set(first, { autoAlpha: 1, pointerEvents: 'auto', y: 0, zIndex: 20 });
      return;
    }

    const ctx = gsap.context(() => {
      const fadeIn = 0.9;
      const fadeOut = 0.9;
      const visible = Math.max(0, 5 - fadeIn - fadeOut); // total cycle ≈ 5s per frame

      gsap.set(frames, { autoAlpha: 0, pointerEvents: 'none', y: 12, zIndex: 0 });

      const tl = gsap.timeline({ repeat: -1 });
      frames.forEach((f) => {
        tl.to(f, {
          autoAlpha: 1,
          pointerEvents: 'auto',
          y: 0,
          zIndex: 20,
          duration: fadeIn,
          ease: 'power2.out',
          onStart: () => {
            const fills = Array.from(f.querySelectorAll<HTMLElement>('.rank-fill'));
            if (!fills.length) return;
            fills.forEach((fill, i) => {
              const target = fill.getAttribute('data-target') || '';
              const pct = target ? `${target}%` : '0%';
              gsap.set(fill, { width: '0%' });
              gsap.to(fill, { width: pct, duration: 0.9, delay: i * 0.08, ease: 'power2.out' });
            });
          },
        });
        tl.to(f, { duration: visible });
        tl.to(f, {
          autoAlpha: 0,
          pointerEvents: 'none',
          y: -8,
          zIndex: 0,
          duration: fadeOut,
          ease: 'power2.in',
          onComplete: () => {
            const fills = Array.from(f.querySelectorAll<HTMLElement>('.rank-fill'));
            fills.forEach((fill) => gsap.set(fill, { width: '0%' }));
          },
        });
      });

      // Pause/resume on hover for better UX (only on devices that support hover)
      const handleEnter = () => tl.pause();
      const handleLeave = () => tl.resume();
      const supportsHover = typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
        : false;

      if (supportsHover) {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      }

      tl.play(0);

      return () => {
        if (supportsHover) {
          el.removeEventListener('mouseenter', handleEnter);
          el.removeEventListener('mouseleave', handleLeave);
        }
        if (tl && tl.kill) tl.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [count, width]);

  const getFrameWidth = (index: number) => {
    if (widths && widths[index]) return widths[index];
    return width;
  };

  return (
    <div className="browser-rotator flex justify-center items-center" ref={containerRef}>
      {Array.from({ length: count }).map((_, i) => {
        return <BrowserFrame key={i} width={getFrameWidth(i)} score={98 - i} active={false} index={i} />;
      })}
    </div>
  );
}


// ==================== SECTION: HERO (Technical Rotator) ====================
// The right-side hero image carousel was replaced with a concise technical rotator component
// that cycles through 3-4 highlighted services (Website, Mobile, GHL workflows, eCommerce).

// ==================== DISCOUNT MODAL ====================
function DiscountModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0.85, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
      );
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-1 flex items-start sm:items-center justify-center p-4 pt-28 sm:pt-0"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Discount Offer"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-[45%_55%]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN — Black bg with rocket + stars */}
        <div className="relative bg-black flex flex-col items-center justify-center p-6 xs:p-8 min-h-[240px] sm:min-h-[260px] md:min-h-[480px] overflow-hidden">
          {/* Star field */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-star-twinkle"
              style={{
                left: `${(i * 37 + 13) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                width: `${1 + (i % 3)}px`,
                height: `${1 + (i % 3)}px`,
                animationDelay: `${(i * 0.17) % 3}s`,
                animationDuration: `${1.5 + (i % 3) * 0.7}s`,
              }}
            />
          ))}

          {/* Rocket SVG */}
          <svg
            viewBox="0 0 80 100"
            fill="none"
            className="w-16 h-20 xs:w-20 xs:h-24 mb-4 xs:mb-6 animate-rocket-float relative z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 8C40 8 25 22 25 50C25 58 31 66 40 66C49 66 55 58 55 50C55 22 40 8 40 8Z"
              fill="url(#rocketBodyGrad)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.5"
            />
            <circle cx="40" cy="42" r="6" fill="#0f0f1a" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            <circle cx="40" cy="42" r="4.5" fill="#818cf8" />
            <circle cx="38" cy="40" r="1.5" fill="rgba(255,255,255,0.4)" />
            <path d="M25 50L16 62L27 56Z" fill="#ef4444" />
            <path d="M55 50L64 62L53 56Z" fill="#ef4444" />
            <path d="M33 62L40 72L47 62Z" fill="#dc2626" />
            <path d="M34 66C34 66 37 82 40 88C43 82 46 66 46 66" fill="#f59e0b" opacity="0.9">
              <animate attributeName="d" dur="0.3s" repeatCount="indefinite"
                values="M34 66C34 66 37 82 40 88C43 82 46 66 46 66;M34 66C34 66 36 78 40 85C44 78 46 66 46 66;M34 66C34 66 37 82 40 88C43 82 46 66 46 66" />
            </path>
            <path d="M36 66C36 66 38 76 40 80C42 76 44 66 44 66" fill="#ef4444" opacity="0.9">
              <animate attributeName="d" dur="0.2s" repeatCount="indefinite"
                values="M36 66C36 66 38 76 40 80C42 76 44 66 44 66;M36 66C36 66 39 73 40 77C41 73 44 66 44 66;M36 66C36 66 38 76 40 80C42 76 44 66 44 66" />
            </path>
            <path d="M38 66C38 66 39 72 40 74C41 72 42 66 42 66" fill="#fbbf24" />
            <defs>
              <linearGradient id="rocketBodyGrad" x1="25" y1="8" x2="55" y2="66" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e0e7ff" />
                <stop offset="0.5" stopColor="#c7d2fe" />
                <stop offset="1" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>
          </svg>

          {/* Headline */}
          <div className="text-center relative z-10">
            <h2 className="text-3xl font-bold text-white mb-1">
              Get{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400">
                50% OFF
              </span>
            </h2>
            <p className="text-sm text-white/50">On All Services</p>
          </div>
        </div>

        {/* RIGHT COLUMN — Deep purple with form */}
        <div className="bg-[#1e0a3a] p-6 sm:p-8 flex flex-col justify-center">
          <span className="inline-flex items-center self-start px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-bold uppercase tracking-wider mb-5">
            <Rocket className="w-3 h-3 mr-1.5" />
            Limited Offer
          </span>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Launch Your Website Today
          </h3>
          <p className="text-sm text-white/50 mb-6">
            Don&apos;t miss this limited-time opportunity. Get a premium website at half the price!
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all duration-200"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all duration-200"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all duration-200"
            />
            <div className="relative">
              <select
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/60 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-black transition-all duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.35)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                }}
              >
                <option value="" disabled>Select Service</option>
                <option value="web-design">Web Design</option>
                <option value="mobile-apps">Mobile Apps</option>
                <option value="ecommerce">eCommerce Development</option>
                <option value="performance">Performance Optimization</option>
                <option value="custom-software">Custom Software</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="social-media">Social Media Management</option>
                <option value="brand-identity">Brand Identity</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-semibold text-sm hover:from-purple-500 hover:to-fuchsia-400 hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Claim My Discount
            </button>
          </form>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 sm:gap-5 mt-5">
            <span className="flex items-center gap-1 text-[11px] text-white/40">
              <Lock className="w-3 h-3" />
              No Spam
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/40">
              <Zap className="w-3 h-3" />
              Instant Quote
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/40">
              <MessageSquare className="w-3 h-3" />
              Free Consult
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const parallaxOrbsRef = useRef<(HTMLDivElement | null)[]>([]);
  const trustBadgesRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('Growth');
  const [typingPhase, setTypingPhase] = useState<'idle' | 'typing' | 'done'>('idle');
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.2 });

      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      tl.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word');
        if (words && words.length) {
          gsap.fromTo(
            words,
            { y: 40, opacity: 0, rotateX: -40 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
          );
        }
        // Make typed-word span visible
        const typedEl = headingRef.current.querySelector('.typed-growth');
        if (typedEl) {
          gsap.fromTo(typedEl, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.2 });
        }
      }
      tl.fromTo(
        subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
      tl.fromTo(
        trustBadgesRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

      // Right side: first slide animates in
      if (slideContainerRef.current) {
        tl.fromTo(
          slideContainerRef.current,
          { x: 80, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
          '-=0.5'
        );
      }

      // Parallax effect on floating orbs
      parallaxOrbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        const speed = [0.03, 0.05, 0.02, 0.04][i] || 0.03;
        gsap.to(orb, {
          y: () => window.scrollY * speed * 100,
          ease: 'none',
          force3D: true,
        });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            gsap.to(orb, {
              y: self.progress * speed * -200,
              x: Math.sin(self.progress * Math.PI * 2 + i) * 20,
              ease: 'none',
              force3D: true,
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Chart animation: draw the line and move dot along it continuously
  useEffect(() => {
    const container = slideContainerRef.current;
    if (!container) return;

    const line = container.querySelector<SVGPathElement>('#chart-line');
    const dot = container.querySelector<SVGCircleElement>('#chart-dot');
    if (!line || !dot) return;

    let pathLength = 452.343;
    try { pathLength = (line as SVGPathElement).getTotalLength(); } catch (e) { /* fallback */ }

    gsap.set(line, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.9 });
    tl.to(line, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut' }, 0)
      .to(dot, { motionPath: { path: line, align: line, alignOrigin: [0.5, 0.5], autoRotate: false }, duration: 2.4, ease: 'power2.inOut' }, 0)
      .to(line, { strokeDashoffset: pathLength, duration: 1.8, ease: 'power2.inOut' }, '+=0.6');

    return () => {
      if (tl && tl.kill) tl.kill();
    };
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const buttons = [ctaPrimaryRef.current, ctaSecondaryRef.current];
    const cleanupFns: (() => void)[] = [];

    buttons.forEach((btn) => {
      if (!btn) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
      cleanupFns.push(() => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  // The right-side hero previously rotated images; we now use a small TechRotator component.

  // Typing effect — cycle through multiple words
  useEffect(() => {
    const words = ['Growth', 'Success', 'Innovation', 'Results'];
    let wordIdx = 0;
    let running = true;

    const cycle = () => {
      if (!running) return;
      const word = words[wordIdx];
      setTypingPhase('typing');

      // Type the word letter by letter
      let typeIdx = 0;
      const typeInterval = setInterval(() => {
        if (!running) { clearInterval(typeInterval); return; }
        typeIdx++;
        setTypedText(word.slice(0, typeIdx));
        if (typeIdx >= word.length) {
          clearInterval(typeInterval);
          setTypingPhase('done');

          // Wait, then erase
          setTimeout(() => {
            if (!running) return;
            let eraseIdx = word.length;
            const eraseInterval = setInterval(() => {
              if (!running) { clearInterval(eraseInterval); return; }
              eraseIdx--;
              setTypedText(word.slice(0, eraseIdx));
              if (eraseIdx <= 0) {
                clearInterval(eraseInterval);
                wordIdx = (wordIdx + 1) % words.length;
                // Brief pause before next word
                setTimeout(() => { if (running) cycle(); }, 400);
              }
            }, 50);
          }, 2500);
        }
      }, 100);
    };

    // Start after initial page load animation (3.5s delay)
    const startTimer = setTimeout(cycle, 3500);
    return () => {
      running = false;
      clearTimeout(startTimer);
    };
  }, []);

  // Animate image container entrance
  useEffect(() => {
    const el = slideContainerRef.current;
    if (!el) return;
      const blogHeader = sectionRef.current?.querySelector('.section-header');
      if (blogHeader) {
        gsap.fromTo(
          blogHeader,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
        );
      }
      const blogCards = sectionRef.current?.querySelectorAll('.blog-card');
      if (blogCards && blogCards.length) {
        gsap.fromTo(
          blogCards,
          { y: 60, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
        );
      }

    const ctx = gsap.context(() => {
      const bars = Array.from(el.querySelectorAll<HTMLElement>('.hero-bar'));
      if (!bars.length) return;

      bars.forEach((bar, i) => {
        const base = parseFloat(bar.getAttribute('data-w') || '60');
        // increase amplitude for more visible fluctuation and slightly faster tempo
        const amp = Math.max(6, Math.min(18, Math.round(base * 0.12)));
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(bar, { width: `${Math.min(100, base + amp)}%`, duration: 1.2 + (i % 3) * 0.35, ease: 'sine.inOut' })
          .to(bar, { width: `${Math.max(4, base - amp)}%`, duration: 1.6 + ((i + 1) % 3) * 0.45, ease: 'sine.inOut' })
          .to(bar, { width: `${base}%`, duration: 0.9, ease: 'power2.out' });
        (bar as any).__heroTl = tl;
      });
    });

    return () => {
      ctx.revert();
      const bars2 = Array.from(el.querySelectorAll<HTMLElement>('.hero-bar'));
      bars2.forEach((b) => {
        const tl = (b as any).__heroTl;
        if (tl && tl.kill) tl.kill();
      });
    };
  }, []);

  return (
    <>
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden gradient-purple-dark pt-32 sm:pt-40"
    >
      {/* ========== Animated Background (PRESERVED) ========== */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,77,187,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(58,26,112,0.4),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating gradient orbs */}
        <div
          ref={(el) => { parallaxOrbsRef.current[0] = el; }}
          className="parallax-layer absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(91,45,158,0.6), transparent 70%)', animation: 'float-slow 12s ease-in-out infinite' }}
        />
        <div
          ref={(el) => { parallaxOrbsRef.current[1] = el; }}
          className="parallax-layer absolute top-[60%] right-[5%] w-[250px] h-[250px] rounded-full opacity-15 blur-[70px]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.5), transparent 70%)', animation: 'float-slow 15s ease-in-out infinite 3s' }}
        />
        <div
          ref={(el) => { parallaxOrbsRef.current[2] = el; }}
          className="parallax-layer absolute bottom-[20%] left-[40%] w-[200px] h-[200px] rounded-full opacity-10 blur-[60px]"
          style={{ background: 'radial-gradient(circle, rgba(124,77,187,0.5), transparent 70%)', animation: 'float-slow 18s ease-in-out infinite 6s' }}
        />
        <div
          ref={(el) => { parallaxOrbsRef.current[3] = el; }}
          className="parallax-layer absolute top-[30%] right-[30%] w-[180px] h-[180px] rounded-full opacity-10 blur-[50px]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4), transparent 70%)', animation: 'float-slow 14s ease-in-out infinite 9s' }}
        />

        {/* Perspective grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(30deg)',
            transformOrigin: 'center top',
          }}
        />

        {/* Rotating 3D wireframe rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none opacity-[0.06]">
          <div className="w-full h-full rounded-full border border-white/20" style={{ animation: 'spin 40s linear infinite, float-slow 15s ease-in-out infinite' }} />
          <div className="absolute inset-8 rounded-full border border-vare-gold/20" style={{ animation: 'spin 30s linear infinite reverse, float-slow 12s ease-in-out infinite 2s' }} />
          <div className="absolute inset-16 rounded-full border border-purple-400/20" style={{ animation: 'spin 20s linear infinite, float-slow 10s ease-in-out infinite 4s' }} />
          <div className="absolute inset-24 rounded-full border border-white/10" style={{ animation: 'spin 25s linear infinite reverse, float-slow 8s ease-in-out infinite 6s' }} />
        </div>
      </div>

      {/* Particle Background - reduced for performance on heavy pages */}
      <ParticleBackground count={40} connectLines={false} interactive={false} zIndex={5} />

      {/* ========== Left Edge Discount Bar (NEW) ========== */}
      <button
        onClick={() => setIsDiscountOpen(true)}
        className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-[52px] bg-gradient-to-b from-red-600 to-red-700 flex-col items-center justify-center group hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-900/30"
        aria-label="Get 50% discount"
      >
        <ShoppingBag className="w-5 h-5 text-white mb-6 group-hover:scale-110 transition-transform duration-300" />
        <span
          className="text-white text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Avail 50% Discount
        </span>
      </button>

      {/* Mobile discount FAB */}
      <button
        onClick={() => setIsDiscountOpen(true)}
        className="md:hidden absolute bottom-20 xs:bottom-24 right-4 z-20 flex items-center gap-2 px-3 xs:px-4 py-2 xs:py-2.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-600/30 hover:bg-red-500 active:scale-95 transition-all duration-200"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        50% OFF
      </button>

      {/* ========== Main Content — Split Layout ========== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pl-[72px] w-full pb-32 lg:pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-10 xl:gap-16 items-start">

          {/* ===== LEFT COLUMN — Text Content (~60%) ===== */}
          <div className="xl:col-span-3 text-left">
            {/* Badge */}
            <div ref={badgeRef} className="mb-8 sm:mb-12 opacity-0">
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect text-white/90 text-sm">
                <Award className="w-4 h-4 text-vare-gold" />
                <span>Award Winning Design Agency</span>
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6 xs:mb-8 sm:mb-10 opacity-0 tracking-tight"
              style={{ perspective: '1000px' }}
            >
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-x-3">
                  <span className="word inline-block">Automated</span>
                </div>

                <div className="typed-growth mt-2 relative inline-block align-baseline overflow-hidden">
                  {/* invisible sizer reserves space using the longest word to prevent layout shifts */}
                  <span className="invisible block whitespace-nowrap">Innovation</span>

                  {/* overlay the visible typed text and cursor so changes don't affect document flow */}
                  <span className="absolute left-0 top-0 inline-flex items-baseline text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-400 to-amber-500 whitespace-nowrap">
                    <span className="inline-block align-baseline">{typedText}</span>
                    <span className={`inline-block w-[4px] h-[0.9em] bg-vare-gold ml-[4px] align-baseline ${typingPhase === 'done' ? 'opacity-0' : 'animate-pulse'}`} />
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-4 min-w-0">
                  <span className="word inline-block">Meets</span>
                  <span className="word inline-block">Creative</span>
                  <span className="word inline-block text-vare-purple-light">Design</span>
                </div>
              </div>
            </h1>

            {/* Body copy */}
            <p
              ref={subtextRef}
              className="max-w-xl text-base sm:text-lg text-white/60 leading-relaxed mb-10 sm:mb-14 opacity-0"
            >
              We combine powerful automation with modern web design and development to create
              high-converting, visually stunning digital experiences. From smart funnels to fully
              automated systems, we help your business grow faster and work smarter.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 opacity-0">
              <Link
                ref={ctaPrimaryRef}
                href="/contact"
                className="magnetic-btn group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-cyan-500 rounded-xl hover:bg-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                ref={ctaSecondaryRef}
                href="/services"
                className="magnetic-btn inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-vare-purple bg-white rounded-xl hover:bg-gray-100 hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 transition-all duration-300"
              >
                LET&apos;S TALK
              </Link>
            </div>

            {/* Trust Badges */}
            <div ref={trustBadgesRef} className="mt-10 sm:mt-14 opacity-0">
              <p className="text-xs sm:text-sm text-white/40 mb-3">Highly Recommended by</p>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {/* Trustpilot (image badge) */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-colors duration-200">
                <a href="https://www.trustpilot.com/review/vareweb.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://res.cloudinary.com/dahmphiup/image/upload/v1776812740/01B77B-3-1_aee4u3.webp" alt="Trustpilot 4.3" className="w-32 h-auto rounded-sm" />
                </a>
                </div>
                {/* Google (image badge) */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-colors duration-200">
                  <a href="https://www.google.com/search?q=vareweb&oq=vareweb" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dahmphiup/image/upload/v1776812740/01B77B-2-1_hkg5v7.webp" alt="Google 5.0" className="w-32 h-auto rounded-sm" />
                  </a>
                </div>
                {/* Design Rush (image badge) */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-colors duration-200">
                  <a href="https://www.designrush.com/agency/profile/vareweb" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dahmphiup/image/upload/v1776812740/01B77B-1_nqirtc.webp" alt="Design Rush" className="w-32 h-auto rounded-sm" />
                  </a>
                </div>
                {/* Clutch (image badge) */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-colors duration-200">
                  <a href="https://www.clutch.co/profile/vareweb" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dahmphiup/image/upload/v1776812740/01B77B_yqigsn.webp" alt="Clutch" className="w-32 h-auto rounded-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN — 4 Images with Smooth Fade Animation ===== */}
          <div className="xl:col-span-2 flex justify-center items-center relative w-full h-auto">
            <BrowserFramesRotator count={3} widths={[700, 360, 300]} />
          </div>
        </div>
      </div>
    </section>

    {/* Discount Modal (rendered outside section to avoid overflow:hidden clipping) */}
    <DiscountModal isOpen={isDiscountOpen} onClose={() => setIsDiscountOpen(false)} />
    </>
  );
}

// ==================== SECTION: COUNTERS ====================
function CounterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const counters = countersRef.current?.querySelectorAll('.counter-number');
      if (!counters || !counters.length) return;

      const counterData = [
        { target: 150, suffix: '+', decimals: 0 },
        { target: 98, suffix: '%', decimals: 0 },
        { target: 100, suffix: '+', decimals: 0 },
        { target: 50, suffix: '+', decimals: 0 },
      ];

      const objs = counterData.map(() => ({ val: 0 }));

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          counterData.forEach((data, i) => {
            gsap.to(objs[i], {
              val: data.target,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: () => {
                if (counters[i]) {
                  const formatted = data.decimals > 0
                    ? objs[i].val.toFixed(data.decimals)
                    : Math.floor(objs[i].val).toLocaleString();
                  counters[i].textContent = formatted + data.suffix;
                }
              },
            });
          });
        },
      });

      // 3D floating shapes: rotate slowly as user scrolls
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
  }, [reduced]);

  const counters = [
    { icon: Briefcase, label: 'Projects Delivered' },
    { icon: Heart, label: 'Client Satisfaction' },
    { icon: UserCircle, label: 'Happy Clients' },
    { icon: Users, label: 'Team Members' },
  ];

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden" style={{ perspective: '800px' }}>
      {/* Background Glow */}
      <div className="absolute inset-0 mesh-gradient-dark opacity-30" />
      <div className="absolute inset-0 bg-[#0a0612]/40 backdrop-blur-3xl" />
      {/* Radial gradient glow behind counters */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(124,77,187,0.08),transparent_70%)] pointer-events-none" />

      {/* Floating 3D geometric shapes */}
      {!reduced && (
        <>
          {/* Wireframe cube - top left */}
          <div ref={(el) => { shapesRef.current[0] = el; }} className="absolute top-[10%] left-[5%] w-10 h-10 border-2 border-vare-purple/15 pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />
          {/* Sphere - top right */}
          <div ref={(el) => { shapesRef.current[1] = el; }} className="absolute top-[15%] right-[8%] w-8 h-8 rounded-full border-2 border-vare-gold/15 pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />
          {/* Triangle - middle left */}
          <div ref={(el) => { shapesRef.current[2] = el; }} className="absolute top-[40%] left-[3%] w-0 h-0 pointer-events-none" style={{ borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderBottom: '24px solid rgba(124,77,187,0.1)', transformStyle: 'preserve-3d' }} />
          {/* Cube - middle right */}
          <div ref={(el) => { shapesRef.current[3] = el; }} className="absolute top-[55%] right-[6%] w-12 h-12 border-2 border-vare-purple/10 pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />
          {/* Sphere - bottom left */}
          <div ref={(el) => { shapesRef.current[4] = el; }} className="absolute bottom-[10%] left-[10%] w-6 h-6 rounded-full border-2 border-vare-gold/12 pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />
          {/* Triangle - bottom right */}
          <div ref={(el) => { shapesRef.current[5] = el; }} className="absolute bottom-[15%] right-[12%] w-0 h-0 pointer-events-none" style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '18px solid rgba(124,77,187,0.08)', transformStyle: 'preserve-3d' }} />
          {/* Hexagonal wireframe */}
          <div ref={(el) => { shapesRef.current[6] = el; }} className="absolute top-[25%] right-[15%] w-16 h-16 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 border-2 border-vare-purple/10 rotate-[30deg] rounded-sm" />
            <div className="absolute inset-2 border-2 border-vare-purple/[0.07] rotate-[60deg] rounded-sm" />
            <div className="absolute inset-4 border-2 border-vare-gold/[0.07] rotate-[90deg] rounded-sm" />
          </div>
          {/* Diamond shape */}
          <div ref={(el) => { shapesRef.current[7] = el; }} className="absolute bottom-[25%] right-[20%] w-10 h-10 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 border-2 border-vare-purple/10 rotate-45" />
            <div className="absolute inset-2 border-2 border-vare-purple/[0.07]" />
          </div>
        </>
      )}

      <div ref={countersRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {counters.map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-6 group-hover:bg-vare-purple transition-all duration-300 border border-white/5 group-hover:border-vare-purple-light shadow-2xl">
                <item.icon className="w-8 h-8 text-vare-purple-light group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="counter-number text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-black text-white">0</div>
              <div className="text-xs font-bold text-white/30 mt-2 uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== SECTION: TRUSTED BY (Horizontal Continuous Scrolling) ====================
function TrustedBySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1TrackRef = useRef<HTMLDivElement>(null);
  const row2TrackRef = useRef<HTMLDivElement>(null);
  const row1ContainerRef = useRef<HTMLDivElement>(null);
  const row2ContainerRef = useRef<HTMLDivElement>(null);
  const row1Controls = useRef<{
    pauseScroll: () => void;
    resumeScroll: () => void;
  } | null>(null);
  const row2Controls = useRef<{
    pauseScroll: () => void;
    resumeScroll: () => void;
  } | null>(null);

  const companiesTop = [
    { name: 'Google', icon: Globe },
    { name: 'Microsoft', icon: Monitor },
    { name: 'Amazon', icon: ShoppingCart },
    { name: 'Tesla', icon: Zap },
    { name: 'Apple', icon: Smartphone },
    { name: 'Meta', icon: Users },
    { name: 'Netflix', icon: Layers },
    { name: 'Spotify', icon: Heart },
  ];

  const companiesBottom = [
    { name: 'Stripe', icon: ShoppingBag },
    { name: 'Intel', icon: Cpu },
    { name: 'GitHub', icon: Code },
    { name: 'Notion', icon: FileText },
    { name: 'Vercel', icon: Rocket },
    { name: 'Upwork', icon: Briefcase },
    { name: 'Cloud', icon: Globe },
    { name: 'Dribbble', icon: Play },
  ];

  const allCompaniesTop = [...companiesTop, ...companiesTop, ...companiesTop, ...companiesTop];
  const allCompaniesBottom = [...companiesBottom, ...companiesBottom, ...companiesBottom, ...companiesBottom];

  // GSAP-powered auto-scroll + snap-to-hover
  useEffect(() => {
    const track1 = row1TrackRef.current;
    const track2 = row2TrackRef.current;
    const container1 = row1ContainerRef.current;
    const container2 = row2ContainerRef.current;
    if (!track1 || !track2 || !container1 || !container2) return;

    const speed = 0.5;
    let raf1 = 0;
    let raf2 = 0;
    let isHovered1 = false;
    let isHovered2 = false;
    // Pause auto-scroll when section isn't visible to reduce CPU usage
    let isSectionVisible = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { isSectionVisible = entry.isIntersecting; });
    }, { threshold: 0 });
    if (sectionRef.current) io.observe(sectionRef.current);

    const getOneSetWidth = (track: HTMLElement, setCount: number) => {
      const firstCard = track.children[0] as HTMLElement;
      if (!firstCard) return 1;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap) || 16;
      return (firstCard.offsetWidth + gap) * setCount;
    };

    const w1 = getOneSetWidth(track1, companiesTop.length);
    const w2 = getOneSetWidth(track2, companiesBottom.length);

    gsap.set(track1, { x: 0 });
    gsap.set(track2, { x: -w2 });

    const animate1 = () => {
      if (!isHovered1 && isSectionVisible) {
        const cx = gsap.getProperty(track1, 'x') as number;
        let nx = cx - speed;
        if (nx <= -w1) nx += w1;
        gsap.set(track1, { x: nx });
      }
      raf1 = requestAnimationFrame(animate1);
    };

    const animate2 = () => {
      if (!isHovered2 && isSectionVisible) {
        const cx = gsap.getProperty(track2, 'x') as number;
        let nx = cx + speed;
        if (nx >= 0) nx -= w2;
        gsap.set(track2, { x: nx });
      }
      raf2 = requestAnimationFrame(animate2);
    };

    raf1 = requestAnimationFrame(animate1);
    raf2 = requestAnimationFrame(animate2);

    row1Controls.current = {
      pauseScroll: () => { isHovered1 = true; },
      resumeScroll: () => { isHovered1 = false; },
    };

    row2Controls.current = {
      pauseScroll: () => { isHovered2 = true; },
      resumeScroll: () => { isHovered2 = false; },
    };

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (io) io.disconnect();
    };
  }, []);

  // 3D tilt on card hover
  const handleCardTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    gsap.to(el, {
      rotateY: ((x - cx) / cx) * 5,
      rotateX: ((y - cy) / cy) * -5,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleCardTiltReset = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 bg-[#090510] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0612] via-transparent to-[#0a0612] opacity-80" />
      {/* Floating 3D decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Rotating wireframe cube 1 */}
        <div
          className="absolute top-[12%] left-[7%] w-8 h-8"
          style={{ transformStyle: 'preserve-3d', animation: 'trustSpin3d 12s linear infinite' }}
        >
          <div className="absolute inset-0 border border-purple-400/20 rounded-sm" />
          <div className="absolute inset-0 border border-purple-400/20 rounded-sm" style={{ transform: 'rotateY(60deg)' }} />
          <div className="absolute inset-0 border border-purple-400/20 rounded-sm" style={{ transform: 'rotateY(120deg)' }} />
        </div>
        {/* Glowing sphere */}
        <div
          className="absolute top-[20%] right-[10%] w-6 h-6 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/5"
          style={{ animation: 'float-slow 8s ease-in-out infinite', boxShadow: '0 0 20px rgba(245,158,11,0.15)' }}
        />
        {/* Rotating wireframe cube 2 */}
        <div
          className="absolute bottom-[18%] left-[12%] w-6 h-6"
          style={{ transformStyle: 'preserve-3d', animation: 'trustSpin3d 16s linear infinite reverse' }}
        >
          <div className="absolute inset-0 border border-purple-400/15 rounded-sm" />
          <div className="absolute inset-0 border border-purple-400/15 rounded-sm" style={{ transform: 'rotateY(60deg)' }} />
          <div className="absolute inset-0 border border-purple-400/15 rounded-sm" style={{ transform: 'rotateY(120deg)' }} />
        </div>
        {/* Floating sphere 2 */}
        <div
          className="absolute bottom-[25%] right-[8%] w-5 h-5 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/5"
          style={{ animation: 'float-slow 10s ease-in-out infinite 3s', boxShadow: '0 0 15px rgba(124,77,187,0.2)' }}
        />
        {/* Small floating dots */}
        <div className="absolute top-[45%] left-[4%] w-3 h-3 rounded-full bg-amber-400/25" style={{ animation: 'float-slow 7s ease-in-out infinite 1s' }} />
        <div className="absolute top-[55%] right-[5%] w-2.5 h-2.5 rounded-full bg-purple-300/25" style={{ animation: 'float-slow 9s ease-in-out infinite 5s' }} />
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className="text-center text-sm font-medium text-white/50 uppercase tracking-[0.2em] mb-10">
          Trusted By Industry Leaders
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div
        ref={row1ContainerRef}
        className="overflow-hidden mb-5 relative z-10"
        style={{ perspective: '1000px' }}
        onMouseLeave={() => row1Controls.current?.resumeScroll()}
      >
        <div ref={row1TrackRef} className="flex gap-4 w-max" style={{ willChange: 'transform' }}>
          {allCompaniesTop.map((company, i) => (
            <div
              key={`r1-${i}`}
              onMouseEnter={() => row1Controls.current?.pauseScroll()}
              onMouseMove={handleCardTilt}
              onMouseLeave={(e) => handleCardTiltReset(e)}
              className="group relative flex-shrink-0 flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] cursor-default transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(124,77,187,0.25)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Hover gradient glow ring */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-400/30 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-700/10 flex items-center justify-center flex-shrink-0 border border-white/[0.08] group-hover:from-purple-400/30 group-hover:to-purple-600/20 transition-all duration-500">
                <company.icon className="w-6 h-6 text-white/60 group-hover:text-purple-300 transition-colors duration-500" />
              </div>
              <span className="text-lg font-bold text-white/50 whitespace-nowrap group-hover:text-white/90 transition-colors duration-500">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div
        ref={row2ContainerRef}
        className="overflow-hidden relative z-10"
        style={{ perspective: '1000px' }}
        onMouseLeave={() => row2Controls.current?.resumeScroll()}
      >
        <div ref={row2TrackRef} className="flex gap-4 w-max" style={{ willChange: 'transform' }}>
          {allCompaniesBottom.map((company, i) => (
            <div
              key={`r2-${i}`}
              onMouseEnter={() => row2Controls.current?.pauseScroll()}
              onMouseMove={handleCardTilt}
              onMouseLeave={(e) => handleCardTiltReset(e)}
              className="group relative flex-shrink-0 flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] cursor-default transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(124,77,187,0.25)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Hover gradient glow ring */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-400/30 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-700/10 flex items-center justify-center flex-shrink-0 border border-white/[0.08] group-hover:from-purple-400/30 group-hover:to-purple-600/20 transition-all duration-500">
                <company.icon className="w-6 h-6 text-white/60 group-hover:text-purple-300 transition-colors duration-500" />
              </div>
              <span className="text-lg font-bold text-white/50 whitespace-nowrap group-hover:text-white/90 transition-colors duration-500">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fade edges — deep dark theme */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0612] to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#090510] to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 left-0 w-16 xs:w-20 sm:w-24 md:w-32 bg-gradient-to-r from-[#090510] to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-16 xs:w-20 sm:w-24 md:w-32 bg-gradient-to-l from-[#090510] to-transparent pointer-events-none z-20" />

      {/* Custom keyframes for 3D decorative elements */}
      <style>{`
        @keyframes trustSpin3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </section>
  );
}

// ==================== SECTION: SERVICES DATA ====================
const services = [
  {
    icon: Monitor,
    title: 'Custom Web Design',
    slug: 'custom-web-design',
    desc: 'Tailored websites that reflect your brand and convert visitors into customers.',
    color: 'from-purple-500 to-indigo-600',
    tag: 'DESIGN • DEVELOPMENT',
    category: 'WEB DESIGN',
    catNum: '01',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    slug: 'responsive-web-design',
    desc: 'Seamless iOS & Android apps with native-quality performance.',
    color: 'from-blue-500 to-cyan-500',
    tag: 'IOS • ANDROID',
    category: 'MOBILE APPS',
    catNum: '02',
  },
  {
    icon: ShoppingCart,
    title: 'eCommerce Solutions',
    slug: 'ecommerce-development',
    desc: 'Powerful online stores with secure payments and smooth checkout.',
    color: 'from-emerald-500 to-teal-500',
    tag: 'SHOPIFY • WOOCOMMERCE',
    category: 'ECOMMERCE',
    catNum: '03',
  },
  {
    icon: Search,
    title: 'SEO & Marketing',
    slug: 'search-engine-optimization',
    desc: 'Data-driven SEO strategies to dominate search rankings.',
    color: 'from-violet-500 to-purple-600',
    tag: 'SEO • CONTENT',
    category: 'ORGANIC GROWTH',
    catNum: '04',
  },
  {
    icon: Palette,
    title: 'UX/UI Design',
    slug: 'ux-ui-design',
    desc: 'Intuitive interfaces backed by research and user psychology.',
    color: 'from-orange-500 to-red-500',
    tag: 'UI • UX',
    category: 'DESIGN & UX',
    catNum: '05',
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    slug: 'website-redesign',
    desc: 'Modernize outdated sites with fresh design and optimized performance.',
    color: 'from-pink-500 to-rose-500',
    tag: 'REBRAND • OPTIMIZE',
    category: 'REDESIGN',
    catNum: '06',
  },
  {
    icon: Code,
    title: 'Custom Software',
    slug: 'custom-software-development',
    desc: 'Bespoke software solutions built for your unique business needs.',
    color: 'from-amber-500 to-yellow-500',
    tag: 'SAAS • API • CLOUD',
    category: 'DEVELOPMENT',
    catNum: '07',
  },
  {
    icon: Layers,
    title: 'Brand Identity',
    slug: 'brand-identity-design',
    desc: 'Cohesive branding that tells your story and builds recognition.',
    color: 'from-fuchsia-500 to-pink-600',
    tag: 'LOGO • GUIDELINES',
    category: 'BRANDING',
    catNum: '08',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    slug: 'performance-optimization',
    desc: 'Lightning-fast load times with advanced speed optimization.',
    color: 'from-lime-500 to-green-500',
    tag: 'SPEED • CORE WEB',
    category: 'OPTIMIZATION',
    catNum: '09',
  },
  {
    icon: Shield,
    title: 'Cyber Security',
    slug: 'cyber-security',
    desc: 'Protect your digital assets with enterprise-grade security.',
    color: 'from-red-500 to-rose-600',
    tag: 'SSL • FIREWALL',
    category: 'SECURITY',
    catNum: '10',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    desc: 'Strategic campaigns that drive traffic and boost conversions.',
    color: 'from-cyan-500 to-blue-600',
    tag: 'PPC • SOCIAL • EMAIL',
    category: 'MARKETING',
    catNum: '11',
  },
  {
    icon: Users,
    title: 'Social Media Management',
    slug: 'social-media-management',
    desc: 'Grow your audience with engaging content and strategy.',
    color: 'from-indigo-500 to-violet-600',
    tag: 'CONTENT • STRATEGY',
    category: 'SOCIAL',
    catNum: '12',
  },
];

// ==================== SECTION: SERVICES (Glide.js Carousel — Dark Theme) ====================
// ==================== SECTION: SERVICES (Cinematic Bento Grid Display) ====================
function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Section Header Animation
      const svcHeader = sectionRef.current?.querySelector('.svc-header');
      if (svcHeader) {
        gsap.fromTo(
          svcHeader,
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
          }
        );
      }

      // Bento Grid Item Staggered Animation
      const svcCards = sectionRef.current?.querySelectorAll('.svc-card');
      const svcGrid = sectionRef.current?.querySelector('.svc-grid');
      if (svcCards && svcCards.length && svcGrid) {
        gsap.fromTo(
          svcCards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: svcGrid, start: 'top 85%' },
          }
        );
      }
    }, sectionRef.current!);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-[#090510] relative overflow-hidden">
      {/* Cinematic Backdrop */}
      <div className="absolute inset-0 mesh-gradient-dark opacity-40" />
      <div className="absolute inset-0 bg-[#090510]/60 backdrop-blur-3xl" />
      
      {/* Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vare-purple/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="svc-header text-center mb-24">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
            Core Infrastructure
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            Innovative <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Solutions</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Propelling brands into the future through elite technical architecture and visionary design.
          </p>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 auto-rows-[240px] xs:auto-rows-[260px] sm:auto-rows-[280px] md:auto-rows-[300px]">
          {services.slice(0, 6).map((service, i) => (
            <Link
              key={i}
              href={`/services/${service.slug || ''}`}
              className={`svc-card group relative glass-card-accent p-6 xs:p-8 rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-700 flex flex-col justify-between ${
                i === 0 ? 'lg:col-span-2' : 
                i === 3 ? 'lg:row-span-2' : ''
              }`}
            >
              {/* Dynamic Accent Glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">
                    {service.catNum} • {service.category}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-vare-purple-light transition-colors duration-500 mb-4">
                  {service.title}
                </h3>
                <p className={`text-white/40 text-sm font-medium leading-relaxed ${i === 0 ? 'max-w-md' : 'line-clamp-3'}`}>
                  {service.desc}
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-white/20 group-hover:text-white/60 transition-colors duration-500">
                  {service.tag}
                </span>
                <ArrowRight className="w-5 h-5 text-vare-purple-light opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
              </div>

              {/* Glass Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/services"
            className="group relative px-12 py-5 gradient-purple text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_50px_rgba(124,77,187,0.3)] transition-all transform hover:-translate-y-1 overflow-hidden inline-flex items-center gap-4"
          >
            <span className="relative z-10">Explore Full Suite</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==================== SECTION: PORTFOLIO DATA ====================
const portfolioItems = [
  { 
    title: 'E-Commerce Platform', 
    category: 'Web Design', 
    color: 'from-vare-purple to-violet-600', 
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1000&auto=format&fit=crop&q=80'
  },
  { 
    title: 'Brand Identity System', 
    category: 'Branding', 
    color: 'from-blue-600 to-cyan-500', 
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1000&fit=crop'
  },
  { 
    title: 'SaaS Dashboard', 
    category: 'UI/UX Design', 
    color: 'from-emerald-500 to-teal-500', 
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop'
  },
  { 
    title: 'Mobile Banking App', 
    category: 'App Design', 
    color: 'from-orange-500 to-red-500', 
    icon: Smartphone,
    image: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775847315/tran-mau-tri-tam-QwAL909kTiY-unsplash_1_pwxsph.jpg'
  },
  { 
    title: 'Restaurant Chain Website', 
    category: 'Web Development', 
    color: 'from-pink-500 to-rose-500', 
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=1000&fit=crop'
  },
  { 
    title: 'Real Estate Portal', 
    category: 'Web Design', 
    color: 'from-indigo-500 to-purple-500', 
    icon: Layout,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=1000&fit=crop'
  },
];

// ==================== SECTION: PORTFOLIO (High-Impact Editorial Display) ====================
function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const parallaxLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Section Header Animation
      const ph = sectionRef.current?.querySelector('.section-header');
      if (ph) {
        gsap.fromTo(
          ph,
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
          }
        );
      }

      // Staggered Case Study Card Animation
      const portfolioCards = sectionRef.current?.querySelectorAll('.portfolio-card');
      const portfolioScroll = sectionRef.current?.querySelector('.portfolio-scroll');
      if (portfolioCards && portfolioCards.length && portfolioScroll) {
        gsap.fromTo(
          portfolioCards,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: portfolioScroll, start: 'top 85%' },
          }
        );
      }

      if (reduced) return;

      // Atmospheric Parallax Depth
      parallaxLayersRef.current.forEach((layer, i) => {
        if (!layer) return;
        const speed = [0.02, 0.05, 0.03][i] || 0.02;
        gsap.to(layer, {
          y: () => -speed * 200,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      gsap.to(scrollContainerRef.current, { scrollLeft: scrollContainerRef.current.scrollLeft + amount, duration: 0.8, ease: 'power4.out' });
    }
  };

  const handlePointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    scrollStart.current = scrollContainerRef.current?.scrollLeft || 0;
    lastX.current = clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grabbing';
      scrollContainerRef.current.style.userSelect = 'none';
    }
  }, []);

  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = startX.current - clientX;
    scrollContainerRef.current.scrollLeft = scrollStart.current + diff;
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) velocity.current = (lastX.current - clientX) / dt;
    lastX.current = clientX;
    lastTime.current = now;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = '';
      if (Math.abs(velocity.current) > 0.3) {
        gsap.to(scrollContainerRef.current, {
          scrollLeft: scrollContainerRef.current.scrollLeft + (velocity.current * 600),
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    }
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 bg-[#0a0612] relative overflow-hidden mesh-gradient-dark">
      <div className="absolute inset-0 bg-[#0a0612]/60 backdrop-blur-3xl" />
      
      {/* Cinematic Pulse Orbs */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-vare-purple/10 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-vare-gold/5 rounded-full blur-[120px] animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-header text-center mb-24">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
             Success Matrix
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500">Studies</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Discover how we engineer technical dominance for industry leaders.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-16">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-vare-purple hover:border-vare-purple-light hover:shadow-[0_0_30px_rgba(124,77,187,0.3)] transition-all group">
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <Link
              href="/portfolio"
              className="px-10 py-4 glass-card-accent border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Full Archive
            </Link>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-vare-purple hover:border-vare-purple-light hover:shadow-[0_0_30px_rgba(124,77,187,0.3)] transition-all group">
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="portfolio-scroll flex gap-8 overflow-x-auto pb-12 cursor-grab select-none"
          style={{ scrollbarWidth: 'none' }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {portfolioItems.map((item, i) => (
            <div key={i} className="portfolio-card flex-shrink-0 w-[280px] xs:w-[300px] sm:w-[320px] md:w-[380px] lg:w-[420px] group transition-all duration-700">
               <div className="relative glass-card-accent aspect-[4/5] rounded-[2.5rem] p-4 border border-white/5 overflow-hidden group-hover:border-white/20 transition-all duration-700">
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-700`} />
                  
                  {/* Image Display Container */}
                  <div className="relative h-full w-full rounded-[2rem] bg-black/40 border border-white/5 flex flex-col items-center justify-center overflow-hidden group-hover:border-white/10 transition-all duration-700">
                    {/* Background Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/20 transition-colors duration-700" />
                    
                    {/* Fallback Icon (if image fails) */}
                    <item.icon className="relative w-20 h-20 text-white/10 group-hover:text-white/20 group-hover:scale-110 transition-all duration-700 z-10" />
                    
                    {/* View Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
                      <div className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.4)]">
                        Deep Dive
                      </div>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <span className="inline-block text-vare-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      {item.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-none group-hover:text-vare-purple-light transition-colors duration-500">
                      {item.title}
                    </h3>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== SECTION: PROCESS (Cinematic Zig-Zag Narrative) ====================
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const steps = [
    { num: '01', title: 'Planning & Research', desc: 'We dive deep into your business goals, audience, and competition to create a strategic roadmap for success.', icon: Search, indicator: 'Technical Audit' },
    { num: '02', title: 'Design & Development', desc: 'Our creative team crafts pixel-perfect designs and builds robust, scalable solutions using cutting-edge technology.', icon: Code, indicator: 'Logic Mapping' },
    { num: '03', title: 'Testing & Launch', desc: 'Every element is rigorously tested across devices and browsers before we deploy your project to the world.', icon: Zap, indicator: 'Zero Latency' },
    { num: '04', title: 'Support & Growth', desc: 'We provide ongoing support and optimization to ensure your digital presence continues to evolve and succeed.', icon: TrendingUp, indicator: 'Strategic Scale' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Section Header Animation
      gsap.fromTo(
        sectionRef.current!.querySelector('.section-header'),
        { y: 60, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      // Neon Logic Line Drawing Animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1, duration: 2, ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current!.querySelector('.process-container'),
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 1,
            }
          }
        );
      }

      // Step Cards Staggered Logic Sequence
      stepCardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isEven = i % 2 === 0;
        gsap.fromTo(
          card,
          { x: isEven ? -100 : 100, opacity: 0, scale: 0.9 },
          {
            x: 0, opacity: 1, scale: 1,
            duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );

        // Glass Shine / Tilt Hover Logic
        if (!reduced) {
          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateY: x * 10,
              rotateX: -y * 10,
              duration: 0.4,
              ease: 'power2.out',
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power4.out' });
          });
        }
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" ref={sectionRef} className="py-32 bg-[#0a0612] relative overflow-hidden">
      {/* Immersive Background Decor */}
      <div className="absolute inset-0 mesh-gradient-purple opacity-20" />
      <div className="absolute inset-0 bg-[#0a0612]/60 backdrop-blur-3xl" />
      
      {/* Pulsing Atmosphere */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-vare-purple/10 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-vare-gold/5 rounded-full blur-[120px] animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-header text-center mb-24">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
             System Protocol
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            Execution <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Roadmap</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            A precision-engineered lifecycle designed to deliver technical dominance at scale.
          </p>
        </div>

        {/* Narrative Narrative Flow Container */}
        <div className="process-container relative min-h-[1200px] md:min-h-0">
          {/* Central Pulsing Neon Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 -translate-x-1/2 w-0.5 bg-white/10 overflow-hidden">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-vare-purple via-vare-purple-light to-transparent origin-top" />
          </div>

          <div className="space-y-16 xs:space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-48">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-12 md:gap-0 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Visual Step Card */}
                <div className="w-full md:w-[42%]">
                  <div 
                    ref={(el) => { stepCardRefs.current[i] = el; }}
                    className="group glass-card-accent p-8 md:p-12 rounded-[3.5rem] border border-white/5 relative transform preserve-3d"
                  >
                    {/* Atmospheric Glow */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-vare-purple/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-3xl xs:text-4xl sm:text-5xl font-black text-white/5 tracking-tighter uppercase group-hover:text-vare-purple-light/20 transition-colors duration-500">
                          {step.num}
                        </span>
                        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-gold text-[10px] font-black uppercase tracking-[0.2em]">
                          {step.indicator}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter leading-none">
                        {step.title}
                      </h3>
                      <p className="text-white/40 text-lg leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>

                    {/* Glass Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none rounded-[3.5rem]" />
                  </div>
                </div>

                {/* Central Connector Node */}
                <div className="hidden md:flex relative z-20 w-[16%] justify-center items-center">
                   <div className="w-6 h-6 rounded-full bg-vare-purple border-[4px] border-[#0a0612] shadow-[0_0_20px_#5b2d9e] z-10" />
                   <div className="absolute w-12 h-12 bg-vare-purple/30 rounded-full animate-ping" />
                </div>

                {/* Empty Space for Zig-Zag */}
                <div className="hidden md:block w-[42%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Final Meta Link */}
        <div className="text-center mt-32">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-white/40 hover:text-vare-purple-light font-black text-xs uppercase tracking-[0.2em] transition-all"
          >
            Detailed Operational Protocol <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==================== SECTION: FAQ DATA ====================
const faqItems = [
  { q: 'How long does it take to design and develop a website?', a: 'Our typical website projects take 2-6 weeks depending on complexity. A simple brochure site can be delivered in as little as 1 week, while complex web applications with custom functionality may take 8-12 weeks. We always provide a detailed timeline before starting.' },
  { q: 'Do you offer ongoing maintenance and support?', a: 'Yes, we offer flexible maintenance plans to keep your website secure, fast, and up-to-date. Our plans include regular updates, security patches, performance monitoring, content updates, and priority support. We offer monthly and annual plans to suit every budget.' },
  { q: 'What is your design process like?', a: 'Our process starts with a discovery phase where we learn about your business goals and audience. We then move to wireframing, visual design, development, testing, and launch. You will receive regular updates and opportunities for feedback at every stage of the process.' },
  { q: 'Can you redesign my existing website?', a: 'Absolutely! We specialize in website redesigns that modernize your online presence while preserving your brand identity. We analyze your current site, identify areas for improvement, and create a fresh design that improves user experience, performance, and conversion rates.' },
  { q: 'Do you provide SEO services with web design?', a: 'Yes, every website we build includes foundational SEO setup including meta tags, schema markup, sitemap, and optimized page structure. We also offer advanced SEO packages with content strategy, keyword research, link building, and ongoing optimization to improve your search rankings.' },
  { q: 'What technologies do you use for development?', a: 'We use modern, industry-standard technologies including React, Next.js, Node.js, TypeScript, and Tailwind CSS for front-end development. For back-end, we work with various platforms including WordPress, Shopify, and custom solutions built with Prisma and PostgreSQL.' },
];

// ==================== SECTION: TESTIMONIALS DATA ====================
const testimonials = [
  { name: 'Lisa Jo Davis', role: 'Founder, Healing Light With Lisa Jo', text: 'VareWeb transformed our online presence completely. The team delivered beyond our expectations with a stunning website that drives real results for our business. Their attention to detail is unmatched.', rating: 5 },
  { name: 'Rachel Kennard', role: 'Co-Founder Exotic Dent Works', text: 'Working with VareWeb was an absolute pleasure. Their attention to detail and creative approach helped us stand out in a crowded market. Revenue increased by 200% within three months of launch.', rating: 5 },
  { name: 'Todd Garner', role: 'Co-Founder, Viara Journeys', text: 'The results speak for themselves. Our conversions increased by 300% after the redesign. Best investment we have made for our digital presence. The team was professional and responsive throughout.', rating: 5 },
];

// ==================== SECTION: TESTIMONIALS + FAQ (Split Layout) ====================
function TestimonialsAndFAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isDraggingCard = useRef(false);
  const dragStartX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragThreshold = useRef(0);

  const goTo = useCallback((index: number, direction?: 'left' | 'right') => {
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;
    const dir = direction || (index > active ? 'left' : 'right');
    const content = cardContentRef.current;
    if (!content) return;
    gsap.to(content, {
      x: dir === 'left' ? -60 : 60, opacity: 0, duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        setActive(index);
        gsap.set(content, { x: dir === 'left' ? 60 : -60, opacity: 0 });
        gsap.to(content, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
      },
    });
  }, [active]);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => { goTo(active + 1, 'left'); }, 5000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [active, goTo]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => { goTo(active + 1, 'left'); }, 5000);
  }, [active, goTo]);

  const prev = useCallback(() => { goTo(active - 1, 'right'); resetAutoPlay(); }, [active, goTo, resetAutoPlay]);
  const next = useCallback(() => { goTo(active + 1, 'left'); resetAutoPlay(); }, [active, goTo, resetAutoPlay]);

  const handleCardDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDraggingCard.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    dragThreshold.current = 0;
  }, []);

  const handleCardDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingCard.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragThreshold.current = clientX - dragStartX.current;
  }, []);

  const handleCardDragEnd = useCallback(() => {
    if (!isDraggingCard.current) return;
    isDraggingCard.current = false;
    if (Math.abs(dragThreshold.current) > 50) {
      if (dragThreshold.current < 0) next(); else prev();
    }
  }, [next, prev]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const faqHeader = sectionRef.current?.querySelector('.section-header');
      if (faqHeader) {
        gsap.fromTo(
          faqHeader,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
        );
      }

      const faqItems = sectionRef.current?.querySelectorAll('.faq-item');
      if (faqItems && faqItems.length) {
        gsap.fromTo(
          faqItems,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
        );
      }

      const testimonialWrapper = sectionRef.current?.querySelector('.testimonial-card-wrapper');
      if (testimonialWrapper) {
        gsap.fromTo(
          testimonialWrapper,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
        );
      }
    }, sectionRef.current!);
    return () => ctx.revert();
  }, []);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden bg-[#0a0612]">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 mesh-gradient-dark opacity-40" />
      <div className="absolute inset-0 bg-[#0a0612]/60 backdrop-blur-3xl" />

      {/* Floating translucent 3D shapes */}
      <div className="absolute top-[8%] left-[5%] w-20 h-20 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,187,0.4), rgba(124,77,187,0.1))', animation: 'float-slow 18s ease-in-out infinite' }} />
      <div className="absolute top-[20%] right-[8%] w-16 h-16 opacity-10 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.05))', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'floatShape3 22s ease-in-out infinite 2s' }} />
      <div className="absolute bottom-[15%] left-[12%] w-24 h-24 opacity-[0.06] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.05))', borderRadius: '30%', animation: 'floatShape2 25s ease-in-out infinite 4s' }} />
      <div className="absolute top-[60%] right-[15%] w-14 h-14 rounded-full opacity-[0.08] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4), rgba(16,185,129,0.1))', animation: 'float-slow 20s ease-in-out infinite reverse' }} />
      <div className="absolute bottom-[30%] right-[25%] w-10 h-10 opacity-[0.07] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(124,77,187,0.3), rgba(124,77,187,0.05))', borderRadius: '4px', animation: 'floatShape1 16s ease-in-out infinite 3s' }} />
      <div className="absolute top-[40%] left-[20%] w-12 h-12 opacity-[0.05] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(236,72,153,0.15))', borderRadius: '30%', animation: 'floatShape3 24s ease-in-out infinite 1s reverse' }} />

      {/* Keyframes for section shapes */}
      <style>{`
        @keyframes floatShape1 { 0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); } 50% { transform: translateY(-25px) translateX(10px) rotate(180deg); } }
        @keyframes floatShape2 { 0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); } 33% { transform: translateY(-18px) translateX(-12px) rotate(120deg); } 66% { transform: translateY(-30px) translateX(8px) rotate(240deg); } }
        @keyframes floatShape3 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-35px) rotate(-90deg); } }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-header text-center mb-20">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.03] text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6 border border-white/[0.08]">
             Client Success
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Trusted by Leaders <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">& Creators</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Hear from our delighted customers and find answers to frequently asked questions.
          </p>
        </div>

        {/* Split layout: FAQ left, Testimonial right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: FAQ Accordion with glass-morphism */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-vare-purple/20 flex items-center justify-center border border-white/10">
                <FileText className="w-5 h-5 text-vare-purple-light" />
              </div>
              General Inquiries
            </h3>
            {faqItems.map((faq, i) => (
              <div
                key={i}
                className="faq-item rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-bold text-white/80 pr-4 leading-relaxed">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-vare-purple-light flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === i ? '400px' : '0px',
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <p className="px-6 pb-6 text-sm text-white/40 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Testimonial Card — clean glass design */}
          <div className="testimonial-card-wrapper">
            <div className="relative rounded-[32px] glass-card border-white/5 overflow-hidden">
              <div
                className="relative p-8 sm:p-10 cursor-grab select-none overflow-hidden"
                onMouseDown={handleCardDragStart}
                onMouseMove={handleCardDragMove}
                onMouseUp={handleCardDragEnd}
                onMouseLeave={handleCardDragEnd}
                onTouchStart={handleCardDragStart}
                onTouchMove={handleCardDragMove}
                onTouchEnd={handleCardDragEnd}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-vare-gold/5 rounded-full blur-3xl" />

                <div className="relative">
                  {/* Section label */}
                  <h3 className="text-vare-purple/60 text-sm font-medium uppercase tracking-wider mb-6">Client Testimonial</h3>

                  <Quote className="w-8 h-8 text-vare-gold/40 mb-5" />

                  {/* Animated content */}
                  <div ref={cardContentRef}>
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 text-vare-gold fill-vare-gold" />
                      ))}
                    </div>
                    <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed mb-10 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-vare-purple to-vare-purple-light flex items-center justify-center text-white font-bold text-xl shadow-2xl border border-white/20">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{t.name}</p>
                        <p className="text-vare-purple-light text-xs font-bold uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Arrows */}
                  <div className="flex items-center gap-3 mt-8">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-full bg-vare-purple/[0.08] border border-vare-purple/15 flex items-center justify-center text-vare-purple hover:bg-vare-purple/15 hover:border-vare-purple/30 transition-all duration-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-full bg-vare-purple/[0.08] border border-vare-purple/15 flex items-center justify-center text-vare-purple hover:bg-vare-purple/15 hover:border-vare-purple/30 transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    {/* Dots */}
                    <div className="flex items-center gap-1.5 ml-4">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { goTo(i); resetAutoPlay(); }}
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{
                            width: active === i ? '24px' : '8px',
                            backgroundColor: active === i ? '#3a1a70' : 'rgba(58,26,112,0.2)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== SECTION: CLIENT VIDEO REVIEWS ====================
const videoTestimonials = [
  {
    name: 'Lisa Jo Davis',
    role: 'Founder, Healing Light With Lisa Jo',
    quote: 'VareWeb transformed our online presence completely. Our conversion rates doubled within the first month of launching the new site.',
    gradient: 'from-purple-500 to-indigo-600',
    videoUrl: 'https://res.cloudinary.com/dahmphiup/video/upload/v1775840925/lisa-jo-davis-review_aey8d0.mp4',
    thumbnailImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/Untitled_2_b19sk4.webp',
    profileImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/Untitled_2_b19sk4.webp',
  },
  {
    name: 'Rachel Kennard',
    role: 'Co-founder, Exotic Dent Works',
    quote: 'The team at VareWeb understood our vision perfectly. They delivered a website that exceeded all our expectations.',
    gradient: 'from-blue-500 to-teal-500',
    videoUrl: 'https://res.cloudinary.com/dahmphiup/video/upload/v1775840971/Webiste-Review-Vareweb_xpxdq4.mp4',
    thumbnailImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/Poster_t5l9wy.webp',
    profileImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/Poster_t5l9wy.webp',
  },
  {
    name: 'Jarmaine Parris',
    role: 'Founder, StyleHub',
    quote: 'Working with VareWeb was the best investment we made for our brand. The ROI has been incredible.',
    gradient: 'from-teal-400 to-emerald-500',
    videoUrl: 'https://res.cloudinary.com/dahmphiup/video/upload/v1775840959/client-review_qkmuzs.mp4',
    thumbnailImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842369/frame-1-6_ppejbp.png',
    profileImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842369/frame-1-6_ppejbp.png',
  },
  {
    name: 'Tony Kennard',
    role: 'Co-founder, Exotic Dent Works',
    quote: 'Their technical expertise combined with creative design skills makes VareWeb stand out from every other agency we\'ve worked with.',
    gradient: 'from-orange-500 to-red-500',
    videoUrl: 'https://res.cloudinary.com/dahmphiup/video/upload/v1775840962/uri_ifs___V_o8R7B_lFsXs6X-6wLepRp3U3oQR4Lb1mu2ndNiCCZyk_e5748p.mp4',
    thumbnailImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842370/tony_osxvwr.png',
    profileImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842370/tony_osxvwr.png',
  },
  {
    name: 'Todd Garner',
    role: 'Co-founder, Viara Journeys',
    quote: 'From concept to launch, VareWeb was professional, responsive, and delivered beyond what we imagined possible.',
    gradient: 'from-pink-500 to-purple-500',
    videoUrl: 'https://res.cloudinary.com/dahmphiup/video/upload/v1775840936/Todd-Garner-Review_neylgu.mp4',
    thumbnailImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/Untitled-4_epbgn8.webp',
    profileImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/Untitled-4_epbgn8.webp',
  },
  {
    name: 'Tiya Hopewell Cooper',
    role: 'Owner, Thompson Restaurants',
    quote: 'Our online orders increased by 300% after VareWeb redesigned our website. Absolutely phenomenal work.',
    gradient: 'from-indigo-500 to-blue-600',
    videoUrl: 'https://res.cloudinary.com/dahmphiup/video/upload/v1775840937/WhatsApp-Video-2025-11-22-at-01.11.35_567e97a3_ifyjnw.mp4',
    thumbnailImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/frame-1_7_ogum5g.png',
    profileImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/frame-1_7_ogum5g.png',
  },
  {
    name: 'Bob Bowden',
    role: 'Founder Dino West Aventures',
    quote: 'Our online orders increased by 300% after VareWeb redesigned our website. Absolutely phenomenal work.',
    gradient: 'from-indigo-500 to-blue-600',
    videoUrl: 'https://res.cloudinary.com/dahmphiup/video/upload/v1775840924/dino-west-review_lf3byr.mp4',
    thumbnailImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/dino-west-review_q8gueu.jpg',
    profileImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842368/dino-west-review_q8gueu.jpg',
  },
  {
    name: 'Peggie Smith',
    role: 'Founder ArtisticCreations',
    quote: 'Our online orders increased by 300% after VareWeb redesigned our website. Absolutely phenomenal work.',
    gradient: 'from-indigo-500 to-blue-600',
    videoUrl: 'https://res.cloudinary.com/dahmphiup/video/upload/v1775843185/you_how_Vareweb_has_1_1_wdab1l.mp4',
    thumbnailImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842993/peggi_iqldfi.webp',
    profileImage: 'https://res.cloudinary.com/dahmphiup/image/upload/v1775842993/peggi_iqldfi.webp',
  },
];

function ClientVideoReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<typeof videoTestimonials[0] | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Particle dots data (deterministic)
  const particles = [
    { id: 0, top: '8%', left: '12%', size: 3, opacity: 0.12, delay: '0s', duration: '18s' },
    { id: 1, top: '15%', left: '45%', size: 2, opacity: 0.08, delay: '1.5s', duration: '22s' },
    { id: 2, top: '25%', left: '78%', size: 4, opacity: 0.1, delay: '3s', duration: '20s' },
    { id: 3, top: '35%', left: '22%', size: 2, opacity: 0.06, delay: '0.5s', duration: '25s' },
    { id: 4, top: '45%', left: '65%', size: 3, opacity: 0.09, delay: '2s', duration: '19s' },
    { id: 5, top: '55%', left: '35%', size: 2, opacity: 0.07, delay: '4s', duration: '23s' },
    { id: 6, top: '65%', left: '88%', size: 3, opacity: 0.11, delay: '1s', duration: '21s' },
    { id: 7, top: '75%', left: '52%', size: 2, opacity: 0.05, delay: '3.5s', duration: '26s' },
    { id: 8, top: '85%', left: '15%', size: 4, opacity: 0.08, delay: '2.5s', duration: '17s' },
    { id: 9, top: '90%', left: '72%', size: 3, opacity: 0.06, delay: '0.8s', duration: '24s' },
    { id: 10, top: '20%', left: '92%', size: 2, opacity: 0.09, delay: '1.2s', duration: '20s' },
    { id: 11, top: '50%', left: '8%', size: 3, opacity: 0.07, delay: '2.8s', duration: '22s' },
    { id: 12, top: '70%', left: '42%', size: 2, opacity: 0.1, delay: '0.3s', duration: '18s' },
    { id: 13, top: '40%', left: '55%', size: 4, opacity: 0.05, delay: '3.2s', duration: '25s' },
    { id: 14, top: '10%', left: '30%', size: 2, opacity: 0.08, delay: '1.8s', duration: '21s' },
    { id: 15, top: '80%', left: '28%', size: 3, opacity: 0.06, delay: '4.2s', duration: '19s' },
    { id: 16, top: '5%', left: '60%', size: 2, opacity: 0.1, delay: '0.6s', duration: '23s' },
    { id: 17, top: '60%', left: '82%', size: 3, opacity: 0.07, delay: '2.2s', duration: '20s' },
    { id: 18, top: '30%', left: '5%', size: 2, opacity: 0.09, delay: '3.8s', duration: '24s' },
    { id: 19, top: '95%', left: '48%', size: 4, opacity: 0.05, delay: '1.5s', duration: '22s' },
  ];

  const handleVideoClick = (video: typeof videoTestimonials[0]) => {
    setSelectedVideo(video);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header fades in from bottom on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }

      // Video cards stagger in from bottom
      const videoCards = sectionRef.current?.querySelectorAll('.video-card');
      if (videoCards && videoCards.length) {
        gsap.fromTo(
          videoCards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        );
      }
    }, sectionRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden mesh-gradient-dark">
        <div className="absolute inset-0 bg-[#0a0612]/60 backdrop-blur-3xl" />
        
        {/* Floating particle dots */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                background: 'radial-gradient(circle, rgba(124,77,187,0.5), rgba(124,77,187,0.2))',
                animation: `floatShape1 ${p.duration} ease-in-out infinite ${p.delay}`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-20 opacity-0">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-vare-purple/20 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
              <Quote className="w-4 h-4 mr-2 text-vare-gold" />
              Social Proof
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Client Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Reviews</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
              Real stories from business leaders who scaled with VareWeb
            </p>
          </div>

          {/* Vertical Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {videoTestimonials.map((video, i) => (
              <div
                key={i}
                ref={(el) => { if(cardsRef.current) cardsRef.current[i] = el; }}
                className="video-card group cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative h-full glass-card rounded-[32px] overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Vertical Thumbnail Area (9:16) */}
                  <div className="relative aspect-[9/16] overflow-hidden bg-gradient-to-br from-[#1a1128] to-[#0a0612]">
                    {/* Thumbnail Image */}
                    <img 
                      src={video.thumbnailImage} 
                      alt={video.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent opacity-40" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-vare-purple group-hover:scale-110 group-hover:border-vare-purple-light transition-all duration-500 shadow-2xl">
                        <Play className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white ml-1 fill-white" />
                      </div>
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/80 to-transparent">
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={video.profileImage}
                          alt={video.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-lg"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-white font-bold text-sm truncate">{video.name}</h4>
                          <p className="text-white/50 text-[10px] uppercase tracking-widest truncate">{video.role}</p>
                        </div>
                      </div>
                      <p className="text-white/70 text-xs leading-relaxed line-clamp-3 italic">
                        &ldquo;{video.quote}&rdquo;
                      </p>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                      {String(2).padStart(2, '0')}:{String(30 + i * 7).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Popup */}
      {selectedVideo && (
        <VideoPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          video={selectedVideo}
        />
      )}
    </>
  );
}

// ==================== SECTION: WHY CHOOSE US (UNCHANGED) ====================
function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reasonCards = sectionRef.current?.querySelectorAll('.reason-card');
      if (reasonCards && reasonCards.length) {
        gsap.fromTo(
          reasonCards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
        );
      }

      if (reduced) return;

      // Floating icon bobbing animation
      iconRefs.current.forEach((icon, i) => {
        if (!icon) return;
        gsap.to(icon, {
          y: -8,
          duration: 2 + i * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
          force3D: true,
        });
      });

      // 3D perspective tilt on hover for each card
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = (me.clientX - rect.left) / rect.width - 0.5;
          const y = (me.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 10,
            rotateX: -y * 6,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true,
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: 'power2.out',
            force3D: true,
          });
        });
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  const reasons = [
    { icon: Shield, title: 'Proven Results', desc: '15,000+ successful projects with measurable business impact across diverse industries.' },
    { icon: Users, title: 'Expert Team', desc: '50+ skilled professionals specializing in design, development, and digital strategy.' },
    { icon: Clock, title: 'Fast Delivery', desc: 'Website delivery in as little as 24 hours without compromising on quality standards.' },
    { icon: Zap, title: 'Innovative Design', desc: 'Cutting-edge designs that push boundaries while maintaining usability and conversion focus.' },
  ];

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Background patterns */}
      <div className="absolute inset-0 mesh-gradient-dark opacity-30" />
      <div className="absolute inset-0 bg-[#0a0612]/30 backdrop-blur-3xl" />
      {/* Background grid pattern with perspective */}
      {!reduced && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,77,187,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,77,187,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(600px) rotateX(15deg)',
            transformOrigin: 'center top',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.03] text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6 border border-white/[0.08]">
             The Vare Difference
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Why Brands Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">VareWeb</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={i}
                ref={(el) => { if(cardRefs.current) cardRefs.current[i] = el; }}
                className="reason-card glass-card rounded-[32px] p-6 xs:p-8 border border-white/5 hover:border-white/20 transition-all duration-300 text-center group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  ref={(el) => { if(iconRefs.current) iconRefs.current[i] = el; }}
                  className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-6 group-hover:bg-vare-purple transition-all duration-300 shadow-2xl border border-white/5"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <reason.icon className="w-8 h-8 text-vare-purple-light group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{reason.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

// ==================== SECTION: LATEST FROM BLOG (UNCHANGED) ====================
function LatestBlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blogCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const [blogs, setBlogs] = useState<{ id: string; title: string; excerpt: string; category: string; createdAt: string; slug?: string }[]>([]);

  useEffect(() => {
    fetch('/api/blogs?limit=3&status=PUBLISHED')
      .then((r) => r.json())
      .then((data) => setBlogs(data.data || data.posts || []))
      .catch(() => {
        setBlogs([
          { id: '1', title: 'How to Get Your Website Cited by AI Search Engines', excerpt: 'Learn the strategies to make your website visible in AI-powered search results.', category: 'SEO', createdAt: new Date().toISOString() },
          { id: '2', title: 'Why Modern Web Design Drives Business Growth', excerpt: 'Discover how investing in professional web design translates to measurable business results.', category: 'Web Design', createdAt: new Date().toISOString() },
          { id: '3', title: 'The Future of Digital Branding in 2025', excerpt: 'Explore emerging trends in branding and how to position your business for success.', category: 'Branding', createdAt: new Date().toISOString() },
        ]);
      });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blogHeader = sectionRef.current?.querySelector('.section-header');
      if (blogHeader) {
        gsap.fromTo(
          blogHeader,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
        );
      }
      const blogCards = sectionRef.current?.querySelectorAll('.blog-card');
      const blogGrid = sectionRef.current?.querySelector('.blog-grid');
      if (blogCards && blogCards.length && blogGrid) {
        gsap.fromTo(
          blogCards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: blogGrid, start: 'top 80%' } }
        );
      }

      if (reduced) return;

      // 3D tilt on hover for blog cards
      blogCardRefs.current.forEach((card) => {
        if (!card) return;
        card.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = (me.clientX - rect.left) / rect.width - 0.5;
          const y = (me.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 5,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true,
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: 'power2.out',
            force3D: true,
          });
        });
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#0d0716] relative overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Subtle moving gradient background */}
      {!reduced && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(124,77,187,0.03) 0%, transparent 40%, rgba(245,158,11,0.03) 70%, transparent 100%)',
            backgroundSize: '200% 200%',
            animation: 'blogGradientShift 8s ease-in-out infinite',
          }}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-header text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.05] text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6 border border-white/[0.1]">
             Knowledge Hub
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Latest from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Blog</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Stay updated with the latest trends, tips, and insights in web design and digital marketing.
          </p>
        </div>
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <Link
                key={blog.id}
                ref={(el) => { if(blogCardRefs.current) blogCardRefs.current[i] = el; }}
                href={blog.slug ? `/blog/${blog.slug}` : '/blog'}
                className="blog-card group cursor-pointer block glass-card rounded-3xl p-4 border-white/5 hover:border-white/15 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-vare-purple/40 to-violet-600/20 mb-6 overflow-hidden relative border border-white/5">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-white/10" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      {blog.category || 'General'}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-vare-purple-light transition-colors duration-300 line-clamp-2 px-1">
                  {blog.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed line-clamp-2 px-1">{blog.excerpt}</p>
                <div className="mt-6 flex items-center text-vare-purple-light font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-1">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ))}
        </div>
        <div className="text-center mt-16 sm:mt-20">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 bg-white/0"
          >
            Explore Journal <ArrowRight className="ml-3 w-4 h-4" />
          </Link>
        </div>
      </div>
      {/* Blog gradient animation keyframes */}
      {!reduced && (
        <style>{`
          @keyframes blogGradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      )}
    </section>
  );
}

// ==================== FLOATING 3D ELEMENTS (Global Page Decor) ====================
function FloatingElements() {
  const shapes = [
    { type: 'circle', size: 44, top: '3%', left: '7%', opacity: 0.08, duration: '20s', delay: '0s', bg: 'radial-gradient(circle, rgba(124,77,187,0.4), rgba(124,77,187,0.1))' },
    { type: 'square', size: 32, top: '12%', left: '92%', opacity: 0.06, duration: '25s', delay: '2s', bg: 'linear-gradient(135deg, rgba(124,77,187,0.3), rgba(124,77,187,0.1))' },
    { type: 'triangle', size: 38, top: '28%', left: '4%', opacity: 0.1, duration: '18s', delay: '4s', bg: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.05))' },
    { type: 'circle', size: 52, top: '42%', left: '93%', opacity: 0.05, duration: '22s', delay: '1s', bg: 'radial-gradient(circle, rgba(139,92,246,0.4), rgba(139,92,246,0.1))' },
    { type: 'square', size: 26, top: '58%', left: '6%', opacity: 0.08, duration: '28s', delay: '3s', bg: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.05))' },
    { type: 'triangle', size: 46, top: '72%', left: '90%', opacity: 0.07, duration: '24s', delay: '5s', bg: 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(236,72,153,0.05))' },
    { type: 'circle', size: 36, top: '85%', left: '11%', opacity: 0.06, duration: '19s', delay: '2s', bg: 'radial-gradient(circle, rgba(124,77,187,0.3), rgba(124,77,187,0.1))' },
    { type: 'hexagon', size: 30, top: '50%', left: '96%', opacity: 0.09, duration: '23s', delay: '4s', bg: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(124,77,187,0.15))' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <style>{`
        @keyframes floatingShapeA {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(8px) rotate(45deg); }
          50% { transform: translateY(-28px) translateX(-5px) rotate(180deg); }
          75% { transform: translateY(-10px) translateX(12px) rotate(270deg); }
        }
        @keyframes floatingShapeB {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(-120deg); }
        }
        @keyframes floatingShapeC {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-22px) translateX(-10px) rotate(90deg); }
          66% { transform: translateY(-38px) translateX(6px) rotate(200deg); }
        }
      `}</style>
      {shapes.map((shape, i) => {
        const anim = i % 3 === 0 ? 'floatingShapeA' : i % 3 === 1 ? 'floatingShapeB' : 'floatingShapeC';
        const dir = i % 2 === 0 ? 'normal' : 'reverse';
        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: shape.top,
              left: shape.left,
              width: shape.size,
              height: shape.size,
              opacity: shape.opacity,
              background: shape.bg,
              borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'hexagon' ? '30%' : shape.type === 'triangle' ? '0' : '4px',
              clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
              animation: `${anim} ${shape.duration} ease-in-out infinite ${shape.delay}`,
              animationDirection: dir,
            }}
          />
        );
      })}
    </div>
  );
}

// ==================== CTA BANNER (3D Orbs + Mesh Gradient) ====================
function CTABannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const orbs = [orb1Ref, orb2Ref, orb3Ref, orb4Ref];
      orbs.forEach((orbRef, i) => {
        if (!orbRef.current) return;
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const speed = [0.15, -0.2, 0.1, -0.12][i] || 0.1;
            gsap.to(orbRef.current, {
              y: self.progress * speed * 300,
              x: Math.sin(self.progress * Math.PI * 2 + i) * 30,
              ease: 'none',
              force3D: true,
            });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden gradient-purple-dark">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(at 30% 20%, rgba(139,92,246,0.3) 0%, transparent 50%),
          radial-gradient(at 70% 80%, rgba(245,158,11,0.15) 0%, transparent 50%),
          radial-gradient(at 50% 50%, rgba(124,77,187,0.2) 0%, transparent 60%),
          radial-gradient(at 80% 20%, rgba(16,185,129,0.1) 0%, transparent 40%),
          radial-gradient(at 20% 80%, rgba(236,72,153,0.08) 0%, transparent 40%),
          linear-gradient(135deg, #1a0533 0%, #2a1050 30%, #3a1a70 60%, #1a0533 100%)
        `
      }} />

      {/* 3D floating orbs with parallax */}
      <div ref={orb1Ref} className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full opacity-20 blur-[60px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6), rgba(139,92,246,0.1), transparent 70%)' }} />
      <div ref={orb2Ref} className="absolute bottom-[5%] right-[10%] w-96 h-96 rounded-full opacity-15 blur-[80px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.5), rgba(245,158,11,0.1), transparent 70%)' }} />
      <div ref={orb3Ref} className="absolute top-[40%] right-[20%] w-48 h-48 rounded-full opacity-20 blur-[50px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5), rgba(16,185,129,0.1), transparent 70%)' }} />
      <div ref={orb4Ref} className="absolute bottom-[30%] left-[25%] w-64 h-64 rounded-full opacity-15 blur-[70px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.4), rgba(236,72,153,0.1), transparent 70%)' }} />

      {/* Spinning rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.03] pointer-events-none" style={{ animation: 'spin 30s linear infinite' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/[0.04] pointer-events-none" style={{ animation: 'spin 20s linear infinite reverse' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/[0.05] pointer-events-none" style={{ animation: 'spin 15s linear infinite' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4 text-vare-gold" />
          Start Your Journey
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight relative">
          <span className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-vare-gold via-yellow-300 to-vare-gold" />
          Ready to Build Something
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-vare-gold bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
            Extraordinary?
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of businesses that have transformed their digital presence with us. Your success story is just one conversation away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/contact" className="group relative inline-flex items-center px-8 py-4 text-base font-semibold text-vare-purple-dark bg-white rounded-xl hover:shadow-2xl hover:shadow-white/30 transform hover:-translate-y-1.5 transition-all duration-300">
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight className="ml-2 w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link href="/portfolio" className="inline-flex items-center px-8 py-4 text-base font-medium text-white border-2 border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300">
            View Our Work <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==================== MAIN PAGE ====================
export default function HomePage() {
  return (
    <main>
      <FloatingElements />
      <Navigation />
      <div className="relative z-10">
      <HeroSection />

      <CounterSection />

      <TrustedBySection />

      <ServicesSection />

      <PortfolioSection />

      <ProcessSection />

      <TestimonialsAndFAQSection />
      <ClientVideoReviewsSection />

      <WhyChooseUsSection />

      <LatestBlogSection />

      {/* CTA Banner - Right Above Footer */}
      <CTABannerSection />

      </div>{/* end relative z-10 wrapper */}
      <Footer />
    </main>
  );
}
