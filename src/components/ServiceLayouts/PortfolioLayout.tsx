'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceData } from '../../app/services/[slug]/data';
import { ArrowRight, Palette, RotateCw, Smartphone, Tablet, Monitor } from 'lucide-react';

const PRESETS = ['#8b5cf6', '#06b6d4', '#f97316', '#ef4444', '#10b981', '#0ea5e9'];

type Region = 'hero' | 'nav' | 'cards' | 'footer';

export default function PortfolioLayout({ service }: { service: ServiceData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [accent, setAccent] = useState<string>(PRESETS[0]);
  const [layout, setLayout] = useState<'hero' | 'cards'>('hero');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [pattern, setPattern] = useState<'none' | 'dots' | 'lines'>('none');
  const [pulse, setPulse] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [regionColors, setRegionColors] = useState<Record<string, string | null>>({
    hero: null,
    nav: null,
    cards: null,
    footer: null,
    heroButton: null,
  });

  const [fontFamily, setFontFamily] = useState<string>('Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial');
  const [fontSize, setFontSize] = useState<number>(18);
  const [sampleText, setSampleText] = useState<string>('View Project');
  const [applyFontToRegion, setApplyFontToRegion] = useState<boolean>(false);
  const [regionFonts, setRegionFonts] = useState<Record<string, { fontFamily?: string; fontSize?: number } | null>>({
    hero: null,
    nav: null,
    cards: null,
    footer: null,
  });

  const applyColor = (c: string) => {
    if (selectedRegion) {
      setRegionColors((p) => ({ ...p, [selectedRegion]: c }));
    } else {
      setAccent(c);
    }
  };

  const randomAccent = () => {
    const c = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    applyColor(c);
  };

  const surprise = () => {
    const n = Math.floor(Math.random() * Math.max(1, service.features.length));
    setSelectedIndex(n);
    setRegionColors({
      hero: PRESETS[Math.floor(Math.random() * PRESETS.length)],
      nav: PRESETS[Math.floor(Math.random() * PRESETS.length)],
      cards: PRESETS[Math.floor(Math.random() * PRESETS.length)],
      footer: PRESETS[Math.floor(Math.random() * PRESETS.length)],
      heroButton: PRESETS[Math.floor(Math.random() * PRESETS.length)],
    });
    setPulse(true);
    window.setTimeout(() => setPulse(false), 600);
  };

  return (
    <section className="py-20 bg-[#07101a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
          <div>
            <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black mb-3">Design Portfolio</div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">Selected Work & Case Studies</h3>
            <p className="text-white/40 mb-6">A visual overview of design systems, landing pages, and interfaces created for clients — tailored to the needs of the project and optimized for conversions.</p>
            <Link href="/case-studies" className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10">
              View Case Studies <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-6">
              <div className="glass-card p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
                <div className="text-sm font-black text-white mb-2">Interactive Controls</div>

                <div className="text-xs text-white/40 mb-2">Preview Size</div>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => setViewport('mobile')} className={`px-3 py-2 rounded-md text-sm font-black w-1/3 ${viewport === 'mobile' ? 'bg-vare-purple text-white' : 'bg-white/5 text-white/80'}`}>Mobile</button>
                  <button onClick={() => setViewport('tablet')} className={`px-3 py-2 rounded-md text-sm font-black w-1/3 ${viewport === 'tablet' ? 'bg-vare-purple text-white' : 'bg-white/5 text-white/80'}`}>Tablet</button>
                  <button onClick={() => setViewport('desktop')} className={`px-3 py-2 rounded-md text-sm font-black w-1/3 ${viewport === 'desktop' ? 'bg-vare-purple text-white' : 'bg-white/5 text-white/80'}`}>Desktop</button>
                </div>

                <div className="text-xs text-white/40 mb-2">Overlay Pattern</div>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => setPattern('none')} className={`px-3 py-2 rounded-md text-sm w-1/3 ${pattern === 'none' ? 'bg-vare-purple text-white' : 'bg-white/5 text-white/80'}`}>None</button>
                  <button onClick={() => setPattern('dots')} className={`px-3 py-2 rounded-md text-sm w-1/3 ${pattern === 'dots' ? 'bg-vare-purple text-white' : 'bg-white/5 text-white/80'}`}>Dots</button>
                  <button onClick={() => setPattern('lines')} className={`px-3 py-2 rounded-md text-sm w-1/3 ${pattern === 'lines' ? 'bg-vare-purple text-white' : 'bg-white/5 text-white/80'}`}>Lines</button>
                </div>

                <div className="mt-2">
                  <button onClick={surprise} className="w-full px-4 py-2 rounded-2xl bg-vare-purple text-white font-black">Surprise Me</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.slice(0, 4).map((f, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`glass-card p-6 border-white/5 bg-white/[0.02] rounded-2xl text-left flex items-center gap-4 transition-all duration-200 h-full min-h-[88px] ${selectedIndex === i ? 'ring-2 ring-vare-purple/20 border-vare-purple-light' : ''}`}
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-vare-purple-light" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-black text-white mb-1">{f.title}</div>
                    <div className="text-xs text-white/40">{f.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="glass-card-accent p-6 border border-white/10 rounded-3xl mt-8">
              <div className="flex gap-6 flex-col md:flex-row items-start">
                {/* Preview removed — now rendered in a separate device mockup section below */}

                <div className="w-full md:w-80 flex-shrink-0">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black">Customize</div>
                    <button onClick={randomAccent} className="text-white/80 hover:text-white p-2 rounded-md">
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex gap-2 flex-wrap items-center mb-3">
                    {PRESETS.map((c) => {
                      const active = selectedRegion ? regionColors[selectedRegion] === c : accent === c;
                      return (
                        <button
                          key={c}
                          onClick={() => applyColor(c)}
                          aria-label={c}
                          className={`w-8 h-8 rounded-full border-2 ${active ? 'border-white' : 'border-white/10'}`}
                          style={{ background: c }}
                        />
                      );
                    })}
                  </div>

                  {/* Typography controls */}
                  <div className="mt-3 p-3 bg-white/[0.02] rounded-2xl border border-white/6">
                    <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black mb-2">Typography</div>
                    <select
                      value={fontFamily}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (applyFontToRegion && selectedRegion) {
                          setRegionFonts((p) => ({ ...p, [selectedRegion]: { ...(p[selectedRegion] || {}), fontFamily: v } }));
                        } else {
                          setFontFamily(v);
                        }
                      }}
                      className="w-full mb-2 p-2 bg-transparent border border-white/5 rounded text-white"
                    >
                      <option value={'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'}>System / Inter</option>
                      <option value={'Poppins, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'}>Poppins</option>
                      <option value={'Georgia, serif'}>Georgia (serif)</option>
                      <option value={'\"Courier New\", monospace'}>Monospace</option>
                    </select>
                    <label className="text-xs text-white/60">Font size: <span className="text-white ml-2">{fontSize}px</span></label>
                    <input
                      type="range"
                      min={12}
                      max={40}
                      value={fontSize}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (applyFontToRegion && selectedRegion) {
                          setRegionFonts((p) => ({ ...p, [selectedRegion]: { ...(p[selectedRegion] || {}), fontSize: val } }));
                        } else {
                          setFontSize(val);
                        }
                      }}
                      className="w-full mt-1"
                    />

                    <div className="mt-2 flex flex-col sm:flex-row gap-2">
                      <input value={sampleText} onChange={(e) => setSampleText(e.target.value)} className="flex-1 min-w-0 p-2 bg-transparent border border-white/5 rounded text-white" placeholder="Sample CTA text" />
                      <button onClick={() => setSampleText('View Project')} className="px-3 py-2 rounded-md bg-white/5 text-white min-w-[84px] shrink-0">Reset</button>
                    </div>

                    <label className="mt-2 inline-flex items-center gap-2 text-xs text-white/60">
                      <input type="checkbox" checked={applyFontToRegion} onChange={(e) => setApplyFontToRegion(e.target.checked)} />
                      <span>Apply to selected region</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => setLayout(layout === 'hero' ? 'cards' : 'hero')} className="px-3 py-2 rounded-lg bg-white/5 text-white/80 w-full">
                      <Palette className="w-4 h-4 inline-block mr-2 -mt-0.5" /> Toggle Layout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Separate device preview section */}
        <div className="mt-10">
          <div className="glass-card-accent p-6 border border-white/10 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black">Device Preview</div>
                <div className="text-sm text-white/40">Click regions to select and style — tap the device to interact.</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setViewport('mobile')} className={`p-2 rounded-md ${viewport === 'mobile' ? 'bg-white/10' : 'bg-white/5'}`}><Smartphone className="w-4 h-4" /></button>
                <button onClick={() => setViewport('tablet')} className={`p-2 rounded-md ${viewport === 'tablet' ? 'bg-white/10' : 'bg-white/5'}`}><Tablet className="w-4 h-4" /></button>
                <button onClick={() => setViewport('desktop')} className={`p-2 rounded-md ${viewport === 'desktop' ? 'bg-white/10' : 'bg-white/5'}`}><Monitor className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex justify-center">
              {viewport === 'mobile' ? (
                <div className="relative w-[320px] h-[720px] rounded-[48px] border border-white/6 bg-[#061019] overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#071722] rounded-b-xl" />
                  <div className="p-4 pt-12 h-full overflow-auto text-white">
                    <div className="relative p-0 text-white">
                      <header onClick={() => setSelectedRegion('nav')} className="flex items-center justify-between" style={{ color: regionColors.nav ?? undefined, fontFamily: regionFonts.nav?.fontFamily ?? fontFamily, fontSize: `${regionFonts.nav?.fontSize ?? fontSize}px` }}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-white/6" />
                          <div className="font-black">Brand</div>
                        </div>
                        <div className="flex items-center gap-2 opacity-80">
                          <div className="w-6 h-3 rounded bg-white/6" />
                          <div className="w-6 h-3 rounded bg-white/6" />
                        </div>
                      </header>

                      <main className="mt-4" onClick={() => setSelectedRegion('hero')}>
                        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', color: regionColors.hero ?? undefined }}>
                          <div className="text-lg font-black">{service.features[selectedIndex].title}</div>
                          <div className="text-xs mt-1">{service.features[selectedIndex].desc}</div>

                          <div className="mt-3 flex gap-2">
                            <button className="px-4 py-2 rounded-full font-black" style={{ background: accent, color: regionColors.heroButton ?? '#fff' }}>View Project</button>
                            <button className="px-4 py-2 rounded-full font-black bg-white/10 text-white">Case Study</button>
                          </div>
                        </div>
                      </main>

                      <section className="mt-4 grid grid-cols-3 gap-3" onClick={() => setSelectedRegion('cards')}>
                        {[0, 1, 2].map((n) => (
                            <div key={n} className="p-3 rounded-lg bg-white/[0.02]">
                              <div className="h-20 rounded-md" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }} />
                              <div className="mt-2 text-xs" style={{ color: regionColors.cards ?? 'rgba(255,255,255,0.6)', fontFamily: regionFonts.cards?.fontFamily ?? fontFamily, fontSize: `${regionFonts.cards?.fontSize ?? fontSize}px` }}>Project {n + 1}</div>
                          </div>
                        ))}
                      </section>

                            <footer className="mt-4 text-xs p-2 rounded" onClick={() => setSelectedRegion('footer')} style={{ color: regionColors.footer ?? 'rgba(255,255,255,0.4)', fontFamily: regionFonts.footer?.fontFamily ?? fontFamily, fontSize: `${regionFonts.footer?.fontSize ?? fontSize}px` }}>
                        © VareWeb — Interactive Wireframe
                      </footer>
                    </div>
                  </div>
                  <div className="absolute bottom-20 left-4 right-4 flex justify-center gap-3">
                    <button className="px-3 py-1 rounded-full bg-white/6 text-xs font-black" style={{ border: `1px solid ${accent}` }}>Preview</button>
                    <button className="px-3 py-1 rounded-full bg-white/6 text-xs font-black">Prototype</button>
                    <button className="px-3 py-1 rounded-full bg-white/6 text-xs font-black">Share</button>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/10" />
                </div>
              ) : viewport === 'tablet' ? (
                <div className="relative w-[760px] h-[900px] rounded-3xl border border-white/6 bg-[#061019] overflow-hidden shadow-2xl">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/6 rounded-full" />
                  <div className="p-6 h-full overflow-auto text-white">
                    <header onClick={() => setSelectedRegion('nav')} className="flex items-center justify-between" style={{ color: regionColors.nav ?? undefined }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-white/6" />
                        <div className="font-black">Brand</div>
                      </div>
                      <div className="flex items-center gap-2 opacity-80">
                        <div className="w-6 h-3 rounded bg-white/6" />
                        <div className="w-6 h-3 rounded bg-white/6" />
                      </div>
                    </header>

                    <main className="mt-4" onClick={() => setSelectedRegion('hero')}>
                      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', color: regionColors.hero ?? undefined }}>
                        <div className="text-lg font-black" style={{ fontFamily: regionFonts.hero?.fontFamily ?? fontFamily, fontSize: `${(regionFonts.hero?.fontSize ?? fontSize) + 6}px` }}>{service.features[selectedIndex].title}</div>
                        <div className="text-xs mt-1" style={{ fontFamily: regionFonts.hero?.fontFamily ?? fontFamily, fontSize: `${regionFonts.hero?.fontSize ?? fontSize}px` }}>{service.features[selectedIndex].desc}</div>

                        <div className="mt-3 flex gap-2">
                          <button className="px-4 py-2 rounded-full font-black" style={{ background: accent, color: regionFonts.hero?.fontFamily ? regionFonts.hero?.fontFamily && (regionFonts.hero?.fontSize ? '#fff' : '#fff') : (regionColors.heroButton ?? '#fff') }}>
                            {sampleText}
                          </button>
                          <button className="px-4 py-2 rounded-full font-black bg-white/10 text-white">Case Study</button>
                        </div>
                      </div>
                    </main>

                    <section className="mt-6 grid grid-cols-3 gap-4" onClick={() => setSelectedRegion('cards')}>
                      {[0, 1, 2].map((n) => (
                        <div key={n} className="p-4 rounded-lg bg-white/[0.02]">
                          <div className="h-28 rounded-md" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }} />
                          <div className="mt-3 text-sm" style={{ color: regionColors.cards ?? 'rgba(255,255,255,0.6)' }}>Project {n + 1}</div>
                        </div>
                      ))}
                    </section>

                    <footer className="mt-6 text-xs p-2 rounded" onClick={() => setSelectedRegion('footer')} style={{ color: regionColors.footer ?? 'rgba(255,255,255,0.4)' }}>
                      © VareWeb — Interactive Wireframe
                    </footer>
                    <div className="absolute bottom-10 left-6 right-6 flex justify-center gap-4">
                      <button className="px-4 py-1 rounded-full bg-white/6 text-sm font-black" style={{ border: `1px solid ${accent}` }}>Preview</button>
                      <button className="px-4 py-1 rounded-full bg-white/6 text-sm font-black">Prototype</button>
                      <button className="px-4 py-1 rounded-full bg-white/6 text-sm font-black">Share</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full max-w-5xl h-[420px] rounded-2xl border border-white/6 bg-[#061019] overflow-hidden shadow-2xl">
                  <div className="p-6 h-full overflow-auto text-white">
                    <header onClick={() => setSelectedRegion('nav')} className="flex items-center justify-between" style={{ color: regionColors.nav ?? undefined }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-white/6" />
                        <div className="font-black">Brand</div>
                      </div>
                      <div className="flex items-center gap-2 opacity-80">
                        <div className="w-6 h-3 rounded bg-white/6" />
                        <div className="w-6 h-3 rounded bg-white/6" />
                      </div>
                    </header>

                    <main className="mt-4" onClick={() => setSelectedRegion('hero')}>
                      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', color: regionColors.hero ?? undefined }}>
                        <div className="text-2xl font-black">{service.features[selectedIndex].title}</div>
                        <div className="text-sm mt-1">{service.features[selectedIndex].desc}</div>

                        <div className="mt-4 flex gap-3">
                          <button className="px-5 py-2 rounded-full font-black" style={{ background: accent, color: regionColors.heroButton ?? '#fff' }}>View Project</button>
                          <button className="px-5 py-2 rounded-full font-black bg-white/10 text-white">Case Study</button>
                        </div>
                      </div>
                    </main>

                    <section className="mt-6 grid grid-cols-3 gap-4" onClick={() => setSelectedRegion('cards')}>
                      {[0, 1, 2].map((n) => (
                        <div key={n} className="p-4 rounded-lg bg-white/[0.02]">
                          <div className="h-20 rounded-md" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }} />
                          <div className="mt-3 text-sm" style={{ color: regionColors.cards ?? 'rgba(255,255,255,0.6)' }}>Project {n + 1}</div>
                        </div>
                      ))}
                    </section>

                    <footer className="mt-6 text-xs p-2 rounded" onClick={() => setSelectedRegion('footer')} style={{ color: regionColors.footer ?? 'rgba(255,255,255,0.4)' }}>
                      © VareWeb — Interactive Wireframe
                    </footer>
                  </div>
                    <div className="absolute bottom-6 left-8 right-8 flex justify-center gap-4">
                      <button className="px-4 py-1 rounded-full bg-white/6 text-sm font-black" style={{ border: `1px solid ${accent}` }}>Preview</button>
                      <button className="px-4 py-1 rounded-full bg-white/6 text-sm font-black">Prototype</button>
                      <button className="px-4 py-1 rounded-full bg-white/6 text-sm font-black">Share</button>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>

        <div className="glass-card-accent p-8 border border-white/10 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/[0.02] rounded-2xl">
              <div className="text-3xl font-black text-white">Design System</div>
              <div className="text-white/40 mt-2">Component libraries, tokens, and guidelines for consistent implementation.</div>
            </div>
            <div className="p-6 bg-white/[0.02] rounded-2xl">
              <div className="text-3xl font-black text-white">Landing Pages</div>
              <div className="text-white/40 mt-2">High-converting landing experiences tailored to campaigns and audiences.</div>
            </div>
            <div className="p-6 bg-white/[0.02] rounded-2xl">
              <div className="text-3xl font-black text-white">Prototypes</div>
              <div className="text-white/40 mt-2">Interactive prototypes for stakeholder alignment and user testing.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
