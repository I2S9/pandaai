'use client';
import Image from 'next/image';
import { useState } from 'react';

const features = [
  {
    icon: '/logo-pandaai.svg',
    title: 'Panda Coach',
    desc: 'AI-powered study buddy',
  },
  {
    icon: '/space-repetition.png',
    title: 'Spaced Repetition',
    desc: 'Memorize smarter, not harder',
  },
  {
    icon: '/file.svg',
    title: 'Smart Notes',
    desc: 'Turn any content into bite-sized notes',
  },
  {
    icon: '/file.svg',
    title: 'Flashcards',
    desc: 'Active recall + Spaced repetition',
  },
  {
    icon: '/file.svg',
    title: 'Quiz Generator',
    desc: 'Auto-generate quizzes from your docs',
  },
  {
    icon: '/file.svg',
    title: 'Exam Mode',
    desc: 'Practice exams under timed conditions',
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-white/80 shadow-sm sticky top-0 z-30">
      <nav className="flex items-center gap-10 w-full max-w-6xl mx-auto">
        {/* Logo + titre */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Image src="/logo-pandaai.svg" alt="PandasAI Logo" width={44} height={44} />
          <span className="font-semibold text-xl md:text-2xl text-gray-900">PandasAi</span>
        </div>
        {/* Navbar links */}
        <div className="flex items-center gap-8 flex-1 justify-center">
          {/* Features dropdown */}
          <div className="relative">
            <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-1 text-lg font-semibold hover:text-primary focus:outline-none">
              Features
              <span className="inline-block align-middle">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8L10 12L14 8" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            {open && (
              <div className="absolute left-0 mt-4 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-neutral-light transition cursor-pointer">
                      <Image src={f.icon} alt={f.title} width={36} height={36} className="rounded-xl" />
                      <div>
                        <div className="font-semibold text-base text-gray-900">{f.title}</div>
                        <div className="text-sm text-gray-500">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 px-2 py-2 text-center text-sm text-gray-600 bg-gray-50 rounded-xl">
                  Got another feature in mind? <a href="#" className="text-primary underline">Let us know</a>
                </div>
              </div>
            )}
          </div>
          <a href="#tutoring" className="text-lg font-semibold hover:text-primary">Ai Tutoring</a>
          <a href="#pricing" className="text-lg font-semibold hover:text-primary">Pricing</a>
          <a href="#about" className="text-lg font-semibold hover:text-primary">About us</a>
        </div>
        {/* Auth Buttons */}
        <div className="flex gap-4">
          <button className="rounded-2xl px-6 py-2 text-lg font-semibold border border-gray-300 bg-white hover:bg-neutral-light transition">Login</button>
          <button className="rounded-2xl px-6 py-2 text-lg font-semibold bg-[#DDBDFD] hover:bg-[#B373E4] text-white shadow-md">Sign Up</button>
        </div>
      </nav>
    </header>
  );
} 