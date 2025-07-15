'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CancelPage() {
  return (
    <div className="h-screen w-full bg-[#F7FAFC] flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center justify-center mx-4" style={{minHeight: '380px'}}>
        <div className="mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <Image src="/logo-pandaai.svg" alt="PandaAI" width={64} height={64} className="mx-auto mb-4" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No amount has been charged.<br/>
          You can still enjoy PandaAI with the free plan!
        </p>
        <div className="bg-[#F7F0FF] rounded-xl p-4 mb-6 w-full max-w-lg mx-auto">
          <h3 className="font-bold text-black mb-2">Free plan includes:</h3>
          <ul className="text-sm text-gray-700 flex flex-wrap justify-center gap-x-6 gap-y-1">
            <li>✓ Unlimited flashcards</li>
            <li>✓ Basic spaced repetition</li>
            <li>✓ Quiz generator</li>
            <li>✓ AI feedback (limited)</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto mb-4">
          <Link 
            href="/"
            className="flex-1 bg-[#DDBDFD] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-6 py-3 text-lg shadow-lg border-2 border-[#DDBDFD] transition cursor-pointer"
            style={{boxShadow: '0 4px 0 #B373E4'}}
          >
            Back to home
          </Link>
          <Link 
            href="/quiz-generator"
            className="flex-1 bg-white hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-[#DDBDFD] font-bold rounded-xl px-6 py-3 text-lg shadow-lg border-2 border-[#DDBDFD] transition cursor-pointer"
            style={{boxShadow: '0 4px 0 #DDBDFD'}}
          >
            Try for free
          </Link>
        </div>
        <p className="text-xs text-gray-500">
          You can retry premium anytime from the home page.
        </p>
      </div>
    </div>
  );
} 