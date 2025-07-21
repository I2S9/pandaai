export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          stripe_customer_id?: string
          subscription_status?: 'active' | 'inactive' | 'cancelled'
          subscription_end_date?: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
          stripe_customer_id?: string
          subscription_status?: 'active' | 'inactive' | 'cancelled'
          subscription_end_date?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          stripe_customer_id?: string
          subscription_status?: 'active' | 'inactive' | 'cancelled'
          subscription_end_date?: string
        }
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string
          session_date: string
          duration_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_date: string
          duration_minutes: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_date?: string
          duration_minutes?: number
          created_at?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          user_id: string
          topic: string
          question: string
          answer: string
          created_at: string
          last_reviewed?: string
          review_count: number
          difficulty_level: number
        }
        Insert: {
          id?: string
          user_id: string
          topic: string
          question: string
          answer: string
          created_at?: string
          last_reviewed?: string
          review_count?: number
          difficulty_level?: number
        }
        Update: {
          id?: string
          user_id?: string
          topic?: string
          question?: string
          answer?: string
          created_at?: string
          last_reviewed?: string
          review_count?: number
          difficulty_level?: number
        }
      }
      user_scores: {
        Row: {
          id: string
          user_id: string
          quiz_type: string
          score: number
          total_questions: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quiz_type: string
          score: number
          total_questions: number
          completed_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quiz_type?: string
          score?: number
          total_questions?: number
          completed_at?: string
          created_at?: string
        }
      }
      pomodoro_sessions: {
        Row: {
          id: string
          user_id: string
          duration_minutes: number
          completed: boolean
          started_at: string
          completed_at?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          duration_minutes: number
          completed?: boolean
          started_at: string
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          duration_minutes?: number
          completed?: boolean
          started_at?: string
          completed_at?: string
          created_at?: string
        }
      }
    }
  }
} 