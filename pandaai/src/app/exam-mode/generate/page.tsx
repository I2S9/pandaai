"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamGeneratePage() {
  const router = useRouter();
  const [generationStep, setGenerationStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  const steps = [
    "Analyzing uploaded documents...",
    "Extracting key concepts and topics...",
    "Generating exam questions based on content...",
    "Creating answer options and explanations...",
    "Finalizing your personalized exam..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGenerationStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsGenerating(false);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStartExam = () => {
    // Ici on redirigera vers la page de l'examen
    router.push('/exam-mode/take');
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 text-center">
        {isGenerating ? (
          <>
            <div className="mb-8">
              <div className="flex justify-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-[#F2B2BC] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-[#F2B2BC] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-[#F2B2BC] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Generating Your Exam</h1>
              <p className="text-gray-600">Please wait while our AI creates a personalized exam for you...</p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                    index <= generationStep
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index <= generationStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}>
                    {index < generationStep ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{step}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Exam Ready!</h1>
              <p className="text-gray-600 mb-6">
                Your personalized exam has been generated successfully. You can now start your exam session.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Exam Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <span className="ml-2 font-medium">60 minutes</span>
                </div>
                <div>
                  <span className="text-gray-600">Documents Allowed:</span>
                  <span className="ml-2 font-medium">Yes</span>
                </div>
                <div>
                  <span className="text-gray-600">Calculator Allowed:</span>
                  <span className="ml-2 font-medium">Yes</span>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">Generated from your document</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="bg-[#F2B2BC] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#F2B2BC] transition cursor-pointer w-full"
              style={{boxShadow: '0 4px 0 #E8A0AC'}}
            >
              Start Exam
            </button>
          </>
        )}
      </div>
    </div>
  );
} 