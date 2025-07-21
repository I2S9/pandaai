# 🔧 Correction du problème UUID Supabase

## Problème identifié
L'erreur `invalid input syntax for type uuid: "user_2zg4mRk4OBLWqsNIovrVshANIbH"` indique que Supabase attend un UUID mais reçoit un ID de Clerk (qui est une chaîne de texte).

## Solution

### 1. Exécuter le script SQL de correction
Copiez et exécutez le contenu du fichier `sql/fix_uuid_issue.sql` dans votre éditeur SQL Supabase.

Ce script :
- Supprime les tables existantes
- Recrée les tables avec `user_id` en type `TEXT` au lieu d'`UUID`
- Configure les politiques RLS appropriées
- Crée les index nécessaires

### 2. Vérifier les variables d'environnement
Assurez-vous que votre fichier `.env.local` contient :
```
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### 3. Tester la connexion
1. Allez sur la page `/flashcards`
2. Générez des flashcards
3. Cliquez sur "Save in collection"
4. Vous devriez être redirigé vers `/flashcards-collection`

### 4. Vérifier le temps d'activité
1. Allez sur le dashboard
2. Le temps devrait être sauvegardé en base de données
3. Après actualisation, le temps devrait persister

## Fonctionnalités corrigées

✅ **Sauvegarde des flashcards** : Les flashcards sont maintenant sauvegardées avec l'ID de Clerk
✅ **Temps d'activité persistant** : Le temps est sauvegardé en base et persiste après actualisation
✅ **Graphique Activity** : Affiche le temps total de la journée
✅ **Sessions automatiques** : Démarre automatiquement une session quand l'utilisateur se connecte

## Structure de la base de données

- `users` : Profils utilisateurs (ID Clerk)
- `sessions` : Sessions d'activité avec durée
- `flashcards` : Flashcards sauvegardées par thème
- `scores` : Scores des quiz et examens
- `pomodoro_sessions` : Sessions Pomodoro

Toutes les tables utilisent maintenant `TEXT` pour `user_id` au lieu d'`UUID`. 