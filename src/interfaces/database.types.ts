export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          // the data expected from .select()
          id: number
          user_id: string,
          task: string,
          is_completed: boolean,
          created_at: Date,
        }
        Insert: {
            id?: number
            user_id: string,
            task: string,
            is_completed?: boolean,
            created_at?: Date,
        }
        Update: {
            id?: number
            user_id?: string
            task?: string
            is_completed?: boolean
            created_at?: string
        }
      }
    }
  }
}