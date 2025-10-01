// Système de veille des tendances en temps réel
// Intégration avec APIs externes pour intelligence de marché

interface TrendSource {
  name: string;
  url: string;
  weight: number; // Importance 0-100
  enabled: boolean;
  lastFetch: Date;
  rateLimit: number; // Requêtes par heure
}

interface RealTimeTrend {
  keyword: string;
  momentum: number;
  volume: number;
  growth: number; // % croissance
  source: string;
  timestamp: Date;
  relevance: number; // Pour JARVIS
  urls: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export class TrendIntelligenceService {
  private static sources: TrendSource[] = [
    {
      name: 'Google Trends',
      url: 'https://trends.google.com/trending/rss?geo=FR',
      weight: 90,
      enabled: true,
      lastFetch: new Date(0),
      rateLimit: 100
    },
    {
      name: 'Tech News RSS',
      url: 'https://feeds.feedburner.com/TechCrunch',
      weight: 85,
      enabled: true,
      lastFetch: new Date(0),
      rateLimit: 200
    },
    {
      name: 'Business News',
      url: 'https://www.lesechos.fr/rss/entreprises-finance.xml',
      weight: 80,
      enabled: true,
      lastFetch: new Date(0),
      rateLimit: 150
    },
    {
      name: 'Reddit Tech',
      url: 'https://www.reddit.com/r/technology/.rss',
      weight: 60,
      enabled: true,
      lastFetch: new Date(0),
      rateLimit: 100
    }
  ];

  private static trendCache: RealTimeTrend[] = [];
  private static lastUpdate: Date = new Date(0);

  // Mots-clés prioritaires pour JARVIS
  private static jarvisKeywords = [
    { term: 'intelligence artificielle', weight: 100, category: 'core' },
    { term: 'IA entreprise', weight: 95, category: 'core' },
    { term: 'transformation digitale', weight: 90, category: 'core' },
    { term: 'conformité RGPD', weight: 85, category: 'compliance' },
    { term: 'AI Act', weight: 85, category: 'compliance' },
    { term: 'audit IA', weight: 80, category: 'services' },
    { term: 'ChatGPT entreprise', weight: 75, category: 'tools' },
    { term: 'cloud computing', weight: 70, category: 'tech' },
    { term: 'cybersécurité', weight: 75, category: 'security' },
    { term: 'start-up française', weight: 65, category: 'market' },
    { term: 'financement tech', weight: 60, category: 'finance' },
    { term: 'Monaco tech', weight: 90, category: 'local' },
    { term: 'souveraineté numérique', weight: 80, category: 'policy' }
  ];

  // Collecte automatique des tendances
  static async fetchRealTimeTrends(): Promise<RealTimeTrend[]> {
    const now = new Date();

    // Cache de 30 minutes
    if (now.getTime() - this.lastUpdate.getTime() < 30 * 60 * 1000) {
      return this.trendCache;
    }

    console.log('[TREND-INTEL] Collecte des tendances en cours...');

    const allTrends: RealTimeTrend[] = [];

    // Parallélisation des sources
    const fetchPromises = this.sources
      .filter(source => source.enabled)
      .filter(source => this.canFetchSource(source))
      .map(source => this.fetchFromSource(source));

    const results = await Promise.allSettled(fetchPromises);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allTrends.push(...result.value);
      } else {
        console.error(`[TREND-INTEL] Erreur source ${this.sources[index].name}:`, result.reason);
      }
    });

    // Analyse et scoring des tendances
    const analyzedTrends = this.analyzeTrends(allTrends);

    // Filtrage par pertinence JARVIS
    this.trendCache = analyzedTrends
      .filter(trend => trend.relevance > 40)
      .sort((a, b) => b.momentum - a.momentum)
      .slice(0, 50); // Top 50

    this.lastUpdate = now;

    console.log(`[TREND-INTEL] ${this.trendCache.length} tendances collectées et analysées`);

    return this.trendCache;
  }

  // Vérification des limites de taux
  private static canFetchSource(source: TrendSource): boolean {
    const now = new Date();
    const hoursSinceLastFetch = (now.getTime() - source.lastFetch.getTime()) / (1000 * 60 * 60);
    return hoursSinceLastFetch >= (1 / source.rateLimit);
  }

  // Collecte depuis une source spécifique
  private static async fetchFromSource(source: TrendSource): Promise<RealTimeTrend[]> {
    try {
      console.log(`[TREND-INTEL] Fetch ${source.name}...`);

      source.lastFetch = new Date();

      // Simulation de données (à remplacer par vraies API calls)
      const trends: RealTimeTrend[] = [];

      if (source.name === 'Google Trends') {
        trends.push(...this.simulateGoogleTrends());
      } else if (source.name.includes('Tech News')) {
        trends.push(...this.simulateTechNews());
      } else if (source.name.includes('Business')) {
        trends.push(...this.simulateBusinessNews());
      } else if (source.name.includes('Reddit')) {
        trends.push(...this.simulateRedditTrends());
      }

      return trends.map(trend => ({
        ...trend,
        source: source.name,
        timestamp: new Date()
      }));

    } catch (error) {
      console.error(`[TREND-INTEL] Erreur ${source.name}:`, error);
      return [];
    }
  }

  // Simulation Google Trends (à remplacer par vraie API)
  private static simulateGoogleTrends(): RealTimeTrend[] {
    const trends = [
      'ChatGPT-5 sortie officielle',
      'IA générative en entreprise',
      'Conformité AI Act Europe',
      'Audit intelligence artificielle',
      'Transformation digitale PME',
      'Cloud computing coûts',
      'Cybersécurité IA',
      'Monaco devient hub tech européen'
    ];

    return trends.map(keyword => ({
      keyword,
      momentum: Math.floor(Math.random() * 100) + 50,
      volume: Math.floor(Math.random() * 100000) + 10000,
      growth: Math.floor(Math.random() * 200) - 50,
      source: 'Google Trends',
      timestamp: new Date(),
      relevance: this.calculateRelevance(keyword),
      urls: [`https://trends.google.com/search?q=${encodeURIComponent(keyword)}`],
      sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as any
    }));
  }

  // Simulation Tech News
  private static simulateTechNews(): RealTimeTrend[] {
    const news = [
      'OpenAI révèle GPT-5 pour entreprises',
      'Microsoft Azure IA coûts explosent',
      'Start-up française lève 50M€ IA',
      'Europe lance fonds souveraineté tech',
      'NVIDIA nouvelle puce IA révolutionnaire',
      'Meta abandonne projet métavers IA'
    ];

    return news.map(keyword => ({
      keyword,
      momentum: Math.floor(Math.random() * 100) + 40,
      volume: Math.floor(Math.random() * 50000) + 5000,
      growth: Math.floor(Math.random() * 300),
      source: 'Tech News',
      timestamp: new Date(),
      relevance: this.calculateRelevance(keyword),
      urls: [`https://techcrunch.com/search/${encodeURIComponent(keyword)}`],
      sentiment: Math.random() > 0.3 ? 'positive' : 'neutral'
    }));
  }

  // Simulation Business News
  private static simulateBusinessNews(): RealTimeTrend[] {
    const business = [
      'CAC 40 investit massivement IA',
      'PME françaises adoptent ChatGPT',
      'Conformité RGPD IA obligatoire 2025',
      'Audit digital devient priorité',
      'Monaco attire géants tech américains',
      'Fonds européens tech 12 milliards'
    ];

    return business.map(keyword => ({
      keyword,
      momentum: Math.floor(Math.random() * 80) + 30,
      volume: Math.floor(Math.random() * 30000) + 3000,
      growth: Math.floor(Math.random() * 150) + 10,
      source: 'Business News',
      timestamp: new Date(),
      relevance: this.calculateRelevance(keyword),
      urls: [`https://lesechos.fr/search?q=${encodeURIComponent(keyword)}`],
      sentiment: Math.random() > 0.4 ? 'positive' : 'neutral'
    }));
  }

  // Simulation Reddit Trends
  private static simulateRedditTrends(): RealTimeTrend[] {
    const reddit = [
      'IA remplace développeurs junior',
      'ChatGPT hallucinations problème majeur',
      'Startup IA française concurrent OpenAI',
      'Cloud européen vs américain',
      'Conformité IA impossible PME',
      'Monaco nouveau Silicon Valley'
    ];

    return reddit.map(keyword => ({
      keyword,
      momentum: Math.floor(Math.random() * 70) + 20,
      volume: Math.floor(Math.random() * 20000) + 1000,
      growth: Math.floor(Math.random() * 400) - 100,
      source: 'Reddit Tech',
      timestamp: new Date(),
      relevance: this.calculateRelevance(keyword),
      urls: [`https://reddit.com/search?q=${encodeURIComponent(keyword)}`],
      sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as any
    }));
  }

  // Calcul de pertinence pour JARVIS
  private static calculateRelevance(keyword: string): number {
    let relevance = 0;

    this.jarvisKeywords.forEach(jkw => {
      if (keyword.toLowerCase().includes(jkw.term.toLowerCase())) {
        relevance = Math.max(relevance, jkw.weight);
      }
    });

    // Bonus pour mots-clés business
    const businessWords = ['entreprise', 'PME', 'audit', 'conformité', 'transformation', 'roi', 'efficacité'];
    businessWords.forEach(word => {
      if (keyword.toLowerCase().includes(word)) {
        relevance += 10;
      }
    });

    // Bonus pour géolocalisation
    const geoWords = ['france', 'français', 'europe', 'européen', 'monaco'];
    geoWords.forEach(word => {
      if (keyword.toLowerCase().includes(word)) {
        relevance += 15;
      }
    });

    return Math.min(relevance, 100);
  }

  // Analyse et enrichissement des tendances
  private static analyzeTrends(trends: RealTimeTrend[]): RealTimeTrend[] {
    return trends.map(trend => {
      // Calcul momentum ajusté
      const sourceWeight = this.sources.find(s => s.name === trend.source)?.weight || 50;
      const adjustedMomentum = (trend.momentum * sourceWeight) / 100;

      // Détection des opportunités business
      const businessOpportunity = this.detectBusinessOpportunity(trend);

      return {
        ...trend,
        momentum: Math.floor(adjustedMomentum),
        relevance: Math.max(trend.relevance, businessOpportunity)
      };
    });
  }

  // Détection d'opportunités business
  private static detectBusinessOpportunity(trend: RealTimeTrend): number {
    let opportunity = 0;

    // Patterns business forts
    const strongPatterns = [
      'économisé', 'millions', 'croissance', 'revenus', 'rentabilité',
      'efficacité', 'productivité', 'ROI', 'investissement', 'financement'
    ];

    const mediumPatterns = [
      'nouveau', 'innovation', 'révolution', 'transformation', 'adoption',
      'marché', 'secteur', 'industrie', 'entreprises', 'clients'
    ];

    strongPatterns.forEach(pattern => {
      if (trend.keyword.toLowerCase().includes(pattern)) {
        opportunity += 30;
      }
    });

    mediumPatterns.forEach(pattern => {
      if (trend.keyword.toLowerCase().includes(pattern)) {
        opportunity += 15;
      }
    });

    return Math.min(opportunity, 50);
  }

  // API publique pour récupérer les tendances pertinentes
  static async getTopTrendsForEditorial(limit: number = 10): Promise<RealTimeTrend[]> {
    const trends = await this.fetchRealTimeTrends();

    return trends
      .filter(trend => trend.relevance > 60) // Seuil qualité
      .filter(trend => trend.momentum > 50)  // Seuil dynamisme
      .slice(0, limit);
  }

  // Recherche de tendances par catégorie
  static async getTrendsByCategory(category: string): Promise<RealTimeTrend[]> {
    const trends = await this.fetchRealTimeTrends();
    const categoryKeywords = this.jarvisKeywords.filter(k => k.category === category);

    return trends.filter(trend =>
      categoryKeywords.some(ck =>
        trend.keyword.toLowerCase().includes(ck.term.toLowerCase())
      )
    );
  }

  // Configuration des sources
  static updateSources(sources: Partial<TrendSource>[]): void {
    sources.forEach(update => {
      const sourceIndex = this.sources.findIndex(s => s.name === update.name);
      if (sourceIndex >= 0) {
        this.sources[sourceIndex] = { ...this.sources[sourceIndex], ...update };
      }
    });

    console.log('[TREND-INTEL] Sources mises à jour');
  }

  // Status et diagnostics
  static getStatus(): {
    totalSources: number;
    activeSources: number;
    lastUpdate: Date;
    trendsCount: number;
    topTrends: RealTimeTrend[];
  } {
    return {
      totalSources: this.sources.length,
      activeSources: this.sources.filter(s => s.enabled).length,
      lastUpdate: this.lastUpdate,
      trendsCount: this.trendCache.length,
      topTrends: this.trendCache.slice(0, 5)
    };
  }
}