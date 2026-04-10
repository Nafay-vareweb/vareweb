import { servicesData } from './data';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | VareWeb' };
  return {
    title: service.metaTitle,
    description: service.metaDesc,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDesc,
      type: 'website',
    },
  };
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
}
