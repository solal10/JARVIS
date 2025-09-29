import React from 'react';
import PixelWave from '@/components/PixelWave';
import ClientMotionDiv from '@/components/ClientMotionDiv';
import { serviceSchema } from './schema';

export const metadata = {
  title: "Création Sites Internet & Développement Web | Applications Sur-Mesure | JARVIS",
  description: "Création de sites internet et développement web : sites vitrine, e-commerce, applications sur-mesure, architecture moderne. Conception, maintenance et solutions IT pour entreprises.",
};

const sections = [
  {
    number: 1,
    title: "Phase de cadrage et d'analyse des besoins",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li>
          <strong>Atelier de découverte :</strong> Nous organisons une première réunion avec vos équipes pour comprendre vos enjeux, vos processus internes et vos objectifs à court et long terme. L'idée est de cerner précisément les cas d'usage, les fonctionnalités clés et les contraintes (budgétaires, réglementaires, techniques).
        </li>
        <li>
          <strong>Spécifications fonctionnelles :</strong> À partir des informations recueillies, nous rédigeons un cahier des charges détaillé (backlog) qui liste les user stories, les parcours utilisateurs prioritaires et les critères d'acceptation associés. Cette base de travail sert de référentiel tout au long du projet.
        </li>
        <li>
          <strong>Expertise technologique :</strong> Nous vous conseillons sur le choix des technologies (framework front-end, langage back-end, bases de données, services cloud) en fonction de vos objectifs de performance, de montée en charge et d'évolutivité.
        </li>
      </ul>
    )
  },
  {
    number: 2,
    title: "Conception web & UI/UX",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li>
          <strong>Conception de sites internet :</strong> Notre équipe UX/UI conçoit l'architecture et l'identité visuelle de votre site internet (vitrine, e-commerce, institutionnel). Nous créons des maquettes interactives pour valider l'ergonomie, la navigation et les parcours utilisateurs avant développement.
        </li>
        <li>
          <strong>Identité visuelle web :</strong> Nous développons un design system complet (couleurs, typographies, composants) pour votre site internet, en parfaite harmonie avec votre charte graphique existante. L'objectif est d'offrir une expérience utilisateur fluide, moderne et alignée avec votre image de marque.
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
          <strong>Infrastructure as Code :</strong> Chez JARVIS, nous définissons toute l'infrastructure (serveurs, bases de données, API, stockage d'objets) via des scripts (Terraform, CloudFormation ou équivalents) pour garantir une mise en place reproductible et évolutive.
        </li>
        <li>
          <strong>Microservices et conteneurisation :</strong> Pour les projets nécessitant une forte montée en charge, nous privilégions une architecture microservices orchestrée (Docker/Kubernetes). Cela permet de découpler les fonctionnalités, d'améliorer la résilience et de faciliter les déploiements continus.
        </li>
        <li>
          <strong>Haute disponibilité et autoscaling :</strong> Grâce aux services cloud (AWS, Azure, GCP, ou votre environnement privé), nous configurons des règles d'autoscaling pour ajuster automatiquement la capacité des serveurs en fonction du trafic. Les sauvegardes automatisées et la redondance garantissent la continuité de service.
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
          <strong>Sprints de développement :</strong> JARVIS travaille en cycles courts (1 à 2 semaines), avec des réunions quotidiennes (stand-up) pour suivre l'avancement. À la fin de chaque sprint, nous présentons une version incrémentale de l'application, testable et potentiellement déployable en production.
        </li>
        <li>
          <strong>Revue de code et qualité logicielle :</strong> Chaque ligne de code fait l'objet d'une revue par un pair (code review) pour s'assurer qu'elle respecte nos standards (principes SOLID, tests unitaires/d'intégration, couverture de code minimale). Nous utilisons des outils d'analyse statique (SonarQube, ESLint ou équivalents) pour détecter automatiquement les vulnérabilités et les défauts de performance.
        </li>
        <li>
          <strong>Intégration et déploiement continus (CI/CD) :</strong> Selon les besoins, JARVIS met en place des déploiements progressifs (blue-green, canary releases) pour réduire les risques et pouvoir revenir en arrière rapidement en cas d'anomalie.
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
          <strong>Meilleures pratiques de sécurité :</strong> Chez JARVIS, nous appliquons strictement les principes de sécurité dès la conception (Secure by Design), en chiffrant les données sensibles, en implémentant des mécanismes d'authentification robustes (OAuth 2.0, JWT, gestion des rôles) et en protégeant les API (rate limiting, validation des entrées, whitelist/blacklist).
        </li>
        <li>
          <strong>Conformité RGPD et protection des données :</strong> Nous veillons à respecter la réglementation européenne pour le traitement des données personnelles, en mettant en place des processus d'anonymisation, de consentement explicite et de droit à l'oubli.
        </li>
        <li>
          <strong>Audits réguliers :</strong> Tous les six mois (ou à la fréquence souhaitée), JARVIS réalise un audit de sécurité incluant analyse de code source, tests d'injection SQL, contrôle des politiques CORS/CSP et revue des droits d'accès aux services cloud.
        </li>
      </ul>
    )
  }
];

export default function DevelopmentService() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">Création Sites Internet & Développement</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">Sites web, applications & solutions sur-mesure - Interventions dans toute la France</h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                JARVIS place la rigueur, la transparence et la performance au cœur de chaque projet digital. Qu'il s'agisse de création de sites internet, d'applications web ou mobiles sur-mesure, notre objectif est de livrer des solutions parfaitement adaptées à vos besoins métier, avec une architecture moderne et une expérience utilisateur optimale. Nous intervenons dans toute la France depuis notre base de Monaco. Voici notre approche :
              </p>
            </div>
            {/* Numbered Cards */}
            <div className="space-y-16">
              {sections.map((section, idx) => (
                <ClientMotionDiv
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
                </ClientMotionDiv>
              ))}
            </div>
            <p className="mt-12 text-lg">
              En combinant méthodologie Agile, technologies cloud modernes et une attention constante à la qualité, JARVIS garantit un développement logiciel à la fois performant, sécurisé et aligné avec vos enjeux métier. Vos équipes bénéficient d'une totale transparence sur chaque étape du projet, grâce à des points de suivi réguliers, des livrables intermédiaires et une documentation exhaustive.
            </p>
            <p className="mt-4 text-lg font-semibold text-jarvisGold">
              Notre promesse : un partenariat de confiance, une solution sur-mesure et une réactivité optimale à chaque évolution de votre activité.
            </p>

            {/* Section Services Complémentaires */}
            <div className="mt-20 pt-12 border-t border-jarvisGold/30">
              <h3 className="text-2xl font-bold mb-8 text-center text-jarvisGold">Services Complémentaires</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <a
                  href="/services/support-maintenance"
                  className="block p-6 bg-black/30 border border-jarvisGold/40 rounded-lg hover:border-jarvisGold/70 transition-all duration-300 hover:bg-black/40"
                >
                  <h4 className="text-xl font-semibold mb-3 text-white">Support & Maintenance</h4>
                  <p className="text-white/80">Maintenance proactive de vos applications avec support technique réactif et mises à jour de sécurité.</p>
                </a>
                <a
                  href="/services/audit-conseil-ia"
                  className="block p-6 bg-black/30 border border-jarvisGold/40 rounded-lg hover:border-jarvisGold/70 transition-all duration-300 hover:bg-black/40"
                >
                  <h4 className="text-xl font-semibold mb-3 text-white">Audit & Conseil IA</h4>
                  <p className="text-white/80">Intégrez l'intelligence artificielle dans vos applications pour optimiser les processus métier.</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
} 