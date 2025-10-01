#!/bin/bash

# =============================================================================
# JARVIS - Script de démarrage pour Infomaniak
# =============================================================================
# Ce script démarre l'application Next.js en mode production
# Il vérifie que le build existe avant de démarrer
# Usage: ./scripts/start.sh
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

# Début du démarrage
log_info "🚀 Démarrage de JARVIS en mode production..."
echo "=================================================="

# 1. Vérifier que le build existe
log_info "Vérification du build..."

if [ ! -d ".next" ]; then
    log_error "Le répertoire .next n'existe pas !"
    log_info "Veuillez lancer le build d'abord:"
    log_info "  ./scripts/deploy.sh"
    log_info "  ou"
    log_info "  npm run build"
    exit 1
fi

if [ ! -f ".next/BUILD_ID" ]; then
    log_error "BUILD_ID manquant - build incomplet ou corrompu !"
    log_info "Relancez le build avec: ./scripts/deploy.sh"
    exit 1
fi

BUILD_ID=$(cat .next/BUILD_ID)
log_success "Build trouvé (ID: $BUILD_ID)"

# 2. Vérifier les variables d'environnement
log_info "Vérification de la configuration..."

# Charger .env si présent
if [ -f ".env" ]; then
    log_success "Fichier .env trouvé dans le répertoire courant"
    export $(grep -v '^#' .env | xargs)
elif [ -f "/etc/jarvis/.env" ]; then
    log_info "Chargement du fichier .env depuis /etc/jarvis/"
    export $(grep -v '^#' /etc/jarvis/.env | xargs)
else
    log_warning "Aucun fichier .env trouvé - variables d'environnement système uniquement"
fi

# 3. Déterminer le port
# Infomaniak assigne dynamiquement le port via process.env.PORT
# Si aucun port n'est défini, utiliser 3000 par défaut
if [ -z "$PORT" ]; then
    export PORT=3000
    log_info "Port non défini, utilisation du port par défaut: $PORT"
else
    log_info "Port configuré: $PORT"
fi

# 4. Vérifier Node.js
if ! command -v node &> /dev/null; then
    log_error "Node.js n'est pas installé !"
    exit 1
fi
log_success "Node.js version: $(node -v)"

# 5. Vérifier que le port est disponible
if command -v lsof &> /dev/null; then
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        log_warning "Le port $PORT est déjà utilisé"
        log_info "Arrêt du processus existant..."

        # Tuer le processus qui utilise le port
        PID=$(lsof -ti:$PORT)
        if [ ! -z "$PID" ]; then
            kill -9 $PID 2>/dev/null || true
            log_success "Processus $PID arrêté"
            sleep 2
        fi
    fi
fi

# 6. Créer le répertoire de données blog si nécessaire
log_info "Vérification des répertoires de données..."
mkdir -p src/data/blog

if [ ! -f "src/data/blog/articles.json" ]; then
    echo "[]" > src/data/blog/articles.json
    log_success "Fichier articles.json créé"
fi

# 7. Définir les variables d'environnement pour la production
export NODE_ENV=production

# 8. Afficher les informations de démarrage
echo ""
echo "=================================================="
log_success "Configuration prête !"
echo "=================================================="
log_info "Environnement: production"
log_info "Build ID: $BUILD_ID"
log_info "Port: $PORT"
log_info "Node: $(node -v)"
echo "=================================================="
echo ""

# 9. Démarrer l'application
log_info "Démarrage de Next.js..."
log_info "L'application sera accessible sur: http://localhost:$PORT"
echo ""

# Démarrer avec npm start (qui lance "next start")
exec npm start
