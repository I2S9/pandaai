# 🔧 Guide de dépannage - Problèmes Supabase

## Problèmes identifiés
1. **Flashcards non sauvegardées** : Erreur UUID
2. **Dashboard qui se réinitialise** : Temps non persisté en base
3. **Structure de base de données incorrecte** : user_id en UUID au lieu de TEXT

## Solution étape par étape

### Étape 1 : Vérifier les variables d'environnement
Créez ou modifiez votre fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### Étape 2 : Corriger la structure de la base de données
1. Allez dans votre dashboard Supabase
2. Ouvrez l'éditeur SQL
3. Copiez et exécutez le contenu du fichier `sql/fix_uuid_issue.sql`

Ce script va :
- Supprimer les tables existantes
- Recréer les tables avec `user_id` en type `TEXT`
- Configurer les politiques RLS
- Créer les index nécessaires

### Étape 3 : Tester la configuration
1. Allez sur `http://localhost:3000/debug`
2. Connectez-vous avec Clerk
3. Cliquez sur "Run Debug Tests"
4. Vérifiez que tous les tests passent

### Étape 4 : Tester les fonctionnalités
1. **Flashcards** : Allez sur `/flashcards`, générez et sauvegardez
2. **Dashboard** : Allez sur `/dashboard`, vérifiez que le temps persiste
3. **Collection** : Allez sur `/flashcards-collection`

## Messages d'erreur courants

### "invalid input syntax for type uuid"
**Cause** : La table utilise encore UUID pour user_id
**Solution** : Exécuter le script SQL de correction

### "relation does not exist"
**Cause** : Les tables n'existent pas
**Solution** : Exécuter le script SQL de correction

### "permission denied"
**Cause** : Politiques RLS mal configurées
**Solution** : Exécuter le script SQL de correction

## Vérification finale

Après avoir suivi toutes les étapes :

✅ **Variables d'environnement** définies
✅ **Script SQL** exécuté dans Supabase
✅ **Tests de debug** passent
✅ **Flashcards** se sauvegardent
✅ **Dashboard** persiste le temps
✅ **Collection** affiche les flashcards

## Support

Si les problèmes persistent :
1. Vérifiez les logs dans la console du navigateur
2. Utilisez la page de debug `/debug`
3. Vérifiez que le script SQL s'est bien exécuté dans Supabase 