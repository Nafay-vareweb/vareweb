'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageDecorations from '@/components/PageDecorations';
import ParticleBackground from '@/components/ParticleBackground';
import {
  Monitor, Smartphone, RefreshCw, Palette, Search, ShoppingCart,
  ArrowRight, Layers, Code, Zap, TrendingUp, CheckCircle,
  Code2, Server, Cloud, BarChart3, Star, Target,
  Stethoscope, Landmark, GraduationCap, Building2, UtensilsCrossed, Plane, Cpu,
  Wrench, Workflow, Share2, FileText, MessageSquare, Mic, Headphones,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Monitor,
    title: 'Custom Web Design',
    slug: 'custom-web-design',
    desc: 'Each website we create is meticulously crafted to deliver a 100% unique online experience tailored to your brand. Our expert designers transform your vision into a dynamic, custom design that enhances visibility and drives conversions.',
    desc2: 'We focus on creating pixel-perfect designs that not only look stunning but also function flawlessly across all platforms and devices.',
    color: 'from-purple-500 to-indigo-600',
    features: [
      'Bespoke design tailored to your brand identity',
      'Custom animations and interactive elements',
      'SEO-friendly architecture from the ground up',
      'Cross-browser compatibility assurance',
      'Scalable codebase for future growth',
    ],
  },
  {
    icon: Smartphone,
    title: 'Responsive Web Design',
    slug: 'responsive-web-design',
    desc: 'We deliver seamless user experiences across all devices. Our responsive designs adapt flawlessly to any screen size, ensuring a consistent, engaging experience for every visitor, no matter how they access your site.',
    desc2: 'From smartphones to large desktop monitors, your website will look and perform beautifully everywhere.',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Mobile-first design methodology',
      'Fluid grid layouts and flexible images',
      'Touch-optimized user interfaces',
      'Fast loading times on any device',
      'Consistent branding across breakpoints',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    slug: 'website-redesign',
    desc: 'Breathe new life into your existing website with our comprehensive redesign services. We modernize outdated designs, improve user experience, and optimize for performance to keep your brand competitive.',
    desc2: 'Our redesign process preserves your SEO equity while dramatically improving visual appeal and user engagement.',
    color: 'from-emerald-500 to-teal-500',
    features: [
      'Complete visual overhaul and modernization',
      'Content strategy and information architecture',
      'Performance optimization and speed improvements',
      'SEO migration and 301 redirect management',
      'Analytics integration and conversion tracking',
    ],
  },
  {
    icon: Palette,
    title: 'UX/UI Design',
    slug: 'ux-ui-design',
    desc: 'Our UX/UI design process is rooted in research and user psychology. We create intuitive interfaces that delight users, reduce friction, and guide visitors seamlessly toward conversion points.',
    desc2: 'We combine beautiful aesthetics with data-driven design decisions to maximize your digital impact.',
    color: 'from-orange-500 to-red-500',
    features: [
      'User research and persona development',
      'Wireframing and interactive prototyping',
      'Usability testing and iterative refinement',
      'Accessibility compliance (WCAG standards)',
      'Design systems and component libraries',
    ],
  },
  {
    icon: Search,
    title: 'Search Engine Optimization',
    slug: 'search-engine-optimization',
    desc: 'Dominate search results with our data-driven SEO strategies. From technical optimization to content marketing, we ensure your website ranks higher and attracts qualified organic traffic consistently.',
    desc2: 'Our proven SEO methodologies have helped hundreds of businesses achieve first-page rankings and sustained organic growth.',
    color: 'from-violet-500 to-purple-600',
    features: [
      'Technical SEO audit and implementation',
      'Keyword research and content strategy',
      'On-page and off-page optimization',
      'Local SEO and Google Business setup',
      'Monthly reporting and performance analysis',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'eCommerce Design & Development',
    slug: 'ecommerce-development',
    desc: 'Build powerful online stores that convert browsers into buyers. We create stunning eCommerce experiences with secure payment processing, inventory management, and seamless checkout flows.',
    desc2: 'From product catalogs to complex multi-vendor marketplaces, we have the expertise to build your ideal online store.',
    color: 'from-pink-500 to-rose-500',
    features: [
      'Custom storefront design and branding',
      'Secure payment gateway integration',
      'Inventory and order management systems',
      'Abandoned cart recovery solutions',
      'Multi-currency and multi-language support',
    ],
  },
  {
    icon: Wrench,
    title: 'Custom Software Development',
    slug: 'custom-software-development',
    desc: 'We build bespoke software solutions designed to solve your unique business challenges. From enterprise-level applications to specialized internal tools, our development team delivers robust, scalable software that streamlines your operations.',
    desc2: 'Every solution is architected with maintainability and future growth in mind, ensuring your investment pays dividends for years to come.',
    color: 'from-amber-500 to-orange-600',
    features: [
      'Full-stack custom application development',
      'API design and third-party integrations',
      'Legacy system modernization and migration',
      'Automated testing and CI/CD pipelines',
      'Comprehensive technical documentation',
    ],
  },
  {
    icon: Workflow,
    title: 'GHL (GoHighLevel) Development & Automation',
    slug: 'ghl-development',
    desc: 'Unlock the full potential of GoHighLevel with our expert development and automation services. We build custom workflows, pipelines, and integrations that supercharge your lead generation, nurturing, and conversion processes.',
    desc2: 'From CRM customization to automated follow-up sequences, we help you leverage GHL to create a fully automated marketing machine that runs 24/7.',
    color: 'from-sky-500 to-blue-600',
    features: [
      'Custom CRM configuration and pipeline setup',
      'Automated workflow and trigger building',
      'Funnel design and landing page creation',
      'Third-party app integration and API connections',
      'SMS, email, and voicemail drop campaign automation',
    ],
  },
  {
    icon: MessageSquare,
    title: 'AI Chat & Voice Bots',
    slug: 'ai-chat-bot',
    desc: 'Design and deploy conversational AI agents for chat and voice — from prototype demos to production-grade integrations with CRM and telephony.',
    desc2: 'Omnichannel conversational experiences with analytics, secure integrations, and automated workflows.',
    color: 'from-indigo-500 to-violet-600',
    features: [
      'Smart, multi-turn chat bots',
      'Voice assistants with TTS & STT',
      'Omnichannel deployment (web, SMS, telephony)',
      'CRM and workflow automations',
      'Conversation analytics & transcripts',
      'Enterprise-grade security and scaling',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    desc: 'We design and develop high-performance mobile applications for iOS and Android that your users will love. Our apps combine stunning interfaces with seamless functionality to deliver exceptional mobile experiences.',
    desc2: 'Using modern cross-platform frameworks and native development, we ensure your app performs flawlessly while minimizing development costs and time to market.',
    color: 'from-teal-500 to-emerald-600',
    features: [
      'Native and cross-platform app development',
      'Intuitive UI/UX design for mobile',
      'Push notifications and real-time messaging',
      'App Store optimization and publishing support',
      'Ongoing maintenance and performance monitoring',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing & PPC',
    slug: 'digital-marketing',
    desc: 'Drive qualified traffic and maximize your return on ad spend with our data-driven digital marketing and pay-per-click campaigns. We craft targeted strategies across Google Ads, social media platforms, and display networks.',
    desc2: 'Our team continuously monitors, tests, and optimizes every campaign to ensure you get the highest possible conversion rates at the lowest cost per acquisition.',
    color: 'from-rose-500 to-pink-600',
    features: [
      'Google Ads and Bing Ads campaign management',
      'Social media advertising across all platforms',
      'Retargeting and remarketing strategies',
      'Conversion rate optimization and A/B testing',
      'Detailed analytics and ROI reporting',
    ],
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    slug: 'social-media-management',
    desc: 'Build a powerful social media presence that engages your audience and drives brand awareness. We create compelling content, manage your profiles, and foster meaningful interactions across all major platforms.',
    desc2: 'Our social strategies are designed to grow your following organically while amplifying reach through targeted campaigns and community engagement.',
    color: 'from-fuchsia-500 to-purple-600',
    features: [
      'Content calendar creation and scheduling',
      'Platform-specific content design and copywriting',
      'Community management and audience engagement',
      'Social media analytics and performance reporting',
      'Influencer outreach and partnership coordination',
    ],
  },
  {
    icon: Palette,
    title: 'Brand Identity & Logo Design',
    slug: 'brand-identity-design',
    desc: 'Establish a memorable and cohesive brand identity that sets you apart from the competition. Our designers craft stunning logos, color palettes, typography systems, and brand guidelines that resonate with your target audience.',
    desc2: 'We go beyond aesthetics to build brand strategies that communicate your values, evoke emotion, and create lasting connections with your customers.',
    color: 'from-red-500 to-rose-600',
    features: [
      'Custom logo design with multiple concepts',
      'Complete brand style guide development',
      'Business card and stationery design',
      'Brand voice and messaging framework',
      'Social media brand kit and templates',
    ],
  },
  {
    icon: FileText,
    title: 'Content Writing & Strategy',
    slug: 'content-writing-strategy',
    desc: 'Engage your audience with compelling, SEO-optimized content that drives organic traffic and establishes your authority. Our experienced writers create blog posts, whitepapers, case studies, and website copy that convert.',
    desc2: 'We develop comprehensive content strategies aligned with your business goals, ensuring every piece of content serves a purpose in your marketing funnel.',
    color: 'from-lime-500 to-green-600',
    features: [
      'Blog posts and article writing',
      'SEO keyword research and content planning',
      'Whitepapers and e-book development',
      'Website copy and product descriptions',
      'Content performance tracking and optimization',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions & Hosting',
    slug: 'cloud-solutions-hosting',
    desc: 'Ensure your digital infrastructure is fast, secure, and scalable with our comprehensive cloud solutions and managed hosting services. We architect cloud environments that handle traffic spikes gracefully and keep your applications running 24/7.',
    desc2: 'From AWS and Google Cloud to specialized hosting configurations, we optimize your infrastructure for performance, security, and cost efficiency.',
    color: 'from-cyan-500 to-teal-600',
    features: [
      'Cloud architecture design and migration',
      'Managed hosting and server monitoring',
      'SSL certificates and security hardening',
      'Automatic backups and disaster recovery',
      'CDN setup and global performance optimization',
    ],
  },
];

const steps = [
  { num: '01', title: 'Planning', desc: 'We dive deep into your business goals, audience, and competition to create a strategic roadmap for success.', icon: Search },
  { num: '02', title: 'Design', desc: 'Our creative team crafts pixel-perfect designs and builds robust, scalable solutions using cutting-edge technology.', icon: Code },
  { num: '03', title: 'Testing', desc: 'Every element is rigorously tested across devices and browsers before we deploy your project to the world.', icon: Zap },
  { num: '04', title: 'Support', desc: 'We provide ongoing support and optimization to ensure your digital presence continues to evolve and succeed.', icon: TrendingUp },
];

const techCategories = [
  {
    icon: Code2,
    title: 'Frontend',
    color: 'from-vare-purple to-vare-purple-light',
    technologies: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
  },
  {
    icon: Server,
    title: 'Backend',
    color: 'from-vare-purple-light to-[#7c4dbb]',
    technologies: ['Node.js', 'Python', 'Django', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'],
  },
  {
    icon: Palette,
    title: 'Design',
    color: 'from-[#7c4dbb] to-vare-gold',
    technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'Sketch'],
  },
  {
    icon: Cloud,
    title: 'DevOps',
    color: 'from-vare-gold to-[#d97706]',
    technologies: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'Nginx', 'Cloudflare'],
  },
];

const caseStudies = [
  {
    title: 'TechStart E-Commerce Redesign',
    description: 'Complete overhaul of an e-commerce platform resulting in massive growth',
    stats: [
      { value: '+150%', label: 'Revenue' },
      { value: '+200%', label: 'Users' },
      { value: '-60%', label: 'Bounce Rate' },
    ],
    tags: ['Web Design', 'eCommerce', 'SEO'],
    gradient: 'from-vare-purple to-vare-purple-light',
  },
  {
    title: 'HealthTech Patient Portal',
    description: 'Building a HIPAA-compliant healthcare platform serving 100K+ patients',
    stats: [
      { value: '100K+', label: 'Patients' },
      { value: '99.9%', label: 'Uptime' },
      { value: '4.9/5', label: 'Rating' },
    ],
    tags: ['Healthcare', 'Web App', 'Security'],
    gradient: 'from-vare-purple-light to-[#7c4dbb]',
  },
  {
    title: 'GlobalFood Delivery App',
    description: 'Mobile-first platform connecting restaurants with customers across 50 cities',
    stats: [
      { value: '50', label: 'Cities' },
      { value: '500K', label: 'Downloads' },
      { value: '4.8/5', label: 'Rating' },
    ],
    tags: ['Mobile App', 'UI/UX', 'Backend'],
    gradient: 'from-[#7c4dbb] to-vare-gold',
  },
];

const industries = [
  { name: 'Healthcare & Medical', icon: Stethoscope, description: 'HIPAA-compliant solutions for clinics, hospitals, and telehealth platforms.' },
  { name: 'E-Commerce & Retail', icon: ShoppingCart, description: 'Scalable storefronts and marketplaces that drive conversions.' },
  { name: 'Finance & Banking', icon: Landmark, description: 'Secure fintech applications with robust data protection.' },
  { name: 'Education & E-Learning', icon: GraduationCap, description: 'Engaging learning platforms and course management systems.' },
  { name: 'Real Estate', icon: Building2, description: 'Property listing portals and virtual tour experiences.' },
  { name: 'Food & Restaurant', icon: UtensilsCrossed, description: 'Ordering systems and delivery apps for the hospitality sector.' },
  { name: 'Travel & Hospitality', icon: Plane, description: 'Booking platforms and travel management solutions.' },
  { name: 'Technology & SaaS', icon: Cpu, description: 'Product design and development for tech companies worldwide.' },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const techStackRef = useRef<HTMLElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);
  const industriesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
      }

      // Service cards
      if (servicesRef.current) {
        gsap.fromTo(
          servicesRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: servicesRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          servicesRef.current.querySelectorAll('.service-card'),
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: servicesRef.current.querySelector('.services-grid'), start: 'top 80%' } }
        );
      }

      // Process steps
      if (processRef.current) {
        gsap.fromTo(
          processRef.current.querySelectorAll('.process-step'),
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: processRef.current, start: 'top 75%' } }
        );
      }

      // Technology Stack
      if (techStackRef.current) {
        gsap.fromTo(
          techStackRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: techStackRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          techStackRef.current.querySelectorAll('.tech-card'),
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: techStackRef.current.querySelector('.tech-grid'), start: 'top 80%' } }
        );
      }

      // Case Studies
      if (caseStudiesRef.current) {
        gsap.fromTo(
          caseStudiesRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: caseStudiesRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          caseStudiesRef.current.querySelectorAll('.case-card'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: caseStudiesRef.current.querySelector('.case-grid'), start: 'top 80%' } }
        );
      }

      // Industries
      if (industriesRef.current) {
        gsap.fromTo(
          industriesRef.current.querySelector('.section-header'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: industriesRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(
          industriesRef.current.querySelectorAll('.industry-card'),
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: industriesRef.current.querySelector('.industries-grid'), start: 'top 80%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <PageDecorations />
      <main>

        {/* Hero */}
        <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden mesh-gradient-purple">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0">
             <div className="absolute top-20 left-10 w-96 h-96 bg-vare-purple/20 rounded-full blur-[120px] animate-pulse" />
             <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-vare-gold/10 rounded-full blur-[150px]" />
          </div>
          <ParticleBackground count={120} interactive={true} zIndex={5} />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="hero-anim inline-flex items-center px-4 py-1.5 rounded-full glass-card border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest mb-8 opacity-0">
              <Layers className="w-4 h-4 mr-2" /> Strategic Solutions
            </span>
            <h1 className="hero-anim text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 opacity-0 tracking-tighter leading-[0.85]">
              Elite Digital <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Engineering</span>
            </h1>
            <p className="hero-anim max-w-3xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed opacity-0 font-medium">
              We architect sophisticated digital ecosystems that transcend standard development. 
              Our suite of services is precision-engineered for market dominance and global scalability.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={servicesRef} className="py-24 sm:py-32 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-[0.2em] mb-8">
                The Solutions Hub
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Digital Architecture</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                We deliver a paradigm shift in digital execution, blending creative supremacy with Tier-1 technical performance.
              </p>
            </div>
            
            <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="service-card group relative glass-card p-10 lg:p-12 border-white/5 hover:bg-white/[0.04] transition-all duration-700 flex flex-col"
                >
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-r ${service.color} flex items-center justify-center mb-10 shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-500`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-5 tracking-tight group-hover:text-vare-purple-light transition-colors duration-500 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-4 mb-10 flex-1">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-start text-sm text-white/50 group/item">
                        <div className="w-5 h-5 rounded-full bg-vare-purple/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <CheckCircle className="w-3 h-3 text-vare-purple-light" />
                        </div>
                        <span className="group-hover/item:text-white transition-colors leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-auto group/link inline-flex items-center text-white/90 font-black text-[10px] uppercase tracking-widest hover:text-vare-purple-light transition-colors"
                  >
                    Deep Dive <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section ref={processRef} className="py-24 sm:py-32 mesh-gradient-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-background/40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full glass-card border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                Operational Framework
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
                Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Methodology</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                Our elite operational cycle guarantees precision delivery across every engagement vector.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="process-step group relative glass-card-accent p-10 border border-white/5 hover:bg-white/[0.04] transition-all duration-700">
                  <div className="absolute -top-6 -right-6 text-8xl font-black text-white/[0.03] pointer-events-none group-hover:text-vare-purple/5 transition-colors duration-700 select-none">
                    {step.num}
                  </div>
                  <div className="w-16 h-16 rounded-[1.5rem] gradient-purple flex items-center justify-center mb-8 shadow-2xl shadow-purple-900/40 group-hover:scale-110 transition-transform duration-700">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-tight">{step.title}</h3>
                  <p className="text-white/40 text-sm font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section ref={techStackRef} className="py-24 sm:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vare-purple/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="section-header text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                The Engine
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">Technology Stack</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                We leverage a Tier-1 modular tech stack designed for peak performance and infinite scalability.
              </p>
            </div>
            
            <div className="tech-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {techCategories.map((category, i) => (
                <div
                  key={i}
                  className="tech-card group relative glass-card p-10 lg:p-12 border-white/5 hover:bg-white/[0.04] transition-all duration-700 hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700`} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-10">
                      <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${category.color} flex items-center justify-center shadow-xl shadow-black/40 group-hover:scale-110 transition-transform duration-500`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {category.technologies.map((tech, j) => (
                        <span
                          key={j}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest hover:border-vare-purple-light/40 hover:text-white transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results & Case Study Highlights */}
        <section ref={caseStudiesRef} className="py-24 sm:py-32 mesh-gradient-purple relative overflow-hidden">
          <div className="absolute inset-0 bg-background/30" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="section-header text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full glass-card border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                Performance Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
                Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Impact</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                High-stakes metrics delivered for global industry leaders.
              </p>
            </div>
            
            <div className="case-grid grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              {caseStudies.map((study, i) => (
                <div
                  key={i}
                  className="case-card group relative glass-card p-10 lg:p-12 border-white/5 hover:bg-white/[0.04] transition-all duration-700 flex flex-col min-h-[500px]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-12">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp className="w-7 h-7 text-vare-gold" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-vare-purple-light transition-colors">{study.title}</h3>
                      <p className="text-white/40 text-sm font-medium leading-relaxed">{study.description}</p>
                    </div>

                    <div className="mt-auto space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {study.stats.map((stat, j) => (
                          <div key={j} className="glass-card rounded-2xl p-5 border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-center group/stat hover:bg-white/[0.04] transition-colors">
                            <div className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none">{stat.value}</div>
                            <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-2 leading-none group-hover/stat:text-vare-purple-light transition-colors">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section ref={industriesRef} className="py-24 sm:py-32 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="section-header text-center mb-24 px-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-vare-purple-light text-xs font-bold uppercase tracking-widest mb-8">
                Global Sector Expertise
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-purple-light to-blue-400">We Serve</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                Deep-domain intelligence across the world's most critical sectors.
              </p>
            </div>
            
            <div className="industries-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, i) => (
                <div
                  key={i}
                  className="industry-card group glass-card p-8 border-white/5 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:bg-gradient-to-br group-hover:from-vare-purple group-hover:to-vare-purple-light flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110">
                    <industry.icon className="w-6 h-6 text-vare-purple-light group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-3 group-hover:text-vare-purple-light transition-colors duration-500 leading-tight">
                    {industry.name}
                  </h3>
                  <p className="text-white/40 text-sm font-medium leading-relaxed">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="glass-card-accent rounded-[4rem] p-12 sm:p-24 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-vare-purple/10 via-transparent to-vare-gold/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest mb-10">
                  <Target className="w-4 h-4 text-vare-gold" /> Initiate Your Project
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
                  Ready to Build <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold via-yellow-300 to-yellow-500">The Future?</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                  Our team of digital architects is ready to transform your vision into an elite digital ecosystem. Let&apos;s start the conversation.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <Link 
                     href="/contact"
                     className="group relative px-14 py-7 gradient-purple text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_20px_60px_rgba(124,77,187,0.4)] transition-all transform hover:-translate-y-2 border border-white/10 overflow-hidden min-w-[280px]"
                  >
                    <span className="relative z-10">Start This Mission</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  <Link 
                     href="/pricing"
                     className="px-14 py-7 bg-white/5 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all border border-white/5 flex items-center justify-center gap-4 group min-w-[280px]"
                  >
                    View Pricing Plans <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="mt-16 flex flex-wrap justify-center gap-10 text-white/20 text-[10px] uppercase font-black tracking-widest">
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Free Strategy Session</span>
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Custom Roadmap</span>
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Tier-1 Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
