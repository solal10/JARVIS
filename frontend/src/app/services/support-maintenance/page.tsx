"use client";

import React from 'react';

export default function SupportService() {
  return (
    <section className="py-24 px-6 bg-transparent text-white">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-left text-jarvisGold">Support & Maintenance</h1>
        <div className="prose prose-invert max-w-none text-lg">
          <h2 className="text-2xl font-bold mt-12 mb-6 text-jarvisGold">Notre approche du Support & Maintenance chez JARVIS</h2>
          
          <p>
            Chez JARVIS, nous assurons la continuité et la pérennité de vos applications grâce à un service de support et de maintenance adapté à vos besoins. Plutôt que de prétendre être joignables 24 h/24 et 7 j/7, nous privilégions une organisation claire, des engagements réalistes et une communication transparente.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Support technique – Horaires et modalités</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Disponibilité sur les horaires ouvrés</h4>
          <p>
            Notre équipe de support est joignable du lundi au vendredi, de 9 h à 18 h (heure de Paris), par e-mail et par téléphone. En dehors de ces horaires, une boîte vocale ou un système de ticketing vous permet de nous laisser un message, repris au début de la plage suivante.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Catégorisation et priorisation des demandes</h4>
          <p>
            Chaque demande est classée selon son impact :
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Critique (indisponibilité totale ou blocage complet) : prise en charge sous 2 heures ouvrées.</li>
            <li>Majeure (fonctionnalité dégradée impactant plusieurs utilisateurs) : prise en charge sous 4 heures ouvrées.</li>
            <li>Mineure (anomalie non bloquante ou question d'usage) : prise en charge sous 1 jour ouvré, correction dans le prochain cycle de maintenance planifié.</li>
          </ul>

          <h4 className="text-lg font-semibold mt-6 mb-3">Processus d'escalade</h4>
          <p>
            En cas de bug critique non résolu dans les délais, nous faisons remonter immédiatement l'incident à un référent technique senior. Un rapport d'incident vous est communiqué à l'issue de la résolution pour expliquer la cause et les corrections apportées.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Monitoring proactif et alerting</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Surveillance en continu des indicateurs clés</h4>
          <p>
            Nous mettons en place un système de monitoring (Datadog, Grafana ou solution cloud native) pour vérifier la disponibilité de vos services, les temps de réponse critiques, le taux d'erreurs (4xx/5xx) et l'utilisation des ressources (CPU, mémoire, stockage).
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Alertes automatiques dans les heures ouvrées</h4>
          <p>
            Les seuils d'alerte sont configurés pour déclencher une notification par e-mail ou SMS à l'équipe d'astreinte dès qu'un indicateur dépasse la norme. Les alertes sont traitées durant nos plages de support (9 h – 18 h, du lundi au vendredi).
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Rapport de suivi mensuel</h4>
          <p>
            Vous recevez chaque mois un résumé consolidé des indicateurs (taux de disponibilité, temps de réponse moyen, incidents majeurs) accompagné de recommandations d'optimisation (scaling, ajustement de configuration, nettoyage de logs).
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Maintenance évolutive</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Gestion du backlog d'améliorations</h4>
          <p>
            Nous constituons et priorisons un backlog des évolutions fonctionnelles (nouvelles fonctionnalités, optimisations UX, mises à jour technologiques). Les demandes sont classées selon leur valeur métier et leur criticité.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Cycles de maintenance programmés</h4>
          <p>
            Les évolutions sont intégrées via des sprints de 2 semaines. Vous pouvez suivre l'avancement des tâches dans notre outil de gestion de projet (Jira, Trello, ou équivalent), commenter, et valider chaque livrable avant passage en production.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Veille technologique et mises à jour planifiées</h4>
          <p>
            JARVIS effectue une veille régulière sur les frameworks et librairies utilisés. Lorsqu'une mise à jour de sécurité ou une évolution majeure apparaît, nous planifions son intégration dans le prochain cycle de maintenance, en testant d'abord en préproduction avant déploiement.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Sauvegardes sécurisées et plan de reprise d'activité (PRA)</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Politique de backup</h4>
          <p>
            Vos données (bases, fichiers) sont sauvegardées quotidiennement avec une rétention adaptée (hebdomadaire, mensuelle). Les sauvegardes sont chiffrées et stockées sur un espace de stockage cloud distinct pour éviter toute perte.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Tests trimestriels de restauration</h4>
          <p>
            Tous les trois mois, nous vérifions la qualité des sauvegardes en restaurant un environnement de staging, afin de garantir la fiabilité des procédures et estimer le temps de rétablissement.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Plan de reprise d'activité simplifié</h4>
          <p>
            En cas de sinistre majeur (panne d'infrastructure, incident critique), notre PRA définit :
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Les rôles et responsabilités (équipe JARVIS, contact client).</li>
            <li>Les étapes de bascule vers un environnement de secours (failover) en cloud ou serveur externe.</li>
            <li>Les scénarios de communication (informations clés à transmettre selon l'audience).</li>
            <li>Les objectifs de temps de restauration (RTO) et de perte de données acceptable (RPO).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">Documentation technique et transfert de compétences</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Documentation à jour</h4>
          <p>
            Chaque modification (correction de bug, évolution, mise à jour d'infrastructure) est systématiquement documentée :
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Architecture logicielle (diagrammes, composants, dépendances).</li>
            <li>Procédures de déploiement (CI/CD) et d'administration (scripts, configurations).</li>
            <li>Guides de reprise d'activité et fiches d'intervention pour incidents majeurs.</li>
          </ul>

          <h4 className="text-lg font-semibold mt-6 mb-3">Formations ponctuelles</h4>
          <p>
            Si vous souhaitez prendre en charge une partie du support, nous animons des sessions de transfert de connaissances :
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Utilisation des outils de monitoring et d'analyse de logs.</li>
            <li>Procédures de diagnostic rapide et gestion des incidents courants.</li>
            <li>Processus de mises à jour (développement → préproduction → production).</li>
          </ul>

          <h4 className="text-lg font-semibold mt-6 mb-3">Portail client</h4>
          <p>
            Un espace en ligne centralise :
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>L'historique des tickets et leur statut.</li>
            <li>Des guides pas-à-pas pour les opérations récurrentes (restauration de backup, redémarrage de services, contrôle des ressources).</li>
            <li>Des tutoriels vidéo pour faciliter la prise en main des outils.</li>
          </ul>

          <p className="mt-8 text-lg">
            En optant pour cette organisation, JARVIS vous garantit un support technique solide sans vous promettre une disponibilité irréaliste : nous sommes joignables et réactifs durant les horaires définis, avec des processus clairs pour traiter et résoudre chaque incident. Vous bénéficiez d'une maintenance évolutive structurée, d'une veille technologique permanente, et de sauvegardes fiables, le tout accompagné d'une documentation précise et d'un transfert de compétences pour vos équipes.
          </p>
        </div>
      </div>
    </section>
  );
} 