'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Désactiver le pré-rendu pour cette page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Récupérer les paramètres d'URL côté client uniquement
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionIdParam = urlParams.get('session_id');
      setSessionId(sessionIdParam);
    }
    
    // Simuler un délai de chargement
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#DDBDFD] mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Finalisation du paiement...</h2>
          <p className="text-gray-600">Veuillez patienter pendant que nous confirmons votre abonnement.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <Image src="/logo-pandaai.svg" alt="PandaAI" width={64} height={64} className="mx-auto mb-4" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Paiement réussi ! 🎉</h1>
        
        <p className="text-gray-600 mb-6">
          Félicitations ! Votre abonnement PandaAI Premium est maintenant actif. 
          Vous avez accès à toutes les fonctionnalités premium.
        </p>
        
        <div className="bg-[#F7F0FF] rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-[#DDBDFD] mb-2">Votre abonnement inclut :</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Toutes les fonctionnalités gratuites</li>
            <li>✓ Analytics avancées</li>
            <li>✓ Avatars pandas personnalisables</li>
            <li>✓ Feedback IA illimité</li>
            <li>✓ Mode examen</li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <Link 
            href="/quiz-generator"
            className="block w-full bg-[#DDBDFD] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-6 py-3 text-lg shadow-lg border-2 border-[#DDBDFD] transition cursor-pointer"
            style={{boxShadow: '0 4px 0 #B373E4'}}
          >
            Commencer à apprendre
          </Link>
          
          <Link 
            href="/dashboard"
            className="block w-full bg-white hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-[#DDBDFD] font-bold rounded-xl px-6 py-3 text-lg shadow-lg border-2 border-[#DDBDFD] transition cursor-pointer"
          >
            Aller au dashboard
          </Link>
        </div>
        
        {sessionId && (
          <p className="text-xs text-gray-500 mt-4">
            ID de session : {sessionId}
          </p>
        )}
      </div>
    </div>
  );
} 