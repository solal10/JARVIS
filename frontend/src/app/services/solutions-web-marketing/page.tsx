"use client";

import React from 'react';
import { motion } from 'framer-motion';
import PixelWave from '@/components/PixelWave';

const sections = [
  {
    number: 1,
    title: "Stratégie digitale",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Diagnostic initial et positionnement :</strong> Nous démarrons par un audit complet de votre présence en ligne (site web, réseaux sociaux, contenus, campagnes existantes). L&apos;objectif est d&apos;identifier vos forces, vos faiblesses et les opportunités à court et moyen terme. À partir de cette analyse, nous définissons vos objectifs (notoriété, génération de leads, e-commerce, acquisition d&apos;utilisateurs) et vos indicateurs clés de performance (KPIs).</li>
        <li><strong>Persona et ciblage :</strong> Grâce à des ateliers collaboratifs, nous dressons le profil de vos cibles prioritaires (persona) en prenant en compte leur comportement en ligne, leurs freins et leurs motivations. Ce travail permet de calibrer le message, le ton et les canaux à privilégier pour atteindre efficacement chaque segment.</li>
        <li><strong>Plan d&apos;action multicanal :</strong> Nous élaborons un plan d&apos;action détaillé, réparti par canal (SEO, réseaux sociaux, e-mailing, publicités payantes, partenariats), avec un calendrier précis et un budget prévisionnel. À chaque étape, nous définissons les ressources nécessaires (interne, externe) et les livrables attendus (contenus, visuels, templates d&apos;e-mail).</li>
        <li><strong>Pilotage et gouvernance :</strong> Un comité de pilotage est organisé mensuellement pour faire le point sur l&apos;avancement, analyser les résultats et ajuster le plan en fonction des performances observées. Vous disposez ainsi d&apos;un reporting clair et d&apos;un suivi transparent de chaque action.</li>
      </ul>
    )
  },
  {
    number: 2,
    title: "SEO & Référencement",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Audit technique et sémantique :</strong> Nous commençons par une analyse technique de votre site (structure, maillage interne, vitesse de chargement, conformité mobile) ainsi qu&apos;une étude sémantique pour identifier les mots-clés stratégiques. Cette double approche nous permet de corriger rapidement les freins techniques tout en ciblant les requêtes à fort potentiel.</li>
        <li><strong>Optimisation on-page :</strong> À partir des mots-clés ciblés, nous optimisons les balises (title, meta description, Hn), le contenu rédactionnel (densité, champ lexical, qualité éditoriale) et les images (attributs alt, compression). Nous mettons également en place un maillage interne cohérent pour diffuser l&apos;autorité sur les pages prioritaires.</li>
        <li><strong>Netlinking et popularité :</strong> Pour renforcer la crédibilité de votre domaine, nous élaborons un plan de netlinking fondé sur des partenariats éditoriaux, des articles invités et des relations presse en ligne. Chaque nouveau backlink est suivi pour s&apos;assurer de sa qualité et de sa pertinence.</li>
        <li><strong>Suivi et reporting :</strong> Nous configurons Google Search Console, Google Analytics et un outil SEO tiers (Ahrefs, Semrush ou équivalent) pour mesurer mensuellement l&apos;évolution de vos positions, le trafic organique, le taux de clics (CTR) et les conversions issues du SEO. Un rapport synthétique vous est remis avec des recommandations d&apos;ajustement.</li>
      </ul>
    )
  },
  {
    number: 3,
    title: "Analytics & Reporting",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Mise en place des outils de suivi :</strong> Notre équipe installe et paramètre Google Analytics 4 (ou une solution alternative comme Matomo), Google Tag Manager, ainsi que les événements clés (clics, téléchargements, formulaires). Nous veillons à la conformité RGPD en anonymisant les données personnelles et en installant un système de consentement aux cookies.</li>
        <li><strong>Tableaux de bord personnalisés :</strong> À l&apos;aide de Google Data Studio (Looker Studio) ou d&apos;outils équivalents, nous créons des dashboards sur mesure pour visualiser les performances de chaque canal : référencement naturel, campagnes payantes, réseaux sociaux, e-mailing. Vous suivez en temps réel le taux de conversion, le coût par acquisition (CPA), la valeur moyenne par visiteur et les parcours utilisateurs.</li>
        <li><strong>Segmentation et insights :</strong> Grâce à la segmentation (nouveaux visiteurs vs. visiteurs récurrents, mobile vs. desktop, géographie, source de trafic), nous mettons en évidence les segments les plus rentables et ceux à optimiser. Ces informations orientent la répartition du budget et les priorités d&apos;investissement.</li>
        <li><strong>A/B Testing et optimisation :</strong> Pour maximiser les performances, nous mettons en place des tests A/B sur vos pages critiques (landing pages, pages d&apos;inscription, tunnels de conversion). Les résultats, analysés statistiquement, permettent de retenir la version la plus efficace et d&apos;améliorer en continu le taux de conversion global.</li>
      </ul>
    )
  },
  {
    number: 4,
    title: "Campagnes marketing",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Définition des objectifs et ciblage :</strong> Chaque campagne démarre par la définition claire de l&apos;objectif (acquisition de leads, vente en ligne, notoriété, téléchargements d&apos;application). Nous déterminons l&apos;audience cible avec précision (critères démographiques, intérêts, comportements) afin de maximiser la pertinence des messages.</li>
        <li><strong>Création des visuels et messages :</strong> Nos designers et rédacteurs conçoivent des visuels adaptés à chaque format (bannières, carrousels, vidéos courtes) et des textes accrocheurs. Plusieurs variantes sont préparées pour tester différentes accroches, incitations à l&apos;action (CTA) et angles de communication.</li>
        <li><strong>Paramétrage et lancement :</strong> Nous prenons en charge la configuration des campagnes sur les plateformes publicitaires (Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, etc.) : choix du type d&apos;enchères (CPC, CPM, CPA), définition des audiences (lookalike, retargeting), calendrier de diffusion et budget quotidien.</li>
        <li><strong>Suivi quotidien et ajustements :</strong> Durant la période de diffusion, notre équipe surveille quotidiennement les indicateurs clés (impressions, clics, CPC, CTR, taux de conversion, CPA). En fonction des performances, nous ajustons les enchères, réaffectons le budget aux annonces les plus performantes et supprimons les audiences sous-perfomantes.</li>
        <li><strong>Bilan et recommandations :</strong> À la fin de chaque campagne, un rapport détaillé vous est remis : objectifs initiaux vs. résultats obtenus, leçon tirée (heures et jours de pointe, visuel le plus performant, segment le plus rentable) et pistes d&apos;amélioration pour les prochaines actions.</li>
      </ul>
    )
  },
  {
    number: 5,
    title: "Formation & accompagnement",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Ateliers pratiques sur mesure :</strong> Nous organisons des sessions de formation adaptées à vos besoins :
          <ul className="list-disc pl-6 mt-2">
            <li>Google Analytics & Google Tag Manager : configuration avancée, création de rapports, interprétation des données.</li>
            <li>Rédaction SEO : bonnes pratiques pour optimiser le contenu, structurer un article, intégrer les mots-clés à forte valeur ajoutée.</li>
            <li>Publicité en ligne : paramétrage des campagnes Google Ads et Meta Ads, choix des enchères, optimisation des budgets.</li>
            <li>Réseaux sociaux : création et gestion de pages professionnelles, planification éditoriale, analyse des statistiques natives.</li>
          </ul>
        </li>
        <li><strong>Coaching stratégique mensuel :</strong> Chaque mois, un rendez-vous est fixé pour :
          <ul className="list-disc pl-6 mt-2">
            <li>Analyser ensemble les performances globales (SEO, campagnes, trafic).</li>
            <li>Ajuster la stratégie en fonction des résultats et des nouvelles tendances du marché.</li>
            <li>Répondre à vos questions et partager des bonnes pratiques spécifiques à votre secteur d&apos;activité.</li>
          </ul>
        </li>
        <li><strong>Documentation et ressources :</strong> Vous recevez des guides pratiques (check-lists SEO mensuelles, modèles de planning éditorial, templates d&apos;e-mailings) que vous pouvez réutiliser en interne. Des tutoriels vidéo enregistrés lors des formations permettent à vos équipes de se référer aux concepts à tout moment.</li>
        <li><strong>Support dédié en heures ouvrées :</strong> Pour toute question ponctuelle (choix des mots-clés, interprétation d&apos;un graphique Analytics, optimisation d&apos;une landing page), notre équipe reste disponible du lundi au vendredi, de 9 h à 18 h (heure de Paris). Les demandes reçues en dehors de ces créneaux sont traitées le jour ouvré suivant.</li>
      </ul>
    )
  }
];

export default function MarketingService() {
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
            <div className="w-full pt-32 pb-16 px-6 text-center mb-32">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">Solutions Web-Marketing</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">Notre approche des Solutions Web-Marketing chez JARVIS</h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Chez JARVIS, nous considérons le web-marketing comme un levier essentiel pour accroître votre visibilité, générer des leads qualifiés et fidéliser votre audience. Plutôt que d&apos;appliquer une démarche générique, nous construisons pour chaque client une stratégie personnalisée, fondée sur l&apos;analyse de vos besoins et le suivi constant des indicateurs. Voici comment nous structurons notre offre :
              </p>
            </div>
            {/* Main Content */}
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
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 