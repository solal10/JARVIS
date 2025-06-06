"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TeamMember {
  photo: string;
  name: string;
  role: string;
  bio?: string;
}

interface TeamGridProps {
  members?: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  // Utiliser les membres fournis ou des membres par défaut
  const teamMembers = members || [
    { photo: "/img/thomas.jpg", name: "Thomas Benichou", role: "Associé · CTO" },
    { photo: "/img/sacha.jpg", name: "Sacha Benichou", role: "Co-gérant · COO" },
    { photo: "/img/team.jpg", name: "Équipe Dev", role: "Ingénieurs & créatifs" }
  ];

  return (
    <section className="py-16 px-6 bg-transparent text-white">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Notre équipe
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-monacoBlue/80 rounded-lg shadow-xl border border-jarvisGold/40 p-8 backdrop-blur-sm relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Éléments décoratifs */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-jarvisGold/5 rounded-full blur-xl group-hover:bg-jarvisGold/10 transition-all duration-500"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-monacoBlue/20 rounded-full blur-xl group-hover:bg-monacoBlue/30 transition-all duration-500"></div>
              
              {/* Photo de profil avec animation */}
              <motion.div 
                className="w-36 h-36 rounded-full mx-auto mb-6 overflow-hidden bg-gray-200 relative"
                initial={{ scale: 0.8, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Effet de lueur */}
                <div className="absolute inset-0 bg-jarvisGold/20 rounded-full blur-md group-hover:bg-jarvisGold/30 transition-all duration-300"></div>
                
                {/* Photo ou initiale */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {member.photo ? (
                    <Image 
                      src={member.photo} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-monacoBlue/50 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">{member.name[0]}</span>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Informations */}
              <motion.div 
                className="text-center relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-1 text-white">{member.name}</h3>
                <p className="text-jarvisGold font-medium mb-4">{member.role}</p>
                {member.bio && (
                  <p className="text-white/70 text-sm mb-4">{member.bio}</p>
                )}
                
                {/* Réseaux sociaux */}
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="#" className="text-white/70 hover:text-jarvisGold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-jarvisGold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
