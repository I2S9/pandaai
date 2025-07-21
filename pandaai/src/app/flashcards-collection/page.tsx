"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../../hooks/useAuth';
import {
  getUserFlashcardsFromLocalStorage,
  deleteFlashcardFromLocalStorage,
  LocalFlashcard
} from '../../../lib/localStorageService';

interface FlashcardGroup {
  topic: string;
  flashcards: LocalFlashcard[];
  count: number;
  lastCreated: string;
}

export default function FlashcardsCollectionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<LocalFlashcard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Regrouper les flashcards par thème
  const groupFlashcards = (flashcards: LocalFlashcard[]): FlashcardGroup[] => {
    const groups: { [key: string]: LocalFlashcard[] } = {};
    flashcards.forEach((card) => {
      if (!groups[card.topic]) {
        groups[card.topic] = [];
      }
      groups[card.topic].push(card);
    });
    return Object.entries(groups).map(([topic, cards]) => ({
      topic,
      flashcards: cards,
      count: cards.length,
      lastCreated: cards[0].createdAt || new Date().toISOString()
    }));
  };

  // Chargement sécurisé des flashcards utilisateur
  useEffect(() => {
    if (loading || !user) return;

    const loadFlashcards = () => {
      try {
        console.log('Loading flashcards for user:', user.id);
        setLoadingState(true);
        const userFlashcards = getUserFlashcardsFromLocalStorage(user.id);
        setFlashcards(userFlashcards);
      } catch (error) {
        console.error('Error loading flashcards:', error);
        setError('Failed to load flashcards');
      } finally {
        setLoadingState(false);
      }
    };

    loadFlashcards();
  }, [loading, user]);

  const filteredFlashcards = flashcards.filter(card =>
    card.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const flashcardGroups = groupFlashcards(filteredFlashcards);

  const handleDeleteFlashcard = (flashcardId: string) => {
    try {
      deleteFlashcardFromLocalStorage(flashcardId);
      setFlashcards(prev => prev.filter(card => card.id !== flashcardId));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      setError('Failed to delete flashcard');
    }
  };

  const handlePractice = (topic: string) => {
    console.log('Navigating to practice page for topic:', topic);
    try {
      router.push(`/flashcards/practice?topic=${encodeURIComponent(topic)}`);
    } catch (error) {
      console.error('Router navigation failed, using window.location:', error);
      window.location.href = `/flashcards/practice?topic=${encodeURIComponent(topic)}`;
    }
  };

  const handleNavigateToFlashcards = () => {
    console.log('Navigating to flashcards page');
    window.location.href = '/flashcards';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || loadingState) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A5E2F6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your flashcards...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in</h1>
          <p className="text-gray-600">You need to be logged in to view your flashcards.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Flashcards</h1>
          <p className="text-gray-600">Manage and practice your saved flashcards</p>

                      <div className="mt-6">
              <button
                onClick={handleNavigateToFlashcards}
                className="bg-[#A5E2F6] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-6 py-3 text-lg shadow-lg border-2 border-[#A5E2F6] transition cursor-pointer"
                style={{ boxShadow: '0 4px 0 #8BD4F0' }}
              >
                Back to Flashcard Generation
              </button>
            </div>
        </div>

        {/* Search */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search flashcards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 pl-12 bg-white rounded-full border border-gray-200 focus:border-[#A5E2F6] focus:outline-none shadow-sm text-base"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {flashcardGroups.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No flashcards yet</h2>
            <p className="text-gray-600 mb-6">Start creating flashcards to see them here</p>
            <button
              onClick={() => window.location.href = '/flashcards'}
              className="bg-[#A5E2F6] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#A5E2F6] transition cursor-pointer"
              style={{ boxShadow: '0 4px 0 #8BD4F0' }}
            >
              Create Flashcards
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcardGroups.map((group) => (
              <div
                key={group.topic}
                className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800 truncate">{group.topic}</h3>
                  <span className="bg-[#A5E2F6] text-white text-sm font-bold px-2 py-1 rounded-full">
                    {group.count}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Created: {formatDate(group.lastCreated)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePractice(group.topic)}
                    className="flex-1 bg-[#A5E2F6] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-lg px-4 py-2 text-sm shadow-md border-2 border-[#A5E2F6] transition cursor-pointer"
                    style={{ boxShadow: '0 2px 0 #8BD4F0' }}
                  >
                    Practice
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete all flashcards for "${group.topic}"?`)) {
                        group.flashcards.forEach(card => handleDeleteFlashcard(card.id));
                      }
                    }}
                    className="flex-1 bg-red-500 hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-lg px-4 py-2 text-sm shadow-md border-2 border-red-500 transition cursor-pointer"
                    style={{ boxShadow: '0 2px 0 #DC2626' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
