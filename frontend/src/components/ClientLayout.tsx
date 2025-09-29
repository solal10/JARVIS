"use client";

import React, { useState } from 'react';
import Link from "next/link";
import StickyContactBtn from "@/components/StickyContactBtn";
import EffectControls from "@/components/EffectControls";
import MobileMenu from '@/components/MobileMenu';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="backdrop-blur-md shadow-lg bg-black/70">
          <div className="container mx-auto px-6 flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-white hover:text-jarvisGold transition-colors">SARL JARVIS</Link>
            <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Navigation principale">
              <Link href="/" className="font-medium text-white hover:text-jarvisGold transition-colors">Accueil</Link>
              <Link href="/services/developpement-logiciel" className="font-medium text-white hover:text-jarvisGold transition-colors">Développement</Link>
              <Link href="/services/audit-conseil-ia" className="font-medium text-white hover:text-jarvisGold transition-colors">Audit IA</Link>
              <Link href="/services/offre-jarvis-start-ups" className="font-medium text-white hover:text-jarvisGold transition-colors">Startup</Link>
              <Link href="/services/solutions-web-marketing" className="font-medium text-white hover:text-jarvisGold transition-colors">Marketing</Link>
              <Link href="/services/support-maintenance" className="font-medium text-white hover:text-jarvisGold transition-colors">Support</Link>
              <Link href="/a-propos" className="font-medium text-white hover:text-jarvisGold transition-colors">À propos</Link>
              <Link href="/faq" className="font-medium text-white hover:text-jarvisGold transition-colors">FAQ</Link>
              <Link href="/contact" className="font-medium text-white hover:text-jarvisGold transition-colors">Contact</Link>
            </nav>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-jarvisGold transition-colors"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-jarvisGold/30 to-transparent"></div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-grow" id="main-content">
        {children}
        <StickyContactBtn />
        <EffectControls />
      </main>

      <footer className="backdrop-blur-md text-white py-12 relative z-50 border-t border-monacoBlue/20" role="contentinfo">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-48">
            <div>
              <h3 className="text-xl font-bold mb-4 text-jarvisGold">SARL JARVIS</h3>
              <p className="mb-4">Solutions IT sur-mesure à Monaco et à l'international.</p>
              <p>&copy; {new Date().getFullYear()} SARL JARVIS. Tous droits réservés.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-jarvisGold">Contact</h3>
              <p className="mb-2">2 Rue Du Gabian, 98000 Monaco</p>
              <p className="mb-2">Email: contact@jarvis-monaco.com</p>
              <p className="mb-2">Tél: +33.6.66.38.05.14</p>
              <p>Tél: +33.6.67.63.87.29</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-jarvisGold">Liens rapides</h3>
              <nav aria-label="Liens du footer"><ul className="space-y-2">
                <li><Link href="/" className="hover:text-jarvisGold transition-colors">Accueil</Link></li>
                <li><Link href="/services/developpement-logiciel" className="hover:text-jarvisGold transition-colors">Développement</Link></li>
                <li><Link href="/services/audit-conseil-ia" className="hover:text-jarvisGold transition-colors">Audit IA</Link></li>
                <li><Link href="/services/offre-jarvis-start-ups" className="hover:text-jarvisGold transition-colors">Startup</Link></li>
                <li><Link href="/services/solutions-web-marketing" className="hover:text-jarvisGold transition-colors">Marketing</Link></li>
                <li><Link href="/services/support-maintenance" className="hover:text-jarvisGold transition-colors">Support</Link></li>
                <li><Link href="/a-propos" className="hover:text-jarvisGold transition-colors">À propos</Link></li>
                <li><Link href="/faq" className="hover:text-jarvisGold transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-jarvisGold transition-colors">Contact</Link></li>
              </ul></nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
