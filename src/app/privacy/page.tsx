'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageDecorations from '@/components/PageDecorations';
import ParticleBackground from '@/components/ParticleBackground';
import { Shield, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const privacySections = [
  {
    id: 'information-collect',
    title: '1. Information We Collect',
    content: [
      'At VareWeb, we are committed to protecting your privacy. We collect information that you voluntarily provide to us when you use our services, visit our website, or communicate with us. The types of information we may collect include:',
    ],
    list: [
      'Personal identification information such as your name, email address, phone number, company name, and job title when you fill out contact forms, request a quote, or subscribe to our newsletter.',
      'Project-related information including design preferences, technical requirements, content materials, branding assets, and any other data necessary to deliver our services effectively.',
      'Payment and billing information such as your billing address, payment method details, and transaction history. Note that we do not store complete credit card numbers; all payment processing is handled through secure, PCI-compliant third-party payment processors.',
      'Technical information such as your IP address, browser type, operating system, device type, referring URLs, and pages visited on our website, collected automatically when you interact with our digital platforms.',
      'Communication data including the content of emails, chat messages, and other correspondence exchanged between you and our team during the course of a project or business inquiry.',
    ],
  },
  {
    id: 'how-use',
    title: '2. How We Use Your Information',
    content: [
      'We use the information we collect for a variety of purposes to provide, improve, and personalize our services. Specifically, we may use your information to:',
    ],
    list: [
      'Provide and deliver the services you have requested, including web design, development, and digital marketing services, and to communicate with you about project progress, milestones, and deliverables.',
      'Process your payments, manage your account, and send you administrative information such as order confirmations, invoices, payment receipts, and policy updates.',
      'Respond to your inquiries, provide customer support, and address any questions, concerns, or feedback you may have regarding our services or your project.',
      'Improve our website, services, and user experience by analyzing usage patterns, identifying areas for enhancement, and developing new features and offerings based on client needs.',
      'Send you marketing communications, newsletters, and promotional materials about our services, special offers, and industry insights, where you have opted in to receive such communications.',
      'Comply with legal obligations, enforce our terms and conditions, protect our rights, and prevent, detect, or investigate fraud, security breaches, or other prohibited activities.',
      'Conduct research and analytics to better understand our audience, measure the effectiveness of our services, and make data-driven business decisions.',
    ],
  },
  {
    id: 'information-sharing',
    title: '3. Information Sharing',
    content: [
      'We respect the confidentiality of your personal information and do not sell, trade, or rent your personal data to third parties. However, we may share your information in the following circumstances:',
    ],
    list: [
      'With trusted service providers and partners who assist us in operating our business, delivering our services, or communicating with you. These include hosting providers, payment processors, email service providers, analytics platforms, and project management tools. All third-party service providers are contractually obligated to protect your information and use it only for the purposes for which it was shared.',
      'When required by law, regulation, legal process, or governmental request. We may also disclose your information if we believe in good faith that such disclosure is necessary to comply with applicable law, protect our rights, or ensure the safety of our users or the public.',
      'In connection with a corporate transaction such as a merger, acquisition, consolidation, reorganization, or sale of all or a portion of our assets. In such cases, we will notify affected clients and take reasonable steps to ensure that their personal information continues to be handled in accordance with this Privacy Policy.',
      'With your explicit consent. In any other situation not covered above, we will seek your permission before sharing your personal information with third parties.',
    ],
  },
  {
    id: 'data-security',
    title: '4. Data Security',
    content: [
      'We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it against unauthorized access, alteration, disclosure, or destruction. Our security practices include:',
    ],
    list: [
      'Encrypting data in transit using SSL/TLS protocols for all communications between your browser and our servers, and encrypting sensitive data at rest using industry-standard encryption algorithms.',
      'Implementing strict access controls, authentication mechanisms, and role-based permissions to limit access to personal information to authorized personnel who need it to perform their duties.',
      'Conducting regular security assessments, vulnerability scans, and penetration testing to identify and address potential security risks in our systems and infrastructure.',
      'Maintaining comprehensive audit logs and monitoring systems to detect and respond to suspicious activities or potential security incidents in a timely manner.',
      'Training our team members on data protection best practices and ensuring that all employees understand their responsibilities in maintaining the confidentiality and security of client information.',
    ],
    closing: [
      'While we strive to use commercially reasonable means to protect your personal information, no method of electronic transmission or storage is completely secure. Therefore, we cannot guarantee absolute security. In the event of a data breach that affects your personal information, we will promptly notify you in accordance with applicable legal requirements.',
    ],
  },
  {
    id: 'cookies',
    title: '5. Cookies and Tracking Technologies',
    content: [
      'Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand how visitors interact with our content. Cookies are small text files that are stored on your device when you visit our website. The types of cookies we use include:',
    ],
    list: [
      'Essential cookies that are necessary for the basic functionality of our website, such as maintaining your session, remembering your preferences, and ensuring the security of your browsing experience. These cookies cannot be disabled without affecting the core functionality of the site.',
      'Analytical cookies that help us understand how visitors interact with our website by collecting information about pages visited, time spent on each page, and navigation patterns. We use this data to improve our website performance and content. We primarily use Google Analytics for this purpose.',
      'Functional cookies that enable enhanced functionality and personalization, such as remembering your language preferences, customizing the display of content based on your region, and providing features like live chat support.',
      'Marketing cookies used to track visitors across websites and display relevant advertisements. These cookies are typically set by our advertising partners and help us deliver targeted marketing campaigns. You may opt out of targeted advertising through your browser settings or through industry opt-out programs.',
    ],
    closing: [
      'You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or alert you when a cookie is being set. Please note that disabling cookies may affect the functionality of certain features on our website.',
    ],
  },
  {
    id: 'third-party',
    title: '6. Third-Party Services',
    content: [
      'Our website and services may integrate with or link to third-party services and platforms. These third-party services have their own privacy policies that govern the collection, use, and disclosure of your information. We encourage you to review the privacy policies of any third-party services you interact with. Examples of third-party services we may use include:',
    ],
    list: [
      'Analytics services such as Google Analytics to collect and analyze website usage data.',
      'Payment processors such as Stripe or PayPal to securely handle online payments.',
      'Email service providers such as Mailchimp or SendGrid to manage newsletters and email communications.',
      'Cloud hosting providers such as AWS, Vercel, or Google Cloud to host our website and applications.',
      'Project management tools such as Notion, Trello, or Asana to manage project workflows and client communications.',
      'Social media platforms such as Facebook, LinkedIn, Twitter, and Instagram for marketing and social sharing features.',
    ],
    closing: [
      'VareWeb is not responsible for the privacy practices or content of these third-party services. Your interaction with any linked third-party websites or platforms is governed by their respective terms of service and privacy policies.',
    ],
  },
  {
    id: 'your-rights',
    title: '7. Your Rights',
    content: [
      'Depending on your jurisdiction, you may have certain rights regarding your personal information. We are committed to facilitating the exercise of these rights. Where applicable, you have the right to:',
    ],
    list: [
      'Access and receive a copy of the personal information we hold about you, along with details about how and why we process your data.',
      'Request correction of any inaccurate or incomplete personal information we hold about you.',
      'Request deletion of your personal information, subject to certain exceptions such as legal obligations, ongoing disputes, or legitimate business interests.',
      'Object to or restrict the processing of your personal information in certain circumstances, such as when we rely on legitimate interests as the legal basis for processing.',
      'Request data portability by receiving your personal information in a structured, commonly used, and machine-readable format.',
      'Withdraw your consent at any time where we rely on consent as the legal basis for processing your data. Please note that withdrawing consent does not affect the lawfulness of processing carried out prior to the withdrawal.',
      'Lodge a complaint with a supervisory authority or data protection agency if you believe that our processing of your personal information violates applicable data protection laws.',
    ],
    closing: [
      'To exercise any of these rights, please contact us at privacy@vareweb.com. We will respond to your request within thirty (30) days, or as required by applicable law. We may ask for verification of your identity before processing your request to protect against unauthorized access.',
    ],
  },
  {
    id: 'children',
    title: '8. Children\'s Privacy',
    content: [
      'VareWeb\'s services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16 years of age. If you are a parent or guardian and become aware that your child has provided us with personal information without your consent, please contact us immediately at privacy@vareweb.com.',
      'Upon receiving verifiable notice that we have collected personal information from a child under the age of 16, we will take prompt steps to delete such information from our systems and records. If we discover that a child under 16 has provided us with personal information, we will delete that information as quickly as commercially feasible.',
    ],
  },
  {
    id: 'changes-privacy',
    title: '9. Changes to This Privacy Policy',
    content: [
      'VareWeb reserves the right to update or modify this Privacy Policy at any time to reflect changes in our practices, technologies, legal requirements, or other factors. Changes will be effective immediately upon posting the revised Privacy Policy on our website at vareweb.com. The "Last Updated" date at the top of this page will be revised accordingly.',
      'For significant changes that may affect your rights or how we handle your personal information, we will provide reasonable notice, such as posting a prominent notice on our website or sending you an email notification. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.',
      'Your continued use of our website or services after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. If you do not agree with the revised policy, please discontinue use of our services and contact us to discuss your concerns.',
    ],
  },
  {
    id: 'contact-privacy',
    title: '10. Contact Us',
    content: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please do not hesitate to reach out to us. We are committed to addressing your privacy concerns promptly and transparently.',
    ],
  },
];

export default function PrivacyPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

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

      // Section headers and content blocks
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('.legal-section');
        sections.forEach((section) => {
          const header = section.querySelector('.section-heading');
          const blocks = section.querySelectorAll('.content-block');

          if (header) {
            gsap.fromTo(
              header,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 82%',
                },
              }
            );
          }

          if (blocks.length) {
            gsap.fromTo(
              blocks,
              { y: 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 78%',
                },
              }
            );
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <PageDecorations />
      <main className="min-h-screen flex flex-col">

        {/* Hero */}
        <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden gradient-purple-dark">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,77,187,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(58,26,112,0.4),transparent_50%)]" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
          </div>
          <ParticleBackground count={80} interactive={true} zIndex={5} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="hero-anim inline-flex items-center px-3 py-1 rounded-full glass-effect text-white/90 text-sm font-medium mb-6 opacity-0">
              <Shield className="w-4 h-4 mr-1.5" /> Legal
            </span>
            <h1 className="hero-anim text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 opacity-0">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Policy</span>
            </h1>
            <p className="hero-anim max-w-2xl mx-auto text-lg text-white/70 leading-relaxed opacity-0">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="hero-anim mt-6 text-sm text-white/50 opacity-0">
              Last Updated: July 1, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section ref={contentRef} className="flex-1 py-16 md:py-24 bg-[#0d0818]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Table of Contents */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 mb-12">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </span>
                Table of Contents
              </h2>
              <nav aria-label="Table of Contents">
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {privacySections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(section.id);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className="block px-3 py-2 text-sm text-white/70 hover:text-[#a78bfa] hover:bg-white/[0.06] rounded-lg transition-all duration-200"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Privacy Sections */}
            {privacySections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="legal-section mb-10 scroll-mt-28"
              >
                <h2 className="section-heading text-xl sm:text-2xl font-bold text-white mb-4 flex items-start gap-3">
                  <span className="w-1.5 h-8 rounded-full gradient-purple flex-shrink-0 mt-0.5" />
                  {section.title}
                </h2>
                <div className="ml-4 sm:ml-6 space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="content-block text-white/70 leading-relaxed text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="content-block space-y-3 ml-1">
                      {section.list.map((item, idx) => (
                        <li key={idx} className="flex items-start text-[15px] text-white/70 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-vare-purple-light flex-shrink-0 mt-2.5 mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.closing?.map((paragraph, idx) => (
                    <p key={idx} className="content-block text-white/70 leading-relaxed text-[15px]">
                      {paragraph}
                    </p>
                  ))}

                  {/* Contact info block for the last section */}
                  {section.id === 'contact-privacy' && (
                    <div className="content-block mt-6 glass-card rounded-xl p-6 sm:p-8 space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-vare-purple-light flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-white">Office Address</p>
                          <p className="text-sm text-white/70">5400 Preston Oaks Rd, Dallas, TX 75254, USA</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-vare-purple-light flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-white">Phone</p>
                          <a href="tel:+16592006383" className="text-sm text-white/70 hover:text-[#a78bfa] transition-colors">
                            +1 659 200 6383
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-vare-purple-light flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-white">Email</p>
                          <a href="mailto:privacy@vareweb.com" className="text-sm text-white/70 hover:text-[#a78bfa] transition-colors">
                            privacy@vareweb.com
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Separator */}
            <div className="border-t border-white/[0.08] my-12" />

            {/* Bottom Note */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                This Privacy Policy is effective as of July 1, 2025. By using our website or services, you acknowledge that you have read, understood, and agree to the practices described in this policy.
              </p>
              <Link
                href="/terms"
                className="inline-flex items-center text-[#a78bfa] font-medium text-sm hover:gap-2 transition-all duration-300"
              >
                Read our Terms of Service <ArrowRight className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 gradient-purple-dark relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have Questions About Our Policies?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              We&apos;re happy to clarify any aspect of our policies. Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-base font-medium text-[#a78bfa] bg-white/[0.06] border border-white/[0.08] rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
