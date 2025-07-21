import { createClient } from '../utils/supabase/client';

export const testSupabaseConnection = async () => {
  const supabase = createClient();
  
  try {
    // Test simple de connexion
    const { error } = await supabase
      .from('flashcards')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful!');
    return true;
  } catch (error) {
    console.error('Supabase test failed:', error);
    return false;
  }
};

export const testSaveFlashcard = async (userId: string, topic: string, question: string, answer: string) => {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .insert({
        user_id: userId,
        topic: topic,
        question: question,
        answer: answer,
        review_count: 0,
        difficulty_level: 1
      })
      .select();

    if (error) {
      console.error('Error saving test flashcard:', error);
      return false;
    }
    
    console.log('Test flashcard saved successfully:', data);
    return true;
  } catch (error) {
    console.error('Test save failed:', error);
    return false;
  }
}; 