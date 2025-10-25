export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          context_data: Json | null
          conversation_type: string | null
          created_at: string | null
          id: string
          messages: Json | null
          user_id: string
        }
        Insert: {
          context_data?: Json | null
          conversation_type?: string | null
          created_at?: string | null
          id?: string
          messages?: Json | null
          user_id: string
        }
        Update: {
          context_data?: Json | null
          conversation_type?: string | null
          created_at?: string | null
          id?: string
          messages?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      avatar_progress: {
        Row: {
          ar_model_data: Json | null
          body_fat_percentage: number | null
          body_measurements: Json | null
          created_at: string | null
          id: string
          measurement_date: string | null
          muscle_development_scores: Json | null
          photos: Json | null
          user_id: string
        }
        Insert: {
          ar_model_data?: Json | null
          body_fat_percentage?: number | null
          body_measurements?: Json | null
          created_at?: string | null
          id?: string
          measurement_date?: string | null
          muscle_development_scores?: Json | null
          photos?: Json | null
          user_id: string
        }
        Update: {
          ar_model_data?: Json | null
          body_fat_percentage?: number | null
          body_measurements?: Json | null
          created_at?: string | null
          id?: string
          measurement_date?: string | null
          muscle_development_scores?: Json | null
          photos?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "avatar_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_participants: {
        Row: {
          challenge_id: string
          completed: boolean | null
          current_progress: number | null
          id: string
          joined_at: string | null
          rank: number | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed?: boolean | null
          current_progress?: number | null
          id?: string
          joined_at?: string | null
          rank?: number | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed?: boolean | null
          current_progress?: number | null
          id?: string
          joined_at?: string | null
          rank?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          ai_generated: boolean | null
          challenge_name: string
          challenge_type: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: string | null
          end_date: string | null
          id: string
          start_date: string | null
          target_metric: string | null
          target_value: number | null
        }
        Insert: {
          ai_generated?: boolean | null
          challenge_name: string
          challenge_type?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          target_metric?: string | null
          target_value?: number | null
        }
        Update: {
          ai_generated?: boolean | null
          challenge_name?: string
          challenge_type?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          target_metric?: string | null
          target_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          equipment_needed: string[] | null
          form_tips: string[] | null
          id: string
          muscle_groups: string[] | null
          name: string
          video_url: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          equipment_needed?: string[] | null
          form_tips?: string[] | null
          id?: string
          muscle_groups?: string[] | null
          name: string
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          equipment_needed?: string[] | null
          form_tips?: string[] | null
          id?: string
          muscle_groups?: string[] | null
          name?: string
          video_url?: string | null
        }
        Relationships: []
      }
      gym_equipment: {
        Row: {
          alternative_exercises: string[] | null
          created_at: string | null
          equipment_name: string
          equipment_type: string | null
          id: string
          image_url: string | null
          muscle_groups: string[] | null
          usage_instructions: string | null
        }
        Insert: {
          alternative_exercises?: string[] | null
          created_at?: string | null
          equipment_name: string
          equipment_type?: string | null
          id?: string
          image_url?: string | null
          muscle_groups?: string[] | null
          usage_instructions?: string | null
        }
        Update: {
          alternative_exercises?: string[] | null
          created_at?: string | null
          equipment_name?: string
          equipment_type?: string | null
          id?: string
          image_url?: string | null
          muscle_groups?: string[] | null
          usage_instructions?: string | null
        }
        Relationships: []
      }
      health_metrics: {
        Row: {
          body_weight: number | null
          created_at: string | null
          date: string
          hrv_score: number | null
          id: string
          notes: string | null
          recovery_score: number | null
          resting_heart_rate: number | null
          sleep_hours: number | null
          sleep_quality: number | null
          soreness_level: number | null
          stress_level: number | null
          user_id: string
        }
        Insert: {
          body_weight?: number | null
          created_at?: string | null
          date?: string
          hrv_score?: number | null
          id?: string
          notes?: string | null
          recovery_score?: number | null
          resting_heart_rate?: number | null
          sleep_hours?: number | null
          sleep_quality?: number | null
          soreness_level?: number | null
          stress_level?: number | null
          user_id: string
        }
        Update: {
          body_weight?: number | null
          created_at?: string | null
          date?: string
          hrv_score?: number | null
          id?: string
          notes?: string | null
          recovery_score?: number | null
          resting_heart_rate?: number | null
          sleep_hours?: number | null
          sleep_quality?: number | null
          soreness_level?: number | null
          stress_level?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mobility_assessments: {
        Row: {
          assessment_date: string | null
          body_part: string
          created_at: string | null
          id: string
          mobility_score: number | null
          notes: string | null
          pain_level: number | null
          range_of_motion_degrees: number | null
          recommended_drills: Json | null
          user_id: string
          video_url: string | null
        }
        Insert: {
          assessment_date?: string | null
          body_part: string
          created_at?: string | null
          id?: string
          mobility_score?: number | null
          notes?: string | null
          pain_level?: number | null
          range_of_motion_degrees?: number | null
          recommended_drills?: Json | null
          user_id: string
          video_url?: string | null
        }
        Update: {
          assessment_date?: string | null
          body_part?: string
          created_at?: string | null
          id?: string
          mobility_score?: number | null
          notes?: string | null
          pain_level?: number | null
          range_of_motion_degrees?: number | null
          recommended_drills?: Json | null
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mobility_assessments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      music_preferences: {
        Row: {
          created_at: string | null
          id: string
          intensity_level: number | null
          playlist_url: string | null
          preferred_genres: string[] | null
          preferred_tempo_bpm: number | null
          user_id: string
          workout_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          intensity_level?: number | null
          playlist_url?: string | null
          preferred_genres?: string[] | null
          preferred_tempo_bpm?: number | null
          user_id: string
          workout_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          intensity_level?: number | null
          playlist_url?: string | null
          preferred_genres?: string[] | null
          preferred_tempo_bpm?: number | null
          user_id?: string
          workout_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "music_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_logs: {
        Row: {
          ai_recommendation: string | null
          calories: number | null
          carbs_grams: number | null
          created_at: string | null
          fats_grams: number | null
          hydration_ml: number | null
          id: string
          meal_time: string | null
          meal_type: string | null
          protein_grams: number | null
          user_id: string
          workout_id: string | null
        }
        Insert: {
          ai_recommendation?: string | null
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          fats_grams?: number | null
          hydration_ml?: number | null
          id?: string
          meal_time?: string | null
          meal_type?: string | null
          protein_grams?: number | null
          user_id: string
          workout_id?: string | null
        }
        Update: {
          ai_recommendation?: string | null
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          fats_grams?: number | null
          hydration_ml?: number | null
          id?: string
          meal_time?: string | null
          meal_type?: string | null
          protein_grams?: number | null
          user_id?: string
          workout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nutrition_logs_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_records: {
        Row: {
          achieved_at: string | null
          created_at: string | null
          exercise_name: string
          id: string
          record_type: string
          unit: string | null
          user_id: string
          value: number
          workout_id: string | null
        }
        Insert: {
          achieved_at?: string | null
          created_at?: string | null
          exercise_name: string
          id?: string
          record_type: string
          unit?: string | null
          user_id: string
          value: number
          workout_id?: string | null
        }
        Update: {
          achieved_at?: string | null
          created_at?: string | null
          exercise_name?: string
          id?: string
          record_type?: string
          unit?: string | null
          user_id?: string
          value?: number
          workout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "personal_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personal_records_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          fitness_level: string | null
          full_name: string | null
          id: string
          primary_goals: string[] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          fitness_level?: string | null
          full_name?: string | null
          id: string
          primary_goals?: string[] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          fitness_level?: string | null
          full_name?: string | null
          id?: string
          primary_goals?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      training_programs: {
        Row: {
          ai_generated: boolean | null
          created_at: string | null
          current_phase: string | null
          end_date: string | null
          id: string
          performance_data: Json | null
          phase_number: number | null
          program_data: Json | null
          program_name: string
          program_type: string | null
          start_date: string | null
          user_id: string
        }
        Insert: {
          ai_generated?: boolean | null
          created_at?: string | null
          current_phase?: string | null
          end_date?: string | null
          id?: string
          performance_data?: Json | null
          phase_number?: number | null
          program_data?: Json | null
          program_name: string
          program_type?: string | null
          start_date?: string | null
          user_id: string
        }
        Update: {
          ai_generated?: boolean | null
          created_at?: string | null
          current_phase?: string | null
          end_date?: string | null
          id?: string
          performance_data?: Json | null
          phase_number?: number | null
          program_data?: Json | null
          program_name?: string
          program_type?: string | null
          start_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_programs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_equipment: {
        Row: {
          available: boolean | null
          created_at: string | null
          equipment_id: string | null
          id: string
          location: string | null
          user_id: string
        }
        Insert: {
          available?: boolean | null
          created_at?: string | null
          equipment_id?: string | null
          id?: string
          location?: string | null
          user_id: string
        }
        Update: {
          available?: boolean | null
          created_at?: string | null
          equipment_id?: string | null
          id?: string
          location?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_equipment_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "gym_equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_equipment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_exercises: {
        Row: {
          created_at: string | null
          exercise_id: string | null
          exercise_name: string
          form_score: number | null
          id: string
          notes: string | null
          reps: number | null
          rest_seconds: number | null
          rpe: number | null
          set_number: number
          tempo: string | null
          velocity: number | null
          weight: number | null
          workout_id: string
        }
        Insert: {
          created_at?: string | null
          exercise_id?: string | null
          exercise_name: string
          form_score?: number | null
          id?: string
          notes?: string | null
          reps?: number | null
          rest_seconds?: number | null
          rpe?: number | null
          set_number: number
          tempo?: string | null
          velocity?: number | null
          weight?: number | null
          workout_id: string
        }
        Update: {
          created_at?: string | null
          exercise_id?: string | null
          exercise_name?: string
          form_score?: number | null
          id?: string
          notes?: string | null
          reps?: number | null
          rest_seconds?: number | null
          rpe?: number | null
          set_number?: number
          tempo?: string | null
          velocity?: number | null
          weight?: number | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          ai_feedback: Json | null
          avg_heart_rate: number | null
          calories_burned: number | null
          completed_at: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          intensity_level: number | null
          name: string
          notes: string | null
          started_at: string | null
          user_id: string
          workout_type: string | null
        }
        Insert: {
          ai_feedback?: Json | null
          avg_heart_rate?: number | null
          calories_burned?: number | null
          completed_at?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          intensity_level?: number | null
          name: string
          notes?: string | null
          started_at?: string | null
          user_id: string
          workout_type?: string | null
        }
        Update: {
          ai_feedback?: Json | null
          avg_heart_rate?: number | null
          calories_burned?: number | null
          completed_at?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          intensity_level?: number | null
          name?: string
          notes?: string | null
          started_at?: string | null
          user_id?: string
          workout_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
