#!/bin/bash

# =============================================================================
# JARVIS - Script de déploiement pour Infomaniak
# =============================================================================
# Ce script prépare et déploie l'application Next.js sur Infomaniak
# Usage: ./scripts/deploy.sh
# =============================================================================

set -e  # Arrêter en cas d'erreur

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de logging
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Début du déploiement
log_info "🚀 Démarrage du déploiement JARVIS sur Infomaniak..."
echo "=================================================="

# 1. Vérification de l'environnement
log_info "Vérification de l'environnement..."

# Vérifier Node.js version
if ! command -v node &> /dev/null; then
    log_error "Node.js n'est pas installé !"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    log_error "Node.js version >= 22 requise. Version actuelle: $(node -v)"
    exit 1
fi
log_success "Node.js version OK: $(node -v)"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    log_error "npm n'est pas installé !"
    exit 1
fi
log_success "npm version OK: $(npm -v)"

# 2. Vérification du fichier .env
log_info "Vérification de la configuration..."

if [ ! -f ".env" ]; then
    log_warning "Fichier .env non trouvé dans le répertoire courant"

    # Chercher dans /etc/jarvis/.env
    if [ -f "/etc/jarvis/.env" ]; then
        log_info "Fichier .env trouvé dans /etc/jarvis/"
    else
        log_error "Aucun fichier .env trouvé ! Veuillez créer .env à partir de .env.example"
        log_info "Commande: cp .env.example .env"
        exit 1
    fi
else
    log_success "Fichier .env trouvé"
fi

# 3. Vérifier l'espace disque disponible
AVAILABLE_SPACE=$(df -h . | awk 'NR==2 {print $4}')
log_info "Espace disque disponible: $AVAILABLE_SPACE"

# 4. Nettoyage des anciennes builds
log_info "Nettoyage des anciennes builds..."

if [ -d ".next" ]; then
    rm -rf .next
    log_success "Ancien répertoire .next supprimé"
fi

if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    log_success "Cache node_modules nettoyé"
fi

# 5. Installation des dépendances
log_info "Installation des dépendances..."

# Utiliser npm ci pour une installation propre (plus rapide que npm install)
if [ -f "package-lock.json" ]; then
    npm ci --production=false --prefer-offline
else
    npm install
fi

log_success "Dépendances installées"

# 6. Vérification de la mémoire disponible
log_info "Vérification des ressources système..."
if command -v free &> /dev/null; then
    FREE_MEM=$(free -m | awk 'NR==2 {print $7}')
    log_info "Mémoire disponible: ${FREE_MEM}MB"

    if [ "$FREE_MEM" -lt 512 ]; then
        log_warning "Mémoire faible détectée. Build avec optimisations mémoire..."
        # Définir une variable pour limiter l'utilisation mémoire de Node
        export NODE_OPTIONS="--max-old-space-size=512"
    fi
fi

# 7. Build de l'application
log_info "Build de l'application Next.js..."
log_warning "Cette étape peut prendre plusieurs minutes..."

# Définir les variables d'environnement pour le build
export NODE_ENV=production

# Lancer le build avec gestion d'erreur
if npm run build; then
    log_success "Build réussi !"
else
    log_error "Échec du build"
    log_info "Vérifiez les erreurs ci-dessus"
    exit 1
fi

# 8. Vérification du build
log_info "Vérification du build..."

if [ ! -d ".next" ]; then
    log_error "Le répertoire .next n'a pas été créé !"
    exit 1
fi

if [ ! -f ".next/BUILD_ID" ]; then
    log_error "BUILD_ID manquant - build incomplet !"
    exit 1
fi

BUILD_ID=$(cat .next/BUILD_ID)
log_success "Build ID: $BUILD_ID"

# 9. Créer le répertoire de données blog si nécessaire
log_info "Préparation des répertoires de données..."

mkdir -p src/data/blog
if [ ! -f "src/data/blog/articles.json" ]; then
    echo "[]" > src/data/blog/articles.json
    log_success "Fichier articles.json créé"
fi

# 10. Résumé du déploiement
echo ""
echo "=================================================="
log_success "✅ Déploiement JARVIS terminé avec succès !"
echo "=================================================="
log_info "Build ID: $BUILD_ID"
log_info "Node version: $(node -v)"
log_info "npm version: $(npm -v)"
log_info "Environnement: production"
echo ""
log_info "Pour démarrer l'application:"
log_info "  ./scripts/start.sh"
echo ""
log_info "Pour démarrer en mode développement:"
log_info "  npm run dev"
echo "=================================================="
