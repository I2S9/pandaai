"use client";
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { 
  saveSessionToLocalStorage, 
  calculateTotalTodayDurationFromLocalStorage,
  saveFlashcardsToLocalStorage,
  getUserFlashcardsFromLocalStorage,
  getLocalStorageStats,
  clearAllLocalStorage
} from '../../../lib/localStorageService';

interface LocalStorageStats {
  sessionsCount: number;
  flashcardsCount: number;
  localStorageSize: number;
}

export default function TestLocalPage() {
  const { user } = useAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [stats, setStats] = useState<LocalStorageStats | null>(null);

  const runTests = async () => {
    if (!user) {
      setTestResult('❌ Utilisateur non connecté');
      return;
    }

    setTestResult('🧪 Tests en cours...\n');
    
    try {
      // Test 1: Sauvegarder une session
      setTestResult(prev => prev + '1️⃣ Test sauvegarde session...\n');
      saveSessionToLocalStorage(user.id, 120); // 2 minutes
      setTestResult(prev => prev + '✅ Session sauvegardée\n');
      
      // Test 2: Calculer la durée totale
      setTestResult(prev => prev + '2️⃣ Test calcul durée...\n');
      const totalDuration = calculateTotalTodayDurationFromLocalStorage(user.id);
      setTestResult(prev => prev + `✅ Durée totale: ${totalDuration} secondes\n`);
      
      // Test 3: Sauvegarder des flashcards
      setTestResult(prev => prev + '3️⃣ Test sauvegarde flashcards...\n');
      const testFlashcards = [
        { front: 'Question 1', back: 'Réponse 1' },
        { front: 'Question 2', back: 'Réponse 2' }
      ];
      saveFlashcardsToLocalStorage(user.id, 'Test Topic', testFlashcards);
      setTestResult(prev => prev + '✅ Flashcards sauvegardées\n');
      
      // Test 4: Récupérer les flashcards
      setTestResult(prev => prev + '4️⃣ Test récupération flashcards...\n');
      const userFlashcards = getUserFlashcardsFromLocalStorage(user.id);
      setTestResult(prev => prev + `✅ ${userFlashcards.length} flashcards récupérées\n`);
      
      // Test 5: Statistiques
      setTestResult(prev => prev + '5️⃣ Test statistiques...\n');
      const localStorageStats = getLocalStorageStats();
      setStats(localStorageStats);
      setTestResult(prev => prev + '✅ Statistiques récupérées\n');
      
      setTestResult(prev => prev + '\n🎉 TOUS LES TESTS RÉUSSIS !\n');
      
    } catch (error) {
      setTestResult(prev => prev + `❌ Erreur: ${error}\n`);
    }
  };

  const clearData = () => {
    clearAllLocalStorage();
    setStats(null);
    setTestResult('🧹 Données effacées\n');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🧪 Test Stockage Local</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Configuration</h2>
          <div className="space-y-2">
            <p><strong>Utilisateur:</strong> {user ? `✅ ${user.id}` : '❌ Non connecté'}</p>
            <p><strong>Email:</strong> {user?.email || 'Non disponible'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Tests</h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={runTests}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Lancer les Tests
            </button>
            <button
              onClick={clearData}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Effacer les Données
            </button>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold mb-2">Résultats des Tests:</h3>
            <pre className="text-sm whitespace-pre-wrap">{testResult || 'Aucun test exécuté'}</pre>
          </div>
        </div>

        {stats && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Statistiques localStorage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800">Sessions</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.sessionsCount}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-bold text-green-800">Flashcards</h3>
                <p className="text-2xl font-bold text-green-600">{stats.flashcardsCount}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800">Taille (bytes)</h3>
                <p className="text-2xl font-bold text-purple-600">{stats.localStorageSize}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 shadow-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Connectez-vous avec Clerk</li>
            <li>Cliquez sur &quot;Lancer les Tests&quot;</li>
            <li>Vérifiez que tous les tests passent</li>
            <li>Si les tests passent, le stockage local fonctionne</li>
            <li>Vous pouvez maintenant tester le dashboard et les flashcards</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 