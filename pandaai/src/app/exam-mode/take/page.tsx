"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Calculator from '../../../components/Calculator';
import PdfViewer from '../../../components/PdfViewer';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function ExamTakePage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | string)[]>([]);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [showDocuments, setShowDocuments] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [examConfig, setExamConfig] = useState({
    allowDocuments: true,
    allowCalculator: true,
    documents: [] as { name: string; content: string }[]
  });

  // Questions will be loaded from the generated exam
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load exam data from localStorage
  useEffect(() => {
    const generatedExam = localStorage.getItem('generatedExam');
    const uploadedFileData = localStorage.getItem('uploadedFileData');
    
    if (generatedExam) {
      const exam = JSON.parse(generatedExam);
      
      // Convert exam content to questions format
      if (exam.content && exam.content.questions) {
        const formattedQuestions = exam.content.questions.map((q: { question: string; options?: string[]; correctAnswer?: number; explanation?: string }, index: number) => ({
          id: index + 1,
          question: q.question,
          options: q.options || [],
          correctAnswer: q.correctAnswer || 0,
          explanation: q.explanation || "Explication de la réponse"
        }));
        setQuestions(formattedQuestions);
      }
    }

    if (uploadedFileData) {
      const fileData = JSON.parse(uploadedFileData);
      setExamConfig(prev => ({
        ...prev,
        documents: [{
          name: fileData.filename || 'Document uploadé',
          content: fileData.extractedText || 'Contenu du document'
        }]
      }));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number | string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitExam = async () => {
    try {
      setExamCompleted(true);
      
      // Calculate time taken
      const timeTaken = 60 * 60 - timeLeft; // Total time minus remaining time
      
      // Prepare exam submission data
      const submissionData = {
        answers,
        timeTaken,
        questions: questions.map(q => ({
          id: q.id,
          question: q.question,
          type: q.options && q.options.length > 0 ? 'quiz' : 'exercise',
          correctAnswer: q.correctAnswer,
          options: q.options || [],
          explanation: q.explanation || "Answer explanation"
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
        console.log('Exam results:', data);
        // Store results in localStorage or state management for the results page
        localStorage.setItem('examResults', JSON.stringify(data.result));
      } else {
        console.error('Failed to submit exam');
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  if (examCompleted) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Exam Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Your exam has been submitted successfully. You will receive your results shortly.
            </p>
          </div>

          <button
            onClick={() => router.push('/exam-mode/results')}
            className="bg-[#F2B2BC] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#F2B2BC] transition cursor-pointer w-full"
            style={{boxShadow: '0 4px 0 #E8A0AC'}}
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col">
      {/* Header with Timer */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Exam Mode</h1>
            <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className="flex items-center space-x-4">
            {examConfig.allowDocuments && (
              <button
                onClick={() => setShowDocuments(!showDocuments)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {showDocuments ? 'Hide' : 'Show'} Documents
              </button>
            )}
            {examConfig.allowCalculator && (
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ml-2"
              >
                {showCalculator ? 'Hide' : 'Show'} Calculator
              </button>
            )}
            <div className="text-right">
              <div className="text-sm text-gray-600">Time Remaining</div>
              <div className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Exam Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Question */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="mb-6">
                <span className="inline-block bg-[#F2B2BC] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Question {currentQuestion + 1}
                </span>
                <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {questions[currentQuestion]?.question}
                </h2>
              </div>

              {/* Answer Options - Only show for quiz questions */}
              {questions[currentQuestion]?.options && questions[currentQuestion].options.length > 0 && (
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        answers[currentQuestion] === index
                          ? 'border-[#F2B2BC] bg-[#F2B2BC] bg-opacity-10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={index}
                        checked={answers[currentQuestion] === index}
                        onChange={() => handleAnswerSelect(index)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                        answers[currentQuestion] === index
                          ? 'border-[#F2B2BC] bg-[#F2B2BC]'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion] === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Text input for exercise questions */}
              {(!questions[currentQuestion]?.options || questions[currentQuestion].options.length === 0) && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer:
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2B2BC] focus:border-transparent resize-none"
                    rows={6}
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion] || ''}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm font-bold shadow-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{boxShadow: '0 4px 0 #9CA3AF'}}
              >
                Previous
              </button>

              <div className="flex space-x-3">
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-gray-600 hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl shadow-lg border-2 border-gray-600 transition cursor-pointer"
                    style={{boxShadow: '0 4px 0 #4B5563'}}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
                    className="px-6 py-3 bg-[#F2B2BC] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl shadow-lg border-2 border-[#F2B2BC] transition cursor-pointer"
                    style={{boxShadow: '0 4px 0 #E8A0AC'}}
                  >
                    Submit Exam
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documents Sidebar */}
        {showDocuments && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reference Documents</h3>
            <div className="space-y-3">
                              {examConfig.documents.map((doc, index) => (
                  <div key={index} className="mb-4">
                    <PdfViewer 
                      content={doc.content} 
                      filename={doc.name}
                      maxHeight={300}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Calculator Sidebar */}
        {showCalculator && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculator</h3>
            <div className="flex justify-center">
              <Calculator />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 