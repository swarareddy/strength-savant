-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles with extended health data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  fitness_level TEXT DEFAULT 'beginner',
  primary_goals TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Health metrics for recovery tracking
CREATE TABLE public.health_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  sleep_hours DECIMAL(3,1),
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 10),
  stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 10),
  hrv_score INTEGER,
  resting_heart_rate INTEGER,
  body_weight DECIMAL(5,1),
  soreness_level INTEGER CHECK (soreness_level BETWEEN 1 AND 10),
  recovery_score INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workouts
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  workout_type TEXT,
  duration_minutes INTEGER,
  intensity_level INTEGER CHECK (intensity_level BETWEEN 1 AND 10),
  calories_burned INTEGER,
  avg_heart_rate INTEGER,
  notes TEXT,
  ai_feedback JSONB,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exercises library
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  muscle_groups TEXT[],
  equipment_needed TEXT[],
  difficulty_level TEXT,
  description TEXT,
  form_tips TEXT[],
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workout exercises (sets and reps)
CREATE TABLE public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES public.exercises(id),
  exercise_name TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  reps INTEGER,
  weight DECIMAL(6,2),
  rpe INTEGER CHECK (rpe BETWEEN 1 AND 10),
  velocity DECIMAL(5,2),
  tempo TEXT,
  rest_seconds INTEGER,
  form_score INTEGER CHECK (form_score BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Personal records
CREATE TABLE public.personal_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  record_type TEXT NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  unit TEXT,
  achieved_at TIMESTAMPTZ DEFAULT NOW(),
  workout_id UUID REFERENCES public.workouts(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nutrition logs
CREATE TABLE public.nutrition_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES public.workouts(id),
  meal_type TEXT,
  calories INTEGER,
  protein_grams DECIMAL(5,1),
  carbs_grams DECIMAL(5,1),
  fats_grams DECIMAL(5,1),
  hydration_ml INTEGER,
  meal_time TIMESTAMPTZ DEFAULT NOW(),
  ai_recommendation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mobility assessments
CREATE TABLE public.mobility_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assessment_date DATE DEFAULT CURRENT_DATE,
  body_part TEXT NOT NULL,
  mobility_score INTEGER CHECK (mobility_score BETWEEN 1 AND 10),
  range_of_motion_degrees INTEGER,
  pain_level INTEGER CHECK (pain_level BETWEEN 0 AND 10),
  recommended_drills JSONB,
  video_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Training programs and microcycles
CREATE TABLE public.training_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_name TEXT NOT NULL,
  program_type TEXT,
  start_date DATE,
  end_date DATE,
  current_phase TEXT,
  phase_number INTEGER,
  ai_generated BOOLEAN DEFAULT false,
  program_data JSONB,
  performance_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community challenges
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_name TEXT NOT NULL,
  description TEXT,
  challenge_type TEXT,
  difficulty_level TEXT,
  start_date DATE,
  end_date DATE,
  target_metric TEXT,
  target_value DECIMAL(10,2),
  created_by UUID REFERENCES public.profiles(id),
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Challenge participants
CREATE TABLE public.challenge_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_progress DECIMAL(10,2),
  completed BOOLEAN DEFAULT false,
  rank INTEGER,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(challenge_id, user_id)
);

-- Equipment tracking and gym context
CREATE TABLE public.gym_equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  equipment_name TEXT NOT NULL,
  equipment_type TEXT,
  muscle_groups TEXT[],
  alternative_exercises TEXT[],
  usage_instructions TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User's available equipment
CREATE TABLE public.user_equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  equipment_id UUID REFERENCES public.gym_equipment(id),
  available BOOLEAN DEFAULT true,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Music preferences
CREATE TABLE public.music_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  workout_type TEXT,
  intensity_level INTEGER,
  preferred_tempo_bpm INTEGER,
  preferred_genres TEXT[],
  playlist_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI coach conversations
CREATE TABLE public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  conversation_type TEXT,
  messages JSONB,
  context_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3D Avatar progress data
CREATE TABLE public.avatar_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  measurement_date DATE DEFAULT CURRENT_DATE,
  body_measurements JSONB,
  muscle_development_scores JSONB,
  body_fat_percentage DECIMAL(4,1),
  photos JSONB,
  ar_model_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mobility_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avatar_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can manage own health metrics" ON public.health_metrics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own workouts" ON public.workouts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view exercises" ON public.exercises FOR SELECT USING (true);
CREATE POLICY "Users can manage own workout exercises" ON public.workout_exercises FOR ALL 
  USING (auth.uid() IN (SELECT user_id FROM public.workouts WHERE id = workout_id));
CREATE POLICY "Users can manage own records" ON public.personal_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own nutrition" ON public.nutrition_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own assessments" ON public.mobility_assessments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own programs" ON public.training_programs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view challenges" ON public.challenges FOR SELECT USING (true);
CREATE POLICY "Users can create challenges" ON public.challenges FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can view challenge participants" ON public.challenge_participants FOR SELECT USING (true);
CREATE POLICY "Users can join challenges" ON public.challenge_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own participation" ON public.challenge_participants FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view equipment" ON public.gym_equipment FOR SELECT USING (true);
CREATE POLICY "Users can manage own equipment" ON public.user_equipment FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own music prefs" ON public.music_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own conversations" ON public.ai_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own avatar progress" ON public.avatar_progress FOR ALL USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for profiles
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert common exercises
INSERT INTO public.exercises (name, category, muscle_groups, equipment_needed, difficulty_level, description) VALUES
  ('Bench Press', 'Strength', ARRAY['Chest', 'Triceps', 'Shoulders'], ARRAY['Barbell', 'Bench'], 'Intermediate', 'Classic chest exercise'),
  ('Squat', 'Strength', ARRAY['Quads', 'Glutes', 'Hamstrings'], ARRAY['Barbell', 'Rack'], 'Intermediate', 'Fundamental leg exercise'),
  ('Deadlift', 'Strength', ARRAY['Back', 'Glutes', 'Hamstrings'], ARRAY['Barbell'], 'Advanced', 'Full body strength builder'),
  ('Pull-ups', 'Strength', ARRAY['Back', 'Biceps'], ARRAY['Pull-up Bar'], 'Intermediate', 'Upper body pulling exercise'),
  ('Push-ups', 'Bodyweight', ARRAY['Chest', 'Triceps', 'Shoulders'], ARRAY[]::TEXT[], 'Beginner', 'Basic pushing exercise')
ON CONFLICT (name) DO NOTHING;