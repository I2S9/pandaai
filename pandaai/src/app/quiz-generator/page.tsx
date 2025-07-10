"use client";
import React, { useState } from 'react';

export default function QuizGeneratorPage() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('Medium');
  const [language, setLanguage] = useState('English');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">How it works</h1>
      {/* Étapes */}
      <div className="flex flex-col md:flex-row justify-center gap-12 w-full max-w-6xl mb-10">
        {/* Step 1 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#C7A2F7] opacity-40 mr-4 leading-none">1</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Enter a prompt or upload a file</h2>
            <p className="text-base text-gray-800 max-w-xs">Start your quiz-creating process by entering a prompt that describes the quiz or uploading a file to base the quiz on, for example, a lesson plan or another document.</p>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#C7A2F7] opacity-40 mr-4 leading-none">2</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Specify quiz details</h2>
            <p className="text-base text-gray-800 max-w-xs">Tell our AI bot how many questions you need, the language you want your quiz to be in, and the type of questions you want included.</p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#C7A2F7] opacity-40 mr-4 leading-none">3</span>
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
          <div className="w-full border-2 border-dashed border-gray-300 rounded-xl py-6 flex items-center justify-center text-gray-400 hover:border-[#8B3FFC] transition">
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
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#8B3FFC] mb-2"
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
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:border-[#8B3FFC]"
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
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:border-[#8B3FFC]"
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
            <option>German</option>
          </select>
        </div>
      </div>
      {/* Bouton principal */}
      <button
        className="bg-[#DDBDFD] hover:bg-[#C7A2F7] text-white font-bold rounded-xl px-10 py-4 text-xl shadow transition mt-4"
        type="button"
      >
        Generate AI Quiz
      </button>
    </div>
  );
} 