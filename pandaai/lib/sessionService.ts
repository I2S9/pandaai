import { createClient } from '../utils/supabase/client';

export interface Session {
  id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  duration_seconds: number;
  created_at: string;
}

export const startSession = async (userId: string): Promise<string> => {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: userId,
        start_time: new Date().toISOString(),
        duration_seconds: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Error starting session:', error);
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Error in startSession:', error);
    throw error;
  }
};

export const endSession = async (sessionId: string, durationSeconds: number): Promise<void> => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('sessions')
      .update({
        end_time: new Date().toISOString(),
        duration_seconds: durationSeconds
      })
      .eq('id', sessionId);

    if (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in endSession:', error);
    throw error;
  }
};

export const getTodaySessions = async (userId: string): Promise<Session[]> => {
  const supabase = createClient();
  
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .gte('start_time', today.toISOString())
      .order('start_time', { ascending: false });

    if (error) {
      console.error('Error fetching today sessions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getTodaySessions:', error);
    throw error;
  }
};

export const getTotalTodayDuration = async (userId: string): Promise<number> => {
  try {
    const sessions = await getTodaySessions(userId);
    return sessions.reduce((total, session) => total + session.duration_seconds, 0);
  } catch (error) {
    console.error('Error in getTotalTodayDuration:', error);
    return 0;
  }
};

export const updateSessionDuration = async (sessionId: string, durationSeconds: number): Promise<void> => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('sessions')
      .update({
        duration_seconds: durationSeconds
      })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating session duration:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateSessionDuration:', error);
    throw error;
  }
}; 