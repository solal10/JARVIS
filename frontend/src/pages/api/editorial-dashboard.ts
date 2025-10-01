// API pour le tableau de bord éditorial automatique
import { NextApiRequest, NextApiResponse } from 'next';
import { AutoEditorialSystem } from '../../lib/auto-editorial-system';
import { EditorialScheduler } from '../../lib/editorial-scheduler';
import { TrendIntelligenceService } from '../../lib/trend-intelligence';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    try {
      // Récupération du statut complet du système
      const [
        autoEditorialStatus,
        schedulerStatus,
        trendStatus,
        topTrends
      ] = await Promise.all([
        AutoEditorialSystem.getStatus(),
        EditorialScheduler.getSchedulerStatus(),
        TrendIntelligenceService.getStatus(),
        TrendIntelligenceService.getTopTrendsForEditorial(5)
      ]);

      const dashboard = {
        system: {
          status: 'active',
          version: '2.0',
          lastUpdate: new Date().toISOString(),
          uptime: schedulerStatus.uptime
        },

        publication: {
          isEnabled: autoEditorialStatus.isEnabled,
          pendingPublications: autoEditorialStatus.pendingPublications,
          publishedThisWeek: autoEditorialStatus.publishedThisWeek,
          nextScan: autoEditorialStatus.nextScan
        },

        scheduler: {
          isActive: schedulerStatus.isActive,
          isRunning: schedulerStatus.isRunning,
          nextExecution: schedulerStatus.nextExecution,
          config: schedulerStatus.config
        },

        trends: {
          totalSources: trendStatus.totalSources,
          activeSources: trendStatus.activeSources,
          lastUpdate: trendStatus.lastUpdate,
          trendsCount: trendStatus.trendsCount,
          topTrends: topTrends.map(trend => ({
            keyword: trend.keyword,
            momentum: trend.momentum,
            relevance: trend.relevance,
            source: trend.source
          }))
        },

        metrics: {
          articlesThisMonth: 0, // TODO: Calculer depuis la base
          avgQualityScore: 0, // TODO: Moyenne des scores
          trendAccuracy: 0, // TODO: Précision des prédictions
          engagementRate: 0 // TODO: Taux d'engagement
        },

        alerts: await generateSystemAlerts(autoEditorialStatus, schedulerStatus, trendStatus)
      };

      res.status(200).json({
        success: true,
        dashboard,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Erreur dashboard:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur récupération dashboard',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  else if (req.method === 'POST') {
    const { action, params } = req.body;

    try {
      let result;

      switch (action) {
        case 'start-scheduler':
          EditorialScheduler.startScheduler();
          result = { message: 'Scheduler démarré' };
          break;

        case 'stop-scheduler':
          EditorialScheduler.stopScheduler();
          result = { message: 'Scheduler arrêté' };
          break;

        case 'run-cycle-now':
          const success = await EditorialScheduler.runNow();
          result = { message: success ? 'Cycle exécuté' : 'Échec cycle', success };
          break;

        case 'update-config':
          if (params.scheduler) {
            EditorialScheduler.updateConfig(params.scheduler);
          }
          if (params.autoEditorial) {
            AutoEditorialSystem.updateConfig(params.autoEditorial);
          }
          result = { message: 'Configuration mise à jour' };
          break;

        case 'force-trend-refresh':
          await TrendIntelligenceService.fetchRealTimeTrends();
          result = { message: 'Tendances rafraîchies' };
          break;

        default:
          res.status(400).json({ error: 'Action non reconnue' });
          return;
      }

      res.status(200).json({
        success: true,
        result,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Erreur action dashboard:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur exécution action',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}

// Génération d'alertes système
async function generateSystemAlerts(autoStatus: any, schedulerStatus: any, trendStatus: any) {
  const alerts = [];

  // Vérifications système
  if (!autoStatus.isEnabled) {
    alerts.push({
      type: 'warning',
      message: 'Système auto-éditorial désactivé',
      action: 'Vérifier la configuration',
      priority: 'medium'
    });
  }

  if (!schedulerStatus.isActive) {
    alerts.push({
      type: 'error',
      message: 'Scheduler arrêté',
      action: 'Redémarrer le scheduler',
      priority: 'high'
    });
  }

  if (trendStatus.activeSources < trendStatus.totalSources / 2) {
    alerts.push({
      type: 'warning',
      message: `Seulement ${trendStatus.activeSources}/${trendStatus.totalSources} sources de tendances actives`,
      action: 'Vérifier les APIs externes',
      priority: 'medium'
    });
  }

  // Vérifications temporelles
  const now = new Date();
  const lastTrendUpdate = new Date(trendStatus.lastUpdate);
  const hoursSinceUpdate = (now.getTime() - lastTrendUpdate.getTime()) / (1000 * 60 * 60);

  if (hoursSinceUpdate > 12) {
    alerts.push({
      type: 'warning',
      message: `Tendances non mises à jour depuis ${Math.floor(hoursSinceUpdate)}h`,
      action: 'Forcer le rafraîchissement',
      priority: 'medium'
    });
  }

  // Vérifications de contenu
  if (autoStatus.publishedThisWeek === 0) {
    alerts.push({
      type: 'info',
      message: 'Aucun article publié cette semaine',
      action: 'Vérifier les seuils de qualité',
      priority: 'low'
    });
  }

  if (autoStatus.publishedThisWeek > 5) {
    alerts.push({
      type: 'warning',
      message: 'Beaucoup d\'articles publiés cette semaine',
      action: 'Vérifier la qualité du contenu',
      priority: 'medium'
    });
  }

  return alerts;
}