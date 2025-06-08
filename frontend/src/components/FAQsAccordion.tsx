"use client";

import React, { useState } from 'react';

const faqItems = [
  {
    q: "Quels types de services informatiques proposez-vous ?",
    a: "Nous proposons une gamme complète de services IT, incluant le développement de logiciels sur mesure, l'installation et la maintenance de matériel informatique, la sécurité des systèmes, et le support technique continu."
  },
  {
    q: "Travaillez-vous avec des entreprises de toutes tailles ?",
    a: "Oui, nous adaptons nos services aux besoins spécifiques de chaque client, que ce soit une petite entreprise locale ou une grande organisation internationale."
  },
  {
    q: "Proposez-vous des services de maintenance régulière ?",
    a: "Absolument. Nous offrons des contrats de maintenance personnalisés pour assurer le bon fonctionnement de vos systèmes informatiques et prévenir les problèmes potentiels."
  },
  {
    q: "Quel est votre délai d'intervention en cas de problème ?",
    a: "Notre équipe est disponible 24/7 pour les urgences. Pour les clients sous contrat de maintenance, nous garantissons une intervention dans les 2 heures pour les problèmes critiques."
  },
  {
    q: "Proposez-vous des solutions de sauvegarde de données ?",
    a: "Oui, nous proposons des solutions de sauvegarde sécurisées, tant sur site que dans le cloud, adaptées à vos besoins de stockage et de sécurité."
  },
  {
    q: "Pouvez-vous m'aider à moderniser mon infrastructure IT ?",
    a: "Absolument. Nous évaluons votre infrastructure actuelle et proposons des solutions de modernisation adaptées à vos objectifs et à votre budget."
  },
  {
    q: "Offrez-vous des formations pour les utilisateurs ?",
    a: "Oui, nous proposons des formations personnalisées pour vos employés sur les nouveaux systèmes et logiciels que nous installons."
  },
  {
    q: "Comment assurez-vous la sécurité des données ?",
    a: "Nous utilisons des protocoles de sécurité de pointe et des solutions de cryptage avancées pour protéger vos données. Nous effectuons également des audits de sécurité réguliers."
  },
  {
    q: "Proposez-vous des solutions cloud ?",
    a: "Oui, nous offrons des solutions cloud complètes, incluant la migration, l'hébergement et la gestion de vos applications et données dans le cloud."
  },
  {
    q: "Quel est le processus pour devenir client ?",
    a: "Le processus commence par une consultation gratuite où nous évaluons vos besoins. Nous établissons ensuite une proposition détaillée et, une fois acceptée, nous planifions la mise en œuvre."
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
                className="w-full text-left p-5 flex justify-between items-center focus:outline-none hover:bg-jarvisGold/20 transition-all duration-300 border-l-4 border-transparent hover:border-jarvisGold"
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
