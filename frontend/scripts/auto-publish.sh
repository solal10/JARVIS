#!/bin/bash

# 🤖 SCRIPT CRON PUBLICATION AUTOMATIQUE JARVIS
# Publication SEO agressive : 2 articles/jour

# Configuration
API_URL="http://localhost:3000/api/auto-publish"
LOG_FILE="/tmp/jarvis-auto-publish.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] 🤖 Démarrage publication automatique JARVIS" >> $LOG_FILE

# Appel API publication
response=$(curl -s -X POST "$API_URL" -H "Content-Type: application/json")

# Log de la réponse
echo "[$DATE] Réponse API: $response" >> $LOG_FILE

# Vérifier le succès
if echo "$response" | jq -e '.success' > /dev/null 2>&1; then
    title=$(echo "$response" | jq -r '.article.title // "Article sans titre"')
    category=$(echo "$response" | jq -r '.article.category // "Inconnue"')
    strategy=$(echo "$response" | jq -r '.strategy // "Standard"')
    wordCount=$(echo "$response" | jq -r '.metrics.wordCount // 0')

    echo "[$DATE] ✅ Publication réussie: $title ($strategy - $wordCount mots)" >> $LOG_FILE

    # Notification de succès (optionnel)
    # curl -X POST "https://discord.com/api/webhooks/YOUR_WEBHOOK" \
    #      -H "Content-Type: application/json" \
    #      -d "{\"content\": \"📚 Article publié: **$title** ($category)\"}"

else
    reason=$(echo "$response" | jq -r '.reason // .error // "Erreur inconnue"')
    echo "[$DATE] ❌ Échec publication: $reason" >> $LOG_FILE
fi

echo "[$DATE] 🏁 Fin publication automatique JARVIS" >> $LOG_FILE
echo "" >> $LOG_FILE