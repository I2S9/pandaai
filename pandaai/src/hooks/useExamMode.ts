import { useState, useEffect } from 'react';

export interface ExamConfig {
  duration: number;
  allowDocuments: boolean;
  allowCalculator: boolean;
  documents: File[];
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
}

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ExamResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: string;
  questions: {
    id: number;
    question: string;
    userAnswer: number;
    correctAnswer: number;
    options: string[];
    explanation: string;
    isCorrect: boolean;
  }[];
}

export function useExamMode() {
  const [config, setConfig] = useState<ExamConfig>({
    duration: 60,
    allowDocuments: false,
    allowCalculator: false,
    documents: [],
    difficulty: 'medium',
    questionCount: 10
  });

  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  // Timer effect
  useEffect(() => {
    if (!isExamStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, timeLeft]);

  const updateConfig = (updates: Partial<ExamConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const addDocument = (file: File) => {
    setConfig(prev => ({
      ...prev,
      documents: [...prev.documents, file]
    }));
  };

  const removeDocument = (index: number) => {
    setConfig(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const setAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const startExam = (examQuestions: ExamQuestion[]) => {
    setQuestions(examQuestions);
    setTimeLeft(config.duration * 60);
    setIsExamStarted(true);
    setAnswers(new Array(examQuestions.length).fill(-1));
  };

  const submitExam = async () => {
    try {
      const timeTaken = (config.duration * 60) - timeLeft;
      
      const submissionData = {
        answers,
        timeTaken,
        questions: questions.map(q => ({
          id: q.id,
          correctAnswer: q.correctAnswer
        }))
      };

      const response = await fetch('/api/submit-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const data = await response.json();
        setExamResult(data.result);
        localStorage.setItem('examResults', JSON.stringify(data.result));
        return data.result;
      } else {
        throw new Error('Failed to submit exam');
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      throw error;
    }
  };

  const resetExam = () => {
    setQuestions([]);
    setAnswers([]);
    setTimeLeft(config.duration * 60);
    setIsExamStarted(false);
    setExamResult(null);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    config,
    questions,
    answers,
    timeLeft,
    isExamStarted,
    examResult,
    updateConfig,
    addDocument,
    removeDocument,
    setAnswer,
    startExam,
    submitExam,
    resetExam,
    formatTime
  };
} 