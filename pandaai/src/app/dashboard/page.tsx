'use client';

import { useState } from 'react';
import Footer from '../../components/layout/Footer';

export default function DashboardPage() {
  const [tab, setTab] = useState<'stats' | 'profile'>('stats');
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white flex flex-col items-center justify-start pt-16 pb-16">
        {/* Boutons onglets */}
        <div className="flex gap-8 mb-16">
          <button
            className={`w-48 px-0 py-3 rounded-full text-lg font-bold border-2 cursor-pointer ${tab === 'stats' ? 'bg-black text-white border-black' : 'bg-white text-black border-black'}`}
            onClick={() => setTab('stats')}
          >
            Your statistics
          </button>
          <button
            className={`w-48 px-0 py-3 rounded-full text-lg font-bold border-2 cursor-pointer ${tab === 'profile' ? 'bg-black text-white border-black' : 'bg-white text-black border-black'}`}
            onClick={() => setTab('profile')}
          >
            Your profile
          </button>
        </div>
        {/* Contenu selon l'onglet */}
        <div className="w-full max-w-3xl">
          {tab === 'stats' ? (
            <div className="text-center text-3xl font-semibold text-gray-800 py-24">Your statistics section (à compléter)</div>
          ) : (
            <div className="text-center text-3xl font-semibold text-gray-800 py-24">Your profile section (à compléter)</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 