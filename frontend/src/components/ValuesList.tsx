"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ValueItem {
  title: string;
  icon: string;
  desc: string;
}

interface ValuesListProps {
  items?: ValueItem[];
}

// Composant pour l'icône de cube
const CubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-jarvisGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export default function ValuesList({ items }: ValuesListProps) {
  // Utiliser les valeurs fournies ou des valeurs par défaut
  const values = items || [
    { title: "Innovation continue", icon: "cube", desc: "Explorer de nouvelles technologies pour créer plus de valeur." },
    { title: "Qualité & fiabilité", icon: "cube", desc: "Des solutions robustes, testées et documentées." },
    { title: "Transparence & éthique", icon: "cube", desc: "Communication claire et respect des normes." }
  ];

  return (
    <section className="py-12 px-6 text-white">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Nos valeurs clés
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-monacoBlue/30 backdrop-blur-sm p-6 rounded-lg border-l-4 border-jarvisGold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 bg-monacoBlue/60 p-4 rounded-full">
                  <CubeIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-center md:text-left">{value.title}</h3>
                  <p className="text-white/80 text-center md:text-left">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
