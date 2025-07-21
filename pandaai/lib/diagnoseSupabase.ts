import { createClient } from '../utils/supabase/client';

export const diagnoseSupabase = async () => {
  const supabase = createClient();
  
  console.log('🔍 DIAGNOSTIC SUPABASE DÉTAILLÉ');
  console.log('================================');
  
  // 1. Vérifier les variables d'environnement
  console.log('\n1️⃣ VÉRIFICATION DES VARIABLES D\'ENVIRONNEMENT');
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Variables d\'environnement manquantes !');
    return false;
  }
  
  // 2. Test de connexion basique
  console.log('\n2️⃣ TEST DE CONNEXION BASIQUE');
  try {
    const { error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Erreur de connexion:', error);
      console.error('Code:', error.code);
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);
      return false;
    }
    console.log('✅ Connexion basique réussie');
  } catch (error) {
    console.error('❌ Exception de connexion:', error);
    return false;
  }
  
  // 3. Vérifier l'existence des tables
  console.log('\n3️⃣ VÉRIFICATION DES TABLES');
  const tables = ['users', 'sessions', 'flashcards', 'scores', 'pomodoro_sessions'];
  
  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('count')
        .limit(1);
      
      if (error) {
        console.error(`❌ Table ${table}:`, error.message);
      } else {
        console.log(`✅ Table ${table}: Existe`);
      }
    } catch (error) {
      console.error(`❌ Table ${table}: Exception`, error);
    }
  }
  
  // 4. Vérifier la structure de la table users
  console.log('\n4️⃣ VÉRIFICATION STRUCTURE TABLE USERS');
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Erreur accès table users:', error);
    } else {
      console.log('✅ Table users accessible');
      if (data && data.length > 0) {
        console.log('Structure:', Object.keys(data[0]));
        console.log('Type user_id:', typeof data[0].id);
      } else {
        console.log('Table users vide');
      }
    }
  } catch (error) {
    console.error('❌ Exception table users:', error);
  }
  
  // 5. Test d'insertion d'utilisateur
  console.log('\n5️⃣ TEST D\'INSERTION UTILISATEUR');
  const testUserId = 'test_user_' + Date.now();
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: testUserId,
        email: 'test@example.com'
      })
      .select();
    
    if (error) {
      console.error('❌ Erreur insertion utilisateur:', error);
      console.error('Code:', error.code);
      console.error('Message:', error.message);
    } else {
      console.log('✅ Insertion utilisateur réussie:', data);
      
      // Nettoyer le test
      await supabase
        .from('users')
        .delete()
        .eq('id', testUserId);
    }
  } catch (error) {
    console.error('❌ Exception insertion utilisateur:', error);
  }
  
  // 6. Test d'insertion de session
  console.log('\n6️⃣ TEST D\'INSERTION SESSION');
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: testUserId,
        start_time: new Date().toISOString(),
        duration_seconds: 60
      })
      .select();
    
    if (error) {
      console.error('❌ Erreur insertion session:', error);
      console.error('Code:', error.code);
      console.error('Message:', error.message);
    } else {
      console.log('✅ Insertion session réussie:', data);
      
      // Nettoyer le test
      await supabase
        .from('sessions')
        .delete()
        .eq('user_id', testUserId);
    }
  } catch (error) {
    console.error('❌ Exception insertion session:', error);
  }
  
  // 7. Test d'insertion de flashcard
  console.log('\n7️⃣ TEST D\'INSERTION FLASHCARD');
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .insert({
        user_id: testUserId,
        topic: 'Test Topic',
        question: 'Test Question',
        answer: 'Test Answer',
        review_count: 0,
        difficulty_level: 1
      })
      .select();
    
    if (error) {
      console.error('❌ Erreur insertion flashcard:', error);
      console.error('Code:', error.code);
      console.error('Message:', error.message);
    } else {
      console.log('✅ Insertion flashcard réussie:', data);
      
      // Nettoyer le test
      await supabase
        .from('flashcards')
        .delete()
        .eq('user_id', testUserId);
    }
  } catch (error) {
    console.error('❌ Exception insertion flashcard:', error);
  }
  
  console.log('\n🏁 DIAGNOSTIC TERMINÉ');
  return true;
}; 