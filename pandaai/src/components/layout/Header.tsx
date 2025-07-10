'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

const features = [
  {
    icon: '/logo-pandaai.svg',
    title: 'Panda Coach',
    desc: 'AI-powered study buddy',
  },
  {
    icon: '/space-repetition.svg',
    title: 'Spaced Repetition',
    desc: 'Memorize smarter, not harder',
  },
  {
    icon: '/smart-notes.svg',
    title: 'Smart Notes',
    desc: 'Turn any content into bite-sized notes',
  },
  {
    icon: '/flashcards.svg',
    title: 'Flashcards',
    desc: 'Active recall + Spaced repetition',
  },
  {
    icon: '/quiz-generator.svg',
    title: 'Quiz Generator',
    desc: 'Auto-generate quizzes from your docs',
  },
  {
    icon: '/exam-mode.svg',
    title: 'Exam Mode',
    desc: 'Practice exams under timed conditions',
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  let hoverTimeout: NodeJS.Timeout;

  return (
    <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-white/80 shadow-sm sticky top-0 z-50">
      <nav className="flex items-center gap-10 w-full max-w-6xl mx-auto">
        {/* Logo + titre */}
        <Link 
          href="/"
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <Image src="/logo-pandaai.svg" alt="PandasAI Logo" width={44} height={44} />
          <span className="font-semibold text-xl md:text-2xl text-gray-900">PandasAi</span>
        </Link>

        {/* Navbar links */}
        <div className="flex items-center gap-8 flex-1 justify-center">
          {/* Features dropdown */}
          <div className="relative"
            onMouseEnter={() => { clearTimeout(hoverTimeout); setOpen(true); }}
            onMouseLeave={() => { hoverTimeout = setTimeout(() => setOpen(false), 100); }}
          >
            <button
              className={`flex items-center gap-1 text-lg font-semibold px-3 py-2 rounded-xl transition
                ${open ? 'bg-gray-100 shadow-md' : 'hover:bg-gray-100 hover:shadow-md'}
              `}
            >
              Features
              <span className={`inline-block align-middle transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8L10 12L14 8" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            {open && (
              <div className="absolute left-0 mt-4 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    f.title === 'Quiz Generator' ? (
                      <Link href="/quiz-generator" key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-neutral-light transition cursor-pointer">
                        <div className={`flex-shrink-0 ${i === 1 ? 'mt-2' : 'mt-1'}`}>
                          <Image 
                            src={f.icon} 
                            alt={f.title} 
                            width={i === 0 ? 32 : 24} 
                            height={i === 0 ? 32 : 24} 
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">{f.title}</div>
                          <div className="text-sm text-gray-500">{f.desc}</div>
                        </div>
                      </Link>
                    ) : f.title === 'Panda Coach' ? (
                      <Link href="/panda-coach" key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-neutral-light transition cursor-pointer">
                        <div className={`flex-shrink-0 ${i === 1 ? 'mt-2' : 'mt-1'}`}>
                          <Image 
                            src={f.icon} 
                            alt={f.title} 
                            width={i === 0 ? 32 : 24} 
                            height={i === 0 ? 32 : 24} 
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">{f.title}</div>
                          <div className="text-sm text-gray-500">{f.desc}</div>
                        </div>
                      </Link>
                    ) : (
                      <div key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-neutral-light transition cursor-pointer">
                        <div className={`flex-shrink-0 ${i === 1 ? 'mt-2' : 'mt-1'}`}>
                          <Image 
                            src={f.icon} 
                            alt={f.title} 
                            width={i === 0 ? 32 : 24} 
                            height={i === 0 ? 32 : 24} 
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">{f.title}</div>
                          <div className="text-sm text-gray-500">{f.desc}</div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
                <div className="mt-3 px-2 py-2 text-center text-sm text-gray-600 bg-gray-50 rounded-xl">
                  Got another feature in mind? <a href="#" className="text-primary underline">Let us know</a>
                </div>
              </div>
            )}
          </div>
          <Link href="/ai-tutoring" className="text-lg font-semibold px-3 py-2 rounded-xl transition hover:bg-gray-100 hover:shadow-md">Ai Tutoring</Link>
          <Link href="/#pricing" className="text-lg font-semibold px-3 py-2 rounded-xl transition hover:bg-gray-100 hover:shadow-md">Pricing</Link>
          <Link href="/about" className="text-lg font-semibold px-3 py-2 rounded-xl transition hover:bg-gray-100 hover:shadow-md">About us</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="text-lg font-semibold px-3 py-2 rounded-xl transition hover:bg-gray-100 hover:shadow-md"
              >
                Dashboard
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full",
                    userButtonPopoverCard: "rounded-2xl shadow-xl border border-gray-200",
                    userButtonPopoverActionButton: "rounded-xl hover:bg-gray-100 transition"
                  }
                }}
              />
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="rounded-2xl px-6 py-2 text-lg font-semibold border border-gray-300 bg-white hover:bg-neutral-light transition">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-2xl px-6 py-2 text-lg font-semibold bg-[#DDBDFD] hover:bg-[#B373E4] text-white shadow-md">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
} 