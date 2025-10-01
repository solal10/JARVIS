import { NextRequest, NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';
import { NewsAndTrendsService } from '@/lib/news-fetcher';

export async function GET() {
  try {
    // Mots-clés liés aux services JARVIS pour l'analyse des tendances
    const businessKeywords = [
      'intelligence artificielle',
      'audit IA',
      'développement web',
      'start-up',
      'web marketing',
      'automatisation',
      'Next.js',
      'React',
      'chatbot IA',
      'transformation digitale',
      'conseil IA',
      'agent conversationnel',
      'développement logiciel',
      'SEO',
      'Monaco tech',
      'startup France',
      'IA entreprise',
      'machine learning',
      'deep learning',
      'API développement',
      'application mobile',
      'cloud computing',
      'cybersécurité',
      'data science',
      'blockchain',
      'IoT internet objets'
    ];

    let relevantTopics: any[] = [];
    let usingFallback = false;

    try {
      // Essayer de récupérer les tendances quotidiennes
      const dailyTrends = await googleTrends.dailyTrends({
        geo: 'FR',
        hl: 'fr'
      });

      const parsedDaily = JSON.parse(dailyTrends);

      // Analyser les tendances quotidiennes pour trouver des sujets pertinents
      if (parsedDaily.default && parsedDaily.default.trendingSearchesDays) {
        parsedDaily.default.trendingSearchesDays[0].trendingSearches.forEach((trend: any) => {
          const query = trend.title.query.toLowerCase();

          // Vérifier si le sujet est pertinent pour nos services
          const isRelevant = businessKeywords.some(keyword =>
            query.includes(keyword.toLowerCase()) ||
            query.includes('ia') ||
            query.includes('tech') ||
            query.includes('digital') ||
            query.includes('web') ||
            query.includes('app') ||
            query.includes('startup') ||
            query.includes('innovation')
          );

          if (isRelevant) {
            relevantTopics.push({
              title: trend.title.query,
              trafficVolume: trend.formattedTraffic,
              relatedQueries: trend.relatedQueries || [],
              articles: trend.articles || []
            });
          }
        });
      }
    } catch (trendsError) {
      console.warn('Erreur Google Trends API, utilisation du système de fallback:', trendsError);
      usingFallback = true;

      // Utiliser nos données d'actualité tech enrichies
      const techTrends = NewsAndTrendsService.getRandomTechTrends(4);
      relevantTopics = techTrends.map(trend => ({
        title: trend.topic,
        trafficVolume: trend.impact === 'high' ? '25K+' : trend.impact === 'medium' ? '15K+' : '8K+',
        relatedQueries: [trend.topic.split(' ')[0], trend.category, "2024"],
        articles: [],
        context: trend.trend,
        businessRelevance: trend.businessRelevance,
        source: 'jarvis-intelligence'
      }));
    }

    // Si aucune tendance pertinente trouvée, utiliser nos sujets d'actualité
    if (relevantTopics.length === 0) {
      const fallbackTrends = NewsAndTrendsService.getHighImpactTrends();
      relevantTopics = fallbackTrends.slice(0, 5).map(trend => ({
        title: trend.topic,
        category: trend.category,
        keywords: [trend.topic, trend.category, "2024", "France"],
        trafficVolume: '30K+',
        context: trend.trend,
        businessRelevance: trend.businessRelevance,
        source: 'jarvis-curated'
      }));
      usingFallback = true;
    }

    // Générer des idées d'articles basées sur les tendances
    const articleIdeas = relevantTopics.map(topic => ({
      topic: typeof topic.title === 'string' ? topic.title : topic.topic || 'Article Tech',
      suggestedTitle: generateArticleTitle(typeof topic.title === 'string' ? topic.title : topic.topic),
      estimatedTraffic: topic.trafficVolume || 'N/A',
      keywords: extractKeywords(typeof topic.title === 'string' ? topic.title : topic.topic),
      category: categorizeByService(typeof topic.title === 'string' ? topic.title : topic.topic),
      priority: calculatePriority(topic)
    }));

    return NextResponse.json({
      success: true,
      trends: relevantTopics,
      articleIdeas: articleIdeas,
      generatedAt: new Date().toISOString(),
      totalRelevantTopics: relevantTopics.length,
      usingFallback,
      source: usingFallback ? 'fallback' : 'google-trends'
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des tendances:', error);

    // En cas d'erreur complète, retourner les sujets de fallback
    const fallbackTopics = generateFallbackTopics();
    const articleIdeas = fallbackTopics.map(topic => ({
      topic: topic.title,
      suggestedTitle: generateArticleTitle(topic.title),
      estimatedTraffic: 'N/A',
      keywords: topic.keywords,
      category: topic.category,
      priority: 40
    }));

    return NextResponse.json({
      success: true,
      trends: fallbackTopics,
      articleIdeas: articleIdeas,
      generatedAt: new Date().toISOString(),
      totalRelevantTopics: fallbackTopics.length,
      usingFallback: true,
      source: 'error-fallback',
      error: 'Google Trends temporairement indisponible'
    });
  }
}

// Fonction pour générer des titres d'articles optimisés SEO
function generateArticleTitle(topic: string): string {
  const templates = [
    `${topic} : Guide Complet 2024 pour Entreprises`,
    `Comment Utiliser ${topic} pour Votre Business en 2024`,
    `${topic} : Tendances et Opportunités pour Startups`,
    `Guide Expert ${topic} : Stratégies Gagnantes`,
    `${topic} en France : Analyse et Conseils d'Expert`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

// Fonction pour extraire des mots-clés SEO
function extractKeywords(topic: string): string[] {
  const baseKeywords = topic.toLowerCase().split(' ');
  const additionalKeywords = ['2024', 'France', 'entreprise', 'guide', 'conseil', 'expert'];
  return [...baseKeywords, ...additionalKeywords];
}

// Fonction pour catégoriser par service JARVIS
function categorizeByService(topic: string): string {
  const topicLower = topic.toLowerCase();

  if (topicLower.includes('ia') || topicLower.includes('intelligence') || topicLower.includes('chatbot')) {
    return 'Audit IA';
  } else if (topicLower.includes('web') || topicLower.includes('app') || topicLower.includes('développement')) {
    return 'Développement';
  } else if (topicLower.includes('startup') || topicLower.includes('financement')) {
    return 'Start-ups';
  } else if (topicLower.includes('marketing') || topicLower.includes('seo')) {
    return 'Web-Marketing';
  } else {
    return 'Tech Business';
  }
}

// Fonction pour calculer la priorité d'un article
function calculatePriority(topic: any): number {
  let priority = 0;

  // Plus le trafic est élevé, plus la priorité est haute
  if (topic.trafficVolume && topic.trafficVolume.includes('+')) {
    const traffic = parseInt(topic.trafficVolume.replace(/\D/g, ''));
    priority += Math.min(traffic / 1000, 50);
  }

  // Articles avec plus de requêtes connexes = priorité plus haute
  if (topic.relatedQueries) {
    priority += topic.relatedQueries.length * 2;
  }

  return Math.round(priority);
}

// Fonction de fallback en cas d'erreur API
function generateFallbackTopics() {
  return [
    {
      title: "Intelligence Artificielle Générative en Entreprise",
      category: "Audit IA",
      keywords: ["IA générative", "ChatGPT entreprise", "automatisation", "productivité"]
    },
    {
      title: "Next.js 14 : Nouvelles Fonctionnalités pour Développeurs",
      category: "Développement",
      keywords: ["Next.js 14", "React", "performance", "SEO"]
    },
    {
      title: "Financement Startup Tech 2024 : Tendances et Opportunités",
      category: "Start-ups",
      keywords: ["financement startup", "venture capital", "tech France"]
    }
  ];
}