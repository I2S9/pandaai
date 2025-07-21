// Service de stockage local temporaire pour contourner les problèmes Supabase

export interface LocalSession {
  id: string;
  userId: string;
  startTime: string;
  durationSeconds: number;
  createdAt: string;
}

export interface LocalFlashcard {
  id: string;
  userId: string;
  topic: string;
  question: string;
  answer: string;
  reviewCount: number;
  difficultyLevel: number;
  createdAt: string;
}

// Type for input flashcards
interface InputFlashcard {
  front: string;
  back: string;
}

// Gestion des sessions
export const saveSessionToLocalStorage = (userId: string, durationSeconds: number) => {
  try {
    const session: LocalSession = {
      id: `session_${Date.now()}`,
      userId,
      startTime: new Date().toISOString(),
      durationSeconds,
      createdAt: new Date().toISOString()
    };

    const existingSessions = getSessionsFromLocalStorage();
    existingSessions.push(session);
    
    localStorage.setItem('panda_sessions', JSON.stringify(existingSessions));
    console.log('💾 Session saved to localStorage:', session);
    
    return session;
  } catch (error) {
    console.error('❌ Error saving session to localStorage:', error);
    throw error;
  }
};

export const getSessionsFromLocalStorage = (): LocalSession[] => {
  try {
    const sessions = localStorage.getItem('panda_sessions');
    return sessions ? JSON.parse(sessions) : [];
  } catch (error) {
    console.error('❌ Error reading sessions from localStorage:', error);
    return [];
  }
};

export const getTodaySessionsFromLocalStorage = (userId: string): LocalSession[] => {
  try {
    const allSessions = getSessionsFromLocalStorage();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return allSessions.filter(session => 
      session.userId === userId && 
      new Date(session.startTime) >= today
    );
  } catch (error) {
    console.error('❌ Error getting today sessions from localStorage:', error);
    return [];
  }
};

export const calculateTotalTodayDurationFromLocalStorage = (userId: string): number => {
  try {
    const todaySessions = getTodaySessionsFromLocalStorage(userId);
    const totalSeconds = todaySessions.reduce((total, session) => total + session.durationSeconds, 0);
    console.log('📈 Total today duration from localStorage:', totalSeconds, 'seconds');
    return totalSeconds;
  } catch (error) {
    console.error('❌ Error calculating total duration from localStorage:', error);
    return 0;
  }
};

// Gestion des flashcards
export const saveFlashcardsToLocalStorage = (userId: string, topic: string, flashcards: InputFlashcard[]) => {
  try {
    const flashcardData: LocalFlashcard[] = flashcards.map((flashcard, index) => ({
      id: `flashcard_${Date.now()}_${index}`,
      userId,
      topic,
      question: flashcard.front,
      answer: flashcard.back,
      reviewCount: 0,
      difficultyLevel: 1,
      createdAt: new Date().toISOString()
    }));

    const existingFlashcards = getFlashcardsFromLocalStorage();
    existingFlashcards.push(...flashcardData);
    
    localStorage.setItem('panda_flashcards', JSON.stringify(existingFlashcards));
    console.log('💾 Flashcards saved to localStorage:', flashcardData.length, 'cards');
    
    return flashcardData;
  } catch (error) {
    console.error('❌ Error saving flashcards to localStorage:', error);
    throw error;
  }
};

export const getFlashcardsFromLocalStorage = (): LocalFlashcard[] => {
  try {
    const flashcards = localStorage.getItem('panda_flashcards');
    return flashcards ? JSON.parse(flashcards) : [];
  } catch (error) {
    console.error('❌ Error reading flashcards from localStorage:', error);
    return [];
  }
};

export const getUserFlashcardsFromLocalStorage = (userId: string): LocalFlashcard[] => {
  try {
    const allFlashcards = getFlashcardsFromLocalStorage();
    return allFlashcards.filter(flashcard => flashcard.userId === userId);
  } catch (error) {
    console.error('❌ Error getting user flashcards from localStorage:', error);
    return [];
  }
};

export const deleteFlashcardFromLocalStorage = (flashcardId: string) => {
  try {
    const allFlashcards = getFlashcardsFromLocalStorage();
    const filteredFlashcards = allFlashcards.filter(flashcard => flashcard.id !== flashcardId);
    localStorage.setItem('panda_flashcards', JSON.stringify(filteredFlashcards));
    console.log('🗑️ Flashcard deleted from localStorage:', flashcardId);
    return true;
  } catch (error) {
    console.error('❌ Error deleting flashcard from localStorage:', error);
    return false;
  }
};

// Utilitaires
export const clearAllLocalStorage = () => {
  try {
    localStorage.removeItem('panda_sessions');
    localStorage.removeItem('panda_flashcards');
    console.log('🧹 All localStorage data cleared');
  } catch (error) {
    console.error('❌ Error clearing localStorage:', error);
  }
};

export const getLocalStorageStats = () => {
  try {
    const sessions = getSessionsFromLocalStorage();
    const flashcards = getFlashcardsFromLocalStorage();
    
    return {
      sessionsCount: sessions.length,
      flashcardsCount: flashcards.length,
      localStorageSize: JSON.stringify({ sessions, flashcards }).length
    };
  } catch (error) {
    console.error('❌ Error getting localStorage stats:', error);
    return { sessionsCount: 0, flashcardsCount: 0, localStorageSize: 0 };
  }
}; 