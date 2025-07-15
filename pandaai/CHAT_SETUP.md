# Configuration du Chatbot Panda Coach

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

## Fonctionnalités du chatbot

### 🐼 Panda Coach
- Assistant IA spécialisé dans l'aide aux études
- Style kawaii et bienveillant
- Réponses en français
- Utilise le modèle Deepseek R1 via OpenRouter

### ✨ Fonctionnalités
- Chat en temps réel
- Suggestions de conversation
- Upload de fichiers (préparé pour l'analyse)
- Interface responsive et moderne
- Animations fluides
- Gestion d'erreurs

### 🎯 Suggestions disponibles
- Plan d'étude personnalisé
- Aide en mathématiques
- Techniques de mémorisation
- Résumé de cours
- Préparation d'examen
- Gestion du stress

## Structure des fichiers

```
src/
├── app/
│   ├── api/chat/route.ts          # API route pour le chat
│   └── panda-coach/page.tsx       # Page principale du chat
├── components/features/
│   ├── ChatMessage.tsx            # Composant d'affichage des messages
│   ├── ChatInput.tsx              # Composant d'input du chat
│   └── ChatSuggestions.tsx        # Composant des suggestions
└── hooks/
    └── usePandaChat.ts            # Hook personnalisé pour la logique du chat
```

## Utilisation

1. Naviguez vers `/panda-coach`
2. Choisissez une suggestion ou tapez votre question
3. Le chatbot répondra avec un style kawaii et bienveillant
4. Vous pouvez uploader des fichiers pour analyse (fonctionnalité en développement)

## Modèle utilisé

- **Modèle** : `deepseek/deepseek-r1-0528:free`
- **Fournisseur** : OpenRouter
- **Limite** : Gratuit avec limitations
- **Langue** : Français
- **Style** : Kawaii et éducatif 