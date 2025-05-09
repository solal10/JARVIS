"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTAAbout() {
  return (
    <section className="py-16 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-monacoBlue/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-jarvisGold/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.6, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto bg-monacoBlue/90 backdrop-blur-md p-10 md:p-12 rounded-xl border-2 border-jarvisGold shadow-2xl shadow-jarvisGold/30 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-jarvisGold">Vous partagez</span> notre vision ?
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <Link 
              href="/contact" 
              className="inline-block px-8 py-3 bg-white hover:bg-jarvisGold text-black font-bold rounded-md transition-colors duration-300 text-lg uppercase tracking-wider shadow-lg hover:shadow-xl"
            >
              Contactez-nous
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
