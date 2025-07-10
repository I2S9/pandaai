'use client';

import { useState } from 'react';
import Footer from '../../components/layout/Footer';
import React from 'react';

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
            <>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="flex flex-row gap-6 mb-8">
                  {/* Enrolled Course */}
                  <div className="flex items-center bg-[#FFF7D1] rounded-xl px-8 py-6 w-[280px] h-[110px]">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white mr-5">
                      <img src="/enrolled-course.svg" alt="Enrolled Course" className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-2xl font-bold text-gray-800">0</span>
                      <span className="text-base text-gray-600">Enrolled Course</span>
                    </div>
                  </div>
                  {/* Lesson */}
                  <div className="flex items-center bg-[#E8F1EC] rounded-xl px-8 py-6 w-[280px] h-[110px]">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white mr-5">
                      <img src="/lesson.svg" alt="Lesson" className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-2xl font-bold text-gray-800">0</span>
                      <span className="text-base text-gray-600">Lesson</span>
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="flex items-center bg-[#DDE7F8] rounded-xl px-8 py-6 w-[280px] h-[110px]">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white mr-5">
                      <img src="/badge.svg" alt="Badge" className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-2xl font-bold text-gray-800">0</span>
                      <span className="text-base text-gray-600">Badge</span>
                    </div>
                  </div>
                  {/* Streak */}
                  <div className="flex items-center bg-[#FDE7F3] rounded-xl px-8 py-6 w-[280px] h-[110px]">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white mr-5">
                      <img src="/streak.svg" alt="Streak" className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-2xl font-bold text-gray-800">0</span>
                      <span className="text-base text-gray-600">Streak</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Graphiques côte à côte, très grands, centrés et alignés */}
              <div className="flex flex-row gap-12 w-full justify-center items-end md:items-start">
                <div className="flex-1 flex justify-end max-w-[900px] min-h-[520px]">
                  <ProgressionCard pbAlign />
                </div>
                <div className="flex-1 flex justify-start max-w-[900px] min-h-[520px]">
                  <ActivityCard pbAlign />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-3xl font-semibold text-gray-800 py-24">Your profile section (à compléter)</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProgressionCard({ pbAlign = false }) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (
    <div className={`bg-white rounded-2xl p-12 w-full h-full min-h-[480px] flex flex-col justify-between ${pbAlign ? 'pb-24' : ''}`}>
      <div className="flex items-center justify-between mb-2 min-h-[32px]">
        <div className="text-2xl font-bold text-gray-900">Progression</div>
      </div>
      {/* Courbe vide pour l'instant */}
      <div className="flex-1 flex items-center justify-center">
        {/* (No data yet) supprimé */}
      </div>
      {/* Axe des mois descendu */}
      <div className="flex flex-row justify-between w-full gap-4 mt-89">
        {months.map((m) => (
          <span key={m} className="text-sm text-gray-500 w-16 text-center font-medium">{m}</span>
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ pbAlign = false }) {
  const [mode, setMode] = useState<'Weekly' | 'Daily' | 'Monthly'>('Weekly');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  // Données fictives (0 partout)
  const data = [0, 0, 0, 0, 0, 0, 0];
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const average = 0;
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const MODES = ['Weekly', 'Daily', 'Monthly'];

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={`bg-white rounded-2xl p-12 w-full h-full min-h-[480px] flex flex-col justify-between ${pbAlign ? 'pb-24' : ''}`}>
      <div className="flex items-center justify-between mb-2 min-h-[32px]">
        <div className="text-2xl font-bold text-gray-900">Activity</div>
        {/* Dropdown custom moderne */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition min-w-[110px] justify-between"
            onClick={() => setOpen((v) => !v)}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            {mode}
            <svg className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {open && (
            <ul className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20" role="listbox">
              {MODES.map((m) => (
                <li
                  key={m}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition ${mode === m ? 'font-bold text-black' : 'text-gray-700'}`}
                  onClick={() => { setMode(m as 'Weekly' | 'Daily' | 'Monthly'); setOpen(false); }}
                  role="option"
                  aria-selected={mode === m}
                >
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-4">{average} H</div>
      {/* Histogramme */}
      <div className="flex items-end justify-between h-80 w-full gap-4 relative">
        {data.map((v, i) => (
          <div key={i} className="flex flex-col items-center w-16">
            {/* Tooltip */}
            {selected === i && (
              <div className="mb-2 px-3 py-1 bg-white rounded-xl text-xs font-semibold text-gray-700 shadow border border-gray-100 z-10">
                {v} hours
              </div>
            )}
            {/* Barre */}
            <div
              className={`w-12 rounded-t-xl cursor-pointer transition-all duration-150 ${selected === i ? 'bg-violet-300 bg-[repeating-linear-gradient(135deg,_#D6B4FA_0px,_#D6B4FA_6px,_#C7A2F7_6px,_#C7A2F7_12px)]' : 'bg-violet-200'}`}
              style={{ height: `${60 + v * 4.5}px` }}
              onMouseEnter={() => setSelected(i)}
              onMouseLeave={() => setSelected(null)}
              onClick={() => setSelected(i)}
            />
            <div className="text-sm text-gray-500 mt-2 w-16 text-center font-medium">{days[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 