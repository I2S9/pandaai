"use client";
import React, { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  explanation: string;
}

interface QuizData {
  quiz: {
    title: string;
    questions: QuizQuestion[];
  };
}

export default function QuizGeneratorPage() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('Medium');
  const [language, setLanguage] = useState('English');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [showExplanations, setShowExplanations] = useState(true);

  const generateQuiz = async () => {
    if (!subject.trim()) {
      setError('Please enter a subject to generate a quiz.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setQuizData(null);
    setUserAnswers({});
    setShowResults(false);
    setShowScorePopup(false);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: subject.trim(),
          numQuestions,
          difficulty,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate quiz');
      }

      setQuizData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate quiz');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    
    let correct = 0;
    quizData.quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / quizData.quiz.questions.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    setShowScorePopup(true);
  };

  const handleNewQuiz = () => {
    setQuizData(null);
    setUserAnswers({});
    setShowResults(false);
    setShowScorePopup(false);
    setShowExplanations(true);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Quiz Generator</h1>
      
      {!quizData ? (
        <>
          {/* Étapes */}
          <div className="flex flex-col md:flex-row justify-center gap-12 w-full max-w-6xl mb-10">
            {/* Step 1 */}
            <div className="flex-1 flex flex-row items-start text-left">
              <span className="text-[80px] font-bold text-[#F8C57C] opacity-80 mr-4 leading-none">1</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Enter a prompt or upload a file</h2>
                <p className="text-base text-gray-800 max-w-xs">Start your quiz-creating process by entering a prompt that describes the quiz or uploading a file to base the quiz on, for example, a lesson plan or another document.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex-1 flex flex-row items-start text-left">
              <span className="text-[80px] font-bold text-[#F8C57C] opacity-80 mr-4 leading-none">2</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Specify quiz details</h2>
                <p className="text-base text-gray-800 max-w-xs">Tell our AI bot how many questions you need, the language you want your quiz to be in, and the type of questions you want included.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex-1 flex flex-row items-start text-left">
              <span className="text-[80px] font-bold text-[#F8C57C] opacity-80 mr-4 leading-none">3</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Review and share</h2>
                <p className="text-base text-gray-800 max-w-xs">Happy with your AI-generated quiz? Share or embed it to collect quiz responses.</p>
              </div>
            </div>
          </div>
          {/* Card centrale */}
          <div className="bg-white rounded-2xl shadow p-8 w-full max-w-xl flex flex-col items-center mb-8">
            {/* Uploader */}
            <label className="w-full flex flex-col items-center cursor-pointer mb-4">
              <span className="text-base font-semibold text-gray-700 mb-2">Upload a file</span>
              <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
              <div className="w-full border-2 border-dashed border-gray-300 rounded-xl py-6 flex items-center justify-center text-gray-400 hover:border-[#F8C57C] transition">
                {file ? file.name : 'Click or drag a file here'}
              </div>
            </label>
            {/* Séparateur */}
            <div className="flex items-center w-full my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="mx-4 text-gray-400 font-bold">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            {/* Sujet manuel */}
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Enter a subject to study..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#F8C57C] mb-2"
            />
          </div>
          {/* Options */}
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-xl mb-10">
            {/* Nombre de questions */}
            <div className="flex flex-col items-center flex-1">
              <label className="text-base font-semibold text-gray-700 mb-2">Number of questions</label>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 rounded-full bg-gray-100 text-2xl font-bold flex items-center justify-center hover:bg-gray-200"
                  onClick={() => setNumQuestions(n => Math.max(1, n - 1))}
                  type="button"
                >-</button>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={numQuestions}
                  onChange={e => setNumQuestions(Number(e.target.value))}
                  className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1 text-lg"
                />
                <button
                  className="w-8 h-8 rounded-full bg-gray-100 text-2xl font-bold flex items-center justify-center hover:bg-gray-200"
                  onClick={() => setNumQuestions(n => Math.min(50, n + 1))}
                  type="button"
                >+</button>
              </div>
            </div>
            {/* Difficulté */}
            <div className="flex flex-col items-center flex-1">
              <label className="text-base font-semibold text-gray-700 mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:border-[#F8C57C]"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            {/* Langue */}
            <div className="flex flex-col items-center flex-1">
              <label className="text-base font-semibold text-gray-700 mb-2">Language</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:border-[#F8C57C]"
              >
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
            </div>
          </div>
          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-xl">
              {error}
            </div>
          )}
          {/* Bouton principal */}
          <button
            onClick={generateQuiz}
            disabled={isLoading}
            className={`bg-[#F8C57C] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-10 py-4 text-xl shadow-lg border-2 border-[#F8C57C] transition cursor-pointer w-full max-w-xl ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{boxShadow: '0 4px 0 #E6B35A'}}
            type="button"
          >
            {isLoading ? 'Generating Quiz...' : 'Generate AI Quiz'}
          </button>
        </>
      ) : (
        <div className="w-full max-w-4xl">
          {/* Quiz Title - Centered */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{quizData.quiz.title}</h2>
          </div>

          {/* Controls - Centered */}
          {showResults && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowExplanations(!showExplanations)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {showExplanations ? 'Hide Explanations' : 'Show Explanations'}
              </button>
            </div>
          )}

          {/* Quiz Info Badges - Centered */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-[#F8C57C] text-white font-semibold px-4 py-2 rounded-full border border-[#F8C57C]">
              {quizData.quiz.questions.length} Questions
            </div>
            <div className="bg-[#F8C57C] text-white font-semibold px-4 py-2 rounded-full border border-[#F8C57C]">
              {difficulty}
            </div>
            <div className="bg-[#F8C57C] text-white font-semibold px-4 py-2 rounded-full border border-[#F8C57C]">
              {language}
            </div>
          </div>

          {/* Quiz Questions */}
          <div className="space-y-6 mb-8">
            {quizData.quiz.questions.map((question, index) => {
              const isCorrect = userAnswers[index] === question.correctAnswer;
              const userSelected = userAnswers[index];
              
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  {/* Question Header */}
                  <div className="flex items-center mb-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      showResults 
                        ? isCorrect 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      <span>Question {index + 1}</span>
                      {showResults && (
                        <span className="ml-2">
                          {isCorrect ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {question.question}
                  </h3>
                  
                  {/* Answer Options */}
                  <div className="space-y-3 mb-6">
                    {Object.entries(question.options).map(([key, value]) => {
                      const isCorrectAnswer = key === question.correctAnswer;
                      const isUserAnswer = userSelected === key;
                      const isWrongAnswer = showResults && isUserAnswer && !isCorrectAnswer;
                      
                      return (
                        <div
                          key={key}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            showResults
                              ? isCorrectAnswer
                                ? 'bg-green-50 border-green-200'
                                : isWrongAnswer
                                ? 'bg-red-50 border-red-200'
                                : 'bg-gray-50 border-gray-200'
                              : userSelected === key
                              ? 'bg-orange-50 border-orange-200'
                              : 'bg-white border-gray-200 hover:border-orange-200'
                          }`}
                        >
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={key}
                              checked={userSelected === key}
                              onChange={() => handleAnswerSelect(index, key)}
                              className="mr-3"
                              disabled={showResults}
                            />
                            <span className={`text-lg font-medium ${
                              showResults
                                ? isCorrectAnswer
                                  ? 'text-green-700'
                                  : isWrongAnswer
                                  ? 'text-red-700'
                                  : 'text-gray-700'
                                : 'text-gray-700'
                            }`}>
                              {key}. {value}
                            </span>
                            {showResults && (
                              <span className="ml-auto">
                                {isCorrectAnswer && (
                                  <span className="inline-flex items-center text-green-600 font-semibold">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Correct
                                  </span>
                                )}
                                {isWrongAnswer && (
                                  <span className="inline-flex items-center text-red-600 font-semibold">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Your Answer
                                  </span>
                                )}
                              </span>
                            )}
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Section */}
                  {showResults && showExplanations && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">
                        <strong className="font-semibold">Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!showResults ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length < quizData.quiz.questions.length}
                className={`bg-[#F8C57C] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#F8C57C] transition ${
                  Object.keys(userAnswers).length < quizData.quiz.questions.length 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer'
                }`}
                style={{boxShadow: '0 4px 0 #E6B35A'}}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNewQuiz}
                className="bg-[#F8C57C] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#F8C57C] transition cursor-pointer"
                style={{boxShadow: '0 4px 0 #E6B35A'}}
              >
                Generate New Quiz
              </button>
            )}
          </div>
        </div>
      )}

            {/* Score Popup */}
      {showScorePopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => setShowScorePopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(calculateScore())}`}>
                {calculateScore()}%
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
              <p className="text-gray-600 mb-6">
                You got {Object.values(userAnswers).filter((answer, index) => 
                  answer === quizData?.quiz.questions[index].correctAnswer
                ).length} out of {quizData?.quiz.questions.length} questions correct.
              </p>
              <button
                onClick={handleNewQuiz}
                className="bg-[#F8C57C] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#F8C57C] transition cursor-pointer w-full"
                style={{boxShadow: '0 4px 0 #E6B35A'}}
              >
                Generate New Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 