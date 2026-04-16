'use client';

import React from 'react';
import { ServiceData } from '../../app/services/[slug]/data';
import { ShoppingCart } from 'lucide-react';

const sampleProducts = [
  { id: 1, name: 'Signature Storefront', price: '$4,999' },
  { id: 2, name: 'Headless Commerce Build', price: '$9,500' },
  { id: 3, name: 'Marketplace Setup', price: '$14,900' },
];

export default function EcommerceLayout({ service }: { service: ServiceData }) {
  return (
    <section className="py-20 bg-[#07101a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black">eCommerce Solutions</div>
          <h3 className="text-4xl md:text-5xl font-black text-white">Storefronts That Convert</h3>
          <p className="text-white/40 mt-3">From product discovery to checkout optimization — we build stores that scale and convert.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sampleProducts.map((p) => (
            <div key={p.id} className="glass-card p-6 rounded-2xl border-white/5 flex flex-col justify-between">
              <div>
                <div className="text-sm text-white/40 uppercase tracking-widest">Package</div>
                <div className="text-xl font-black text-white mt-3">{p.name}</div>
                <p className="text-white/30 mt-2 text-sm">Includes storefront design, checkout flow, and basic integrations.</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-2xl font-black text-vare-purple-light">{p.price}</div>
                <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Buy
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card-accent p-6 rounded-3xl border border-white/10">
          <div className="text-white/40">We optimize product pages, search, and checkout to reduce friction and lift average order value.</div>
        </div>
      </div>
    </section>
  );
}
