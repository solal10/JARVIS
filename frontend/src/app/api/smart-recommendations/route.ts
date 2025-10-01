import { NextResponse } from 'next/server';
import { SmartEditorialSelector } from '@/lib/smart-editorial-selector';

export async function GET() {
  try {
    // 🎯 Obtenir les meilleures recommandations intelligentes
    const topRecommendations = SmartEditorialSelector.getTopRecommendations(10);
    const bestTopic = SmartEditorialSelector.selectOptimalTopic();

    return NextResponse.json({
      success: true,
      data: {
        // 🏆 Recommandation N°1 (sujet optimal)
        optimal: {
          topic: bestTopic.topic,
          priority: bestTopic.priority,
          angle: bestTopic.angle,
          urgency: bestTopic.urgency,
          timing: bestTopic.timing,
          reasoning: bestTopic.reasoning,
          metrics: {
            actualityScore: bestTopic.actualityScore,
            seoScore: bestTopic.seoScore,
            trendScore: bestTopic.trendScore,
            estimatedTraffic: bestTopic.estimatedTraffic,
            businessValue: bestTopic.businessValue
          }
        },

        // 📊 Top 10 recommandations
        recommendations: topRecommendations.map(rec => ({
          topic: rec.topic,
          priority: rec.priority,
          angle: rec.angle,
          urgency: rec.urgency,
          reasoning: rec.reasoning,
          estimatedTraffic: rec.estimatedTraffic,
          scores: {
            actuality: rec.actualityScore,
            seo: rec.seoScore,
            trend: rec.trendScore
          }
        })),

        // 🎯 Insights stratégiques
        insights: {
          totalOpportunities: topRecommendations.length,
          criticalUrgency: topRecommendations.filter(r => r.urgency === 'critical').length,
          highTrafficPotential: topRecommendations.filter(r => r.estimatedTraffic > 2000).length,
          emergingTrends: topRecommendations.filter(r => r.trendScore > 80).length,
          hotTopics: topRecommendations.filter(r => r.actualityScore > 75).length,
          seoOpportunities: topRecommendations.filter(r => r.seoScore > 80).length
        },

        // 📈 Distribution des scores
        scoreDistribution: {
          averageActuality: Math.round(topRecommendations.reduce((sum, r) => sum + r.actualityScore, 0) / topRecommendations.length),
          averageSEO: Math.round(topRecommendations.reduce((sum, r) => sum + r.seoScore, 0) / topRecommendations.length),
          averageTrend: Math.round(topRecommendations.reduce((sum, r) => sum + r.trendScore, 0) / topRecommendations.length),
          averagePriority: Math.round(topRecommendations.reduce((sum, r) => sum + r.priority, 0) / topRecommendations.length)
        }
      },
      timestamp: new Date().toISOString(),
      system: 'JARVIS Smart Editorial Selector v1.0'
    });

  } catch (error) {
    console.error('🚨 Erreur système sélection intelligente:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur système sélection intelligente',
      fallback: {
        optimal: {
          topic: 'Intelligence artificielle entreprise',
          priority: 75,
          angle: 'Guide JARVIS : Transformer votre entreprise avec l\'IA',
          urgency: 'medium',
          timing: 'Publier cette semaine',
          reasoning: 'Sujet evergreen avec forte demande SEO',
          metrics: {
            actualityScore: 60,
            seoScore: 85,
            trendScore: 70,
            estimatedTraffic: 2500,
            businessValue: 80
          }
        }
      }
    }, { status: 500 });
  }
}

// 🎯 POST pour forcer une nouvelle analyse avec paramètres
export async function POST(request: Request) {
  try {
    const { filters } = await request.json();

    // Ici on pourrait ajouter des filtres dynamiques :
    // - Par domaine (IA, Blockchain, Cybersécurité...)
    // - Par urgence (critical, high...)
    // - Par score minimum
    // - Par volume de trafic estimé

    const recommendations = SmartEditorialSelector.getTopRecommendations(20);

    let filteredRecommendations = recommendations;

    if (filters?.minSeoScore) {
      filteredRecommendations = filteredRecommendations.filter(r => r.seoScore >= filters.minSeoScore);
    }

    if (filters?.urgency) {
      filteredRecommendations = filteredRecommendations.filter(r => r.urgency === filters.urgency);
    }

    if (filters?.minTraffic) {
      filteredRecommendations = filteredRecommendations.filter(r => r.estimatedTraffic >= filters.minTraffic);
    }

    return NextResponse.json({
      success: true,
      filtered: true,
      appliedFilters: filters,
      results: filteredRecommendations.slice(0, 10),
      totalFound: filteredRecommendations.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erreur filtrage recommandations'
    }, { status: 400 });
  }
}