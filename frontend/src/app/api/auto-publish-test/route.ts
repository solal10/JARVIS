import { NextResponse } from 'next/server';

// 🧪 VERSION TEST - Force publication pour démonstration
export async function POST() {
  try {
    console.log('🧪 TEST MODE - Publication forcée pour démonstration');

    // 🎯 SIMULATION HORAIRE OPTIMAL (8h matin business)
    const simulatedHour = 8;
    const topicStrategy = {
      type: 'Morning Insights TEST',
      topic: 'Révolution IA entreprise française 2024',
      category: 'Innovation',
      keywords: ['innovation', 'business', 'IA', 'France', 'entreprise']
    };

    console.log(`🎯 Stratégie TEST : "${topicStrategy.topic}"`);

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

    console.log(`✅ Article TEST publié : "${articleData.article.title}"`);

    return NextResponse.json({
      success: true,
      published: true,
      testMode: true,
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
        publishTime: 'test-morning',
        estimatedTraffic: articleData.article.editorialIntelligence?.smartSelection?.estimatedTraffic || 0
      }
    });

  } catch (error) {
    console.error('🚨 Erreur test publication:', error);

    return NextResponse.json({
      success: false,
      testMode: true,
      error: 'Erreur test système publication',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}