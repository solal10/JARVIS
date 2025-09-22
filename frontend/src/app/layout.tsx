import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jarvis-mc.com'),
  title: {
    default: "SARL JARVIS – Solutions IT sur‑mesure",
    template: "%s | JARVIS"
  },
  description: "Solutions logicielles & installations IT sur‑mesure à Monaco et à l'international",
  keywords: ["JARVIS", "Monaco", "IT", "développement logiciel", "installation matériel", "support"],
  openGraph: {
    title: "SARL JARVIS – Solutions IT sur‑mesure",
    description: "Solutions logicielles & installations IT sur‑mesure à Monaco et à l'international",
    url: "https://jarvis-mc.com",
    siteName: "JARVIS",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARL JARVIS – Solutions IT sur‑mesure",
    description: "Solutions logicielles & installations IT sur‑mesure à Monaco et à l'international",
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
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KFJWHM5G');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SARL JARVIS",
              "url": "https://jarvis-mc.com",
              "logo": "https://jarvis-mc.com/favicon.ico",
              "description": "Solutions logicielles & installations IT sur‑mesure à Monaco et à l'international",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2 Rue Du Gabian",
                "addressLocality": "Monaco",
                "postalCode": "98000",
                "addressCountry": "MC"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+33666380514",
                  "contactType": "customer service",
                  "availableLanguage": ["French", "English"]
                },
                {
                  "@type": "ContactPoint",
                  "email": "info@jarvis.mc",
                  "contactType": "customer service",
                  "availableLanguage": ["French", "English"]
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/sarl-jarvis"
              ],
              "areaServed": ["Monaco", "France", "Europe"],
              "serviceType": [
                "Software Development",
                "AI Consulting",
                "Web Marketing",
                "Technical Support"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-black flex flex-col min-h-screen`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFJWHM5G"
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
