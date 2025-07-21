"use client";
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { diagnoseSupabase } from '../../../lib/diagnoseSupabase';

export default function DebugPage() {
  const { user } = useAuth();
  const [debugResult, setDebugResult] = useState<string>('');

  const runDebug = async () => {
    setDebugResult('Running diagnostic...\n');
    
    try {
      // Run comprehensive diagnostic
      await diagnoseSupabase();
      setDebugResult(prev => prev + '✅ Diagnostic completed. Check console for details.\n');
    } catch (error) {
      setDebugResult(prev => prev + `❌ Diagnostic error: ${error}\n`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🔧 Debug Supabase</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Configuration</h2>
          <div className="space-y-2">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Supabase Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>User:</strong> {user ? `✅ ${user.id}` : '❌ Not logged in'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Tests</h2>
          <button
            onClick={runDebug}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
          >
            Run Debug Tests
          </button>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold mb-2">Debug Output:</h3>
            <pre className="text-sm whitespace-pre-wrap">{debugResult || 'No debug output yet'}</pre>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Vérifiez que les variables d&apos;environnement sont définies</li>
            <li>Connectez-vous avec Clerk</li>
            <li>Cliquez sur &quot;Run Debug Tests&quot;</li>
            <li>Vérifiez les résultats dans la console et ci-dessus</li>
            <li>Si les tests échouent, exécutez le script SQL dans Supabase</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 