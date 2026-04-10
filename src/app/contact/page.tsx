'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageDecorations from '@/components/PageDecorations';
import ParticleBackground from '@/components/ParticleBackground';
import {
  Mail, Phone, MapPin, Send, CheckCircle2,
  MessageCircle, Clock, ArrowRight, Calendar,
  ChevronLeft, ChevronRight, Zap,
  Facebook, Twitter, Linkedin, Instagram,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'contact@vareweb.com', href: 'mailto:contact@vareweb.com', desc: 'We respond within 24 hours' },
  { icon: Phone, label: 'Call Us', value: '+1 659 200 6383', href: 'tel:+16592006383', desc: 'Mon-Fri 9am-6pm CST' },
  { icon: MapPin, label: 'Visit Us', value: '5400 Preston Oaks Rd, Dallas, TX 75254, USA', href: 'https://maps.app.goo.gl/VWgp48NrKJArhH6i7', desc: 'By appointment only' },
];

const socialMedia = [
  {
    icon: Facebook,
    name: 'Facebook',
    description: 'Follow us for updates',
    followers: '15K+ Followers',
    color: 'from-blue-600 to-blue-700',
    hoverShadow: 'hover:shadow-blue-500/25',
  },
  {
    icon: Twitter,
    name: 'Twitter / X',
    description: 'Latest news & tips',
    followers: '8K+ Followers',
    color: 'from-gray-700 to-gray-800',
    hoverShadow: 'hover:shadow-gray-500/25',
  },
  {
    icon: Linkedin,
    name: 'LinkedIn',
    description: 'Professional network',
    followers: '12K+ Connections',
    color: 'from-blue-700 to-blue-800',
    hoverShadow: 'hover:shadow-blue-600/25',
  },
  {
    icon: Instagram,
    name: 'Instagram',
    description: 'Behind the scenes',
    followers: '20K+ Followers',
    color: 'from-pink-500 via-purple-500 to-orange-400',
    hoverShadow: 'hover:shadow-pink-500/25',
  },
];

const formInputClass = "w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.05] text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-vare-purple-light/20 focus:border-vare-purple-light transition-all";

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Calendar state
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', serviceType: 'Web Design', message: '' });

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  const serviceOptions = ['Web Design', 'Logo Design', 'Digital Marketing', 'SEO Optimization', 'eCommerce', 'Custom Software', 'Mobile App Development', 'GHL Development & Automation'];

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDateStr = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isPastDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const isToday = (day: number) => {
    return currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate();
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setBooking(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.serviceType,
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          message: formData.message || null,
        }),
      });
      if (res.ok) {
        setBookingSuccess(true);
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll('.contact-detail'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: contentRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          contentRef.current.querySelector('.contact-form'),
          { y: 30, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: contentRef.current, start: 'top 75%' } }
        );
      }

      if (calendarRef.current) {
        gsap.fromTo(
          calendarRef.current.querySelectorAll('.cal-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: calendarRef.current, start: 'top 75%' } }
        );
      }

      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current.querySelectorAll('.map-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: mapRef.current, start: 'top 75%' } }
        );
      }

      if (socialRef.current) {
        gsap.fromTo(
          socialRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: socialRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          socialRef.current.querySelectorAll('.social-card'),
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: socialRef.current.querySelector('.social-grid'), start: 'top 80%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      serviceType: formData.get('service'),
      message: formData.get('message'),
    };
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSent(true);
      (e.target as HTMLFormElement).reset();
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <>
      <Navigation />
      <PageDecorations />
      <main>

        {/* Hero */}
        <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden gradient-purple-dark">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,77,187,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(58,26,112,0.4),transparent_50%)]" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
          </div>
          <ParticleBackground count={80} interactive={true} zIndex={5} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="hero-anim inline-flex items-center px-3 py-1 rounded-full glass-effect text-white/90 text-sm font-medium mb-6 opacity-0">
              <MessageCircle className="w-4 h-4 mr-1.5" /> Get In Touch
            </span>
            <h1 className="hero-anim text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 opacity-0">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Talk</span>
            </h1>
            <p className="hero-anim max-w-2xl mx-auto text-lg text-white/70 leading-relaxed opacity-0">
              Have a project in mind? We would love to hear about it. Reach out and let&apos;s discuss how we can help bring your vision to life.
            </p>
          </div>
        </section>

        {/* ─── Contact Content ─── */}
        <section ref={contentRef} className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0612]/50 backdrop-blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

              {/* Left Column: Info & Socials */}
              <div className="lg:col-span-5 space-y-12">
                <div className="contact-detail opacity-0">
                  <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                  <p className="text-white/60 text-lg mb-10 leading-relaxed">
                    Ready to take your digital presence to the next level? Connect with us via any of these channels or fill out the form.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="flex items-start gap-5 p-6 rounded-2xl glass-card border border-white/5 hover:border-vare-purple-light/20 hover:bg-white/[0.08] transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-lg text-white font-semibold mb-1">{item.value}</p>
                          <p className="text-white/50 text-sm">{item.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="contact-form glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-vare-purple/10 blur-[100px] -mr-32 -mt-32" />

                  <div className="relative z-10">
                    <div className="mb-10">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Send a Message</h2>
                      <p className="text-white/50">Drop us a line and we&apos;ll get back to you within 24 business hours.</p>
                    </div>

                    {sent ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                        <p className="text-white/60 mb-8 max-w-sm mx-auto">Thank you for your interest. A member of our team will reach out to you shortly.</p>
                        <button
                          onClick={() => setSent(false)}
                          className="px-8 py-3 glass-card text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                        >
                          Send Another
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/70 ml-1">Full Name</label>
                            <input name="name" required className={formInputClass} placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/70 ml-1">Email Address</label>
                            <input name="email" type="email" required className={formInputClass} placeholder="john@example.com" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/70 ml-1">Phone Number</label>
                            <input name="phone" required className={formInputClass} placeholder="+1 (555) 000-0000" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/70 ml-1">Inquiry Type</label>
                            <div className="relative">
                              <select name="service" className={`${formInputClass} appearance-none pr-10`}>
                                {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                <ArrowRight className="w-4 h-4 rotate-90" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-white/70 ml-1">Project Details</label>
                          <textarea name="message" rows={5} className={`${formInputClass} resize-none`} placeholder="Tell us about your project..." />
                        </div>
                        <button
                          type="submit"
                          disabled={sending}
                          className="w-full py-4 gradient-purple text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 group"
                        >
                          {sending ? (
                            <>
                              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              <span>Submit Inquiry</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Booking Section */}
        <section ref={calendarRef} className="py-24 sm:py-32 bg-[#0a0612] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="cal-anim text-center mb-16 opacity-0">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-vare-gold/10 text-vare-gold text-xs font-bold uppercase tracking-widest mb-6 border border-vare-gold/20">
                <Calendar className="w-4 h-4 mr-2" /> Booking System
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Start?</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                Schedule a discovery call with our experts to discuss your project in detail. No obligation, just a conversation about your future.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="cal-anim text-center py-20 glass-card rounded-3xl border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.05)] opacity-0">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">You&apos;re All Set!</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">We&apos;ve added your consultation to our calendar for <span className="text-white font-bold">{selectedDate}</span> at <span className="text-white font-bold">{selectedTime}</span>.</p>
                <button
                  onClick={() => {
                    setBookingSuccess(false);
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className="px-10 py-4 gradient-purple text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 transition-all"
                >
                  Book Another Call
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Calendar Grid Integration */}
                <div className="cal-anim glass-card rounded-3xl p-8 border border-white/10 opacity-0">
                  <div className="flex flex-col md:flex-row gap-12">
                    {/* Left: Day Selection */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-8">
                        <button onClick={prevMonth} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold text-white">{monthNames[currentMonth]} {currentYear}</h3>
                        <button onClick={nextMonth} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {dayNames.map(day => (
                          <div key={day} className="text-center text-[10px] font-bold text-white/30 uppercase tracking-widest py-2">{day}</div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, i) => {
                          const day = i + 1;
                          const dateStr = formatDateStr(day);
                          const past = isPastDay(day);
                          const selected = selectedDate === dateStr;
                          return (
                            <button
                              key={day}
                              disabled={past}
                              onClick={() => { setSelectedDate(dateStr); setSelectedTime(null); }}
                              className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all ${past ? 'text-white/10 cursor-not-allowed' :
                                selected ? 'bg-vare-purple text-white shadow-[0_0_20px_rgba(124,77,187,0.4)]' :
                                  isToday(day) ? 'bg-white/10 text-vare-purple-light ring-1 ring-vare-purple-light/50' :
                                    'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Time Selection */}
                    <div className="w-full md:w-64 border-l border-white/5 md:pl-12">
                      <h3 className="text-lg font-bold text-white mb-6">Available Times</h3>
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            disabled={!selectedDate}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 rounded-xl text-xs font-bold transition-all border ${!selectedDate ? 'border-transparent text-white/10' :
                              selectedTime === time ? 'bg-vare-purple text-white border-vare-purple shadow-md' :
                                'bg-white/5 text-white/60 border-white/5 hover:border-white/20 hover:text-white'
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Booking Form */}
                <div className="cal-anim glass-card rounded-3xl p-8 border border-white/10 opacity-0 relative overflow-hidden">
                  {!selectedDate || !selectedTime ? (
                    <div className="absolute inset-0 z-10 bg-[#0a0612]/80 backdrop-blur-sm flex items-center justify-center p-8 text-center">
                      <p className="text-white/60 font-medium">Select a date and time slot first to continue booking.</p>
                    </div>
                  ) : null}

                  <h3 className="text-xl font-bold text-white mb-8">Confirm Your Details</h3>
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        required
                        className={formInputClass}
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      />
                      <input
                        required
                        type="email"
                        className={formInputClass}
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-vare-gold" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Selected Appointment</p>
                          <p className="text-white font-bold">{selectedDate} at {selectedTime}</p>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={booking}
                        className="w-full sm:w-auto px-10 py-5 gradient-purple text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-3"
                      >
                        {booking ? <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : <Calendar className="w-5 h-5" />}
                        <span>Confirm Appointment</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Map / Location Section */}
        <section ref={mapRef} className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="map-anim opacity-0">
                <span className="text-vare-purple-light font-bold uppercase tracking-widest text-xs mb-4 block">Our Presence</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                  Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Headquarters</span>
                </h2>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-vare-gold flex-shrink-0 border border-white/10">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Global HQ</h4>
                      <p className="text-white/60 leading-relaxed">5400 Preston Oaks Rd, Dallas, TX 75254, USA</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-vare-gold flex-shrink-0 border border-white/10">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Business Hours</h4>
                      <p className="text-white/60 leading-relaxed">Mon - Fri: 9:00 AM - 6:00 PM CST<br />Sat: 10:00 AM - 2:00 PM CST</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl glass-card border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                  <p className="text-white/80 italic text-lg leading-relaxed mb-6">
                    &quot;Our doors are always open for visionary entrepreneurs looking to build something extraordinary.&quot;
                  </p>
                  <p className="text-vare-gold font-bold">— The VareWeb Team</p>
                </div>
              </div>

              <div className="map-anim opacity-0 relative">
                <div className="absolute -inset-4 bg-vare-purple/20 blur-3xl opacity-50 rounded-full" />
                <a
                  href="https://maps.app.goo.gl/VWgp48NrKJArhH6i7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block glass-card rounded-3xl overflow-hidden border border-black/10 shadow-2xl aspect-square group cursor-pointer"
                >
                  <div className="absolute inset-0 grayscale invert-[0.9] opacity-60 pointer-events-none">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src="https://maps.google.com/maps?q=5400%20Preston%20Oaks%20Rd,%20Dallas,%20TX%2075254,%20USA&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      title="Google Map"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/20 to-transparent pointer-events-none" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center group-hover:scale-110 transition-transform duration-500">
                      <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(124,77,187,0.5)] relative">
                        <MapPin className="w-8 h-8 text-white" />
                        <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-20" />
                      </div>
                      <div className="px-5 py-2.5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl group-hover:bg-black/80 transition-all">
                        <p className="text-white font-bold text-xs">VareWeb Dallas HQ</p>
                        <p className="text-white/40 text-[9px] mt-1 uppercase tracking-widest font-bold">Open in Maps</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section ref={socialRef} className="py-24 sm:py-32 bg-[#090510] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-vare-purple/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-vare-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              <div className="lg:col-span-6 section-header opacity-0">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.03] text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-6 border border-white/[0.08]">
                  Digital Footprint
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                  Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">With Us</span>
                </h2>
                <p className="text-white/60 text-lg mb-12 leading-relaxed max-w-xl">
                  Follow our journey and stay updated with the latest trends in digital innovation. We're active across all major platforms.
                </p>

                <div className="social-grid grid grid-cols-2 gap-4">
                  {socialMedia.map((social) => (
                    <div
                      key={social.name}
                      className="social-card group relative p-8 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl opacity-0"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/20 transition-all">
                          <social.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{social.name}</h3>
                        <p className="text-white/40 text-sm font-medium">{social.followers}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 relative block mt-12 lg:mt-0">
                <div className="relative aspect-square flex items-center justify-center">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-vare-purple/10 blur-[120px] rounded-full animate-pulse" />

                  {/* Central Core Orb */}
                  <div className="relative w-48 h-48 rounded-full gradient-purple p-px shadow-[0_0_60px_rgba(124,77,187,0.3)] group-hover:scale-105 transition-transform duration-700">
                    <div className="w-full h-full rounded-full bg-[#090510] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/20 via-transparent to-vare-gold/20" />
                      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:12px_12px]" />
                      <div className="relative z-10 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center shadow-inner">
                        <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center animate-pulse">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Data Nodes */}
                  <div className="absolute inset-0">
                    {/* Node 1: Email */}
                    <div className="absolute top-[15%] left-[10%] animate-float" style={{ animationDelay: '0s' }}>
                      <div className="glass-card px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 backdrop-blur-xl shadow-2xl">
                        <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-bold text-sm tracking-tight text-glow">contact@vareweb.com</span>
                      </div>
                    </div>

                    {/* Node 2: Phone */}
                    <div className="absolute top-[40%] right-[-5%] animate-float" style={{ animationDelay: '1.5s' }}>
                      <div className="glass-card px-5 py-3 rounded-2xl border border-vare-gold/20 flex items-center gap-3 backdrop-blur-xl shadow-2xl">
                        <div className="w-8 h-8 rounded-lg bg-vare-gold/20 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-vare-gold" />
                        </div>
                        <span className="text-white font-bold text-sm tracking-tight text-glow">+1 659 200 6383</span>
                      </div>
                    </div>

                    {/* Node 3: Location */}
                    <div className="absolute bottom-[15%] left-[20%] animate-float" style={{ animationDelay: '0.8s' }}>
                      <div className="glass-card px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 backdrop-blur-xl shadow-2xl">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white/80 font-bold text-sm tracking-tight">Dallas, TX HQ</span>
                      </div>
                    </div>

                    {/* Orbital Rings */}
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-125 rotate-12 opacity-20 pointer-events-none" />
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-110 -rotate-12 opacity-15 pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* What Happens Next Section */}
        <section className="py-24 relative overflow-hidden mesh-gradient-gold">
          <div className="absolute inset-0 bg-[#0a0612]/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">What Happens <span className="text-vare-gold">Next?</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Send, title: 'Submission', desc: 'We receive your inquiry and review your project requirements within 24 hours.' },
                { icon: MessageCircle, title: 'Consultation', desc: 'We schedule a call to deep dive into your vision and technical needs.' },
                { icon: CheckCircle2, title: 'Transformation', desc: 'Receive a tailored roadmap and proposal to bring your project to life.' }
              ].map((step, i) => (
                <div key={i} className="group p-8 rounded-3xl glass-card border border-white/5 hover:border-vare-gold/20 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-8 text-vare-gold border border-white/5 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
