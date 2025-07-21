import { createClient } from '../utils/supabase/client';

export interface Flashcard {
  front: string;
  back: string;
}

export interface SavedFlashcard {
  id: string;
  user_id: string;
  topic: string;
  question: string;
  answer: string;
  review_count: number;
  difficulty_level: number;
  created_at: string;
}

export const saveFlashcards = async (userId: string, topic: string, flashcards: Flashcard[]) => {
  const supabase = createClient();
  
  try {
    console.log('Starting to save flashcards:', {
      userId,
      topic,
      flashcardCount: flashcards.length
    });

    // Vérifier que les données sont valides
    if (!userId || !topic || !flashcards || flashcards.length === 0) {
      throw new Error('Invalid data: userId, topic, and flashcards are required');
    }

    // Préparer les données pour l'insertion
    const flashcardData = flashcards.map(flashcard => ({
      user_id: userId,
      topic: topic,
      question: flashcard.front,
      answer: flashcard.back,
      review_count: 0,
      difficulty_level: 1
    }));

    console.log('Prepared flashcard data:', flashcardData);

    // Insérer les flashcards
    const { data, error } = await supabase
      .from('flashcards')
      .insert(flashcardData)
      .select();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('Flashcards saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error saving flashcards:', error);
    throw error;
  }
};

export const getFlashcardsByUser = async (userId: string) => {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching flashcards:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFlashcardsByUser:', error);
    throw error;
  }
};

export const getFlashcardsByTopic = async (userId: string, topic: string) => {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('user_id', userId)
      .eq('topic', topic)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching flashcards by topic:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFlashcardsByTopic:', error);
    throw error;
  }
};

export const deleteFlashcard = async (flashcardId: string) => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', flashcardId);

    if (error) {
      console.error('Error deleting flashcard:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteFlashcard:', error);
    throw error;
  }
};

export const updateFlashcardReview = async (flashcardId: string, reviewCount: number, difficultyLevel: number) => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('flashcards')
      .update({
        review_count: reviewCount,
        difficulty_level: difficultyLevel
      })
      .eq('id', flashcardId);

    if (error) {
      console.error('Error updating flashcard review:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in updateFlashcardReview:', error);
    throw error;
  }
}; 