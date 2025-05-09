"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, index }) => {
  return (
    <motion.div 
      className="bg-monacoBlue/80 backdrop-blur-sm border border-jarvisGold/40 rounded-lg p-6 shadow-xl h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Service Icon with animation */}
      <motion.div 
        className="mb-6 flex justify-center"
        initial={{ scale: 0.8, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
      >
        <div className="w-24 h-24 relative flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 bg-jarvisGold/20 rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          
          {/* Service-specific icon */}
          {title.includes("Développement") && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-jarvisGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          )}
          
          {title.includes("Intégration") && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-jarvisGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          )}
          
          {title.includes("Maintenance") && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-jarvisGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>
      </motion.div>
      
      {/* Title */}
      <motion.h3 
        className="text-xl font-bold mb-3 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      
      {/* Description */}
      <motion.p 
        className="text-white/80 mb-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
      
      {/* Features */}
      <motion.ul 
        className="mt-4 space-y-2 text-white/70 flex-grow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
        viewport={{ once: true }}
      >
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <span className="text-jarvisGold mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </motion.ul>
      
      {/* Learn more link */}
      <motion.div 
        className="mt-6 pt-4 border-t border-jarvisGold/20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
        viewport={{ once: true }}
      >
        <a 
          href="#contact" 
          className="inline-flex items-center bg-white hover:bg-jarvisGold text-black font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(201,161,61,0.5)]"
        >
          En savoir plus
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default function ServiceCards() {
  const services = [
    {
      title: "Développement & conception logicielle",
      description: "Applications web, mobiles et desktop conçues sur-mesure.",
      features: [
        "Sites web et applications Next.js, React, Vue.js",
        "Applications mobiles iOS et Android",
        "Logiciels métier .NET, Python, Java",
        "Interfaces utilisateur modernes et intuitives",
        "Intégration API et services tiers"
      ]
    },
    {
      title: "Intégration & installation matériel",
      description: "Déploiement et configuration de matériel informatique professionnel.",
      features: [
        "Installation de caméras de surveillance",
        "Configuration d&apos;écrans et systèmes d&apos;affichage",
        "Mise en place de postes de travail",
        "Configuration réseau et sécurité",
        "Solutions domotiques et IoT"
      ]
    },
    {
      title: "Maintenance & support continu",
      description: "Accompagnement technique et évolutions sur le long terme.",
      features: [
        "Contrats de maintenance personnalisés",
        "Monitoring proactif des systèmes",
        "Support technique réactif",
        "Mises à jour de sécurité régulières",
        "Évolutions fonctionnelles sur demande"
      ]
    }
  ];

  return (
    <section className="py-12 px-6 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-monacoBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-jarvisGold/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Nos expertises</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Des solutions complètes, du développement logiciel à l&apos;installation matérielle, avec un support continu pour garantir la pérennité de vos systèmes.</p>
        </div>
        
        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              index={index}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
