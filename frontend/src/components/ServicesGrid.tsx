"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceItem {
  title: string;
  icon: string;
  description: string;
  features?: string[];
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
    case 'device':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'support':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
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
              "Applications web responsive",
              "Interfaces utilisateur modernes",
              "Intégration API et services tiers",
              "Développement mobile natif et hybride",
              "Solutions sur-mesure adaptées à vos besoins"
            ]
          };
        case 'device':
          return {
            ...item,
            features: [
              "Caméras de surveillance HD",
              "Écrans et affichage dynamique",
              "Configuration réseau sécurisée",
              "Postes de travail optimisés",
              "Solutions IoT et domotique"
            ]
          };
        case 'support':
          return {
            ...item,
            features: [
              "Support technique 24/7",
              "Monitoring proactif des systèmes",
              "Mises à jour de sécurité régulières",
              "Sauvegardes automatisées",
              "Évolutions fonctionnelles sur demande"
            ]
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
    <section className="py-24 px-6 bg-transparent text-white">
      <div className="container mx-auto py-12">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Nos services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {enrichedItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-monacoBlue/85 rounded-lg shadow-xl p-8 border border-jarvisGold/40 flex flex-col h-full backdrop-blur-sm overflow-hidden relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Élément décoratif */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-jarvisGold/10 rounded-full blur-xl group-hover:bg-jarvisGold/20 transition-all duration-500"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-monacoBlue/30 rounded-full blur-xl group-hover:bg-monacoBlue/40 transition-all duration-500"></div>
              
              {/* Icône avec animation */}
              <motion.div 
                className="mb-6 relative z-10"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
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
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-white text-opacity-80 mb-6 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
              >
                {item.description}
              </motion.p>
              
              {/* Liste des fonctionnalités */}
              <motion.ul 
                className="mt-auto space-y-2 text-white/70 text-sm relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
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
                transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                viewport={{ once: true }}
              >
                <a 
                  href="/services" 
                  className="inline-flex items-center bg-white hover:bg-jarvisGold text-black font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(201,161,61,0.5)]"
                >
                  En savoir plus
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
