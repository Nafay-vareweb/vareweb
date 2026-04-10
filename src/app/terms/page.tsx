'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageDecorations from '@/components/PageDecorations';
import ParticleBackground from '@/components/ParticleBackground';
import { FileText, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const termsSections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using the services provided by VareWeb ("Company," "we," "us," or "our"), you ("Client," "you," or "your") agree to be bound by these Terms of Service ("Terms"). These Terms constitute a legally binding agreement between you and VareWeb.',
      'If you do not agree to all of these Terms, you must not use our services. We recommend that you review these Terms periodically for any updates or changes. Your continued use of our services after any modifications indicates your acceptance of the revised Terms.',
      'These Terms apply to all services offered by VareWeb, including but not limited to web design, web development, logo design, digital marketing, SEO optimization, eCommerce solutions, website redesign, and any other related creative or technical services.',
    ],
  },
  {
    id: 'services',
    title: '2. Services Description',
    content: [
      'VareWeb provides professional web design, development, and digital marketing services to businesses and individuals. The specific scope of services for each project will be outlined in a detailed project proposal or Statement of Work (SOW) agreed upon by both parties.',
      'Our services include, but are not limited to: custom website design and development, responsive web design, user experience (UX) and user interface (UI) design, search engine optimization (SEO), content creation, brand identity development, eCommerce website development, website maintenance and support, and digital marketing consulting.',
      'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with reasonable notice to the Client. Any significant changes to the scope of work will require mutual agreement and may result in adjustments to the project timeline and fees.',
    ],
  },
  {
    id: 'responsibilities',
    title: '3. Client Responsibilities',
    content: [
      'The Client agrees to provide all necessary materials, content, feedback, and approvals in a timely manner to enable VareWeb to deliver services as outlined in the project proposal. Delays in providing required materials may result in corresponding delays to the project timeline.',
      'The Client is responsible for ensuring that all materials provided to VareWeb do not infringe upon the intellectual property rights of any third party. This includes, but is not limited to, text, images, logos, trademarks, and other content supplied for use in the project.',
      'The Client must review and approve deliverables within the timeframe specified in the project agreement. If the Client fails to respond within seven (7) business days of receiving deliverables for review, the deliverables will be deemed approved.',
      'The Client agrees to provide accurate and complete information when requesting services and throughout the duration of the project. VareWeb is not responsible for any issues arising from inaccurate or incomplete information provided by the Client.',
    ],
  },
  {
    id: 'payment',
    title: '4. Payment Terms',
    content: [
      'Payment terms for each project will be outlined in the project proposal or contract. Unless otherwise agreed, our standard payment structure consists of a 50% deposit upon project commencement, with the remaining 50% due upon project completion, prior to the final delivery of source files or website launch.',
      'All invoices are due within fifteen (15) business days from the date of issuance unless otherwise stated in the project agreement. Late payments may incur a late fee of 1.5% per month on the outstanding balance.',
      'VareWeb reserves the right to suspend work on any project for which payment is overdue. Work will resume promptly upon receipt of full payment, subject to revised timeline adjustments as necessary.',
      'For ongoing maintenance or retainer agreements, payments are due at the beginning of each billing cycle as specified in the respective agreement. Either party may terminate a retainer agreement with thirty (30) days written notice.',
      'All fees are quoted in US Dollars (USD) and are exclusive of applicable taxes, unless otherwise stated. The Client is responsible for any taxes or duties applicable to the services rendered.',
    ],
  },
  {
    id: 'intellectual-property',
    title: '5. Intellectual Property',
    content: [
      'Upon receipt of full payment, the Client will receive ownership of the final deliverables as specified in the project agreement, including the completed website design, custom graphics, and other materials created specifically for the Client.',
      'VareWeb retains ownership of all proprietary tools, frameworks, code libraries, methodologies, and pre-existing intellectual property used in the creation of the deliverables. This includes, but is not limited to, content management systems, custom plugins, and reusable code components.',
      'The Client grants VareWeb a non-exclusive, worldwide, royalty-free license to use, reproduce, and display the completed project in our portfolio, marketing materials, and social media for promotional purposes, unless otherwise agreed in writing.',
      'Third-party assets such as stock photos, fonts, icons, and software licenses used in the project remain subject to their respective license agreements. The Client is responsible for ensuring compliance with any third-party license requirements.',
      'VareWeb reserves the right to display "Designed by VareWeb" or a similar attribution in the website footer or code comments, unless the Client purchases the white-label option as specified in the project agreement.',
    ],
  },
  {
    id: 'confidentiality',
    title: '6. Confidentiality',
    content: [
      'Both parties agree to maintain the confidentiality of all proprietary and sensitive information shared during the course of the engagement. Confidential information includes, but is not limited to, business strategies, financial data, trade secrets, customer lists, and technical specifications.',
      'Neither party shall disclose confidential information to any third party without the prior written consent of the other party, except as required by law or as necessary to perform the services under this agreement.',
      'This confidentiality obligation shall survive the termination or expiration of these Terms for a period of two (2) years, unless otherwise agreed in writing by both parties.',
      'VareWeb implements industry-standard security measures to protect Client data. However, we cannot guarantee absolute security, and the Client acknowledges that no method of electronic transmission or storage is completely secure.',
    ],
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    content: [
      'To the maximum extent permitted by applicable law, VareWeb shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the services provided, including but not limited to loss of profits, data, business opportunities, or goodwill.',
      'VareWeb\'s total liability for any claim arising out of or related to these Terms or our services shall not exceed the total amount paid by the Client to VareWeb for the specific project in question.',
      'VareWeb is not responsible for any losses or damages resulting from factors beyond our reasonable control, including but not limited to server downtime, internet outages, third-party service failures, force majeure events, or unauthorized access to the Client\'s systems.',
      'The Client acknowledges that VareWeb does not guarantee specific search engine rankings, traffic levels, conversion rates, or other performance metrics unless explicitly stated in a separate written agreement.',
      'VareWeb is not liable for any content, products, or services provided by the Client on their website or any third-party platforms. The Client is solely responsible for ensuring that their website content complies with all applicable laws and regulations.',
    ],
  },
  {
    id: 'termination',
    title: '8. Termination',
    content: [
      'Either party may terminate the project engagement by providing thirty (30) days written notice to the other party. In the event of termination, the Client shall pay for all work completed up to the date of termination, as well as any non-cancelable expenses incurred by VareWeb.',
      'VareWeb reserves the right to immediately terminate services if the Client breaches any material term of these Terms, fails to make payment when due, or engages in conduct that is harmful to VareWeb\'s reputation or business interests.',
      'Upon termination, VareWeb will deliver all completed work and materials to the Client, subject to the Client\'s fulfillment of all outstanding payment obligations. Work-in-progress materials will be delivered in their current state, and no further development or refinement will be provided.',
      'Either party may terminate the agreement immediately if the other party becomes insolvent, files for bankruptcy, or is unable to pay its debts as they become due.',
    ],
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    content: [
      'These Terms shall be governed by and construed in accordance with the laws of the State of Texas, United States of America, without regard to its conflict of law principles.',
      'Any disputes arising out of or related to these Terms or our services shall first be attempted to be resolved through good-faith negotiation between the parties. If negotiation fails, the dispute shall be submitted to binding arbitration in Dallas, Texas, in accordance with the rules of the American Arbitration Association.',
      'The prevailing party in any dispute resolution proceeding shall be entitled to recover reasonable attorney\'s fees, arbitration costs, and other expenses incurred in connection with the proceeding.',
      'The Client agrees that any legal action or proceeding arising out of these Terms may only be brought in the federal or state courts located in Dallas County, Texas, and the Client hereby consents to the personal jurisdiction of such courts.',
    ],
  },
  {
    id: 'changes',
    title: '10. Changes to Terms',
    content: [
      'VareWeb reserves the right to update or modify these Terms at any time. Changes will be effective immediately upon posting the revised Terms on our website at vareweb.com. The "Last Updated" date at the top of this page will be revised accordingly.',
      'For existing clients with active projects, material changes to these Terms will be communicated via email at least fifteen (15) days before they take effect. Continued use of our services after the effective date constitutes acceptance of the modified Terms.',
      'We encourage all users to periodically review these Terms to stay informed of any updates. If you have questions about changes to these Terms, please contact us at legal@vareweb.com.',
    ],
  },
  {
    id: 'contact',
    title: '11. Contact Information',
    content: [
      'If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us using any of the following methods:',
    ],
  },
];

export default function TermsPage() {
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
              <FileText className="w-4 h-4 mr-1.5" /> Legal
            </span>
            <h1 className="hero-anim text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 opacity-0">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-vare-gold to-yellow-300">Service</span>
            </h1>
            <p className="hero-anim max-w-2xl mx-auto text-lg text-white/70 leading-relaxed opacity-0">
              Please read these Terms of Service carefully before using our services. By accessing or using VareWeb services, you agree to be bound by these terms.
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
                  <FileText className="w-4 h-4 text-white" />
                </span>
                Table of Contents
              </h2>
              <nav aria-label="Table of Contents">
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {termsSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block px-3 py-2 text-sm text-white/70 hover:text-[#a78bfa] hover:bg-white/[0.06] rounded-lg transition-all duration-200"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Legal Sections */}
            {termsSections.map((section) => (
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
                  {/* Contact info block for the last section */}
                  {section.id === 'contact' && (
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
                          <a href="mailto:legal@vareweb.com" className="text-sm text-white/70 hover:text-[#a78bfa] transition-colors">
                            legal@vareweb.com
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
                These Terms of Service are effective as of July 1, 2025. By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
              <Link
                href="/privacy"
                className="inline-flex items-center text-[#a78bfa] font-medium text-sm hover:gap-2 transition-all duration-300"
              >
                Read our Privacy Policy <ArrowRight className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
              Ready to Start Your Project?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project requirements and find the perfect solution for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-base font-medium text-[#a78bfa] bg-white/[0.06] border border-white/[0.08] rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
