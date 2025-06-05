"use client";

import React from 'react';
import BaseHero from '@/components/BaseHero';

export default function DeveloppementService() {
  return (
    <section className="py-24 px-6 bg-transparent text-white">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-left text-jarvisGold">Développement logiciel</h1>
        <h2 className="text-xl font-semibold mb-6 text-left text-white/90">Applications web & mobiles sur‑mesure avec architecture cloud scalable</h2>
        <div className="prose prose-invert max-w-none text-lg">
          <h3>Des solutions sur-mesure pour vos besoins</h3>
          <p>
            Nous concevons et développons des applications web et mobiles adaptées à vos enjeux métiers, en utilisant les technologies les plus modernes pour garantir performance, sécurité et évolutivité.
          </p>
          <ul>
            <li>Applications web & mobiles sur-mesure</li>
            <li>Interfaces utilisateur modernes</li>
            <li>Architecture cloud scalable</li>
            <li>Intégration API & services tiers</li>
            <li>Sécurité & performance optimales</li>
          </ul>
          <h3>Notre approche</h3>
          <p>
            Nous privilégions une démarche agile, avec des livraisons progressives et un accompagnement personnalisé à chaque étape du projet. Notre équipe technique veille à la qualité du code, à la scalabilité des plateformes et à l'innovation continue.
          </p>
        </div>
      </div>
    </section>
  );
} 