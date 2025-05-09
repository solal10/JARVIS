import HomeSequence from "../components/HomeSequence";

export const metadata = {
  title: "SARL JARVIS – Solutions IT sur-mesure",
  description: "Solutions logicielles & installations IT sur‑mesure à Monaco et à l'international",
};

export default function Home() {
  // Hero content
  const heroContent = {
    h1: "Solutions logicielles & installations IT sur‑mesure",
    p: "SARL JARVIS conçoit, développe et intègre vos systèmes informatiques, à Monaco et à l'international.",
    buttonPrimary: {
      text: "Demander un devis",
      href: "#contact",
      style: "solid" as "solid" | "outline",
    },
  };

  // Services content
  const servicesItems = [
    { 
      title: "Développement logiciel", 
      icon: "code", 
      description: "Applications web & mobiles sur‑mesure." 
    },
    { 
      title: "Installation matériel", 
      icon: "device", 
      description: "Caméras, TV, ordinateurs avec logiciels pré‑configurés." 
    },
    { 
      title: "Support & maintenance", 
      icon: "support", 
      description: "Contrats de maintenance et monitoring 24/7." 
    }
  ];

  // Team section content
  const teamMembers = [
    { image: "/images/team1.jpg", name: "Thomas Benichou", role: "Gérant associé" },
    { image: "/images/team2.jpg", name: "Sacha Benichou", role: "Gérant associé" },
    { image: "/images/team3.jpg", name: "Équipe Dev", role: "Développement" }
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
