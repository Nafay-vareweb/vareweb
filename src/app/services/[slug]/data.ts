import {
  Monitor, Smartphone, RefreshCw, Palette, Search, ShoppingCart,
  Code, Zap, TrendingUp, Layers, CheckCircle2,
  BarChart3, Globe, Server, Cloud, Shield, Target, Users,
  FileText, Megaphone, Share2, PenTool, BookOpen, Database,
  AppWindow, Rocket, Eye, Layout, Settings, Cpu, Star,
  MessageSquare, Mic, Headphones,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  badge: string;
  icon: LucideIcon;
  color: string;
  heroDesc: string;
  layoutVariant?: string;
  overviewP1: string;
  overviewP2: string;
  highlights: string[];
  features: ServiceFeature[];
  process: ProcessStep[];
  technologies: string[];
  faqs: FAQ[];
  metaTitle: string;
  metaDesc: string;
}

export const servicesData: ServiceData[] = [
  // 1 ── Custom Web Design
  {
    slug: 'custom-web-design',
    title: 'Custom Web Design',
    layoutVariant: 'portfolio',
    badge: 'Bespoke Websites',
    icon: Monitor,
    color: 'from-purple-500 to-indigo-600',
    heroDesc: 'We craft stunning, one-of-a-kind websites tailored precisely to your brand identity, business goals, and target audience. Every pixel is purposeful, every interaction is intentional.',
    overviewP1: 'Our custom web design service goes far beyond templates and drag-and-drop builders. We begin every project with deep-dive discovery sessions to understand your brand personality, competitive landscape, and growth objectives. Our designers then create bespoke wireframes, mood boards, and high-fidelity mockups that reflect your unique value proposition and resonate with your ideal customers.',
    overviewP2: 'From dynamic landing pages to complex multi-page corporate websites, we build responsive, performance-optimized designs that look incredible on every device. Our collaborative design process includes multiple revision rounds, real-time previews, and pixel-perfect implementation to ensure the final product exceeds your expectations and drives measurable results.',
    highlights: ['100% original, template-free designs', 'Unlimited revision rounds included', 'Mobile-first responsive approach', 'SEO-optimized architecture', 'Fast load times under 3 seconds', 'Cross-browser compatibility guaranteed'],
    features: [
      { icon: Palette, title: 'Bespoke Visual Identity', desc: 'Custom color palettes, typography systems, and graphic elements designed exclusively for your brand to create a cohesive and memorable digital presence.' },
      { icon: Layout, title: 'Custom Page Layouts', desc: 'Unique page structures and component arrangements crafted for optimal content hierarchy, readability, and user engagement across every screen size.' },
      { icon: Zap, title: 'Interactive Animations', desc: 'Scroll-triggered animations, micro-interactions, and dynamic visual elements using GSAP and CSS that add polish without sacrificing performance.' },
      { icon: Eye, title: 'Conversion-Focused Design', desc: 'Strategic placement of CTAs, trust signals, and persuasive design patterns based on behavioral psychology and conversion rate optimization best practices.' },
      { icon: Code, title: 'Clean Semantic Code', desc: 'Well-structured HTML5 and CSS3 code that ensures accessibility, maintainability, and seamless integration with your CMS or backend systems.' },
      { icon: Globe, title: 'Multilingual Support', desc: 'Built-in support for multiple languages and RTL layouts, enabling your website to serve global audiences with culturally appropriate design adaptations.' },
    ],
    process: [
      { num: '01', title: 'Discovery & Strategy', desc: 'We conduct in-depth interviews, competitive audits, and audience research to define the project scope, creative direction, and measurable success metrics.', icon: Search },
      { num: '02', title: 'Wireframing & Design', desc: 'Our team creates low-fidelity wireframes, then evolves them into polished high-fidelity mockups with full interactivity and responsive breakpoints.', icon: Palette },
      { num: '03', title: 'Development & QA', desc: 'Frontend developers bring designs to life with pixel-perfect code, followed by rigorous cross-browser testing and performance optimization.', icon: Code },
      { num: '04', title: 'Launch & Iteration', desc: 'After a smooth deployment, we monitor analytics, gather user feedback, and implement data-driven improvements for ongoing optimization.', icon: Rocket },
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Figma', 'Adobe Creative Suite', 'Vercel', 'Cloudflare', 'Google Analytics'],
    faqs: [
      { question: 'How long does a custom web design project typically take?', answer: 'Most custom web design projects are completed within 4-8 weeks, depending on complexity. A simple 5-10 page website may take 4 weeks, while a complex multi-section site with custom animations and integrations can take 8+ weeks. We provide a detailed timeline during the discovery phase.' },
      { question: 'Will my website be unique or based on a template?', answer: 'Every website we create is 100% custom and built from scratch. We never use templates or pre-made themes. Your design is crafted specifically for your brand, ensuring a one-of-a-kind online presence that sets you apart from competitors.' },
      { question: 'How many revision rounds are included?', answer: 'We include unlimited revision rounds during the design phase. We believe in iterating until you are completely satisfied. Our collaborative approach ensures we are aligned at every step, which typically reduces the number of revisions needed.' },
      { question: 'Do you provide hosting and domain setup?', answer: 'Yes, we offer comprehensive hosting solutions including domain registration, SSL certificate setup, email configuration, and ongoing server management. We recommend and set up the best hosting infrastructure for your specific needs and traffic requirements.' },
      { question: 'Will my website be optimized for search engines?', answer: 'Absolutely. SEO is baked into our design and development process from day one. We implement semantic HTML, optimized meta tags, structured data markup, fast loading speeds, mobile responsiveness, and clean URL structures to give your site the best possible search engine visibility.' },
    ],
    metaTitle: 'Custom Web Design Services | VareWeb',
    metaDesc: 'Bespoke, pixel-perfect web design tailored to your brand. 100% custom websites with unlimited revisions, mobile-first responsive design, and SEO-optimized architecture.',
  },

  // 2 ── Responsive Web Design
  {
    slug: 'responsive-web-design',
    title: 'Responsive Web Design',
    badge: 'Device-Adaptive',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    heroDesc: 'We create fluid, adaptive websites that deliver flawless experiences across every device and screen size — from smartphones to ultra-wide desktop monitors.',
    overviewP1: 'With over 60% of web traffic coming from mobile devices, responsive design is no longer optional — it is essential. Our mobile-first approach ensures your website performs brilliantly on the smallest screens first, then progressively enhances the experience for tablets, laptops, and large displays. We use fluid grids, flexible images, and CSS media queries to create layouts that adapt seamlessly to any viewport.',
    overviewP2: 'Our responsive design process includes extensive device testing across real iPhones, Android phones, iPads, and various desktop resolutions. We optimize touch targets for mobile interaction, ensure readable typography at every breakpoint, and implement performance-critical techniques like lazy loading and responsive images to deliver fast, engaging experiences regardless of the device being used.',
    highlights: ['Mobile-first design methodology', 'Tested on 50+ real devices', 'Touch-optimized interactions', 'Responsive images with WebP/AVIF', 'Sub-2-second mobile load times', 'Progressive web app capabilities'],
    features: [
      { icon: Smartphone, title: 'Mobile-First Approach', desc: 'Designs are conceived for small screens first, then scaled upward, ensuring every mobile user gets a premium experience without compromise or clutter.' },
      { icon: Monitor, title: 'Fluid Grid Systems', desc: 'Proportional grid layouts that flex and reflow based on viewport width, maintaining visual harmony and content hierarchy across all breakpoints.' },
      { icon: Zap, title: 'Performance Optimization', desc: 'Responsive images served in modern formats, critical CSS inlining, lazy loading, and code splitting to achieve blazing-fast load times on any connection speed.' },
      { icon: Eye, title: 'Adaptive Typography', desc: 'Fluid type scales using clamp() and modular scales that maintain readability from 320px mobile screens to 2560px ultra-wide displays.' },
      { icon: Layout, title: 'Flexible Navigation Patterns', desc: 'Context-aware navigation that transforms between hamburger menus, off-canvas drawers, and full horizontal navigation based on available screen space.' },
      { icon: Target, title: 'Touch-Friendly Interactions', desc: 'Optimized touch targets (minimum 44px), gesture support for swiping and scrolling, and elimination of hover-dependent elements on mobile devices.' },
    ],
    process: [
      { num: '01', title: 'Device Audit & Planning', desc: 'We analyze your current analytics to identify the most common devices and screen sizes used by your audience, then define an optimal breakpoint strategy.', icon: Search },
      { num: '02', title: 'Mobile-First Design', desc: 'Starting from the smallest viewport, we design and prototype the mobile experience before expanding to tablet and desktop layouts with progressive enhancement.', icon: Palette },
      { num: '03', title: 'Cross-Device Development', desc: 'Developers implement fluid layouts with CSS Grid, Flexbox, and container queries, then rigorously test on physical devices across all major platforms.', icon: Code },
      { num: '04', title: 'Performance & Launch', desc: 'We run Lighthouse audits, optimize Core Web Vitals, implement responsive image strategies, and deploy with confidence across all target environments.', icon: Rocket },
    ],
    technologies: ['CSS Grid', 'Flexbox', 'Container Queries', 'React', 'Next.js', 'TypeScript', 'Lighthouse', 'Chrome DevTools', 'BrowserStack', 'WebP / AVIF'],
    faqs: [
      { question: 'What is the difference between responsive and adaptive design?', answer: 'Responsive design uses fluid grids and CSS media queries to continuously adjust layout based on viewport width. Adaptive design uses predefined layouts for specific breakpoints. We use a hybrid approach — fluid responsive design with strategically placed breakpoints — to ensure the best experience on every device.' },
      { question: 'Will my existing website work well on mobile after redesign?', answer: 'Yes. We rebuild your website with a mobile-first philosophy, which means it will not just work on mobile — it will excel. Every element, from navigation to forms to media, is designed and tested specifically for touch-based interaction on small screens.' },
      { question: 'How do you test across so many different devices?', answer: 'We maintain a device lab with the most popular iPhones, Android phones, iPads, and desktop monitors. We also use cloud-based testing platforms like BrowserStack to cover hundreds of additional device and browser combinations, ensuring comprehensive coverage.' },
      { question: 'Does responsive design affect my SEO rankings?', answer: 'Yes, positively. Google uses mobile-first indexing, meaning it primarily uses the mobile version of your site for ranking and indexing. A well-built responsive design improves Core Web Vitals, reduces bounce rates, and increases engagement — all of which directly benefit your search rankings.' },
    ],
    metaTitle: 'Responsive Web Design Services | VareWeb',
    metaDesc: 'Mobile-first responsive web design that delivers flawless experiences on every device. Tested on 50+ real devices with sub-2-second load times.',
  },

  // 3 ── Website Redesign
  {
    slug: 'website-redesign',
    title: 'Website Redesign',
    badge: 'Modernization',
    icon: RefreshCw,
    color: 'from-emerald-500 to-teal-500',
    heroDesc: 'Transform your outdated website into a modern, high-converting digital asset. We preserve your SEO equity while dramatically improving design, performance, and user experience.',
    overviewP1: 'An outdated website damages credibility and loses customers. Our website redesign service modernizes your digital presence with contemporary design trends, improved user flows, and cutting-edge technology — while carefully preserving your existing SEO authority and brand recognition. We conduct thorough audits of your current site to identify pain points, technical debt, and missed conversion opportunities.',
    overviewP2: 'Our redesign methodology includes comprehensive content strategy, information architecture restructuring, and UX analysis to ensure the new site not only looks beautiful but performs significantly better. We implement proper 301 redirect mapping, migrate all valuable content, and set up analytics tracking from day one to measure the impact of every design decision on your key business metrics.',
    highlights: ['SEO equity preservation with 301 redirects', 'Conversion rate optimization included', 'Content strategy and migration', 'Analytics before-and-after comparison', 'Staged rollout option available', 'Brand consistency evolution'],
    features: [
      { icon: Search, title: 'Comprehensive Site Audit', desc: 'Deep analysis of your existing site covering technical SEO, content performance, user behavior flows, accessibility compliance, and competitive benchmarking.' },
      { icon: BarChart3, title: 'Conversion Rate Analysis', desc: 'Heatmap studies, funnel analysis, and user session recordings to identify exactly where visitors drop off and where design improvements will have the greatest impact.' },
      { icon: RefreshCw, title: 'Progressive Redesign Strategy', desc: 'We can redesign your site in stages — prioritizing high-impact pages first — so you see improvements incrementally without any downtime or disruption.' },
      { icon: FileText, title: 'Content Strategy & Migration', desc: 'Expert content auditing, restructuring, and migration that eliminates redundant pages, consolidates thin content, and strengthens your topical authority.' },
      { icon: Shield, title: 'SEO Preservation Protocol', desc: 'Meticulous URL mapping, 301 redirect implementation, canonical tag management, and structured data migration to protect and improve your search rankings.' },
      { icon: TrendingUp, title: 'Performance Benchmarking', desc: 'Before-and-after performance comparisons using Core Web Vitals, page speed scores, and engagement metrics to quantify the redesign impact on business outcomes.' },
    ],
    process: [
      { num: '01', title: 'Audit & Discovery', desc: 'We perform a comprehensive audit of your current website including SEO analysis, user behavior review, content inventory, and stakeholder interviews to define redesign goals.', icon: Search },
      { num: '02', title: 'Strategy & Redesign', desc: 'Based on audit findings, we develop an information architecture, create new design mockups, and plan a phased migration that minimizes risk to your existing traffic.', icon: Palette },
      { num: '03', title: 'Build & Migrate', desc: 'Development team builds the new site while our SEO specialists implement redirect maps, migrate content, and set up analytics tracking for a seamless transition.', icon: Code },
      { num: '04', title: 'Launch & Optimize', desc: 'After a controlled launch with thorough QA testing, we monitor performance closely for 30 days and make data-driven adjustments to maximize the redesign ROI.', icon: TrendingUp },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Google Analytics 4', 'Google Search Console', 'Screaming Frog', 'Hotjar', 'Figma', 'Contentful', 'Vercel'],
    faqs: [
      { question: 'Will I lose my search engine rankings during the redesign?', answer: 'No. We follow a rigorous SEO preservation protocol that includes comprehensive 301 redirect mapping, URL structure planning, meta data migration, and structured data transfer. Most clients see improved rankings within 2-4 weeks after launch due to better user experience and faster page speeds.' },
      { question: 'Can I keep my existing content management system?', answer: 'Yes, we can redesign your site on your existing CMS if preferred. However, we often recommend migrating to a more modern platform like Next.js with a headless CMS for better performance and flexibility. We will discuss all options during the discovery phase.' },
      { question: 'How do you handle the redesign without causing downtime?', answer: 'We build the new site in a staging environment while your current site remains live. When everything is ready, we perform a seamless switch with proper DNS propagation and redirect implementation. Most clients experience zero downtime.' },
      { question: 'What if I only want to redesign certain pages?', answer: 'We offer flexible staged redesign options. We can prioritize high-traffic or high-conversion pages first, then progressively redesign the rest of the site. This approach lets you see measurable improvements quickly while managing budget effectively.' },
    ],
    metaTitle: 'Website Redesign Services | VareWeb',
    metaDesc: 'Modernize your website with a professional redesign that preserves SEO equity, improves conversions, and delivers a stunning contemporary user experience.',
  },

  // 4 ── UX/UI Design
  {
    slug: 'ux-ui-design',
    title: 'UX/UI Design',
    layoutVariant: 'ux',
    badge: 'User-Centered',
    icon: Palette,
    color: 'from-orange-500 to-red-500',
    heroDesc: 'We design intuitive, research-driven interfaces that delight users, reduce friction, and transform complex workflows into seamless, engaging digital experiences.',
    overviewP1: 'Great UX/UI design is the intersection of user psychology, visual aesthetics, and business strategy. Our design team combines extensive user research, data analysis, and creative expertise to craft interfaces that users genuinely enjoy interacting with. We follow a human-centered design process that puts your users at the heart of every decision, from initial concept through final pixel-perfect deliverables.',
    overviewP2: 'Our UX/UI process includes persona development, journey mapping, wireframing, interactive prototyping, and usability testing. We validate design decisions with real users at multiple stages, ensuring the final product is not just beautiful but genuinely usable. Every design system we create includes comprehensive component libraries, design tokens, and documentation for seamless developer handoff and scalable future growth.',
    highlights: ['Research-backed design decisions', 'Interactive Figma prototypes', 'WCAG 2.1 AA accessibility compliance', 'Comprehensive design systems', 'Real user usability testing', 'Developer-ready handoff documentation'],
    features: [
      { icon: Users, title: 'User Research & Personas', desc: 'Qualitative interviews, surveys, and behavioral data analysis to create detailed user personas that guide every design decision with empathy and precision.' },
      { icon: FileText, title: 'Journey Mapping', desc: 'Visual maps of the complete user journey that identify pain points, opportunities, and emotional touchpoints to optimize the end-to-end experience.' },
      { icon: Layout, title: 'Wireframing & Prototyping', desc: 'Low-fidelity wireframes evolve into high-fidelity interactive prototypes in Figma, allowing stakeholders to experience and validate designs before development.' },
      { icon: Eye, title: 'Visual Design & Branding', desc: 'Polished visual design with custom iconography, illustration systems, motion design specifications, and brand-aligned color and typography systems.' },
      { icon: CheckCircle2, title: 'Usability Testing', desc: 'Moderated and unmoderated usability testing sessions with real target users to validate design assumptions and uncover issues before costly development.' },
      { icon: Layers, title: 'Design System Creation', desc: 'Scalable component libraries with design tokens, usage guidelines, and Figma components that ensure consistency across all current and future products.' },
    ],
    process: [
      { num: '01', title: 'Research & Empathize', desc: 'We conduct user interviews, analyze analytics, review competitors, and create detailed personas and journey maps that form the foundation of all design work.', icon: Users },
      { num: '02', title: 'Design & Prototype', desc: 'From information architecture and wireframes to high-fidelity mockups and interactive prototypes, we iterate rapidly with your feedback at every stage.', icon: Palette },
      { num: '03', title: 'Test & Refine', desc: 'Real users test the prototype in moderated sessions. We analyze findings, prioritize improvements, and refine the design until it meets all usability benchmarks.', icon: Target },
      { num: '04', title: 'Deliver & Support', desc: 'Final design handoff includes annotated specs, asset exports, a comprehensive design system, and ongoing design support during the development phase.', icon: Rocket },
    ],
    technologies: ['Figma', 'FigJam', 'Maze', 'Hotjar', 'Adobe XD', 'Principle', 'Zeplin', 'Storybook', 'React', 'Tailwind CSS'],
    faqs: [
      { question: 'What is the difference between UX and UI design?', answer: 'UX (User Experience) design focuses on the overall feel and functionality of a product — research, information architecture, user flows, and usability. UI (User Interface) design focuses on the visual elements — layouts, colors, typography, and interactive elements. Our service covers both disciplines holistically.' },
      { question: 'Do you conduct real user testing?', answer: 'Yes. We recruit real users from your target demographic for moderated usability testing sessions. We observe how they interact with the design, identify confusion points, and measure task completion rates. This real-world validation catches issues that assumptions and internal reviews would miss.' },
      { question: 'What deliverables will I receive?', answer: 'You will receive a comprehensive Figma file with all screens and states, an interactive prototype, a design system with reusable components, annotated developer handoff specs, user research reports, journey maps, and usability testing results. Everything needed for seamless implementation.' },
      { question: 'Can you work with our existing brand guidelines?', answer: 'Absolutely. We can extend your existing brand guidelines into a comprehensive digital design system. If your brand needs refreshing, we can evolve it thoughtfully to maintain recognition while modernizing the visual identity for digital contexts.' },
      { question: 'How do you ensure accessibility compliance?', answer: 'We design and test against WCAG 2.1 AA standards throughout the process. This includes proper color contrast ratios (4.5:1 minimum), keyboard navigation support, screen reader compatibility, focus management, and ARIA labeling. We also provide VPAT documentation when needed.' },
    ],
    metaTitle: 'UX/UI Design Services | VareWeb',
    metaDesc: 'Research-driven UX/UI design with user testing, interactive prototyping, and accessible design systems. Create interfaces that delight users and drive conversions.',
  },

  // 5 ── Search Engine Optimization
  {
    slug: 'search-engine-optimization',
    title: 'Search Engine Optimization',
    layoutVariant: 'seo',
    badge: 'Organic Growth',
    icon: Search,
    color: 'from-violet-500 to-purple-600',
    heroDesc: 'Dominate search results with data-driven SEO strategies. From technical optimization to content marketing, we drive qualified organic traffic that converts into customers.',
    overviewP1: 'Search engine optimization is the foundation of sustainable digital growth. Our SEO service combines deep technical expertise with strategic content marketing to improve your visibility where it matters most — Google search results. We conduct exhaustive technical audits, keyword research, and competitive analysis to build a comprehensive SEO roadmap tailored to your industry, audience, and business objectives.',
    overviewP2: 'Our approach is holistic and transparent. We address every ranking factor — from site speed and mobile usability to content quality and backlink authority. Monthly reporting with clear KPIs keeps you informed of progress, and our dedicated SEO specialists proactively adapt strategies to algorithm updates and emerging opportunities. We focus on driving qualified traffic that converts, not just vanity metrics.',
    highlights: ['White-hat, Google-compliant strategies', 'Monthly performance reporting', 'Local SEO and Google Business optimization', 'Technical SEO audit and remediation', 'Content strategy and link building', 'ROI-focused keyword targeting'],
    features: [
      { icon: Server, title: 'Technical SEO Audit', desc: 'Comprehensive crawl analysis identifying indexation issues, crawl errors, schema markup gaps, site speed bottlenecks, mobile usability problems, and internal linking opportunities.' },
      { icon: Target, title: 'Keyword Research & Strategy', desc: 'Deep keyword research using multiple data sources to identify high-intent, achievable keywords with strong commercial value and manageable competition levels.' },
      { icon: FileText, title: 'Content Optimization', desc: 'Strategic content creation and optimization including topic clusters, pillar pages, blog posts, and landing pages designed to capture topical authority and drive organic traffic.' },
      { icon: Globe, title: 'Local SEO Optimization', desc: 'Google Business Profile optimization, local citation building, review management, and location-based content strategy to dominate local search results and map packs.' },
      { icon: Share2, title: 'Link Building Campaigns', desc: 'Ethical, white-hat link acquisition through digital PR, guest posting, resource linking, and relationship building with authoritative websites in your industry.' },
      { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Detailed monthly reports tracking keyword rankings, organic traffic, conversion rates, Core Web Vitals, and competitor movements with actionable insights and recommendations.' },
    ],
    process: [
      { num: '01', title: 'Audit & Research', desc: 'We perform a comprehensive technical SEO audit, competitive analysis, and keyword research to establish baselines and identify the highest-impact opportunities.', icon: Search },
      { num: '02', title: 'Strategy & Implementation', desc: 'Based on findings, we create a prioritized action plan addressing technical fixes, content gaps, on-page optimization, and link building opportunities for maximum ROI.', icon: Target },
      { num: '03', title: 'Content & Authority Building', desc: 'We create optimized content, build quality backlinks, and enhance your domain authority through strategic digital PR and relationship-based outreach campaigns.', icon: FileText },
      { num: '04', title: 'Monitor & Refine', desc: 'Continuous monitoring of rankings, traffic, and conversions with monthly reporting. We adapt strategies based on algorithm changes and emerging opportunities.', icon: TrendingUp },
    ],
    technologies: ['Google Search Console', 'Google Analytics 4', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Schema.org', 'PageSpeed Insights', 'Surfer SEO', 'Moz', 'BrightLocal'],
    faqs: [
      { question: 'How long does it take to see SEO results?', answer: 'SEO is a long-term investment. Most clients begin seeing meaningful improvements in organic traffic within 3-6 months, with significant ranking improvements typically appearing around 6-12 months. The timeline depends on your industry competitiveness, current domain authority, and the aggressiveness of the campaign.' },
      { question: 'Do you guarantee first-page rankings?', answer: 'No reputable SEO agency can guarantee specific rankings because Google algorithms consider hundreds of factors. What we do guarantee is a data-driven, transparent approach that consistently improves visibility and organic traffic. We focus on sustainable, white-hat strategies that deliver lasting results.' },
      { question: 'What is included in monthly SEO reporting?', answer: 'Our monthly reports include keyword ranking changes, organic traffic trends, top-performing pages, conversion data, backlink acquisition summary, technical health score, competitor benchmarking, and a prioritized action plan for the upcoming month.' },
      { question: 'Will SEO work conflict with my paid advertising?', answer: 'Not at all — SEO and PPC complement each other perfectly. SEO builds long-term organic visibility while PPC provides immediate results. Our integrated approach ensures both channels work together, sharing keyword data and conversion insights for maximum ROI across your entire digital marketing strategy.' },
    ],
    metaTitle: 'SEO Services | VareWeb',
    metaDesc: 'Data-driven search engine optimization with technical audits, content strategy, link building, and monthly reporting. Drive qualified organic traffic that converts.',
  },

  // 6 ── eCommerce Design & Development
  {
    slug: 'ecommerce-development',
    title: 'eCommerce Design & Development',
    layoutVariant: 'ecommerce',
    badge: 'Sell Online',
    icon: ShoppingCart,
    color: 'from-pink-500 to-rose-500',
    heroDesc: 'Build powerful, conversion-optimized online stores that turn browsers into loyal customers. From custom storefronts to complex marketplaces, we deliver eCommerce excellence.',
    overviewP1: 'A successful eCommerce store requires more than a product catalog — it demands an immersive shopping experience that builds trust, reduces friction, and maximizes average order value. Our eCommerce service covers everything from custom storefront design and secure payment integration to inventory management and abandoned cart recovery. We build stores on robust, scalable platforms that grow with your business.',
    overviewP2: 'Whether you need a simple single-brand store or a complex multi-vendor marketplace, our team has the expertise to deliver. We specialize in optimizing the entire purchase funnel — from product discovery and detailed product pages to streamlined checkout and post-purchase engagement. Every design decision is backed by eCommerce best practices and conversion rate optimization data to ensure maximum revenue generation.',
    highlights: ['Custom storefront design and branding', 'Secure payment gateway integration', 'Inventory and order management', 'Abandoned cart recovery automation', 'Multi-currency and multi-language', 'Advanced product search and filtering'],
    features: [
      { icon: Layout, title: 'Custom Storefront Design', desc: 'Visually stunning, brand-aligned storefront designs with product-focused layouts, compelling imagery, and conversion-optimized product pages that drive sales.' },
      { icon: Shield, title: 'Secure Payment Processing', desc: 'PCI-DSS compliant payment integration supporting Stripe, PayPal, Apple Pay, Google Pay, and custom payment gateways with fraud detection and secure checkout flows.' },
      { icon: BarChart3, title: 'Inventory Management', desc: 'Real-time inventory tracking, low-stock alerts, bulk import/export, variant management, and automated stock level synchronization across all sales channels.' },
      { icon: Zap, title: 'Speed Optimization', desc: 'Aggressive performance optimization including image optimization, lazy loading, CDN integration, and database query optimization to achieve sub-2-second page loads.' },
      { icon: Users, title: 'Customer Account System', desc: 'Comprehensive customer profiles with order history, wish lists, saved addresses, loyalty program integration, and personalized product recommendations.' },
      { icon: Megaphone, title: 'Marketing & Promotions', desc: 'Built-in coupon systems, flash sales, bundle pricing, volume discounts, and abandoned cart email automation to maximize revenue from every visitor.' },
    ],
    process: [
      { num: '01', title: 'Store Strategy', desc: 'We analyze your products, target audience, and competitive landscape to define the optimal store architecture, categorization, and customer acquisition strategy.', icon: Search },
      { num: '02', title: 'Design & Build', desc: 'Custom storefront design with conversion-optimized product pages, search and filtering systems, cart and checkout flows, and responsive layouts for all devices.', icon: Code },
      { num: '03', title: 'Integration & Testing', desc: 'Payment gateway setup, shipping provider integration, inventory system connection, tax calculation, and comprehensive end-to-end testing of the entire purchase flow.', icon: Settings },
      { num: '04', title: 'Launch & Grow', desc: 'Store deployment with analytics tracking, conversion monitoring, and ongoing optimization based on real customer behavior and sales data analysis.', icon: TrendingUp },
    ],
    technologies: ['Shopify', 'WooCommerce', 'Next.js Commerce', 'Stripe', 'PayPal', 'Headless CMS', 'Algolia', 'Redis', 'AWS', 'Google Analytics 4'],
    faqs: [
      { question: 'Which eCommerce platform do you recommend?', answer: 'The best platform depends on your business size, product catalog complexity, and growth plans. For most businesses, we recommend Shopify for ease of use or Next.js Commerce for maximum customization. We will recommend the optimal platform during our discovery phase based on your specific requirements.' },
      { question: 'Can you integrate with my existing inventory system?', answer: 'Yes. We regularly integrate with ERP systems, warehouse management software, POS systems, and dropshipping platforms. We use APIs and middleware solutions to ensure real-time inventory synchronization across all your sales channels.' },
      { question: 'How do you handle abandoned cart recovery?', answer: 'We implement automated abandoned cart email sequences triggered at strategic intervals (1 hour, 24 hours, 72 hours), exit-intent popups with discount offers, and retargeting pixel integration for social media advertising. Our clients typically recover 10-15% of abandoned carts.' },
      { question: 'Will my store be fast enough to handle high traffic?', answer: 'Absolutely. We build stores with scalability in mind, using CDN integration, database optimization, caching strategies, and cloud infrastructure that can handle traffic spikes during sales events, product launches, and holiday seasons without performance degradation.' },
    ],
    metaTitle: 'eCommerce Development Services | VareWeb',
    metaDesc: 'Custom eCommerce design and development with secure payments, inventory management, and conversion optimization. Build online stores that drive sales.',
  },

  // 7 ── Custom Software Development
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    badge: 'Tailored Solutions',
    icon: Code,
    color: 'from-indigo-500 to-blue-600',
    heroDesc: 'From web applications to enterprise platforms, we build custom software solutions engineered to solve your unique business challenges and scale with your growth.',
    overviewP1: 'Off-the-shelf software often forces you to adapt your processes to fit the tool. Our custom software development service takes the opposite approach — we build the tool to fit your processes. Whether you need a customer portal, workflow automation system, data analytics platform, or a completely new SaaS product, our full-stack development team delivers robust, scalable solutions tailored precisely to your requirements.',
    overviewP2: 'We follow agile development methodologies with two-week sprints, continuous integration, and regular stakeholder demos. Our development process includes thorough requirements gathering, system architecture design, iterative development with QA testing at every stage, and comprehensive documentation. We use modern technology stacks and cloud-native architectures to ensure your software is performant, maintainable, and ready for future growth.',
    highlights: ['Full-stack development expertise', 'Agile methodology with 2-week sprints', 'Cloud-native architecture', 'Comprehensive API development', 'Automated testing and CI/CD', 'Detailed technical documentation'],
    features: [
      { icon: Layers, title: 'Full-Stack Development', desc: 'End-to-end development covering frontend interfaces, backend APIs, database design, and infrastructure — all built with modern, battle-tested technology stacks.' },
      { icon: Database, title: 'Database Architecture', desc: 'Expert database design and optimization for relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases with proper indexing, caching, and data migration strategies.' },
      { icon: Shield, title: 'Security-First Approach', desc: 'OWASP top-10 security practices, encrypted data transmission, role-based access control, audit logging, and regular security assessments to protect your data and users.' },
      { icon: Cloud, title: 'Cloud-Native Deployment', desc: 'Containerized applications with Docker, orchestrated with Kubernetes, deployed on AWS, GCP, or Azure with auto-scaling, load balancing, and high availability.' },
      { icon: Settings, title: 'API Design & Integration', desc: 'RESTful and GraphQL API design with comprehensive documentation (OpenAPI/Swagger), versioning strategies, rate limiting, and third-party service integration.' },
      { icon: Cpu, title: 'Automated Testing & CI/CD', desc: 'Unit tests, integration tests, and end-to-end tests with >80% code coverage, plus automated CI/CD pipelines for reliable, rapid deployments with zero downtime.' },
    ],
    process: [
      { num: '01', title: 'Requirements & Architecture', desc: 'Detailed requirements gathering, stakeholder interviews, system architecture design, technology stack selection, and project roadmap creation with clear milestones.', icon: Search },
      { num: '02', title: 'Agile Development', desc: 'Two-week sprint cycles with daily standups, iterative development, continuous integration, and regular demo sessions with your team for feedback and course correction.', icon: Code },
      { num: '03', title: 'Testing & QA', desc: 'Comprehensive automated testing, performance benchmarking, security audits, and user acceptance testing to ensure the software meets all requirements and quality standards.', icon: Shield },
      { num: '04', title: 'Deployment & Maintenance', desc: 'Production deployment with zero-downtime strategies, monitoring and alerting setup, documentation delivery, and ongoing maintenance and support packages.', icon: Server },
    ],
    technologies: ['Node.js', 'Python', 'React', 'Next.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'GraphQL'],
    faqs: [
      { question: 'How do you handle project scope changes?', answer: 'We use agile methodology specifically because it embraces change. New requirements are added to the product backlog, prioritized by business value, and scheduled into upcoming sprints. We provide transparent effort estimates for any scope changes so you can make informed decisions.' },
      { question: 'What kind of support do you provide after launch?', answer: 'We offer flexible post-launch support packages including bug fixes, security patches, performance monitoring, feature enhancements, and 24/7 emergency support. We can also train your in-house team to take over maintenance if preferred.' },
      { question: 'Can you work with our existing tech stack?', answer: 'Yes. While we have preferred technologies, our developers are proficient across a wide range of platforms and languages. We can integrate with your existing systems, APIs, and infrastructure. We recommend the best stack for your specific project during the architecture phase.' },
      { question: 'How do you ensure software quality?', answer: 'Quality is ensured through multiple layers: automated unit and integration testing with >80% code coverage, code reviews by senior developers, continuous integration pipelines, performance testing, security audits, and user acceptance testing. Every release goes through a rigorous QA checklist.' },
    ],
    metaTitle: 'Custom Software Development | VareWeb',
    metaDesc: 'Full-stack custom software development with agile methodology, cloud-native architecture, and automated testing. Build tailored solutions for your business.',
  },

  // 8 ── GHL Development
  {
    slug: 'ghl-development',
    title: 'GHL (GoHighLevel) Development & Automation',
    layoutVariant: 'ghl',
    badge: 'Business Automation',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    heroDesc: 'Unlock the full power of GoHighLevel with custom automation, pipeline configurations, and workflow integrations that streamline your operations and accelerate growth.',
    overviewP1: 'GoHighLevel is a powerful all-in-one marketing and CRM platform, but most businesses only scratch the surface of its capabilities. Our GHL development service helps you harness its full potential through custom workflow automations, pipeline configurations, funnel builds, and third-party integrations. We transform GHL from a basic tool into a revenue-generating machine that runs your business on autopilot.',
    overviewP2: 'Our GHL specialists have deep experience building complex automation sequences, custom funnel systems, membership sites, and advanced reporting dashboards within the GoHighLevel ecosystem. Whether you are an agency managing multiple client accounts or a business optimizing your own sales and marketing operations, we design and implement GHL solutions that save hours of manual work, improve lead quality, and dramatically increase conversion rates.',
    highlights: ['Custom workflow automation', 'Pipeline and funnel optimization', 'Third-party API integrations', 'SMS and email sequence design', 'Membership site setup', 'Agency dashboard customization'],
    features: [
      { icon: Zap, title: 'Workflow Automation', desc: 'Complex multi-step automation sequences that trigger based on user behavior, lead scores, calendar actions, and custom field values to nurture leads automatically.' },
      { icon: Layers, title: 'Funnel & Pipeline Design', desc: 'High-converting funnel architectures with strategically designed landing pages, order forms, upsell flows, and CRM pipeline stages optimized for your sales process.' },
      { icon: Globe, title: 'Third-Party Integrations', desc: 'Custom API integrations connecting GHL with your existing tools — payment processors, accounting software, e-commerce platforms, calendar systems, and more.' },
      { icon: Megaphone, title: 'SMS & Email Marketing', desc: 'Automated multi-channel communication sequences with personalized messaging, A/B testing, engagement scoring, and deliverability optimization for maximum response rates.' },
      { icon: BarChart3, title: 'Custom Reporting Dashboards', desc: 'Advanced analytics dashboards combining GHL data with external data sources to provide comprehensive business intelligence and real-time performance monitoring.' },
      { icon: Users, title: 'Agency & Team Setup', desc: 'Multi-account agency configurations with role-based permissions, client onboarding automations, snapshot templates, and white-label branding solutions.' },
    ],
    process: [
      { num: '01', title: 'Business Process Mapping', desc: 'We analyze your current sales, marketing, and operational workflows to identify automation opportunities and define the optimal GHL configuration for your business.', icon: Search },
      { num: '02', title: 'Automation & Build', desc: 'Our GHL specialists build custom workflows, funnels, pipelines, and integrations based on the mapped processes, with thorough testing at each stage.', icon: Code },
      { num: '03', title: 'Testing & Training', desc: 'We conduct end-to-end testing of all automations and provide comprehensive training for your team, including documentation and video walkthroughs of every workflow.', icon: Users },
      { num: '04', title: 'Optimize & Scale', desc: 'Post-launch monitoring and optimization based on real performance data, with ongoing refinement of automations, A/B testing of messaging, and scaling support.', icon: TrendingUp },
    ],
    technologies: ['GoHighLevel', 'Zapier', 'Make (Integromat)', 'Webhooks', 'REST APIs', 'Twilio', 'Stripe', 'Calendly', 'Google Sheets', 'Power BI'],
    faqs: [
      { question: 'Can you help me migrate from another CRM to GoHighLevel?', answer: 'Yes. We handle complete CRM migrations including data export/import, contact and deal mapping, email template transfer, automation recreation, and team training. We ensure zero data loss and minimal disruption to your ongoing operations during the transition.' },
      { question: 'Do you work with both GHL agencies and individual businesses?', answer: 'We serve both. For agencies, we build custom snapshots, automate client onboarding, and create scalable systems. For individual businesses, we optimize GHL for their specific sales and marketing processes. Our expertise covers the full spectrum of GHL use cases.' },
      { question: 'What kind of automations can you build in GHL?', answer: 'We build virtually any automation GHL supports — lead nurturing sequences, appointment scheduling workflows, review request systems, referral programs, course enrollment triggers, payment processing sequences, and complex multi-condition branching logic based on any contact field or behavior.' },
      { question: 'Can you integrate GHL with tools not in its native marketplace?', answer: 'Yes. We use webhooks, REST APIs, and middleware platforms like Zapier and Make to connect GHL with virtually any external tool. We have built custom integrations with accounting software, ERPs, proprietary databases, and industry-specific platforms.' },
    ],
    metaTitle: 'GoHighLevel Development & Automation | VareWeb',
    metaDesc: 'Custom GoHighLevel automation, funnel builds, and integrations that streamline operations and accelerate growth. Unlock the full power of GHL.',
  },

  // NEW ── AI Chat & Voice Bots
  {
    slug: 'ai-chat-bot',
    title: 'AI Chat & Voice Bots',
    layoutVariant: 'ai',
    badge: 'Conversational AI',
    icon: MessageSquare,
    color: 'from-indigo-500 to-violet-600',
    heroDesc: 'Build intelligent chat and voice assistants that automate support, increase engagement, and provide 24/7 conversational experiences across web and phone channels.',
    overviewP1: 'We design and implement AI-driven conversational agents — both text-based chat bots and voice assistants — tailored to your business needs. These solutions use modern NLP, speech-to-text, and TTS systems to provide natural, context-aware conversations that feel live.',
    overviewP2: 'From rapid prototypes to production-ready integrations with CRMs, ticketing systems, and telephony providers, our team ensures your conversational AI is secure, scalable, and measurable.',
    highlights: ['Live-like demo simulations', 'Speech-to-text & TTS', 'CRM & API integrations', 'Custom intents & entities', 'Conversation analytics', 'Multi-channel deployment'],
    features: [
      { icon: MessageSquare, title: 'Smart Chat Bots', desc: 'Context-aware chat experiences with fallback intents, sentiment-awareness, and handoff to human agents when necessary.' },
      { icon: Mic, title: 'Voice Assistants', desc: 'Phone and voice-enabled assistants with natural TTS, call flows, and IVR integrations for 24/7 voice support.' },
      { icon: Headphones, title: 'Omnichannel Support', desc: 'Deploy across webchat, in-app, SMS, and telephony channels with consistent conversational state and analytics.' },
      { icon: Zap, title: 'Automation & Workflows', desc: 'Trigger automations, update CRM records, and run downstream workflows based on conversational events and user intent.' },
      { icon: BarChart3, title: 'Analytics', desc: 'Conversation transcripts, intent performance, and friction points visualized to continuously improve accuracy and user experience.' },
      { icon: Cloud, title: 'Secure & Scalable', desc: 'Enterprise-grade data handling, role-based access, encryption, and cloud scaling for production workloads.' },
    ],
    process: [
      { num: '01', title: 'Discovery & Persona Mapping', desc: 'Define user intents, success metrics, and conversation flows aligned to business goals.', icon: Search },
      { num: '02', title: 'Prototype & Test', desc: 'Rapid conversational prototypes with simulated users and real-time iteration to validate flows and tone.', icon: Palette },
      { num: '03', title: 'Integrate & Secure', desc: 'Connect to CRMs, analytics, and telephony providers; implement data governance and security controls.', icon: Code },
      { num: '04', title: 'Launch & Iterate', desc: 'Continuous monitoring, retraining, and A/B experiments to improve conversation accuracy and conversion outcomes.', icon: Rocket },
    ],
    technologies: ['OpenAI', 'Twilio', 'Deepgram', 'Dialogflow / Rasa', 'Node.js', 'WebSockets', 'Postgres', 'Redis', 'Vercel'],
    faqs: [
      { question: 'Can the bot handle complex, multi-turn conversations?', answer: 'Yes — we design contextual state management and slot-filling patterns to handle multi-turn flows reliably. Complex logic can be model-assisted and backed by deterministic rules where needed.' },
      { question: 'Do you provide voice telephony integration?', answer: 'Yes — we integrate with Twilio, Plivo, and other telephony providers for inbound/outbound calls and SIP connections, with full analytics and recording options.' },
    ],
    metaTitle: 'AI Chat & Voice Bots | VareWeb',
    metaDesc: 'Design, build, and deploy conversational AI chat bots and voice assistants — prototypes to production with omnichannel support and analytics.',
  },

  // 9 ── Mobile App Development
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    badge: 'Native & Cross-Platform',
    icon: AppWindow,
    color: 'from-cyan-500 to-blue-500',
    heroDesc: 'From concept to App Store launch, we build high-performance mobile applications that users love — using native and cross-platform technologies for iOS and Android.',
    overviewP1: 'Mobile apps are the most direct channel to your customers. Our mobile development team builds polished, performant applications for iOS and Android that deliver native-quality experiences whether you choose native development or a cross-platform approach. We handle the entire lifecycle from initial concept and UI design through development, testing, App Store submission, and post-launch support.',
    overviewP2: 'We specialize in building apps that combine beautiful interfaces with robust backend systems. Our apps feature smooth animations, offline capabilities, push notifications, in-app purchases, and real-time data synchronization. We follow Apple Human Interface Guidelines and Material Design principles while adding your unique brand personality to create apps that users genuinely enjoy using every day.',
    highlights: ['iOS and Android development', 'React Native cross-platform option', 'App Store submission management', 'Push notifications and real-time features', 'In-app purchase integration', 'Offline-first architecture'],
    features: [
      { icon: Smartphone, title: 'Native-Grade Performance', desc: 'Smooth 60fps animations, efficient memory management, and optimized rendering that delivers native-app performance whether built with native or cross-platform technologies.' },
      { icon: Palette, title: 'Intuitive UI Design', desc: 'Mobile-first interface design following Apple HIG and Material Design guidelines with custom theming, gesture-based navigation, and delightful micro-interactions.' },
      { icon: Shield, title: 'Secure Authentication', desc: 'Biometric authentication (Face ID, Touch ID), OAuth integration, encrypted data storage, and secure API communication to protect user data and privacy.' },
      { icon: Zap, title: 'Real-Time Features', desc: 'WebSocket-powered real-time messaging, live data synchronization, push notifications, and instant content updates that keep users engaged and informed.' },
      { icon: Database, title: 'Offline-First Architecture', desc: 'Apps that work seamlessly without internet connection using local data caching, background sync, and conflict resolution strategies for uninterrupted user experiences.' },
      { icon: BarChart3, title: 'Analytics & Crash Reporting', desc: 'Comprehensive in-app analytics tracking user behavior, feature usage, and conversion funnels, plus real-time crash reporting and performance monitoring dashboards.' },
    ],
    process: [
      { num: '01', title: 'Concept & Strategy', desc: 'We define the app concept, target platforms, monetization model, and feature roadmap through stakeholder workshops, competitive analysis, and user research.', icon: Search },
      { num: '02', title: 'Design & Prototype', desc: 'Mobile UI/UX design with interactive prototypes, user flow diagrams, and visual design mockups validated through user testing before any development begins.', icon: Palette },
      { num: '03', title: 'Development & Testing', desc: 'Agile development with bi-weekly builds, automated testing on real devices, performance optimization, and continuous integration for reliable, rapid iteration.', icon: Code },
      { num: '04', title: 'Launch & Support', desc: 'App Store submission with optimized descriptions and screenshots, launch marketing support, crash monitoring, and ongoing feature updates based on user feedback.', icon: Rocket },
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'Node.js', 'PostgreSQL', 'Expo', 'AWS Amplify', 'OneSignal'],
    faqs: [
      { question: 'Should I build a native or cross-platform app?', answer: 'It depends on your requirements. Native development (Swift/Kotlin) offers the best performance and deepest platform integration for complex apps. Cross-platform (React Native/Flutter) provides faster development and lower costs with near-native performance for most use cases. We will recommend the best approach during our discovery phase.' },
      { question: 'How long does it take to develop a mobile app?', answer: 'A simple app with core features typically takes 8-12 weeks. A feature-rich app with backend integrations, real-time features, and complex UI may take 16-24 weeks. We provide a detailed timeline and milestone schedule during the planning phase based on your specific feature requirements.' },
      { question: 'Do you handle App Store approval?', answer: 'Yes. We manage the entire App Store submission process for both Apple App Store and Google Play Store. This includes preparing app listings with optimized descriptions, screenshots, privacy policies, and handling any review feedback or rejections until your app is approved and live.' },
      { question: 'Can my app work offline?', answer: 'Yes. We implement offline-first architecture using local databases and intelligent caching strategies. Your app will function normally without internet, automatically syncing data when connectivity is restored. This is especially valuable for apps used in areas with unreliable network coverage.' },
    ],
    metaTitle: 'Mobile App Development Services | VareWeb',
    metaDesc: 'Native and cross-platform mobile app development for iOS and Android. From concept to App Store launch with stunning UI and robust backend systems.',
  },

  // 10 ── Digital Marketing & PPC
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing & PPC',
    badge: 'Revenue Growth',
    icon: Megaphone,
    color: 'from-rose-500 to-pink-600',
    heroDesc: 'Drive qualified traffic and maximize ROI with data-driven digital marketing strategies spanning paid search, social advertising, email marketing, and comprehensive analytics.',
    overviewP1: 'Digital marketing is most effective when every channel works together toward a unified goal. Our full-service digital marketing team creates integrated campaigns across Google Ads, Meta Ads, LinkedIn, and other platforms — all guided by deep data analysis and continuous optimization. We do not just manage ad campaigns; we build complete marketing ecosystems that attract, engage, and convert your ideal customers at every touchpoint.',
    overviewP2: 'Our approach is fundamentally ROI-focused. Every dollar you invest is tracked, measured, and optimized for maximum return. We implement advanced tracking and attribution models, conduct A/B tests on every element of your campaigns, and provide transparent weekly reporting so you always know exactly how your marketing budget is performing. From strategy development to creative production to ongoing optimization, we handle every aspect of your digital marketing.',
    highlights: ['Multi-platform ad management', 'Advanced conversion tracking', 'A/B testing on all campaigns', 'Weekly performance reporting', 'Landing page optimization', 'Retargeting and remarketing'],
    features: [
      { icon: Target, title: 'Paid Search (PPC)', desc: 'Strategic Google Ads and Bing Ads campaign management with advanced bidding strategies, negative keyword optimization, ad copy testing, and Quality Score improvement.' },
      { icon: Share2, title: 'Social Media Advertising', desc: 'Targeted campaigns across Meta (Facebook/Instagram), LinkedIn, Twitter/X, and TikTok with precise audience segmentation, creative testing, and ROAS optimization.' },
      { icon: Megaphone, title: 'Retargeting Campaigns', desc: 'Multi-channel retargeting strategies using pixel data, email lists, and CRM segments to re-engage visitors and guide prospects back through the conversion funnel.' },
      { icon: FileText, title: 'Email Marketing Automation', desc: 'Sophisticated email sequences including welcome series, nurture campaigns, cart abandonment flows, and re-engagement campaigns with segmentation and personalization.' },
      { icon: BarChart3, title: 'Analytics & Attribution', desc: 'Multi-touch attribution modeling, custom dashboard creation, conversion funnel analysis, and cross-channel reporting that reveals the true ROI of every marketing dollar.' },
      { icon: Layout, title: 'Landing Page Optimization', desc: 'Dedicated landing pages designed for each campaign with A/B tested headlines, CTAs, and layouts that maximize conversion rates and improve Quality Scores across ad platforms.' },
    ],
    process: [
      { num: '01', title: 'Strategy & Research', desc: 'We conduct market research, competitor analysis, audience profiling, and budget planning to create a comprehensive multi-channel marketing strategy aligned with your revenue goals.', icon: Search },
      { num: '02', title: 'Campaign Build & Launch', desc: 'Campaign creation with compelling ad copy, eye-catching creative, precise audience targeting, conversion tracking setup, and landing page deployment across all selected platforms.', icon: Megaphone },
      { num: '03', title: 'Optimize & Scale', desc: 'Continuous A/B testing of ads, audiences, and landing pages with daily bid management, Quality Score improvement, and budget reallocation toward top-performing campaigns.', icon: TrendingUp },
      { num: '04', title: 'Report & Iterate', desc: 'Detailed weekly and monthly performance reports with actionable insights, strategic recommendations, and collaborative planning sessions to refine and expand your marketing approach.', icon: BarChart3 },
    ],
    technologies: ['Google Ads', 'Meta Business Suite', 'LinkedIn Ads', 'Google Analytics 4', 'Google Tag Manager', 'HubSpot', 'Mailchimp', 'Unbounce', 'Hotjar', 'Optimizely'],
    faqs: [
      { question: 'What is your minimum ad budget requirement?', answer: 'We recommend a minimum monthly ad spend of $3,000-$5,000 depending on your industry and goals. This allows sufficient budget for meaningful testing and optimization. Our management fee is separate and based on the scope of services and platforms managed.' },
      { question: 'How quickly will I see results from paid advertising?', answer: 'Paid advertising can generate results within the first week of launch. However, optimal performance typically develops over 4-8 weeks as the algorithms gather data and we optimize based on performance signals. We set realistic expectations and focus on steady improvement of your key metrics.' },
      { question: 'Do you create the ad creative and copy?', answer: 'Yes. Our creative team produces all ad creative including images, videos, carousel designs, and ad copy. We also build dedicated landing pages optimized for each campaign. All creative is A/B tested to identify the highest-performing variations.' },
      { question: 'How do you track conversions and measure ROI?', answer: 'We implement comprehensive tracking using Google Tag Manager, conversion pixels, and server-side tracking to capture every conversion event. We use multi-touch attribution models to understand the full customer journey and calculate true ROI across all channels and touchpoints.' },
    ],
    metaTitle: 'Digital Marketing & PPC Services | VareWeb',
    metaDesc: 'Data-driven digital marketing with paid search, social advertising, email automation, and conversion optimization. Maximize ROI across every channel.',
  },

  // 11 ── Social Media Management
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    layoutVariant: 'social',
    badge: 'Brand Building',
    icon: Share2,
    color: 'from-fuchsia-500 to-purple-500',
    heroDesc: 'Build a powerful social media presence that engages your audience, strengthens your brand, and drives real business results across all major platforms.',
    overviewP1: 'Social media is where your audience lives, and effective management requires more than occasional posts. Our social media management service provides end-to-end handling of your brand presence across Instagram, Facebook, LinkedIn, Twitter/X, TikTok, and YouTube. We develop platform-specific content strategies, create engaging visual and written content, manage community interactions, and continuously optimize based on performance analytics.',
    overviewP2: 'Our approach combines creative storytelling with data-driven strategy. We conduct thorough audience research to understand exactly who you are trying to reach and what content resonates with them. Our content calendar is built around strategic themes, trending topics, and optimal posting times for each platform. We handle everything from photography and video production to graphic design and copywriting, ensuring your social feeds look professional and feel authentic.',
    highlights: ['Multi-platform content creation', 'Strategic content calendar', 'Community management and engagement', 'Social media analytics reporting', 'Influencer outreach coordination', 'Crisis management and response'],
    features: [
      { icon: PenTool, title: 'Content Creation', desc: 'Professional photography, graphic design, short-form video production, and compelling copywriting tailored to each platform and designed to stop the scroll and spark engagement.' },
      { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Detailed monthly analytics reports covering reach, engagement, follower growth, content performance, and competitive benchmarking with strategic recommendations.' },
      { icon: Users, title: 'Community Management', desc: 'Active monitoring and response to comments, messages, and mentions across all platforms. We humanize your brand with authentic, on-tone interactions that build loyalty.' },
      { icon: Target, title: 'Audience Growth Strategy', desc: 'Organic growth strategies including hashtag optimization, engagement pods, strategic collaborations, and content formats designed to attract and retain your ideal followers.' },
      { icon: TrendingUp, title: 'Paid Social Campaigns', desc: 'Boosted posts and paid social campaigns with precise audience targeting, A/B creative testing, and budget optimization to amplify your best-performing organic content.' },
      { icon: Star, title: 'Influencer Partnerships', desc: 'Identification, outreach, and management of influencer collaborations including micro-influencer campaigns, sponsored content, and affiliate partnerships that extend your reach.' },
    ],
    process: [
      { num: '01', title: 'Audit & Strategy', desc: 'We audit your current social presence, research your audience and competitors, and develop a comprehensive content strategy with platform-specific tactics and growth goals.', icon: Search },
      { num: '02', title: 'Content Production', desc: 'Our creative team produces a monthly content calendar with original visuals, videos, stories, and copy — all aligned with your brand voice and optimized for each platform.', icon: PenTool },
      { num: '03', title: 'Publish & Engage', desc: 'Scheduled publishing at optimal times, active community management, real-time response to comments and messages, and proactive engagement with target accounts.', icon: Share2 },
      { num: '04', title: 'Analyze & Evolve', desc: 'Monthly performance analysis with actionable insights, content strategy refinement based on what resonates, and collaborative planning for upcoming campaigns and initiatives.', icon: BarChart3 },
    ],
    technologies: ['Hootsuite', 'Buffer', 'Canva Pro', 'Adobe Creative Suite', 'Later', 'Sprout Social', 'Meta Business Suite', 'TikTok Business', 'Google Analytics 4', 'Brandwatch'],
    faqs: [
      { question: 'Which social media platforms should my business be on?', answer: 'The ideal platforms depend on your industry, target audience, and content type. B2B companies typically thrive on LinkedIn and Twitter. Visual brands excel on Instagram and Pinterest. Younger audiences prefer TikTok. We analyze your specific situation and recommend the platforms that will deliver the best ROI for your investment.' },
      { question: 'How many posts per week do you recommend?', answer: 'It varies by platform and audience expectations. Generally, we recommend 3-5 posts per week on Instagram, 5-7 on Twitter/X, 3-5 on LinkedIn, and 3-5 on Facebook. We also include daily Stories and Reels as part of our strategy. Quality always takes priority over quantity.' },
      { question: 'Do you handle negative comments and crisis situations?', answer: 'Yes. We have established protocols for handling negative comments, complaints, and potential crisis situations. We respond promptly, professionally, and in alignment with your brand voice. For serious issues, we immediately escalate to your designated contact with recommended response strategies.' },
      { question: 'Can I approve content before it is published?', answer: 'Absolutely. All content goes through our internal creative review and is submitted to you for approval before publishing. We use collaborative content calendars where you can review, request changes, and approve every post before it goes live.' },
    ],
    metaTitle: 'Social Media Management Services | VareWeb',
    metaDesc: 'Professional social media management with content creation, community engagement, analytics reporting, and growth strategy across all major platforms.',
  },

  // 12 ── Brand Identity & Logo Design
  {
    slug: 'brand-identity-design',
    title: 'Brand Identity & Logo Design',
    badge: 'Brand Creation',
    icon: Star,
    color: 'from-yellow-500 to-amber-500',
    heroDesc: 'Craft a memorable brand identity that resonates with your audience and sets you apart. From logo design to comprehensive brand guidelines, we build brands that last.',
    overviewP1: 'Your brand is more than a logo — it is the complete experience people have with your business. Our brand identity service creates a cohesive visual and verbal identity system that communicates your values, personality, and promise at every touchpoint. We start with strategic brand positioning workshops to define your brand archetype, voice, and market differentiation before any design work begins.',
    overviewP2: 'The deliverables include a custom logo with multiple variations, a comprehensive color palette, typography system, iconography, pattern library, and detailed brand guidelines documentation. We also create brand collateral such as business card designs, letterhead, social media templates, and presentation decks. Every element is designed to work harmoniously across both digital and print applications, ensuring your brand looks professional and consistent everywhere it appears.',
    highlights: ['Strategic brand positioning', 'Multiple logo concepts and revisions', 'Complete brand guidelines document', 'Digital and print collateral', 'Social media brand templates', 'Brand voice and messaging framework'],
    features: [
      { icon: Palette, title: 'Logo Design System', desc: 'Multiple logo concepts refined into a final design with primary, secondary, and icon-only variations, plus clear spacing guidelines and usage rules for every application.' },
      { icon: Eye, title: 'Color & Typography', desc: 'A carefully curated color palette with primary, secondary, and accent colors including hex, RGB, CMYK, and Pantone values paired with a typography system for headings and body text.' },
      { icon: Layers, title: 'Brand Guidelines', desc: 'A comprehensive 40-60 page brand book documenting logo usage, color specifications, typography rules, imagery style, tone of voice, and application examples.' },
      { icon: Globe, title: 'Collateral Design', desc: 'Business cards, letterheads, envelopes, email signatures, social media templates, presentation templates, and other branded materials ready for immediate use.' },
      { icon: FileText, title: 'Brand Messaging', desc: 'A clear messaging framework including brand tagline, value propositions, elevator pitch, brand voice guidelines, and key messaging pillars for consistent communication.' },
      { icon: Users, title: 'Brand Strategy Workshop', desc: 'An interactive workshop session covering brand positioning, target audience personas, competitive differentiation, brand archetype identification, and long-term brand vision.' },
    ],
    process: [
      { num: '01', title: 'Brand Discovery', desc: 'We facilitate a brand strategy workshop, conduct competitive analysis, research your target audience, and define your brand positioning and personality attributes.', icon: Search },
      { num: '02', title: 'Concept Development', desc: 'Our designers create 3-4 distinct logo concepts with mood boards, color exploration, and typography studies. You select a direction for refinement and further development.', icon: Palette },
      { num: '03', title: 'Refinement & Extension', desc: 'The chosen concept is refined through multiple revision rounds, then extended into a complete identity system including all variations, patterns, and collateral designs.', icon: Layers },
      { num: '04', title: 'Delivery & Guidelines', desc: 'Final asset delivery in all required formats, comprehensive brand guidelines documentation, and a handoff session to ensure your team can apply the brand consistently.', icon: Rocket },
    ],
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Adobe InDesign', 'Adobe Color', 'Google Fonts', 'Fontspring', 'Coolors', 'Canva', 'Looka'],
    faqs: [
      { question: 'How many logo concepts will I receive?', answer: 'We typically present 3-4 distinct logo concepts in the first round, each with its own creative direction and rationale. You select one or two concepts for refinement, and we then develop those through multiple revision rounds until you are completely satisfied with the final design.' },
      { question: 'What file formats will I receive?', answer: 'You will receive all logo variations in SVG, PNG (transparent background), JPEG, PDF, and AI/EPS source files. Print-ready files include CMYK color versions. We also provide favicon files, social media profile images, and any other format-specific assets you need.' },
      { question: 'Can you redesign my existing brand identity?', answer: 'Yes. Brand redesigns are one of our specialties. We conduct a thorough analysis of your current brand equity, identify what works and what does not, and evolve the identity to be more contemporary while maintaining recognition. This includes logo evolution, not just a complete replacement.' },
      { question: 'Do you include brand voice and messaging?', answer: 'Yes. Our brand identity service includes a comprehensive messaging framework covering brand tagline, mission and vision statements, value propositions, elevator pitch, brand voice guidelines (tone, language, and style), and key messaging pillars for different audiences and situations.' },
    ],
    metaTitle: 'Brand Identity & Logo Design Services | VareWeb',
    metaDesc: 'Professional brand identity and logo design with strategic positioning, comprehensive brand guidelines, and complete collateral packages. Build a brand that lasts.',
  },

  // 13 ── Content Writing & Strategy
  {
    slug: 'content-writing-strategy',
    title: 'Content Writing & Strategy',
    badge: 'Storytelling',
    icon: BookOpen,
    color: 'from-teal-500 to-emerald-500',
    heroDesc: 'Engage your audience and establish thought leadership with strategic content that educates, inspires, and converts. From blog posts to white papers, we create content that drives results.',
    overviewP1: 'Content is the fuel that powers every digital marketing engine. Our content writing and strategy service goes beyond producing articles — we create comprehensive content ecosystems aligned with your business goals, SEO objectives, and audience needs. Our team of experienced writers, editors, and content strategists develop content that ranks well in search engines, genuinely helps your readers, and naturally guides them toward your products or services.',
    overviewP2: 'We begin with a thorough content audit and gap analysis, then develop a detailed content calendar with topic clusters, pillar pages, and supporting blog articles designed to build topical authority. Every piece of content is research-backed, professionally written, optimized for search engines, and aligned with your brand voice. Our editorial process includes multiple review rounds, fact-checking, plagiarism verification, and SEO optimization to ensure every published piece meets the highest quality standards.',
    highlights: ['SEO-optimized content production', 'Topic cluster and pillar strategy', 'Professional editorial process', 'Multi-format content creation', 'Content audit and gap analysis', 'Thought leadership positioning'],
    features: [
      { icon: Target, title: 'Content Strategy Development', desc: 'Data-driven content strategy including keyword research, topic mapping, competitive content analysis, and a comprehensive editorial calendar aligned with your business objectives.' },
      { icon: FileText, title: 'Blog & Article Writing', desc: 'SEO-optimized, well-researched blog posts and articles (1,000-3,000+ words) that provide genuine value to readers while improving search engine rankings and organic traffic.' },
      { icon: BookOpen, title: 'White Papers & E-Books', desc: 'In-depth, authoritative long-form content that establishes thought leadership, generates qualified leads, and provides substantive value to your target decision-makers.' },
      { icon: Megaphone, title: 'Website Copywriting', desc: 'Compelling homepage copy, service descriptions, about pages, and case studies that communicate your value proposition clearly and persuade visitors to take action.' },
      { icon: Share2, title: 'Email & Newsletter Content', desc: 'Engaging email sequences, newsletter content, and marketing copy designed to nurture leads, drive engagement, and convert subscribers into customers.' },
      { icon: BarChart3, title: 'Content Performance Analytics', desc: 'Monthly content performance reporting tracking traffic, engagement, conversions, keyword rankings, and content ROI with strategic recommendations for optimization.' },
    ],
    process: [
      { num: '01', title: 'Audit & Strategy', desc: 'We audit your existing content, analyze keyword opportunities, study your competitors, and develop a comprehensive content strategy with a prioritized editorial calendar.', icon: Search },
      { num: '02', title: 'Research & Writing', desc: 'Our writers conduct thorough research, interview subject matter experts when needed, and craft compelling content optimized for both search engines and human readers.', icon: PenTool },
      { num: '03', title: 'Edit & Optimize', desc: 'Every piece goes through professional editing for clarity, accuracy, and brand voice consistency, plus SEO optimization including meta descriptions, headers, and internal linking.', icon: FileText },
      { num: '04', title: 'Publish & Analyze', desc: 'Content publication with on-page SEO implementation, social media promotion, and performance monitoring with monthly reporting and strategy refinement based on results.', icon: TrendingUp },
    ],
    technologies: ['Surfer SEO', 'Clearscope', 'Ahrefs', 'Google Analytics 4', 'Google Search Console', 'Grammarly Business', 'Hemingway Editor', 'WordPress', 'Contentful', 'BuzzSumo'],
    faqs: [
      { question: 'How do you ensure content quality?', answer: 'Every piece goes through a rigorous 4-stage editorial process: writer draft, editor review for structure and clarity, SEO optimization pass, and final proofread. We also run plagiarism checks, verify facts and statistics, and ensure brand voice consistency. Only content that meets all our quality benchmarks is published.' },
      { question: 'How long are your typical blog posts?', answer: 'Our standard blog posts range from 1,500 to 2,500 words, which is the optimal length for SEO and reader engagement. Pillar pages and comprehensive guides can be 3,000-5,000+ words. We determine the ideal length based on the topic depth, search intent, and competitive landscape for each keyword.' },
      { question: 'Can you write about technical or specialized topics?', answer: 'Yes. We have writers with expertise across various industries including technology, finance, healthcare, legal, manufacturing, and more. For highly specialized topics, we conduct expert interviews and work closely with your subject matter experts to ensure accuracy and depth.' },
      { question: 'Do you also handle content distribution and promotion?', answer: 'Yes. Our service includes content promotion across social media channels, email newsletter inclusion, and outreach for backlink opportunities. We can also manage guest posting on relevant industry publications to expand your content reach and build domain authority.' },
    ],
    metaTitle: 'Content Writing & Strategy Services | VareWeb',
    metaDesc: 'Strategic content writing and strategy with SEO optimization, editorial quality control, and performance analytics. Build topical authority and drive organic traffic.',
  },

  // 14 ── Cloud Solutions & Hosting
  {
    slug: 'cloud-solutions-hosting',
    title: 'Cloud Solutions & Hosting',
    badge: 'Infrastructure',
    icon: Cloud,
    color: 'from-sky-500 to-indigo-500',
    heroDesc: 'Enterprise-grade cloud infrastructure and hosting solutions engineered for performance, security, and scalability. Keep your applications fast, reliable, and always available.',
    overviewP1: 'Your website and applications are only as good as the infrastructure they run on. Our cloud solutions and hosting service provides enterprise-grade infrastructure without enterprise-grade complexity. We design, deploy, and manage cloud environments on AWS, Google Cloud, and Azure that are optimized for your specific workload requirements, traffic patterns, and compliance needs.',
    overviewP2: 'Our hosting solutions go beyond basic server provisioning. We implement comprehensive monitoring and alerting, automated backup and disaster recovery, SSL/TLS certificate management, DDoS protection, and performance optimization through CDN integration and caching strategies. Whether you are running a high-traffic eCommerce store, a SaaS application, or multiple client websites, we build infrastructure that scales automatically and stays online 99.99% of the time.',
    highlights: ['99.99% uptime SLA guaranteed', 'Auto-scaling infrastructure', 'DDoS protection and security', 'Automated backup and disaster recovery', 'Global CDN integration', '24/7 monitoring and incident response'],
    features: [
      { icon: Server, title: 'Managed Cloud Hosting', desc: 'Fully managed cloud hosting on AWS, GCP, or Azure with server provisioning, OS updates, security patching, and performance tuning handled by our infrastructure team.' },
      { icon: Shield, title: 'Security & Compliance', desc: 'Multi-layered security including firewall configuration, intrusion detection, vulnerability scanning, SSL management, and compliance frameworks (SOC 2, HIPAA, PCI-DSS).' },
      { icon: Database, title: 'Database Management', desc: 'Managed database services with automated backups, replication, failover, query optimization, and scaling for PostgreSQL, MySQL, MongoDB, and Redis workloads.' },
      { icon: Zap, title: 'Performance Optimization', desc: 'Global CDN deployment, edge caching, image optimization, Gzip compression, and HTTP/3 implementation to achieve sub-100ms response times worldwide.' },
      { icon: BarChart3, title: 'Monitoring & Alerting', desc: '24/7 infrastructure monitoring with real-time dashboards, custom alerting thresholds, automated incident response, and monthly performance review reports.' },
      { icon: RefreshCw, title: 'Backup & Disaster Recovery', desc: 'Automated daily backups with point-in-time recovery, cross-region replication, and tested disaster recovery procedures ensuring your data is always safe and recoverable.' },
    ],
    process: [
      { num: '01', title: 'Infrastructure Assessment', desc: 'We analyze your current hosting environment, traffic patterns, performance requirements, and compliance needs to design the optimal cloud architecture for your workloads.', icon: Search },
      { num: '02', title: 'Architecture & Setup', desc: 'Our DevOps engineers design and deploy your cloud infrastructure with auto-scaling, load balancing, monitoring, security configurations, and CI/CD pipeline integration.', icon: Server },
      { num: '03', title: 'Migration & Testing', desc: 'Seamless migration of your applications and data with zero downtime, comprehensive testing of failover procedures, and validation of backup and recovery systems.', icon: Settings },
      { num: '04', title: 'Manage & Optimize', desc: 'Ongoing infrastructure management including performance monitoring, security updates, cost optimization, and monthly review meetings to ensure optimal operation.', icon: TrendingUp },
    ],
    technologies: ['AWS', 'Google Cloud Platform', 'Azure', 'Cloudflare', 'Docker', 'Kubernetes', 'Terraform', 'Nginx', 'Redis', 'Datadog'],
    faqs: [
      { question: 'What uptime guarantee do you provide?', answer: 'We guarantee 99.99% uptime for all managed hosting plans, backed by contractual SLAs with service credits for any downtime beyond the guarantee. Our infrastructure is designed with redundancy at every layer — multiple availability zones, automated failover, and health checks to prevent outages.' },
      { question: 'Can you migrate my existing site to the cloud?', answer: 'Yes. We handle complete migrations from shared hosting, VPS, dedicated servers, or other cloud providers with zero downtime. Our migration process includes thorough planning, data transfer, DNS management, testing, and a rollback plan in case any issues arise.' },
      { question: 'How do you handle security threats?', answer: 'We implement a comprehensive security stack including WAF (Web Application Firewall), DDoS protection, intrusion detection systems, automated vulnerability scanning, and real-time threat monitoring. Security patches are applied promptly, and we conduct regular penetration testing on critical infrastructure.' },
      { question: 'What happens if my traffic suddenly spikes?', answer: 'Our auto-scaling infrastructure automatically provisions additional resources in response to traffic increases. Whether you experience a viral moment, a flash sale, or seasonal traffic spikes, your applications will scale seamlessly without performance degradation. We also proactively plan for known traffic events.' },
      { question: 'Do you provide cost optimization?', answer: 'Yes. We actively monitor your cloud spending and identify cost-saving opportunities such as right-sizing instances, utilizing reserved capacity for predictable workloads, implementing intelligent caching to reduce database queries, and eliminating unused resources. Monthly cost reports show exactly where your money goes.' },
    ],
    metaTitle: 'Cloud Solutions & Hosting Services | VareWeb',
    metaDesc: 'Enterprise-grade cloud hosting with 99.99% uptime, auto-scaling, security, and 24/7 monitoring. AWS, GCP, and Azure infrastructure management.',
  },
];
