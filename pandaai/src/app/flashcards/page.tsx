"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function FlashcardsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [flashcardCount, setFlashcardCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [subject, setSubject] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ file, flashcardCount, difficulty, subject });
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">Flashcards</h1>
      
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
              Subject (Optional)
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Mathematics, History, Science..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A5E2F6] focus:border-[#A5E2F6]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#A5E2F6] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#A5E2F6] transition w-full cursor-pointer"
            style={{boxShadow: '0 4px 0 #8BD4F0'}}
          >
            Generate Flashcards
          </button>
        </form>
      </div>
    </div>
  );
} 