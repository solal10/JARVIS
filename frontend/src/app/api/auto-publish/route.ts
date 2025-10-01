import { NextResponse } from 'next/server';

// 🤖 SYSTÈME DE PUBLICATION AUTOMATIQUE JARVIS
// Publication SEO agressive : 2 articles/jour aux horaires optimaux

export async function POST() {
  try {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay(); // 0 = dimanche, 1 = lundi, etc.

    console.log(`🤖 Déclenchement auto-publish à ${hour}h - ${getDayName(dayOfWeek)}`);

    // 🎯 HORAIRES SEO OPTIMISÉS
    const isOptimalTime = checkOptimalPublishingTime(hour, dayOfWeek);

    if (!isOptimalTime.shouldPublish) {
      return NextResponse.json({
        success: false,
        reason: `Horaire non optimal (${hour}h). ${isOptimalTime.reason}`,
        nextOptimalTime: isOptimalTime.nextTime
      });
    }

    // 📊 SÉLECTION INTELLIGENTE DU SUJET
    const topicStrategy = selectOptimalTopic(hour);

    console.log(`🎯 Stratégie ${topicStrategy.type} sélectionnée : "${topicStrategy.topic}"`);

    // 🚀 GÉNÉRATION ET PUBLICATION
    const articleResponse = await fetch(`${process.env.BASE_URL || 'http://localhost:3000'}/api/generate-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topicStrategy.topic,
        category: topicStrategy.category,
        keywords: topicStrategy.keywords,
        saveToSite: true
      })
    });

    const articleData = await articleResponse.json();

    if (!articleData.success) {
      throw new Error(`Erreur génération article: ${articleData.error}`);
    }

    // 📈 LOG PUBLICATION POUR ANALYTICS
    logPublication({
      hour,
      dayOfWeek,
      strategy: topicStrategy.type,
      topic: topicStrategy.topic,
      title: articleData.article.title,
      wordCount: articleData.wordCount,
      seoScore: articleData.article.editorialIntelligence?.smartSelection?.seoScore || 0
    });

    return NextResponse.json({
      success: true,
      published: true,
      strategy: topicStrategy.type,
      article: {
        title: articleData.article.title,
        slug: articleData.article.slug,
        excerpt: articleData.article.excerpt,
        readTime: articleData.article.readTime,
        category: articleData.article.category
      },
      metrics: {
        wordCount: articleData.wordCount,
        seoScore: articleData.article.editorialIntelligence?.smartSelection?.seoScore || 0,
        publishTime: isOptimalTime.timeSlot,
        estimatedTraffic: articleData.article.editorialIntelligence?.smartSelection?.estimatedTraffic || 0
      },
      nextScheduled: getNextPublicationTime()
    });

  } catch (error) {
    console.error('🚨 Erreur publication automatique:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur système publication automatique',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// 🎯 HORAIRES SEO OPTIMISÉS (basés sur les meilleures pratiques)
function checkOptimalPublishingTime(hour: number, dayOfWeek: number): {
  shouldPublish: boolean;
  reason: string;
  timeSlot?: string;
  nextTime?: string;
} {
  // Weekend : stratégie différente
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    if (hour === 10 || hour === 16) {
      return {
        shouldPublish: true,
        reason: 'Horaire weekend optimal',
        timeSlot: hour === 10 ? 'weekend-morning' : 'weekend-afternoon'
      };
    }
    return {
      shouldPublish: false,
      reason: 'Weekend : publication seulement à 10h et 16h',
      nextTime: 'Lundi 8h'
    };
  }

  // Semaine : horaires business optimaux
  if (hour === 8 || hour === 18) {
    return {
      shouldPublish: true,
      reason: 'Horaire business optimal',
      timeSlot: hour === 8 ? 'business-morning' : 'business-evening'
    };
  }

  if (hour === 12) {
    return {
      shouldPublish: true,
      reason: 'Horaire lunch break optimal',
      timeSlot: 'lunch-time'
    };
  }

  return {
    shouldPublish: false,
    reason: `Horaire non optimal. Prochaines publications : 8h, 12h ou 18h`,
    nextTime: getNextOptimalTime(hour)
  };
}

// 🧠 SÉLECTION INTELLIGENTE DE SUJETS
function selectOptimalTopic(hour: number): {
  type: string;
  topic: string;
  category: string;
  keywords: string[];
} {
  const strategies = {
    morning: {
      type: 'Morning Insights',
      topics: [
        'Tendances IA entreprise 2024',
        'Startup européenne levées de fonds',
        'Innovation blockchain France',
        'Cybersécurité quantique industrielle',
        'No-code transformation digitale',
        'Intelligence artificielle audit conformité'
      ],
      category: 'Innovation',
      baseKeywords: ['innovation', 'business', 'stratégie']
    },
    lunch: {
      type: 'Lunch Break Analysis',
      topics: [
        'Guide pratique IA pour dirigeants',
        'ROI transformation digitale mesurable',
        'Écosystème startup Monaco tech',
        'Conformité RGPD intelligence artificielle',
        'Investissements tech européens 2024',
        'Formation équipes nouvelles technologies'
      ],
      category: 'Tech Business',
      baseKeywords: ['guide', 'pratique', 'entreprise']
    },
    evening: {
      type: 'Evening Deep Dive',
      topics: [
        'Analyse marché fintech européen',
        'Impact IA sur emploi France',
        'Réglementation tech Union européenne',
        'Développement durable technologies émergentes',
        'Sécurité données entreprises françaises',
        'Avenir travail intelligence artificielle'
      ],
      category: 'Analyse',
      baseKeywords: ['analyse', 'marché', 'tendances']
    }
  };

  let strategy;
  if (hour <= 10) {
    strategy = strategies.morning;
  } else if (hour >= 11 && hour <= 14) {
    strategy = strategies.lunch;
  } else {
    strategy = strategies.evening;
  }

  const topic = strategy.topics[Math.floor(Math.random() * strategy.topics.length)];

  return {
    type: strategy.type,
    topic,
    category: strategy.category,
    keywords: [...strategy.baseKeywords, ...extractTopicKeywords(topic)]
  };
}

function extractTopicKeywords(topic: string): string[] {
  const keywords = [];
  if (topic.includes('IA') || topic.includes('intelligence')) keywords.push('intelligence artificielle');
  if (topic.includes('startup')) keywords.push('startup', 'financement');
  if (topic.includes('blockchain')) keywords.push('blockchain', 'crypto');
  if (topic.includes('cybersécurité')) keywords.push('cybersécurité', 'sécurité');
  if (topic.includes('France') || topic.includes('européen')) keywords.push('France', 'Europe');
  return keywords;
}

function getNextOptimalTime(currentHour: number): string {
  if (currentHour < 8) return '8h';
  if (currentHour < 12) return '12h';
  if (currentHour < 18) return '18h';
  return 'Demain 8h';
}

function getNextPublicationTime(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (now.getHours() < 8) {
    return `Aujourd'hui 8h`;
  } else if (now.getHours() < 18) {
    return `Aujourd'hui 18h`;
  } else {
    return `Demain 8h`;
  }
}

function getDayName(dayOfWeek: number): string {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  return days[dayOfWeek];
}

function logPublication(data: any) {
  console.log('📊 Publication Analytics:', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

// 🔍 GET : Status du système de publication
export async function GET() {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay();

  const nextOptimal = checkOptimalPublishingTime(hour, dayOfWeek);
  const currentStrategy = selectOptimalTopic(hour);

  return NextResponse.json({
    status: 'active',
    currentTime: now.toISOString(),
    currentHour: hour,
    day: getDayName(dayOfWeek),
    isOptimalTime: nextOptimal.shouldPublish,
    reason: nextOptimal.reason,
    nextPublication: getNextPublicationTime(),
    currentStrategy: {
      type: currentStrategy.type,
      suggestedTopic: currentStrategy.topic,
      category: currentStrategy.category
    },
    schedule: {
      weekdays: ['8h (Morning Insights)', '12h (Lunch Analysis)', '18h (Evening Deep Dive)'],
      weekend: ['10h (Weekend Morning)', '16h (Weekend Afternoon)']
    }
  });
}