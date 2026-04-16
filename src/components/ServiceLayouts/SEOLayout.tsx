'use client';

import React from 'react';
import { ServiceData } from '../../app/services/[slug]/data';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function SEOLayout({ service }: { service: ServiceData }) {
  return (
    <section className="py-20 bg-[#07101a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black">SEO & Performance</div>
          <h3 className="text-4xl md:text-5xl font-black text-white">Data-Driven Organic Growth</h3>
          <p className="text-white/40 mt-3">Technical SEO, content strategy, and link building combined to improve visibility and drive qualified traffic.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl border-white/5">
            <div className="text-xs text-white/40 uppercase tracking-widest">Organic Traffic</div>
            <div className="text-3xl font-black text-vare-purple-light mt-4">+68%</div>
            <div className="text-white/30 mt-2 text-sm">QoQ traffic growth on average for recent clients</div>
          </div>
          <div className="glass-card p-6 rounded-2xl border-white/5">
            <div className="text-xs text-white/40 uppercase tracking-widest">Keyword Wins</div>
            <div className="text-3xl font-black text-vare-purple-light mt-4">120+</div>
            <div className="text-white/30 mt-2 text-sm">Top 10 rankings across targeted terms</div>
          </div>
          <div className="glass-card p-6 rounded-2xl border-white/5">
            <div className="text-xs text-white/40 uppercase tracking-widest">Conversion Lift</div>
            <div className="text-3xl font-black text-vare-purple-light mt-4">+24%</div>
            <div className="text-white/30 mt-2 text-sm">Average conversion increase from SEO-led improvements</div>
          </div>
        </div>

        <div className="glass-card-accent p-6 rounded-3xl border border-white/10">
          <div className="text-sm text-vare-purple-light uppercase tracking-widest font-black mb-4">Top Keyword Targets</div>
          <div className="flex flex-wrap gap-2">
            {service.technologies.slice(0, 10).map((k, i) => (
              <span key={i} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-black uppercase">{k}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
