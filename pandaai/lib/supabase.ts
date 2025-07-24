import { createClient } from '../utils/supabase/client';

// User management
export const createUser = async (userId: string, email: string) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: userId,
      email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateUserSubscription = async (
  userId: string, 
  stripeCustomerId: string, 
  status: 'active' | 'inactive' | 'cancelled',
  endDate?: string
) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('users')
    .update({
      stripe_customer_id: stripeCustomerId,
      subscription_status: status,
      subscription_end_date: endDate,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Session tracking
export const logUserSession = async (userId: string, durationMinutes: number) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('user_sessions')
    .insert({
      user_id: userId,
      session_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      duration_minutes: durationMinutes,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserSessions = async (userId: string, days: number = 30) => {
  const supabase = createClient();
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from('user_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('session_date', startDate.toISOString().split('T')[0])
    .order('session_date', { ascending: true });

  if (error) throw error;
  return data;
};

// Flashcards management
export const createFlashcard = async (
  userId: string,
  topic: string,
  question: string,
  answer: string
) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('flashcards')
    .insert({
      user_id: userId,
      topic,
      question,
      answer,
      review_count: 0,
      difficulty_level: 1,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserFlashcards = async (userId: string, topic?: string) => {
  const supabase = createClient();
  
  let query = supabase
    .from('flashcards')
    .select('*')
    .eq('user_id', userId);
    
  if (topic) {
    query = query.eq('topic', topic);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateFlashcardReview = async (
  flashcardId: string,
  difficultyLevel: number
) => {
  const supabase = createClient();
  
  // First get the current review count
  const { data: currentData, error: fetchError } = await supabase
    .from('flashcards')
    .select('review_count')
    .eq('id', flashcardId)
    .single();

  if (fetchError) throw fetchError;

  // Then update with incremented value
  const { data, error } = await supabase
    .from('flashcards')
    .update({
      last_reviewed: new Date().toISOString(),
      review_count: (currentData?.review_count || 0) + 1,
      difficulty_level: difficultyLevel,
    })
    .eq('id', flashcardId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Score tracking
export const saveUserScore = async (
  userId: string,
  quizType: string,
  score: number,
  totalQuestions: number
) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('user_scores')
    .insert({
      user_id: userId,
      quiz_type: quizType,
      score,
      total_questions: totalQuestions,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserScores = async (userId: string, quizType?: string) => {
  const supabase = createClient();
  
  let query = supabase
    .from('user_scores')
    .select('*')
    .eq('user_id', userId);
    
  if (quizType) {
    query = query.eq('quiz_type', quizType);
  }
  
  const { data, error } = await query.order('completed_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Pomodoro sessions
export const startPomodoroSession = async (userId: string, durationMinutes: number) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .insert({
      user_id: userId,
      duration_minutes: durationMinutes,
      completed: false,
      started_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const completePomodoroSession = async (sessionId: string) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .update({
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserPomodoroSessions = async (userId: string, days: number = 30) => {
  const supabase = createClient();
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('started_at', startDate.toISOString())
    .order('started_at', { ascending: false });

  if (error) throw error;
  return data;
}; 