"use client";

import React, { useState } from 'react';

const faqItems = [
  {
    q: "Quels services proposez-vous pour les entreprises ?",
    a: "JARVIS propose une gamme complète de services IT : création et conception de sites internet, développement d'applications web/mobile sur-mesure, audit intelligence artificielle, solutions web-marketing et SEO, financement pour start-ups, maintenance et support technique. Nous intervenons dans toute la France depuis Monaco."
  },
  {
    q: "Intervenez-vous partout en France pour le développement logiciel ?",
    a: "Oui, JARVIS intervient dans toute la France pour le développement logiciel et l'audit IA. Nous travaillons à distance avec des entreprises de toutes tailles, des start-ups aux grands groupes. Basés à Monaco, nous servons des clients partout en France, Suisse et Belgique."
  },
  {
    q: "Combien de temps prend la création d'un site internet ?",
    a: "La création d'un site internet prend entre 2 et 8 semaines selon la complexité (site vitrine, e-commerce, application web). JARVIS établit un calendrier précis lors de la consultation initiale, avec des livrables progressifs et une méthodologie agile pour les projets urgents."
  },
  {
    q: "Assurez-vous la maintenance des sites internet après livraison ?",
    a: "Oui, JARVIS assure la maintenance complète de votre site internet : mises à jour de sécurité, sauvegardes automatiques, monitoring, corrections de bugs et évolutions fonctionnelles. Nous proposons plusieurs formules de maintenance adaptées à vos besoins, avec support technique réactif."
  },
  {
    q: "Comment assurez-vous la sécurité des applications et données ?",
    a: "La sécurité est notre priorité absolue. JARVIS implémente les dernières normes de cryptage, effectue des audits de sécurité réguliers et suit les meilleures pratiques RGPD. Tous nos développements intègrent le principe de 'security by design' avec formations cybersécurité et solutions de sauvegarde redondantes."
  },
  {
    q: "Avec quelles technologies créez-vous les sites internet ?",
    a: "Nous maîtrisons toutes les technologies modernes pour la création de sites : React, Next.js, Vue.js pour le frontend, Node.js, Python pour le backend, WordPress pour les sites vitrine, Shopify/WooCommerce pour l'e-commerce. Nous choisissons toujours la technologie la plus adaptée à votre projet et budget."
  },
  {
    q: "Accompagnez-vous les start-ups avec financement et développement ?",
    a: "JARVIS propose une offre unique pour start-ups : financement hybride, accompagnement stratégique et développement technique. Solutions investisseurs et entrepreneurs France, Suisse, Belgique avec accès privilegié aux fonds, expertise opérationnelle et réseau de partenaires stratégiques."
  },
  {
    q: "Proposez-vous des services de web-marketing et SEO ?",
    a: "Oui, JARVIS propose des solutions web-marketing complètes : stratégie digitale, SEO référencement, campagnes publicitaires, analytics. Agence marketing digital pour entreprises francophones avec formation équipes, coaching mensuel et support dédié heures ouvrées."
  },
  {
    q: "Travaillez-vous hors de Monaco et de la France ?",
    a: "Oui, JARVIS intervient à l'international pour les projets logiciels. Notre équipe peut se déplacer partout en Europe et collabore à distance avec des clients du monde entier. Nous avons déjà réalisé des projets en France, Suisse, Royaume-Uni et États-Unis."
  },
  {
    q: "Comment démarrer la création de mon site internet ?",
    a: "Tout commence par un audit gratuit de vos besoins : objectifs du site, public cible, fonctionnalités souhaitées, budget. Nous établissons ensuite une proposition détaillée avec maquettes, technologies recommandées, calendrier et tarification transparente. Une fois validée, nous lançons la création avec un suivi régulier."
  }
];

export default function FAQsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 text-white">
      <div className="container mx-auto max-w-4xl py-12">
        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <div key={index} className="backdrop-blur-sm border border-jarvisGold/40 rounded-lg p-6 shadow-xl h-full flex flex-col transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-2 right-2 w-12 h-12 bg-jarvisGold/10 rounded-full blur-lg"></div>
              <div className="absolute bottom-2 left-2 w-16 h-16 bg-monacoBlue/30 rounded-full blur-lg"></div>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-jarvisGold focus:ring-opacity-50 hover:bg-jarvisGold/20 transition-all duration-300 border-l-4 border-transparent hover:border-jarvisGold"
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
                id={`faq-button-${index}`}
              >
                <h3 className="text-xl font-semibold text-white">{faq.q}</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                id={`faq-content-${index}`}
                role="region"
                aria-labelledby={`faq-button-${index}`}
              >
                <p className="p-5 pt-0 text-white text-opacity-90 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
