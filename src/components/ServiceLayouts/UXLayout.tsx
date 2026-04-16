'use client';

import React from 'react';
import { ServiceData } from '../../app/services/[slug]/data';
import { BookOpen } from 'lucide-react';

export default function UXLayout({ service }: { service: ServiceData }) {
  return (
    <section className="py-20 bg-[#07101a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-8">
          <div>
            <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black mb-3">UX / UI Showcase</div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">Prototype & Usability</h3>
            <p className="text-white/40 mb-6">Interactive prototypes, user testing outputs, and design system deliverables that reduce development risk and improve outcomes.</p>
            <div className="glass-card p-4 rounded-2xl border-white/5">
              <div className="text-sm font-black text-white">Usability Highlights</div>
              <ul className="mt-3 text-white/40 list-disc list-inside">
                {service.highlights.slice(0, 4).map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="w-full h-[320px] bg-white/[0.02] rounded-2xl border border-white/5 flex items-center justify-center text-white/30">
              Prototype preview placeholder
            </div>
          </div>
        </div>

        <div className="glass-card-accent p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-vare-purple-light" />
            </div>
            <div>
              <div className="text-sm font-black text-white">Design System Delivery</div>
              <div className="text-white/40 text-sm">We deliver component libraries, tokens, and documentation for fast developer handoff.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
