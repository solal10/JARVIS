"use client";

import React from 'react';

export default function DevelopmentService() {
  return (
    <section className="py-24 px-6 bg-transparent text-white">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-left text-jarvisGold">Développement Logiciel</h1>
        <div className="prose prose-invert max-w-none text-lg">
          <h2 className="text-2xl font-bold mt-12 mb-6 text-jarvisGold">Notre approche du développement logiciel chez JARVIS</h2>
          
          <p>
            Chez JARVIS, nous plaçons la rigueur, la transparence et la performance au cœur de chaque projet de développement logiciel. Qu&rsquo;il s&rsquo;agisse d&rsquo;applications web ou mobiles sur-mesure, notre objectif est de livrer des solutions parfaitement adaptées à vos besoins métier, tout en garantissant une architecture cloud scalable et une expérience utilisateur optimale. Voici comment nous procédons :
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Phase de cadrage et d&rsquo;analyse des besoins</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Atelier de découverte</h4>
          <p>
            Nous organisons une première réunion avec vos équipes pour comprendre vos enjeux, vos processus internes et vos objectifs à court et long terme. L&rsquo;idée est de cerner précisément les cas d&rsquo;usage, les fonctionnalités clés et les contraintes (budgétaires, réglementaires, techniques).
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Spécifications fonctionnelles</h4>
          <p>
            À partir des informations recueillies, nous rédigeons un cahier des charges détaillé (backlog) qui liste les user stories, les parcours utilisateurs prioritaires et les critères d&rsquo;acceptation associés. Cette base de travail sert de référentiel tout au long du projet.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Expertise technologique</h4>
          <p>
            Nous vous conseillons sur le choix des technologies (framework front-end, langage back-end, bases de données, services cloud) en fonction de vos objectifs de performance, de montée en charge et d&rsquo;évolutivité.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Conception UI/UX et prototypage</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Wireframes et maquettes interactives</h4>
          <p>
            Notre équipe UX chez JARVIS conçoit des maquettes basse et haute fidélité pour illustrer l&rsquo;ergonomie des interfaces et valider les parcours utilisateurs (connexion, navigation, transactions…). Chaque maquette est soumise à vos retours avant de passer à l&rsquo;étape de développement.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Design system et charte graphique</h4>
          <p>
            Nous développons un référentiel visuel (couleurs, typographies, composants réutilisables) afin d&rsquo;assurer une cohérence graphique et faciliter la maintenance future. L&rsquo;objectif est d&rsquo;offrir une expérience fluide, intuitive et alignée avec votre image de marque.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Architecture cloud scalable</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Infrastructure as Code</h4>
          <p>
            Chez JARVIS, nous définissons toute l&rsquo;infrastructure (serveurs, bases de données, API, stockage d&rsquo;objets) via des scripts (Terraform, CloudFormation ou équivalents) pour garantir une mise en place reproductible et évolutive.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Microservices et conteneurisation</h4>
          <p>
            Pour les projets nécessitant une forte montée en charge, nous privilégions une architecture microservices orchestrée (Docker/Kubernetes). Cela permet de découpler les fonctionnalités, d&rsquo;améliorer la résilience et de faciliter les déploiements continus.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Haute disponibilité et autoscaling</h4>
          <p>
            Grâce aux services cloud (AWS, Azure, GCP, ou votre environnement privé), nous configurons des règles d&rsquo;autoscaling pour ajuster automatiquement la capacité des serveurs en fonction du trafic. Les sauvegardes automatisées et la redondance garantissent la continuité de service.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Développement Agile et méthode itérative</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Sprints de développement</h4>
          <p>
            JARVIS travaille en cycles courts (1 à 2 semaines), avec des réunions quotidiennes (stand-up) pour suivre l&rsquo;avancement. À la fin de chaque sprint, nous présentons une version incrémentale de l&rsquo;application, testable et potentiellement déployable en production.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Revue de code et qualité logicielle</h4>
          <p>
            Chaque ligne de code fait l&rsquo;objet d&rsquo;une revue par un pair (code review) pour s&rsquo;assurer qu&rsquo;elle respecte nos standards (principes SOLID, tests unitaires/d&rsquo;intégration, couverture de code minimale). Nous utilisons des outils d&rsquo;analyse statique (SonarQube, ESLint ou équivalents) pour détecter automatiquement les vulnérabilités et les défauts de performance.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Intégration et déploiement continus (CI/CD)</h4>
          <p>
            À chaque mise à jour de code, notre pipeline CI exécute automatiquement l&rsquo;ensemble des tests (unitaires, fonctionnels, end-to-end) puis construit les artefacts. Si tous les tests passent, la pipeline de déploiement (CD) publie la nouvelle version sur l&rsquo;environnement de préproduction, voire de production, en minimisant les temps d&rsquo;indisponibilité.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Tests, validation et recettes</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Tests automatisés</h4>
          <p>
            Dès le début du projet, JARVIS met en place des suites de tests (unitaires, d&rsquo;intégration et end-to-end) qui tournent à chaque commit. Cela garantit la stabilité du code et détecte immédiatement toute régression.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Recette utilisateur (UAT)</h4>
          <p>
            Avant la mise en production, vous effectuez une phase de recettes permettant de valider que chaque fonctionnalité correspond à vos attentes. Nous corrigeons ou ajustons rapidement les points remontés.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Tests de performance et de sécurité</h4>
          <p>
            Nous réalisons des tests de charge (JMeter, Gatling) pour vérifier la tenue de l&rsquo;application sous fort trafic, ainsi que des audits de sécurité (scan de vulnérabilités, tests d&rsquo;intrusion légers) afin d&rsquo;anticiper et de corriger toute faille potentielle.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Déploiement en production et suivi post-lancement</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Stratégie de déploiement</h4>
          <p>
            Selon les besoins, JARVIS met en place des déploiements progressifs (blue-green, canary releases) pour réduire les risques et pouvoir revenir en arrière rapidement en cas d&rsquo;anomalie.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Monitoring et alerting proactif</h4>
          <p>
            Une fois l&rsquo;application en production, nous configurons des outils de supervision (Datadog, New Relic, Grafana ou solutions cloud natives) pour surveiller la disponibilité, les temps de réponse, l&rsquo;utilisation des ressources et la santé générale du système. En cas d&rsquo;incident, des alertes automatiques sont envoyées à notre équipe, disponible 24/7.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Maintenance évolutive et évolutions fonctionnelles</h4>
          <p>
            Nous assurons un suivi continu pour corriger les bugs, optimiser les performances et intégrer de nouvelles fonctionnalités au fil de l&rsquo;évolution de votre activité. Notre documentation technique détaillée (diagrammes d&rsquo;architecture, manuels de déploiement, guides d&rsquo;installation) reste à votre disposition pour faciliter la prise en main interne.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Sécurité et conformité</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Meilleures pratiques de sécurité</h4>
          <p>
            Chez JARVIS, nous appliquons strictement les principes de sécurité dès la conception (Secure by Design), en chiffrant les données sensibles, en implémentant des mécanismes d&rsquo;authentification robustes (OAuth 2.0, JWT, gestion des rôles) et en protégeant les API (rate limiting, validation des entrées, whitelist/blacklist).
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Conformité RGPD et protection des données</h4>
          <p>
            Nous veillons à respecter la réglementation européenne pour le traitement des données personnelles, en mettant en place des processus d&rsquo;anonymisation, de consentement explicite et de droit à l&rsquo;oubli.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3">Audits réguliers</h4>
          <p>
            Tous les six mois (ou à la fréquence souhaitée), JARVIS réalise un audit de sécurité incluant analyse de code source, tests d&rsquo;injection SQL, contrôle des politiques CORS/CSP et revue des droits d&rsquo;accès aux services cloud.
          </p>

          <p className="mt-8 text-lg">
            En combinant méthodologie Agile, technologies cloud modernes et une attention constante à la qualité, JARVIS garantit un développement logiciel à la fois performant, sécurisé et aligné avec vos enjeux métier. Vos équipes bénéficient d&rsquo;une totale transparence sur chaque étape du projet, grâce à des points de suivi réguliers, des livrables intermédiaires et une documentation exhaustive.
          </p>

          <p className="mt-4 text-lg font-semibold text-jarvisGold">
            Notre promesse : un partenariat de confiance, une solution sur-mesure et une réactivité optimale à chaque évolution de votre activité.
          </p>
        </div>
      </div>
    </section>
  );
} 