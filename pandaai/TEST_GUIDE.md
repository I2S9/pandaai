# 🧪 Guide de test - Vérification des fonctionnalités

## Prérequis
1. ✅ Serveur démarré (`npm run dev`)
2. ✅ Variables d'environnement configurées
3. ✅ Script SQL exécuté dans Supabase
4. ✅ Utilisateur connecté avec Clerk

## Tests à effectuer

### 1. Test du Dashboard (Temps d'activité)
1. Allez sur `http://localhost:3000/dashboard`
2. **Attendez 1-2 minutes** sur la page
3. **Actualisez la page** (F5)
4. **Vérifiez** : Le temps devrait persister et continuer à augmenter

### 2. Test des Flashcards
1. Allez sur `http://localhost:3000/flashcards`
2. **Entrez un sujet** (ex: "Mathématiques")
3. **Générez des flashcards**
4. **Cliquez sur "Save in collection"**
5. **Vérifiez** : Vous devriez être redirigé vers la collection

### 3. Test de la Collection
1. Allez sur `http://localhost:3000/flashcards-collection`
2. **Vérifiez** : Vos flashcards sauvegardées devraient apparaître
3. **Testez la recherche** : Tapez le nom du sujet

### 4. Test de Debug (Optionnel)
1. Allez sur `http://localhost:3000/debug`
2. **Cliquez sur "Run Debug Tests"**
3. **Vérifiez** : Tous les tests devraient passer

## Vérification des logs

Ouvrez la console du navigateur (F12) et vérifiez :

### Dashboard
```
🔄 Loading existing data for user: user_xxx
📊 Today duration loaded: XXX seconds
⏱️ Duration calculation: { currentSession: X, totalToday: Y, total: Z }
💾 Session saved: XXX seconds
```

### Flashcards
```
=== SAVING FLASHCARDS DEBUG ===
User: { id: "user_xxx", email: "..." }
Subject: "Mathématiques"
Calling saveFlashcardsToDatabase...
💾 Saving flashcards: { userId: "user_xxx", topic: "Mathématiques", count: 5 }
✅ Flashcards saved successfully
```

## Problèmes courants

### ❌ "invalid input syntax for type uuid"
**Solution** : Exécuter le script SQL dans Supabase

### ❌ "relation does not exist"
**Solution** : Exécuter le script SQL dans Supabase

### ❌ Temps qui se réinitialise
**Solution** : Vérifier que `calculateTotalTodayDuration` fonctionne

### ❌ Flashcards non sauvegardées
**Solution** : Vérifier les logs dans la console

## Résultat attendu

✅ **Dashboard** : Temps persiste après actualisation
✅ **Flashcards** : Sauvegarde et redirection fonctionnent
✅ **Collection** : Flashcards affichées correctement
✅ **Logs** : Messages de succès dans la console

Si tous ces tests passent, le système fonctionne correctement ! 🎉 