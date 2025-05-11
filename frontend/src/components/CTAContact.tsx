"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CTAContactProps {
  title?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  className?: string;
}

export default function CTAContact({
  title = "Parlons de votre projet",
  buttonLabel = "Nous contacter",
  buttonUrl = "/contact",
  className = ""
}: CTAContactProps) {
  return (
    <section className={`py-20 md:py-24 text-white relative overflow-hidden ${className}`}>
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
          className="max-w-4xl mx-auto bg-monacoBlue/70 backdrop-blur-sm p-10 md:p-12 rounded-xl border border-jarvisGold/50 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Nous sommes à votre disposition pour étudier vos besoins et vous proposer une solution sur-mesure adaptée à vos objectifs.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href={buttonUrl} 
                className="inline-flex items-center bg-white hover:bg-jarvisGold text-black font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(201,161,61,0.6)]"
              >
                {buttonLabel}
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex justify-center space-x-6 text-white/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-jarvisGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+377 99 99 99 99</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-jarvisGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contact@jarvis-monaco.com</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
