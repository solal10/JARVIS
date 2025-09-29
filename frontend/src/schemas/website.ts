export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "JARVIS - Expert Développement Logiciel & Audit IA",
  "url": "https://jarvis-mc.com",
  "description": "Expert développement logiciel et audit IA pour entreprises France. Solutions sur-mesure : applications web/mobile, intelligence artificielle, automation.",
  "publisher": {
    "@type": "Organization",
    "name": "JARVIS",
    "url": "https://jarvis-mc.com"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://jarvis-mc.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "Organization",
    "name": "JARVIS",
    "description": "Société monégasque spécialisée dans le développement logiciel et l'audit IA pour entreprises françaises"
  }
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://jarvis-mc.com"
    }
  ]
};

export const serviceAggregateSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Services JARVIS - Développement & IA",
  "description": "Développement logiciel, audit IA, web-marketing et support technique pour entreprises",
  "provider": {
    "@type": "Organization",
    "name": "JARVIS",
    "url": "https://jarvis-mc.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Catalogue Services JARVIS",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création Sites Internet & Développement",
          "description": "Conception et création de sites internet, applications web & mobiles sur-mesure avec architecture moderne",
          "url": "https://jarvis-mc.com/services/developpement-logiciel"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Audit & Conseil IA",
          "description": "Solutions d'intelligence artificielle et d'automatisation sur-mesure. Expert audit IA pour entreprises",
          "url": "https://jarvis-mc.com/services/audit-conseil-ia"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Solutions Web-Marketing",
          "description": "Stratégie digitale, SEO, et accompagnement marketing personnalisé",
          "url": "https://jarvis-mc.com/services/solutions-web-marketing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Support & Maintenance Logicielle",
          "description": "Support technique et maintenance logicielle pour entreprises",
          "url": "https://jarvis-mc.com/services/support-maintenance"
        }
      }
    ]
  }
};