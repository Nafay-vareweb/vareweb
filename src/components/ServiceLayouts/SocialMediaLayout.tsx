"use client";

import React from 'react';

export default function SocialMediaLayout({ service }: { service?: any }) {
  return (
    <section className="sp-md bg-brandDark relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(71,142,206,.09) 1px,transparent 1px)', backgroundSize: '26px 26px', opacity: 0.6 }}
      />

      <div className="absolute top-0 right-0 w-[clamp(250px,40vw,550px)] h-[clamp(250px,40vw,550px)] rounded-full bg-primary/[.05] blur-[90px] pointer-events-none" />

      <div className="wrap relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-20 sr on">
          <span className="text-[10px] font-black uppercase tracking-[.4em] text-primary/60 block mb-4">Content Calendar</span>
          <h2 className="font-display text-[clamp(38px,6vw,88px)] text-white">
            EVERY DAY. <span className="text-primary">PLANNED &amp; PUBLISHED.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Legend card */}
          <div className="plat-card sr-l bg-white/[.04] border border-white/[.08] p-8 sm:p-10 flex flex-col justify-between on">
            <div>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                We map out a full 30-day content roadmap every month — themes, creative, copy, timing. You approve, we execute. Zero stress on your end.
              </p>
              <div className="space-y-4">
                <div className="check-row flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <svg className="w-[9px] h-[9px] text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <span className="text-white/55 text-sm">30-day editorial roadmap</span>
                </div>
                <div className="check-row flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <svg className="w-[9px] h-[9px] text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <span className="text-white/55 text-sm">Platform-specific creative formats</span>
                </div>
                <div className="check-row flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <svg className="w-[9px] h-[9px] text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <span className="text-white/55 text-sm">Copy and captions included</span>
                </div>
                <div className="check-row flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <svg className="w-[9px] h-[9px] text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <span className="text-white/55 text-sm">Client approval before publishing</span>
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-wider text-white/50">Instagram Post</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-pink-400 flex-shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-wider text-white/50">Story / Reel</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-white/25 flex-shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-wider text-white/50">LinkedIn / Facebook</span>
              </div>
            </div>
          </div>

          {/* Calendar card */}
          <div className="plat-card sr-r bg-white/[.03] border border-white/8 p-6 sm:p-8 on" style={{ transitionDelay: '.12s' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-white text-xl sm:text-2xl">February 2026</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-xl border border-white/10 bg-white/[.03] flex items-center justify-center text-white/40 hover:text-white hover:border-primary transition-all">
                  <svg className="w-[9px] h-[9px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="w-8 h-8 rounded-xl border border-white/10 bg-white/[.03] flex items-center justify-center text-white/40 hover:text-white hover:border-primary transition-all">
                  <svg className="w-[9px] h-[9px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1.5 mb-2">
              <div className="text-center text-[9px] font-black uppercase tracking-wider text-white/25 py-1">Mo</div>
              <div className="text-center text-[9px] font-black uppercase tracking-wider text-white/25 py-1">Tu</div>
              <div className="text-center text-[9px] font-black uppercase tracking-wider text-white/25 py-1">We</div>
              <div className="text-center text-[9px] font-black uppercase tracking-wider text-white/25 py-1">Th</div>
              <div className="text-center text-[9px] font-black uppercase tracking-wider text-white/25 py-1">Fr</div>
              <div className="text-center text-[9px] font-black uppercase tracking-wider text-white/25 py-1">Sa</div>
              <div className="text-center text-[9px] font-black uppercase tracking-wider text-white/25 py-1">Su</div>
            </div>
            <div className="grid grid-cols-7 gap-1.5" id="calGrid">
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">1</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">2</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">3</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-pink-400/8 border border-pink-400/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">4</span><span className="w-2 h-2 rounded-full bg-pink-400 inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">5</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">6</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-white/8 border border-white/15 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">7</span><span className="w-2 h-2 rounded-full bg-white/40 inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">8</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">9</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-pink-400/8 border border-pink-400/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">10</span><span className="w-2 h-2 rounded-full bg-pink-400 inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">11</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">12</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-white/8 border border-white/15 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">13</span><span className="w-2 h-2 rounded-full bg-white/40 inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-pink-400/8 border border-pink-400/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">14</span><span className="w-2 h-2 rounded-full bg-pink-400 inline-block" /></div>
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">15</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">16</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-pink-400/8 border border-pink-400/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">17</span><span className="w-2 h-2 rounded-full bg-pink-400 inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">18</span><div className="flex justify-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" /><span className="w-1.5 h-1.5 rounded-full bg-white/30 inline-block" /></div></div>
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">19</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-white/8 border border-white/15 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">20</span><span className="w-2 h-2 rounded-full bg-white/40 inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">21</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-pink-400/8 border border-pink-400/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">22</span><span className="w-2 h-2 rounded-full bg-pink-400 inline-block" /></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">23</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">24</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/15 border border-primary/35 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-primary block mb-1 font-black group-hover:text-white">25</span><div className="flex justify-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" /><span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block" /></div></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-white/8 border border-white/15 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">26</span><span className="w-2 h-2 rounded-full bg-white/40 inline-block" /></div>
              <div className="cal-day group rounded-xl p-2 bg-white/[.02] text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/25 group-hover:text-white">27</span></div>
              <div className="cal-day has-post group rounded-xl p-2 bg-primary/8 border border-primary/25 text-center transition-transform transform hover:scale-105 hover:z-10 cursor-pointer"><span className="text-[10px] text-white/60 block mb-1 group-hover:text-white">28</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-display text-primary text-2xl leading-none mb-1" id="postCount">16</p>
                <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Posts Scheduled</p>
              </div>
              <div className="text-center">
                <p className="font-display text-pink-400 text-2xl leading-none mb-1" id="storyCount">8</p>
                <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Stories / Reels</p>
              </div>
              <div className="text-center">
                <p className="font-display text-white/50 text-2xl leading-none mb-1" id="crossCount">6</p>
                <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Cross-Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
