import { NextRequest, NextResponse } from 'next/server';

interface ExamSubmission {
  answers: (number | string)[];
  timeTaken: number;
  questions: {
    id: number;
    question: string;
    type: 'quiz' | 'exercise' | 'text';
    correctAnswer?: number;
    options?: string[];
    explanation: string;
  }[];
}

interface ExamResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: string;
  questions: {
    id: number;
    question: string;
    userAnswer: string | number;
    correctAnswer?: number;
    options: string[];
    explanation: string;
    isCorrect: boolean;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, timeTaken, questions }: ExamSubmission = body;

    if (!answers || !questions) {
      return NextResponse.json(
        { error: 'Missing exam data' },
        { status: 400 }
      );
    }

    // Calculate results
    const result = calculateExamResults(answers, questions, timeTaken);

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Submit exam error:', error);
    return NextResponse.json(
      { error: 'Error submitting exam' },
      { status: 500 }
    );
  }
}

function calculateExamResults(
  userAnswers: (number | string)[], 
  questions: { 
    id: number; 
    question: string;
    type: 'quiz' | 'exercise' | 'text';
    correctAnswer?: number;
    options?: string[];
    explanation: string;
  }[], 
  timeTaken: number
): ExamResult {
  let correctAnswers = 0;
  const totalQuestions = questions.length;

  // Count correct answers
  for (let i = 0; i < totalQuestions; i++) {
    if (questions[i].type === 'quiz' && userAnswers[i] === questions[i].correctAnswer) {
      correctAnswers++;
    } else if (questions[i].type === 'exercise' || questions[i].type === 'text') {
      // For text/exercise questions, consider as correct if answered
      if (userAnswers[i] && userAnswers[i] !== '') {
        correctAnswers++;
      }
    }
  }

  // Calculate score
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  // Format time taken
  const hours = Math.floor(timeTaken / 3600);
  const minutes = Math.floor((timeTaken % 3600) / 60);
  const seconds = timeTaken % 60;
  const timeTakenFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Create result questions with user answers
  const resultQuestions = questions.map((q, index) => ({
    id: q.id,
    question: q.question,
    options: q.options || [],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || "Answer explanation",
    userAnswer: userAnswers[index] || (q.type === 'quiz' ? -1 : ''),
    isCorrect: q.type === 'quiz' 
      ? userAnswers[index] === q.correctAnswer
      : Boolean(userAnswers[index] && userAnswers[index] !== '')
  }));

  return {
    score,
    totalQuestions,
    correctAnswers,
    timeTaken: timeTakenFormatted,
    questions: resultQuestions
  };
} 