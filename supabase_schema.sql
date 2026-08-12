-- Run this in your Supabase SQL Editor

-- 1. Create the lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lesson_number INTEGER NOT NULL UNIQUE,
    chapter_number INTEGER NOT NULL,
    topic TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add an index for fast lookups by lesson_number
CREATE INDEX IF NOT EXISTS idx_lessons_number ON public.lessons(lesson_number);

-- 3. Set up Row Level Security (RLS)
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to lessons" ON public.lessons;
CREATE POLICY "Allow public read access to lessons" ON public.lessons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert to lessons" ON public.lessons;
CREATE POLICY "Allow insert to lessons" ON public.lessons FOR INSERT WITH CHECK (true);

-- 4. Create the users table for authentication
CREATE TABLE IF NOT EXISTS public.game_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    security_answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Set up RLS for users (For this prototype, allow all so the frontend can query)
ALTER TABLE public.game_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to game_users" ON public.game_users;
CREATE POLICY "Allow public read access to game_users" ON public.game_users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert to game_users" ON public.game_users;
CREATE POLICY "Allow insert to game_users" ON public.game_users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update to game_users" ON public.game_users;
CREATE POLICY "Allow update to game_users" ON public.game_users FOR UPDATE USING (true) WITH CHECK (true);

-- 6. Add Player Progression Columns
ALTER TABLE public.game_users
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS current_chapter INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS current_lesson INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS previous_topics JSONB DEFAULT '[]'::jsonb;
