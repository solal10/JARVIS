'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customItems }) => {
  const pathname = usePathname();

  // Mapping des paths vers des labels plus lisibles
  const pathLabels: Record<string, string> = {
    '/': 'Accueil',
    '/services': 'Services',
    '/services/developpement-logiciel': 'Création Sites & Développement',
    '/services/audit-conseil-ia': 'Audit & Conseil IA',
    '/services/solutions-web-marketing': 'Solutions Web-Marketing',
    '/services/support-maintenance': 'Support & Maintenance',
    '/services/offre-jarvis-start-ups': 'Offre Start-ups & Investisseurs',
    '/a-propos': 'À propos',
    '/contact': 'Contact',
    '/faq': 'FAQ'
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const label = pathLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Générer le schema JSON-LD pour les breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://jarvis-mc.com${item.href}`
    }))
  };

  if (breadcrumbs.length <= 1) return null;

  return (
    <>
      {/* Schema.org JSON-LD pour les breadcrumbs - SEO uniquement */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default Breadcrumbs;