import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import StickyContactBtn from "@/components/StickyContactBtn";
import EffectControls from "@/components/EffectControls";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SARL JARVIS – Solutions IT sur‑mesure",
  description: "Solutions logicielles & installations IT sur‑mesure à Monaco et à l'international",
  keywords: ["JARVIS", "Monaco", "IT", "développement logiciel", "installation matériel", "support"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} antialiased bg-black flex flex-col min-h-screen`}
      >
        <header className="bg-monacoBlue/85 backdrop-blur-sm shadow-lg py-4 sticky top-0 z-50">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-jarvisGold transition-colors">SARL JARVIS</Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="font-medium text-white hover:text-jarvisGold transition-colors">Accueil</Link>
              <Link href="/services/developpement-logiciel" className="font-medium text-white hover:text-jarvisGold transition-colors">Développement</Link>
              <Link href="/services/support-maintenance" className="font-medium text-white hover:text-jarvisGold transition-colors">Support</Link>
              <Link href="/services/solutions-web-marketing" className="font-medium text-white hover:text-jarvisGold transition-colors">Marketing</Link>
              <Link href="/services/offre-jarvis-start-ups" className="font-medium text-white hover:text-jarvisGold transition-colors">Startup</Link>
              <Link href="/a-propos" className="font-medium text-white hover:text-jarvisGold transition-colors">À propos</Link>
              <Link href="/faq" className="font-medium text-white hover:text-jarvisGold transition-colors">FAQ</Link>
              <Link href="/contact" className="font-medium text-white hover:text-jarvisGold transition-colors">Contact</Link>
            </nav>
            <button className="md:hidden text-white hover:text-jarvisGold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-grow">
          {children}
          <StickyContactBtn />
          <EffectControls />
        </main>

        <footer className="bg-black text-white py-12 relative z-50 border-t border-monacoBlue/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-jarvisGold">SARL JARVIS</h3>
                <p className="mb-4">Solutions IT sur-mesure &agrave; Monaco et &agrave; l&apos;international.</p>
                <p>&copy; {new Date().getFullYear()} SARL JARVIS. Tous droits r&eacute;serv&eacute;s.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-jarvisGold">Contact</h3>
                <p className="mb-2">Monaco, Principaut&eacute; de Monaco</p>
                <p className="mb-2">Email: contact@jarvis-monaco.com</p>
                <p>T&eacute;l: +377 99 99 99 99</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-jarvisGold">Liens rapides</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-jarvisGold transition-colors">Accueil</Link></li>
                  <li><Link href="/services/developpement-logiciel" className="hover:text-jarvisGold transition-colors">Développement</Link></li>
                  <li><Link href="/services/support-maintenance" className="hover:text-jarvisGold transition-colors">Support</Link></li>
                  <li><Link href="/services/solutions-web-marketing" className="hover:text-jarvisGold transition-colors">Marketing</Link></li>
                  <li><Link href="/services/offre-jarvis-start-ups" className="hover:text-jarvisGold transition-colors">Startup</Link></li>
                  <li><Link href="/a-propos" className="hover:text-jarvisGold transition-colors">À propos</Link></li>
                  <li><Link href="/faq" className="hover:text-jarvisGold transition-colors">FAQ</Link></li>
                  <li><Link href="/contact" className="hover:text-jarvisGold transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
