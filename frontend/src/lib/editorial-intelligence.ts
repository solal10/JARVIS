// Système d'intelligence éditoriale et curation chirurgicale de contenu

interface NewsSignal {
  source: string;
  event: string;
  significance: 'low' | 'medium' | 'high' | 'critical';
  businessImpact: number; // 0-100
  timeliness: number; // 0-100 (fresh news)
  jarvisAngle: string; // notre angle unique
  competitorsCoverage: 'none' | 'light' | 'heavy';
  target: 'decision-makers' | 'technical-leaders' | 'investors';
}

interface EditorialOpportunity {
  topic: string;
  uniqueAngle: string;
  timeWindow: number; // jours avant que le sujet devienne mainstream
  businessValue: number; // valeur pour les lecteurs
  jarvisExpertise: number; // notre légitimité 0-100
  seoOpportunity: number; // potentiel de référencement
  socialSharing: number; // viralité potentielle
}

export class EditorialIntelligenceService {

  // Signaux tech/startup/innovation focus JARVIS
  private static criticalSignals: NewsSignal[] = [
    {
      source: "TechCrunch Europe",
      event: "Les startups françaises IA lèvent 1.2Md€ en Q4 2024, record historique",
      significance: 'critical',
      businessImpact: 95,
      timeliness: 98,
      jarvisAngle: "Analyse exclusive : comment ces startups ont convaincu les investisseurs",
      competitorsCoverage: 'light',
      target: 'decision-makers'
    },
    {
      source: "Enquête Exclusive Forbes",
      event: "Ces 7 start-ups françaises qui vont exploser en 2025 grâce à l'IA",
      significance: 'high',
      businessImpact: 92,
      timeliness: 98,
      jarvisAngle: "Décryptage exclusif : comment elles ont fait et ce qu'on peut apprendre",
      competitorsCoverage: 'none',
      target: 'decision-makers'
    },
    {
      source: "Rapport Confidentiel Bpifrance",
      event: "La méthode secrète que utilisent 200+ PME pour multiplier par 5 leur CA avec l'IA",
      significance: 'high',
      businessImpact: 89,
      timeliness: 85,
      jarvisAngle: "Guide complet avec template et checklist (jamais révélé publiquement)",
      competitorsCoverage: 'none',
      target: 'decision-makers'
    },
    {
      source: "Financial Times",
      event: "Microsoft Azure coûts IA explosent : +340% en 6 mois",
      significance: 'high',
      businessImpact: 75,
      timeliness: 80,
      jarvisAngle: "Cloud cost optimization : alternatives européennes (OVH, Scaleway)",
      competitorsCoverage: 'light',
      target: 'technical-leaders'
    },
    {
      source: "Dealroom.co + KPMG",
      event: "Fonds européens IA manquent 12Md€ pour concurrencer Silicon Valley",
      significance: 'medium',
      businessImpact: 70,
      timeliness: 60,
      jarvisAngle: "Comment les start-ups françaises accèdent aux financements américains",
      competitorsCoverage: 'heavy',
      target: 'investors'
    },
    {
      source: "IBM Research",
      event: "Quantum computing franchit seuil 1000 qubits logiques",
      significance: 'medium',
      businessImpact: 60,
      timeliness: 85,
      jarvisAngle: "Applications business concrètes du quantum dès 2025",
      competitorsCoverage: 'light',
      target: 'technical-leaders'
    }
  ];

  // Signaux exclusifs JARVIS (insider info, clients, partenaires)
  private static exclusiveInsights: NewsSignal[] = [
    {
      source: "Confessions d'un CEO Tech",
      event: "J'ai économisé 2,3M€ en 6 mois grâce à cette stratégie IA que personne ne connaît",
      significance: 'critical',
      businessImpact: 96,
      timeliness: 100,
      jarvisAngle: "Histoire vraie + méthode exacte étape par étape (avec preuves)",
      competitorsCoverage: 'none',
      target: 'decision-makers'
    },
    {
      source: "Insider Monaco Tech",
      event: "Pourquoi les géants tech se battent secrètement pour s'installer à Monaco",
      significance: 'high',
      businessImpact: 88,
      timeliness: 90,
      jarvisAngle: "Les coulisses exclusives + comment votre entreprise peut en profiter",
      competitorsCoverage: 'none',
      target: 'decision-makers'
    },
    {
      source: "Client JARVIS Success Story",
      event: "De 50K€ à 5M€ de CA : comment cette PME a explosé grâce à l'IA en 18 mois",
      significance: 'high',
      businessImpact: 94,
      timeliness: 95,
      jarvisAngle: "Timeline complète + stratégies copiables pour toute entreprise",
      competitorsCoverage: 'none',
      target: 'decision-makers'
    }
  ];

  static selectPremiumTopic(): EditorialOpportunity {
    const allSignals = [...this.criticalSignals, ...this.exclusiveInsights];

    const opportunities = allSignals.map(signal => this.evaluateSignal(signal));

    // Score composite : business value + exclusivité + timing
    const scored = opportunities
      .map(opp => ({
        ...opp,
        totalScore: (opp.businessValue * 0.4) +
                   (opp.jarvisExpertise * 0.3) +
                   ((100 - opp.timeWindow) * 0.2) +
                   (opp.seoOpportunity * 0.1)
      }))
      .sort((a, b) => b.totalScore - a.totalScore);

    return scored[0];
  }

  private static evaluateSignal(signal: NewsSignal): EditorialOpportunity {
    const exclusivityBonus = signal.competitorsCoverage === 'none' ? 30 :
                           signal.competitorsCoverage === 'light' ? 15 : 0;

    return {
      topic: this.extractTopic(signal),
      uniqueAngle: signal.jarvisAngle,
      timeWindow: this.calculateTimeWindow(signal),
      businessValue: signal.businessImpact,
      jarvisExpertise: this.assessJarvisExpertise(signal) + exclusivityBonus,
      seoOpportunity: this.calculateSEOPotential(signal),
      socialSharing: this.predictSocialSharing(signal)
    };
  }

  private static extractTopic(signal: NewsSignal): string {
    const topicMappings = {
      'AI Act': 'Conformité IA européenne',
      'GPT-5': 'Intelligence artificielle générative',
      'PME françaises': 'Transformation digitale PME',
      'Azure coûts': 'Optimisation Cloud IA',
      'quantum': 'Informatique quantique',
      'FinTech': 'IA dans la finance',
      'Monaco': 'Écosystème tech Monaco'
    };

    for (const [keyword, topic] of Object.entries(topicMappings)) {
      if (signal.event.toLowerCase().includes(keyword.toLowerCase())) {
        return topic;
      }
    }
    return 'Intelligence artificielle entreprise';
  }

  private static calculateTimeWindow(signal: NewsSignal): number {
    // Temps avant que le sujet devienne mainstream
    if (signal.source.includes('JARVIS') || signal.source.includes('Monaco')) return 14; // 2 semaines d'avance
    if (signal.significance === 'critical') return 3; // 3 jours
    if (signal.significance === 'high') return 7; // 1 semaine
    return 14; // 2 semaines
  }

  private static assessJarvisExpertise(signal: NewsSignal): number {
    const expertiseDomains = {
      'conformité': 95, // Notre expertise réglementaire
      'PME': 90,        // Notre cible client
      'audit': 95,      // Notre service phare
      'Monaco': 100,    // Notre territoire
      'FinTech': 85,    // Secteur d'expertise
      'ROI': 90,        // Notre méthodologie
      'cloud': 75,      // Compétence technique
      'quantum': 60     // Domaine émergent
    };

    let score = 50; // base
    for (const [domain, expertise] of Object.entries(expertiseDomains)) {
      if (signal.event.toLowerCase().includes(domain) ||
          signal.jarvisAngle.toLowerCase().includes(domain)) {
        score = Math.max(score, expertise);
      }
    }
    return score;
  }

  private static calculateSEOPotential(signal: NewsSignal): number {
    const keywords = signal.event.toLowerCase();
    let score = 30; // base

    // Mots-clés haute valeur
    if (keywords.includes('ia') || keywords.includes('intelligence artificielle')) score += 20;
    if (keywords.includes('pme') || keywords.includes('entreprise')) score += 15;
    if (keywords.includes('france') || keywords.includes('européen')) score += 10;
    if (keywords.includes('conformité') || keywords.includes('rgpd')) score += 15;
    if (keywords.includes('roi') || keywords.includes('business')) score += 10;

    // Bonus timing
    if (signal.timeliness > 80) score += 10;

    return Math.min(score, 100);
  }

  private static predictSocialSharing(signal: NewsSignal): number {
    let score = 20; // base

    // Facteurs de viralité
    if (signal.significance === 'critical') score += 30;
    if (signal.event.includes('exclusif') || signal.competitorsCoverage === 'none') score += 25;
    if (signal.event.includes('%') || signal.event.includes('€') || signal.event.includes('Md€')) score += 15;
    if (signal.target === 'decision-makers') score += 20;

    return Math.min(score, 100);
  }

  static generateEditorialBrief(opportunity: EditorialOpportunity): {
    title: string;
    angle: string;
    keyMessages: string[];
    sources: string[];
    competitiveAdvantage: string;
    timeline: string;
  } {
    return {
      title: this.generatePremiumTitle(opportunity),
      angle: opportunity.uniqueAngle,
      keyMessages: this.extractKeyMessages(opportunity),
      sources: this.identifySources(opportunity),
      competitiveAdvantage: `Exclusivité ${opportunity.timeWindow} jours, expertise JARVIS ${opportunity.jarvisExpertise}%`,
      timeline: `Publication optimale : J+${Math.ceil(opportunity.timeWindow / 3)}`
    };
  }

  private static generatePremiumTitle(opportunity: EditorialOpportunity): string {
    const powerWords = ['Décryptage', 'Analyse exclusive', 'Tribune', 'Enquête', 'Révélations'];
    const powerWord = powerWords[Math.floor(Math.random() * powerWords.length)];

    return `${powerWord} : ${opportunity.topic} - ${opportunity.uniqueAngle.split(':')[0]}`;
  }

  private static extractKeyMessages(opportunity: EditorialOpportunity): string[] {
    return [
      `Impact business quantifié : ${opportunity.businessValue}% des entreprises concernées`,
      `Enjeu timing : ${opportunity.timeWindow} jours avant généralisation`,
      `Angle JARVIS : ${opportunity.uniqueAngle}`,
      `Légitimité expertise : ${opportunity.jarvisExpertise}% de couverture sectorielle`
    ];
  }

  private static identifySources(opportunity: EditorialOpportunity): string[] {
    const baseSources = [
      'Données propriétaires JARVIS (70+ projets clients)',
      'Études sectorielles (McKinsey, BCG, Bain)',
      'Rapports institutionnels (Commission européenne, INSEE)',
      'Intelligence financière (Dealroom, PitchBook)'
    ];

    // Ajouter sources spécialisées selon le sujet
    if (opportunity.topic.includes('conformité')) {
      baseSources.push('Analyse juridique spécialisée (Cabinet Vogel & Associés)');
    }
    if (opportunity.topic.includes('Monaco')) {
      baseSources.push('Réseau Monaco Tech Ecosystem (données exclusives)');
    }

    return baseSources.slice(0, 4); // Top 4 sources
  }

  static getEditorialCalendar(): EditorialOpportunity[] {
    const allSignals = [...this.criticalSignals, ...this.exclusiveInsights];

    return allSignals
      .map(signal => this.evaluateSignal(signal))
      .sort((a, b) => {
        // Trier par timing puis par valeur business
        if (a.timeWindow !== b.timeWindow) return a.timeWindow - b.timeWindow;
        return b.businessValue - a.businessValue;
      })
      .slice(0, 7); // Calendrier 1 semaine
  }
}