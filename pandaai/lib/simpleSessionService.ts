import { createClient } from '../utils/supabase/client';

// Type definition for flashcards
interface Flashcard {
  front: string;
  back: string;
}

// Service simplifié pour gérer les sessions avec Clerk
export const saveSessionToDatabase = async (userId: string, durationSeconds: number) => {
  const supabase = createClient();
  
  try {
    console.log('💾 Saving session to database:', { userId, durationSeconds });
    
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: userId,
        start_time: new Date().toISOString(),
        duration_seconds: durationSeconds
      })
      .select();

    if (error) {
      console.error('❌ Error saving session:', error);
      throw error;
    }

    console.log('✅ Session saved successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Session save failed:', error);
    throw error;
  }
};

export const getTodaySessionsFromDatabase = async (userId: string) => {
  const supabase = createClient();
  
  try {
    console.log('📊 Loading today sessions for user:', userId);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .gte('start_time', today.toISOString());

    if (error) {
      console.error('❌ Error loading sessions:', error);
      throw error;
    }

    console.log('✅ Sessions loaded:', data?.length || 0, 'sessions');
    return data || [];
  } catch (error) {
    console.error('❌ Session load failed:', error);
    return [];
  }
};

export const calculateTotalTodayDuration = async (userId: string) => {
  try {
    const sessions = await getTodaySessionsFromDatabase(userId);
    const totalSeconds = sessions.reduce((total, session) => total + session.duration_seconds, 0);
    console.log('📈 Total today duration:', totalSeconds, 'seconds');
    return totalSeconds;
  } catch (error) {
    console.error('❌ Error calculating total duration:', error);
    return 0;
  }
};

// Service pour les flashcards
export const saveFlashcardsToDatabase = async (userId: string, topic: string, flashcards: Flashcard[]) => {
  const supabase = createClient();
  
  try {
    console.log('💾 Saving flashcards:', { userId, topic, count: flashcards.length });
    
    const flashcardData = flashcards.map(flashcard => ({
      user_id: userId,
      topic: topic,
      question: flashcard.front,
      answer: flashcard.back,
      review_count: 0,
      difficulty_level: 1
    }));

    const { data, error } = await supabase
      .from('flashcards')
      .insert(flashcardData)
      .select();

    if (error) {
      console.error('❌ Error saving flashcards:', error);
      throw error;
    }

    console.log('✅ Flashcards saved successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Flashcard save failed:', error);
    throw error;
  }
};

export const getFlashcardsFromDatabase = async (userId: string) => {
  const supabase = createClient();
  
  try {
    console.log('📚 Loading flashcards for user:', userId);
    
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error loading flashcards:', error);
      throw error;
    }

    console.log('✅ Flashcards loaded:', data?.length || 0, 'flashcards');
    return data || [];
  } catch (error) {
    console.error('❌ Flashcard load failed:', error);
    return [];
  }
}; 