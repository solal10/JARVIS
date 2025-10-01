// Système éditorial automatique JARVIS - Génération et publication autonome d'articles
// Basé sur l'intelligence des tendances en temps réel

import { EditorialIntelligenceService } from './editorial-intelligence';
import { PremiumEditorialService } from './premium-editorial';
import { TrendIntelligenceService } from './trend-intelligence';
import fs from 'fs/promises';
import path from 'path';

interface AutoPublishConfig {
  intervalDays: number; // Tous les X jours
  minScoreThreshold: number; // Score minimum pour publication
  maxArticlesPerWeek: number;
  publishTime: string; // "09:00" format HH:MM
  enableAutoPublish: boolean;
}

interface TrendSignal {
  keyword: string;
  momentum: number; // 0-100
  searchVolume: number;
  competitionLevel: 'low' | 'medium' | 'high';
  lastUpdated: Date;
  source: string;
}

interface ScheduledPublication {
  id: string;
  scheduledDate: Date;
  topic: string;
  score: number;
  status: 'pending' | 'generated' | 'published' | 'cancelled';
  article?: any;
}

export class AutoEditorialSystem {
  private static config: AutoPublishConfig = {
    intervalDays: 3,
    minScoreThreshold: 85,
    maxArticlesPerWeek: 2,
    publishTime: "09:00",
    enableAutoPublish: true
  };

  private static scheduledPublications: ScheduledPublication[] = [];
  private static lastTrendScan: Date = new Date(0);
  private static trendCache: TrendSignal[] = [];

  // Système de veille automatique des tendances avec API externe
  static async scanCurrentTrends(): Promise<TrendSignal[]> {
    const now = new Date();

    // Mise à jour des tendances toutes les 6 heures
    if (now.getTime() - this.lastTrendScan.getTime() < 6 * 60 * 60 * 1000) {
      return this.trendCache;
    }

    console.log('[AUTO-EDITORIAL] Scan des tendances en cours...');

    try {
      // Utilisation du système de veille intelligent
      const realTimeTrends = await TrendIntelligenceService.getTopTrendsForEditorial(20);

      // Conversion vers le format TrendSignal
      this.trendCache = realTimeTrends.map(rt => ({
        keyword: rt.keyword,
        momentum: rt.momentum,
        searchVolume: rt.volume,
        competitionLevel: rt.momentum > 80 ? 'high' : rt.momentum > 50 ? 'medium' : 'low',
        lastUpdated: rt.timestamp,
        source: rt.source
      }));

      this.lastTrendScan = now;

      console.log(`[AUTO-EDITORIAL] ${this.trendCache.length} tendances collectées via intelligence externe`);
      return this.trendCache;

    } catch (error) {
      console.error('[AUTO-EDITORIAL] Erreur scan tendances:', error);

      // Fallback sur données statiques si API externe échoue
      return this.fallbackTrends();
    }
  }

  // Fallback en cas d'échec API externe
  private static fallbackTrends(): TrendSignal[] {
    console.log('[AUTO-EDITORIAL] Utilisation du fallback de tendances');

    const fallbackData = [
      { keyword: 'Intelligence artificielle générative', momentum: 95 },
      { keyword: 'Conformité IA européenne', momentum: 88 },
      { keyword: 'Audit digital entreprise', momentum: 82 },
      { keyword: 'Monaco hub technologique', momentum: 79 },
      { keyword: 'Transformation PME française', momentum: 75 }
    ];

    return fallbackData.map(data => ({
      keyword: data.keyword,
      momentum: data.momentum,
      searchVolume: Math.floor(Math.random() * 50000) + 10000,
      competitionLevel: 'medium' as any,
      lastUpdated: new Date(),
      source: 'Fallback JARVIS'
    }));
  }

  // Moteur de décision automatique pour les publications
  static async evaluatePublicationOpportunity(): Promise<ScheduledPublication | null> {
    const trends = await this.scanCurrentTrends();
    const opportunity = EditorialIntelligenceService.selectPremiumTopic();

    // Calcul du score composite avec tendances temps réel
    const relevantTrend = trends.find(t =>
      t.keyword.toLowerCase().includes(opportunity.topic.toLowerCase()) ||
      opportunity.topic.toLowerCase().includes(t.keyword.toLowerCase())
    );

    let finalScore = opportunity.businessValue * 0.4 + opportunity.jarvisExpertise * 0.3;

    if (relevantTrend) {
      finalScore += relevantTrend.momentum * 0.2; // Boost selon momentum tendance
      finalScore += (100 - this.getCompetitionScore(relevantTrend.competitionLevel)) * 0.1;
    }

    // Vérification des critères de publication
    if (finalScore < this.config.minScoreThreshold) {
      console.log(`[AUTO-EDITORIAL] Score trop faible: ${finalScore.toFixed(1)} < ${this.config.minScoreThreshold}`);
      return null;
    }

    // Vérification du quota hebdomadaire
    const thisWeek = this.getThisWeekPublications();
    if (thisWeek.length >= this.config.maxArticlesPerWeek) {
      console.log(`[AUTO-EDITORIAL] Quota hebdomadaire atteint: ${thisWeek.length}/${this.config.maxArticlesPerWeek}`);
      return null;
    }

    // Programmation de la publication
    const scheduledDate = this.calculateNextPublishDate();

    const publication: ScheduledPublication = {
      id: `auto-${Date.now()}`,
      scheduledDate,
      topic: opportunity.topic,
      score: finalScore,
      status: 'pending'
    };

    this.scheduledPublications.push(publication);
    console.log(`[AUTO-EDITORIAL] Publication programmée: "${opportunity.topic}" le ${scheduledDate.toISOString()}`);

    return publication;
  }

  // Génération automatique d'article
  static async generateScheduledArticle(publicationId: string): Promise<boolean> {
    const publication = this.scheduledPublications.find(p => p.id === publicationId);
    if (!publication || publication.status !== 'pending') {
      return false;
    }

    try {
      console.log(`[AUTO-EDITORIAL] Génération de l'article: "${publication.topic}"`);

      const article = PremiumEditorialService.generatePremiumArticle(
        publication.topic,
        'Tech Business'
      );

      publication.article = {
        ...article,
        slug: this.generateSlug(article.title),
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        author: "JARVIS Auto-Editorial",
        status: "published",
        autoGenerated: true,
        sourceScore: publication.score
      };

      publication.status = 'generated';
      console.log(`[AUTO-EDITORIAL] Article généré avec succès`);
      return true;

    } catch (error) {
      console.error(`[AUTO-EDITORIAL] Erreur génération:`, error);
      publication.status = 'cancelled';
      return false;
    }
  }

  // Publication automatique sur le site
  static async publishScheduledArticle(publicationId: string): Promise<boolean> {
    const publication = this.scheduledPublications.find(p => p.id === publicationId);
    if (!publication || publication.status !== 'generated' || !publication.article) {
      return false;
    }

    try {
      console.log(`[AUTO-EDITORIAL] Publication en cours: "${publication.topic}"`);

      // Lecture des articles existants
      const articlesPath = path.join(process.cwd(), 'src/data/blog/articles.json');
      const articlesData = await fs.readFile(articlesPath, 'utf-8');
      const articles = JSON.parse(articlesData);

      // Ajout du nouvel article en première position
      articles.unshift(publication.article);

      // Sauvegarde
      await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));

      publication.status = 'published';
      console.log(`[AUTO-EDITORIAL] Article publié avec succès`);

      // Nettoyage des anciennes publications
      this.cleanupOldPublications();

      return true;

    } catch (error) {
      console.error(`[AUTO-EDITORIAL] Erreur publication:`, error);
      return false;
    }
  }

  // Processus principal automatique
  static async runAutoEditorialCycle(): Promise<void> {
    if (!this.config.enableAutoPublish) {
      console.log('[AUTO-EDITORIAL] Système désactivé');
      return;
    }

    console.log('[AUTO-EDITORIAL] Début du cycle automatique');

    try {
      // 1. Évaluer les opportunités
      const opportunity = await this.evaluatePublicationOpportunity();
      if (!opportunity) {
        console.log('[AUTO-EDITORIAL] Aucune opportunité de publication');
        return;
      }

      // 2. Générer l'article
      const generated = await this.generateScheduledArticle(opportunity.id);
      if (!generated) {
        console.log('[AUTO-EDITORIAL] Échec de génération');
        return;
      }

      // 3. Publier immédiatement (pour test/demo)
      const published = await this.publishScheduledArticle(opportunity.id);
      if (published) {
        console.log('[AUTO-EDITORIAL] Cycle terminé avec succès - Article publié');
      } else {
        console.log('[AUTO-EDITORIAL] Échec de publication');
      }

    } catch (error) {
      console.error('[AUTO-EDITORIAL] Erreur dans le cycle:', error);
    }
  }

  // Utilitaires
  private static getCompetitionScore(level: string): number {
    switch (level) {
      case 'low': return 20;
      case 'medium': return 50;
      case 'high': return 80;
      default: return 50;
    }
  }

  private static getThisWeekPublications(): ScheduledPublication[] {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    return this.scheduledPublications.filter(p =>
      p.status === 'published' &&
      new Date(p.scheduledDate) >= weekStart
    );
  }

  private static calculateNextPublishDate(): Date {
    const now = new Date();
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + this.config.intervalDays);

    const [hours, minutes] = this.config.publishTime.split(':');
    nextDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    return nextDate;
  }

  private static isPublishTimeWindow(): boolean {
    const now = new Date();
    const [targetHours, targetMinutes] = this.config.publishTime.split(':');
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const targetMinutesTotal = parseInt(targetHours) * 60 + parseInt(targetMinutes);

    // Fenêtre de 30 minutes autour de l'heure cible
    return Math.abs(currentMinutes - targetMinutesTotal) <= 30;
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
  }

  private static cleanupOldPublications(): void {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30); // Garder 30 jours d'historique

    this.scheduledPublications = this.scheduledPublications.filter(p =>
      new Date(p.scheduledDate) >= cutoff
    );
  }

  // API de configuration
  static updateConfig(newConfig: Partial<AutoPublishConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('[AUTO-EDITORIAL] Configuration mise à jour:', this.config);
  }

  static getStatus(): {
    isEnabled: boolean;
    nextScan: Date;
    pendingPublications: number;
    publishedThisWeek: number;
    currentTrends: number;
  } {
    const nextScan = new Date(this.lastTrendScan.getTime() + 6 * 60 * 60 * 1000);

    return {
      isEnabled: this.config.enableAutoPublish,
      nextScan,
      pendingPublications: this.scheduledPublications.filter(p => p.status === 'pending').length,
      publishedThisWeek: this.getThisWeekPublications().length,
      currentTrends: this.trendCache.length
    };
  }
}