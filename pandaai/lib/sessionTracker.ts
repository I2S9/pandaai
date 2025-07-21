import { logUserSession, getUserSessions } from './supabase';

// Type for user session data
interface UserSession {
  id: string;
  user_id: string;
  session_date: string;
  duration_minutes: number;
  created_at: string;
}

class SessionTracker {
  private startTime: number = 0;
  private isTracking: boolean = false;
  private userId: string | null = null;
  private intervalId: NodeJS.Timeout | null = null;

  // Getter for userId to allow external access
  getUserId(): string | null {
    return this.userId;
  }

  startSession(userId: string) {
    this.userId = userId;
    this.startTime = Date.now();
    this.isTracking = true;
    
    // Log session start
    console.log('Session started for user:', userId);
    
    // Set up periodic session logging (every 5 minutes)
    this.intervalId = setInterval(() => {
      this.logCurrentSession();
    }, 5 * 60 * 1000); // 5 minutes
  }

  stopSession() {
    if (!this.isTracking) return;

    this.isTracking = false;
    this.logCurrentSession();
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    console.log('Session stopped for user:', this.userId);
  }

  private async logCurrentSession() {
    if (!this.userId || !this.isTracking) return;

    const currentTime = Date.now();
    const durationMinutes = Math.floor((currentTime - this.startTime) / (1000 * 60));
    
    if (durationMinutes > 0) {
      try {
        await logUserSession(this.userId, durationMinutes);
        console.log(`Logged ${durationMinutes} minutes for user:`, this.userId);
        
        // Reset start time for next interval
        this.startTime = currentTime;
      } catch (error) {
        console.error('Error logging session:', error);
      }
    }
  }

  getCurrentSessionDuration(): number {
    if (!this.isTracking) return 0;
    return Math.floor((Date.now() - this.startTime) / (1000 * 60));
  }

  isSessionActive(): boolean {
    return this.isTracking;
  }
}

// Global session tracker instance
export const sessionTracker = new SessionTracker();

// Hook for tracking session time
export const useSessionTracking = (userId: string | null) => {
  const startTracking = () => {
    if (userId && !sessionTracker.isSessionActive()) {
      sessionTracker.startSession(userId);
    }
  };

  const stopTracking = () => {
    if (sessionTracker.isSessionActive()) {
      sessionTracker.stopSession();
    }
  };

  const getCurrentDuration = () => {
    return sessionTracker.getCurrentSessionDuration();
  };

  return {
    startTracking,
    stopTracking,
    getCurrentDuration,
    isActive: sessionTracker.isSessionActive()
  };
};

// Utility function to get session data for dashboard
export const getSessionDataForDashboard = async (userId: string, days: number = 7) => {
  try {
    const sessions = await getUserSessions(userId, days);
    
    // Group by date and calculate total minutes per day
    const dailyData: { [key: string]: number } = {};
    
    sessions.forEach((session: UserSession) => {
      const date = session.session_date;
      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      dailyData[date] += session.duration_minutes;
    });

    // Convert to array format for charts
    const chartData = Object.entries(dailyData).map(([date, minutes]) => ({
      date,
      minutes,
      hours: Math.round((minutes / 60) * 10) / 10 // Round to 1 decimal
    }));

    return chartData;
  } catch (error) {
    console.error('Error getting session data:', error);
    return [];
  }
};

// Auto-start tracking when page loads
if (typeof window !== 'undefined') {
  // Start tracking when page becomes visible
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && sessionTracker.isSessionActive()) {
      // Resume tracking
      const userId = sessionTracker.getUserId();
      if (userId) {
        sessionTracker.startSession(userId);
      }
    } else if (document.visibilityState === 'hidden' && sessionTracker.isSessionActive()) {
      // Pause tracking
      sessionTracker.stopSession();
    }
  });

  // Stop tracking when page unloads
  window.addEventListener('beforeunload', () => {
    if (sessionTracker.isSessionActive()) {
      sessionTracker.stopSession();
    }
  });
} 