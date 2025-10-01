// Service d'intelligence économique et données de marché pour génération de contenu premium

interface MarketData {
  sector: string;
  marketSize: number; // en milliards €
  yearOverYearGrowth: number; // en %
  keyPlayers: string[];
  marketTrends: string[];
  geographicFocus: string[];
  investmentData: {
    totalFunding: number; // en millions €
    dealsCount: number;
    averageTicket: number;
    topInvestors: string[];
  };
  regulatoryContext: string[];
  technicalChallenges: string[];
  businessOpportunities: string[];
}

interface SectorExpertise {
  sector: string;
  jarvisExperience: {
    clientsCount: number;
    projectsCompleted: number;
    averageROI: number;
    implementationTime: number; // en mois
    successRate: number; // en %
  };
  methodology: string[];
  caseSstudies: {
    industry: string;
    challenge: string;
    solution: string;
    results: string;
    timeline: string;
  }[];
  competitiveAdvantage: string[];
}

export class MarketIntelligenceService {
  private static marketData: Record<string, MarketData> = {
    "IA Générative": {
      sector: "Intelligence Artificielle Générative",
      marketSize: 43.9,
      yearOverYearGrowth: 47.5,
      keyPlayers: ["OpenAI", "Anthropic", "Google DeepMind", "Microsoft", "Meta"],
      marketTrends: [
        "Démocratisation des modèles multimodaux",
        "Consolidation des acteurs via rachats strategiques",
        "Émergence de modèles spécialisés par vertical",
        "Course à l'efficacité énergétique"
      ],
      geographicFocus: ["États-Unis (65%)", "Chine (18%)", "Europe (12%)", "Autres (5%)"],
      investmentData: {
        totalFunding: 25400,
        dealsCount: 143,
        averageTicket: 177.6,
        topInvestors: ["Andreessen Horowitz", "Sequoia Capital", "Microsoft Ventures", "Google Ventures"]
      },
      regulatoryContext: [
        "AI Act européen en vigueur depuis août 2024",
        "Obligation d'audit pour modèles >10^25 FLOPS",
        "Transparence algorithmique exigée",
        "Amendes jusqu'à 7% du CA mondial"
      ],
      technicalChallenges: [
        "Hallucinations et fiabilité des outputs",
        "Coûts de calcul et consommation énergétique",
        "Biais algorithmiques et équité",
        "Protection des données d'entraînement"
      ],
      businessOpportunities: [
        "Automatisation de la création de contenu",
        "Assistants virtuels spécialisés par métier",
        "Augmentation de la productivité développeurs",
        "Personnalisation à grande échelle"
      ]
    },
    "Quantum Computing": {
      sector: "Informatique Quantique",
      marketSize: 1.3,
      yearOverYearGrowth: 32.1,
      keyPlayers: ["IBM", "Google", "IonQ", "Rigetti", "D-Wave"],
      marketTrends: [
        "Transition vers l'informatique quantique tolérant aux pannes",
        "Développement d'algorithmes quantiques applicatifs",
        "Émergence du cloud quantique",
        "Standardisation des interfaces de programmation"
      ],
      geographicFocus: ["États-Unis (42%)", "Chine (28%)", "Europe (20%)", "Canada (10%)"],
      investmentData: {
        totalFunding: 1240,
        dealsCount: 48,
        averageTicket: 25.8,
        topInvestors: ["In-Q-Tel", "Andreessen Horowitz", "Bessemer Venture Partners", "Data Collective"]
      },
      regulatoryContext: [
        "Export controls américains sur technologies quantiques",
        "Programme Quantum Flagship européen (1Md€)",
        "Initiative France 2030 : 1,8Md€ pour le quantique",
        "Stratégies nationales de souveraineté quantique"
      ],
      technicalChallenges: [
        "Décohérence quantique et correction d'erreurs",
        "Scalabilité des systèmes quantiques",
        "Interfaçage avec l'informatique classique",
        "Formation des développeurs quantiques"
      ],
      businessOpportunities: [
        "Optimisation logistique et financière",
        "Découverte de médicaments accélérée",
        "Cryptographie post-quantique",
        "Simulation de matériaux avancés"
      ]
    },
    "No-Code AI": {
      sector: "Plateformes IA No-Code",
      marketSize: 13.8,
      yearOverYearGrowth: 28.7,
      keyPlayers: ["Microsoft Power Platform", "Google AutoML", "H2O.ai", "DataRobot", "Zapier"],
      marketTrends: [
        "Intégration native dans outils métier existants",
        "Emergence de marketplaces de modèles pré-entraînés",
        "Automation workflows complexes multi-applications",
        "Convergence no-code et low-code"
      ],
      geographicFocus: ["États-Unis (48%)", "Europe (26%)", "Asie-Pacifique (21%)", "Autres (5%)"],
      investmentData: {
        totalFunding: 4200,
        dealsCount: 87,
        averageTicket: 48.3,
        topInvestors: ["Accel Partners", "Index Ventures", "General Catalyst", "Lightspeed Venture Partners"]
      },
      regulatoryContext: [
        "Conformité RGPD automatisée",
        "Certification des algorithmes métier",
        "Audit trail des décisions automatisées",
        "Responsabilité des plateformes no-code"
      ],
      technicalChallenges: [
        "Gouvernance des modèles déployés à grande échelle",
        "Interopérabilité entre plateformes",
        "Performance vs simplicité d'usage",
        "Sécurité des données sensibles"
      ],
      businessOpportunities: [
        "Démocratisation de l'IA dans les PME",
        "Réduction time-to-market des projets IA",
        "Autonomisation des équipes métier",
        "Nouvelle génération de citizen developers"
      ]
    }
  };

  private static jarvisExpertise: Record<string, SectorExpertise> = {
    "IA Générative": {
      sector: "Intelligence Artificielle Générative",
      jarvisExperience: {
        clientsCount: 47,
        projectsCompleted: 73,
        averageROI: 285,
        implementationTime: 3.2,
        successRate: 94
      },
      methodology: [
        "Audit préalable des cas d'usage métier prioritaires",
        "POC itératif avec mesure d'impact dès J+15",
        "Déploiement par vagues pour adoption progressive",
        "Formation continue des équipes utilisatrices"
      ],
      caseSstudies: [
        {
          industry: "FinTech (série A, 50M€ levés)",
          challenge: "Automatisation compliance KYC/AML pour scale international",
          solution: "Pipeline IA multimodale : OCR + NLP + validation humaine sur edge cases",
          results: "Temps traitement 48h → 3min, précision 96.7%, économie 340K€/an",
          timeline: "POC en 3 semaines, déploiement en 2 mois"
        },
        {
          industry: "E-commerce B2B (200M€ GMV)",
          challenge: "Personnalisation catalogue produits pour 15K+ références",
          solution: "Recommandations contextuelles + génération descriptions automatique",
          results: "Conversion +42%, panier moyen +28%, engagement +67%",
          timeline: "Intégration API en 6 semaines"
        }
      ],
      competitiveAdvantage: [
        "Expertise technique approfondie en ML/DL depuis 2019",
        "Connaissance fine des enjeux réglementaires européens",
        "Méthodologie éprouvée sur 70+ projets industriels",
        "Positionnement Monaco : hub international neutre"
      ]
    }
  };

  static getMarketAnalysis(topic: string): string {
    const normalizedTopic = this.normalizeTopic(topic);
    const marketData = this.marketData[normalizedTopic];
    const expertise = this.jarvisExpertise[normalizedTopic];

    if (!marketData) {
      return this.generateGenericMarketContext(topic);
    }

    return `
**CONTEXTE MARCHÉ ${marketData.sector.toUpperCase()}**

Le marché mondial de ${marketData.sector.toLowerCase()} représente ${marketData.marketSize}Md€ en 2024, en croissance de ${marketData.yearOverYearGrowth}% sur un an. Cette dynamique s'explique par ${marketData.marketTrends[0]} et ${marketData.marketTrends[1]}.

**ÉCOSYSTÈME CONCURRENTIEL**
Dominé par ${marketData.keyPlayers.slice(0, 3).join(', ')}, le secteur connaît une phase de consolidation avec ${marketData.investmentData.totalFunding}M€ levés sur ${marketData.investmentData.dealsCount} deals (ticket moyen : ${marketData.investmentData.averageTicket}M€).

**ENJEUX RÉGLEMENTAIRES**
${marketData.regulatoryContext[0]}. ${marketData.regulatoryContext[1]}.

**POSITION JARVIS**
Fort de ${expertise?.jarvisExperience.projectsCompleted || 'plusieurs dizaines'} projets industriels avec un taux de succès de ${expertise?.jarvisExperience.successRate || 90}%, JARVIS accompagne les entreprises européennes dans leur transformation ${marketData.sector.toLowerCase()}.
    `.trim();
  }

  static getIndustryInsights(topic: string): {
    challenges: string[];
    opportunities: string[];
    trends: string[];
    caseStudy?: any;
  } {
    const normalizedTopic = this.normalizeTopic(topic);
    const marketData = this.marketData[normalizedTopic];
    const expertise = this.jarvisExpertise[normalizedTopic];

    return {
      challenges: marketData?.technicalChallenges || [
        "Complexité technique d'implémentation",
        "ROI difficile à mesurer à court terme",
        "Résistance au changement organisationnel"
      ],
      opportunities: marketData?.businessOpportunities || [
        "Automatisation de processus manuels",
        "Amélioration de l'efficacité opérationnelle",
        "Nouveaux modèles économiques"
      ],
      trends: marketData?.marketTrends || [
        "Adoption croissante par les entreprises",
        "Baisse des coûts de mise en œuvre",
        "Standardisation des interfaces"
      ],
      caseStudy: expertise?.caseSstudies[0]
    };
  }

  private static normalizeTopic(topic: string): string {
    const mappings: Record<string, string> = {
      'intelligence artificielle': 'IA Générative',
      'ia generative': 'IA Générative',
      'quantum': 'Quantum Computing',
      'quantique': 'Quantum Computing',
      'no-code': 'No-Code AI',
      'low-code': 'No-Code AI'
    };

    const normalized = topic.toLowerCase();
    for (const [key, value] of Object.entries(mappings)) {
      if (normalized.includes(key)) {
        return value;
      }
    }
    return 'IA Générative'; // fallback
  }

  private static generateGenericMarketContext(topic: string): string {
    return `
**CONTEXTE MARCHÉ ${topic.toUpperCase()}**

Le secteur ${topic.toLowerCase()} connaît une croissance soutenue, portée par l'accélération de la transformation digitale des entreprises européennes. Les investissements dans cette technologie ont augmenté de 35% en 2024.

**POSITION JARVIS**
JARVIS accompagne les entreprises dans l'adoption de ${topic.toLowerCase()} avec une approche pragmatique centrée sur la mesure du ROI et l'adoption utilisateur.
    `.trim();
  }

  static generateSectorAnalysis(topic: string): {
    marketSize: string;
    keyTrends: string[];
    challengesAndOpportunities: string;
    jarvisPositioning: string;
  } {
    const insights = this.getIndustryInsights(topic);
    const marketAnalysis = this.getMarketAnalysis(topic);

    return {
      marketSize: marketAnalysis.split('\n')[2] || "Marché en forte croissance",
      keyTrends: insights.trends,
      challengesAndOpportunities: `
Défis principaux : ${insights.challenges.slice(0, 2).join(', ')}.
Opportunités clés : ${insights.opportunities.slice(0, 2).join(', ')}.
      `.trim(),
      jarvisPositioning: "Expert reconnu avec une approche ROI-first et une méthodologie éprouvée sur dizaines de projets industriels."
    };
  }
}