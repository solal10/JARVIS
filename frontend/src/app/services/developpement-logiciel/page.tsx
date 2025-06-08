"use client";

import React from 'react';
import { motion } from 'framer-motion';
import PixelWave from '@/components/PixelWave';

const sections = [
  {
    number: 1,
    title: "Phase de cadrage et d&apos;analyse des besoins",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li>
          <strong>Atelier de découverte :</strong> Nous organisons une première réunion avec vos équipes pour comprendre vos enjeux, vos processus internes et vos objectifs à court et long terme. L&apos;idée est de cerner précisément les cas d&apos;usage, les fonctionnalités clés et les contraintes (budgétaires, réglementaires, techniques).
        </li>
        <li>
          <strong>Spécifications fonctionnelles :</strong> À partir des informations recueillies, nous rédigeons un cahier des charges détaillé (backlog) qui liste les user stories, les parcours utilisateurs prioritaires et les critères d&apos;acceptation associés. Cette base de travail sert de référentiel tout au long du projet.
        </li>
        <li>
          <strong>Expertise technologique :</strong> Nous vous conseillons sur le choix des technologies (framework front-end, langage back-end, bases de données, services cloud) en fonction de vos objectifs de performance, de montée en charge et d&apos;évolutivité.
        </li>
      </ul>
    )
  },
  {
    number: 2,
    title: "Conception UI/UX et prototypage",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li>
          <strong>Wireframes et maquettes interactives :</strong> Notre équipe UX chez JARVIS conçoit des maquettes basse et haute fidélité pour illustrer l&apos;ergonomie des interfaces et valider les parcours utilisateurs (connexion, navigation, transactions…). Chaque maquette est soumise à vos retours avant de passer à l&apos;étape de développement.
        </li>
        <li>
          <strong>Design system et charte graphique :</strong> Nous développons un référentiel visuel (couleurs, typographies, composants réutilisables) afin d&apos;assurer une cohérence graphique et faciliter la maintenance future. L&apos;objectif est d&apos;offrir une expérience fluide, intuitive et alignée avec votre image de marque.
        </li>
      </ul>
    )
  },
  {
    number: 3,
    title: "Architecture cloud scalable",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li>
          <strong>Infrastructure as Code :</strong> Chez JARVIS, nous définissons toute l&apos;infrastructure (serveurs, bases de données, API, stockage d&apos;objets) via des scripts (Terraform, CloudFormation ou équivalents) pour garantir une mise en place reproductible et évolutive.
        </li>
        <li>
          <strong>Microservices et conteneurisation :</strong> Pour les projets nécessitant une forte montée en charge, nous privilégions une architecture microservices orchestrée (Docker/Kubernetes). Cela permet de découpler les fonctionnalités, d&apos;améliorer la résilience et de faciliter les déploiements continus.
        </li>
        <li>
          <strong>Haute disponibilité et autoscaling :</strong> Grâce aux services cloud (AWS, Azure, GCP, ou votre environnement privé), nous configurons des règles d&apos;autoscaling pour ajuster automatiquement la capacité des serveurs en fonction du trafic. Les sauvegardes automatisées et la redondance garantissent la continuité de service.
        </li>
      </ul>
    )
  },
  {
    number: 4,
    title: "Développement Agile et méthode itérative",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li>
          <strong>Sprints de développement :</strong> JARVIS travaille en cycles courts (1 à 2 semaines), avec des réunions quotidiennes (stand-up) pour suivre l&apos;avancement. À la fin de chaque sprint, nous présentons une version incrémentale de l&apos;application, testable et potentiellement déployable en production.
        </li>
        <li>
          <strong>Revue de code et qualité logicielle :</strong> Chaque ligne de code fait l&apos;objet d&apos;une revue par un pair (code review) pour s&apos;assurer qu&apos;elle respecte nos standards (principes SOLID, tests unitaires/d&apos;intégration, couverture de code minimale). Nous utilisons des outils d&apos;analyse statique (SonarQube, ESLint ou équivalents) pour détecter automatiquement les vulnérabilités et les défauts de performance.
        </li>
        <li>
          <strong>Intégration et déploiement continus (CI/CD) :</strong> Selon les besoins, JARVIS met en place des déploiements progressifs (blue-green, canary releases) pour réduire les risques et pouvoir revenir en arrière rapidement en cas d&apos;anomalie.
        </li>
      </ul>
    )
  },
  {
    number: 5,
    title: "Sécurité et conformité",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li>
          <strong>Meilleures pratiques de sécurité :</strong> Chez JARVIS, nous appliquons strictement les principes de sécurité dès la conception (Secure by Design), en chiffrant les données sensibles, en implémentant des mécanismes d&apos;authentification robustes (OAuth 2.0, JWT, gestion des rôles) et en protégeant les API (rate limiting, validation des entrées, whitelist/blacklist).
        </li>
        <li>
          <strong>Conformité RGPD et protection des données :</strong> Nous veillons à respecter la réglementation européenne pour le traitement des données personnelles, en mettant en place des processus d&apos;anonymisation, de consentement explicite et de droit à l&apos;oubli.
        </li>
        <li>
          <strong>Audits réguliers :</strong> Tous les six mois (ou à la fréquence souhaitée), JARVIS réalise un audit de sécurité incluant analyse de code source, tests d&apos;injection SQL, contrôle des politiques CORS/CSP et revue des droits d&apos;accès aux services cloud.
        </li>
      </ul>
    )
  }
];

export default function DevelopmentService() {
  return (
    <div className="relative min-h-screen">
      {/* PixelWave background animation */}
      <div className="fixed inset-0 z-0 opacity-80">
        <PixelWave
          colors={['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32']}
          pixelSize={20}
          speed={1.1}
          fade={0.15}
          mouseTracking={true}
          initialEnabled={true}
        />
      </div>

      {/* Fixed decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-monacoBlue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-jarvisGold/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <section className="py-24 px-6 bg-transparent text-white">
          <div className="max-w-screen-md mx-auto">
            {/* Hero Section */}
            <div className="w-full pt-24 pb-16 px-6 text-center mb-32">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">Développement Logiciel</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">Notre approche du développement logiciel chez JARVIS</h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Chez JARVIS, nous plaçons la rigueur, la transparence et la performance au cœur de chaque projet de développement logiciel. Qu&apos;il s&apos;agisse d&apos;applications web ou mobiles sur-mesure, notre objectif est de livrer des solutions parfaitement adaptées à vos besoins métier, tout en garantissant une architecture cloud scalable et une expérience utilisateur optimale. Voici comment nous procédons :
              </p>
            </div>
            {/* Numbered Cards */}
            <div className="space-y-16">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.number}
                  className="group backdrop-blur-sm border border-jarvisGold/40 rounded-lg p-6 shadow-xl h-full flex flex-col relative overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1)' }}
                >
                  <div className="absolute top-2 right-2 w-12 h-12 bg-jarvisGold/10 rounded-full blur-lg group-hover:bg-jarvisGold/20 transition-all duration-500"></div>
                  <div className="absolute bottom-2 left-2 w-16 h-16 bg-monacoBlue/30 rounded-full blur-lg group-hover:bg-monacoBlue/40 transition-all duration-500"></div>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jarvisGold text-black flex items-center justify-center text-2xl font-bold shadow-md mt-1">
                    {section.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-12 text-lg">
              En combinant méthodologie Agile, technologies cloud modernes et une attention constante à la qualité, JARVIS garantit un développement logiciel à la fois performant, sécurisé et aligné avec vos enjeux métier. Vos équipes bénéficient d&apos;une totale transparence sur chaque étape du projet, grâce à des points de suivi réguliers, des livrables intermédiaires et une documentation exhaustive.
            </p>
            <p className="mt-4 text-lg font-semibold text-jarvisGold">
              Notre promesse : un partenariat de confiance, une solution sur-mesure et une réactivité optimale à chaque évolution de votre activité.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 