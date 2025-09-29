import HomeSequence from "../components/HomeSequence";
import { websiteSchema, breadcrumbSchema, serviceAggregateSchema } from "@/schemas/website";

export const metadata = {
  title: "JARVIS - Création Sites Internet & Développement | Audit IA Entreprises France",
  description: "Création de sites internet, développement web/mobile et audit IA pour entreprises. Conception, maintenance et solutions sur-mesure avec interventions dans toute la France depuis Monaco.",
};

export default function Home() {
  // Hero content
  const heroContent = {
    h1: "Solutions Technologiques & Intelligence Artificielle",
    p: "JARVIS déploie son expertise technologique pour créer des solutions sur-mesure d'exception : développement logiciel, audit IA et automation pour entreprises. Interventions dans toute la France depuis notre base de Monaco.",
    buttonPrimary: {
      text: "Demander un devis",
      href: "/contact",
      style: "solid" as "solid" | "outline",
    },
  };

  // Services content
  const servicesItems = [
    {
      title: "Création de sites & Développement",
      icon: "code",
      description: "Conception et création de sites internet, applications web & mobiles sur-mesure avec architecture moderne. Solutions complètes pour entreprises avec interventions dans toute la France.",
      route: "/services/developpement-logiciel"
    },
    {
      title: "Audit et Conseil IA",
      icon: "support",
      description: "Solutions d'intelligence artificielle et d'automatisation sur-mesure. Expert audit IA pour entreprises, start-ups et grands groupes France.",
      route: "/services/audit-conseil-ia"
    },
    {
      title: "Solutions Web-marketing",
      icon: "marketing",
      description: "Stratégie digitale, SEO, et accompagnement marketing personnalisé. Agence marketing digital pour entreprises francophones.",
      route: "/services/solutions-web-marketing"
    },
    {
      title: "Offre JARVIS Start-ups & Investisseurs",
      icon: "startup",
      description: "Financement hybride et accompagnement stratégique pour start-ups. Solutions investisseurs et entrepreneurs France, Suisse, Belgique.",
      highlight: true,
      route: "/services/offre-jarvis-start-ups"
    }
  ];

  // Team section content
  const teamMembers = [
    { 
      image: "/images/team1.jpg", 
      name: "Thomas Benichou", 
      role: "Associé",
      quote: "Toujours à fond, j'allie créativité et stratégie pour envoyer vos start-ups vers de nouveaux records",
      bio: "Spécialiste de la gestion de start-ups et du développement stratégique, Thomas pilote la croissance de l'entreprise en identifiant de nouvelles opportunités et en optimisant les processus internes. Il accompagne les porteurs de projet de la phase d'idéation jusqu'au déploiement opérationnel, garantissant agilité et performance à chaque étape.",
      social: {
        linkedin: "https://www.linkedin.com/in/thomas-benichou-479816172?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
      }
    },
    { 
      image: "/images/team2.jpg", 
      name: "Sacha Benichou", 
      role: "Gérant associé",
      quote: "La finance, c'est mon terrain de jeu : je transforme vos bilans en moteur de croissance",
      bio: "Expert en gestion financière, Sacha élabore des plans de financement sur-mesure et supervise la trésorerie pour assurer la stabilité et la rentabilité de nos opérations. Son sens aigu de l'analyse et sa maîtrise des outils financiers permettent d'anticiper les risques et de saisir les leviers de croissance.",
      social: {
        linkedin: "https://www.linkedin.com/in/sacha-benichou-19b140225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
      }
    },
    { 
      image: "/images/team3.jpg", 
      name: "Solal Ohana", 
      role: "Directeur Technique",
      quote: "L'innovation technique est au cœur de chaque solution que nous créons",
      bio: "En tant que Directeur Technique, Solal dirige l'ensemble des développements logiciels et l'architecture technique de nos solutions. Son expertise en développement full-stack et sa vision stratégique permettent de concevoir des systèmes robustes, évolutifs et performants qui répondent aux besoins les plus exigeants de nos clients.",
      social: {
        linkedin: "https://www.linkedin.com/in/solal-ohana?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
      }
    }
  ];

  // NavBar content is now handled directly in the layout.tsx file

  // FAQ teaser content
  const faqItems = [
    { 
      q: "Travaillez‑vous hors de Monaco ?", 
      a: "Oui, nous intervenons à l'international pour les projets logiciels et matériels. Notre équipe peut se déplacer partout en Europe et collabore à distance avec des clients du monde entier. Nous avons déjà réalisé des projets en France, en Suisse, au Royaume-Uni et aux États-Unis." 
    },
    { 
      q: "Quel est le délai moyen d'un projet ?", 
      a: "Entre 4 et 12 semaines selon la complexité du projet. Nous établissons un calendrier précis lors de la phase de consultation initiale. Pour les projets urgents, nous proposons des solutions accélérées avec des livrables progressifs. Notre méthodologie agile permet d'adapter le planning selon vos priorités." 
    },
    { 
      q: "Proposez‑vous un support 24/7 ?", 
      a: "Oui, nous offrons plusieurs niveaux de contrats de maintenance, dont une option premium avec support 24/7. Ce service inclut une surveillance proactive de vos systèmes, des interventions d'urgence, et un temps de réponse garanti de moins de 30 minutes. Nos équipes techniques sont organisées en rotation pour assurer une disponibilité permanente." 
    },
    { 
      q: "Comment assurez-vous la sécurité des données ?", 
      a: "La sécurité est notre priorité absolue. Nous implémentons les dernières normes de cryptage, effectuons des audits de sécurité réguliers et suivons les meilleures pratiques RGPD/GDPR. Tous nos développements intègrent le principe de 'security by design' et nos équipes sont formées aux dernières menaces cybersécurité. Nous proposons également des solutions de sauvegarde redondantes." 
    },
    { 
      q: "Quelles technologies maîtrisez-vous ?", 
      a: "Notre expertise couvre un large éventail de technologies modernes : développement web (React, Next.js, Vue.js), applications mobiles (React Native, Swift, Kotlin), backend (Node.js, Python, .NET), bases de données (SQL et NoSQL), intelligence artificielle et apprentissage automatique, ainsi que les solutions IoT et domotiques. Nous sélectionnons toujours la technologie la plus adaptée à votre projet spécifique." 
    }
  ];

  return (
    <>
      {/* Schema.org JSON-LD pour la page d'accueil */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAggregateSchema) }}
      />

      <div className="bg-black">
        <HomeSequence
          heroContent={heroContent}
          servicesItems={servicesItems}
          teamMembers={teamMembers}
          faqItems={faqItems}
        />


        {/* Footer separator */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-monacoBlue/30 to-transparent"></div>
      </div>
    </>
  );
}
