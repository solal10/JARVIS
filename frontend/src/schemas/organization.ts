export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JARVIS",
  "legalName": "SARL JARVIS",
  "url": "https://jarvis-mc.com",
  "logo": "https://jarvis-mc.com/logo.png",
  "description": "Expert développement logiciel et audit IA pour entreprises France. Solutions sur-mesure : applications web/mobile, intelligence artificielle, automation.",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MC",
    "addressLocality": "Monaco",
    "postalCode": "98000",
    "streetAddress": "Monaco"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+377-XX-XX-XX-XX",
    "contactType": "customer service",
    "areaServed": ["FR", "MC", "CH", "BE"],
    "availableLanguage": ["French", "English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/jarvis-monaco"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services JARVIS",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Développement Logiciel",
          "description": "Création de sites internet, applications web et mobiles sur-mesure"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Audit & Conseil IA",
          "description": "Audit intelligence artificielle et automatisation pour entreprises"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Solutions Web-Marketing",
          "description": "Stratégie digitale, SEO et marketing personnalisé"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Support & Maintenance",
          "description": "Support technique et maintenance logicielle"
        }
      }
    ]
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "JARVIS",
  "description": "Expert développement logiciel et audit IA pour entreprises France depuis Monaco",
  "url": "https://jarvis-mc.com",
  "telephone": "+377-XX-XX-XX-XX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Monaco",
    "addressLocality": "Monaco",
    "postalCode": "98000",
    "addressCountry": "MC"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.7384,
    "longitude": 7.4246
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "servedCuisine": null,
  "priceRange": "€€€",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "serviceArea": {
    "@type": "Country",
    "name": "France"
  }
};