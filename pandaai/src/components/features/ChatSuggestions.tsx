import React from 'react';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  isLoading?: boolean;
}

const suggestions = [
  {
    icon: "📚",
    title: "Plan d'étude personnalisé",
    description: "Créer un planning adapté à tes objectifs",
    message: "Peux-tu m'aider à créer un plan d'étude personnalisé pour mes examens ?"
  },
  {
    icon: "🧮",
    title: "Aide en mathématiques",
    description: "Expliquer des concepts difficiles",
    message: "J'ai du mal avec les dérivées en mathématiques, peux-tu m'expliquer ?"
  },
  {
    icon: "🧠",
    title: "Techniques de mémorisation",
    description: "Améliorer ta capacité de mémorisation",
    message: "Quelles sont les meilleures techniques pour mémoriser efficacement ?"
  },
  {
    icon: "📖",
    title: "Résumé de cours",
    description: "Synthétiser tes notes de cours",
    message: "Peux-tu m'aider à faire un résumé de mon cours d'histoire ?"
  },
  {
    icon: "🎯",
    title: "Préparation d'examen",
    description: "Se préparer efficacement aux examens",
    message: "Comment bien réviser pour un examen dans 2 semaines ?"
  },
  {
    icon: "⚡",
    title: "Gestion du stress",
    description: "Gérer l'anxiété avant les examens",
    message: "Je stresse beaucoup avant mes examens, comment faire ?"
  }
];

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({
  onSuggestionClick,
  isLoading = false
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🐼 Bienvenue chez Panda Coach !
        </h2>
        <p className="text-gray-600 text-lg">
          Choisis une suggestion ou pose ta question librement
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.message)}
            disabled={isLoading}
            className="group p-4 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {suggestion.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">💡</span>
          <h3 className="font-semibold text-gray-800">Conseils pour une meilleure expérience</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            <span>Sois précis dans tes questions pour des réponses plus pertinentes</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            <span>Tu peux uploader des documents pour que je puisse les analyser</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            <span>N&apos;hésite pas à demander des explications étape par étape</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            <span>Je peux t&apos;aider dans toutes les matières académiques</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 