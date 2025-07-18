"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SpaceRepetitionPage() {
  const router = useRouter();

  const handleTrackStatistics = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">Spaced repetition</h1>
      
      {/* Image */}
      <div className="mb-16">
        <Image 
          src="/spaced-repetition-section.png" 
          alt="Spaced repetition illustration" 
          width={400} 
          height={300}
          className="w-auto h-auto max-w-full"
        />
      </div>

      {/* Contenu */}
      <div className="w-full max-w-4xl space-y-12">
        {/* What Is Spaced Repetition? */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is spaced repetition?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Spaced Repetition is a scientifically-proven learning technique that delivers material at increasing intervals, just as you&apos;re about to forget it. Originally demonstrated by psychologist Hermann Ebbinghaus, this method effectively combats the &ldquo;forgetting curve&rdquo;.
          </p>
        </div>

        {/* Why It Works */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why it works</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            By spacing reviews, you strengthen memory traces through effortful recall and the &ldquo;testing effect&rdquo;. Studies show that distributed learning boosts long-term retention far beyond one-time &ldquo;cramming&rdquo;.
          </p>
        </div>

        {/* Benefits for Learners */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits for learners</h2>
          <ul className="text-lg text-gray-700 leading-relaxed space-y-2">
            <li><strong>Efficient Learning</strong> - You spend less time studying but retain more.</li>
            <li><strong>Durable Knowledge</strong> - Material sticks in your memory weeks or even months later.</li>
            <li><strong>Adaptivity at its Best</strong> - Difficult items appear more often; easy ones less so using algorithms like SM‑2 or FSRS.</li>
          </ul>
        </div>

        {/* How PandaAi Implements It */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How PandaAi implements it</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            On PandaAi, scheduled micro‑sessions and quizzes are driven by smart algorithms. You&apos;re prompted to review at exactly the right moment, maximizing learning while fitting into your day-to-day life.
          </p>
        </div>

        {/* Built for Language & Skill Mastery */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for language & skill mastery</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you&apos;re mastering vocabulary, formulas, or procedural knowledge, PandaAi&apos;s spaced repetition mirrors methods in top-tier apps like Anki or Memrise. It&apos;s also been used effectively in areas from language learning to even neurosurgical training.
          </p>
        </div>

        {/* Getting Started: Your Learning Journey */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting started: your learning journey</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            With PandaAi, you begin by reviewing material shortly after you first learn it, then again after a day, then several days later, and so on. This expanding interval system ensures you&apos;re practicing just as memory begins to fade.
          </p>
        </div>

        {/* Enhance Your PandaAi Experience */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Enhance your PandaAi experience</h2>
          <ul className="text-lg text-gray-700 leading-relaxed space-y-2">
            <li><strong>Use PandaAi flashcards daily</strong> - skip days and your due items pile up.</li>
            <li><strong>Break content into bite‑sized chunks</strong> - microlearning pairs perfectly with spaced repetition.</li>
            <li><strong>Combine active recall + spaced intervals</strong> - test yourself to reinforce memory powerfully.</li>
          </ul>
        </div>
      </div>

      {/* Bouton Track Statistics */}
      <div className="mt-16">
        <button
          onClick={handleTrackStatistics}
          className="bg-[#B7EABF] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-20 py-4 text-xl shadow-lg border-2 border-[#B7EABF] transition cursor-pointer"
          style={{boxShadow: '0 4px 0 #A3D9AC'}}
        >
          Track your statistics
        </button>
      </div>
    </div>
  );
} 