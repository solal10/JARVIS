export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Création Sites Internet & Développement Web",
  "description": "Service complet de création de sites internet et développement d'applications web/mobile sur-mesure. Conception, maintenance et solutions IT pour entreprises.",
  "url": "https://jarvis-mc.com/services/developpement-logiciel",
  "provider": {
    "@type": "Organization",
    "name": "JARVIS",
    "url": "https://jarvis-mc.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "serviceType": [
    "Website Development",
    "Web Application Development",
    "Mobile App Development",
    "Software Development",
    "E-commerce Development"
  ],
  "offers": {
    "@type": "Offer",
    "description": "Solutions de développement web sur-mesure",
    "priceRange": "€€€",
    "availability": "InStock"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services Développement JARVIS",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de Sites Internet",
          "description": "Sites vitrine, e-commerce et institutionnels avec design responsive"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Applications Web Sur-Mesure",
          "description": "Développement d'applications web avec architecture moderne et scalable"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Applications Mobiles",
          "description": "Apps iOS et Android natives ou hybrides selon vos besoins"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Maintenance et Support",
          "description": "Maintenance continue et support technique pour vos applications"
        }
      }
    ]
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://jarvis-mc.com/services/developpement-logiciel"
  }
};