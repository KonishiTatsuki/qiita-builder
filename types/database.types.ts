export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      club: {
        Row: {
          id: number;
          display: boolean;
          clubName: string;
        };
        Insert: {
          id: number;
          display: boolean;
          clubName: string;
        };
      };
      //   workouts: {
      //     Row: {
      //       id: number
      //       created_at: string | null
      //       date: string
      //       user_id: string
      //       repetitions: number
      //     }
      //     Insert: {
      //       id?: number
      //       created_at?: string | null
      //       date: string
      //       user_id: string
      //       repetitions?: number
      //     }
      //     Update: {
      //       id?: number
      //       created_at?: string | null
      //       date?: string
      //       user_id?: string
      //       repetitions?: number
      //     }
      //   }
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
