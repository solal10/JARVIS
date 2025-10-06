import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { organizationSchema, localBusinessSchema } from "@/schemas/organization";
import { faqSchema } from "@/schemas/faq";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true, // Preload font for better performance
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jarvis-mc.com'),
  title: {
    default: "JARVIS - Expert Développement Logiciel & Audit IA | Solutions Entreprises France",
    template: "%s | JARVIS Expert IT"
  },
  description: "Expert développement logiciel et audit IA. Solutions sur-mesure : applications web/mobile, IA, automation. Interventions France depuis Monaco.",
  keywords: ["JARVIS", "développement logiciel", "audit IA", "France", "entreprises", "applications web", "intelligence artificielle", "automation", "start-ups", "Monaco"],
  openGraph: {
    title: "JARVIS - Expert Développement Logiciel & Audit IA France",
    description: "Expert développement logiciel et audit IA pour entreprises France. Solutions sur-mesure : applications web/mobile, intelligence artificielle, automation.",
    url: "https://jarvis-mc.com",
    siteName: "JARVIS Expert IT",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JARVIS - Expert Développement Logiciel & Audit IA France",
    description: "Expert développement logiciel et audit IA pour entreprises France. Solutions sur-mesure : applications web/mobile, intelligence artificielle, automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="GN1AnoAQ62lvrzkpCE3WRt5IYnVZSAdRODggMLxUme0" />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MKSKTZ7N');
            `,
          }}
        />
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        {/* Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
        {/* Schema.org FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-black flex flex-col min-h-screen`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-jarvisGold text-black px-4 py-2 rounded-md font-semibold z-50 focus:ring-2 focus:ring-jarvisGold focus:ring-opacity-50"
        >
          Aller au contenu principal
        </a>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MKSKTZ7N"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
