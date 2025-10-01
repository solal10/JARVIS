import cron from 'node-cron';

class BlogScheduler {
  private static instance: BlogScheduler;
  private isRunning = false;
  private jobs: Map<string, cron.ScheduledTask> = new Map();

  private constructor() {}

  static getInstance(): BlogScheduler {
    if (!BlogScheduler.instance) {
      BlogScheduler.instance = new BlogScheduler();
    }
    return BlogScheduler.instance;
  }

  // Démarrer l'automatisation des articles de blog
  start() {
    if (this.isRunning) {
      console.log('⚠️ Le scheduler de blog est déjà en cours d\'exécution');
      return;
    }

    console.log('🚀 Démarrage du scheduler automatique de blog...');

    // Tâche principale : générer un article tous les 2 jours à 9h00
    const mainJob = cron.schedule('0 9 */2 * *', async () => {
      console.log('🤖 Exécution programmée de génération d\'article...');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auto-generate-blog`, {
          method: 'POST'
        });

        const result = await response.json();

        if (result.success) {
          console.log(`✅ Article généré avec succès : "${result.article.title}"`);
        } else {
          console.log(`⚠️ Génération échouée : ${result.message}`);
        }
      } catch (error) {
        console.error('❌ Erreur lors de la génération programmée:', error);
      }
    }, {
      scheduled: false, // On démarre manuellement
      timezone: "Europe/Paris"
    });

    // Tâche de vérification des tendances : tous les jours à 8h00
    const trendCheckJob = cron.schedule('0 8 * * *', async () => {
      console.log('📊 Vérification des tendances...');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/trends`);
        const trendsData = await response.json();

        if (trendsData.success && trendsData.articleIdeas.length > 0) {
          console.log(`📈 ${trendsData.articleIdeas.length} nouvelles idées d'articles détectées`);

          // Si on trouve des sujets très prioritaires (score > 50), générer immédiatement
          const urgentTopics = trendsData.articleIdeas.filter((idea: any) => idea.priority > 50);

          if (urgentTopics.length > 0) {
            console.log(`🔥 ${urgentTopics.length} sujets urgents détectés - génération immédiate`);

            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auto-generate-blog`, {
              method: 'POST'
            });

            const result = await response.json();
            if (result.success) {
              console.log(`✅ Article urgent généré : "${result.article.title}"`);
            }
          }
        }
      } catch (error) {
        console.error('❌ Erreur lors de la vérification des tendances:', error);
      }
    }, {
      scheduled: false,
      timezone: "Europe/Paris"
    });

    // Tâche de maintenance : nettoyage une fois par semaine le dimanche à minuit
    const maintenanceJob = cron.schedule('0 0 * * 0', async () => {
      console.log('🧹 Maintenance hebdomadaire du blog...');
      try {
        // Ici on pourrait ajouter des tâches de maintenance comme :
        // - Archiver les anciens articles
        // - Nettoyer les statistiques
        // - Optimiser les performances
        console.log('✅ Maintenance terminée');
      } catch (error) {
        console.error('❌ Erreur lors de la maintenance:', error);
      }
    }, {
      scheduled: false,
      timezone: "Europe/Paris"
    });

    // Stocker et démarrer les tâches
    this.jobs.set('main', mainJob);
    this.jobs.set('trends', trendCheckJob);
    this.jobs.set('maintenance', maintenanceJob);

    // Démarrer toutes les tâches
    mainJob.start();
    trendCheckJob.start();
    maintenanceJob.start();

    this.isRunning = true;
    console.log('✅ Scheduler de blog démarré avec succès !');
    console.log('📅 Prochaines exécutions :');
    console.log('  - Génération d\'articles : tous les 2 jours à 9h00');
    console.log('  - Vérification des tendances : tous les jours à 8h00');
    console.log('  - Maintenance : tous les dimanches à minuit');
  }

  // Arrêter le scheduler
  stop() {
    if (!this.isRunning) {
      console.log('⚠️ Le scheduler n\'est pas en cours d\'exécution');
      return;
    }

    console.log('⏹️ Arrêt du scheduler de blog...');

    this.jobs.forEach((job, name) => {
      job.stop();
      job.destroy();
      console.log(`✅ Tâche "${name}" arrêtée`);
    });

    this.jobs.clear();
    this.isRunning = false;
    console.log('✅ Scheduler arrêté avec succès');
  }

  // Exécuter manuellement la génération d'un article
  async generateNow(): Promise<any> {
    console.log('🚀 Génération manuelle d\'un article...');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auto-generate-blog`, {
        method: 'POST'
      });

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Article généré manuellement : "${result.article.title}"`);
      } else {
        console.log(`⚠️ Génération manuelle échouée : ${result.message}`);
      }

      return result;
    } catch (error) {
      console.error('❌ Erreur lors de la génération manuelle:', error);
      return { success: false, error: 'Erreur lors de la génération manuelle' };
    }
  }

  // Vérifier le statut du scheduler
  getStatus() {
    return {
      isRunning: this.isRunning,
      activeJobs: Array.from(this.jobs.keys()),
      nextRuns: this.isRunning ? {
        articles: 'Tous les 2 jours à 9h00',
        trends: 'Tous les jours à 8h00',
        maintenance: 'Dimanche à minuit'
      } : null
    };
  }

  // Programmer une génération unique à une heure spécifique
  scheduleOneTime(cronExpression: string, description: string = 'Tâche unique') {
    const uniqueId = `onetime_${Date.now()}`;

    const job = cron.schedule(cronExpression, async () => {
      console.log(`🎯 Exécution de la tâche unique : ${description}`);
      await this.generateNow();

      // Supprimer la tâche après exécution
      job.stop();
      job.destroy();
      this.jobs.delete(uniqueId);
      console.log(`✅ Tâche unique "${description}" terminée et supprimée`);
    }, {
      scheduled: true,
      timezone: "Europe/Paris"
    });

    this.jobs.set(uniqueId, job);
    console.log(`📅 Tâche unique programmée : "${description}" - ${cronExpression}`);

    return uniqueId;
  }
}

// Exporter l'instance singleton
export const blogScheduler = BlogScheduler.getInstance();

// Fonctions utilitaires pour faciliter l'utilisation
export const startBlogAutomation = () => blogScheduler.start();
export const stopBlogAutomation = () => blogScheduler.stop();
export const generateArticleNow = () => blogScheduler.generateNow();
export const getBlogSchedulerStatus = () => blogScheduler.getStatus();

// Types pour TypeScript
export interface BlogSchedulerStatus {
  isRunning: boolean;
  activeJobs: string[];
  nextRuns: {
    articles: string;
    trends: string;
    maintenance: string;
  } | null;
}