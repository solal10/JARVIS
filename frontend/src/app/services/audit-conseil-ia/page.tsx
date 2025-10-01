import React from 'react';
import PixelWave from '@/components/PixelWave';
import { serviceSchema } from './schema';
import ClientMotionDiv from '@/components/ClientMotionDiv';

export const metadata = {
  title: "Audit & Conseil IA | Expert Intelligence Artificielle Entreprises France | JARVIS",
  description: "Expert audit IA pour entreprises : évaluation maturité IA, agents conversationnels, automatisation de processus. Conseil en intelligence artificielle sur-mesure avec interventions à distance.",
};

const sections = [
  {
    number: 1,
    title: "Audit et évaluation de l'IA",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Analyse de maturité IA :</strong> Évaluation complète de votre infrastructure actuelle et de vos besoins en IA :
          <ul className="list-disc pl-6 mt-2">
            <li>Audit des systèmes existants et identification des opportunités d&apos;automatisation.</li>
            <li>Évaluation de la qualité et de la disponibilité des données.</li>
            <li>Analyse des processus métier pour identifier les cas d&apos;usage prioritaires.</li>
          </ul>
        </li>
        <li><strong>Recommandations stratégiques :</strong> Plan d&apos;action détaillé pour l&apos;implémentation de l&apos;IA :
          <ul className="list-disc pl-6 mt-2">
            <li>Priorisation des projets selon leur ROI et leur complexité.</li>
            <li>Recommandations techniques et choix technologiques.</li>
            <li>Estimation des ressources nécessaires et planning de déploiement.</li>
          </ul>
        </li>
      </ul>
    )
  },
  {
    number: 2,
    title: "Agents IA et Chatbots",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Conception d&apos;agents IA :</strong> Développement d&apos;assistants virtuels intelligents :
          <ul className="list-disc pl-6 mt-2">
            <li>Agents conversationnels pour le service client et le support.</li>
            <li>Assistants virtuels pour la gestion des tâches administratives.</li>
            <li>Agents spécialisés pour l&apos;analyse et la prise de décision.</li>
          </ul>
        </li>
        <li><strong>Intégration et personnalisation :</strong> Adaptation des solutions à votre environnement :
          <ul className="list-disc pl-6 mt-2">
            <li>Connexion avec vos systèmes existants (CRM, ERP, etc.) grâce à notre expertise en <a href="/services/developpement-logiciel" className="text-jarvisGold hover:text-jarvisGold/80 underline">développement d'applications sur-mesure</a>.</li>
            <li>Personnalisation du langage et des réponses selon votre secteur.</li>
            <li>Formation continue basée sur les interactions réelles.</li>
          </ul>
        </li>
      </ul>
    )
  },
  {
    number: 3,
    title: "Automatisation des processus",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Automatisation intelligente :</strong> Optimisation des workflows avec l&apos;IA :
          <ul className="list-disc pl-6 mt-2">
            <li>Automatisation des tâches répétitives et des processus métier.</li>
            <li>Intégration de l&apos;IA dans les flux de travail existants.</li>
            <li>Surveillance et optimisation continue des performances.</li>
          </ul>
        </li>
        <li><strong>Solutions sur-mesure :</strong> Développement d'outils d'automatisation adaptés :
          <ul className="list-disc pl-6 mt-2">
            <li>Création de workflows intelligents avec prise de décision automatisée.</li>
            <li>Intégration de la reconnaissance de documents et de l&apos;extraction de données.</li>
            <li>Mise en place de tableaux de bord de suivi en temps réel.</li>
          </ul>
        </li>
      </ul>
    )
  },
  {
    number: 4,
    title: "Formation et accompagnement",
    content: (
      <ul className="list-disc pl-6 mt-2 space-y-4">
        <li><strong>Formation des équipes :</strong> Accompagnement dans l&apos;adoption des solutions IA :
          <ul className="list-disc pl-6 mt-2">
            <li>Formation à l&apos;utilisation des nouveaux outils et processus.</li>
            <li>Ateliers pratiques sur l&apos;interaction avec les agents IA.</li>
            <li>Documentation complète et support continu.</li>
          </ul>
        </li>
        <li><strong>Suivi et optimisation :</strong> Amélioration continue des solutions :
          <ul className="list-disc pl-6 mt-2">
            <li>Analyse régulière des performances et des retours utilisateurs.</li>
            <li>Ajustements et optimisations basés sur les données réelles.</li>
            <li>Mises à jour et évolutions des fonctionnalités.</li>
          </ul>
        </li>
      </ul>
    )
  }
];

export default function AIConsultingService() {
  return (
    <>
      {/* Schema.org JSON-LD pour SEO */}
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
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">Audit & Conseil IA</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">Expert conseil IA - Interventions dans toute la France</h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                JARVIS accompagne votre transformation numérique avec des solutions d'IA innovantes. De l'audit initial à l'implémentation d'agents IA et l'automatisation de vos processus, nous guidons votre adoption réussie de l'intelligence artificielle partout en France depuis notre base de Monaco.
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
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    {section.content}
                  </div>
                </ClientMotionDiv>
              ))}
            </div>

            {/* Section Services Complémentaires */}
            <div className="max-w-screen-md mx-auto mt-20 pt-12 border-t border-jarvisGold/30">
              <h3 className="text-2xl font-bold mb-8 text-center text-jarvisGold">Services Complémentaires</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <a
                  href="/services/developpement-logiciel"
                  className="block p-6 bg-black/30 border border-jarvisGold/40 rounded-lg hover:border-jarvisGold/70 transition-all duration-300 hover:bg-black/40"
                >
                  <h4 className="text-xl font-semibold mb-3 text-white">Développement Logiciel</h4>
                  <p className="text-white/80">Développement d&apos;applications intégrant l&apos;IA pour concrétiser vos recommandations d&apos;audit.</p>
                </a>
                <a
                  href="/services/offre-jarvis-start-ups"
                  className="block p-6 bg-black/30 border border-jarvisGold/40 rounded-lg hover:border-jarvisGold/70 transition-all duration-300 hover:bg-black/40"
                >
                  <h4 className="text-xl font-semibold mb-3 text-white">Offre Start-ups</h4>
                  <p className="text-white/80">Financement et accompagnement stratégique pour intégrer l&apos;IA dans votre start-up innovante.</p>
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