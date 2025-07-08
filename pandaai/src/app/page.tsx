'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    color: 'bg-[#DDFDEB]',
    icon: (
      <div className="w-16 h-16 bg-[#B9FBC0] rounded-2xl flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#B9FBC0"/><path d="M10 14c0 2 2 4 6 4s6-2 6-4" stroke="#3A7D44" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="2" fill="#3A7D44"/><circle cx="20" cy="12" r="2" fill="#3A7D44"/></svg>
      </div>
    ),
    text: 'A truly unique, useful and highly functional website that has helped all students in my school.',
    author: 'Mr. C. Dalton',
    role: 'Teacher',
    rotate: '-rotate-3',
  },
  {
    color: 'bg-[#FDEBFF]',
    icon: (
      <div className="w-16 h-16 bg-[#E9D8FD] rounded-2xl flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#E9D8FD"/><rect x="10" y="10" width="12" height="12" rx="6" fill="#B794F6"/></svg>
      </div>
    ),
    text: 'PandaAI made studying fun and effective. I love the flashcards and the panda avatars!',
    author: 'Lina S.',
    role: 'Student',
    rotate: 'rotate-2',
  },
  {
    color: 'bg-[#E0F2FE]',
    icon: (
      <div className="w-16 h-16 bg-[#B6E0FE] rounded-2xl flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#B6E0FE"/><rect x="14" y="8" width="4" height="16" rx="2" fill="#3182CE"/></svg>
      </div>
    ),
    text: 'The spaced repetition algorithm is a game changer. My grades improved a lot!',
    author: 'Alex P.',
    role: 'High School Student',
    rotate: 'rotate-1',
  },
  {
    color: 'bg-[#FFF9DB]',
    icon: (
      <div className="w-16 h-16 bg-[#FDE68A] rounded-2xl flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#FDE68A"/><rect x="12" y="12" width="8" height="8" rx="4" fill="#B7791F"/></svg>
      </div>
    ),
    text: 'I really enjoy this website! It helps a lot with all the IB stuff you need to manage! I dont know what I would do without it!',
    author: 'Marat',
    role: 'IBDP 2 Student',
    rotate: '-rotate-2',
  },
  {
    color: 'bg-[#E0E7FF]',
    icon: (
      <div className="w-16 h-16 bg-[#A7BFFF] rounded-2xl flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#A7BFFF"/><rect x="10" y="10" width="12" height="12" rx="6" fill="#3730A3"/></svg>
      </div>
    ),
    text: 'The best platform for exam prep. The analytics and exam mode are so useful!',
    author: 'Sophie L.',
    role: 'University Student',
    rotate: 'rotate-3',
  },
];

const faqs = [
  {
    q: 'What is PandaAI?',
    a: 'PandaAI is an AI-powered platform to help you learn smarter with flashcards, quizzes, and personalized study plans.'
  },
  {
    q: 'How does the spaced repetition work?',
    a: 'PandaAI schedules your reviews just before you forget, maximizing long-term retention.'
  },
  {
    q: 'Can I import my own documents?',
    a: 'Yes! You can import PDFs, Word docs, and more to auto-generate flashcards and quizzes.'
  },
  {
    q: 'Is PandaAI free?',
    a: 'PandaAI offers a free plan with core features. Premium unlocks advanced analytics, avatars, and more.'
  },
  {
    q: 'Is my data safe?',
    a: 'Absolutely. Your data is encrypted and never shared with third parties.'
  },
  {
    q: 'How do I get support?',
    a: 'You can contact our team anytime via the in-app chat or email support@pandaai.com.'
  },
];

function Carousel() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIdx(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="w-full flex flex-col items-center my-24">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Loved by 2300+ students worldwide</h2>
      <div className="relative w-full flex justify-center items-center min-h-[480px]">
        <div className="absolute left-1/2 -translate-x-[calc(50%+380px)] top-1/2 -translate-y-1/2 z-10">
          <button aria-label="prev" onClick={() => { setDirection(-1); setIdx(i => (i - 1 + testimonials.length) % testimonials.length); }} className="bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-50"><span className="text-2xl">&#8592;</span></button>
        </div>
        <div className="overflow-hidden w-full max-w-3xl flex items-center justify-center">
          <div className="relative w-full h-[440px] flex items-center justify-center">
            {testimonials.map((t, i) => (
              <div key={i} className={`absolute left-0 right-0 mx-auto p-12 rounded-3xl shadow-lg flex flex-col items-center min-w-[420px] max-w-2xl transition-all duration-500 ${i === idx ? 'scale-100 opacity-100 z-20 ' + t.color + ' ' + t.rotate : 'scale-95 opacity-0 z-10 pointer-events-none'} ${direction === 1 && i === idx ? 'animate-slide-in-right' : ''} ${direction === -1 && i === idx ? 'animate-slide-in-left' : ''}`} style={{top: 0, bottom: 0, margin: 'auto'}}>
                <div className="mb-6 flex items-center justify-center w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-6">{t.text}</div>
                <div className="text-lg font-semibold text-gray-800 text-center">{t.author} <span className="text-gray-500 font-normal">- {t.role}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-1/2 translate-x-[calc(50%+380px)] top-1/2 -translate-y-1/2 z-10">
          <button aria-label="next" onClick={() => { setDirection(1); setIdx(i => (i + 1) % testimonials.length); }} className="bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-50"><span className="text-2xl">&#8594;</span></button>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        {testimonials.map((_, i) => (
          <span key={i} className={`w-3 h-3 rounded-full ${i === idx ? 'bg-[#DDBDFD]' : 'bg-gray-300'}`}></span>
        ))}
      </div>
    </div>
  );
}

function Pricing() {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  return (
    <section className="w-full flex flex-col items-center my-24">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Pricing</h2>
      <div className="flex gap-4 mb-8 bg-white rounded-2xl p-2 shadow border border-[#DDBDFD]">
        <button onClick={() => setPlan('monthly')} className={`px-6 py-2 rounded-xl font-semibold text-lg transition ${plan === 'monthly' ? 'bg-[#DDBDFD] text-white shadow' : 'text-black hover:bg-[#F7F0FF]'}`}>Monthly</button>
        <button onClick={() => setPlan('yearly')} className={`px-6 py-2 rounded-xl font-semibold text-lg transition ${plan === 'yearly' ? 'bg-[#DDBDFD] text-white shadow' : 'text-black hover:bg-[#F7F0FF]'}`}>Yearly <span className="text-xs font-bold">(20% off)</span></button>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        <div className="flex-1 bg-white rounded-2xl shadow p-8 flex flex-col items-center border-2 border-[#DDBDFD] h-[520px]">
          <div className="text-2xl font-bold mb-2 text-center">Free Plan</div>
          <div className="text-4xl font-extrabold mb-4 text-center">0€</div>
          <ul className="text-lg text-gray-700 mb-6 list-disc list-inside flex-1 flex flex-col justify-center items-center text-center">
            <li className="mb-2">Unlimited flashcards</li>
            <li className="mb-2">Basic spaced repetition</li>
            <li className="mb-2">Quiz generator</li>
            <li className="mb-2">AI feedback (limited)</li>
          </ul>
          <button className="bg-[#DDBDFD] hover:bg-[#B373E4] text-white font-bold rounded-xl px-8 py-3 text-lg shadow border-2 border-[#DDBDFD] transition w-full max-w-[200px]">Get started</button>
        </div>
        <div className="flex-1 bg-[#DDBDFD] rounded-2xl shadow p-8 flex flex-col items-center border-4 border-[#DDBDFD] scale-105 h-[520px]">
          <div className="text-2xl font-bold mb-2 text-white text-center">Premium Plan</div>
          <div className="text-4xl font-extrabold mb-2 text-white text-center">{plan === 'monthly' ? '7€/mo' : '67€/year'}</div>
          {plan === 'yearly' && <div className="text-white text-base mb-2 line-through text-center">84€/year</div>}
          <ul className="text-lg text-white mb-6 list-disc list-inside flex-1 flex flex-col justify-center items-center text-center">
            <li className="mb-2">All Free features</li>
            <li className="mb-2">Advanced analytics</li>
            <li className="mb-2">Custom panda avatars</li>
            <li className="mb-2">Unlimited AI feedback</li>
            <li className="mb-2">Exam mode</li>
          </ul>
          <button className="bg-white hover:bg-[#F7F0FF] text-black font-bold rounded-xl px-8 py-3 text-lg shadow border-2 border-white transition w-full max-w-[200px]">Go Premium</button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(-1);
  return (
    <section className="w-full flex flex-col items-center my-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">FAQs</h2>
      <div className="w-full max-w-3xl bg-gray-100 rounded-2xl shadow p-4 md:p-8">
        {faqs.map((f, i) => (
          <div key={i} className="border-b last:border-b-0 border-gray-200">
            <button className="w-full flex justify-between items-center py-5 text-lg font-semibold focus:outline-none group" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <span className={`transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 10l4 4 4-4" stroke="#B373E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
              {open === i && <div className="text-gray-700 text-base">{f.a}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center mt-48 mb-12 px-4 relative min-h-[420px]">
        <div className="flex flex-row items-center justify-center w-full max-w-7xl relative">
          {/* Panda à gauche */}
          <div className="hidden md:flex flex-col items-center justify-center mr-2">
            <Image src="/panda-bambou.svg" alt="Panda bambou" width={380} height={380} className="object-contain" />
          </div>
          <div className="flex flex-col items-center justify-center flex-1 z-10">
            <div className="inline-block text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-center leading-[1.08] mb-0 tracking-tight" style={{fontWeight: 700, lineHeight: 1.08}}>
                <span className="block">Learn Smart,</span>
                <span className="block whitespace-nowrap">Remember Forever</span>
              </h1>
              <div className="h-2 bg-[#DDBDFD] rounded-none mb-4 mt-2 w-full" />
            </div>
            <p className="text-center text-gray-700 max-w-2xl mb-6 text-xl md:text-2xl font-medium">Turn any content into smart flashcards, get instant AI feedback, and study the Panda way—stress-free and memorable.</p>
            <button className="bg-[#DDBDFD] hover:bg-[#B373E4] active:scale-95 text-white font-bold rounded-[2.5rem] px-10 py-4 text-2xl shadow-lg border-2 border-[#DDBDFD] transition mb-2" style={{boxShadow: '0 8px 0 #B373E4'}}>Start learning</button>
          </div>
          {/* Bambou à droite */}
          <div className="hidden md:flex flex-col items-center justify-center ml-2">
            <Image src="/bambou.svg" alt="Bambou" width={360} height={360} className="object-contain" />
          </div>
        </div>
      </section>
      {/* Forgetting Curve Banner */}
      <section className="w-full flex flex-col items-center justify-center mb-48 px-0 mt-64">
        <div className="w-full bg-[#DDBDFD] flex flex-col items-center justify-center py-24 md:py-32">
          <h2 className="text-5xl md:text-7xl font-bold text-center text-black mb-2 leading-tight">Beat The Forgetting Curve,<br className="hidden md:block" />Once And For All.</h2>
          <div className="w-2/3 md:w-[600px] h-2 bg-white rounded-full mt-4" />
        </div>
      </section>
      {/* Spaced Repetition Section */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-10 px-4 mb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          <div className="flex-shrink-0">
            <Image src="/space-repetition.png" alt="Spaced Repetition Graph" width={340} height={220} className="rounded-2xl" />
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <h3 className="font-semibold text-3xl mb-2 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#DDBDFD]/40 mr-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#DDBDFD"/><rect x="13" y="8" width="6" height="16" rx="3" fill="#fff"/></svg>
              </span>
              Spaced Repetition Algorithm
            </h3>
            <p className="text-lg text-gray-700">An adaptive algorithm that automatically schedules review sessions just before forgetfulness sets in, for each user</p>
          </div>
        </div>
      </section>
      {/* Carousel Section */}
      <Carousel />
      {/* FAQ Section */}
      <FAQ />
      {/* Pricing Section */}
      <Pricing />
      {/* Footer Section */}
      <footer className="w-full bg-[#DDBDFD] py-12 flex flex-col items-center justify-center mt-20">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <Image src="/logo-pandaai.svg" alt="PandaAI Logo" width={48} height={48} />
          <span className="text-2xl font-bold text-white">PandaAI</span>
        </div>
        <div className="text-white text-lg mb-2">© {new Date().getFullYear()} PandaAI. All rights reserved.</div>
        <div className="text-white text-base">Made with love for students worldwide · <a href="mailto:support@pandaai.com" className="underline">Contact us</a></div>
      </footer>
    </div>
  );
}
