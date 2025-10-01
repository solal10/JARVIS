// API route pour le système éditorial automatique
import { NextRequest, NextResponse } from 'next/server';
import { AutoEditorialSystem } from '../../../lib/auto-editorial-system';

export async function POST(request: NextRequest) {
  try {
    const { action, config } = await request.json();

    switch (action) {
      case 'run-cycle':
        // Lancement manuel du cycle automatique
        await AutoEditorialSystem.runAutoEditorialCycle();
        return NextResponse.json({
          success: true,
          message: 'Cycle automatique exécuté',
          timestamp: new Date().toISOString()
        });

      case 'update-config':
        // Mise à jour de la configuration
        AutoEditorialSystem.updateConfig(config);
        return NextResponse.json({
          success: true,
          message: 'Configuration mise à jour',
          config: config
        });

      case 'scan-trends':
        // Scan manuel des tendances
        const trends = await AutoEditorialSystem.scanCurrentTrends();
        return NextResponse.json({
          success: true,
          trends: trends.slice(0, 10), // Top 10
          count: trends.length
        });

      default:
        return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur auto-editorial:', error);
    return NextResponse.json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET() {
  // Statut du système
  try {
    const status = AutoEditorialSystem.getStatus();
    return NextResponse.json({
      success: true,
      status,
      info: {
        description: 'Système éditorial automatique JARVIS',
        version: '1.0.0',
        lastCheck: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Erreur récupération du statut',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}