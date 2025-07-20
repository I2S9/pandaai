"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function PomodoroPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [isBreak, setIsBreak] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const durations = [
    { value: 15, label: '15 min' },
    { value: 25, label: '25 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '60 min' }
  ];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsBreak(!isBreak);
            return isBreak ? selectedDuration * 60 : 5 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isBreak, selectedDuration]);

  const startSession = () => {
    setTimeLeft(selectedDuration * 60);
    setIsRunning(true);
    setIsBreak(false);
    setShowTimer(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const restartSession = () => {
    setTimeLeft(selectedDuration * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  const backToSelection = () => {
    setIsRunning(false);
    setShowTimer(false);
    setIsBreak(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  // Page de sélection de durée
  if (!showTimer) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pomodoro Timer</h1>
          <p className="text-lg text-gray-700">Choose your focus duration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Duration</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {durations.map((duration) => (
              <button
                key={duration.value}
                onClick={() => setSelectedDuration(duration.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-lg font-semibold ${
                  selectedDuration === duration.value
                    ? 'border-[#B7EABF] bg-[#F0F9F1] text-[#2D5A3D]'
                    : 'border-gray-200 hover:border-[#B7EABF] hover:bg-gray-50 text-gray-700'
                }`}
              >
                {duration.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={startSession}
            className="w-full bg-[#B7EABF] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-4 text-xl shadow-lg border-2 border-[#B7EABF] transition cursor-pointer"
            style={{boxShadow: '0 4px 0 #A3D9AC'}}
          >
            Start Session
          </button>
        </div>

        <button
          onClick={() => router.push('/space-repetition')}
          className="bg-[#B7EABF] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-20 py-4 text-xl shadow-lg border-2 border-[#B7EABF] transition cursor-pointer"
          style={{boxShadow: '0 4px 0 #A3D9AC'}}
        >
          ← Back to Spaced Repetition
        </button>
      </div>
    );
  }

  // Page du timer
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">Your pomodoro session</h1>
      
      {/* Timer Circle - Centré parfaitement */}
      <div className="flex items-center justify-center mb-8 mt-8">
        <div className="relative">
          <div className="w-96 h-96 relative">
            {/* Outer circle (background) */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#B7EABF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            
            {/* Timer display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-7xl font-bold text-[#B7EABF] mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-2xl font-semibold text-[#B7EABF]">
                {isBreak ? 'Break Time' : 'Focus Time'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons Container */}
      <div className="flex flex-col items-center gap-6">
        {/* Control Buttons */}
        <div className="flex gap-6">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="bg-[#B7EABF] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-12 py-4 text-xl shadow-lg border-2 border-[#B7EABF] transition cursor-pointer"
              style={{boxShadow: '0 4px 0 #A3D9AC'}}
            >
              Resume
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="bg-[#B7EABF] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-12 py-4 text-xl shadow-lg border-2 border-[#B7EABF] transition cursor-pointer"
              style={{boxShadow: '0 4px 0 #A3D9AC'}}
            >
              Pause
            </button>
          )}
          
          <button
            onClick={restartSession}
            className="bg-[#B7EABF] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-12 py-4 text-xl shadow-lg border-2 border-[#B7EABF] transition cursor-pointer"
            style={{boxShadow: '0 4px 0 #A3D9AC'}}
          >
            Restart
          </button>
        </div>

        {/* Back Button - Même largeur que les deux boutons + gap */}
        <button
          onClick={backToSelection}
          className="bg-[#B7EABF] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-4 text-xl shadow-lg border-2 border-[#B7EABF] transition cursor-pointer"
          style={{boxShadow: '0 4px 0 #A3D9AC', width: 'calc(2 * (140px + 1.5rem) + 1.5rem)'}}
        >
          ← Back to Selection
        </button>
      </div>
    </div>
  );
} 