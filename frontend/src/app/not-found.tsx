'use client'

import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Page non trouvée | JARVIS",
  description: "La page que vous cherchez n&apos;existe pas ou a été déplacée.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-jarvisGold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Page non trouvée
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-md mx-auto">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-jarvisGold hover:bg-jarvisGold/80 text-black font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
          >
            Retour à l'accueil
          </Link>

          <div className="text-white/60">
            <p className="mb-4">Ou explorez nos services :</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/services/developpement-logiciel" className="text-jarvisGold hover:text-white transition-colors">
                Développement
              </Link>
              <Link href="/services/audit-conseil-ia" className="text-jarvisGold hover:text-white transition-colors">
                Audit IA
              </Link>
              <Link href="/contact" className="text-jarvisGold hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}