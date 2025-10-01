// Scheduler automatique pour le système éditorial JARVIS
// Cron job et gestion des tâches programmées

import { AutoEditorialSystem } from './auto-editorial-system';

interface SchedulerConfig {
  enabled: boolean;
  interval: number; // en millisecondes
  maxRetries: number;
  retryDelay: number;
}

export class EditorialScheduler {
  private static instance: EditorialScheduler;
  private static timer: NodeJS.Timeout | null = null;
  private static isRunning: boolean = false;

  private static config: SchedulerConfig = {
    enabled: true,
    interval: 3 * 60 * 60 * 1000, // 3 heures par défaut
    maxRetries: 3,
    retryDelay: 30 * 60 * 1000 // 30 minutes
  };

  // Singleton pattern
  static getInstance(): EditorialScheduler {
    if (!this.instance) {
      this.instance = new EditorialScheduler();
    }
    return this.instance;
  }

  // Démarrage du scheduler automatique
  static startScheduler(): void {
    if (this.timer || this.isRunning) {
      console.log('[SCHEDULER] Déjà en cours d\'exécution');
      return;
    }

    if (!this.config.enabled) {
      console.log('[SCHEDULER] Désactivé par configuration');
      return;
    }

    console.log(`[SCHEDULER] Démarrage - Intervalle: ${this.config.interval / 1000 / 60} minutes`);

    // Exécution immédiate puis récurrente
    this.executeEditorialCycle();

    this.timer = setInterval(() => {
      this.executeEditorialCycle();
    }, this.config.interval);

    console.log('[SCHEDULER] Programmé avec succès');
  }

  // Arrêt du scheduler
  static stopScheduler(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      console.log('[SCHEDULER] Arrêté');
    }

    this.isRunning = false;
  }

  // Exécution d'un cycle avec gestion d'erreurs et retry
  private static async executeEditorialCycle(retryCount: number = 0): Promise<void> {
    if (this.isRunning) {
      console.log('[SCHEDULER] Cycle déjà en cours, skip');
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();

    try {
      console.log(`[SCHEDULER] === DÉBUT CYCLE ${new Date().toISOString()} ===`);

      // Vérification des prérequis
      const status = AutoEditorialSystem.getStatus();
      if (!status.isEnabled) {
        console.log('[SCHEDULER] Système auto-éditorial désactivé');
        return;
      }

      // Exécution du cycle principal
      await AutoEditorialSystem.runAutoEditorialCycle();

      const duration = Date.now() - startTime;
      console.log(`[SCHEDULER] === FIN CYCLE (${duration}ms) ===`);

      // Reset retry counter on success
      if (retryCount > 0) {
        console.log('[SCHEDULER] Récupération réussie après erreur');
      }

    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[SCHEDULER] ERREUR CYCLE (${duration}ms):`, error);

      // Gestion des tentatives de récupération
      if (retryCount < this.config.maxRetries) {
        const nextRetry = retryCount + 1;
        const delay = this.config.retryDelay * nextRetry; // Backoff exponentiel

        console.log(`[SCHEDULER] Retry ${nextRetry}/${this.config.maxRetries} dans ${delay / 1000}s`);

        setTimeout(() => {
          this.executeEditorialCycle(nextRetry);
        }, delay);

      } else {
        console.error(`[SCHEDULER] Échec définitif après ${this.config.maxRetries} tentatives`);

        // Notification d'erreur critique (email, webhook, etc.)
        this.notifyCriticalError(error);
      }

    } finally {
      this.isRunning = false;
    }
  }

  // Notification d'erreur critique
  private static notifyCriticalError(error: any): void {
    console.error('[SCHEDULER] ⚠️  ERREUR CRITIQUE - Intervention requise');
    console.error('Détails:', error);

    // TODO: Intégrer notifications (email, Slack, Discord, etc.)
    // Exemple:
    // - Envoi email à l'admin
    // - Post Slack/Discord
    // - Log dans système de monitoring
  }

  // Configuration dynamique
  static updateConfig(newConfig: Partial<SchedulerConfig>): void {
    const oldConfig = { ...this.config };
    this.config = { ...this.config, ...newConfig };

    console.log('[SCHEDULER] Configuration mise à jour:', {
      old: oldConfig,
      new: this.config
    });

    // Redémarrage si l'intervalle a changé
    if (oldConfig.interval !== this.config.interval && this.timer) {
      console.log('[SCHEDULER] Redémarrage pour nouveau timing');
      this.stopScheduler();
      this.startScheduler();
    }

    // Démarrage/arrêt selon enabled
    if (!oldConfig.enabled && this.config.enabled) {
      this.startScheduler();
    } else if (oldConfig.enabled && !this.config.enabled) {
      this.stopScheduler();
    }
  }

  // Exécution manuelle
  static async runNow(): Promise<boolean> {
    console.log('[SCHEDULER] Exécution manuelle demandée');

    try {
      await this.executeEditorialCycle();
      return true;
    } catch (error) {
      console.error('[SCHEDULER] Erreur exécution manuelle:', error);
      return false;
    }
  }

  // Statut détaillé
  static getSchedulerStatus(): {
    isActive: boolean;
    isRunning: boolean;
    config: SchedulerConfig;
    nextExecution: Date | null;
    uptime: string;
  } {
    const nextExecution = this.timer
      ? new Date(Date.now() + this.config.interval)
      : null;

    return {
      isActive: !!this.timer,
      isRunning: this.isRunning,
      config: this.config,
      nextExecution,
      uptime: this.timer ? 'En cours' : 'Arrêté'
    };
  }

  // Méthodes spécialisées pour différents environnements

  // Pour environnement de développement
  static setupDevelopmentMode(): void {
    this.updateConfig({
      enabled: true,
      interval: 5 * 60 * 1000, // 5 minutes en dev
      maxRetries: 1,
      retryDelay: 1 * 60 * 1000 // 1 minute retry
    });

    console.log('[SCHEDULER] Mode développement activé');
  }

  // Pour environnement de production
  static setupProductionMode(): void {
    this.updateConfig({
      enabled: true,
      interval: 3 * 60 * 60 * 1000, // 3 heures en prod
      maxRetries: 3,
      retryDelay: 30 * 60 * 1000 // 30 minutes retry
    });

    console.log('[SCHEDULER] Mode production activé');
  }

  // Cleanup et arrêt propre
  static shutdown(): void {
    console.log('[SCHEDULER] Arrêt du système...');

    this.stopScheduler();

    // Attendre la fin du cycle en cours
    const maxWait = 30000; // 30 secondes max
    const checkInterval = 1000; // Check toutes les secondes
    let waited = 0;

    const waitForCompletion = setInterval(() => {
      if (!this.isRunning || waited >= maxWait) {
        clearInterval(waitForCompletion);

        if (this.isRunning) {
          console.warn('[SCHEDULER] ⚠️  Arrêt forcé - cycle en cours interrompu');
        } else {
          console.log('[SCHEDULER] ✅ Arrêt propre terminé');
        }
      }

      waited += checkInterval;
    }, checkInterval);
  }
}

// Auto-démarrage selon l'environnement
if (typeof window === 'undefined') { // Server-side only
  if (process.env.NODE_ENV === 'development') {
    EditorialScheduler.setupDevelopmentMode();
  } else {
    EditorialScheduler.setupProductionMode();
  }

  // Démarrage automatique
  EditorialScheduler.startScheduler();

  // Graceful shutdown
  process.on('SIGTERM', () => EditorialScheduler.shutdown());
  process.on('SIGINT', () => EditorialScheduler.shutdown());
}