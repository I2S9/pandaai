# 🚨 CORRECTION URGENTE - Problèmes Supabase

## Problème identifié
Les erreurs vides `{}` indiquent que la base de données Supabase n'est pas configurée correctement.

## Solution immédiate

### Étape 1 : Vérifier les variables d'environnement
Créez un fichier `.env.local` à la racine du projet avec :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### Étape 2 : Exécuter le script SQL CRITIQUE
**ALLEZ IMMÉDIATEMENT DANS VOTRE DASHBOARD SUPABASE ET EXÉCUTEZ CE SCRIPT :**

```sql
-- SUPPRIMER TOUTES LES TABLES EXISTANTES
DROP TABLE IF EXISTS flashcards CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS scores CASCADE;
DROP TABLE IF EXISTS pomodoro_sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- CRÉER LA TABLE USERS AVEC ID TEXT
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRÉER LA TABLE SESSIONS
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRÉER LA TABLE FLASHCARDS
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  review_count INTEGER DEFAULT 0,
  difficulty_level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRÉER LA TABLE SCORES
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRÉER LA TABLE POMODORO_SESSIONS
CREATE TABLE pomodoro_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER DEFAULT 25,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRÉER LES INDEX
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_flashcards_user_id ON flashcards(user_id);
CREATE INDEX idx_scores_user_id ON scores(user_id);

-- DÉSACTIVER RLS TEMPORAIREMENT
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards DISABLE ROW LEVEL SECURITY;
ALTER TABLE scores DISABLE ROW LEVEL SECURITY;
ALTER TABLE pomodoro_sessions DISABLE ROW LEVEL SECURITY;
```

### Étape 3 : Tester immédiatement
1. Allez sur `http://localhost:3000/debug`
2. Cliquez sur "Run Debug Tests"
3. Vérifiez la console pour les détails

### Étape 4 : Tester les fonctionnalités
1. **Dashboard** : Le temps devrait persister
2. **Flashcards** : Sauvegarde devrait fonctionner
3. **Collection** : Flashcards devraient s'afficher

## Si ça ne fonctionne toujours pas

### Vérifier la configuration Supabase
1. Allez dans votre dashboard Supabase
2. Vérifiez que les tables existent dans "Table Editor"
3. Vérifiez que `user_id` est en type `TEXT` et non `UUID`

### Vérifier les permissions
1. Allez dans "Authentication" > "Policies"
2. Désactivez temporairement RLS sur toutes les tables
3. Testez à nouveau

## Message d'urgence
**LE PROBLÈME PRINCIPAL EST QUE LA BASE DE DONNÉES UTILISE ENCORE UUID AU LIEU DE TEXT POUR user_id.**

**EXÉCUTEZ LE SCRIPT SQL CI-DESSUS IMMÉDIATEMENT !** 