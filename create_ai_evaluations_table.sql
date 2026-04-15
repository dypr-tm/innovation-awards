-- Run this SQL in your Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.ai_evaluations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT NOT NULL,
    chat_history JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on RLS
ALTER TABLE public.ai_evaluations ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own evaluations
CREATE POLICY "Users can insert their own ai_evaluations"
    ON public.ai_evaluations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to view their own evaluations
CREATE POLICY "Users can view their own ai_evaluations"
    ON public.ai_evaluations
    FOR SELECT
    USING (auth.uid() = user_id);
