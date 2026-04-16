'use client';

import { useState, useEffect } from 'react';
import { Mail, MessageSquare, Tag, BookOpen, Phone, CheckCircle, Zap, MousePointer } from 'lucide-react';

type StageKey = 'new' | 'nurture' | 'booked' | 'showed' | 'closed';

const STAGES: { key: StageKey; title: string; subtitle: string; count: number; Icon: any }[] = [
  { key: 'new', title: 'New Lead', subtitle: 'Captured & tagged in pipeline', count: 248, Icon: MousePointer },
  { key: 'nurture', title: 'Nurture', subtitle: 'Sequence triggered', count: 186, Icon: Zap },
  { key: 'booked', title: 'Booked', subtitle: 'Appointment confirmed', count: 94, Icon: BookOpen },
  { key: 'showed', title: 'Showed', subtitle: 'Call completed', count: 71, Icon: Phone },
  { key: 'closed', title: 'Closed', subtitle: 'Deal won', count: 42, Icon: CheckCircle },
];

const AUTOMATIONS: Record<StageKey, { id: string; title: string; Icon: any }[]> = {
  new: [
    { id: 'welcome_email', title: 'Welcome email sent', Icon: Mail },
    { id: 'sms_confirmation', title: 'SMS confirmation fired', Icon: MessageSquare },
    { id: 'tag_added', title: 'Tag added to contact', Icon: Tag },
  ],
  nurture: [
    { id: 'nurture_email', title: 'Nurture sequence started', Icon: Mail },
    { id: 'nurture_sms', title: 'Nurture SMS fired', Icon: MessageSquare },
    { id: 'nurture_tag', title: 'Tag added to contact', Icon: Tag },
  ],
  booked: [
    { id: 'booking_email', title: 'Booking email sent', Icon: Mail },
    { id: 'booking_sms', title: 'SMS confirmation fired', Icon: MessageSquare },
    { id: 'booking_tag', title: 'Tag added to contact', Icon: Tag },
  ],
  showed: [
    { id: 'showed_note', title: 'Call completed', Icon: Phone },
    { id: 'showed_followup', title: 'Showed follow-up SMS', Icon: MessageSquare },
    { id: 'showed_tag', title: 'Tag added to contact', Icon: Tag },
  ],
  closed: [
    { id: 'won_email', title: 'Deal won email', Icon: Mail },
    { id: 'won_sms', title: 'Congrats SMS fired', Icon: MessageSquare },
    { id: 'won_tag', title: 'Tag added to contact', Icon: Tag },
  ],
};

const COUNT_LABELS: Record<StageKey, string> = {
  new: 'LEADS / MO',
  nurture: 'ACTIVE',
  booked: 'BOOKED',
  showed: 'SHOWED',
  closed: 'WON',
};

const AUTOMATION_OVERRIDES: Record<StageKey, Record<string, string>> = {
  new: {
    welcome_email: 'Welcome email — New Lead',
    sms_confirmation: 'SMS confirmation — New Lead',
    tag_added: 'Tag added — New Lead',
  },
  nurture: {
    nurture_email: 'Nurture email sequence',
    nurture_sms: 'Nurture SMS fired',
    nurture_tag: 'Tag added — Nurture flow',
  },
  booked: {
    booking_email: 'Booking confirmation email',
    booking_sms: 'Booking SMS reminder',
    booking_tag: 'Tag added — Booked',
  },
  showed: {
    showed_note: 'Call completed — Showed',
    showed_followup: 'Showed follow-up SMS',
    showed_tag: 'Tag added — Showed',
  },
  closed: {
    won_email: 'Deal won — Email sent',
    won_sms: 'Congrats SMS sent',
    won_tag: 'Conversion tag added',
  },
};

function titleCase(k: StageKey) {
  return STAGES.find((s) => s.key === k)?.title ?? k;
}

export default function PipelineStages() {
  const [selected, setSelected] = useState<StageKey>('new');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handler = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1280);
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[#07101a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest">
            Pipeline Stages
          </span>
          <h3 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">Every Lead. Tracked & Nurtured.</h3>
        </div>

        <div className="mb-8 -mx-4 px-4 overflow-x-auto xl:overflow-visible xl:mx-0 xl:px-0 hide-scrollbar">
          <div className="flex gap-6 items-stretch xl:grid xl:grid-cols-5 xl:gap-6">
            {STAGES.map((s) => (
              <button
                key={s.key}
                onClick={() => setSelected(s.key)}
                className={`group relative text-left p-6 rounded-2xl glass-card border transition-all duration-300 flex flex-col justify-between h-full min-h-[170px] min-w-[240px] xl:min-w-0 flex-shrink-0 hover:scale-[1.01] xl:hover:scale-100 ${selected === s.key ? 'border-vare-purple-light ring-2 ring-vare-purple/20' : 'border-white/5'}`}
              >
                <div className="flex-1 flex flex-col items-center gap-3 xl:flex-row xl:items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected === s.key ? 'bg-vare-purple' : 'bg-white/5'}`}>
                    <s.Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-center xl:text-left">
                    <div className="text-lg font-black text-white leading-tight">{s.title}</div>
                    <div className="text-xs text-white/40 mt-1 min-h-[2.25rem] overflow-hidden">{s.subtitle}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-center xl:flex-row xl:items-baseline xl:justify-start gap-1 xl:gap-3">
                  <div className="text-xl md:text-2xl xl:text-4xl font-black text-vare-purple-light">{s.count}</div>
                  <div className="text-xs md:text-sm text-white/30 uppercase tracking-widest">{COUNT_LABELS[s.key]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card-accent rounded-3xl p-6 border border-white/10">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
            <div>
              <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black">Automation Fires</div>
              <div className="text-lg font-black text-white">{titleCase(selected)} Stage</div>
            </div>

            <div className="flex-1 min-w-0">
              <div
                className={`grid gap-4 py-2 ${!isDesktop ? 'grid-cols-1' : ''}`}
                style={isDesktop ? { gridTemplateColumns: `repeat(${AUTOMATIONS[selected].length}, minmax(220px, 1fr))` } : undefined}
              >
                {AUTOMATIONS[selected].map((a) => (
                  <div key={a.id} className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/6 bg-white/[0.02] w-full min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                      <a.Icon className="w-6 h-6 text-vare-purple-light" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm sm:text-base font-black text-white">{AUTOMATION_OVERRIDES[selected]?.[a.id] ?? a.title}</div>
                      <div className="text-xs text-white/40 mt-1">{titleCase(selected)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
