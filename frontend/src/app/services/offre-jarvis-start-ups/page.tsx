"use client";

import React from 'react';
import BaseHero from '@/components/BaseHero';

export default function StartupService() {
  return (
    <section className="py-24 px-6 bg-transparent text-white">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-left text-jarvisGold">Offre Jarvis Start-ups & Investisseurs</h1>
        <h2 className="text-xl font-semibold mb-6 text-left text-white/90">Financement hybride et accompagnement stratégique pour start-ups</h2>
        <div className="prose prose-invert max-w-none text-lg">
          <p>
            Que vous soyez investisseur à la recherche d'opportunités à la fois sûres et performantes, ou start-up en quête de ressources pour passer de la simple idée au lancement concret, notre modèle économique hybride a été pensé pour vous réunir autour d'un même objectif : faire éclore l'innovation sans jamais compromettre votre capital.
          </p>
          <h3>Un cadre clair et partagé dès le démarrage</h3>
          <ul>
            <li><strong>Pour l'investisseur</strong> : un capital initial 100 % garanti, préservé tant que les résultats ne sont pas au rendez-vous.</li>
            <li><strong>Pour l'entrepreneur</strong> : la promesse d'un financement progressif, débloqué uniquement au franchissement de chaque jalon validé, pour avancer pas à pas en toute sérénité.</li>
          </ul>
          <h3>Notre accompagnement à chaque phase clé</h3>
          <p>
            À chaque phase clé — de la validation du prototype à la première traction utilisateur — notre équipe apporte son expertise (technique, marketing, business) et ouvre l'accès à des ressources nouvelles. Quand votre projet prouve sa viabilité, nous créons ensemble une structure dédiée où investisseurs et porteurs de projets deviennent associés, partageant équitablement le succès et les perspectives de croissance future.
          </p>
          <blockquote className="border-l-4 border-jarvisGold pl-4 text-lg font-semibold bg-monacoBlue/30 py-4 my-8">
            « Ici, votre capital reste inviolable ; seul le succès mérite d'être récompensé. »
          </blockquote>
          <p>
            Rejoignez un dispositif hybride où sécurité et agilité se conjuguent pour nourrir vos ambitions, qu'elles soient financières ou entrepreneuriales. Prêts à écrire la prochaine page de votre réussite ? Parlons-en dès aujourd'hui.
          </p>
        </div>
      </div>
    </section>
  );
} 