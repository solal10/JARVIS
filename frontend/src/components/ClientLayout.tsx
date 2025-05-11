"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { EyeIcon } from '@heroicons/react/24/solid';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  
  const toggleEffects = () => {
    const newState = !effectsEnabled;
    setEffectsEnabled(newState);
    // Communiquer avec le composant PixelWave via un événement personnalisé
    const event = new CustomEvent('togglePixelWave', { 
      detail: { enabled: newState },
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  };
  
  return (
    <>
      <header className="bg-monacoBlue/85 backdrop-blur-sm shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:text-jarvisGold transition-colors">SARL JARVIS</Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium text-white hover:text-jarvisGold transition-colors">Accueil</Link>
            <Link href="/services" className="font-medium text-white hover:text-jarvisGold transition-colors">Services</Link>
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
      </main>

      <footer className="bg-black text-white py-12 relative z-20 border-t border-monacoBlue/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8 px-4">
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4 text-jarvisGold">SARL JARVIS</h3>
              <p className="mb-4">Solutions IT sur-mesure &agrave; Monaco et &agrave; l&apos;international.</p>
              <p>&copy; {new Date().getFullYear()} SARL JARVIS. Tous droits r&eacute;serv&eacute;s.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4 text-jarvisGold">Contact</h3>
              <p className="mb-2">Monaco, Principaut&eacute; de Monaco</p>
              <p className="mb-2">Email: contact@jarvis-monaco.com</p>
              <p>T&eacute;l: +377 99 99 99 99</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4 text-jarvisGold">Liens rapides</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-jarvisGold transition-colors">Accueil</Link></li>
                <li><Link href="/services" className="hover:text-jarvisGold transition-colors">Services</Link></li>
                <li><Link href="/a-propos" className="hover:text-jarvisGold transition-colors">À propos</Link></li>
                <li><Link href="/faq" className="hover:text-jarvisGold transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-jarvisGold transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Bouton pour activer/désactiver les effets - avec z-index très élevé */}
      <button 
        onClick={toggleEffects}
        className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-black font-semibold rounded-full shadow-xl transition-all duration-300 border-2 border-white/20"
        aria-label={effectsEnabled ? 'Disable animation' : 'Enable animation'}
      >
        <EyeIcon className="w-5 h-5" />
        {effectsEnabled ? 'Disable Effect' : 'Enable Effect'}
      </button>
    </>
  );
}
