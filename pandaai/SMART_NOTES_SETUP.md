# Configuration de Smart Notes

## Vue d'ensemble

Smart Notes est une fonctionnalité qui permet de :
1. Transcrire du contenu audio/vidéo (enregistrement ou URL YouTube)
2. Générer des notes intelligentes à partir du contenu transcrit
3. Créer différents formats de sortie : résumés, transcriptions détaillées, mind maps, et notes intelligentes

## Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# OpenRouter API Configuration
# Obtenir votre clé API sur https://openrouter.ai/
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Étapes de configuration

1. **Obtenir une clé API OpenRouter** :
   - Allez sur https://openrouter.ai/
   - Créez un compte gratuit
   - Générez une clé API
   - Copiez la clé dans votre fichier `.env.local`

2. **Redémarrer le serveur de développement** :
   ```bash
   npm run dev
   ```

## Fonctionnalités

### 🎤 Enregistrement audio
- Enregistrement en temps réel via le microphone
- Interface intuitive avec bouton d'enregistrement
- Gestion des permissions microphone
- Simulation de transcription (à remplacer par une vraie API de transcription)

### 📺 URL YouTube
- Saisie d'URL YouTube
- Validation des URLs
- Simulation de transcription vidéo (à remplacer par une vraie API de transcription)

### 📝 Génération de notes intelligentes
- **Smart Notes** : Notes organisées avec points clés et concepts
- **Summary** : Résumé complet avec idées principales
- **Detailed Transcript** : Transcription détaillée et structurée
- **Mind Map** : Structure hiérarchique des concepts

### 💾 Export et partage
- Copie dans le presse-papiers
- Téléchargement en fichier texte
- Interface de résultats claire et organisée

## Structure des fichiers

```
src/
├── app/
│   ├── api/smart-notes/route.ts    # API route pour la transcription et génération
│   └── smart-notes/page.tsx        # Page principale Smart Notes
```

## Utilisation

### Étape 1 : Accès à Smart Notes
1. Naviguez vers `/smart-notes`
2. Vous verrez les 3 étapes du processus

### Étape 2 : Choix de la méthode d'entrée
- **Enregistrement audio** : Cliquez sur "Start Recording" et parlez
- **URL YouTube** : Collez l'URL d'une vidéo YouTube

### Étape 3 : Génération de notes
1. Une fois la transcription générée, choisissez le format de sortie
2. Cliquez sur "Generate Notes"
3. Consultez, copiez ou téléchargez vos notes

## Modèle utilisé

- **Modèle** : `deepseek/deepseek-r1-0528:free`
- **Fournisseur** : OpenRouter
- **Limite** : Gratuit avec limitations
- **Langue** : Multilingue (détection automatique)

## Améliorations futures

### Transcription réelle
Pour une implémentation complète, intégrez une API de transcription :
- **Whisper API** (OpenAI) pour la transcription audio
- **YouTube Data API** pour l'extraction de contenu vidéo
- **AssemblyAI** ou **Rev.ai** pour des transcriptions professionnelles

### Fonctionnalités avancées
- Sauvegarde des notes dans une base de données
- Partage de notes entre utilisateurs
- Export en formats multiples (PDF, Word, etc.)
- Synchronisation avec d'autres outils d'étude

## Dépannage

### Erreur "OpenRouter API key not configured"
- Vérifiez que votre clé API est dans le fichier `.env.local`
- Redémarrez le serveur de développement

### Erreur "Rate limit exceeded"
- Attendez quelques minutes avant de réessayer
- Passez à un compte payant OpenRouter pour plus de requêtes

### Problèmes d'enregistrement audio
- Vérifiez les permissions microphone du navigateur
- Utilisez HTTPS en production (requis pour l'API MediaRecorder)

## Exemple d'utilisation

1. **Enregistrement d'un cours** :
   - Cliquez sur "Start Recording"
   - Enregistrez votre professeur
   - Cliquez sur "Stop Recording"
   - Choisissez "Smart Notes" pour générer des notes structurées

2. **Analyse d'une vidéo YouTube** :
   - Collez l'URL d'une vidéo éducative
   - Cliquez sur "Process Video"
   - Choisissez "Mind Map" pour une visualisation hiérarchique

3. **Création d'un résumé** :
   - Utilisez n'importe quelle méthode d'entrée
   - Choisissez "Summary" pour un résumé concis
   - Téléchargez le résultat pour vos révisions 