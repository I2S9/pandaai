"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardData {
  flashcards: Flashcard[];
}

export default function FlashcardsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [flashcardCount, setFlashcardCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [flashcardData, setFlashcardData] = useState<FlashcardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const generateFlashcards = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim()) {
      setError('Please enter a subject to generate flashcards.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFlashcardData(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);

    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: subject.trim(),
          flashcardCount,
          difficulty,
          language: 'English',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate flashcards');
      }

      setFlashcardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate flashcards');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const goToNextCard = () => {
    if (flashcardData && currentCardIndex < flashcardData.flashcards.length - 1) {
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

  const generateNewFlashcards = () => {
    setFlashcardData(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
        {flashcardData ? `Flashcards about ${subject}` : 'Flashcards'}
      </h1>
      
      {!flashcardData ? (
        <>
          {/* Image */}
          <div className="mb-16">
            <Image 
              src="/flashcards-section.png" 
              alt="Flashcards illustration" 
              width={400} 
              height={300}
              className="w-auto h-auto max-w-full"
            />
          </div>

          {/* Section de configuration */}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Create Your Flashcards</h2>
            
            <form onSubmit={generateFlashcards} className="space-y-6">
              {/* Upload PDF */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload PDF Document
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#A5E2F6] transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-[#A5E2F6] hover:text-[#8BD4F0]">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-xs text-gray-500">PDF files only</p>
                    </div>
                  </label>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-green-600">✓ {file.name} selected</p>
                )}
              </div>

              {/* Number of Flashcards */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Flashcards
                </label>
                <select
                  value={flashcardCount}
                  onChange={(e) => setFlashcardCount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A5E2F6] focus:border-[#A5E2F6]"
                >
                  <option value={5}>5 flashcards</option>
                  <option value={10}>10 flashcards</option>
                  <option value={15}>15 flashcards</option>
                  <option value={20}>20 flashcards</option>
                  <option value={25}>25 flashcards</option>
                  <option value={30}>30 flashcards</option>
                </select>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A5E2F6] focus:border-[#A5E2F6]"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject (Required)
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Mathematics, History, Science..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A5E2F6] focus:border-[#A5E2F6]"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#A5E2F6] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#A5E2F6] transition w-full cursor-pointer ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{boxShadow: '0 4px 0 #8BD4F0'}}
              >
                {isLoading ? 'Generating Flashcards...' : 'Generate Flashcards'}
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="w-full max-w-4xl">
          {/* Flashcard Display */}
          <div className="flex flex-col items-center mb-8">
            {/* Progress Bar */}
            <div className="w-full max-w-md mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Card {currentCardIndex + 1} of {flashcardData.flashcards.length}</span>
                <span>{Math.round(((currentCardIndex + 1) / flashcardData.flashcards.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-[#A5E2F6] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentCardIndex + 1) / flashcardData.flashcards.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Flashcard */}
            <div 
              className="w-full max-w-xl h-96 cursor-pointer perspective-1000"
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
                      {flashcardData.flashcards[currentCardIndex].front}
                    </p>
                    <p className="text-sm mt-4 text-gray-600">Click to see answer</p>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full bg-gradient-to-br from-[#8BD4F0] to-[#A5E2F6] rounded-2xl shadow-lg p-8 flex items-center justify-center text-center backface-hidden rotate-y-180">
                  <div className="w-full h-full bg-white rounded-xl p-6 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Answer</h3>
                    <p className="text-lg leading-relaxed text-gray-900">
                      {flashcardData.flashcards[currentCardIndex].back}
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
                {flashcardData.flashcards.map((_, index) => (
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
                disabled={currentCardIndex === flashcardData.flashcards.length - 1}
                className={`w-12 h-12 rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors ${
                  currentCardIndex === flashcardData.flashcards.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                }`}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
            <button
              onClick={generateNewFlashcards}
              className="bg-[#A5E2F6] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#A5E2F6] transition cursor-pointer w-full"
              style={{boxShadow: '0 4px 0 #8BD4F0'}}
            >
              Generate new flashcards
            </button>
            <button
              onClick={() => {
                // TODO: Implement save to collection functionality with database
                console.log('Save flashcards to collection');
              }}
              className="bg-white hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-[#A5E2F6] font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#A5E2F6] transition cursor-pointer w-full"
              style={{boxShadow: '0 4px 0 #8BD4F0'}}
            >
              Save in collection
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 