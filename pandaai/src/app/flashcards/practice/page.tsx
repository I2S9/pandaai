"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../hooks/useAuth';
import { getUserFlashcardsFromLocalStorage, LocalFlashcard } from '../../../../lib/localStorageService';

export default function PracticeFlashcardsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState<LocalFlashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('');

  // Get topic from URL parameters safely
  const getTopicFromURL = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('topic');
    }
    return null;
  };

  useEffect(() => {
    const loadFlashcards = () => {
      if (!user) return;
      
      const topicParam = getTopicFromURL();
      if (!topicParam) {
        router.push('/flashcards-collection');
        return;
      }

      setTopic(topicParam);
      const userFlashcards = getUserFlashcardsFromLocalStorage(user.id);
      const topicFlashcards = userFlashcards.filter(card => card.topic === topicParam);
      
      if (topicFlashcards.length === 0) {
        router.push('/flashcards-collection');
        return;
      }

      setFlashcards(topicFlashcards);
      setLoading(false);
    };

    loadFlashcards();
  }, [user, router]);

  // Handle URL changes
  useEffect(() => {
    if (user) {
      const topicParam = getTopicFromURL();
      if (topicParam && topicParam !== topic) {
        setTopic(topicParam);
        const userFlashcards = getUserFlashcardsFromLocalStorage(user.id);
        const topicFlashcards = userFlashcards.filter(card => card.topic === topicParam);
        setFlashcards(topicFlashcards);
        setCurrentCardIndex(0);
        setIsFlipped(false);
      }
    }
  }, [user, topic]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const goToNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const goBackToCollection = () => {
    router.push('/flashcards-collection');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A5E2F6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in</h1>
          <p className="text-gray-600">You need to be logged in to practice flashcards.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Practice: {topic}
          </h1>
          <button
            onClick={goBackToCollection}
            className="bg-[#A5E2F6] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-6 py-3 text-lg shadow-lg border-2 border-[#A5E2F6] transition cursor-pointer"
            style={{boxShadow: '0 4px 0 #8BD4F0'}}
          >
            Back to Collection
          </button>
        </div>
      </div>

      {/* Flashcard Display */}
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Card {currentCardIndex + 1} of {flashcards.length}</span>
            <span>{Math.round(((currentCardIndex + 1) / flashcards.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-[#A5E2F6] h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div 
          className="w-full max-w-xl h-96 cursor-pointer perspective-1000 mx-auto"
          onClick={handleCardClick}
        >
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}>
            {/* Front of card */}
            <div className="absolute w-full h-full bg-gradient-to-br from-[#A5E2F6] to-[#8BD4F0] rounded-2xl shadow-lg p-8 flex items-center justify-center text-center backface-hidden">
              <div className="w-full h-full bg-white rounded-xl p-6 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Question</h3>
                <p className="text-lg leading-relaxed text-gray-900">
                  {flashcards[currentCardIndex]?.question}
                </p>
                <p className="text-sm mt-4 text-gray-600">Click to see answer</p>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute w-full h-full bg-gradient-to-br from-[#8BD4F0] to-[#A5E2F6] rounded-2xl shadow-lg p-8 flex items-center justify-center text-center backface-hidden rotate-y-180">
              <div className="w-full h-full bg-white rounded-xl p-6 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Answer</h3>
                <p className="text-lg leading-relaxed text-gray-900">
                  {flashcards[currentCardIndex]?.answer}
                </p>
                <p className="text-sm mt-4 text-gray-600">Click to see question</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPreviousCard}
            disabled={currentCardIndex === 0}
            className={`w-12 h-12 rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors ${
              currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
            }`}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {flashcards.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentCardIndex ? 'bg-[#A5E2F6]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNextCard}
            disabled={currentCardIndex === flashcards.length - 1}
            className={`w-12 h-12 rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors ${
              currentCardIndex === flashcards.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
            }`}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 