"use client";

import React from 'react';
import { motion } from 'framer-motion';
import PixelWave from '@/components/PixelWave';

const sections = [
  {
    number: 1,
    title: "Support technique – Horaires et modalités",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Disponibilité sur les horaires ouvrés :</strong> Notre équipe de support est joignable du lundi au vendredi, de 9 h à 18 h (heure de Paris), par e-mail et par téléphone. En dehors de ces horaires, une boîte vocale ou un système de ticketing vous permet de nous laisser un message, repris au début de la plage suivante.</li>
        <li><strong>Catégorisation et priorisation des demandes :</strong> Chaque demande est classée selon son impact :
          <ul className="list-disc pl-6 mt-2">
            <li>Critique (indisponibilité totale ou blocage complet) : prise en charge sous 2 heures ouvrées.</li>
            <li>Majeure (fonctionnalité dégradée impactant plusieurs utilisateurs) : prise en charge sous 4 heures ouvrées.</li>
            <li>Mineure (anomalie non bloquante ou question d&apos;usage) : prise en charge sous 1 jour ouvré, correction dans le prochain cycle de maintenance planifié.</li>
          </ul>
        </li>
        <li><strong>Processus d&apos;escalade :</strong> En cas de bug critique non résolu dans les délais, nous faisons remonter immédiatement l&apos;incident à un référent technique senior. Un rapport d&apos;incident vous est communiqué à l&apos;issue de la résolution pour expliquer la cause et les corrections apportées.</li>
      </ul>
    )
  },
  {
    number: 2,
    title: "Monitoring proactif et alerting",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Surveillance en continu des indicateurs clés :</strong> Nous mettons en place un système de monitoring (Datadog, Grafana ou solution cloud native) pour vérifier la disponibilité de vos services, les temps de réponse critiques, le taux d&apos;erreurs (4xx/5xx) et l&apos;utilisation des ressources (CPU, mémoire, stockage).</li>
        <li><strong>Alertes automatiques dans les heures ouvrées :</strong> Les seuils d&apos;alerte sont configurés pour déclencher une notification par e-mail ou SMS à l&apos;équipe d&apos;astreinte dès qu&apos;un indicateur dépasse la norme. Les alertes sont traitées durant nos plages de support (9 h – 18 h, du lundi au vendredi).</li>
        <li><strong>Rapport de suivi mensuel :</strong> Vous recevez chaque mois un résumé consolidé des indicateurs (taux de disponibilité, temps de réponse moyen, incidents majeurs) accompagné de recommandations d&apos;optimisation (scaling, ajustement de configuration, nettoyage de logs).</li>
      </ul>
    )
  },
  {
    number: 3,
    title: "Maintenance évolutive",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Gestion du backlog d&apos;améliorations :</strong> Nous constituons et priorisons un backlog des évolutions fonctionnelles (nouvelles fonctionnalités, optimisations UX, mises à jour technologiques). Les demandes sont classées selon leur valeur métier et leur criticité.</li>
        <li><strong>Cycles de maintenance programmés :</strong> Les évolutions sont intégrées via des sprints de 2 semaines. Vous pouvez suivre l&apos;avancement des tâches dans notre outil de gestion de projet (Jira, Trello, ou équivalent), commenter, et valider chaque livrable avant passage en production.</li>
        <li><strong>Veille technologique et mises à jour planifiées :</strong> JARVIS effectue une veille régulière sur les frameworks et librairies utilisés. Lorsqu&apos;une mise à jour de sécurité ou une évolution majeure apparaît, nous planifions son intégration dans le prochain cycle de maintenance, en testant d&apos;abord en préproduction avant déploiement.</li>
      </ul>
    )
  },
  {
    number: 4,
    title: "Sauvegardes sécurisées et plan de reprise d&apos;activité (PRA)",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Politique de backup :</strong> Vos données (bases, fichiers) sont sauvegardées quotidiennement avec une rétention adaptée (hebdomadaire, mensuelle). Les sauvegardes sont chiffrées et stockées sur un espace de stockage cloud distinct pour éviter toute perte.</li>
        <li><strong>Tests trimestriels de restauration :</strong> Tous les trois mois, nous vérifions la qualité des sauvegardes en restaurant un environnement de staging, afin de garantir la fiabilité des procédures et estimer le temps de rétablissement.</li>
        <li><strong>Plan de reprise d&apos;activité simplifié :</strong> En cas de sinistre majeur (panne d&apos;infrastructure, incident critique), notre PRA définit :
          <ul className="list-disc pl-6 mt-2">
            <li>Les rôles et responsabilités (équipe JARVIS, contact client).</li>
            <li>Les étapes de bascule vers un environnement de secours (failover) en cloud ou serveur externe.</li>
            <li>Les scénarios de communication (informations clés à transmettre selon l&apos;audience).</li>
            <li>Les objectifs de temps de restauration (RTO) et de perte de données acceptable (RPO).</li>
          </ul>
        </li>
      </ul>
    )
  },
  {
    number: 5,
    title: "Documentation technique et transfert de compétences",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Documentation à jour :</strong> Chaque modification (correction de bug, évolution, mise à jour d&apos;infrastructure) est systématiquement documentée :
          <ul className="list-disc pl-6 mt-2">
            <li>Architecture logicielle (diagrammes, composants, dépendances).</li>
            <li>Procédures de déploiement (CI/CD) et d&apos;administration (scripts, configurations).</li>
            <li>Guides de reprise d&apos;activité et fiches d&apos;intervention pour incidents majeurs.</li>
          </ul>
        </li>
        <li><strong>Formations ponctuelles :</strong> Si vous souhaitez prendre en charge une partie du support, nous animons des sessions de transfert de connaissances :
          <ul className="list-disc pl-6 mt-2">
            <li>Utilisation des outils de monitoring et d&apos;analyse de logs.</li>
            <li>Procédures de diagnostic rapide et gestion des incidents courants.</li>
            <li>Processus de mises à jour (développement → préproduction → production).</li>
          </ul>
        </li>
        <li><strong>Portail client :</strong> Un espace en ligne centralise :
          <ul className="list-disc pl-6 mt-2">
            <li>L&apos;historique des tickets et leur statut.</li>
            <li>Des guides pas-à-pas pour les opérations récurrentes (restauration de backup, redémarrage de services, contrôle des ressources).</li>
            <li>Des tutoriels vidéo pour faciliter la prise en main des outils.</li>
          </ul>
        </li>
      </ul>
    )
  }
];

export default function SupportService() {
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
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">Support & Maintenance</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">Notre approche du Support & Maintenance chez JARVIS</h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Chez JARVIS, nous assurons la continuité et la pérennité de vos applications grâce à un service de support et de maintenance adapté à vos besoins. Plutôt que de prétendre être joignables 24 h/24 et 7 j/7, nous privilégions une organisation claire, des engagements réalistes et une communication transparente.
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
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-jarvisGold/10 rounded-full blur-2xl group-hover:bg-jarvisGold/20 group-hover:blur-3xl transition-all duration-500"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-monacoBlue/30 rounded-full blur-xl group-hover:bg-monacoBlue/50 group-hover:blur-2xl transition-all duration-500"></div>
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