export interface PortfolioItem {
  slug: string;
  title: string;
  categories: string[];
  description: string;
  gradient: string;
  pattern: string;
  challenge: string;
  solution: string;
  results: string[];
  client: string;
  techStack: string[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  gallery: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    categories: ['Web Design', 'eCommerce'],
    description: 'Full-featured online store with seamless checkout and inventory management.',
    gradient: 'from-vare-purple via-purple-700 to-indigo-800',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)',
    challenge: 'The client needed a scalable e-commerce solution that could handle high traffic volumes while maintaining a lightning-fast user experience and complex inventory logic.',
    solution: 'We implemented a custom Next.js storefront integrated with a robust headless backend, featuring optimized image delivery, a state-of-the-art caching strategy, and an intuitive checkout flow.',
    results: [
      '150% increase in conversion rate',
      '40% reduction in bounce rate',
      'Under 1s page load times globally',
    ],
    client: 'GlobalTech Retail Inc.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'GSAP', 'Sanity CMS', 'Stripe'],
    process: [
      { step: '01', title: 'Discovery', description: 'In-depth analysis of user behavior and legacy system bottlenecks.' },
      { step: '02', title: 'Design', description: 'Crafting a high-conversion UX and a modern, high-fashion aesthetic.' },
      { step: '03', title: 'Development', description: 'Building a lightning-fast frontend with optimized asset delivery.' },
      { step: '04', title: 'Launch', description: 'Seamless migration of 2M+ users and performance monitoring.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200'
    ],
    testimonial: {
      quote: "Vare CRM didn't just rebuild our site; they completely transformed our digital business model and customer engagement.",
      author: 'Sarah Jenkins',
      role: 'Head of eCommerce, GlobalTech'
    }
  },
  {
    slug: 'brand-identity-system',
    title: 'Brand Identity System',
    categories: ['Branding'],
    description: 'Complete brand overhaul including logo, typography, and visual guidelines.',
    gradient: 'from-sky-500 via-blue-600 to-cyan-600',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    challenge: 'A legacy software company felt their visual identity no longer reflected their innovative cloud-native products, leading to a disconnect with younger developers.',
    solution: 'We developed a modern, vibrant brand system that emphasizes speed and clarity, including a dynamic logo system, a custom type-scale, and a comprehensive digital style guide.',
    results: [
      'Unified 12 sub-brands under one identity',
      '200% increase in social media engagement',
      'Positive feedback from 95% of internal stakeholders',
    ],
    client: 'NovaCloud Systems',
    techStack: ['Adobe CC', 'Figma', 'React', 'TailwindCSS'],
    process: [
      { step: '01', title: 'Strategy', description: 'Defining the brand pillars and messaging for a technical audience.' },
      { step: '02', title: 'Design', description: 'Iterative logo and visual system development.' },
      { step: '03', title: 'Guidelines', description: 'Creating a robust design system for digital and print.' },
      { step: '04', title: 'Rollout', description: 'Internal team training and public brand launch.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200'
    ],
    testimonial: {
      quote: "Our new identity perfectly captures the energy of our engineering teams. We've never felt more aligned.",
      author: 'Mark Zhao',
      role: 'CEO, NovaCloud'
    }
  },
  {
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard',
    categories: ['Web Design', 'UI/UX Design'],
    description: 'Intuitive analytics dashboard for a leading SaaS company with real-time data.',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    pattern: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.08) 0%, transparent 50%)',
    challenge: 'Users were overwhelmed by complex data visualizations and struggled to find key business insights quickly in the old interface.',
    solution: 'We prioritized information hierarchy and added customizable widgets, allowing users to tailor their view to their specific KPIs while maintaining a clean, professional aesthetic.',
    results: [
      '35% reduction in customer support tickets',
      'Average time-to-insight reduced by 60%',
      'Daily active users increased by 25%',
    ],
    client: 'InsightFlow Analytics',
    techStack: ['Next.js', 'D3.js', 'Radix UI', 'Framer Motion'],
    process: [
      { step: '01', title: 'Audit', description: 'Reviewing user heatmaps to identify friction points.' },
      { step: '02', title: 'Wireframing', description: 'Testing high-level dashboard layouts for clarity.' },
      { step: '03', title: 'Interactive UX', description: 'Building responsive charts and real-time updates.' },
      { step: '04', title: 'Validation', description: 'Beta testing with core users to refine workflows.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    slug: 'mobile-banking-app',
    title: 'Mobile Banking App',
    categories: ['Mobile Apps'],
    description: 'Secure and user-friendly banking application for iOS and Android platforms.',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    pattern: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    challenge: 'Transitioning a traditional bank to a mobile-first experience required balancing strict security requirements with a seamless, modern user interface.',
    solution: 'We built a high-performance React Native app with biometric authentication, real-time transaction tracking, and a simplified peer-to-peer payment system.',
    results: [
      '4.8 star average rating on App Store',
      'Over 1 million active monthly users',
      '99.9% crash-free sessions',
    ],
    client: 'Heritage Trust Bank',
    techStack: ['React Native', 'Node.js', 'Biometrics API', 'AWS'],
    process: [
      { step: '01', title: 'Security First', description: 'Establishing encryption and compliance protocols.' },
      { step: '02', title: 'UX/UI', description: 'Designing high-trust visual language and intuitive nav.' },
      { step: '03', title: 'App Dev', description: 'Building performance-optimized mobile features.' },
      { step: '04', title: 'Testing', description: 'Extensive penetration testing and user QA.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    slug: 'restaurant-chain-website',
    title: 'Restaurant Chain Website',
    categories: ['Web Design'],
    description: 'Multi-location restaurant website with online ordering and table reservations.',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    pattern: 'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.08) 0%, transparent 50%)',
    challenge: 'A national restaurant chain needed a unified platform for 50+ locations that allowed for local menu management and global brand consistency.',
    solution: 'We developed a multi-tenant CMS architecture with location-based dynamic routing and an integrated real-time reservation system.',
    results: [
      '300% increase in online reservations',
      'Direct online ordering revenue grew by 45%',
      'Average session duration increased by 80%',
    ],
    client: 'Epicurean Group',
    techStack: ['Next.js', 'Strapi CMS', 'React Query'],
    process: [
      { step: '01', title: 'Discovery', description: 'Analyzing multi-location operations and ordering flows.' },
      { step: '02', title: 'CMS Design', description: 'Building a flexible backend for regional managers.' },
      { step: '03', title: 'Ordering UX', description: 'Streamlining the menu-to-checkout journey.' },
      { step: '04', title: 'Integration', description: 'Connecting POS systems and reservation APIs.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    slug: 'real-estate-portal',
    title: 'Real Estate Portal',
    categories: ['Web Design', 'eCommerce'],
    description: 'Property listing platform with advanced search and virtual tour capabilities.',
    gradient: 'from-indigo-600 via-violet-600 to-purple-700',
    pattern: 'radial-gradient(circle at 25% 75%, rgba(255,255,255,0.08) 0%, transparent 50%)',
    challenge: 'Property seekers needed a more immersive way to view high-end luxury listings without physical site visits.',
    solution: 'We integrated 3D virtual tour technology directly into the search results and added an AI-powered property matching algorithm.',
    results: [
      'Property inquiries increased by 50%',
      'International lead generation up by 40%',
      'Average visit duration grew to 12 minutes',
    ],
    client: 'Vanguard Realty',
    techStack: ['Next.js', 'Three.js', 'Google Maps API'],
    process: [
      { step: '01', title: 'Research', description: 'Understanding global luxury buyer search behaviors.' },
      { step: '02', title: 'Immersive Design', description: 'Integrating 3D modeling into property cards.' },
      { step: '03', title: 'Search UX', description: 'Building advanced filters and mapping tools.' },
      { step: '04', title: 'Launch', description: 'Phased rollout and lead-tracking integration.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    slug: 'healthcare-platform',
    title: 'Healthcare Platform',
    categories: ['Web Design', 'Mobile Apps'],
    description: 'Comprehensive telemedicine and patient management platform.',
    gradient: 'from-teal-400 via-emerald-500 to-green-600',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    challenge: 'Providers needed a secure way to manage patients while patients required a simplified interface for booking and post-care tracking.',
    solution: 'We designed a dual-portal system with HIPAA-compliant data storage, real-time video consultations, and integrated billing.',
    results: [
      '95% patient satisfaction rating',
      'Provider administrative work reduced by 30%',
      'Telehealth adoption increased by 400%',
    ],
    client: 'CareSync Medical',
    techStack: ['React', 'Node.js', 'WebRTC', 'Firebase'],
    process: [
      { step: '01', title: 'Compliance', description: 'Setting up HIPAA-secure cloud infrastructure.' },
      { step: '02', title: 'Portal Design', description: 'UX for both medical providers and patients.' },
      { step: '03', title: 'Video Engine', description: 'Optimizing low-latency telehealth consultations.' },
      { step: '04', title: 'EHR Sync', description: 'Integrating with existing hospital record systems.' },
    ],
    gallery: []
  },
  {
    slug: 'fashion-brand-redesign',
    title: 'Fashion Brand Redesign',
    categories: ['Branding', 'eCommerce'],
    description: 'Luxury fashion eCommerce with 3D product visualization and AR try-on.',
    gradient: 'from-slate-700 via-gray-800 to-zinc-900',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 50%)',
    challenge: 'A luxury brand wanted to bridge the gap between in-store and online shopping experiences during a global brand refresh.',
    solution: 'We paired cinematic storytelling with AR technology, allowing users to "try on" accessories using their mobile device camera.',
    results: [
      'Product return rate decreased by 20%',
      'Average order value increased by 15%',
      'Won Gold at the International Web Design Awards',
    ],
    client: 'Lumière Paris',
    techStack: ['Next.js', '8th Wall AR', 'Shopify Plus'],
    process: [
      { step: '01', title: 'Moodboard', description: 'Defining the editorial aesthetic for the digital store.' },
      { step: '02', title: 'Ar Dev', description: 'Prototyping realistic 3D accessory try-ons.' },
      { step: '03', title: 'Commerce', description: 'Building the Shopify-integrated high-speed store.' },
      { step: '04', title: 'Global Launch', description: 'Coordinated rollout across 15 fashion regions.' },
    ],
    gallery: []
  },
  {
    slug: 'fintech-dashboard',
    title: 'FinTech Dashboard',
    categories: ['UI/UX Design', 'Web Design'],
    description: 'Real-time financial analytics and portfolio management dashboard.',
    gradient: 'from-blue-600 via-indigo-600 to-violet-600',
    pattern: 'radial-gradient(circle at 35% 65%, rgba(255,255,255,0.08) 0%, transparent 50%)',
    challenge: 'Retail investors found existing financial tools too complex, leading to low retention and high churn.',
    solution: 'We focused on clear data visualizations and simplified the onboarding process with interactive tooltips and guided walkthroughs.',
    results: [
      'Customer churn rate decreased by 25%',
      'Mobile app engagement increased by 60%',
      'Net Promoter Score (NPS) improved by 35 points',
    ],
    client: 'CapitalEdge',
    techStack: ['React', 'Highcharts', 'Auth0'],
    process: [
      { step: '01', title: 'User Research', description: 'Interviewing retail investors about data pain points.' },
      { step: '02', title: 'Visualisation', description: 'Designing high-density but clear data components.' },
      { step: '03', title: 'Security', description: 'Implementing multi-factor auth and data privacy.' },
      { step: '04', title: 'Scale', description: 'Optimizing graph rendering for tens of thousands of users.' },
    ],
    gallery: []
  },
  {
    slug: 'travel-booking-app',
    title: 'Travel Booking App',
    categories: ['Mobile Apps', 'eCommerce'],
    description: 'Full-service travel booking with AI-powered recommendations.',
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
    pattern: 'radial-gradient(circle at 65% 35%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    challenge: 'The client wanted to disrupt the crowded travel market by offering hyper-personalized itineraries powered by machine learning.',
    solution: 'We built a data-driven mobile experience that learns from user behavior to suggest destinations, flights, and accommodations.',
    results: [
      'AI-driven bookings accounted for 40% of revenue',
      'User retention rate stabilized at 65% after 12 months',
      'Named "Editor\'s Choice" on the Play Store',
    ],
    client: 'Wanderlust AI',
    techStack: ['React Native', 'TensorFlow.js', 'GraphQL'],
    process: [
      { step: '01', title: 'Data Strategy', description: 'Determining the recommendation engine parameters.' },
      { step: '02', title: 'Mobile UX', description: 'Simplified travel discovery and booking flows.' },
      { step: '03', title: 'Integration', description: 'Connecting global flight and hotel APIs.' },
      { step: '04', title: 'Optimization', description: 'Caching and speed optimization for on-the-go users.' },
    ],
    gallery: []
  },
  {
    slug: 'crypto-exchange',
    title: 'Crypto Exchange',
    categories: ['Web Design', 'UI/UX Design'],
    description: 'Secure cryptocurrency trading platform with advanced charting tools.',
    gradient: 'from-purple-600 via-violet-500 to-indigo-500',
    pattern: 'radial-gradient(circle at 45% 55%, rgba(255,255,255,0.08) 0%, transparent 50%)',
    challenge: 'A group of traders needed a platform that combined high-speed trade execution with an interface that didn\'t sacrifice usability for complexity.',
    solution: 'We implemented a custom trading engine with WebSocket-driven real-time updates and a modular, drag-and-drop workspace layout.',
    results: [
      'Handles $100M+ in daily trading volume',
      'Achieved 10ms latency for order execution',
      'User base grew to 250k in 6 months',
    ],
    client: 'Nexus Trading',
    techStack: ['React', 'Next.js', 'WebSockets', 'Go'],
    process: [
      { step: '01', title: 'Architecture', description: 'High-availability backend and frontend scaling.' },
      { step: '02', title: 'Trading UX', description: 'Design for efficiency and real-time visualization.' },
      { step: '03', title: 'Core Dev', description: 'Building the low-latency trade engine.' },
      { step: '04', title: 'Testing', description: 'Heavy financial load and stress testing.' },
    ],
    gallery: []
  },
  {
    slug: 'fitness-app-design',
    title: 'Fitness App Design',
    categories: ['Mobile Apps', 'UI/UX Design'],
    description: 'Workout tracking and nutrition planning with wearable integration.',
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
    pattern: 'radial-gradient(circle at 75% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    challenge: 'Existing fitness apps were failing to keep users motivated past the first month.',
    solution: 'We integrated social gamification and a unique virtual coaching system that adapts to user progress and feedback.',
    results: [
      '90-day user retention increased by 45%',
      'Community participation grew by 200%',
      'Integration with over 50 wearable devices',
    ],
    client: 'Strive Fitness',
    techStack: ['Flutter', 'Google Fit SDK', 'Apple HealthKit'],
    process: [
      { step: '01', title: 'Research', description: 'Studying psychological triggers for exercise habituation.' },
      { step: '02', title: 'Gamification', description: 'Design of badges, levels, and social competitions.' },
      { step: '03', title: 'Integration', description: 'Deep health-platform data syncing.' },
      { step: '04', title: 'Beta Testing', description: 'Validating engagement cycles with test users.' },
    ],
    gallery: []
  },
  {
    slug: 'corporate-website',
    title: 'Corporate Website',
    categories: ['Web Design', 'Branding'],
    description: 'Enterprise-level corporate site with multilingual support and CMS.',
    gradient: 'from-slate-600 via-blue-700 to-indigo-800',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 50%)',
    challenge: 'A global logistics firm needed a centralized platform that could support 20 languages and different content for each region.',
    solution: 'We built a headless CMS architecture with global content localization and a robust permissions system for regional editors.',
    results: [
      'Site load time improved by 60% globally',
      'Content update time reduced from days to minutes',
      'SEO rankings increased for international keywords',
    ],
    client: 'Global Logistics Corp',
    techStack: ['Next.js', 'Contentful', 'GraphQL'],
    process: [
      { step: '01', title: 'Sitemap', description: 'Defining the complex global navigation and region logic.' },
      { step: '02', title: 'UX Design', description: 'Crafting the high-trust, professional visual brand.' },
      { step: '03', title: 'headless Dev', description: 'Building the localization-aware frontend.' },
      { step: '04', title: 'SEO Review', description: 'Optimizing technical SEO for multiple regions.' },
    ],
    gallery: []
  },
  {
    slug: 'food-delivery-platform',
    title: 'Food Delivery Platform',
    categories: ['Mobile Apps', 'eCommerce'],
    description: 'On-demand food delivery with real-time tracking and driver management.',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    pattern: 'radial-gradient(circle at 55% 45%, rgba(255,255,255,0.08) 0%, transparent 50%)',
    challenge: 'A startup food delivery service needed to automate the coordination between restaurants, drivers, and customers to reduce late deliveries.',
    solution: 'We developed an AI routing engine that optimizes delivery paths in real-time based on traffic and order volume.',
    results: [
      'Average delivery time reduced by 25%',
      'Order volume grew by 20% month-over-month',
      'Driver efficiency increased by 35%',
    ],
    client: 'QuickBite Delivery',
    techStack: ['React Native', 'Node.js', 'Mapbox API'],
    process: [
      { step: '01', title: 'Discovery', description: 'Workflow mapping with actual delivery drivers.' },
      { step: '02', title: 'Algorithm Dev', description: 'Building the real-time AI routing engine.' },
      { step: '03', title: 'Mobile Dev', description: 'Developing separate apps for orders and drivers.' },
      { step: '04', title: 'Optimization', description: 'Fine-tuning the dispatch logic for speed.' },
    ],
    gallery: []
  },
  {
    slug: 'edtech-platform',
    title: 'EdTech Platform',
    categories: ['Web Design', 'UI/UX Design'],
    description: 'Interactive learning management system with live classes and assessments.',
    gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
    challenge: 'The shift to remote learning revealed a need for a more engaging, interactive classroom experience that worked on low-bandwidth connections.',
    solution: 'We implemented a custom video streaming solution with low-latency interactive whiteboards and offline-ready learning modules.',
    results: [
      'Student course completion rate up by 40%',
      'Platform usage increased by 300% in one year',
      'Successfully scaled to support 500k concurrent users',
    ],
    client: 'EduStream Interactive',
    techStack: ['Next.js', 'Socket.io', 'Mux Video'],
    process: [
      { step: '01', title: 'Pedagogy', description: 'Reviewing educational methods for online engagement.' },
      { step: '02', title: 'Video Dev', description: 'Low-latency streaming optimizations.' },
      { step: '03', title: 'LMS UX', description: 'Simplifying teacher and student dashboards.' },
      { step: '04', title: 'Scale', description: 'Migrating to a robust cloud infrastructure.' },
    ],
    gallery: []
  },
  {
    slug: 'luxury-brand-website',
    title: 'Luxury Brand Website',
    categories: ['Branding', 'eCommerce'],
    description: 'Premium brand experience with cinematic storytelling and curated shopping.',
    gradient: 'from-amber-600 via-yellow-600 to-orange-600',
    pattern: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    challenge: 'A luxury watchmaker needed an online presence that matched the artisanal craftsmanship and exclusivity of their physical timepieces.',
    solution: 'We combined high-definition video, interactive 3D watch modeling, and a personalized concierge shopping experience.',
    results: [
      'Digital direct-to-consumer sales grew by 60%',
      'Average time on site increased to 15 minutes',
      'Strongly strengthened global brand prestige',
    ],
    client: 'Aurum Timepieces',
    techStack: ['Next.js', 'Framer Motion', 'Shopify'],
    process: [
      { step: '01', title: 'Heritage Strategy', description: 'Translating artisanal feel into digital form.' },
      { step: '02', title: 'Storytelling UI', description: 'Cinematic layout and content design.' },
      { step: '03', title: 'Commerce Flow', description: 'High-touch concierge shopping integration.' },
      { step: '04', title: 'Brand Launch', description: 'Global unveiling in major watch markets.' },
    ],
    gallery: []
  },
];
