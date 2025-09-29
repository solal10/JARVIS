"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from './Motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { href: '/', text: 'Accueil' },
  { href: '/services/developpement-logiciel', text: 'Développement' },
  { href: '/services/audit-conseil-ia', text: 'Audit IA' },
  { href: '/services/offre-jarvis-start-ups', text: 'Startup' },
  { href: '/services/solutions-web-marketing', text: 'Marketing' },
  { href: '/services/support-maintenance', text: 'Support' },
  { href: '/a-propos', text: 'À propos' },
  { href: '/faq', text: 'FAQ' },
  { href: '/contact', text: 'Contact' }
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-label="Fermer le menu"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-64 bg-black/90 backdrop-blur-md z-50 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation mobile"
          >
            <div className="flex flex-col p-6">
              <button
                onClick={onClose}
                className="self-end text-white hover:text-jarvisGold transition-colors mb-8"
                aria-label="Fermer le menu mobile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <nav className="flex flex-col space-y-4" role="navigation" aria-label="Navigation principale mobile">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-jarvisGold transition-colors text-lg font-medium py-2"
                    onClick={onClose}
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
