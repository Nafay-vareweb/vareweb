import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | VareWeb',
  description:
    'Learn how VareWeb collects, uses, and protects your personal information. Our Privacy Policy outlines our data practices, cookie usage, third-party services, and your rights regarding your data.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
