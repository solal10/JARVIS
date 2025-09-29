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
      {/* Schema.org JSON-LD pour les breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Composant visuel */}
      <nav aria-label="Fil d'Ariane" className="py-4 px-6 border-b border-jarvisGold/20">
        <div className="max-w-screen-xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-2 text-jarvisGold/60"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-white font-semibold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-jarvisGold hover:text-jarvisGold/80 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;