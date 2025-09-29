import React from 'react';
import PixelWave from '@/components/PixelWave';
import ClientMotionDiv from '@/components/ClientMotionDiv';
import { serviceSchema } from './schema';

export const metadata = {
  title: "Offre Start-ups & Investisseurs | Financement Accompagnement France | JARVIS",
  description: "Offre JARVIS pour start-ups : financement hybride, accompagnement stratégique, développement technique. Solutions pour investisseurs & entrepreneurs avec interventions dans toute la France.",
};

const sections = [
  {
    number: 1,
    title: "Pour les investisseurs : sécurité et accès à la croissance tech",
    content: (
      <>
        <h4 className="text-xl font-semibold mt-4 mb-2">Promesse de capital garanti</h4>
        <ul className="space-y-4">
          <li><strong>Engagement de préservation du capital :</strong> Les investisseurs qui s'engagent via l'offre Jarvis Start-ups bénéficient d'une promesse de capital minimal garanti. Concrètement, une part de votre mise est allouée à un fonds de sécurité, structuré pour absorber les fluctuations des premiers stades de développement des start-ups. Cette garantie vous permet d'explorer des opportunités à fort potentiel tout en limitant le risque de perte en capital.</li>
          <li><strong>Mécanisme de protection :</strong> Si une start-up en portefeuille rencontre des difficultés majeures, le fonds de sécurité compense partiellement la décote de valorisation. Vous conservez ainsi un plancher de retrait, défini contractuellement dès l'investissement.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-2">Accès privilégié au secteur tech et aux start-ups innovantes</h4>
        <ul className="space-y-4">
          <li><strong>Sélection rigoureuse :</strong> Notre équipe d'analystes réalise une due diligence approfondie (équipe fondatrice, validité du business model, potentiel de marché, technologie, indicateurs financiers prévisionnels). Seules les start-ups répondant à nos critères de marché adressable, d'évolutivité et de différenciation technologique sont retenues.</li>
          <li><strong>Investissement diversifié :</strong> Grâce à la mutualisation des mises, vous accédez à un portefeuille de start-ups variées (SaaS, fintech, e-santé, IA, e-commerce). Cette diversification réduit la volatilité globale et maximise vos chances de participer à une success story tech.</li>
          <li><strong>Reporting transparent :</strong> Chaque trimestre, vous recevez un rapport consolidé détaillant :
            <ul className="mt-2 ml-6">
              <li>La performance globale du portefeuille (valorisation moyenne, cash-burn, objectifs atteints).</li>
              <li>L'état des levées de fonds des start-ups en phase suivante (amorçage, série A, etc.).</li>
              <li>Les indicateurs clés de performance (KPI) pour chaque jeune pousse (MRR, taux de croissance mensuel, churn, CAC/LTV).</li>
            </ul>
          </li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-2">Participation aux prochaines levées de fonds</h4>
        <ul className="space-y-4">
          <li><strong>Co-investissement :</strong> Au-delà de l'investissement initial via Jarvis Start-ups, vous avez la possibilité de participer aux tours suivants (série A, série B...) à des conditions préférentielles. Cette option vous assure un accès anticipé aux meilleurs dossiers, avec un droit de préemption garanti sur les nouvelles émissions de titres.</li>
          <li><strong>Suivi actif et conseils stratégiques :</strong> En tant qu'investisseur Jarvis, vous êtes invité à des comités de pilotage trimestriels où nous discutons des orientations stratégiques des start-ups (pivot, extension internationale, recrutement de talents clés). Vous pouvez ainsi contribuer, via des retours d'expertise, au succès des projets.</li>
        </ul>
      </>
    )
  },
  {
    number: 2,
    title: "Pour les start-ups : financement, expertise et réseau",
    content: (
      <>
        <h4 className="text-xl font-semibold mt-4 mb-2">Financement hybride et levée de fonds accélérée</h4>
        <ul className="space-y-4">
          <li><strong>Accès au capital Jarvis :</strong> Les start-ups sélectionnées intègrent un premier tour de financement avec JARVIS, comprenant :
            <ul className="mt-2 ml-6">
              <li>Une partie en capital-risque : JARVIS prend une participation minoritaire pour aligner nos intérêts sur votre réussite à long terme.</li>
              <li>Une partie garantie par le fonds de sécurité : elle vous offre une première enveloppe de trésorerie dédiée au développement du MVP (Produit Minimal Viable) ou à la validation de votre Proof of Concept.</li>
            </ul>
          </li>
          <li><strong>Effet de levier pour les prochains investisseurs :</strong> Le fait d'avoir JARVIS au board crée un gage de crédibilité auprès d'autres Business Angels et fonds d'investissement. Nous organisons nous-mêmes des "pitch events" et mettons en avant votre projet auprès de notre réseau pour accélérer la levée de fonds en série A ou B.</li>
          <li><strong>Financement phasé :</strong> Nous déployons les fonds par paliers, conditionnés à l'atteinte d'objectifs définis (jalons techniques, KPI commerciaux, validation utilisateur). Cette approche garantit que chaque euro investi produit une valeur ajoutée mesurable et limite le risque de dilution inutile.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-2">Accompagnement stratégique et opérationnel</h4>
        <ul className="space-y-4">
          <li><strong>Conseil sur le business model et le positionnement :</strong> Nos experts vous accompagnent dans la construction ou l'ajustement de votre business model (abonnement, freemium, marketplace, licensing). Nous affinons votre proposition de valeur, identifions vos segments de clientèle prioritaires et élaborons votre plan go-to-market.</li>
          <li><strong>Mentoring et coaching permanent :</strong> Chaque fondateur est parrainé par une personne clé de l'écosystème JARVIS (décideur tech, ex-entrepreneur, expert marketing). Nous organisons des sessions mensuelles pour :
            <ul className="mt-2 ml-6">
              <li>Analyser les métriques de traction (MRR, CAC/LTV, churn).</li>
              <li>Ajuster la roadmap produit et prioriser les fonctionnalités critiques.</li>
              <li>Préparer les rounds de recrutement de talents (CPO, CTO, CMO) et définir la culture de l'entreprise.</li>
            </ul>
          </li>
          <li><strong>Support technique et marketing intégré :</strong> En plus des ressources de développement pour bâtir votre MVP, JARVIS met à disposition ses équipes de designers, UX/UI et marketeurs pour :
            <ul className="mt-2 ml-6">
              <li>Concevoir un prototype fonctionnel et esthétique, validé par vos premiers utilisateurs.</li>
              <li>Déployer une stratégie web-marketing (SEO, campagnes payantes, social media) dès le MVP pour générer vos premiers leads.</li>
              <li>Mettre en place les outils d'analytics indispensables (analytics, CRM, automatisation de l'e-mailing) pour suivre vos indicateurs de performance.</li>
            </ul>
          </li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-2">Accès au réseau et partenariats stratégiques</h4>
        <ul className="space-y-4">
          <li><strong>Rencontres avec des co-investisseurs :</strong> Grâce à notre communauté d'anges investisseurs et de fonds spécialisés, nous organisons des sessions de matchmaking entre votre équipe et des investisseurs potentiels. Vous bénéficiez d'événements thématiques (fintech, e-santé, IA) pour présenter votre projet devant un public qualifié.</li>
          <li><strong>Partenariats industriels et technologiques :</strong> JARVIS entretient des partenariats avec des grands comptes, des éditeurs de solutions SaaS et des intégrateurs cloud. Si votre start-up peut valoriser ces connexions (accès à des API, intégrations prioritaires, opportunités commerciales), nous facilitons ces mises en relation.</li>
          <li><strong>Ambassadeurs et mentors sectoriels :</strong> Nous mobilisons notre réseau d'experts métiers (juridiques, finance, growth hacking, cybersécurité) pour intervenir ponctuellement sur des problématiques spécifiques : audit juridique, mise en conformité RGPD, optimisation des coûts cloud, etc.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-2">Conditions transparentes et équitables</h4>
        <ul className="space-y-4">
          <li><strong>Valorisation claire et clauses défensives :</strong> Les modalités d'entrée en capital sont négociées en toute transparence : valorisation pré-money, pourcentage de dilution, droits de vote, clauses d'anti-dilution. Nous nous efforçons d'éviter les termes excessivement dilutifs pour les fondateurs.</li>
          <li><strong>Suivi post-investissement :</strong> Après chaque tour de financement, un comité de suivi trimestriel permet de vérifier l'atteinte des milestones et d'ajuster les budgets. En cas de retard ou de pivot, nous travaillons ensemble pour redéfinir les objectifs et trouver des solutions (extension de runway, réorientation produit).</li>
          <li><strong>Engagement au long cours :</strong> JARVIS reste actionnaire tant que la start-up n'a pas réalisé un exit ou atteint un stade de maturité (série C+). Nous nous engageons à vous soutenir jusqu'à la phase de scale-up, en participant aux tours successifs si le projet le justifie.</li>
        </ul>
      </>
    )
  },
  {
    number: 3,
    title: "Synthèse du modèle économique Jarvis Start-ups",
    content: (
      <>
        <h4 className="text-xl font-semibold mb-4">Pour les investisseurs :</h4>
        <ul className="space-y-2">
          <li>• Vous accédez à un portefeuille diversifié de start-ups tech sélectionnées par JARVIS, avec une promesse de capital partiellement garanti</li>
          <li>• Vous bénéficiez d'un droit de préemption sur les tours suivants et d'un reporting transparent trimestriel</li>
          <li>• Vous participez, si vous le souhaitez, aux comités stratégiques pour accompagner la croissance des jeunes pousses</li>
        </ul>
        <h4 className="text-xl font-semibold mb-4 mt-8">Pour les start-ups :</h4>
        <ul className="space-y-2">
          <li>• Vous obtenez un financement hybride (capital-risque + fonds de sécurité), structuré en paliers pour valider chaque étape clé</li>
          <li>• Vous profitez d'un accompagnement 360 : conseils business, développement technique, marketing digital, mentoring, accès à un réseau d'investisseurs et de partenaires stratégiques</li>
          <li>• Vous évoluez dans un cadre contractuel clair, avec des engagements de JARVIS sur la durée, sans pression excessive sur la dilution initiale</li>
        </ul>
      </>
    )
  }
];

export default function StartupService() {
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
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">Offre Start-ups & Investisseurs</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">Investisseurs & Start-ups, accompagnement dans toute la France</h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Chez JARVIS, nous avons conçu une offre inédite qui met en relation deux écosystèmes : d'un côté, des investisseurs à la recherche d'opportunités sécurisées dans la tech et les start-ups, et de l'autre, des jeunes pousses souhaitant bénéficier à la fois d'un accompagnement opérationnel et d'un levier de financement soutenu. Notre modèle économique hybride garantit une promesse de capital pour nos investisseurs tout en offrant aux start-ups un accès privilégié à des fonds et à notre expertise. Nous intervenons dans toute la France depuis notre base de Monaco.
          </p>
        </div>
            {/* Main Content */}
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
                  <h4 className="text-xl font-semibold mb-3 text-white">Développement Technique</h4>
                  <p className="text-white/80">Concrétisation technique de votre vision start-up avec développement d'applications innovantes.</p>
                </a>
                <a
                  href="/services/audit-conseil-ia"
                  className="block p-6 bg-black/30 border border-jarvisGold/40 rounded-lg hover:border-jarvisGold/70 transition-all duration-300 hover:bg-black/40"
                >
                  <h4 className="text-xl font-semibold mb-3 text-white">Intégration IA</h4>
                  <p className="text-white/80">Audit et intégration d'intelligence artificielle pour différencier votre start-up sur le marché.</p>
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