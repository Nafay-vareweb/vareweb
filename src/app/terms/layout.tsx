import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | VareWeb',
  description:
    'Read the Terms of Service for VareWeb. Learn about our service agreements, client responsibilities, payment terms, intellectual property rights, and other legal conditions governing our web design and digital services.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
