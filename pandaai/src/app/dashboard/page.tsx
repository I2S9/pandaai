import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            🐼 Bienvenue dans votre Forêt Pandatique !
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre espace d&apos;apprentissage personnel avec l&apos;IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Panda Coach */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-pandaai.svg" alt="Panda Coach" className="w-8 h-8" />
              <h3 className="text-xl font-bold text-gray-900">Panda Coach</h3>
            </div>
            <p className="text-gray-600 mb-4">Votre assistant IA personnel pour l&apos;apprentissage</p>
            <button className="w-full bg-[#DDBDFD] hover:bg-[#B373E4] text-white font-semibold py-3 px-4 rounded-2xl transition">
              Commencer une session
            </button>
          </div>

          {/* Flashcards */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <img src="/flashcards.svg" alt="Flashcards" className="w-8 h-8" />
              <h3 className="text-xl font-bold text-gray-900">Flashcards</h3>
            </div>
            <p className="text-gray-600 mb-4">Répétition espacée pour une mémorisation optimale</p>
            <button className="w-full bg-[#DDBDFD] hover:bg-[#B373E4] text-white font-semibold py-3 px-4 rounded-2xl transition">
              Créer des flashcards
            </button>
          </div>

          {/* Quiz Generator */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <img src="/quiz-generator.svg" alt="Quiz Generator" className="w-8 h-8" />
              <h3 className="text-xl font-bold text-gray-900">Quiz Generator</h3>
            </div>
            <p className="text-gray-600 mb-4">Générez des quiz automatiquement depuis vos documents</p>
            <button className="w-full bg-[#DDBDFD] hover:bg-[#B373E4] text-white font-semibold py-3 px-4 rounded-2xl transition">
              Générer un quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 