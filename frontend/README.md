# JARVIS - Site Web Consulting

Site web de JARVIS Monaco - Cabinet de consulting en IA, développement logiciel et web marketing.

## 🚀 Stack Technique

- **Framework**: Next.js 14.0.3 (App Router)
- **React**: 18.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 3.3.0
- **Animations**: Framer Motion 10.16.4
- **Email**: Nodemailer 6.9.7
- **AI**: OpenAI API 5.23.1
- **Automation**: N8N Webhooks

## 📋 Prérequis

- **Node.js**: >= 22.0.0 (LTS)
- **npm**: >= 10.9.0
- **yarn**: >= 1.22.0 (optionnel)

## 🛠️ Installation Locale

```bash
# Cloner le repository
git clone https://github.com/votre-repo/jarvis.git
cd jarvis/frontend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env avec vos valeurs
nano .env

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📦 Commandes disponibles

```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build de production
npm start        # Démarrage en mode production
npm run lint     # Analyse du code avec ESLint
```

## 🌐 Déploiement sur Infomaniak

### Étape 1: Préparation sur Infomaniak

1. **Connectez-vous en SSH à votre hébergement Infomaniak**
   ```bash
   ssh votre-user@ssh.infomaniak.com
   ```

2. **Naviguez vers le répertoire de votre site**
   ```bash
   cd /srv/customer/sites/jarvis-mc.com/
   ```

3. **Clonez le repository GitHub**
   ```bash
   git clone https://github.com/votre-repo/jarvis.git
   cd jarvis/frontend
   ```

### Étape 2: Configuration des variables d'environnement

1. **Créez le fichier de configuration centralisé** (recommandé)
   ```bash
   sudo mkdir -p /etc/jarvis
   sudo cp .env.example /etc/jarvis/.env
   sudo nano /etc/jarvis/.env
   ```

   Ou créez `.env` directement dans le dossier frontend:
   ```bash
   cp .env.example .env
   nano .env
   ```

2. **Remplissez toutes les variables nécessaires:**

   **Variables SMTP Infomaniak (obligatoires):**
   ```env
   SMTP_HOST=mail.infomaniak.com
   SMTP_PORT=587
   SMTP_USER=contact@jarvis-monaco.com
   SMTP_PASS=votre_mot_de_passe
   CONTACT_EMAIL=contact@jarvis-monaco.com
   ```

   **Variables OpenAI (obligatoires pour le blog):**
   ```env
   OPENAI_API_KEY=sk-...votre_cle_api
   ```

   **Variables N8N (obligatoires pour l'automatisation):**
   ```env
   N8N_WEBHOOK_URL=https://votre-n8n.com/webhook/jarvis-blog
   N8N_AUTO_PUBLISH_URL=https://votre-n8n.com/webhook/auto-publish
   N8N_EDITORIAL_URL=https://votre-n8n.com/webhook/editorial
   N8N_API_KEY=votre_cle_n8n
   ```

   **Variables du site:**
   ```env
   NEXT_PUBLIC_SITE_URL=https://jarvis-monaco.com
   NODE_ENV=production
   ```

3. **Sécurisez le fichier .env**
   ```bash
   chmod 600 .env
   # ou pour /etc/jarvis/.env
   sudo chmod 600 /etc/jarvis/.env
   ```

### Étape 3: Build et Déploiement

1. **Utilisez le script de déploiement automatique:**
   ```bash
   ./scripts/deploy.sh
   ```

   Ce script va:
   - ✅ Vérifier Node.js et npm
   - ✅ Vérifier la présence du fichier .env
   - ✅ Nettoyer les anciennes builds
   - ✅ Installer les dépendances
   - ✅ Optimiser pour les ressources limitées
   - ✅ Builder l'application
   - ✅ Créer les répertoires nécessaires

2. **Ou manuellement:**
   ```bash
   # Vérifier Node.js
   node -v  # Doit être >= 22

   # Installer les dépendances
   npm ci --production=false

   # Build
   NODE_ENV=production npm run build
   ```

### Étape 4: Démarrage de l'application

1. **Utilisez le script de démarrage:**
   ```bash
   ./scripts/start.sh
   ```

2. **Ou manuellement:**
   ```bash
   NODE_ENV=production PORT=3000 npm start
   ```

### Étape 5: Configuration du Process Manager (PM2 recommandé)

Pour garder l'application en fonctionnement permanent:

```bash
# Installer PM2 globalement
npm install -g pm2

# Démarrer l'application
pm2 start npm --name "jarvis" -- start

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
```

**Commandes PM2 utiles:**
```bash
pm2 status              # Voir l'état de l'app
pm2 logs jarvis         # Voir les logs
pm2 restart jarvis      # Redémarrer l'app
pm2 stop jarvis         # Arrêter l'app
pm2 delete jarvis       # Supprimer l'app de PM2
```

### Étape 6: Configuration du reverse proxy (optionnel)

Si vous utilisez Apache ou Nginx comme reverse proxy:

**Apache (.htaccess ou VirtualHost):**
```apache
<VirtualHost *:80>
    ServerName jarvis-monaco.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

**Nginx:**
```nginx
server {
    listen 80;
    server_name jarvis-monaco.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔄 Mise à jour du site

```bash
cd /srv/customer/sites/jarvis-mc.com/jarvis/frontend

# Récupérer les dernières modifications
git pull origin main

# Redéployer
./scripts/deploy.sh

# Redémarrer avec PM2
pm2 restart jarvis

# Ou sans PM2
./scripts/start.sh
```

## 🤖 Système de Blog Intelligent

Le site intègre un système de blog automatisé avec N8N:

### Fonctionnalités

- ✅ **Auto-génération**: Génération automatique d'articles SEO-optimisés
- ✅ **Planification**: Publication programmée 2x/jour (9h et 16h)
- ✅ **Intelligence éditoriale**: Analyse des tendances et recommandations
- ✅ **Stockage JSON**: Pas de base de données requise
- ✅ **Webhooks N8N**: Intégration complète avec workflows

### Routes API

- `POST /api/auto-generate-blog` - Génération d'article
- `POST /api/auto-publish` - Publication automatique
- `POST /api/blog-control` - Contrôle du système
- `POST /api/auto-editorial` - Système éditorial intelligent
- `POST /api/n8n-webhook` - Webhook générique N8N

### Configuration Cron (optionnel)

Pour activer la publication automatique via cron:

```bash
# Éditer le crontab
crontab -e

# Ajouter les entrées suivantes (publications à 9h et 16h)
0 9 * * * /srv/customer/sites/jarvis-mc.com/jarvis/frontend/scripts/auto-publish.sh
0 16 * * * /srv/customer/sites/jarvis-mc.com/jarvis/frontend/scripts/auto-publish.sh
```

## 📊 Structure du Projet

```
frontend/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── api/               # API Routes
│   │   │   ├── auto-generate-blog/
│   │   │   ├── auto-publish/
│   │   │   ├── blog-control/
│   │   │   ├── contact/
│   │   │   └── n8n-webhook/
│   │   ├── blog/              # Pages blog
│   │   ├── services/          # Pages services
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Composants React
│   ├── lib/                   # Bibliothèques et utilitaires
│   │   ├── blog-storage.ts    # Gestion du stockage blog
│   │   ├── blog-scheduler.ts  # Planification publications
│   │   └── natural-content-generator.ts
│   ├── utils/
│   │   └── emailService.ts    # Service email Infomaniak
│   └── data/
│       └── blog/              # Stockage articles (JSON)
├── public/                    # Assets statiques
├── scripts/
│   ├── deploy.sh             # Script de déploiement
│   ├── start.sh              # Script de démarrage
│   └── auto-publish.sh       # Script cron publication
├── .env.example              # Template variables environnement
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🔧 Dépannage

### Le build échoue avec "Module not found"

```bash
# Vérifier que tous les fichiers sont présents
ls -la src/lib/
ls -la src/utils/

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur de mémoire pendant le build

```bash
# Limiter la mémoire utilisée par Node
export NODE_OPTIONS="--max-old-space-size=512"
npm run build
```

### Le port 3000 est déjà utilisé

```bash
# Trouver le processus
lsof -ti:3000

# Tuer le processus
kill -9 $(lsof -ti:3000)
```

### Les emails ne partent pas

1. Vérifier les credentials SMTP dans `.env`
2. Tester la connexion SMTP:
   ```bash
   telnet mail.infomaniak.com 587
   ```
3. Vérifier les logs: `pm2 logs jarvis`

### Les webhooks N8N ne fonctionnent pas

1. Vérifier que N8N est accessible depuis Infomaniak
2. Vérifier les URLs des webhooks dans `.env`
3. Tester manuellement avec curl:
   ```bash
   curl -X POST http://localhost:3000/api/n8n-webhook \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```

## 📝 Notes Importantes

### Ressources Infomaniak

- **Mémoire limitée**: Le build peut échouer si trop de processus tournent
- **Port dynamique**: Infomaniak peut assigner un port différent via `process.env.PORT`
- **Permissions**: Vérifier les permissions des fichiers (surtout .env)

### Sécurité

- ⚠️ **Ne jamais commiter .env dans Git**
- ✅ Utiliser `.env.example` comme template
- ✅ Permissions 600 pour les fichiers .env
- ✅ Utiliser WEBHOOK_SECRET pour sécuriser les webhooks N8N

### Performance

- Le site utilise des optimisations TBT (Total Blocking Time)
- Les images sont non-optimisées pour export statique
- Framer Motion est optimisé via `optimizePackageImports`
- Les console.log sont supprimés en production

## 🆘 Support

Pour toute question ou problème:

1. Vérifier les logs: `pm2 logs jarvis`
2. Consulter la documentation Next.js: https://nextjs.org/docs
3. Contacter le support Infomaniak pour les problèmes d'hébergement

## 📄 Licence

Propriétaire - JARVIS Monaco © 2024
