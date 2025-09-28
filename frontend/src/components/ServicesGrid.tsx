"use client";

import React from 'react';
import { motion } from './Motion';
import Link from 'next/link';

interface ServiceItem {
  title: string;
  icon: string;
  description: string;
  features?: string[];
  highlight?: boolean;
  route: string;
}

interface ServicesGridProps {
  items: ServiceItem[];
}

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'code':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'support':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'marketing':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      );
    case 'startup':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ServicesGrid({ items }: ServicesGridProps) {
  // Enrichir les items avec des fonctionnalités supplémentaires si elles n'existent pas
  const enrichedItems = items.map(item => {
    // Ajouter des fonctionnalités par défaut si elles n'existent pas
    if (!item.features) {
      switch (item.icon) {
        case 'code':
          return {
            ...item,
            features: [
              "Applications web & mobiles sur-mesure",
              "Interfaces utilisateur modernes",
              "Architecture cloud scalable",
              "Intégration API & services tiers",
              "Sécurité & performance optimales"
            ]
          };
        case 'support':
          return {
            ...item,
            features: [
              "Audit et évaluation de l'IA",
              "Agents IA et chatbots",
              "Automatisation des processus",
              "Formation et accompagnement",
              "Solutions IA sur-mesure"
            ]
          };
        case 'marketing':
          return {
            ...item,
            features: [
              "Stratégie digitale",
              "SEO & référencement",
              "Analytics & reporting",
              "Campagnes marketing",
              "Formation & accompagnement"
            ]
          };
        case 'startup':
          return {
            ...item,
            features: [
              "Développement à coût réduit",
              "Participation au capital",
              "Accompagnement stratégique",
              "Réseau d'investisseurs",
              "Support privilégié"
            ],
            highlight: true
          };
        default:
          return {
            ...item,
            features: ["Fonctionnalité 1", "Fonctionnalité 2", "Fonctionnalité 3"]
          };
      }
    }
    return item;
  });

  return (
    <section className="py-24 bg-transparent text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Nos services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {enrichedItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="backdrop-blur-sm border border-jarvisGold/40 rounded-lg p-6 shadow-xl h-full flex flex-col overflow-hidden relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1)' }}
            >
              {/* Élément décoratif */}
              <div className="absolute top-2 right-2 w-12 h-12 bg-jarvisGold/10 rounded-full blur-lg group-hover:bg-jarvisGold/20 transition-all duration-500"></div>
              <div className="absolute bottom-2 left-2 w-16 h-16 bg-monacoBlue/30 rounded-full blur-lg group-hover:bg-monacoBlue/40 transition-all duration-500"></div>
              
              {/* Icône avec animation */}
              <motion.div 
                className="mb-6 relative z-10"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 + 0.1 }}
                viewport={{ once: true }}
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-jarvisGold/10 rounded-full blur-md"></div>
                  <IconComponent icon={item.icon} />
                </div>
              </motion.div>
              
              {/* Titre et description */}
              <motion.h3 
                className="text-2xl font-bold mb-3 text-white relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: index * 0.01 + 0.08 }}
                viewport={{ once: true }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-white text-opacity-80 mb-6 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 + 0.2 }}
                viewport={{ once: true }}
              >
                {item.description}
              </motion.p>
              
              {/* Liste des fonctionnalités */}
              <motion.ul 
                className="mt-auto space-y-2 text-white/70 text-sm relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 + 0.25 }}
                viewport={{ once: true }}
              >
                {item.features?.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-jarvisGold mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </motion.ul>
              
              {/* Bouton */}
              <motion.div 
                className="mt-6 pt-4 border-t border-jarvisGold/20 text-center relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 + 0.3 }}
                viewport={{ once: true }}
              >
                <Link 
                  href={item.route}
                  className="inline-flex items-center bg-white hover:bg-jarvisGold text-black font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(201,161,61,0.5)]"
                >
                  En savoir plus
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
