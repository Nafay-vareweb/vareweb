"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ServiceData } from '../../app/services/[slug]/data';
import { MessageSquare, Mic, Headphones, Play, Pause, Square } from 'lucide-react';

type Msg = { id: number; role: 'user' | 'bot'; text: string };

export default function AIChatBotLayout({ service }: { service: ServiceData }) {
  const [tab, setTab] = useState<'chat' | 'voice'>('chat');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [typingRole, setTypingRole] = useState<'user' | 'bot' | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const counter = useRef(0);
  const messagesRef = useRef<Msg[]>(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Speech recognition / mic states (mobile support)
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [interimTranscript, setInterimTranscript] = useState('');

  // MediaRecorder fallback for phones without WebSpeech support
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaSupported = typeof navigator !== 'undefined' && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  const isPausedRef = useRef(false);
  const playbackIndexRef = useRef(0);
  const playbackCharRef = useRef(0);
  const playbackScriptRef = useRef<Msg[] | null>(null);
  const playbackLoopRunningRef = useRef(false);

  useEffect(() => {
    // detect SpeechRecognition support (webkit prefixed on some browsers)
    const Rec = (typeof window !== 'undefined') ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : undefined;
    setRecognitionSupported(!!Rec);
  }, []);

  // responsive waveform bar count
  const [barsCount, setBarsCount] = useState(36);
  useEffect(() => {
    function updateBars() {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
      if (w < 420) setBarsCount(12);
      else if (w < 640) setBarsCount(20);
      else if (w < 1024) setBarsCount(28);
      else setBarsCount(36);
    }
    updateBars();
    window.addEventListener('resize', updateBars);
    return () => window.removeEventListener('resize', updateBars);
  }, []);

  // cleanup media streams / recognition on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        try { streamRef.current.getTracks().forEach((t) => t.stop()); } catch (e) {}
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  const chatScript: Msg[] = [
    { id: 1, role: 'user', text: "Hi — I need help booking an appointment." },
    { id: 2, role: 'bot', text: 'Sure — what day are you looking at?' },
    { id: 3, role: 'user', text: 'Next Tuesday in the afternoon.' },
    { id: 4, role: 'bot', text: 'I have 2:00 PM and 3:30 PM available. Which do you prefer?' },
    { id: 5, role: 'user', text: '2:00 PM please.' },
    { id: 6, role: 'bot', text: 'All set — appointment confirmed. You will get an email shortly.' },
  ];

  const voiceScript: Msg[] = [
    { id: 1, role: 'user', text: 'Hello — is this support?' },
    { id: 2, role: 'bot', text: 'Yes, this is Aria. How can I help you today?' },
    { id: 3, role: 'user', text: "I'm asking about pricing for your growth plan." },
    { id: 4, role: 'bot', text: 'Our growth plan starts at $2,500/month — would you like a bespoke quote?' },
  ];

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    function clearTimers() {
      timers.forEach((t) => window.clearTimeout(t));
      timers.length = 0;
    }

    function speakText(text: string, voice?: SpeechSynthesisVoice) {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1;
      u.pitch = 1;
      u.volume = 1;
      if (voice) u.voice = voice;
      u.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        isPausedRef.current = false;
        utteranceRef.current = u;
      };
      u.onend = () => {
        // leaving final state to queue handlers elsewhere
        utteranceRef.current = null;
        if (!window.speechSynthesis.speaking) setIsSpeaking(false);
      };
      u.onerror = () => {
        utteranceRef.current = null;
        setIsSpeaking(false);
      };
      try {
        synth.speak(u);
      } catch (e) {
        // ignore speak errors in non-supported environments
      }
    }

    async function runSequence(script: Msg[]) {
      setMessages([]);
      counter.current = 0;
      for (const m of script) {
        if (cancelled) return;
        // start typing for both user and bot
        setTyping(true);
        setTypingRole(m.role);
        const newId = ++counter.current;
        setMessages((p) => [...p, { id: newId, role: m.role, text: '' }] as Msg[]);

        // brief thinking pause
        await new Promise<void>((res) => {
          const id = window.setTimeout(() => res(), 350);
          timers.push(id as unknown as number);
        });

        const chars = Array.from(m.text);
        const charDelay = m.role === 'user' ? 40 : 60;
        for (let i = 0; i < chars.length; i++) {
          if (cancelled) return;
          await new Promise<void>((res) => {
            const jitter = Math.floor(Math.random() * 25) - 12;
            const id = window.setTimeout(() => res(), charDelay + jitter);
            timers.push(id as unknown as number);
          });
          if (cancelled) return;
          setMessages((prev) => prev.map((msg) => (msg.id === newId ? { ...msg, text: msg.text + chars[i] } : msg)));
        }

        setTyping(false);
        setTypingRole(null);

        // small pause after finishing
        await new Promise<void>((res) => {
          const id = window.setTimeout(() => res(), 350);
          timers.push(id as unknown as number);
        });
      }
    }

    if (tab === 'chat') runSequence(chatScript);
    // Do not auto-run voice sequence; voice starts when user presses Play

    return () => {
      cancelled = true;
      setTyping(false);
      clearTimers();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [tab]);

  // playback controls for voice tab
  function togglePlayPause() {
    // only control playback in voice tab
    if (tab !== 'voice') {
      setTab('voice');
      return;
    }

    // if currently playing -> pause
    if (isPlaying && !isPaused) {
      setIsPaused(true);
      isPausedRef.current = true;
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
        try { window.speechSynthesis.pause(); } catch (e) {}
      }
      return;
    }

    // if paused -> resume
    if (!isPlaying && isPaused) {
      setIsPaused(false);
      isPausedRef.current = false;
      setIsPlaying(true);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        try { window.speechSynthesis.resume(); } catch (e) {}
      }
      return;
    }

    // otherwise start playback from beginning
    if (!playbackLoopRunningRef.current) {
      playbackCancelledRef.current = false;
      setIsPaused(false);
      isPausedRef.current = false;
      setIsPlaying(true);
      startPlayback(voiceScript);
    }
  }

  function stopSpeech() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    playbackCancelledRef.current = true;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    isPausedRef.current = false;
    setIsPlaying(false);
    utteranceRef.current = null;
    // reset playback position and clear messages
    playbackIndexRef.current = 0;
    playbackCharRef.current = 0;
    playbackScriptRef.current = null;
    playbackLoopRunningRef.current = false;
    setMessages([]);
    messagesRef.current = [];
  }

  const playbackCancelledRef = useRef(false);

  async function getVoicesAsync() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return { botVoice: undefined as SpeechSynthesisVoice | undefined, userVoice: undefined as SpeechSynthesisVoice | undefined };
    let voices = window.speechSynthesis.getVoices() || [];
    // some browsers populate voices asynchronously
    if (!voices.length) {
      voices = await new Promise<SpeechSynthesisVoice[]>((resolve) => {
        const handler = () => {
          const v = window.speechSynthesis.getVoices() || [];
          window.speechSynthesis.removeEventListener('voiceschanged', handler);
          resolve(v);
        };
        window.speechSynthesis.addEventListener('voiceschanged', handler);
        // fallback timeout
        setTimeout(() => {
          window.speechSynthesis.removeEventListener('voiceschanged', handler);
          resolve(window.speechSynthesis.getVoices() || []);
        }, 700);
      });
    }
    const en = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
    const femaleRegex = /female|zira|samantha|amy|salli|joanna|kendra|emma|zira|alloy/i;
    let botVoice = en.find((v) => femaleRegex.test(v.name)) || en[0] || voices[0];
    let userVoice = en.find((v) => v !== botVoice) || voices.find((v) => v !== botVoice) || botVoice;
    return { botVoice, userVoice };
  }

  function speakUtteranceAndWait(text: string, voice?: SpeechSynthesisVoice) {
    return new Promise<void>((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return resolve();
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        isPausedRef.current = false;
        utteranceRef.current = u;
      };
      u.onend = () => {
        utteranceRef.current = null;
        if (!window.speechSynthesis.speaking) setIsSpeaking(false);
        resolve();
      };
      u.onerror = () => {
        utteranceRef.current = null;
        setIsSpeaking(false);
        resolve();
      };
      try {
        window.speechSynthesis.speak(u);
      } catch (e) {
        resolve();
      }
    });
  }

    // SpeechRecognition helpers (for live mic input on supporting browsers)
    async function startRecognition() {
      if (typeof window === 'undefined') return;
      const RecClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!RecClass) {
        setRecognitionSupported(false);
        return;
      }
      try {
        const rec = new RecClass();
        rec.lang = 'en-US';
        rec.interimResults = true;
        rec.continuous = false;
        rec.maxAlternatives = 1;
        rec.onstart = () => {
          setIsRecording(true);
          setInterimTranscript('');
          recognitionRef.current = rec;
        };
        rec.onresult = async (e: any) => {
          let interim = '';
          let final = '';
          for (let i = e.resultIndex; i < e.results.length; ++i) {
            const t = e.results[i][0].transcript;
            if (e.results[i].isFinal) final += t;
            else interim += t;
          }
          setInterimTranscript(interim);
          if (final) {
            setInterimTranscript('');
            setMessages((prev) => {
              const id1 = ++counter.current;
              const id2 = ++counter.current;
              return [...prev, { id: id1, role: 'user', text: final }, { id: id2, role: 'bot', text: `I heard: ${final}` }];
            });
            const botResp = `I heard: ${final}`;
            const { botVoice } = await getVoicesAsync();
            await speakUtteranceAndWait(botResp, botVoice);
          }
        };
        rec.onerror = () => {
          setIsRecording(false);
          setInterimTranscript('');
        };
        rec.onend = () => {
          setIsRecording(false);
          setInterimTranscript('');
          recognitionRef.current = null;
        };
        rec.start();
        recognitionRef.current = rec;
      } catch (e) {
        setIsRecording(false);
        setInterimTranscript('');
      }
    }

    function stopRecognition() {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
        recognitionRef.current = null;
      }
      setIsRecording(false);
      setInterimTranscript('');
    }

    // MediaRecorder audio capture fallback (records audio blob locally)
    async function startAudioCapture() {
      if (!mediaSupported) return;
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = s;
        audioChunksRef.current = [];
        const mr = new MediaRecorder(s);
        mediaRecorderRef.current = mr;
        mr.ondataavailable = (ev) => {
          if (ev.data && ev.data.size) audioChunksRef.current.push(ev.data);
        };
        mr.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          setMessages((prev) => [...prev, { id: ++counter.current, role: 'user', text: '[Recorded audio]' }]);
          try { if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop()); } catch (e) {}
          streamRef.current = null;
          mediaRecorderRef.current = null;
          setIsAudioRecording(false);
        };
        mr.start();
        setIsAudioRecording(true);
      } catch (e) {
        setIsAudioRecording(false);
      }
    }

    function stopAudioCapture() {
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop();
      } catch (e) {}
      setIsAudioRecording(false);
    }

  // helpers for pause-aware waits
  function waitMs(ms: number) {
    return new Promise<void>((resolve) => {
      const id = window.setTimeout(() => resolve(), ms);
      // not tracking ids here since playbackCancelledRef handles cancellation
    });
  }

  async function waitWithPause(ms: number) {
    const step = 80;
    let elapsed = 0;
    while (elapsed < ms) {
      if (playbackCancelledRef.current) break;
      if (isPausedRef.current) {
        await new Promise((r) => setTimeout(r, step));
        continue;
      }
      const t = Math.min(step, ms - elapsed);
      await new Promise((r) => setTimeout(r, t));
      elapsed += t;
    }
  }

  async function startPlayback(script: Msg[]) {
    playbackCancelledRef.current = false;
    playbackScriptRef.current = script;
    playbackLoopRunningRef.current = true;
    setIsPlaying(true);
    setIsPaused(false);
    isPausedRef.current = false;

    // reset to start
    setMessages([]);
    messagesRef.current = [];
    playbackIndexRef.current = 0;
    playbackCharRef.current = 0;
    counter.current = 0;

    const { botVoice, userVoice } = await getVoicesAsync();

    while (playbackIndexRef.current < script.length) {
      if (playbackCancelledRef.current) break;
      const m = script[playbackIndexRef.current];

      // ensure message object exists
      if (messagesRef.current.length <= playbackIndexRef.current) {
        const id = ++counter.current;
        setMessages((prev) => {
          const next = [...prev, { id, role: m.role, text: '' }];
          messagesRef.current = next;
          return next;
        });
        playbackCharRef.current = 0;
      } else {
        playbackCharRef.current = messagesRef.current[playbackIndexRef.current].text.length;
      }

      setTyping(true);
      setTypingRole(m.role);

      const chars = Array.from(m.text);
      let i = playbackCharRef.current;
      while (i < chars.length) {
        if (playbackCancelledRef.current) break;
        // pause handling
        while (isPausedRef.current && !playbackCancelledRef.current) {
          await new Promise((r) => setTimeout(r, 120));
        }
        if (playbackCancelledRef.current) break;

        const jitter = Math.floor(Math.random() * 25) - 12;
        const delay = (m.role === 'user' ? 40 : 60) + jitter;
        await waitWithPause(delay);
        if (playbackCancelledRef.current) break;

        setMessages((prev) => {
          const next = prev.map((msg, idx) => (idx === playbackIndexRef.current ? { ...msg, text: msg.text + chars[i] } : msg));
          messagesRef.current = next;
          return next;
        });
        i += 1;
        playbackCharRef.current = i;
      }

      setTyping(false);
      setTypingRole(null);

      if (playbackCancelledRef.current) break;

      // speak the message if in voice tab
      if (tab === 'voice') {
        // wait while paused before speaking
        while (isPausedRef.current && !playbackCancelledRef.current) {
          await new Promise((r) => setTimeout(r, 120));
        }
        if (playbackCancelledRef.current) break;
        const voice = m.role === 'bot' ? botVoice : userVoice;
        await speakUtteranceAndWait(m.text, voice);
      }

      // inter-message gap
      await waitWithPause(250);

      playbackIndexRef.current += 1;
      playbackCharRef.current = 0;
    }

    setIsPlaying(false);
    setIsPaused(false);
    isPausedRef.current = false;
    playbackLoopRunningRef.current = false;
    setIsSpeaking(false);
  }

  return (
    <section className="py-20 bg-[#07101a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
          <div>
            <div className="text-xs text-vare-purple-light uppercase tracking-widest font-black mb-3">{service.badge ?? 'Conversational AI'}</div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">{service.title}</h3>
            <p className="text-white/40 mb-6">{service.overviewP1}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {service.features.slice(0, 4).map((f, i) => (
                <div key={i} className="glass-card p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
                  <div className="flex items-start gap-3">
                    <div className="w-34 h-12 rounded-full bg-white/5 flex items-center justify-center circle-icon">
                      <f.icon className="w-5 h-5 text-vare-purple-light" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-white">{f.title}</div>
                      <div className="text-xs text-white/40 mt-1">{f.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <a href="/contact" className="px-6 py-3 rounded-2xl bg-vare-purple text-white font-black">Get Started</a>
              <button onClick={() => setTab('chat')} className="px-6 py-3 rounded-2xl bg-white/5 text-white font-black">See Demo</button>
            </div>
          </div>

          <div>
            <div className="glass-card-accent p-6 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => setTab('chat')} className={`px-4 py-2 rounded-lg ${tab === 'chat' ? 'bg-white/10 text-white font-black' : 'bg-transparent text-white/60'}`}>Chat Bot</button>
                  <button onClick={() => setTab('voice')} className={`px-4 py-2 rounded-lg ${tab === 'voice' ? 'bg-white/10 text-white font-black' : 'bg-transparent text-white/60'}`}>Voice Bot</button>
                </div>
                <div className="text-xs text-white/40">Live Demo</div>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-white/6 bg-[#061019] relative">
                {/* Wave / visual header */}
                <div className="relative h-24 overflow-hidden">
                  <svg className="absolute -top-6 left-0 w-[200%] h-40 wave-anim" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,30 C150,80 350,0 600,30 C850,60 1050,20 1200,40 L1200,120 L0,120 Z" fill="rgba(124,77,187,0.14)" />
                    <path d="M0,50 C200,10 400,90 600,50 C800,10 1000,80 1200,50 L1200,120 L0,120 Z" fill="rgba(91,45,158,0.06)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-white/20 uppercase tracking-widest text-xs font-black">{tab === 'chat' ? 'Chat Interface' : 'Voice Interface'}</div>
                  </div>
                </div>

                <div className="p-4 h-[40vh] md:h-[320px] overflow-auto">
                  {tab === 'chat' ? (
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-3 rounded-2xl max-w-[85%] md:max-w-[70%] ${m.role === 'user' ? 'bg-vare-purple text-white' : 'bg-white/[0.03] text-white/90'}`}>
                            {m.text}
                          </div>
                        </div>
                      ))}

                      {typing && (
                        <div className={`flex ${typingRole === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-3 rounded-2xl flex items-center ${typingRole === 'user' ? 'bg-vare-purple text-white' : 'bg-white/[0.03] text-white/90'}`}>
                            <span className="dot-pulse inline-block w-3 h-3 rounded-full bg-white/60 mr-1" />
                            <span className="dot-pulse inline-block w-3 h-3 rounded-full bg-white/40 mr-1" />
                            <span className="dot-pulse inline-block w-3 h-3 rounded-full bg-white/20" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/6 flex items-center justify-center">
                          <Mic className="w-5 h-5 text-vare-purple-light" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-black text-white">Aria — Voice Assistant</div>
                          <div className="text-xs text-white/40">Real-time voice demo with transcription and waveform visualization.</div>
                        </div>
                      </div>

                      <div className="rounded-xl p-3 md:p-4 bg-white/[0.02] border border-white/6">
                          <div className="h-28 relative overflow-hidden flex items-center">
                            <div className={`waveform-bars w-full ${isPlaying ? 'playing' : ''}`}>
                              {Array.from({ length: barsCount }).map((_, i) => (
                                <div
                                  key={i}
                                  className="wave-bar"
                                  style={{ animationDelay: `${(i % 10) * 0.06}s`, animationDuration: `${650 + (i % 6) * 90}ms` }}
                                />
                              ))}
                            </div>
                          </div>

                        <div className="mt-3 space-y-2">
                          {messages.map((m) => (
                            <div key={m.id} className="text-sm text-white/90">{m.role === 'user' ? <><strong className="text-white">You:</strong> {m.text}</> : <><strong className="text-white">Aria:</strong> {m.text}</>}</div>
                          ))}
                          {isRecording && (
                            <div className="text-sm text-white/60 italic mt-2">{interimTranscript || 'Listening...'}</div>
                          )}
                          {audioUrl && (
                            <div className="mt-3">
                              <audio controls src={audioUrl} className="w-full" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-white/6 bg-[#061019]/40">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      readOnly
                      value={tab === 'chat' ? 'Ask me about bookings, pricing, or integrations...' : (isRecording ? (interimTranscript || 'Listening...') : 'Speak to try the voice demo...')}
                      className="flex-1 min-w-0 p-3 rounded-2xl bg-transparent border border-white/6 text-white/50"
                    />
                    {tab === 'voice' ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <button onClick={togglePlayPause} className="px-3 py-2 rounded-lg bg-white/6 text-white flex items-center gap-2">
                          {isPlaying && !isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span className="text-[12px]">{isPlaying && !isPaused ? 'Pause' : 'Play'}</span>
                        </button>
                        <button onClick={stopSpeech} className="px-3 py-2 rounded-lg bg-white/6 text-white flex items-center gap-2">
                          <Square className="w-4 h-4" />
                          <span className="text-[12px]">Stop</span>
                        </button>
                        {recognitionSupported ? (
                          <button
                            onClick={() => isRecording ? stopRecognition() : startRecognition()}
                            className={`px-3 py-2 rounded-lg bg-white/6 text-white flex items-center gap-2`}
                          >
                            <Mic className="w-4 h-4" />
                            <span className="text-[12px]">{isRecording ? 'Listening' : 'Speak'}</span>
                          </button>
                        ) : mediaSupported ? (
                          <button
                            onClick={() => isAudioRecording ? stopAudioCapture() : startAudioCapture()}
                            className={`px-3 py-2 rounded-lg bg-white/6 text-white flex items-center gap-2`}
                          >
                            <Mic className="w-4 h-4" />
                            <span className="text-[12px]">{isAudioRecording ? 'Recording' : 'Record'}</span>
                          </button>
                        ) : (
                          <div className="text-xs text-white/40">Mic unsupported</div>
                        )}
                      </div>
                    ) : (
                      <button onClick={() => setTab('chat')} className="px-3 py-2 rounded-lg bg-vare-purple text-white">Demo</button>
                    )}
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
