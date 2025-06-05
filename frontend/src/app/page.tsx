import HomeSequence from "../components/HomeSequence";

export const metadata = {
  title: "SARL JARVIS – Solutions IT sur-mesure",
  description: "Solutions logicielles & installations IT sur‑mesure à Monaco et à l'international",
};

export default function Home() {
  // Hero content
  const heroContent = {
    h1: "Secrets d'une infrastructure d'exception",
    p: "Jarvis déploie sa maîtrise technologique pour créer, dans l'ombre, la performance sur-mesure qui fera toute la différence.",
    buttonPrimary: {
      text: "Demander un devis",
      href: "/contact",
      style: "solid" as "solid" | "outline",
    },
  };

  // Services content
  const servicesItems = [
    { 
      title: "Développement logiciel", 
      icon: "code", 
      description: "Applications web & mobiles sur‑mesure avec architecture cloud scalable.",
      route: "/services/developpement-logiciel"
    },
    { 
      title: "Support & Maintenance", 
      icon: "support", 
      description: "Support technique 24/7 et maintenance évolutive de vos systèmes.",
      route: "/services/support-maintenance"
    },
    { 
      title: "Solutions Web-marketing", 
      icon: "marketing", 
      description: "Stratégie digitale, SEO, et accompagnement marketing personnalisé.",
      route: "/services/solutions-web-marketing"
    },
    { 
      title: "Offre Jarvis Start-ups", 
      icon: "startup", 
      description: "Financement hybride et accompagnement stratégique pour start-ups.",
      highlight: true,
      route: "/services/offre-jarvis-start-ups"
    }
  ];

  // Team section content
  const teamMembers = [
    { 
      image: "/images/team1.jpg", 
      name: "Thomas Benichou", 
      role: "Gérant associé",
      quote: "Toujours à fond, j'allie créativité et stratégie pour envoyer vos start-ups vers de nouveaux records",
      bio: "Spécialiste de la gestion de start-ups et du développement stratégique, Thomas pilote la croissance de l'entreprise en identifiant de nouvelles opportunités et en optimisant les processus internes. Il accompagne les porteurs de projet de la phase d'idéation jusqu'au déploiement opérationnel, garantissant agilité et performance à chaque étape."
    },
    { 
      image: "/images/team2.jpg", 
      name: "Sacha Benichou", 
      role: "Gérant associé",
      quote: "La finance, c'est mon terrain de jeu : je transforme vos bilans en moteur de croissance",
      bio: "Expert en gestion financière, Sacha élabore des plans de financement sur-mesure et supervise la trésorerie pour assurer la stabilité et la rentabilité de nos opérations. Son sens aigu de l'analyse et sa maîtrise des outils financiers permettent d'anticiper les risques et de saisir les leviers de croissance."
    },
    { 
      image: "/images/team3.jpg", 
      name: "Équipe Dev", 
      role: "Développement",
      quote: "On code en mode hackathon permanent pour donner vie à vos idées les plus folles",
      bio: "Solal, Directeur du développement, coordonne notre équipe technique pour transformer vos idées en solutions digitales robustes. Fort de plusieurs années d'expérience en architecture logicielle, il veille à la qualité du code, à la scalabilité des plateformes et à l'innovation continue."
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
  );
}
