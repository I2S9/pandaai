import { saveUserScore, getUserScores } from './supabase';

// Type for user score data from database
interface UserScore {
  id: string;
  user_id: string;
  quiz_type: string;
  score: number;
  total_questions: number;
  completed_at: string;
  created_at: string;
}

export interface ScoreData {
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

export interface ChartData {
  date: string;
  examMode: number;
  quizAI: number;
}

// Save score for different quiz types
export const saveScore = async (
  userId: string,
  quizType: 'exam_mode' | 'quiz_ai',
  score: number,
  totalQuestions: number
) => {
  try {
    await saveUserScore(userId, quizType, score, totalQuestions);
    console.log(`Score saved: ${score}/${totalQuestions} for ${quizType}`);
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

// Get score data for dashboard charts
export const getScoreDataForDashboard = async (userId: string, days: number = 30): Promise<ChartData[]> => {
  try {
    const scores = await getUserScores(userId);
    
    // Filter by date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const recentScores = scores.filter((score: UserScore) => 
      new Date(score.completed_at) >= startDate
    );

    // Group by date and quiz type
    const dailyData: { [key: string]: { exam_mode: number[], quiz_ai: number[] } } = {};
    
    recentScores.forEach((score: UserScore) => {
      const date = new Date(score.completed_at).toISOString().split('T')[0];
      const percentage = Math.round((score.score / score.total_questions) * 100);
      
      if (!dailyData[date]) {
        dailyData[date] = { exam_mode: [], quiz_ai: [] };
      }
      
      if (score.quiz_type === 'exam_mode') {
        dailyData[date].exam_mode.push(percentage);
      } else if (score.quiz_type === 'quiz_ai') {
        dailyData[date].quiz_ai.push(percentage);
      }
    });

    // Calculate average scores per day
    const chartData: ChartData[] = Object.entries(dailyData).map(([date, scores]) => ({
      date,
      examMode: scores.exam_mode.length > 0 
        ? Math.round(scores.exam_mode.reduce((a, b) => a + b, 0) / scores.exam_mode.length)
        : 0,
      quizAI: scores.quiz_ai.length > 0
        ? Math.round(scores.quiz_ai.reduce((a, b) => a + b, 0) / scores.quiz_ai.length)
        : 0
    }));

    // Sort by date
    return chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error('Error getting score data:', error);
    return [];
  }
};

// Get recent scores for a specific quiz type
export const getRecentScores = async (
  userId: string, 
  quizType: 'exam_mode' | 'quiz_ai', 
  limit: number = 10
): Promise<ScoreData[]> => {
  try {
    const scores = await getUserScores(userId, quizType);
    
    return scores.slice(0, limit).map((score: UserScore) => ({
      date: new Date(score.completed_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      score: score.score,
      totalQuestions: score.total_questions,
      percentage: Math.round((score.score / score.total_questions) * 100)
    }));
  } catch (error) {
    console.error('Error getting recent scores:', error);
    return [];
  }
};

// Get average score for a quiz type
export const getAverageScore = async (
  userId: string, 
  quizType: 'exam_mode' | 'quiz_ai'
): Promise<number> => {
  try {
    const scores = await getUserScores(userId, quizType);
    
    if (scores.length === 0) return 0;
    
    const totalPercentage = scores.reduce((sum: number, score: UserScore) => {
      return sum + (score.score / score.total_questions) * 100;
    }, 0);
    
    return Math.round(totalPercentage / scores.length);
  } catch (error) {
    console.error('Error getting average score:', error);
    return 0;
  }
};

// Get total attempts for a quiz type
export const getTotalAttempts = async (
  userId: string, 
  quizType: 'exam_mode' | 'quiz_ai'
): Promise<number> => {
  try {
    const scores = await getUserScores(userId, quizType);
    return scores.length;
  } catch (error) {
    console.error('Error getting total attempts:', error);
    return 0;
  }
}; 